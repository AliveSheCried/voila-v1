import { createPayoutExternalAccount } from "./resolverCreatePayout.js";
import { payoutDetail } from "./resolverPayoutDetail.js";

const mutations = {
  createPayoutExternalAccount: createPayoutExternalAccount,
};

const queries = {
  payoutDetail: payoutDetail,
};

export const resolvers = { mutations, queries };
