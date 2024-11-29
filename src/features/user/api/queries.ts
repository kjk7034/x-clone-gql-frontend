import { gql } from "@/shared/api/__generated__";

export const ME_QUERY = gql(`
  query Me {
    me {
      id
      email
      nickname
    }
  }
`);
