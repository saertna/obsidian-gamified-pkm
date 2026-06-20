// eslint.config.mjs
import tsparser from "@typescript-eslint/parser";
import tslint from "@typescript-eslint/eslint-plugin";
import { defineConfig } from "eslint/config";
import obsidianmd from "eslint-plugin-obsidianmd";
import globals from "globals";

export default defineConfig([
	{
		ignores: [
			"**/main.js",
			"**/dist/**/*",
			"**/node_modules/**/*",
			"*.config.js",
			"*.config.mjs",
			"package.json",
			"coverage/**/*"
		]
	},
	{
		files: ["**/*.ts", "**/*.tsx"],
		plugins: {
			obsidianmd: obsidianmd,
			"@typescript-eslint": tslint
		},
		languageOptions: {
			parser: tsparser,
			parserOptions: {
				project: ["./tsconfig.json", "./tsconfig.test.json"], //project: "./tsconfig.json",
				tsconfigRootDir: import.meta.dirname,
			},
			// FIX: This tells ESLint that console/window/document are valid globals
			globals: {
				...globals.browser,
				...globals.node,
				...globals.jest,
				activeDocument: "readonly", // Specific to Obsidian
				app: "readonly"             // Specific to Obsidian
			}
		},
		rules: {
			...obsidianmd.configs.recommended[0].rules,
			"no-unused-vars": "off", // Turn off the base rule
			"@typescript-eslint/no-unused-vars": ["error", {
				"argsIgnorePattern": "^_",   // Ignore arguments starting with _
				"varsIgnorePattern": "^_",   // Ignore variables starting with _
				"caughtErrorsIgnorePattern": "^_" // Ignore catch block errors starting with _
			}],
			"obsidianmd/sample-names": "off",
			"obsidianmd/prefer-file-manager-trash-file": "error",
		},
	}
]);
