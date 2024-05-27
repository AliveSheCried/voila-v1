import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import {
  TLAccessTokenAPI as tlAccessTokenAPI,
  TLDataAPI as tlDataAPI,
  TLMerchantAccountAPI as tlMerchantAccountAPI,
  TLPayoutAPI as tlPayoutAPI,
} from "./datasources/trueLayer/index.js";
import resolvers from "./schema/resolvers.js";
import typeDefs from "./schema/schema.js";

export async function startApolloServer(app, httpServer) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const { dbClient } = global;
      const token = req.headers.authorization || "";

      return {
        dbClient,
        token,
      };
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: true,
    playground: {
      settings: {
        "schema.polling.enable": true,
      },
    },
  });
  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization;
        const { cache } = server;
        return {
          token,
          dataSources: {
            tlAccessTokenAPI: new tlAccessTokenAPI({ cache, token }),
            tlDataAPI: new tlDataAPI({ cache, token }),
            tlMerchantAccountAPI: new tlMerchantAccountAPI({ cache, token }),
            tlPayoutAPI: new tlPayoutAPI({ cache, token }),
          },
        };
      },
    })
  );

  return server;
}
