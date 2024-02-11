import {App, Notice, request} from 'obsidian';
import { PLUGIN_VERSION } from "./main"

//const PLUGIN_VERSION = this.manifest.version;
//declare let PLUGIN_VERSION:string;
//declare const PLUGIN_VERSION:string;

let versionUpdateChecked = false;
export const checkGamifiedPkmVersion = async (app: App) => {
	if (versionUpdateChecked) {
		return;
	}
	versionUpdateChecked = true;

	try {
		const gitAPIrequest = async () => {
			return JSON.parse(
				await request({
					url: `https://api.github.com/repos/saertna/obsidian-gamified-pkm/releases?per_page=5&page=1`,
				}),
			);
		};

		const latestVersion = (await gitAPIrequest())
			.map((el: any) => {
				return {
					version: el.tag_name,
					published: new Date(el.published_at),
				};
			})
			.filter((el: any) => el.version.match(/^\d+\.\d+\.\d+$/))
			.sort((el1: any, el2: any) => el2.published - el1.published)[0].version;

		if (isVersionNewerThanOther(latestVersion,PLUGIN_VERSION)) {
			new Notice(
				`A newer version of Gamificate your PKM is available in Community Plugins.\n\nYou are using ${PLUGIN_VERSION}.\n\nThe latest is ${latestVersion}`,
			);
		}
	} catch (e) {
		console.error({ where: "Utils/checkGamifiedPkmVersion", error: e });
	}
	setTimeout(() => (versionUpdateChecked = false), 28800000); //reset after 8 hours
};

export const isVersionNewerThanOther = (version: string, otherVersion: string): boolean => {
	const v = version.match(/(\d*)\.(\d*)\.(\d*)/);
	const o = otherVersion.match(/(\d*)\.(\d*)\.(\d*)/);

	return Boolean(v && v.length === 4 && o && o.length === 4 &&
		!(isNaN(parseInt(v[1])) || isNaN(parseInt(v[2])) || isNaN(parseInt(v[3]))) &&
		!(isNaN(parseInt(o[1])) || isNaN(parseInt(o[2])) || isNaN(parseInt(o[3]))) &&
		(
			parseInt(v[1])>parseInt(o[1]) ||
			(parseInt(v[1]) >= parseInt(o[1]) && parseInt(v[2]) > parseInt(o[2])) ||
			(parseInt(v[1]) >= parseInt(o[1]) && parseInt(v[2]) >= parseInt(o[2]) && parseInt(v[3]) > parseInt(o[3]))
		)
	)
}
