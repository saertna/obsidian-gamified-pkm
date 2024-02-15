import {App, Notice, request} from 'obsidian';
import {PLUGIN_VERSION} from "./main"
import type {Moment} from "moment/moment";
import {boosterRecipes} from "./constants";

//const PLUGIN_VERSION = this.manifest.version;
//declare let PLUGIN_VERSION:string;

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

export function hoursUntilMinutesPassed(inputDate: Moment, minutesToPass: number): number {
	const currentTime = window.moment(); // Get the current time
	const targetTime = inputDate.clone().add(minutesToPass, 'minutes'); // Calculate the target time

	if (targetTime.isAfter(currentTime)) {
		const hoursRemaining = targetTime.diff(currentTime, 'hours');
		return hoursRemaining;
	} else {
		return 0;
	}
}

export function isMinutesPassed(inputDate: Moment, minutesPassed: number): boolean {
	const minutesAgo = window.moment().subtract(minutesPassed, 'minutes'); // Calculate time 'minutesPassed' minutes ago
	return inputDate.isSameOrBefore(minutesAgo);
}

export function concatenateStrings(arr: string[]): string {
	if (arr.length === 1) {
		return arr[0];
	} else {
		const frequencyMap: Record<string, number> = {};

		arr.forEach(item => {
			if (frequencyMap[item]) {
				frequencyMap[item]++;
			} else {
				frequencyMap[item] = 1;
			}
		});

		const resultArray: string[] = [];

		for (const [key, value] of Object.entries(frequencyMap)) {
			if (value === 1) {
				resultArray.push(key);
			} else {
				resultArray.push(`${value} x ${key}`);
			}
		}

		return resultArray.join(', ');
	}
}

export function isSameDay(inputDate: Moment): boolean {
	const currentDate = window.moment(); // Get the current date
	return currentDate.isSame(inputDate, 'day'); // Check if they are the same day
}

export function isOneDayBefore(inputDate: Moment): boolean {
	const oneDayBeforeCurrent = window.moment().subtract(1, 'day'); // Calculate one day before current date
	return inputDate.isSame(oneDayBeforeCurrent, 'day');
}

export function rateDirectionForStatusPoints(ratingCurrent: string, ratingNew: number): number {
	let ratingFaktor: number
	if (parseInt(ratingCurrent, 10) < ratingNew) {
		ratingFaktor = ratingNew - parseInt(ratingCurrent, 10)
	} else {
		ratingFaktor = 0
	}

	return ratingFaktor
}

export function parseBadgeCSV2Dict(csvString: string): Record<string, { date: string, level: string }> {
	const badgeDict: Record<string, { date: string, level: string }> = {};
	const rows = csvString.split('##');
	for (const row of rows) {
		const [badgeName, dateReceived, level] = row.split(',');

		if (badgeName && dateReceived && level) {
			badgeDict[badgeName] = {date: dateReceived, level: level};
		}
	}
	return badgeDict;
}

export function getBoosterRunTimeFromVarName(boosterVarName: string) {
	for (const element of boosterRecipes) {
		if (element.varname === boosterVarName) {
			return element.boosterRunTime as number;
		}
	}
	return 0; // Return null if no matching element is found
}
