---
title: Spring 데이터베이스 접근 기술 비교 — JDBC · JPA · Spring Data JPA
description: JDBC부터 JDBC Template, JPA, Spring Data JPA까지 이어지는 Spring의 데이터베이스 접근 기술을 코드로 비교하고, 각 방식의 특징과 트랜잭션 처리 원리를 정리한다.
track: notes
created: 2024-12-08T09:03
tags: [spring, jpa, jdbc, jdbc-template, spring-data-jpa]
sources:
  - title: 스프링 입문 - 코드로 배우는 스프링 부트, 웹 MVC, DB 접근 기술 (김영한, 인프런)
    url: https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9E%85%EB%AC%B8-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8
---

이 글은 김영한님의 인프런 강의 내용을 기반으로, Spring이 제공하는 대표적인 네 가지 데이터베이스 접근 기술인 JDBC, JDBC Template, JPA, Spring Data JPA를 비교하고 정리한 노트다.

> [!tip]
> [스프링 입문 - 코드로 배우는 스프링 부트, 웹 MVC, DB 접근 기술 (김영한, 인프런)](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9E%85%EB%AC%B8-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8)

## Spring 데이터베이스 접근 기술

Spring의 데이터베이스 접근 기술은 직접적인 SQL 작업에서부터 자동화된 객체 중심 접근으로 발전했다. 그 과정은 대표적으로 네 가지 방식으로 소개할 수 있다.

1. **JDBC**
2. **JDBC Template**
3. **JPA**
4. **Spring Data JPA**

위 네 가지 방식의 특징과 구현을 살펴보고, Spring이 데이터베이스와 상호작용하는 원리를 이해하고자 한다.

## 데이터베이스 상호작용 구현 준비

네 가지 접근 기술을 비교하기에 앞서, Repository의 역할과 Bean 등록 방식부터 정리한다.

- **Repository 구현 준비**

  데이터베이스 상호작용 역할은 Repository가 담당한다.

  ```java
  package angari.dev.spring_start.reposipory;

  import angari.dev.spring_start.domain.Member;

  import java.util.*;

  public interface MemberRepository {
      Member save(Member member); // 데이터 저장
      Optional<Member> findById(Long id); // 데이터 조회(id)
      Optional<Member> findByName(String name); // 데이터 조회(name)
      List<Member> findAll(); // 전체 데이터 조회
  }
  ```

  이전 작업에서 작성해둔 `MemberRepository` 인터페이스를 기반으로, 데이터베이스 접근 방식에 따라 서로 다른 Repository 구현 클래스를 작성하고, 이를 Bean 등록 시점에서 교체하는 방식으로 설정할 예정이다.

- **Repository의 Bean 등록**

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
          return new MemoryMemberRepository(); // 인메모리 DB 방식 구현체
      }
  }
  ```

  위와 같이 스프링 컨테이너의 Bean 등록을 직접 조절하면 **개방-폐쇄 원칙(OCP, Open-Closed Principle)** 에 따라 기존 비즈니스 코드를 손대지 않고 설정만으로 구현 클래스를 변경할 수 있다.

## 데이터베이스 접근 기술 구현

네 가지 접근 기술을 실습에서 사용하는 데이터베이스에 각각 적용하며 코드와 특징을 비교한다.

> [!note]
> 실습에서는 경량 데이터베이스인 H2(2.3.232v)를 사용한다.

### JDBC

**JDBC(Java Database Connectivity)** 는 직접 SQL을 작성하고, 쿼리 실행, 결과 처리 및 예외 처리 등의 작업을 수동으로 처리하는 방식이다.

대부분의 절차를 직접 작성하기 때문에 세밀한 제어가 가능하지만, 코드가 복잡하고 오류를 관리하는 데 많은 작업이 필요하다.

```java
// build.gradle

dependencies {
    ...
    implementation 'org.springframework.boot:spring-boot-starter-jdbc' 
    runtimeOnly 'com.h2database:h2' 
}
```

```properties
# application.properties

spring.datasource.url=jdbc:h2:tcp://localhost/~/h2
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
```

```java
// JdbcMemberRepository.java

package angari.dev.spring_start.reposipory;

...
import org.springframework.jdbc.datasource.DataSourceUtils;

import javax.sql.DataSource;
import java.sql.*;

public class JdbcMemberRepository implements MemberRepository {

    private final DataSource dataSource;

    public JdbcMemberRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public Member save(Member member) {
        String sql = "insert into member(name) values(?)";
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            pstmt.setString(1, member.getName());
            pstmt.executeUpdate(); // 실행
            rs = pstmt.getGeneratedKeys(); // Key값 조회

            // 작업 성공 확인
            if (rs.next()) { 
                member.setId(rs.getLong(1));
            } else {
                throw new SQLException("id 조회 실패");
            }
            return member;
        } catch (Exception e) {
            throw new IllegalStateException(e);
        } finally {
            close(conn, pstmt, rs);
        }
    }

    @Override
    public Optional<Member> findById(Long id) {
        String sql = "select * from member where id = ?";
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setLong(1, id);
            rs = pstmt.executeQuery(); // 실행

            // 데이터 가공
            if(rs.next()) {
                Member member = new Member();
                member.setId(rs.getLong("id"));
                member.setName(rs.getString("name"));
                return Optional.of(member);
            }
            return Optional.empty();
        } catch (Exception e) {
            throw new IllegalStateException(e);
        } finally {
            close(conn, pstmt, rs);
        }
    }

    @Override
    public Optional<Member> findByName(String name) {
        String sql = "select * from member where name = ?";
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, name);
            rs = pstmt.executeQuery(); // 실행

            // 데이터 가공
            if(rs.next()) {
                Member member = new Member();
                member.setId(rs.getLong("id"));
                member.setName(rs.getString("name"));
                return Optional.of(member);
            }
            return Optional.empty();
        } catch (Exception e) {
            throw new IllegalStateException(e);
        } finally {
            close(conn, pstmt, rs);
        }
    }

    @Override
    public List<Member> findAll() {
        String sql = "select * from member";
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            rs = pstmt.executeQuery(); // 실행
            List<Member> members = new ArrayList<>();

            // 데이터 가공
            while(rs.next()) {
                Member member = new Member();
                member.setId(rs.getLong("id"));
                member.setName(rs.getString("name"));
                members.add(member);
            }
            return members;
        } catch (Exception e) {
            throw new IllegalStateException(e);
        } finally {
            close(conn, pstmt, rs);
        }
    }

    private Connection getConnection() {
        return DataSourceUtils.getConnection(dataSource);
    }

    private void close(Connection conn, PreparedStatement pstmt, ResultSet rs) {
        try {
            if (rs != null) {
                rs.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        try {
            if (pstmt != null) {
                pstmt.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        try {
            if (conn != null) {
                close(conn);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private void close(Connection conn) throws SQLException {
        DataSourceUtils.releaseConnection(conn, dataSource);
    }
}
```

**JDBC 주요 인터페이스** (`java.sql` / `javax.sql`)

| 인터페이스 | 역할 | 비유 |
| --- | --- | --- |
| `DataSource` | 데이터베이스와의 연결 관리 | 관리자 |
| `Connection` | 데이터베이스와의 실제 연결 | 도구 |
| `PreparedStatement` | SQL 쿼리 실행 준비 및 실행 | 일꾼 |
| `ResultSet` | 쿼리 결과를 저장하고 처리 | 저장소 |

4개의 메서드를 작성하는데도 꽤 길고 반복적인 코드를 작성해야 하며, `getConnection()`와 `close()`와 같이 데이터베이스 연결 작업도 따로 정의해두어야 한다.

메서드의 전반적인 절차는 이렇다.

- 데이터베이스 관련 객체들과 SQL문을 준비한다.
- 데이터베이스를 연결과 직접 작성한 SQL문으로 작업을 준비한다.
- `try` 작업 성공 시, 작업 결과를 적절한 형식으로 가공해 반환한다.
- `catch`오류 발생 시, IllegalStateException 오류를 반환한다.
- `finally`모든 작업이 완료되면, 데이터베이스 연결을 풀로 반환한다.

### JDBC Template

**JDBC Template**는 JDBC의 복잡하고 반복적인 코드를 래퍼로 감싸는 방식으로, 메서드마다 반복적으로 작성해야 했던 SQL 실행, 예외 처리 등을 추상화하여 처리한다.

```java
// JdbcTemplateMemberRepository.java

package angari.dev.spring_start.reposipory;

...
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;

import javax.sql.DataSource;
import java.sql.*;

public class JdbcTemplateMemberRepository implements MemberRepository {

    private final JdbcTemplate jdbcTemplate;

    public JdbcTemplateMemberRepository(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public Member save(Member member) {
        SimpleJdbcInsert jdbcInsert = new SimpleJdbcInsert(jdbcTemplate);
        jdbcInsert.withTableName("member").usingGeneratedKeyColumns("id");
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("name", member.getName());
        Number key = jdbcInsert.executeAndReturnKey(new
                MapSqlParameterSource(parameters));
        member.setId(key.longValue());
        return member;
    }

    @Override
    public Optional<Member> findById(Long id) {
        List<Member> result = jdbcTemplate.query("select * from member where id = ?", memberRowMapper(), id);
        return result.stream().findAny();
    }

    @Override
    public Optional<Member> findByName(String name) {
        List<Member> result = jdbcTemplate.query("select * from member where name = ?", memberRowMapper(), name);
        return result.stream().findAny();
    }

    @Override
    public List<Member> findAll() {
        return jdbcTemplate.query("select * from member", memberRowMapper());
    }

    private RowMapper<Member> memberRowMapper() {
        return (rs, rowNum) -> {
            Member member = new Member();
            member.setId(rs.getLong("id"));
            member.setName(rs.getString("name"));
            return member;
    }; }
}
```

전통적인 JDBC에 비해 코드의 수가 획기적으로 줄어들었다. 데이터베이스 연결 매커니즘이 생략되었기 때문이다.

`JdbcTemplate`는 JDBC를 위한 도우미 클래스로서, 데이터베이스 연결 객체인 `DataSource`를 한번 감싸 내부적으로 관리하며, 데이터베이스의 연결 및 부수적인 작업을 대신 수행해준다.

`JdbcTemplate`을 사용하면, 클래스 내부에서 쿼리 실행 메서드만을 사용하여 비교적 SQL문 작성에만 집중할 수 있다.

다만, 데이터 처리 결과가 도메인 모델과 자동으로 매핑되지 않기 때문에 `RowMapper`를 이용해 별도의 데이터 가공이 필요하다.

### JPA

**JPA(Java Persistence API)** 는 자바에서 객체 관계 매핑(ORM)을 구현하는 표준 API로, 데이터베이스의 관계형 데이터를 자바 객체로 매핑해 데이터베이스를 좀더 객체지향적인 방식으로 관리하는 방식이다.

SQL과 데이터 중심의 설계에서, 객체 중심의 설계로 패러다임을 전환한다는 의미에서 Spring의 철학과 잘 부합한다.

데이터 작업 또한 SQL문을 직접 작성하지 않고 제공되는 메서드를 통해 자동으로 처리하기 때문에 작성이 간편하고 코드가 간결하다.

```java
// build.gradle

dependencies {
  ...
  implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
  // spring-boot-starter-data-jpa는 내부에 jdbc 관련 라이브러리를 포함함
  runtimeOnly 'com.h2database:h2'
}
```

```properties
# application.properties

spring.datasource.url=jdbc:h2:tcp://localhost/~/h2
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa

spring.jpa.show-sql=true # SQL 출력
spring.jpa.hibernate.ddl-auto=none # 테이블 자동 생성
```

```java
// JpaMemberRepository.java

package angari.dev.spring_start.reposipory;

...
import jakarta.persistence.EntityManager;

public class JpaMemberRepository implements MemberRepository{

    private final EntityManager em;

    public JpaMemberRepository(EntityManager em) {
        this.em = em;
    }

    @Override
    public Member save(Member member) {
        em.persist(member);
        return member;
    }

    @Override
    public Optional<Member> findById(Long id) {
        Member member = em.find(Member.class, id);
        return Optional.ofNullable((member));
    }

    @Override
    public Optional<Member> findByName(String name) {
        List<Member> result = em.createQuery("select m from Member m where m.name = :name", Member.class)
                .setParameter("name", name)
                .getResultList();
        return result.stream().findAny();
    }

    @Override
    public List<Member> findAll() {
        List<Member> result = em.createQuery("select m from Member m", Member.class)
                .getResultList();
        return result;
    }
}
```

JDBC와 비교해 중복되고 부수적인 작업을 자동화해 코드량이 크게 줄었을 뿐만 아니라, 데이터 처리 결과를 객체로 제공하므로 별도의 데이터 가공이 필요하지 않다.

특히 **`EntityManager`** 객체가 엔티티 관리, 트랜잭션 제어, 쿼리 실행 등의 데이터베이스 상호작용을 자동으로 관리해주며, 다양한 메서드를 제공해 비교적 단순한 SQL문은 메서드 호출만으로 실행할 수 있다.

**`EntityManager` 주요 메서드**

| 메서드 | 설명 |
| --- | --- |
| `persist(Object entity)` | 엔티티 저장 |
| `merge(Object entity)` | 엔티티 병합하여 업데이트 |
| `find(Class<T> entityClass, Object primaryKey)` | 주어진 ID에 해당하는 엔티티 조회 |
| `remove(Object entity)` | 엔티티 삭제 |
| `createQuery(String jpql, Class<T> class)` | JPQL 쿼리로 실행 |
| `createNamedQuery(String name)` | 미리 정의된 JPQL 쿼리 실행 |
| `getResultList()` | `List<T>` 형태로 결과값 반환 |

**`EntityManager`** 가 제공하는 메서드보다 좀더 세밀한 SQL 작업이 필요할 경우, 객체 지향 쿼리 언어인 **JPQL(Java Persistence Query Language)** 을 이용해 작성할 수 있다. 데이터베이스의 테이블을 대상으로 하는 것이 아닌 **엔티티를 대상으로 쿼리를 실행하고 객체를 반환**한다.

#### JPA와 트랜잭션

한편, **JPA를 통한 데이터 변경은 트랜잭션 안에서 실행해야 하기 때문에** 비즈니스 로직 흐름을 관리하는 Service 계층에 트랜잭션을 적용해 주어야 한다.

```java
package angari.dev.spring_start.service;

...
import org.springframework.transaction.annotation.Transactional;

@Transactional
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Long join(Member member) { ... }
    public List<Member> findMembers() { ... }
    public Optional<Member> findMember(Long memberId) { ... }
}
```

**`@Transactional`** 는 Spring에서 트랜잭션 관리를 간편하게 처리할 수 있게 해주는 어노테이션으로서, 트랜잭션의 시작과 끝, 커밋과 롤백을 Spring이 자동으로 처리해준다.

메서드 실행이 완료되면 트랜잭션이 **커밋**되어 변경된 내용이 데이터베이스에 반영되며, 메서드 실행 중 예외가 발생하면 트랜잭션이 **롤백**되어 모든 변경 사항이 취소된다.

> [!note]
> JPA가 트랜잭션 안에서 실행되어야 하는 이유
> - 영속성 컨텍스트: JPA에서는 데이터베이스와 동기화하는 영속성 컨텍스트라는 공간에서 엔티티 객체들을 추적/관리하는데, 이는 트랜잭션 내에서만 동작하기 때문.
> - 일관성: 데이터베이스 작업 중, 다른 작업으로 인해 데이터가 변경되지 않고 일관되게 유지되게 하기 위해.
> - 원자성: 로직 내 모든 작업이 완전하게 실행되거나(=>커밋) 전혀 실행되지 않도록(=>롤백) 보장하기 위해.

### Spring Data JPA

**Spring Data JPA**는 JPA를 자동화 방식으로 편리하게 사용하도록 도와주는 도구다.

Repository **구현 클래스 없이 인터페이스 설정만으로 개발**을 할 수 있으며, **기본 CRUD 기능도 모두 제공**해 개발자가 핵심 비즈니스 로직을 개발하는데 더 집중할 수 있게 도와준다.

```java
// SpringDataJpaMemberRepository.java

package hello.hellospring.repository;

...
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpringDataJpaMemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByName(String name);
}
```

이렇게 인터페이스만 작성하면 설정이 완료된다.

JPA에서 제공하는 **`JpaRepository<T, ID>`** 를 상속하면, 제네릭으로 전달된 `Member` 엔티티에 대해 기본적인 데이터베이스 작업이 자동으로 제공된다.

#### 쿼리 메서드

또한, 기본 CRUD 외에도 추가적인 메서드를 커스텀할 수 있는데, 메서드의 이름 규칙에 따라 필요한 JPQL을 직접 생성해 적용(**쿼리 메서드**)해준다. 위 예시에서 `findByName`라는 메서드의 이름을 기반으로 아래와 같은 JPQL이 생성될 것이다.

```jpql
SELECT m FROM Member m WHERE m.name = ?1
```

만약, 메서드 이름 규칙에 따르기 어렵거나 좀더 복잡한 쿼리가 필요한 메서드는 직접 JPQL을 작성해 메서드를 정의할 수 있다.

```java
@Query("SELECT m FROM Member m WHERE m.name = :name AND m.age > :age")
List<Member> findByNameAndAgeGreaterThan(@Param("name") String name, @Param("age") int age);
```

이런식으로 `@Query` 어노테이션을 사용해 JPQL을 작성하고, `@Param` 어노테이션으로 파라미터를 바인딩할 수 있다.

> [!note]
> 더 복잡한 동적 쿼리가 필요할 경우 Querydsl 라이브러리를 사용하면 된다. (Querydsl을 통해 작성된 메서드를 정의한 인터페이스를 함께 상속함)

#### Bean 등록

Spring Data JPA를 사용하면, 자동으로 `@Repository` 어노테이션이 적용된 구현 클래스를 생성해 Bean으로 등록해주기 때문에 별도의 의존성 주입을 명시할 필요가 없다.

## Spring 컨테이너 활용

네 가지의 데이터베이스 접근 기술을 바꿔가며 테스트했지만, 정작 **비즈니스 로직을 수정한 적은 없었다.**

그 이유는, `MemberRepository` 라는 인터페이스를 기반으로 구현 클래스만 새로 작성했기 때문에 설정 파일만 변경되었을 뿐, Service 계층의 비즈니스 로직이 수정될 영향을 미치지 않았기 때문이다.

특히, Service 클래스 내에서 의존성을 주입하는 부분 또한, 각 구현 클래스 명칭에 따라 맞출 필요가 없었는데, 이는 **Bean 등록 시 어떤 구현 클래스가 주입되어야 할지 이미 명시**되었기 때문이다.

아래는 네 가지 데이터베이스 접근 방식을 바꿔가면서 수정했던 설정 파일이다.

```java
// SpringConfig.java

package angari.dev.spring_start;
 
...
 
@Configuration
public class SpringConfig {

    /**

    // 1~2. JDBC
    private DataSource dataSource;

    public SpringConfig(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    // 3. JPA
    private EntityManager em;

    public SpringConfig(EntityManager em) {
        this.em = em;
    }

    */

    // 4. Spring Data JPA
    public SpringConfig(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }
 
    @Bean
    public MemberService memberService() {
        return new MemberService(memberRepository());
    }
 

    /**

    @Bean
    public MemberRepository memberRepository() {
        return new JdbcMemberRepository(dataSource); // 1. JDBC 방식 구현체
        return new JdbcTemplateMemberRepository(dataSource); // 2. JDBC Template 방식 구현체
        return new JpaMemberRepository(em); // 3. JPA 방식 구현체
    }

    */
}
```
