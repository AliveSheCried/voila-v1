import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import dotenv from "dotenv";
dotenv.config();

const algorithm = "aes-256-cbc"; // Advanced Encryption Standard (AES)
const payoutDataKey = Buffer.from(
  process.env.PAYOUT_DATA_ENCRYPTION_KEY,
  "hex"
);
const authLinkKey = Buffer.from(process.env.AUTH_LINK_ENCRYPTION_KEY, "hex");
//const iv = Buffer.from(process.env.PAYOUT_DATA_ENCRYPTION_IV, "hex");

function getKey(dataType) {
  switch (dataType) {
    case "payout":
      return payoutDataKey;
    case "authLink":
      return authLinkKey;
    default:
      throw new Error("Invalid data type");
  }
}

export function encrypt(data, dataType) {
  const key = getKey(dataType);
  const iv = randomBytes(16); // Generate a new random IV for each encryption
  const cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(
    typeof data === "string" ? data : JSON.stringify(data),
    "utf8",
    "hex"
  );
  encrypted += cipher.final("hex");
  return { iv: iv.toString("hex"), encryptedData: encrypted };
}

export function decrypt(encryptedObj, dataType) {
  const key = getKey(dataType);
  const iv = Buffer.from(encryptedObj.iv, "hex");
  const encryptedText = Buffer.from(encryptedObj.encryptedData, "hex");
  const decipher = createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
