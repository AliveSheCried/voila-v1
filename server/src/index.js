import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import pkg from "body-parser";
const { json } = pkg;

//imports not related to Apollo / Express packages
import dotenv from "dotenv";
dotenv.config();
import { TrueLayerAuthAPI } from "./datasources/trueAuthLayer_api.js";
import { TrueLayerAPI } from "./datasources/trueLayer_api.js";
import typeDefs from "./schema/schema.js";
import resolvers from "./schema/resolvers.js";

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
          trueLayerAuthAPI: new TrueLayerAuthAPI({ cache, token }),
          trueLayerAPI: new TrueLayerAPI({ cache, token }),
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
