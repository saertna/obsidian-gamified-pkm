import { TFile, App, } from 'obsidian';
import * as fs from 'fs';
import * as path from 'path';

export function rateProgressiveSummarization(charCountTotal: number, layer2count: number, layer3count: number): number {
	const percentLayer2 = layer2count * 100 / charCountTotal;
    const percentLayer3 = layer3count * 100 / layer2count;
	var layer2majurity = 0;
	var layer3majurity = 0;
	var majurity = 0;
	if (charCountTotal < 3000) {
		majurity = 0;
		//console.log(`Note is not long enough to get into calculation for majurity. The total character count is ${charCountTotal}`);
	} else {
		if (percentLayer2 == 0) {
			layer2majurity = 0;
		} else if (percentLayer2 <= 10) {
			layer2majurity = 5;
		} else if (percentLayer2 <= 20) {
			layer2majurity = 4;
		} else if (percentLayer2 <= 30) {
			layer2majurity = 3;
		} else if (percentLayer2 <= 40) {
			layer2majurity = 2;
		} else if (percentLayer2 <= 40) {
			layer2majurity = 1;
		} else {
			layer2majurity = 0;
		}

		if (layer3count == 0) {
			layer3majurity = 0;
		} else if (percentLayer3 <= 10) {
			layer3majurity = 5;
		} else if (percentLayer3 <= 20) {
			layer3majurity = 4;
		} else {
			layer3majurity = 0;
		}

		if (layer2majurity == 1 && layer3majurity == 0) {
			majurity = 1;
		} else if (layer2majurity == 2 && layer3majurity == 0) {
			majurity = 2;
		} else if (layer2majurity >= 3 && layer3majurity == 0) {
			majurity = 3;
		} else if ((layer2majurity == 3 || layer2majurity == 4) && (layer3majurity == 4 || layer3majurity == 5)) {
			majurity = 4;
		} else if (layer2majurity == 5 && layer3majurity == 5) {
			majurity = 5;
		} else {
			majurity = 0;
		}
	}

	
	//console.log(`layer2majurity: ${layer2majurity} \tlayer3majurity: ${layer3majurity} \tmajurity: ${majurity}`);
	//console.log(`percentLayer2: ${percentLayer2} \tpercentLayer3: ${percentLayer3} \tmajurity: ${majurity}`);
	//console.log(`charCountTotal: ${charCountTotal}`);
	return majurity;
}


export function countLayer2AndLayer3Characters(content: string, filename: string, layer2: string, layer3: string): { charCount: number; highlightedCount: number; boldCount: number } {
  
	const filenameWithoutExtension = filename; //.slice(0, -filename.length);
	// console.log(`filenameWithoutExtension: ${filenameWithoutExtension}`);

	// Remove markdown formatting symbols
	const strippedContent = content.replace(/[*_~`]/g, "");
	// console.log(`filenameWithoutExtension: ${filenameWithoutExtension}`);

	// Remove markdown headings that match the filename
	const headingRegex = /^(#+)\s(.*)$/gm;
	const contentWithoutHeadings = strippedContent.replace(headingRegex, (match, p1, p2) => {
	
		// console.log(`p2: ${p2}`);
		if (p2 === filenameWithoutExtension) {
			return "";
		}
		return match;
	});
	// console.log(`contentWithoutHeadings: ${contentWithoutHeadings}`);

	// Remove metadata blocks from count
	const metadataRegex = /^---[\s\S]*?---/gm;
	const contentWithoutMetadata = contentWithoutHeadings.replace(metadataRegex, "");
	// console.log(`contentWithoutMetadata: ${contentWithoutMetadata}`);

	// Remove #tags from count
	const tagRegex = /#[^\s]+/g;
	const contentWithoutTags = contentWithoutMetadata.replace(tagRegex, "");
	// console.log(`contentWithoutTags: ${contentWithoutTags}`);

	// Remove links and Wikipedia-links from count
	const linkRegex = /\[.*?\]\(.*?\)|\[\[.*?\]\]/g;
	const contentWithoutLinks = contentWithoutTags.replace(linkRegex, "");
	// console.log(`contentWithoutLinks: ${contentWithoutLinks}`);

	// Remove blank newlines
	const filteredContent: string = contentWithoutLinks
	.split('\n') // Split the content into an array of lines
	.filter(line => line.trim() !== '') // Filter out lines that are empty or contain only whitespace
	.filter(line => line.trim() !== '---') // remove --- on single lines
	.join('\n'); // Join the remaining lines back into a string, separated by newlines
	// console.log(`filteredContent: ${filteredContent}`);

	// Count the remaining characters
	const charCount = filteredContent.length;
	// console.log(`charCount: ${charCount}`);


	// calculate Layer 2 & 3 Length

	// Count the highlighted and bold characters
	let highlightedCount = 0;
	let boldCount = 0;
  
	var layer2exclude = '='
	var layer3exclude = '\\*'
	// to have the reg ex correct. otherwise it will get stuc with **.
	if(layer3 == '**'){
		layer3 = '\\*\\*'
		layer3exclude = '\\*'
		layer2exclude = '='
	}
	if(layer2 == '**'){
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
  
	
	
  
	return { charCount, highlightedCount, boldCount };

}


export function rateLevelOfMaturity(noteLength: number, lengthOfTitle: number, Inlinks: number, outgoingLinks: number, progressiveSumMajurity: number): number {
	// console.log(`noteLength: ${noteLength}\tlengthOfTitle: ${lengthOfTitle}\tInlinks: ${Inlinks}\toutgoingLinks: ${outgoingLinks}`)
	
	// decide if noteLength-majurity or progressiveSum-majurity shall be used
	var lengthMajurity = 0;
	if(noteLength >= progressiveSumMajurity) {
		lengthMajurity = noteLength;
	} else {
		lengthMajurity = progressiveSumMajurity;
	}
	
	const totalWeight : number = lengthMajurity + lengthOfTitle + Inlinks + outgoingLinks;
	const averageWeight = totalWeight / 5;
	// console.log(`totalWeight: ${totalWeight}\taverageWeight: ${averageWeight}`)
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


export function rateOutlinks(outlinks: number): number {
	// console.log(`outlinks: ${outlinks}`)
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


export function rateInlinks(numInlinks: number): number {
	//var prozentInlinks = numInlinks * 100 / numAllFiles;
	//console.log(`numInlinks: ${numInlinks}\tnumAllFiles: ${numAllFiles}\tprozentInlinks: ${prozentInlinks}`)
	/*if (prozentInlinks < 0.005 || prozentInlinks > 0.1) {
		return 0;
	} else */ if (numInlinks == 0) {
		return 0;
	} else if (numInlinks < 4) {
		return 1;
	} else if (numInlinks < 8) {
		return 2;
	} else if (numInlinks < 11) {
		return 3;
	} else if (numInlinks < 16) {
		return 4;
	} else if (numInlinks >= 16 && numInlinks < 500 ) {
		return 5;
	} else {
		return 0;
	}
}


export function rateDirection(ratingCurrent: string, ratingNew: number): string {
	let rating = ""
	if (parseInt(ratingCurrent, 10) > ratingNew){
		rating = ratingNew + "⬇️"
	} else if (parseInt(ratingCurrent, 10) < ratingNew){
		rating = ratingNew + "⬆️"
	} else if (parseInt(ratingCurrent, 10) == ratingNew){
		rating = ratingNew + "➡️"
	} else {
		rating = ratingNew + ""
	}

	return rating
}


export function rateLengthFilename(filename: string): number {
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


export function rateNoteLength(contenlength: number): number {
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


export function getNumberOfOutlinks(activeFile: TFile): number {
	// const activeFile: TFile | null = app.workspace.getActiveFile();
	if (!activeFile) {
		return 0;
	}
	const inlinks = app.metadataCache.getFileCache(activeFile)?.links;
	return inlinks ? Object.keys(inlinks).length : 0;
}


export function countCharactersInActiveFile(content: string, filename: string): number {
  
	const filenameWithoutExtension = filename; //.slice(0, -filename.length);
	// console.log(`filenameWithoutExtension: ${filenameWithoutExtension}`);

	// Remove markdown formatting symbols
	const strippedContent = content.replace(/[*_~`]/g, "");
	// console.log(`filenameWithoutExtension: ${filenameWithoutExtension}`);

	// Remove markdown headings that match the filename
	const headingRegex = /^(#+)\s(.*)$/gm;
	const contentWithoutHeadings = strippedContent.replace(headingRegex, (match, p1, p2) => {
	
		// console.log(`p2: ${p2}`);
		if (p2 === filenameWithoutExtension) {
			return "";
		}
		return match;
	});
	// console.log(`contentWithoutHeadings: ${contentWithoutHeadings}`);

	// Remove metadata blocks from count
	const metadataRegex = /^---[\s\S]*?---/gm;
	const contentWithoutMetadata = contentWithoutHeadings.replace(metadataRegex, "");
	// console.log(`contentWithoutMetadata: ${contentWithoutMetadata}`);

	// Remove #tags from count
	const tagRegex = /#[^\s]+/g;
	const contentWithoutTags = contentWithoutMetadata.replace(tagRegex, "");
	// console.log(`contentWithoutTags: ${contentWithoutTags}`);

	// Remove links and Wikipedia-links from count
	const linkRegex = /\[.*?\]\(.*?\)|\[\[.*?\]\]/g;
	const contentWithoutLinks = contentWithoutTags.replace(linkRegex, "");
	// console.log(`contentWithoutLinks: ${contentWithoutLinks}`);

	// Remove blank newlines
	const filteredContent: string = contentWithoutLinks
	.split('\n') // Split the content into an array of lines
	.filter(line => line.trim() !== '') // Filter out lines that are empty or contain only whitespace
	.filter(line => line.trim() !== '---') // remove --- on single lines
	.join('\n'); // Join the remaining lines back into a string, separated by newlines
	// console.log(`filteredContent: ${filteredContent}`);

	// Count the remaining characters
	const charCount = filteredContent.length;
	// console.log(`charCount: ${charCount}`);

	return charCount;
}


export function count_inlinks_single(file_path: string, vault_path: string): number {
	// Get the filename and directory of the file we're counting links to
	const filename = path.basename(file_path);
	const directory = path.dirname(file_path);

	// Create a set to hold all the files that link to our target file
	const linking_files: Set<string> = new Set();

	// Recursively search for files in the vault directory that link to our target file
	const walkSync = (dir: string, filelist: string[]) => {
		const files = fs.readdirSync(dir);
		filelist = filelist || [];
		files.forEach((file: string) => {
			if (fs.statSync(path.join(dir, file)).isDirectory()) {
				filelist = walkSync(path.join(dir, file), filelist);
			}
			else {
				// Ignore non-md files and files with the same name as our target file
				if (!file.endsWith(".md") || file === filename) {
					return;
				}

				// Read the file and look for links to our target file
				const data = fs.readFileSync(path.join(dir, file), "utf-8");
				data.split('\n').forEach((line: string) => {
					if (line.includes(`[[${filename.slice(0, -3)}]]`) || line.includes(`[${filename.slice(0, -3)}]`)) {
						// We found a link to our target file!
						linking_files.add(path.relative(directory, path.join(dir, file)));
					}
				});
			}
		});
		return filelist;
	};

	walkSync(vault_path, []);

	// count how many files are mentioning the input file
	return linking_files.size;
}


export function count_inlinks(file: TFile): number {

	const { app: { metadataCache: { resolvedLinks } } } = this, { path } = file
	const sumInlinks = Object.values(resolvedLinks)
		.map(val => val[path] ?? 0)
		.reduce((left, right) => left + right, 0)
	// console.log(`sumInlinks: ${sumInlinks}`)
	
	return sumInlinks;
}


export const getFileCountMap = async (app: App, excludeTag: string, excludeFolder: string): Promise<Map<string, number>> => {

    const { vault } = app;

	
	// files with this #tags in to ignore
	let excludedSubstrings : string[] = []
	if (excludeTag == undefined) {
		excludedSubstrings = []
	} else {
		excludedSubstrings = excludeTag.split(', ');
	}
	

	// folders to ignore .md-files in
	let excludedFolders : string[] = []
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
};


export const getFileMap = async (app: App, excludeTag: string, excludeFolder: string): Promise<TFile[]> => {

    const { vault } = app;

	// files with this #tags in to ignore
	let excludedSubstrings : string[] = []
	if (excludeTag == undefined) {
		excludedSubstrings = []
	} else {
		excludedSubstrings = excludeTag.split(', ');
	}
	console.log(`excludedSubstrings: ${excludedSubstrings}`)
	// folders to ignore .md-files in
	let excludedFolders : string[] = []
	if (excludeFolder == undefined) {
		excludedFolders = []
	} else {
		excludedFolders = excludeFolder.split(', ');
	}
	excludedFolders.push('.obsidian', '.trash'); // hardcode the basic folders
	console.log(`excludedFolders: ${excludedFolders}`)	
    let fileArray: TFile[] = [];
    const files = await vault.getMarkdownFiles();
    for (const file of files) {

        const fileContents = await app.vault.read(file);
		//console.log(`file.path: ${file.path}`)
		if ((!excludedSubstrings.some(substring => fileContents.includes(substring)) || excludeTag.length === 0) && 
            !excludedFolders.some(folder => file.path.includes(folder))) {
			console.log(`file ${file} get's added.`)
			fileArray.push(file)
        }
    }
    return fileArray;
};
