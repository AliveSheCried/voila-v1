import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { startApolloServer } from "../apolloServer.js";

jest.mock("@apollo/server", () => ({
  ApolloServer: jest.fn().mockImplementation(() => ({
    start: jest.fn(),
    cache: {},
  })),
}));

jest.mock("@apollo/server/express4", () => ({
  expressMiddleware: jest.fn(),
}));

describe("startApolloServer", () => {
  it("should start the Apollo server", async () => {
    const app = {
      use: jest.fn(),
    };
    const httpServer = {};
    global.dbClient = {};

    const req = {
      headers: {
        authorization: "Bearer token",
      },
    };

    await startApolloServer(app, httpServer);

    expect(ApolloServer).toHaveBeenCalledWith(
      expect.objectContaining({
        context: expect.any(Function),
        plugins: expect.any(Array),
        introspection: true,
        playground: expect.objectContaining({
          settings: expect.objectContaining({
            "schema.polling.enable": true,
          }),
        }),
      })
    );

    const context = ApolloServer.mock.calls[0][0].context({ req });
    expect(context).toEqual({
      dbClient: global.dbClient,
      token: req.headers.authorization,
    });

    expect(app.use).toHaveBeenCalledWith(
      "/graphql",
      expressMiddleware(expect.any(Object), {
        context: expect.any(Function),
      })
    );
  });
});
