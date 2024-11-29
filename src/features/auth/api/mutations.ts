import { gql } from "@/shared/api/__generated__";

export const LoginDocument = gql(`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      access_token
      sessionId
    }
  }
`);

export const CreateUserDocument = gql(`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      email
      nickname
      createdAt
      updatedAt
    }
  }
`);
