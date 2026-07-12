---
title: GitHub SSH 설정
description: MacOS 환경에서 SSH 키를 생성하고 GitHub 계정에 등록해 SSH 통신으로 저장소에 접근하는 과정을 정리한다.
track: notes
created: 2024-07-15T09:29
tags: [git, github, ssh]
---

SSH는 네트워크 프로토콜 중 하나로, 데이터를 안전하게 전송하고 원격으로 컴퓨터를 제어하는 데 주로 활용된다.

## SSH(Secure Shell)

SSH 키를 생성해 GitHub 계정에 등록하면, 매번 아이디·비밀번호를 입력하지 않고도 안전하게 저장소와 통신할 수 있다. MacOS 기준으로 키 생성부터 등록까지의 과정을 정리한다.

### Github SSH 설정

> [!note]
> 해당 작업은 MacOS에서 진행됩니다.

#### SSH 키 생성

SSH 통신에 사용할 때 나의 PC의 인증할 수단(Key)을 생성한다.

```zsh
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# ssh-keygen: SSH 키를 생성하는 명령어
# -t: 생성할 키의 타입 지정(RSA: 공개 키 암호화 알고리즘)
# -b: 생성할 키의 비트 크기 지정(비트 크기↑ → 보안↑)
# -C: 주석
```

![생성된 SSH 키 파일](/assets/images/blog/29/1.png)

#### SSH 에이전트 실행

SSH 통신을 수행하는 프로그램을 실행한다.

```zsh
eval "$(ssh-agent -s)"

# eval: 현재 쉘에서 명령어 실행
# ssh-agent: ssh-agent 실행(SSH 키를 관리/인증하는 백그라운드 프로세스)
# -s: 쉘 스크립트 출력
```

![생성된 SSH 키 파일](/assets/images/blog/29/2.png)

#### SSH 키 추가

SSH 에이전트에서 사용할 SSH 키를 추가한다. 키체인 옵션을 사용하면 키의 비밀번호를 등록해 자동으로 연결할도록 할 수 있다.

```zsh
ssh-add --apple-use-keychain ~/.ssh/id_rsa

# ssh-add: 해당 경로에 있는 SSH 개인키를 SSH 에이전트에 추가
# --apple-use-keychain: MacOS 키체인에 SSH 키의 비밀번호를 등록
# * --apple-load-keychain: 키체인에 등록된 SSH 키 확인
```

#### SSH Github 환경 설정

SSH 키 파일이 포함된 디렉토리에 `config` 파일을 생성해 SSH 에이전트 실행 시 깃허브와 통신할 SSH 키를 지정한다.

```zsh
vim ~/.ssh/config
```

```
# ~/.ssh/config
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_rsa
```

![SSH 설정 파일](/assets/images/blog/29/3.png)

#### 공개 키 복사

Github 계정에 등록할 SSH 공개키를 복사한다.

```zsh
pbcopy < ~/.ssh/id_rsa.pub

# pbcopy <: 해당 경로 파일을 클립보드에 복사('&& pbpaste'로 출력도 할 수 있음)
```

#### GitHub에 공개 키 추가

깃허브 계정 설정에서 SSH 키를 등록한다.

> [!note]
> Github 로그인 > Settings > SSH and GPG keys > SSH keys [New SSH key] > SSH key 내용 입력 > [Add SSH key]

![Github SSH Key 추가](/assets/images/blog/29/4.png)

#### GitHub 저장소 클론

설정한 SSH 연결이 정상적으로 동작하는지 확인한다.

```zsh
ssh -T git@github.com
```

![Github SSH 연결 확인](/assets/images/blog/29/5.png)
