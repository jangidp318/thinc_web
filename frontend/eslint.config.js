import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
    // 🧹 Ignore all build and cache folders
    {
        ignores: [
            ".next/**",
            "out/**",
            "dist/**",
            "build/**",
            "node_modules/**",
            ".turbo/**",
            ".vercel/**",
            "*.config.js",
            "*.config.cjs",
            "*.config.mjs",
            "*.env",
        ],
    },
    // ✅ Lint only your actual source code
    {
        files: ["src/**/*.{ts,tsx}", "pages/**/*.{ts,tsx}"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: "./tsconfig.json",
                tsconfigRootDir: import.meta.dirname,
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            "@typescript-eslint": tseslint.plugin,
        },
        rules: {
            "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            "react/react-in-jsx-scope": "off", // ✅ Next.js handles React scope automatically
            "no-console": "off",
        },
    },
    prettier
);
