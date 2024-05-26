import { createCipheriv, createDecipheriv } from "crypto";
import dotenv from "dotenv";
dotenv.config();

const algorithm = "aes-256-cbc"; // Advanced Encryption Standard (AES)
const key = Buffer.from(process.env.PAYOUT_DATA_ENCRYPTION_KEY, "hex");
const iv = Buffer.from(process.env.PAYOUT_DATA_ENCRYPTION_IV, "hex");

export function encrypt(data) {
  const cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(
    typeof data === "string" ? data : JSON.stringify(data),
    "utf8",
    "hex"
  );
  encrypted += cipher.final("hex");
  return { iv: iv.toString("hex"), encryptedData: encrypted };
}

export function decrypt(encryptedObj) {
  const iv = Buffer.from(encryptedObj.iv, "hex");
  const encryptedText = Buffer.from(encryptedObj.encryptedData, "hex");
  const decipher = createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
