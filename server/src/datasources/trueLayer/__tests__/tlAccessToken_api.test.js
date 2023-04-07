import { TLAccessTokenAPI } from "../tlAccessToken_api.js";

describe("TLAccessTokenAPI", () => {
  let tlAccessTokenAPI;

  beforeAll(() => {
    tlAccessTokenAPI = new TLAccessTokenAPI();
  });

  describe("generateAccessToken", () => {
    it("should generate an access token", async () => {
      const scope = "scope";
      const grant_type = "grant_type";
      const redirect_uri = "redirect_uri";
      const code = "code";

      const response = await tlAccessTokenAPI.generateAccessToken(
        scope,
        grant_type,
        redirect_uri,
        code
      );

      expect(response).toHaveProperty("access_token");
      expect(response).toHaveProperty("token_type", "Bearer");
    });

    it("should throw an error if the request fails", async () => {
      const scope = "scope";
      const grant_type = "grant_type";
      const redirect_uri = "redirect_uri";
      const code = "invalid_code";

      await expect(() =>
        tlAccessTokenAPI.generateAccessToken(
          scope,
          grant_type,
          redirect_uri,
          code
        )
      ).rejects.toThrow();
    });
  });
});
