import { resolvers } from "./previousResolver.js";
import queries from "./queries.js";
//import { resolvers } from "./resolverIndex.js";
import types from "./types.js";

console.log(resolvers);

export const MerchantAccount = { queries, resolvers, types };
