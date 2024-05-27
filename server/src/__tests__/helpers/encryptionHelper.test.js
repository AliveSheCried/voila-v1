import { randomBytes } from "crypto";
import { decrypt, encrypt } from "./encryptionHelper";

describe("encryptionHelper", () => {
  let data, encryptedData, decryptedData;

  beforeEach(() => {
    data = randomBytes(256).toString("hex");
  });

  it("encrypts the data correctly", () => {
    encryptedData = encrypt(data);
    expect(encryptedData).toHaveProperty("iv");
    expect(encryptedData).toHaveProperty("encryptedData");
  });

  it("decrypts the data correctly", () => {
    decryptedData = decrypt(encryptedData);
    expect(decryptedData).toEqual(data);
  });

  it("does not decrypt data with wrong iv", () => {
    const wrongIvData = {
      ...encryptedData,
      iv: randomBytes(16).toString("hex"),
    };
    expect(() => decrypt(wrongIvData)).toThrow();
  });

  it("does not decrypt data with wrong encryptedData", () => {
    const wrongEncryptedData = {
      ...encryptedData,
      encryptedData: randomBytes(256).toString("hex"),
    };
    expect(() => decrypt(wrongEncryptedData)).toThrow();
  });
});
