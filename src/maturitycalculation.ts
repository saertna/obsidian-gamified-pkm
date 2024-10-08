import { TFile, App, } from 'obsidian';
import {debugLogs} from "./constants";
import { DataviewApi} from "obsidian-dataview";

export class MaturityCalculator {
	private app: App;
	dataview: DataviewApi | null;

	constructor(app: App) {
		this.app = app;
	}

	/*public rateProgressiveSummarization(charCountTotal: number, layer2count: number, layer3count: number): number {
		const percentLayer2 = layer2count * 100 / charCountTotal;
		const percentLayer3 = layer3count * 100 / layer2count;
		let layer2maturity = 0;
		let layer3maturity = 0;
		let maturity = 0;
		if (charCountTotal < 3000) {
			maturity = 0;
			//if(debugLogs) console.debug(`Note is not long enough to get into calculation for maturity. The total character count is ${charCountTotal}`);
		} else {
			if (percentLayer2 == 0) {
				layer2maturity = 0;
			} else if (percentLayer2 <= 10) {
				layer2maturity = 5;
			} else if (percentLayer2 <= 20) {
				layer2maturity = 4;
			} else if (percentLayer2 <= 30) {
				layer2maturity = 3;
			} else if (percentLayer2 <= 40) {
				layer2maturity = 2;
			} else if (percentLayer2 <= 50) {
				layer2maturity = 1;
			} else {
				layer2maturity = 0;
			}

			if (layer3count == 0) {
				layer3maturity = 0;
			} else if (percentLayer3 <= 10) {
				layer3maturity = 5;
			} else if (percentLayer3 <= 20) {
				layer3maturity = 4;
			} else {
				layer3maturity = 0;
			}

			if (layer2maturity == 1 && layer3maturity == 0) {
				maturity = 1;
			} else if (layer2maturity == 2 && layer3maturity == 0) {
				maturity = 2;
			} else if ((layer2maturity >= 3 && layer3maturity == 0) || (layer2maturity <= 2 && layer3maturity >= 4)) {
				maturity = 3;
			} else if ((layer2maturity == 3 || layer2maturity == 4) && (layer3maturity == 4 || layer3maturity == 5)) {
				maturity = 4;
			} else if (layer2maturity == 5 && layer3maturity == 5) {
				maturity = 5;
			} else {
				maturity = 0;
			}
		}


		//if(debugLogs) console.debug(`layer2maturity: ${layer2maturity} \tlayer3maturity: ${layer3maturity} \tmaturity: ${maturity}`);
		//if(debugLogs) console.debug(`percentLayer2: ${percentLayer2} \tpercentLayer3: ${percentLayer3} \tmaturity: ${maturity}`);
		//if(debugLogs) console.debug(`charCountTotal: ${charCountTotal}`);
		return maturity;
	}*/
	public rateProgressiveSummarization(charCountTotal: number, layer2count: number, layer3count: number): number {
		const percentLayer2 = (layer2count * 100) / charCountTotal;
		const percentLayer3 = layer2count > 0 ? (layer3count * 100) / layer2count : 0;
		let maturity = 0;

		if (charCountTotal < 3000) {
			maturity = 0;
		} else {
			// Determine maturity based on Layer 2 and Layer 3 percentages
			if (percentLayer2 >= 4 && percentLayer2 <= 10 && percentLayer3 >= 4 && percentLayer3 <= 10) {
				maturity = 5;
			} else if ((percentLayer2 > 10 && percentLayer2 <= 20 && percentLayer3 >= 4 && percentLayer3 <= 10) ||
				(percentLayer2 >= 4 && percentLayer2 <= 10 && percentLayer3 > 10 && percentLayer3 <= 20)) {
				maturity = 4;
			} else if ((percentLayer2 > 10 && percentLayer2 <= 20 && (percentLayer3 < 4 || percentLayer3 > 10 && percentLayer3 <= 20)) ||
				(percentLayer2 < 4 && percentLayer3 >= 4 && percentLayer3 <= 10)) {
				maturity = 3;
			} else if ((percentLayer2 > 20 && percentLayer2 <= 40) || (percentLayer3 > 20 && percentLayer3 <= 40)) {
				maturity = 2;
			} else if ((percentLayer2 > 40 && percentLayer2 <= 50) || (percentLayer3 > 40 && percentLayer3 <= 50)) {
				maturity = 1;
			} else {
				maturity = 0;
			}
		}

		return maturity;
	}


	public countLayer2AndLayer3Characters(content: string, filename: string, layer2: string, layer3: string): {
		charCount: number;
		highlightedCount: number;
		boldCount: number
	} {

		const filenameWithoutExtension = filename; //.slice(0, -filename.length);
		// if(debugLogs) console.debug(`filenameWithoutExtension: ${filenameWithoutExtension}`);

		// Remove markdown formatting symbols
		const strippedContent = content.replace(/[*_~`]/g, "");
		// if(debugLogs) console.debug(`filenameWithoutExtension: ${filenameWithoutExtension}`);

		// Remove markdown headings that match the filename
		const headingRegex = /^(#+)\s(.*)$/gm;
		const contentWithoutHeadings = strippedContent.replace(headingRegex, (match, p1, p2) => {

			// if(debugLogs) console.debug(`p2: ${p2}`);
			if (p2 === filenameWithoutExtension) {
				return "";
			}
			return match;
		});
		// if(debugLogs) console.debug(`contentWithoutHeadings: ${contentWithoutHeadings}`);

		// Remove metadata blocks from count
		const metadataRegex = /^---[\s\S]*?---/gm;
		const contentWithoutMetadata = contentWithoutHeadings.replace(metadataRegex, "");
		// if(debugLogs) console.debug(`contentWithoutMetadata: ${contentWithoutMetadata}`);

		// Remove #tags from count
		const tagRegex = /#[^\s]+/g;
		const contentWithoutTags = contentWithoutMetadata.replace(tagRegex, "");
		// if(debugLogs) console.debug(`contentWithoutTags: ${contentWithoutTags}`);

		// Remove links and Wikipedia-links from count
		const linkRegex = /\[.*?\]\(.*?\)|\[\[.*?\]\]/g;
		const contentWithoutLinks = contentWithoutTags.replace(linkRegex, "");
		// if(debugLogs) console.debug(`contentWithoutLinks: ${contentWithoutLinks}`);

		// Remove blank newlines
		const filteredContent: string = contentWithoutLinks
			.split('\n') // Split the content into an array of lines
			.filter(line => line.trim() !== '') // Filter out lines that are empty or contain only whitespace
			.filter(line => line.trim() !== '---') // remove --- on single lines
			.join('\n'); // Join the remaining lines back into a string, separated by newlines
		// if(debugLogs) console.debug(`filteredContent: ${filteredContent}`);

		// Count the remaining characters
		const charCount = filteredContent.length;
		// if(debugLogs) console.debug(`charCount: ${charCount}`);


		// calculate Layer 2 & 3 Length

		// Count the highlighted and bold characters
		let highlightedCount = 0;
		let boldCount = 0;

		let layer2exclude = '='
		let layer3exclude = '\\*'
		// to have the reg ex correct. otherwise it will get stuc with **.
		if (layer3 == '**') {
			layer3 = '\\*\\*'
			layer3exclude = '\\*'
			layer2exclude = '='
		}
		if (layer2 == '**') {
			layer2 = '\\*\\*'
			layer3exclude = '='
			layer2exclude = '\\*'
		}


		const highlightRegex = new RegExp(`${layer2}[^${layer2exclude}]+${layer2}`, "g");
		const boldRegex = new RegExp(`${layer3}[^${layer3exclude}]+${layer3}`, "g");

		// Count highlighted characters
		const highlightedMatches = content.match(highlightRegex);
		if (highlightedMatches) {
			highlightedCount = highlightedMatches.join("").length - (highlightedMatches.length * 4); // Subtract the length of '=='
			// first take the layer2 (highlightedCount) and run on this the 'boldRegex'
			// Count bold characters
			const layer2String = highlightedMatches.join("");
			const boldMatches = layer2String.match(boldRegex);
			if (boldMatches) {
				boldCount = boldMatches.join("").length - (boldMatches.length * 4); // Subtract the length of '**'
			}
		}


		return {charCount, highlightedCount, boldCount};

	}



	public rateLevelOfMaturity(noteLength: number, lengthOfTitle: number, Inlinks: number, outgoingLinks: number, progressiveSumMajurity: number): number {
		// if(debugLogs) console.debug(`noteLength: ${noteLength}\tlengthOfTitle: ${lengthOfTitle}\tInlinks: ${Inlinks}\toutgoingLinks: ${outgoingLinks}`)

		// decide if noteLength-majurity or progressiveSum-majurity shall be used
		let lengthMajurity = 0;
		if (noteLength >= progressiveSumMajurity) {
			lengthMajurity = noteLength;
		} else {
			lengthMajurity = progressiveSumMajurity;
		}

		const totalWeight: number = lengthMajurity + lengthOfTitle + Inlinks + outgoingLinks;
		const averageWeight = totalWeight / 5;
		// if(debugLogs) console.debug(`totalWeight: ${totalWeight}\taverageWeight: ${averageWeight}`)
		if (averageWeight < 0.5) {
			return 0;
		} else if (averageWeight <= 1) {
			return 1;
		} else if (averageWeight <= 2) {
			return 2;
		} else if (averageWeight <= 3) {
			return 3;
		} else if (averageWeight <= 3.5) {
			return 4;
		} else if (averageWeight <= 4) {
			return 5;
		} else {
			return 0;
		}
	}



	public rateOutlinks(outlinks: number): number {
		// if(debugLogs) console.debug(`outlinks: ${outlinks}`)
		if (outlinks < 2) {
			return 0;
		} else if (outlinks < 3) {
			return 1;
		} else if (outlinks < 5) {
			return 4;
		} else if (outlinks < 9) {
			return 5;
		} else if (outlinks < 11) {
			return 3;
		} else if (outlinks < 12) {
			return 1;
		} else {
			return 0;
		}
	}


	public rateInlinks(numInlinks: number): number {
		//var prozentInlinks = numInlinks * 100 / numAllFiles;
		//if(debugLogs) console.debug(`numInlinks: ${numInlinks}\tnumAllFiles: ${numAllFiles}\tprozentInlinks: ${prozentInlinks}`)
		/*if (prozentInlinks < 0.005 || prozentInlinks > 0.1) {
			return 0;
		} else */
		if (numInlinks == 0) {
			return 0;
		} else if (numInlinks < 4) {
			return 1;
		} else if (numInlinks < 8) {
			return 2;
		} else if (numInlinks < 11) {
			return 3;
		} else if (numInlinks < 16) {
			return 4;
		} else if (numInlinks >= 16 && numInlinks < 500) {
			return 5;
		} else {
			return 0;
		}
	}


	public rateDirection(ratingCurrent: string, ratingNew: number): string {
		let rating = ""
		if (parseInt(ratingCurrent, 10) > ratingNew) {
			rating = ratingNew + "⬇️"
		} else if (parseInt(ratingCurrent, 10) < ratingNew) {
			rating = ratingNew + "⬆️"
		} else if (parseInt(ratingCurrent, 10) == ratingNew) {
			rating = ratingNew + "➡️"
		} else {
			rating = ratingNew + ""
		}

		return rating
	}


	public rateLengthFilename(filename: string): number {
		if (filename.length < 30) {
			return 0;
		} else if (filename.length < 80) {
			return 1;
		} else if (filename.length < 100) {
			return 3;
		} else if (filename.length < 150) {
			return 5;
		} else if (filename.length < 190) {
			return 4;
		} else if (filename.length < 210) {
			return 2;
		} else if (filename.length < 250) {
			return 1;
		} else {
			return 0;
		}
	}


	public rateNoteLength(contenlength: number): number {
		if (contenlength < 200) {
			return 0;
		} else if (contenlength < 550) {
			return 4;
		} else if (contenlength < 1000) {
			return 5;
		} else if (contenlength < 1200) {
			return 4;
		} else if (contenlength < 2000) {
			return 3;
		} else if (contenlength < 2500) {
			return 2;
		} else if (contenlength < 3000) {
			return 1;
		} else {
			return 0;
		}
	}


	public getNumberOfOutlinks(activeFile: TFile, app: App = this.app): number {
		if (!this.dataview) {
			if (!activeFile) {
				return 0;
			}
			const inlinks = this.app.metadataCache.getFileCache(activeFile)?.links;
			return inlinks ? Object.keys(inlinks).length : 0;
		}

		const page = this.dataview.page(activeFile.path);
		if (page && page.file.outlinks) {
			return page.file.outlinks.length;
		}

		return 0;
	}


	public countCharactersInActiveFile(content: string, filename: string): number {

		const filenameWithoutExtension = filename; //.slice(0, -filename.length);
		// if(debugLogs) console.debug(`filenameWithoutExtension: ${filenameWithoutExtension}`);

		// Remove markdown formatting symbols
		const strippedContent = content.replace(/[*_~`]/g, "");
		// if(debugLogs) console.debug(`filenameWithoutExtension: ${filenameWithoutExtension}`);

		// Remove markdown headings that match the filename
		const headingRegex = /^(#+)\s(.*)$/gm;
		const contentWithoutHeadings = strippedContent.replace(headingRegex, (match, p1, p2) => {

			// if(debugLogs) console.debug(`p2: ${p2}`);
			if (p2 === filenameWithoutExtension) {
				return "";
			}
			return match;
		});
		// if(debugLogs) console.debug(`contentWithoutHeadings: ${contentWithoutHeadings}`);

		// Remove metadata blocks from count
		const metadataRegex = /^---[\s\S]*?---/gm;
		const contentWithoutMetadata = contentWithoutHeadings.replace(metadataRegex, "");
		// if(debugLogs) console.debug(`contentWithoutMetadata: ${contentWithoutMetadata}`);

		// Remove #tags from count
		const tagRegex = /#[^\s]+/g;
		const contentWithoutTags = contentWithoutMetadata.replace(tagRegex, "");
		// if(debugLogs) console.debug(`contentWithoutTags: ${contentWithoutTags}`);

		// Remove links and Wikipedia-links from count
		const linkRegex = /\[.*?\]\(.*?\)|\[\[.*?\]\]/g;
		const contentWithoutLinks = contentWithoutTags.replace(linkRegex, "");
		// if(debugLogs) console.debug(`contentWithoutLinks: ${contentWithoutLinks}`);

		// Remove blank newlines
		const filteredContent: string = contentWithoutLinks
			.split('\n') // Split the content into an array of lines
			.filter(line => line.trim() !== '') // Filter out lines that are empty or contain only whitespace
			.filter(line => line.trim() !== '---') // remove --- on single lines
			.join('\n'); // Join the remaining lines back into a string, separated by newlines
		// if(debugLogs) console.debug(`filteredContent: ${filteredContent}`);

		// Count the remaining characters
		const charCount = filteredContent.length;
		// if(debugLogs) console.debug(`charCount: ${charCount}`);

		return charCount;
	}


	public count_inlinks(file: TFile): number {
		if (!this.dataview) {
			const {app: {metadataCache: {resolvedLinks}}} = this;
			const {path} = file;

			if (debugLogs) console.log('Resolved Links Data:', resolvedLinks); // Add this line

			const sumInlinks = Object.values(resolvedLinks)
				.map((val: { [key: string]: number }) => val[path] ?? 0)
				.reduce((left, right) => left + right, 0);

			return sumInlinks;
		}

		const page = this.dataview.page(file.path);
		if (page && page.file.inlinks) {
			return page.file.inlinks.length;
		}

		return 0;
	}



	public getFileCountMap = async (app: App, excludeTag: string, excludeFolder: string): Promise<Map<string, number> | null> => {

		try {
			const {vault} = app;

			// files with this #tags in to ignore
			let excludedSubstrings: string[] = []
			if (excludeTag == undefined) {
				excludedSubstrings = []
			} else {
				excludedSubstrings = excludeTag.split(', ');
			}


			// folders to ignore .md-files in
			let excludedFolders: string[] = []
			if (excludeFolder == undefined) {
				excludedFolders = []
			} else {
				excludedFolders = excludeFolder.split(', ');
			}
			excludedFolders.push('.obsidian', '.trash'); // hardcode the basic folders

			const fileCountMap = new Map<string, number>();

			const files = await vault.getMarkdownFiles();

			for (const file of files) {

				const fileName = file.basename;

				const currentCount = fileCountMap.get(fileName) || 0;

				fileCountMap.set(fileName, currentCount + 1);

				const fileContents = await app.vault.read(file);

				if (!excludedSubstrings.some(substring => fileContents.includes(substring)) &&
					!excludedFolders.some(folder => file.path.includes(folder))) {

					const fileName = file.basename;

					const currentCount = fileCountMap.get(fileName) || 0;

					fileCountMap.set(fileName, currentCount + 1);
				}

			}

			return fileCountMap;
		} catch (e) {
			console.error(e);
			return null
		}
	};


	public getFileMap = async (app: App, excludeTag: string, excludeFolder: string): Promise<TFile[] | null> => {
		try {
			const {vault} = app;

			// files with this #tags in to ignore
			let excludedSubstrings: string[] = []
			if (excludeTag == undefined) {
				excludedSubstrings = []
			} else {
				excludedSubstrings = excludeTag.split(', ');
			}
			//if(debugLogs) console.debug(`excludedSubstrings: ${excludedSubstrings}`)
			// folders to ignore .md-files in
			let excludedFolders: string[] = []
			if (excludeFolder == undefined) {
				excludedFolders = []
			} else {
				excludedFolders = excludeFolder.split(', ');
			}
			excludedFolders.push('.obsidian', '.trash'); // hardcode the basic folders
			//if(debugLogs) console.debug(`excludedFolders: ${excludedFolders}`)
			const fileArray: TFile[] = [];
			const files = await vault.getMarkdownFiles();
			for (const file of files) {

				const fileContents = await app.vault.read(file);
				//if(debugLogs) console.debug(`file.path: ${file.path}`)
				if ((!excludedSubstrings.some(substring => fileContents.includes(substring)) || excludeTag.length === 0) &&
					!excludedFolders.some(folder => file.path.includes(folder))) {
					//if(debugLogs) console.debug(`file ${file} get's added.`)
					fileArray.push(file)
				}
			}
			return fileArray;
		} catch (e) {
			console.error(e);
			return null;
		}
	};

}
