import { ERROR_CODES } from "./codes";

export const ERROR_MESSAGES: Record<string, string> = {
  // Auth
  [ERROR_CODES.AUTH.DUPLICATE_EMAIL]: "이미 사용 중인 이메일입니다.",
  [ERROR_CODES.AUTH.DUPLICATE_NICKNAME]: "이미 사용 중인 닉네임입니다.",
  [ERROR_CODES.AUTH.INVALID_CREDENTIALS]:
    "이메일 또는 비밀번호가 올바르지 않습니다.",
  [ERROR_CODES.AUTH.VALIDATION_ERROR]: "입력값이 올바르지 않습니다.",
  [ERROR_CODES.AUTH.LOGIN_REQUIRED]: "로그인이 필요합니다.",
  [ERROR_CODES.AUTH.EMAIL_NOT_VERIFIED]: "이메일 인증이 필요합니다.",
  [ERROR_CODES.AUTH.PASSWORD_MISMATCH]: "비밀번호가 일치하지 않습니다.",
  [ERROR_CODES.AUTH.ACCOUNT_DISABLED]: "비활성화된 계정입니다.",
  [ERROR_CODES.AUTH.TOO_MANY_ATTEMPTS]:
    "로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.",

  // User
  [ERROR_CODES.USER.NOT_FOUND]: "사용자를 찾을 수 없습니다.",
  [ERROR_CODES.USER.UNAUTHORIZED]: "권한이 없습니다.",

  // Common
  [ERROR_CODES.COMMON.NETWORK_ERROR]: "네트워크 오류가 발생했습니다.",
  [ERROR_CODES.COMMON.INTERNAL_ERROR]: "내부 오류가 발생했습니다.",

  // Data
  [ERROR_CODES.DATA.NO_DATA]: "데이터를 받아오지 못했습니다.",
  [ERROR_CODES.DATA.INVALID_RESPONSE]: "잘못된 응답을 받았습니다.",
};
