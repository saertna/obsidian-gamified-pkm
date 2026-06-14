// eslint.config.mjs
import tsparser from "@typescript-eslint/parser";
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
			obsidianmd: obsidianmd
		},
		languageOptions: {
			parser: tsparser,
			parserOptions: {
				project: "./tsconfig.json",
				tsconfigRootDir: import.meta.dirname,
			},
			// FIX: This tells ESLint that console/window/document are valid globals
			globals: {
				...globals.browser,
				...globals.node,
				activeDocument: "readonly", // Specific to Obsidian
				app: "readonly"             // Specific to Obsidian
			}
		},
		rules: {
			...obsidianmd.configs.recommended[0].rules,

			"obsidianmd/sample-names": "off",
			"obsidianmd/prefer-file-manager-trash-file": "error",
		},
	}
]);
