import replace from "@rollup/plugin-replace";
import fs from 'fs';

const manifestStr = fs.readFileSync("manifest.json", "utf-8");
const manifest = JSON.parse(manifestStr);

const packageString = `const PLUGIN_VERSION = "${manifest.version}";`;

export default {
	input: 'src/main.ts',
	output: {
		file: 'dist/bundle.js',
		format: 'cjs'
	},
	plugins: [
		replace({
			preventAssignment: true,
			delimiters: ['', ''],
			'declare const PLUGIN_VERSION:string;': packageString
		})
	]
};
