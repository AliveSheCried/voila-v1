import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import logger from "../config/logger.js"; // Adjust the path as necessary

dotenv.config(); // Load environment variables

const client = new MongoClient(process.env.MONGO_DB_URI);

async function migrateDocuments() {
  try {
    await client.connect();
    const db = client.db("VoilaDev");
    const collection = db.collection("MerchantPayouts");

    // Find documents that have the encryptedData field
    const cursor = collection.find({ encryptedData: { $exists: true } });

    const docsToMigrate = await cursor.count();
    if (docsToMigrate === 0) {
      logger.info("No documents found for migration.");
      console.log("No documents found for migration.");
      return;
    }

    logger.info(`Found ${docsToMigrate} documents for migration.`);
    console.log(`Found ${docsToMigrate} documents for migration.`);

    while (await cursor.hasNext()) {
      const document = await cursor.next();
      console.log(`Processing document ID: ${document._id}`);
      logger.info(`Processing document ID: ${document._id}`);

      // List of keys to remove
      const keysToRemove = Object.keys(document).filter(
        (key) => key !== "_id" && key !== "encryptedData" && key !== "iv"
      );
      const unsetFields = keysToRemove.reduce(
        (acc, key) => ({ ...acc, [key]: "" }),
        {}
      );

      await collection.updateOne(
        { _id: document._id },
        { $unset: unsetFields } // Remove the original fields
      );

      logger.info(`Document with ID ${document._id} updated successfully`);
      console.log(`Document with ID ${document._id} updated successfully`);
    }
  } catch (error) {
    logger.error(`Error migrating documents: ${error.message}`);
    console.error(`Error migrating documents: ${error.message}`);
  } finally {
    await client.close();
  }
}

migrateDocuments().catch((error) => {
  logger.error(`Migration script failed: ${error.message}`);
  console.error(`Migration script failed: ${error.message}`);
});
