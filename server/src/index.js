import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import http from "http";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import { startApolloServer } from "./apolloServer.js";
import logger from "./config/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { dataAuthLinkHandler } from "./routes/dataAuthLink.js";
import { dataCallbackHandler } from "./routes/dataCallback.js";
import { dataAuthCodeDecryptHandler } from "./routes/dataCodeDecrypt.js";
import { dataTokenHandler } from "./routes/dataToken.js";
import { loginHandler } from "./routes/login.js";
import { transactionsHandler } from "./routes/transactions.js";

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_DB_URI, {
  dbName: "VoilaDev",
});

const client = new MongoClient(process.env.MONGO_DB_URI);

async function startServer(app, httpServer, client) {
  const corsOptions = {
    //origin: "http://127.0.0.1:5173", // Local client URL
    origin: "*",
    optionsSuccessStatus: 200,
    //credentials: true,
  };

  app.use(cors(corsOptions));

  // Use body-parser middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // API routes
  // Data API routes
  app.post("/redirect-to-auth", (req, res) => {
    const { userId } = req.body;
    dataAuthLinkHandler(userId, res);
  });
  // Data API auth link
  app.post("/data/callback", dataCallbackHandler()); // Data API callback
  app.get("/data/get-token", dataTokenHandler()); // Data API get token - called directly from server (if user doesn't have auth code)
  app.post("/data/decrypt-auth-code", dataAuthCodeDecryptHandler()); // Data API decrypt auth code

  // Login route
  app.post("/api/login", loginHandler());

  // REST endpoint for fetching payout transactions
  app.get("/api/transactions", transactionsHandler(client));

  // Serve front-end application
  // Ensure this is defined after all API routes
  app.use(express.static("../../client/index.html"));

  // Error handler should be the last piece of middleware
  app.use(errorHandler);

  logger.info("Starting Apollo Server");
  await startApolloServer(app, httpServer, client);

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

  console.log(`🚀 Server ready at http://localhost:4000/graphql`);

  process.on("SIGINT", async () => {
    await client.close();
    process.exit();
  });
}

async function run(client) {
  try {
    await client.connect();
    await client.db("VoilaDev").command({ ping: 1 });
    logger.info("Connected successfully to MongoDB");

    // Make client available globally
    global.dbClient = client;

    const app = express();
    const httpServer = http.createServer(app);

    logger.info("Running server setup");
    await startServer(app, httpServer, client);
  } catch (err) {
    logger.error(err.stack);
  }
}

run(client).catch(console.error);
