import {TFile} from 'obsidian';

export function findEarliestCreatedFile(files: TFile[]): TFile {
	let earliestCreatedFile: TFile = files[0];
	for (const file of files) {
		if (file.stat.ctime < earliestCreatedFile.stat.ctime) {
			earliestCreatedFile = file;
		}
	}
	return earliestCreatedFile;
}

  
export function findEarliestModifiedFile(files: TFile[]): TFile {
	let earliestModifiedFile: TFile = files[0];
	for (const file of files) {
		if (file.stat.mtime < earliestModifiedFile.stat.mtime) {
			earliestModifiedFile = file;
		}
	}
	return earliestModifiedFile;
}  


export function findEarliestDateFile(files: TFile[]): TFile {
	let earliestCreatedFile: TFile = files[0];
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


export function getCreationDates(files: TFile[]): Array<Date> {
	const creationDates: Array<Date> = [];
  
	for (const file of files) {
		creationDates.push(new Date(file.stat.ctime));
	}
  
	return creationDates;
}


export function getModificationDates(files: TFile[]): Array<Date> {
	const creationDates: Array<Date> = [];
  
	for (const file of files) {
		creationDates.push(new Date(file.stat.mtime));
	}
  
	return creationDates;
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

  
export async function replaceChartContent (avatarPageName: string, newContent: string) {
	const existingFile = this.app.vault.getAbstractFileByPath(`${avatarPageName}.md`);
	if (existingFile == null) {
		console.debug(`File ${avatarPageName}.md does not exist`);
		return;
		}
	const file = existingFile as TFile;

	const content = await this.app.vault.read(file);
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
	if (reference != null){
		end = reference;
		start = reference - 19;
		const newLines = [...lines.slice(0, start), newContent, ...lines.slice(end)];
		await this.app.vault.modify(file, newLines.join("\n"));
	}
}


