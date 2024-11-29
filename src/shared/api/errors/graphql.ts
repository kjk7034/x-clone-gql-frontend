import { ApolloError } from "@apollo/client";
import { ErrorHandlerOptions } from "./types";
import { ERROR_CODES } from "./codes";
import { ERROR_MESSAGES } from "./messages";

export class GraphQLError extends Error {
  code?: string;
  timestamp: Date;

  constructor(message: string, code?: string) {
    super(message);
    this.code = code;
    this.timestamp = new Date();
    this.name = "GraphQLError";
  }
}

function logError(
  context: string,
  error: unknown,
  additionalInfo?: Record<string, unknown>
) {
  console.error(`[GraphQL Error] ${context}:`, {
    timestamp: new Date().toISOString(),
    error,
    ...additionalInfo,
  });
}

export const handleGraphQLError = (
  error: unknown,
  options: ErrorHandlerOptions = {}
) => {
  const {
    defaultMessage = "오류가 발생했습니다",
    context = "",
    onError,
  } = options;

  let errorMessage: string;
  let errorCode: string | undefined;

  if (error instanceof ApolloError) {
    const graphqlError = error.graphQLErrors[0];
    const code = graphqlError?.extensions?.code as keyof typeof ERROR_MESSAGES;

    if (error.networkError) {
      logError(context, error.networkError, { type: "network" });
      errorMessage = ERROR_MESSAGES[ERROR_CODES.COMMON.NETWORK_ERROR];
      errorCode = ERROR_CODES.COMMON.NETWORK_ERROR;
    } else if (code) {
      logError(context, graphqlError, { code });
      errorMessage =
        ERROR_MESSAGES[code] || graphqlError?.message || defaultMessage;
      errorCode = code;
    } else {
      errorMessage = defaultMessage;
      errorCode = ERROR_CODES.COMMON.INTERNAL_ERROR;
    }
  } else if (error instanceof Error) {
    logError(context, error);
    errorMessage = error.message;
    errorCode = ERROR_CODES.COMMON.INTERNAL_ERROR;
  } else {
    logError(context, error);
    errorMessage = defaultMessage;
    errorCode = ERROR_CODES.COMMON.INTERNAL_ERROR;
  }

  // onError 콜백이 있으면 실행
  if (onError) {
    onError(errorMessage);
    return; // 콜백 실행 후 종료
  }

  // onError 콜백이 없으면 에러를 throw
  throw new GraphQLError(errorMessage, errorCode);
};
