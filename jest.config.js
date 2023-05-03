// jest.config.js
export default {
    // ...
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
      '^.+\\.js$': 'babel-jest',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!@babel/runtime)'],
    extensionsToTreatAsEsm: ['.ts'],
    globals: {
      'ts-jest': {
        useESM: true,
        PORT: 3001
      },
    },
  };
  