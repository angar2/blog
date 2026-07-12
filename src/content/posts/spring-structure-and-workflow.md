---
title: Spring 기본 구조와 작동 방식
description: Spring 프레임워크의 핵심 특징과 프로젝트 생성 과정을 살펴보고, 정적 콘텐츠·MVC+템플릿 엔진·API 세 가지 웹 요청 처리 방식의 동작 원리를 정리한다.
track: notes
created: 2024-12-05T09:01
tags: [spring, java, spring-boot]
sources:
  - title: 스프링 입문 - 코드로 배우는 스프링 부트, 웹 MVC, DB 접근 기술 (김영한)
    url: https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9E%85%EB%AC%B8-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8
---

> [!tip]
> [스프링 입문 - 코드로 배우는 스프링 부트, 웹 MVC, DB 접근 기술 (김영한)](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9E%85%EB%AC%B8-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8)

**Spring**는 Java의 객체지향 프로그래밍(OOP)을 활용하여 서버의 유연성과 확장성 제공하는 Java 기반의 대표적인 프레임워크다.

주요 **특징**은 아래와 같다.

- **의존성 주입(DI) 및 제어의 역전(IoC)**
  스프링 컨테이너(ApplicationContext)가 객체를 관리/주입하여 객체각 결합도를 낮춘다.
- **모듈화 및 확장성**
  Spring Core를 중심으로 다양한 모듈(Spring MVC, Spring Data, Spring Security 등)이 있어, 필요에 따라 유연하게 개발할 수 있다.
- **JPA(Java Persistence API)**
  JPA를 활용하여 객체와 관계형 데이터베이스 간의 매핑을 쉽게 처리할 수 있다.
- **AOP(Aspect-Oriented Programming)**
  공통적으로 적용해야 하는 기능(로깅, 보안, 트랜잭션 관리 등)을 핵심 로직과 분리해 관리할 수 있다.
- **테스트 용이성**
  의존성 주입을 통해 단위 테스트 작성이 쉬우며, Mock 객체를 이용해 독립적으로 테스트를 수행할 수 있다.
- **Spring Boot 지원**
  스프링 부트를 통해 설정이 간소화되고, 애플리케이션을 빠르게 개발하고 배포할 수 있다.

이외에도 Spring만의 다양한 특징이 있으며, 단일 프레임워크가 아닌, 다양한 모듈과 프로젝트를 포괄하는 생태계 또한 방대하다.

그중, 웹 개발 모듈인 **Spring Web**을 이용해 기본적인 서버를 만들어본다.

## Spring 프로젝트 생성

> [!note]
> 본 문서의 프로그래밍은 IntelliJ IDEA IDE 개발 환경과 Java 23.0.1v을 사용한다.

Spring에서 지원하는 **[Spring Initializr](https://start.spring.io)** 웹 툴을 이용해 프로젝트를 간단하게 생성할 수 있다.

![Spring Initializr](/assets/images/blog/61/1.png)

위와 같이 기본 설정 후에 _Dependencies_ 에 **`Spring Web`** 과 템플릿 엔진인 **`Thymeleaf`** 을 포함시켜준다.

이제 프로젝트를 생성해 다운받은 패키지를 IDE로 열어준다.

> [!note]
> **Jar vs War**
> War는 Tomcat WAS를 별도로 설치하거나 혹은 JSP를 사용하는 프로젝트에 사용된다. Jar는 내장 Tomcat WAS에 최적화되어 있는 기능이며, 주로 이 방식이 사용된다.

## Spring 기본 라이브러리 살펴보기

```zsh
# build.gradle

plugins {
	id 'java'
	id 'org.springframework.boot' version '3.4.0'
	id 'io.spring.dependency-management' version '1.1.6'
}

group = 'angari.dev'
version = '0.0.1-SNAPSHOT'

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(23)
	}
}

repositories {
	mavenCentral()
}

dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
	implementation 'org.springframework.boot:spring-boot-starter-web'
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
	testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
}

tasks.named('test') {
	useJUnitPlatform()
}
```

**Gradle** 빌드 도구를 이용해 프로젝트를 생성하면 `build.gradle` 빌드 스크립트 파일이 루트에 생성된다.

`dependencies`를 보면 기본적인 의존성들이 포함되어 있다.

- `spring-boot-starter-thymeleaf`: 템플릿 엔진
- `spring-boot-starter-web`
  - `spring-boot-starter-tomcat`: 웹서버
  - `spring-webmvc`: 스프링 웹 MVC
- `spring-boot-starter-test`
  - `junit`: 단위 테스트 프레임워크
  - `mockito`: Mock 객체 생성 라이브러리
  - `assertj`: 테스트 코드를 좀 더 편하게 작성하게 도와주는 라이브러리
  - `spring-test`: 통합 테스트 라이브러리

## Spring Web 작동 방식

Spring 서버가 작동하는 방식은 크게 3가지로 구분된다.

1. **정적 콘텐츠**
2. **MVC + 템플릿 엔진**
3. **API**

### 정적 콘텐츠

HTML 파일을 그대로 전달하는 방식으로, 별도의 Controller를 필요로 하지 않는다.

요청 시 `src/main/resources/static` 패키지 하위에 위치한 HTML 파일이 자동으로 제공되는데, 이떄 파일명이 지정되지 않으면 기본적으로 `index.html`을 반환한다.

```zsh
http://localhost:8080/hello-static.html
```

```
hello-static.html
```

### MVC + 템플릿 엔진

![Spring MVC](/assets/images/blog/61/2.png)

> [!note]
> **템플릿 엔진**: HTML을 동적으로 생성하고, 데이터와 템플릿을 결합하는 도구.

MVC(Model-View-Controller) 모델 기반의 패턴으로 템플릿 엔진 라이브러리를 이용해 동적으로 HTML을 생성한다.

```zsh
http://localhost:8080/hello-mvc?name=spring
```

```html
<html xmlns:th="http://www.thymeleaf.org">
  <body>
    <p th:text="'hello ' + ${name}">hello empty</p>
  </body>
</html>
```

위와 같은 URL에 따라 요청을 **Controller**가 받아 처리하는데, 이 과정에서 데이터를 **Model**에서 가져와 비즈니스 로직을 수행한 후, 결과가 반영된 HTML 페이지(**View**)를 반환한다.

**Controller**는 아래와 같이 작성할 수 있다.

```java
@GetMapping("hello-mvc")
public String helloMvc(@RequestParam(value = "name", required = false) String name, Model model) {
    model.addAttribute("name", name);
    return "hello-mvc";
}
```

**Controller**는 논리적 뷰 이름(템플릿 파일 이름)을 반환하는데, 이때 `ViewResolver`가 반환된 이름으로 실제 뷰 템플릿 파일을 찾아 매핑하고 템플릿 엔진에 위치 정보를 전달한다. 템플릿 엔진은 해당 파일을 읽어 동적 데이터를 채워넣고 HTML 결과를 생성해낸다.

> [!note]
> **ViewResolver**: 논리적 뷰 이름을 실제 뷰 템플릿 파일로 매핑하는 역할을 하는 Spring MVC 인터페이스로, 템플릿 엔진의 구현체에 의해 동작한다. 대표적으로, Thymeleaf의 경우 구현체인 ThymeleafViewResolver를 사용한다.

### API

![Spring API](/assets/images/blog/61/3.png)

MVC + 템플릿 엔진 방식은 HTML를 전달해 화면을 그리는 역할을 수행하지만, 이것만으로 내부적인 비즈니스 로직을 처리하는 데에는 한계가 있다.

이때, API를 사용하면, 클라이언트와 서버 간의 데이터 전송을 독립적으로 처리할 수 있다.

```java
@GetMapping("hello-api")
@ResponseBody
public Hello helloApi(@RequestParam("name") String name) {
    Hello hello = new Hello();
    hello.setName(name);
    return hello;
}
```

```zsh
http://localhost:8080/hello-api?name=spring
```

```json
{
  "name": "John"
}
```

위와 같이 **Controller**에서 `@ResponseBody` 애노테이션을 이용하면 결과값을 HTML 스크립트가 아닌 **Json**으로 반환하여, 클라이언트는 반환값을 이용해 필요한 UI만 갱신하면 된다.

참고로, `@ResponseBody` 를 사용하면 `viewResolver` 대신 `HttpMessageConverter`가 동작한다.

> [!note]
> **HttpMessageConverter**: HTTP 요청 및 응답 본문과 Java 객체 간의 직렬/역직렬화 시 사용하는 인터페이스로, 데이터 형식에 따라 다양한 구현체가 있으며, 각 구현체는 직렬/역직렬화를 모두 수행한다. 대표적인 구현체는 다음과 같다.
>
> - Text → `StringHttpMessageConverter`
> - Json → `MappingJackson2HttpMessageConverter`
> - Form data → `FormHttpMessageConverter`
