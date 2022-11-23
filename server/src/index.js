require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const TrueLayerAuthAPI = require("./datasources/trueAuthLayer_api");
const TrueLayerAPI = require("./datasources/trueLayer_api");
const typeDefs = require("./schema/schema");
const resolvers = require("./schema/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { token: req.headers.authorization };
  },
  dataSources: () => {
    return {
      trueLayerAuthAPI: new TrueLayerAuthAPI(),
      trueLayerAPI: new TrueLayerAPI(),
    };
  },
});

server.listen().then(() => {
  console.log(`
        🚀  Server is running!
        🔉  Listening on port 4000
        📭  Query at http://localhost:4000
      `);
});
