import test from "ava";
import { decrypt, encrypt } from "../../helpers/encryptionHelper.js";

test("encryption and decryption", (t) => {
  const data = "Test data";

  // Encrypt the data
  const encrypted = encrypt(data);

  // Decrypt the data
  const decrypted = decrypt(encrypted);

  // Check if the decrypted data matches the original data
  t.is(decrypted, data);
});
