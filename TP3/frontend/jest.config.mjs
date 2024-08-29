export default {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  testMatch: ["**/tests/**/*.test.js", "**/src/**/*.test.js"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
};
