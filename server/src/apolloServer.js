import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import validator from "validator";
import logger from "./config/logger.js";
import {
  TLAccessTokenAPI as tlAccessTokenAPI,
  TLDataAPI as tlDataAPI,
  TLMerchantAccountAPI as tlMerchantAccountAPI,
  TLPayoutAPI as tlPayoutAPI,
  TLUserPaymentAPI as tlUserPaymentAPI,
} from "./datasources/trueLayer/index.js";
import { decrypt, encrypt } from "./helpers/encryptionHelper.js";
import { handleAPIRequest } from "./helpers/handleAPIRequest.js";
import resolvers from "./schema/resolvers.js";
import typeDefs from "./schema/schema.js";

export async function startApolloServer(app, httpServer, ngrokUrl) {
  logger.info("Starting Apollo Server...");
  console.log("Webhook URL:", `${ngrokUrl}/webhooks/truelayer/data`);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: true,
    cors: {
      origin: "http://127.0.0.1:5173", // Local client URL
      credentials: true,
    },
  });

  await server.start();
  logger.info("Apollo Server started");

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        logger.info("Express middleware context function called");

        const context = {
          dbClient: global.dbClient,
          token: req.headers.authorization || "",
          validator,
          encrypt,
          decrypt,
          logger,
          dataSources: {
            tlAccessTokenAPI: new tlAccessTokenAPI(handleAPIRequest, {
              cache: server.cache,
              token: req.headers.authorization || "",
            }),
            tlDataAPI: new tlDataAPI({
              cache: server.cache,
              token: req.headers.authorization || "",
              webhookURL: ngrokUrl,
            }),
            tlMerchantAccountAPI: new tlMerchantAccountAPI(handleAPIRequest, {
              cache: server.cache,
              token: req.headers.authorization || "",
            }),
            tlPayoutAPI: new tlPayoutAPI(handleAPIRequest, {
              cache: server.cache,
              token: req.headers.authorization || "",
            }),
            tlUserPaymentAPI: new tlUserPaymentAPI(handleAPIRequest, {
              cache: server.cache,
              token: req.headers.authorization || "",
            }),
          },
        };

        return context;
      },
    })
  );

  logger.info("Apollo Server started");
  return server;
}
