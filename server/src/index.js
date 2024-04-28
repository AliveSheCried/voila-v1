import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import pkg from "body-parser";
import cors from "cors";
import express from "express";
import http from "http";
import { MongoClient } from "mongodb";
const { json } = pkg;

//imports not related to Apollo / Express packages
import dotenv from "dotenv";
import {
  TLAccessTokenAPI as tlAccessTokenAPI,
  TLDataAPI as tlDataAPI,
  TLMerchantAccountAPI as tlMerchantAccountAPI,
  TLPayoutAPI as tlPayoutAPI,
} from "./datasources/trueLayer/index.js";
import resolvers from "./schema/resolvers.js";
import typeDefs from "./schema/schema.js";
dotenv.config();

// Create a new MongoClient
const client = new MongoClient(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Establish and verify connection
    await client.db("VoilaDev").command({ ping: 1 });
    console.log("Connected successfully to server");

    // Make client available globally
    global.dbClient = client;

    // Start the server after the dbClient is ready
    await startServer();
  } catch (err) {
    console.log(err.stack);
  }
}

run().catch(console.dir);

// Start Server Function
async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

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

  // REST endpoint for fetching payout transactions; this will, in turn, be used to search the graphQL endpoint to get transaction detail / status from TL
  app.get("/api/transactions", async (req, res) => {
    try {
      const { page = 1, pageSize = 10, search = "" } = req.query;
      const db = client.db("VoilaDev");
      const transactionsCollection = db.collection("MerchantPayouts");

      // Convert page and pageSize to numbers to use in skip and limit
      const pageNum = parseInt(page);
      const pageSizeNum = parseInt(pageSize);
      const skip = (pageNum - 1) * pageSizeNum;

      // Building the query for search functionality
      let query = {};
      if (search) {
        query.$or = [
          { account_holder_name: { $regex: search, $options: "i" } },
          { reference: { $regex: search, $options: "i" } },
        ];
      }

      const transactions = await transactionsCollection
        .find(query)
        .skip(skip)
        .limit(pageSizeNum)
        .toArray();
      const total = await transactionsCollection.countDocuments(query);

      res.status(200).json({ transactions, total });
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

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
            tlAccessTokenAPI: new tlAccessTokenAPI({ cache, token }),
            tlDataAPI: new tlDataAPI({ cache, token }),
            tlMerchantAccountAPI: new tlMerchantAccountAPI({ cache, token }),
            tlPayoutAPI: new tlPayoutAPI({ cache, token }),
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

  process.on("SIGINT", async () => {
    await client.close();
    process.exit();
  });
}

// // Create a new MongoClient
// const client = new MongoClient(process.env.MONGO_DB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// async function run() {
//   try {
//     // Connect the client to the server
//     await client.connect();

//     // Establish and verify connection
//     await client.db("VoilaDev").command({ ping: 1 });
//     console.log("Connected successfully to server");

//     // Make client available globally
//     global.dbClient = client;
//   } catch (err) {
//     console.log(err.stack);
//   }
// }

// run().catch(console.dir);

// ////imports end
// const app = express();
// const httpServer = http.createServer(app);

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ({ req }) => {
//     const { dbClient } = global;
//     const token = req.headers.authorization || "";
//     return {
//       dbClient,
//       token,
//     };
//   },
//   plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
//   introspection: true,
//   playground: {
//     settings: {
//       "schema.polling.enable": true,
//     },
//   },
// });
// await server.start();

// app.use(
//   "/graphql",
//   cors(),
//   json(),
//   expressMiddleware(server, {
//     context: async ({ req }) => {
//       const token = req.headers.authorization;
//       const { cache } = server;
//       return {
//         token,
//         dataSources: {
//           tlAccessTokenAPI: new tlAccessTokenAPI({ cache, token }),
//           tlDataAPI: new tlDataAPI({ cache, token }),
//           tlMerchantAccountAPI: new tlMerchantAccountAPI({ cache, token }),
//           tlPayoutAPI: new tlPayoutAPI({ cache, token }),
//         },
//       };
//     },
//   })
// );

// await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

// console.log(`
//   🚀 Server ready
//   📭 Query at http://localhost:4000/graphql
//   `);

// process.on("SIGINT", async () => {
//   await client.close();
//   process.exit();
// });
