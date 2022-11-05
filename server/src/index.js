require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const TruelayerAuthAPI = require("./datasources/trueLayer_api");
const typeDefs = require("./schema/schema");
const resolvers = require("./schema/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      truelayerAuthAPI: new TruelayerAuthAPI(),
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
