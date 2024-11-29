# Next.js GraphQL 설정

이 프로젝트는 [x-clone-backend](https://github.com/kjk7034/x-clone-backend)에서 개발된 GraphQL API를 사용하여 프론트엔드 환경을 설정하는 예제입니다.

GraphQL 기반 API와 Next.js를 활용한 프론트엔드 구현 예제로, 확장 가능한 Feature-Sliced Design 아키텍처를 따릅니다. 인증 및 사용자 관리와 같은 주요 기능이 포함되어 있습니다.

## 기술 스택

- **React/Next.js**: 서버 사이드 렌더링과 클라이언트 사이드 렌더링
- **Apollo Client**: GraphQL 클라이언트
- **TypeScript**: 타입 안정성 보장
- **Feature-Sliced Design(FSD)**: 모듈화된 구조
- **NextAuth.js**: 인증 처리

## 프로젝트 구조

이 프로젝트는 Feature-Sliced Design(FSD) 아키텍처를 따릅니다.  
FSD는 기능별로 모듈을 나누어 코드의 재사용성과 유지보수성을 향상시키는 아키텍처입니다.

```
src/
├─ features/            # 비즈니스 로직 단위
│  ├─ auth/             # 인증 관련 기능
│  │  ├─ api/           # GraphQL mutations, 서비스
│  │  ├─ lib/           # 유틸리티 함수
│  │  ├─ model/         # 타입, 스키마
│  │  └─ ui/            # 컴포넌트
│  └─ user/             # 사용자 관련 기능
├─ shared/              # 공통 기능
│  ├─ api/              # API 설정
│  │  ├─ apollo/        # Apollo Client 설정
│  │  ├─ errors/        # 에러 처리
│  │  └─ generated/     # GraphQL 생성 타입
│  ├─ lib/              # 유틸리티
│  ├─ types/            # 타입 정의
│  └─ ui/               # 공통 UI 컴포넌트
└─ widgets/             # 복잡한 UI 블록
```

## 시작하기

### 1. 환경 변수 설정

`.env.local` 파일 생성

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_DEBUG=true

NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
```

### 2. 의존성 설치

```
yarn
```

### 3. 개발 서버 실행

```
yarn dev
```

### 4. GraphQL 타입 생성

GraphQL 스키마에 기반한 타입 정의 파일을 자동 생성합니다.  
새로운 GraphQL 쿼리나 스키마 변경 시 반드시 실행해야 합니다.

```
yarn generate
```

## 주의사항

- `x-clone-backend`에서 백엔드 서버가 실행 필요
- GraphQL 스키마가 변경될 때마다 `yarn generate` 실행 필요
- 환경 변수 설정 필수
- 서버 컴포넌트와 클라이언트 컴포넌트의 구분 주의
