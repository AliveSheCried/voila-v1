import ngrok from "@ngrok/ngrok";
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
import { dataWebhookHandler } from "./routes/dataWebhook.js";
import { loginHandler } from "./routes/login.js";
import { transactionsHandler } from "./routes/transactions.js";

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_DB_URI, {
  dbName: "VoilaDev",
});

const client = new MongoClient(process.env.MONGO_DB_URI);

async function startServer(app, httpServer, client, ngrokUrl) {
  //logger.info("ngrok URL startServer:", ngrokUrl);
  console.log("ngrok URL startServer:", ngrokUrl);
  console.log("ngrokUrl type startServer:", typeof ngrokUrl); // Log the type of
  const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
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

  // Webhook routes
  app.post("/webhooks/truelayer/data", dataWebhookHandler()); // Truelayer user data API webhook

  // Login route
  app.post("/api/login", loginHandler());

  // REST endpoint for fetching payout transactions
  app.get("/api/transactions", transactionsHandler(client));

  // Serve front-end application
  app.use(express.static("../../client/index.html"));

  // Error handler should be the last piece of middleware
  app.use(errorHandler);

  logger.info("Starting Apollo Server");
  console.log("ngrok URL before apolloServer:", ngrokUrl);
  console.log("ngrokUrl type before startApolloServer:", typeof ngrokUrl); // Log the type of ngrokUrl
  await startApolloServer(app, httpServer, ngrokUrl);

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

  console.log(`🚀 Server ready at http://localhost:4000/graphql`);

  console.log(`Ingress established at: ${ngrokUrl}`);

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

    // Start ngrok and get the URL
    const listener = await ngrok.connect({
      addr: 4000,
      authtoken_from_env: true,
    });

    let ngrokUrl = listener.url();
    logger.info(`ngrok URL: ${ngrokUrl}`); // Log the ngrok URL to verify it's a string

    // Explicitly convert ngrokUrl to a string
    ngrokUrl = String(ngrokUrl);

    const app = express();
    const httpServer = http.createServer(app);

    logger.info("Running server setup");
    await startServer(app, httpServer, client, ngrokUrl);
  } catch (err) {
    logger.error(err.stack);
  }
}

run(client).catch(console.error);
