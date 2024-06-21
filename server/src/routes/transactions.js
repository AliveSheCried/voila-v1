import logger from "../config/logger.js";
import { decrypt } from "../helpers/encryptionHelper.js";

export function transactionsHandler(client) {
  return async (req, res) => {
    console.log("transactionsHandler invoked");
    try {
      const { page = 1, pageSize = 10, search = "" } = req.query;
      const db = client.db("VoilaDev");
      const transactionsCollection = db.collection("MerchantPayouts");

      const pageNum = parseInt(page);
      const pageSizeNum = parseInt(pageSize);
      const skip = (pageNum - 1) * pageSizeNum;

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

      console.log("transactions:", transactions);

      const decryptedTransactions = transactions.map((transaction) => {
        console.log("transaction:", transaction);
        try {
          if (transaction) {
            console.log("Decrypting transaction:", transaction);
            const decryptedTransaction = decrypt(transaction);
            console.log("decryptedTransaction:", decryptedTransaction);
            logger.info("Decrypted transaction:", decryptedTransaction);
            return JSON.parse(decryptedTransaction);
          } else {
            console.log("No encryptedData found for transaction:", transaction);
          }
        } catch (err) {
          logger.error("Error decrypting transaction:", err);
          throw err;
        }
      });

      const total = await transactionsCollection.countDocuments(query);

      res.status(200).json({ transactions: decryptedTransactions, total });
    } catch (error) {
      console.log("Error caught:", error);
      logger.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  };
}

// import logger from "../config/logger.js";
// import { decrypt } from "../helpers/encryptionHelper.js";

// export function transactionsHandler(client) {
//   return async (req, res) => {
//     console.log("transactionsHandler invoked"); // Add logging here
//     try {
//       const { page = 1, pageSize = 10, search = "" } = req.query;
//       const db = client.db("VoilaDev");
//       const transactionsCollection = db.collection("MerchantPayouts");

//       // Convert page and pageSize to numbers to use in skip and limit
//       const pageNum = parseInt(page);
//       const pageSizeNum = parseInt(pageSize);
//       const skip = (pageNum - 1) * pageSizeNum;

//       // Building the query for search functionality
//       let query = {};
//       if (search) {
//         query.$or = [
//           { account_holder_name: { $regex: search, $options: "i" } },
//           { reference: { $regex: search, $options: "i" } },
//         ];
//       }

//       const transactions = await transactionsCollection
//         .find(query)
//         .skip(skip)
//         .limit(pageSizeNum)
//         .toArray();

//       if (!transactions || transactions.length === 0) {
//         throw new Error("No transactions found");
//       }

//       console.log("transactions:", transactions);

//       // Decrypt each transaction
//       const decryptedTransactions = transactions.map((transaction) => {
//         console.log("transaction:", transaction);
//         if (!transaction) {
//           throw new Error("Invalid transaction");
//         }
//         try {
//           //const decryptedTransaction = decrypt(transaction);
//           const decryptedTransaction = decrypt(transaction.encryptedData);
//           console.log("decryptedTransaction:", decryptedTransaction);
//           logger.info("Decrypted transaction:", decryptedTransaction);
//           return JSON.parse(decryptedTransaction);
//         } catch (err) {
//           logger.error("Error decrypting transaction:", err);
//           throw err;
//           //return transaction; // Return the encrypted transaction if decryption fails
//         }
//       });

//       const total = await transactionsCollection.countDocuments(query);

//       res.status(200).json({ transactions: decryptedTransactions, total });
//     } catch (error) {
//       console.log("Error caught:", error);
//       logger.error("Error fetching transactions:", error);
//       res.status(500).json({ message: "Failed to fetch transactions" });
//     }
//   };
// }
