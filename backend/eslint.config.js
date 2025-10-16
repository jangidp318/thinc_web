import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
    {
        // ✅ Ignore all test and build folders completely
        ignores: [
            "dist/**",
            "node_modules/**",
            "src/__tests__/**",
            "**/*.test.ts",
            "**/*.test.js",
            "*.config.js",
            "*.config.cjs",
            "*.config.mjs",
            "*.env",
        ],
    },
    {
        files: ["src/**/*.ts"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: "./tsconfig.json",
                tsconfigRootDir: import.meta.dirname,
            },
            globals: {
                ...globals.node,
            },
        },
        plugins: {
            "@typescript-eslint": tseslint.plugin,
        },
        rules: {
            "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            "no-console": "off",
        },
    },
    prettier
);
