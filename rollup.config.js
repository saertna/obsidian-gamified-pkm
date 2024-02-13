import replace from "@rollup/plugin-replace";
import typescript from "rollup-plugin-typescript2";
import resolve from '@rollup/plugin-node-resolve';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import fs from 'fs';

const manifestStr = fs.readFileSync("manifest.json", "utf-8");
const manifest = JSON.parse(manifestStr);

const packageString = `const PLUGIN_VERSION = "${manifest.version}";`;

export default {
	input: 'src/main.ts',
	output: {
		file: 'main.js',
		format: 'cjs'
	},
	plugins: [
		resolve(),
		nodeResolve(),
		typescript({
			inlineSourceMap: true, // Ensure inline source map is generated
			inlineSources: true, // Ensure inline sources are included
			tsconfig: "tsconfig.json", // Specify the path to your tsconfig.json file
			abortOnError: false // Continue bundling even if there are TypeScript errors
		}),
		{
			name: 'debug-log',
			// Add a console log before the replace plugin
			buildStart() {
				console.log('Starting Rollup build...');
			}
		},
		replace({
			preventAssignment: true,
			delimiters: ['', ''],
			patterns: [
				{
					match: /declare const PLUGIN_VERSION:string;/,
					test: 'const PLUGIN_VERSION',
					replace: packageString
				}
			]
		}),
		{
			name: 'debug-log',
			// Add a console log after the replace plugin
			buildEnd() {
				console.log('Rollup build completed.');
			}
		}
	]
};
