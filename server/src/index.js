import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server";
import { TrueLayerAuthAPI } from "./datasources/trueAuthLayer_api.js";
import { TrueLayerAPI } from "./datasources/trueLayer_api.js";
import typeDefs from "./schema/schema.js";
import resolvers from "./schema/resolvers.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { token: req.headers.authorization };
  },
  dataSources: () => {
    return {
      trueLayerAuthAPI: new TrueLayerAuthAPI(),
      trueLayerAPI: new TrueLayerAPI(),
    };
  },
});

server.listen().then(() => {
  console.log(`
        🚀  Server is running!
        🔉  Listening on port 4000
        📭  Query at http://localhost:4000
      `);
});
