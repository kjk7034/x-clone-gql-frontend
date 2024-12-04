# 스터디에서 전달할 내용

GraphQL을 처음 접하는 사람도 있어서 간단한 내용을 정의

## 1. GraphQL이란?

- API를 위한 쿼리 언어이자 런타임
- 단일 엔드포인트(`/graphql`)에서 모든 데이터 통신 처리
- REST API와 달리 클라이언트가 필요한 데이터를 정확히 명시하여 요청

## 2. 코드 생성 (Codegen) 설명

```typescript
const config: CodegenConfig = {
  schema: "http://localhost:4000/graphql",    // 서버의 GraphQL 스키마 위치
  documents: ["src/**/*.ts", "src/**/*.tsx"], // 클라이언트의 GraphQL 쿼리 파일들
  generates: {
    "./src/shared/api/__generated__/": {      // 생성될 타입 파일 위치
      preset: "client",

```

- 서버의 GraphQL 스키마를 기반으로 TypeScript 타입 자동 생성
- 타입 안정성과 자동완성 지원
- API 변경 시 타입 불일치를 즉시 감지 가능

## 3. GraphQL 작업 유형과 쿼리 정의

```typescript
// Query (데이터 조회) - REST의 GET과 유사
export const ME_QUERY = gql(`
  query Me {
    me {
      id
      email
      nickname
    }
  }
`);

// Mutation (데이터 변경) - REST의 POST/PUT/DELETE와 유사
export const LoginDocument = gql(`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      access_token
      sessionId
    }
  }
`);
```

- Query: 데이터 조회 작업 (읽기 전용)
- Mutation: 데이터 변경 작업 (생성/수정/삭제)
- 필요한 필드만 선택적으로 요청 가능
- 변수를 통한 동적 데이터 전달 ($변수명)

## 4. 서비스 구현

```typescript
async login(credentials: LoginInput) {
  const { data } = await getClient().mutate
    LoginMutation,                // 응답 타입
    LoginMutationVariables       // 요청 변수 타입
  >({
    mutation: LoginDocument,
    variables: { loginInput: credentials },
  });
}
```

- 자동 생성된 타입을 활용한 타입 안전성 보장
- Apollo Client를 통한 GraphQL 요청 처리
- 체계적인 에러 핸들링과 응답 처리

## 5. REST API와의 주요 차이점

- 단일 엔드포인트 사용
- 오버페칭(불필요한 데이터)/언더페칭(추가 요청 필요) 문제 해결
- 강력한 타입 시스템 제공
- 필요한 데이터만 선택적으로 요청
- 여러 리소스를 하나의 요청으로 조회 가능

## 6. 장점

- 프론트엔드 개발 시 강력한 타입 지원으로 개발 생산성 향상
- API 스키마가 곧 문서가 되어 항상 최신 상태 유지
- 클라이언트가 필요한 데이터를 정확히 정의하여 효율적인 데이터 전송
- 단일 엔드포인트로 API 버전 관리 용이
- 개발 도구와 생태계가 잘 갖춰져 있음

## 7. 실제 사용 예시

```typescript
// 쿼리 실행
const { data } = await getClient().query({
  query: ME_QUERY,
});

// 뮤테이션 실행
const { data } = await getClient().mutate({
  mutation: LoginDocument,
  variables: {
    loginInput: {
      email: "test@email.com",
      password: "password123",
    },
  },
});
```
