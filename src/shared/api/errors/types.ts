import { ERROR_CODES } from "./codes";

export type ErrorHandlerOptions = {
  defaultMessage?: string;
  context?: string;
  onError?: (message: string) => void;
};

export type ErrorCode = typeof ERROR_CODES;
