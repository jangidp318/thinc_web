import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginImport from "eslint-plugin-import";
import eslintConfigPrettier from "eslint-config-prettier";

/**
 * Flat ESLint configuration for monorepo (ESLint v9+)
 */
export default tseslint.config(
    {
        files: ["**/*.{ts,tsx,js,jsx}"],
        ignores: [
            "node_modules/",
            "dist/",
            "build/",
            ".next/",
            "coverage/",
            "backend/dist/",
            "frontend/.next/",
            "**/*.config.js"
        ],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                projectService: true
            },
            globals: {
                ...globals.node,
                ...globals.browser
            }
        },
        plugins: {
            "@typescript-eslint": tseslint.plugin,
            import: eslintPluginImport
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            ...eslintConfigPrettier.rules,
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
            ],
            "import/order": [
                "warn",
                {
                    groups: [["builtin", "external", "internal"]],
                    "newlines-between": "always"
                }
            ]
        }
    }
);
