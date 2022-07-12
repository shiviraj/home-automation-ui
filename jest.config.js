module.exports = {
  moduleDirectories: ['<rootDir>/src', 'node_modules'],
  setupFilesAfterEnv: ['./setupTests.js'],
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx}'],
  coverageReporters: ['json', 'lcov', 'text-summary'],
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 50,
      functions: 50,
      lines: 50,
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
