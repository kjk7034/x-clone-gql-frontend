import { getClient } from "@/shared/api/apollo/client";
import {
  LoginInput,
  LoginMutation,
  LoginMutationVariables,
  CreateUserInput,
  CreateUserMutation,
  CreateUserMutationVariables,
} from "@/shared/api/__generated__/graphql";
import {
  LoginDocument,
  CreateUserDocument,
} from "@/shared/api/__generated__/graphql";
import {
  handleGraphQLError,
  GraphQLError,
  ERROR_CODES,
} from "@/shared/api/errors";

export const authService = {
  async login(credentials: LoginInput) {
    try {
      const { data } = await getClient().mutate<
        LoginMutation,
        LoginMutationVariables
      >({
        mutation: LoginDocument,
        variables: { loginInput: credentials },
      });
      if (!data) {
        throw new GraphQLError(ERROR_CODES.DATA.NO_DATA);
      }
      return data.login;
    } catch (error) {
      handleGraphQLError(error, {
        context: "Auth Login",
        defaultMessage: "로그인 중 오류가 발생했습니다.",
      });
    }
  },

  async createUser(userData: CreateUserInput) {
    try {
      const { data } = await getClient().mutate<
        CreateUserMutation,
        CreateUserMutationVariables
      >({
        mutation: CreateUserDocument,
        variables: { createUserInput: userData },
      });
      if (!data) {
        throw new GraphQLError(ERROR_CODES.DATA.NO_DATA);
      }
      return data.createUser;
    } catch (error) {
      handleGraphQLError(error, {
        context: "Auth CreateUser",
        defaultMessage: "회원가입 중 오류가 발생했습니다.",
      });
    }
  },
};
