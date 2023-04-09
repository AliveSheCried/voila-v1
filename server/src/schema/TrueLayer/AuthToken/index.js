import { mutations } from "./mutations.js";
import { resolvers } from "./resolvers.js";
import types from "./types.js";

console.log(resolvers);

export const AuthToken = { mutations, resolvers, types };
