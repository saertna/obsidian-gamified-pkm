// eslint.config.mjs
import tsparser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";
import obsidianmd from "eslint-plugin-obsidianmd";

export default defineConfig([
	// 1. GLOBAL IGNORES
	// This must be the first object and only contain an 'ignores' key
	{
		ignores: [
			"main.js",
			"dist/**/*",
			"node_modules/**/*",
			"*.config.js",
			"*.config.mjs",
			"version-bump.mjs",
			"package.json",
			"package-lock.json",
			"manifest.json",
			"coverage/**/*"
		]
	},

	// 2. TYPESCRIPT SPECIFIC CONFIG
	{
		files: ["**/*.ts", "**/*.tsx"],
		// Apply the recommended Obsidian rules ONLY to TS files
		plugins: {
			obsidianmd: obsidianmd
		},
		languageOptions: {
			parser: tsparser,
			parserOptions: {
				project: "./tsconfig.json",
				// This is crucial: it tells the parser where the root is
				tsconfigRootDir: import.meta.dirname,
			},
		},
		// Spread the recommended rules here
		rules: {
			...obsidianmd.configs.recommended[0].rules,

			"obsidianmd/sample-names": "off",
			"obsidianmd/prefer-file-manager-trash-file": "error",

		},
	}
]);
