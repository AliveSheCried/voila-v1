import { randomBytes } from "crypto";

const key = randomBytes(32).toString("hex");

console.log("ENCRYPTION_KEY:", key);
