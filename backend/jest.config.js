export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['backend/src'],
    moduleFileExtensions: ['ts', 'js', 'json'],
    testMatch: ['**/__tests__/**/*.test.ts'],
    clearMocks: true,
};
