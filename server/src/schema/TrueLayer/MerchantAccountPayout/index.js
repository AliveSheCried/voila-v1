import { mutations } from "./mutations.js";
import { queries } from "./queries.js";
import createPayoutExternalAccount from "./resolverCreatePayout.js";
import payoutDetail from "./resolverPayoutDetail.js";
import types from "./types.js";

const resolvers = {
  ...payoutDetail,
  ...createPayoutExternalAccount,
};

export const MerchantAccountPayout = { mutations, resolvers, types, queries };
