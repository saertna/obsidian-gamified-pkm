import {TFile} from 'obsidian';
import { debugLogs } from './constants';

export interface AbstractFile {
	path: string;
}

export interface FileInterface extends AbstractFile{
	stat: {
		ctime: number;
		mtime: number;
		size: number;
	};
}

export interface VaultInterface {
	getAbstractFileByPath(path: string): AbstractFile | null;
	read(file: FileInterface): Promise<string>;
	modify(file: FileInterface, data: string): Promise<void>;
}

export function findEarliestCreatedFile<T extends FileInterface>(files: T[]): T {
	let earliestCreatedFile: T = files[0];
	for (const file of files) {
		if (file.stat.ctime < earliestCreatedFile.stat.ctime) {
			earliestCreatedFile = file;
		}
	}
	return earliestCreatedFile;
}

  
export function findEarliestModifiedFile<T extends FileInterface>(files: T[]): T {
	let earliestModifiedFile: T = files[0];
	for (const file of files) {
		if (file.stat.mtime < earliestModifiedFile.stat.mtime) {
			earliestModifiedFile = file;
		}
	}
	return earliestModifiedFile;
}  


export function findEarliestDateFile<T extends FileInterface>(files: T[]): T {
	let earliestCreatedFile: T = files[0];
	for (const file of files) {
		if (file.stat.ctime < earliestCreatedFile.stat.ctime) {
			earliestCreatedFile = file;
		}
		if (file.stat.mtime < earliestCreatedFile.stat.ctime) {
			earliestCreatedFile = file;
		}
	}
	return earliestCreatedFile;
}


export function monthsBetween(startMonth: Date, endMonth: Date): number {
	let months = (endMonth.getMonth() - startMonth.getMonth()) + 1;
	if (endMonth.getFullYear() > startMonth.getFullYear()) {
		months += (endMonth.getFullYear() - startMonth.getFullYear())*12;
	}
	return months;
}


export function getCreationDates<T extends FileInterface>(files: T[]): Array<Date> {
	const creationDates: Array<Date> = [];
	for (const file of files) {
		creationDates.push(new Date(file.stat.ctime));
	}
	return creationDates;
}


export function getModificationDates<T extends FileInterface>(files: T[]): Array<Date> {
	const modificationDates: Array<Date> = [];
	for (const file of files) {
		modificationDates.push(new Date(file.stat.mtime));
	}
	return modificationDates;
}


export function createChartFormat(y_axis: string, countsStringMod: string, chartReduzierungMonate: number): string {
	let monatsbegrenzung = null
	if (chartReduzierungMonate == 0){
		monatsbegrenzung = 0
	} else {
		monatsbegrenzung = countsStringMod.split(',').length - chartReduzierungMonate
	}
	
	return "```chart\ntype: bar\nlabels: [" + y_axis + "]\nseries:\n  - title: modified\n    data: [" + countsStringMod + "]\ntension: 0.2\nwidth: 80 %\nlabelColors: false\nfill: false\nbeginAtZero: false\nbestFit: false\nbestFitTitle: undefined\nbestFitNumber: 0\nstacked: true\nyTitle: \"Number of Notes\"\nxTitle: \"Months\"\nxMin: " + monatsbegrenzung + "\n```";
}


export async function replaceChartContent(
	avatarPageName: string,
	newContent: string,
	vault: VaultInterface,
	debugLogs = false
): Promise<void> {
	const existingFile = vault.getAbstractFileByPath(`${avatarPageName}.md`);
	if (existingFile == null) {
		if (debugLogs) console.debug(`File ${avatarPageName}.md does not exist`);
		return;
	}

	const file = existingFile as FileInterface;

	const content = await vault.read(file);
	let reference: number | null = null;
	let end: number | null = null;
	let start: number | null = null;

	const lines = content.split("\n");
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i].trim();
		if (line === "^ChartMonth") {
			if (reference === null) {
				reference = i;
			}
		}
	}
	if (reference != null) {
		end = reference;
		start = reference - 19;
		const newLines = [...lines.slice(0, start), newContent, ...lines.slice(end)];
		await vault.modify(file, newLines.join("\n"));
	}
}


