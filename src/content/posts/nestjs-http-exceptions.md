---
title: Nest.js HTTP exceptions 에러 처리 모음
description: Nest.js가 내장 제공하는 HTTP exception 클래스로 상태 코드별 에러를 간편하게 던지는 방법과, 상태 코드에 대응하는 Exception 클래스 목록을 정리한다.
track: notes
created: 2024-01-03T09:00
tags: [nestjs, http-exceptions]
---

Nest.js는 내부적으로 편리한 기능이 많이 내장되어 있다.

그중 굉장히 편리하고 직관적이라고 생각했던 기능은 바로 클라이언트 오류인 HTTP exception을 바로 생성해 던질 수 있는 기능이다. 이점이 의외로 상태코드를 의식하며 메소드를 구현하는 데에 도움이 된다.

## HTTP exceptions

Nest.js에서는 내장된 예외처리 클래스를 사용하여 HTTP 에러를 간편하게 처리할 수 있다.  
사용하는 클래스에 따라 Status Code가 지정되며, 인자값으로 메세지를 전달할 수 있다.

사용 방법은 아래와 같다.

```ts
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class UserService {

	login(username: string, password: string) {
		const database = {
			username: 'apple',
			password: 'good taste'
		}
		
		if(username !== database.username || password !== database.password)
		throw new UnauthorizedException('로그인 정보가 일치하지 않습니다.')

		return true
	}
}
```

`throw`를 이용해 더 이상 코드를 실행하지 않고 바로 응답을 내보내는 방식으로 주로 사용된다.

![401 Unauthorized 예외 응답 예시](/assets/images/blog/4/1.png)

내보내진 Exception 클래스가 호출되면 위와 같은 결과값을 받는다.

### Status Code별 Exception 클래스 종류

Nest.js가 기본 제공하는 HTTP 예외 클래스는 각각 대응하는 Status Code가 지정되어 있다.

```zsh
BadRequestException // 400 Bad Request
UnauthorizedException // 401 Unauthorized
ForbiddenException // 403 Forbidden
NotFoundException // 404 Not Found
MethodNotAllowedException // 405 Method Not Allowed
NotAcceptableException // 406 Not Acceptable
RequestTimeoutException // 408 Request Timeout
ConflictException // 409 Conflict
GoneException // 410 Gone
PayloadTooLargeException // 413 Payload Too Large
UnsupportedMediaTypeException // 415 Unsupported Media Type
UnprocessableEntityException // 422 Unprocessable Entity
InternalServerErrorException // 500 Internal Server Error
NotImplementedException // 501 Not Implemented
BadGatewayException // 502 Bad Gateway
ServiceUnavailableException // 503 Service Unavailable
GatewayTimeoutException // 504 Gateway Timeout
InsufficientStorageException // 507 Insufficient Storage
LoopDetectedException // 508 Loop Detected
BandwidthLimitExceededException // 509 Bandwidth Limit Exceeded
NotExtendedException // 510 Not Extended
NetworkAuthenticationRequiredException // 511 Network Authentication
```
