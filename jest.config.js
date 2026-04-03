module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleFileExtensions: ["ts", "tsx", "js"],
    setupFilesAfterEnv: ["@testing-library/jest-dom"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 80,
            lines: 80,
            statements: 80
        }
    }
};