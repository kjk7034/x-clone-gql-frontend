import { getClient } from "@/shared/api/apollo/client";
import { MeQuery } from "@/shared/api/__generated__/graphql";
import { ME_QUERY } from "./queries";

export const userService = {
  async getMe() {
    const { data } = await getClient().query<MeQuery>({
      query: ME_QUERY,
    });
    return data.me;
  },
};
