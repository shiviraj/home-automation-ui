module.exports = {
  moduleDirectories: ['<rootDir>/src', 'node_modules'],
  setupFilesAfterEnv: ['./setupTests.js'],
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx}'],
  coverageReporters: ['json', 'lcov', 'text-summary'],
  coverageThreshold: {
    global: {
      statements: 94.84,
      branches: 79.51,
      functions: 90.9,
      lines: 95.57,
    },
  },
  testPathIgnorePatterns: [
    './setupTests.js',
    'coverage',
    '/.next/',
    './src/.next/',
    './node_modules/',
  ],
  coveragePathIgnorePatterns: [
    './src/components/labels',
    './src/pages/labels',
    './public/',
    './src/localStorage',
    './src/.next/',
    './src/pages/_document.js,' + './src/configs/labels',
    './src/configs/cspConfig',
    './src/configs/loginSource',
  ],
  transformIgnorePatterns: ['/node_modules/(?!axis-ui-components).+\\.(js|jsx)$'],
};
