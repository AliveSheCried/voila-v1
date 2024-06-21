import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import test from "ava";
import sinon from "sinon";
import validator from "validator";
import { startApolloServer } from "../apolloServer.js";
import logger from "../config/logger.js";
import * as trueLayerModule from "../datasources/trueLayer/index.js";
import * as encryptionHelper from "../helpers/encryptionHelper.js";
import * as handleAPIRequest from "../helpers/handleAPIRequest.js";
import resolvers from "../schema/resolvers.js";
import typeDefs from "../schema/schema.js";

test.beforeEach((t) => {
  t.context.mockTlAccessTokenAPI = sinon
    .stub(trueLayerModule, "TLAccessTokenAPI")
    .returns(sinon.stub());
  t.context.mockTlDataAPI = sinon
    .stub(trueLayerModule, "TLDataAPI")
    .returns(sinon.stub());
  t.context.mockTlMerchantAccountAPI = sinon
    .stub(trueLayerModule, "TLMerchantAccountAPI")
    .returns(sinon.stub());
  t.context.mockTlPayoutAPI = sinon
    .stub(trueLayerModule, "TLPayoutAPI")
    .returns(sinon.stub());
  t.context.mockEncrypt = sinon.stub(encryptionHelper, "encrypt");
  t.context.mockDecrypt = sinon.stub(encryptionHelper, "decrypt");
  t.context.mockHandleAPIRequest = sinon.stub(
    handleAPIRequest,
    "handleAPIRequest"
  );
});

test.afterEach.always((t) => {
  sinon.restore();
});

test.serial(
  "startApolloServer initializes and starts Apollo Server",
  async (t) => {
    const app = {
      use: sinon.stub(),
    };
    const httpServer = {};

    const server = await startApolloServer(app, httpServer);

    t.true(app.use.calledOnceWith("/graphql", sinon.match.func));
    t.true(server instanceof ApolloServer);
    t.deepEqual(server.typeDefs, typeDefs);
    t.deepEqual(server.resolvers, resolvers);
    t.true(
      server.plugins.includes(ApolloServerPluginDrainHttpServer({ httpServer }))
    );
    t.true(server.introspection);
    t.deepEqual(server.cors, {
      origin: "http://127.0.0.1:5173",
      credentials: true,
    });

    const middleware = app.use.firstCall.args[1];
    const req = { headers: { authorization: "Bearer token" } };
    const context = await middleware.context({ req });

    t.is(context.token, "Bearer token");
    t.is(context.validator, validator);
    t.is(context.encrypt, t.context.mockEncrypt);
    t.is(context.decrypt, t.context.mockDecrypt);
    t.is(context.logger, logger);
    t.true(
      context.dataSources.tlAccessTokenAPI instanceof
        trueLayerModule.TLAccessTokenAPI
    );
    t.true(context.dataSources.tlDataAPI instanceof trueLayerModule.TLDataAPI);
    t.true(
      context.dataSources.tlMerchantAccountAPI instanceof
        trueLayerModule.TLMerchantAccountAPI
    );
    t.true(
      context.dataSources.tlPayoutAPI instanceof trueLayerModule.TLPayoutAPI
    );
  }
);
