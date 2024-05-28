export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/"],
};
// export default {
//   transform: {},
//   setupFiles: ["esm"],
//   transformIgnorePatterns: ["/node_modules/"],
// };
