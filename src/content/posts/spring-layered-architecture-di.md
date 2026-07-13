---
title: Spring 계층형 아키텍처와 의존성 주입
description: Spring의 계층형 아키텍처(Controller-Service-Repository-Domain) 구조와 각 계층의 역할을 코드 예시로 살펴보고, 의존성 주입 개념과 스프링 컨테이너를 통한 빈 등록·주입 방식을 정리한다.
track: notes
created: 2024-12-06T09:02
tags: [spring, dependency-injection, java]
sources:
  - title: 스프링 입문 - 코드로 배우는 스프링 부트, 웹 MVC, DB 접근 기술
    url: https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9E%85%EB%AC%B8-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8
---

## 계층형 아키텍처

> [!tip]
> [스프링 입문 - 코드로 배우는 스프링 부트, 웹 MVC, DB 접근 기술](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9E%85%EB%AC%B8-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8)

Spring 애플리케이션을 여러 계층으로 나누어 각 계층이 독립적인 책임을 갖도록 설계하는 계층형 아키텍처의 구조와, 그 예시가 되는 Member 관련 코드를 살펴본다.

### 계층형 아키텍처 구조

Spring의 대표적인 설계 패턴 중 하나는 **계층형 아키텍처(Layered Architecture)** 다. 애플리케이션을 여러 개의 독립적이고 구분된 계층으로 나누어 각 계층이 특정한 책임을 가지도록 설계한다.

![일반적인 웹 애플리케이션 계층 구조](/assets/images/blog/62/1.png)

- **Controller**: 요청을 받고 응답을 처리하는 사용자와 상호작용하는 계층
- **Service**: 비즈니스 로직을 수행하는 계층
- **Repository**: 데이터베이스와 상호작용을 담담하는 계층
- **Domain**: 비즈니스 객체의 모델을 정의하는 계층(데이터베이스 테이블과 매핑됨)

> [!note]
> **계층형 아키텍처(Layered Architecture)**: 시스템을 여러 개의 계층으로 분리하여 각 계층이 독립적인 책임을 가지고 상호작용하도록 설계하는 아키텍처 패턴이다.
>
> - 장점: 유지보수 용이함, 시스템 확장성 좋음, 테스트(단위) 용이함
> - 단점: 불필요한 성능 요구, 의존성 복잡함, 과도한 추상화

> [!warn]
> **헷갈리는 개념: MVC 패턴 vs 계층형 아키텍처**
>
> MVC는 계층형 아키텍처의 한 부분으로 활용될 수 있지만 각각 다른 목적을 가지는 개념이다.
>
> - MVC 패턴: 애플리케이션의 UI와 로직을 분리하는데 초점을 맞춘 디자인 패턴(사용자 인터페이스와 요청을 처리하는 구조)
> - 계층형 아키텍처: 비즈니스 로직과 데이터 처리의 구조에 초점을 맞춘 설계

### 계층별 코드 예시

Member를 추가하고 조회하는 기능을 예시로 각 계층의 역할과 코드를 살펴보자.

![계층별 디렉토리 구조](/assets/images/blog/62/2.png)

> [!note]
> 순서는 개발 흐름에 따라 Domain → Repository → Service → Controller 순으로 작성한다.

- **Domain**

  Domain 계층은 **비즈니스 객체를 정의**하며, 정의된 후 다른 모든 계층에서 객체 생성 및 타입 정의 시 사용된다.

  ```java
  package angari.dev.spring_start.domain;

  public class Member {

      // Field
      private Long id;

      private String name;

      // Method
      public Long getId() {
          return id;
      }

      public void setId(Long id) {
          this.id = id;
      }

      public String getName() {
          return this.name;
      }

      public void setName(String name) {
          this.name = name;
      }
  }
  ```

  여기서는 회원의 정보(`Field`)와 정보를 조회 및 설정(`Method`)하는 비즈니스 객체를 정의한다.

- **Repository**

  Repository는 데이터 삽입, 조회, 수정, 삭제 등 실제로 **데이터베이스를 다루는 역할을 수행**하며, 데이터베이스와 직접적으로 접촉하기 때문에 그 사용 기술에 따라 내부 로직이 달라질 수 있다.

  따라서 기능적으로 필요한 메서드를 <u>인터페이스로 먼저 정의한 후, 상황에 따라 적절한 구현 클래스를 구현</u>하는 방식이 일반적이다.

  ```java
  package angari.dev.spring_start.reposipory;

  import angari.dev.spring_start.domain.Member;

  import java.util.List;
  import java.util.Optional;

  public interface MemberRepository {
      Member save(Member member);
      Optional<Member> findById(Long id);
      Optional<Member> findByName(String name);
      List<Member> findAll();
  }
  ```

  여기서는 기본적인 데이터 저장과 조회 메서드가 정의되었다.

  > [!note]
  > **유연한 DB 기술 변경**: 인터페이스를 기반으로 인메모리부터 Spring Data JPA까지 DB 기술에 따라 구현 클래스를 바꿔가며 적용할 예정이다.

  위 인터페이스를 토대로 구현된 클래스는 아래와 같다.

  ```java
  package angari.dev.spring_start.reposipory;

  import angari.dev.spring_start.domain.Member;
  import org.springframework.stereotype.Repository;

  import java.util.*;

  public class MemoryMemberRepository implements MemberRepository {

      private static Map<Long, Member> store = new HashMap<>();
      private static long sequence = 0L;

      @Override
      public Member save(Member member) {
          member.setId(++sequence);
          store.put(member.getId(), member);
          return member;
      }

      @Override
      public Optional<Member> findById(Long id) {
          return Optional.ofNullable(store.get(id));
      }

      @Override
      public Optional<Member> findByName(String name) {
          return store.values().stream()
                  .filter(member -> member.getName().equals(name))
                  .findAny();
      }

      @Override
      public List<Member> findAll() {
          return new ArrayList<Member>(store.values());
      }
  }
  ```

  여기서는 <u>인메모리 DB</u> 방식으로 데이터를 다루도록 설정되었으며, `MemberRepository` 인터페이스를 구현하고 있다.

  > [!note]
  > **`Optional<T>`**: 값 `T`를 객체로 감싸는 래퍼 클래스로서, 다양한 메서드를 통해 Null 값을 안전하게 처리할 수 있도록 돕는다.
  >
  > - 메서드: `ofNullable()`, `empty()`, `of(value)`, `isPresent()`, `get()` 등

- **Service**

  Service는 실질적으로 애플리케이션의 서비스 기능이 동작할 **비즈니스 로직을 수행**한다.

  이때, 데이터 저장 및 조회 등 <u>데이터 조작이 필요할 경우 미리 정의된 Repository에 의존</u>해 데이터를 처리한다.

  ```java
  package angari.dev.spring_start.service;

  import angari.dev.spring_start.domain.Member;
  import angari.dev.spring_start.reposipory.MemberRepository;

  import java.util.*;

  public class MemberService {

      private final MemberRepository memberRepository = new MemoryMemberRepository();
      // final: 초기화 이후 변수 변경 불가

      /**
       * 회원 가입
       */
      public Long join(Member member) {
          validateDuplicateMember(member); // 중복 회원 검증
          memberRepository.save(member);
          return member.getId();
      }

      private void validateDuplicateMember(Member member) {
          memberRepository.findByName(member.getName())
                  .ifPresent(m -> {
                      throw new IllegalStateException("이미 존재하는 회원입니다.");
                  });
      }

      /**
       * 전체 회원 조회
       */
      public List<Member> findMembers() {
          return memberRepository.findAll();
      }

      /**
       * 회원 조회
       */
      public Optional<Member> findMember(Long memberId) {
          return memberRepository.findById(memberId);
      }
  }
  ```

  리포지토리는 `MemoryMemberRepository` 객체를 직접 생성해 사용하도록 처리해놓았다.

- **Controller**

  Controller는 **사용자와 상호작용하는 역할을 수행**한다. HTML 페이지를 제공하는 역할뿐만 아니라, 사용자의 기능적인 요청을 받아 응답을 전달하는 창구와 같은 역할이라고 할 수 있다.

  사용자로부터 받은 요청을 수행하기 위해 미리 구현된 Service 계층에 요청을 전달하고 그 결과를 반환한다.

  ```java
  package angari.dev.spring_start.controller;

  import angari.dev.spring_start.domain.Member;
  import angari.dev.spring_start.service.MemberService;
  import org.springframework.stereotype.Controller;
  import org.springframework.ui.Model;
  import org.springframework.web.bind.annotation.*;

  import java.util.List;

  @Controller
  public class MemberController {

      private final MemberService memberService;

      public MemberController(MemberService memberService) {
          this.memberService = memberService;
      }

      @GetMapping("/members/new")
      public String createForm() {
          return "members/createMemberForm";
      }

      @PostMapping("/members/new")
      public String create(MemberForm form) {
          Member member = new Member();
          member.setName(form.getName());

          memberService.join(member);

          return "redirect:/";
      }

      @GetMapping("/members")
      public String list(Model model) {
          List<Member> members = memberService.findMembers();
          model.addAttribute("members", members);

          return "members/memberList";
      }
  }
  ```

  여기서는 템플릿 엔진을 통한 HTML 페이지 전달 역할과 동시에 회원가입 및 회원 조회 등의 기능적 역할도 동시에 수행하도록 작성되었다.

  `memberService`를 외부로부터 주입받아 내부 메서드 중 적절한 메서드를 사용한다.

## 계층 간 의존성 주입

각 계층이 서로 어떻게 의존 관계를 맺고, 이를 스프링 컨테이너가 어떻게 관리하는지 살펴본다.

### 의존성

위에서 살펴본 바와 같이, 각 계층은 다른 계층의 기능(메서드)을 가져다 사용하는 의존 관계를 형성한다.

- **Controller**는 사용자 요청을 처리하기 위해 **Service**의 비즈니스 로직을 사용한다.
- **Service**는 데이터베이스를 다루기 위해 **Repository**의 DB 처리 로직을 사용한다.

이렇듯, _A클래스_ 에서 다른 _B클래스_ 의 메서드를 가져다 사용하는 것을 **의존(Dependency)** 이라고 한다.

_A클래스_ 가 _B클래스_ 에 의존하려면, _B클래스_ 의 객체(인스턴스)를 생성해서 사용해야 하는데(`Static` 제외), 이때, 두 가지 방법을 사용할 수 있다.

1. `A클래스 내부에서 직접 객체를 생성하는 방식`
2. `A클래스 외부에서 객체를 생성해 A클래스에 주입하는 방식`

첫 번째 방법은 **_A클래스_ 와 _B클래스_ 가 강하게 결합**되는 방식이다. 이 경우 A클래스는 B클래스의 구체적인 구현법을 알고 있어야 하며, B객체의 생명주기가 A객체에 종속된다. 이 방식은 코드가 직관적이고 간단하지만, **유지보수**나 **테스트**에서 어려움이 있을 수 있다.

두 번째 방법을 **의존성 주입(Dependency Injection)** 이라고 하며, **_A클래스_ 와 _B클래스_ 의 결합도를 낮추는** 방식이다. 이렇게 하면 B객체가 독립적으로 생성되고 관리되며, A객체는 B객체를 외부에서 주입받아 사용할 수 있다. 이 방식은 **유연성**과 **테스트 용이성**을 높여준다.

### 스프링 컨테이너

계층이라고 하는 Controller와 Service, Repository도 결국 클래스이며, 이들은 객체를 생성해야만 그 기능을 수행할 수 있다.

각 계층이 필요한 객체(의존성)을 외부로부터 주입받음으로써, 독립적으로 동작할 수 있고, 다른 계층에 미치는 영향을 최소화할 수 있다. 이러한 방식이 계층 간 결합도를 낮춘다는 의미에서 계층 분리의 목적에 더 부합한다.

그렇다면, 이제 그 **'외부'** 라는 존재가 필요하다. 즉, 각 클래스의 객체를 직접 생성해 관리하고, 필요한 의존성을 다른 객체에 주입해주는 <u>의존성 주입 관리자</u>가 필요하다.

스프링에서는 **스프링 컨테이너**라는 의존성 주입 관리자가 있다. 스프링 컨테이너는 애플리케이션이 시작될 때 등록된 클래스의 객체를 싱글톤(기본)으로 생성하고, 이들 객체의 의존성을 분석해 필요한 의존성을 자동으로 주입하는 역할을 한다.

### 빈 등록

스프링 컨테이너에 클래스를 등록하는 행위를 빈(Bean)으로 등록한다고 표현한다.

> [!note]
> **Bean**: 스프링 컨테이너에 등록되어 생성된 객체를 가리킨다.
>
> - [개념적] "스프링 컨테이너는 등록된 bean을 관리한다."
> - [물리적] "애플리케이션 컨텍스트는 등록된 객체를 생성해 관리한다."

빈으로 등록하는 주된 방법으로는 `1. 컴포넌트 스캔을 통해 자동으로 등록하는 방법`과 `2. @Configuration + @Bean을 이용해 명시적으로 등록하는 방법`이 있다.

- **컴포넌트 스캔을 통해 자동으로 등록**

  Bean으로 등록하려는 클래스에 `@Component` 계열 애노테이션을 적용한다.

  - `@Component`: 일반적인 클래스

    ```java
    @Component
    public class MyComponent {}
    ```

  - 하위 애노테이션

    - `@Controller`: 컨트롤러 클래스

      ```java
      @Controller
      public class MemberController {}
      ```

    - `@Service`: 서비스 클래스

      ```java
      @Service
      public class MemberService {}
      ```

    - `@Repository`: 리포지토리 클래스

      ```java
      @Repository
      public class MemoryMemberRepository implements MemberRepository {}
      ```

- **Java 코드로 명시적으로 등록**

  세밀한 설정이 필요하거나 추후 의존성이 변경되야할 때 유용하다.

  **`@Configuration`** 와 **`@Bean`** 애노테이션을 이용해 별도의 컨피그 클래스를 작성한다.

  ```java
  package angari.dev.spring_start;

  import angari.dev.spring_start.reposipory.*;
  import angari.dev.spring_start.service.*;
  import org.springframework.context.annotation.*;

  @Configuration
  public class SpringConfig {

      @Bean
      public MemberService memberService() {
          return new MemberService(memberRepository());
      }

      @Bean
      public MemberRepository memberRepository() {
          return new MemoryMemberRepository();
      }
  }
  ```

### 주입 방식

주입된 의존성을 객체 내부에서 사용하기 위해서는 의존성 객체를 필드에 초기화해야한다.

주로 아래 세 가지 방식 중 하나를 활용한다.

- **필드 주입 방식**

  : 간결한 코드 / 불변성 보장 x

  ```java
  public class MemberController {
    @Autowired private MemberService memberService;
  }
  ```

- **세터 주입 방식**(메서드 직접 정의)

  : 의존성 변경 가능(불변성 보장 x) / 필수 의존성 보장 x

  ```java
  public class MemberController {
    private MemberService memberService;

    @Autowired
    public void setMemberService(MemberService memberService) {
        this.memberService = memberService;
    }
  }
  ```

- **생성자 주입 방식** `권장 방식`

  : 필수 의존성 보장, 불변성 보장 / 복잡한 코드

  ```java
  public class MemberController {
    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }
  }
  ```

> [!note]
> **`@Autowired`**: 스프링 컨테이너에서 관리되고 있는 Bean 중에서 해당하는 Bean을 자동으로 주입해준다. 생성자가 1개일 경우 생략 가능하다.
