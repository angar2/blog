---
title: 동적 DNS(DDNS) 개념과 테스트
description: 공인 IP가 유동적인 홈서버 환경에서 DDNS 개념을 정리하고, Cloudflare API로 DNS 레코드를 조회·업데이트하는 과정을 직접 테스트한다.
track: log
created: 2024-10-30T09:57
tags: [home-server, ddns, dns]
---

이전 문서에서 다룬 DHCP 예약은 내부 IP 주소의 변경으로 인해 포트 포워딩 설정이 어긋나는 것을 방지하기 위해 내부 IP 주소를 고정하는 작업이다.

그러나 내부 IP 주소를 고정하더라도 공인 IP 주소가 변경될 경우, 외부 요청이 네트워크로 전달될 수 없게 된다.

이 문제를 근본적으로 해결하기 위해 네트워크 제공업체의 고정 IP 서비스를 이용할 수 있지만, 특정 IP 주소를 독점으로 제공받는 것이기에 서비스 이용료 문제가 따른다. 따라서 다른 대안으로 **동적 DNS(DDNS)** 작업을 진행할 예정이다.

## 동적 DNS(DDNS)

DDNS는 유동적인 공인 IP 환경에서 도메인과 서버를 연결 상태로 유지해주는 방식이다.

**동적 DNS(Dynamic Domain Name System, 이하 DDNS)** 은 이름에서 알 수 있듯이, DNS 정보를 동적으로 처리하는 시스템으로서 특정 IP 주소에 대한 DNS 레코드를 주기적으로 또는 상황에 따라 자동으로 업데이트하는 설정이다.

홈 네트워크와 같이 유동적인 IP 주소가 변경될 때마다 도메인에 연결된 DNS 레코드의 IP 주소를 자동으로 업데이트해주는 방식이다.

즉, IP 주소를 고정할 수 없다면 **변경될 때마다 DNS 레코드를 업데이트**한다는 의미다.

## DNS 업데이트 테스트

DNS를 업데이트하기까지의 **<핵심>** 은 다음과 같다.

1. **`A`**: 현재 네트워크의 IP 주소 확인
2. **`B`**: 도메인에 설정된 현재 DNS 레코드 IP 주소 확인
3. 두 IP 주소 비교
   ↳ **`A = B`** : 같으면 그대로 유지
   ↳ **`A ≠ B`** ⇒ **`B → A`**: 다르면 **DNS 업데이트**

현재 DNS를 구성한 DNS 서비스는 **Cloudflare**이다.

**Cloudflare**는 DNS 레코드의 IP 조회 및 DNS 업데이트 API를 제공한다.

직접 API 요청을 해보며 구성이 가능한지 테스트해보았다. 테스트 과정은 다음과 같다.

1. 서버 IP 주소 조회
2. Cloudflare API: Zone ID 조회
3. Cloudflare API: Record ID 조회
4. Cloudflare API: DNS 업데이트

### 서버 IP 주소 조회

IP 주소 확인 서비스를 이용해 서버 네트워크의 현재 IP 주소를 조회한다.

```zsh
curl https://ifconfig.co
```
```
222.222.222.222
```

조회한 IP 주소는 추후 비교 대상으로 준비해놓는다.

### Cloudflare API: Zone ID 조회

Cloudflare API를 이용해 **`zone_id`** 를 조회한다. 이때, 쿼리 파라미터(`name`)로 찾고자하는 **도메인**을 추가하고, 소유자 인증을 위해 헤더값에 **사용자 계정**과 **글로벌 키**를 제공해야한다.

```zsh
curl -X GET "https://api.cloudflare.com/client/v4/zones?name={domain.com}" \
-H "Content-Type: application/json" \
-H "X-Auth-Email: <EMAIL>" \
-H "X-Auth-Key: <API_GLOBAL_KEY>"
```

```
{
  "result": [
    {
      "id": "examp1e52c5a8e4b5f0d3c6a9e2b1d7f",
      "name": "domain.com",
      "status": "active",
      ...

    }
  ],
  "result_info": {
    ...
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

응답값으로 도메인에 대한 **`zone_id`** 를 얻을 수 있다.

### Cloudflare API: Record ID 조회

확보한 **`zone_id`** 값을 이용해 **`record_id`** 를 이어서 조회한다.

이때, URL 매개변수에 **`zone_id`**, 쿼리 파라미터(`name`)에는 찾고자하는 **호스트**을 추가하고, 마찬가지로 소유자 인증 정보를 제공해야한다.

```zsh
curl -X GET "https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records?name={api.domain.com}" \
-H "Content-Type: application/json" \
-H "X-Auth-Email: <EMAIL>" \
-H "X-Auth-Key: <API_GLOBAL_KEY>"
```

```
{
  "result": [
    {
      "id": "examp1e6ff6db90ab422890c41bedf0d",
      "zone_id": "examp1e52c5a8e4b5f0d3c6a9e2b1d7f",
      "zone_name": "domain.com",
      "name": "api.domain.com",
      "type": "A",
      "content": "111.111.111.111",
      ...

    }
  ],
  "result_info": {
    ...
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

응답값으로 찾고자하는 호스트의 DNS 레코드에 대한 **`record_id`** 를 얻을 수 있다.

여기서, **DNS 레코드의 IP 주소**와 미리 조회해 놓은 **서버의 현재 IP 주소**와 <u>비교</u>하여, 다를 경우 다음 작업을 진행한다.

### Cloudflare API: DNS 업데이트

연달아 확보한 **`zone_id`** 와 **`record_id`** 를 이용해 DNS 레코드의 정보를 업데이트할 수 있다.

이때, URL 매개변수에 **`zone_id`** 와 **`record_id`** 를 입력하고, 소유자 인증 정보와 바디 데이터로 **서버의 현재 IP 주소**를 제공한다.

```zsh
curl -X PATCH "https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records/{record_id}" \
-H "Content-Type: application/json" \
-H "X-Auth-Email: <EMAIL>" \
-H "X-Auth-Key: <API_GLOBAL_KEY>"
--data '{
  "type": "A",
  "content": "<NEW_IP>",
}'
```

```
{
  "result": {
    "id": "examp1e6ff6db90ab422890c41bedf0d",
    "zone_id": "examp1e52c5a8e4b5f0d3c6a9e2b1d7f",
    "zone_name": "domain.com",
    "name": "api.domain.com",
    "type": "A",
    "content": "222.222.222.222",
    ...

  },
  "success": true,
  "errors": [],
  "messages": []
}
```

위와 같은 응답을 받으면 DNS 업데이트가 완료되었으며, Cloudflare의 DNS 메뉴에서 변경된 내용을 확인할 수 있다.

위 과정은 DNS 자동 업데이트 클라이언트인 **`ddclient`** 의 수행하는 과정과 동일하다.

**`ddclient`** 설치와 설정 과정은 다음 문서에서 다룬다.
