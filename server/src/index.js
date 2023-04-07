import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import pkg from "body-parser";
import cors from "cors";
import express from "express";
import http from "http";
const { json } = pkg;

//imports not related to Apollo / Express packages
import dotenv from "dotenv";
import {
  tlAccessTokenAPI,
  tlDataAPI,
  tlMerchantAccountAPI,
  tlPayoutAPI,
} from "./datasources/trueLayer/index.js";
import resolvers from "./schema/resolvers.js";
import typeDefs from "./schema/schema.js";
dotenv.config();

/////imports end
const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  "/graphql",
  cors(),
  json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const token = req.headers.authorization;
      const { cache } = server;
      return {
        token,
        dataSources: {
          trueLayer: {
            accessTokenAPI: new tlAccessTokenAPI({ cache, token }),
            dataAPI: new tlDataAPI({ cache, token }),
            merchantAccountAPI: new tlMerchantAccountAPI({ cache, token }),
            payoutAPI: new tlPayoutAPI({ cache, token }),
          },
        },
      };
    },
  })
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log(`
  🚀 Server ready 
  📭 Query at http://localhost:4000/graphql
  `);
