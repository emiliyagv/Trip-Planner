module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', '<rootDir>/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/$1',


  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    
  },

  "moduleFileExtensions": [
    "js",
    "jsx"
  ],
  testMatch: [
    '**/src/**/*.(test|spec).(js|jsx)',
    '**/routes/**/*.(test|spec).(js|jsx)',
  ],

};
