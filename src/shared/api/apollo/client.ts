import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { authLink, httpLink } from "./options";

let clientInstance: ApolloClient<NormalizedCacheObject> | null = null;

export const getClient = () => {
  // 서버 사이드에서는 항상 새 인스턴스 생성
  if (typeof window === "undefined") {
    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
      // 서버 사이드에서는 DevTools가 필요 없음
      connectToDevTools: false,
    });
  }

  // 클라이언트 사이드에서는 인스턴스 재사용
  if (!clientInstance) {
    clientInstance = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
      connectToDevTools: process.env.NODE_ENV === "development",
    });
  }

  return clientInstance;
};
