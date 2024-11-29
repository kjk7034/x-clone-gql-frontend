import { HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/lib/next-auth";

export const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
});

export const authLink = setContext(async (operation, { headers }) => {
  // 인증이 필요없는 operations 리스트
  const publicOperations = ["Login", "CreateUser"];

  // operation 이름이 publicOperations에 포함되어 있다면 기본 헤더만 전달
  if (
    operation.operationName &&
    publicOperations.includes(operation.operationName)
  ) {
    return {
      headers: {
        ...headers,
      },
    };
  }

  // 서버사이드인지 확인
  if (typeof window === "undefined") {
    const session = await getServerSession(authOptions);
    return {
      headers: {
        ...headers,
        authorization: session?.accessToken
          ? `Bearer ${session.accessToken}`
          : "",
      },
    };
  }

  // 클라이언트 사이드의 경우 세션에서 토큰을 가져옴
  return {
    headers: {
      ...headers,
      // 클라이언트 사이드에서는 next-auth가 자동으로 처리
    },
  };
});
