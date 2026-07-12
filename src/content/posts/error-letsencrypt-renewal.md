---
title: Let's Encrypt 인증서 갱신 실패 해결
description: 와일드카드 인증서 발급 시 거친 DNS 소유권 수동 인증 절차 때문에 certbot 자동 갱신이 실패한 원인을 파악하고, 인증서를 재발급해 문제를 해결한 과정을 정리한다.
track: log
created: 2024-01-14T09:16
tags: [error, ssl, lets-encrypt]
sources:
  - title: 갱신 오류 도메인 와일드카드 사용
    url: https://velog.io/@shyim/Lets-Encrypt-갱신-오류-도메인-와일드-카드-사용
  - title: '[Letsencrypt] 인증서 갱신 에러'
    url: https://joanne.tistory.com/271
  - title: let_s_encrypt_certbot_wildcard_certificates [AllThatLinux!]
    url: https://atl.kr/dokuwiki/doku.php/let_s_encrypt_certbot_wildcard_certificates
---

원격 서버에 발급해둔 Let's Encrypt 인증서를 갱신하려는 과정에서 자동 갱신이 실패하는 문제를 겪었다. 원인을 파악하고 인증서를 재발급하는 방식으로 대응한 기록이다.

## Issue

인증서 만료 기한을 확인하고 갱신 명령어를 실행했으나 아래와 같은 에러가 발생했다.

### 인증서 만료 기한

Let's Encrypt의 인증서는 만료기한이 3개월이다.
자동 갱신 설정을 해두지 않았기 때문에, 직접 3개월이 지나기 전에 인증서 갱신을 해주어야 한다.

![인증서 만료 기한이 표시된 certbot 인증서 정보 화면](/assets/images/blog/16/1.png)

아래 명령어를 이용해 서버에서 간단하게 인증서를 갱신할 수 있다.

```zsh
sudo certbot renew
```

### 인증서 갱신 실패

인증서 갱신 명령어를 입력했으나 아래와 같은 에러를 접하게 되었다.

![certbot renew 실행 시 발생한 PluginError 에러 메시지 화면](/assets/images/blog/16/2.png)

> “PluginError('수동 플러그인을 대화형으로 사용하지 않고 사용할 때는 인증 스크립트를 --manual-auth-hook로 제공해야 합니다.')”

## Cause

에러 메세지를 해석해보면, 수동 인증 절차가 포함된 방식으로 발급한 인증서는 자동으로 갱신할 수 없다는 것을 알 수 있었다.

### 수동 발급 절차가 포함된 인증서

처음 인증서 발급 시, 와일드카드 방식의 인증서를 발급하기 위해서는 별도의 DNS 소유권 인증이 필요했다. 그렇기 때문에 certbot을 이용한 인증서 발급 과정에서 DNS 소유권 인증하는 수동 절차를 진행한 적이 있다.

하지만 위 에러 메세지를 해석해보면, 그렇게 수동 절차가 포함된 방식으로 발급한 인증서는 certbot에서 제공하는 renew 명령어를 이용해 자동으로 갱신할 수 없단다. 즉, **인증서를 발급받는 과정에서 DNS 소유권 인증을 위해 DNS TXT 레코드를 추가하는 과정을 수행했다면 자동으로 갱신이 불가능**하다는 의미이다.

아무래도 DNS TXT 레코드 역시 갱신을 해야하는데 이 과정은 certbot이 직접 수행할 수 없기 때문으로 해석된다.

## Solution

이 경우, 사실상 인증서를 새로 발급해야 한다.

### 인증서 재발급

certbot에서 제공하는 TXT 레코드 자동갱신 플러그인이 아래와 같이 다양하게 존재하긴 하나, 현재 이용하고 있는 가비아는 포함되어 있지 않기 때문에 자동 갱신이 불가하다.

- Cloudflare DNS plugin
- DigitalOcean DNS plugin
- DNSimple DNS plugin
- Gehirn DNS plugin
- Google DNS plugin
- Linode DNS plugin
- OVH DNS plugin
- RFC 2136 DNS plugin
- Amazon Route53 DNS plugin
- SakuraCloud DNS plugin

위 리스트에 포함된 다른 DNS 서비스를 이용하거나 혹은 와일드카드가 아닌 서브 도메인마다 개별로 인증서를 받는 방식으로 처리하면 인증서 자동 갱신을 설정해둘 수 있지만, 당장은 인증서를 재발급해 만료기한 안에 처리를 해두어야겠다고 판단했다.

재발급은 처음 인증서를 발급한 과정을 그대로 진행하면 된다.
