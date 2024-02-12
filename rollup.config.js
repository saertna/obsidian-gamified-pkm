import replace from "@rollup/plugin-replace";
import typescript from "rollup-plugin-typescript2";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
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
		typescript(),
		nodeResolve(),
		commonjs(),
		replace({
			preventAssignment: true,
			delimiters: ['', ''],
			patterns: [
				{
					match: /declare const PLUGIN_VERSION:string;/g,
					test: 'const PLUGIN_VERSION',
					replace: packageString
				}
			]
		})
	]
};
