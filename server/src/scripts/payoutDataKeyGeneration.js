import { randomBytes } from "crypto";

const key = randomBytes(32).toString("hex");
const iv = randomBytes(16).toString("hex");

console.log("ENCRYPTION_KEY:", key);
console.log("ENCRYPTION_IV:", iv);
