module.exports = {
    testEnvironment: "jsdom",
    roots: ["<rootDir>/src", "<rootDir>/__tests__"],
    testMatch: [
      "<rootDir>/src/**/__tests__/**/*.[jt]s?(x)",
      "**/__tests__/**/*.(test|spec).[jt]s?(x)"
    ],
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest"
    },
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"]
  };
  