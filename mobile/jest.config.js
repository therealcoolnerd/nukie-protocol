module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(expo-secure-store|@noble/ed25519|react-native-get-random-values|react-native)/)'
  ],
  setupFiles: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '../node_modules'],
  moduleNameMapper: {
    '^@noble/ed25519$': '<rootDir>/node_modules/@noble/ed25519',
    '^bs58$': '<rootDir>/node_modules/bs58',
    '^react-native-get-random-values$': '<rootDir>/__mocks__/react-native-get-random-values.js',
  },
};
