import { createUserPayment, getPayment } from "./resolverCreateUserPayment.js";

const mutations = {
  createUserPayment: createUserPayment,
};

const queries = {
  getPayment: getPayment,
};

export const resolvers = { mutations, queries };
