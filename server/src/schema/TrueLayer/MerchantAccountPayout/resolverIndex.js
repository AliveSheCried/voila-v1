import createPayoutExternalAccount from "./resolverCreatePayout.js";
import payoutDetail from "./resolverPayoutDetail.js";

const mutations = {
  ...createPayoutExternalAccount,
};

const queries = {
  ...payoutDetail,
};

export const resolvers = { mutations, queries };
