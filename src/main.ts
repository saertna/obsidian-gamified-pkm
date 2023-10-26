const style = document.createElement('style');
style.textContent = `
  .modal-checkbox-container {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }

  .modal-checkbox-container input[type="checkbox"] {
    margin-right: 5px;
  }
`;

document.head.append(style);
import {App, MarkdownView, Notice, Plugin, TFile, Vault} from 'obsidian';
import {defaultSettings, ISettings, GamificationPluginSettings} from './settings';
import format from 'date-fns/format';
import {
	avatarInitContent,
	pointsMajurity,
	pointsNoteMajurity,
	pointsForDailyChallenge,
	pointsForWeeklyChallenge,
	incrediments,
	elements,
	boosterRecipes,
	streakboosterDecrease,
	streakboosterIncreaseDaily,
	streakboosterIncreaseWeekly,
	chanceToEarnIngredient,
	listOfUseableIngredientsToBeShown} from './constants'
import {
	count_inlinks,
	countCharactersInActiveFile,
	countLayer2AndLayer3Characters,
	getFileCountMap,
	getFileMap,
	getNumberOfOutlinks,
	rateDirection,
	rateInlinks,
	rateLengthFilename,
	rateLevelOfMaturity,
	rateNoteLength,
	rateOutlinks,
	rateProgressiveSummarization
} from './majuritycalculation'
import {
	createChartFormat,
	findEarliestModifiedFile,
	getModificationDates,
	monthsBetween,
	replaceChartContent
} from './creatmodchartcalculation'
import {Badge, checkIfReceiveABadge, getBadgeForInitLevel, getBadgeForLevel} from './badges'
import {getLevelForPoints, statusPointsForLevel} from './levels'
import type {Moment} from 'moment';
import { getRandomMessageWeeklyChallenge, getRandomMessageTwoNoteChallenge , getRandomMessagePoints } from './randomNotificationText'
import { ModalInformationbox } from 'ModalInformationbox';
import { ModalBooster } from 'ModalBooster';
import { encryptValue, encryptString, decryptString, encryptNumber, decryptNumber, encryptBoolean, decryptBoolean } from 'encryption';

let pointsToReceived: number = 0;  
export default class gamification extends Plugin {
	//public settings: GamificationPluginSettings;
	private timerInterval: number;
	private timerId: number | null;
	private statusBarItem = this.addStatusBarItem();
	private statusbarGamification = this.statusBarItem.createEl("span", { text: "" });
	public settings: ISettings;


	/*getSetting(key: string) {
        // Retrieve a specific setting
		// return this.settings[key];
		return this.settings[key] !== undefined ? this.settings[key] : null;
    }*/

	getSettingString(key: string) {
        // Retrieve a specific setting
		// return this.settings[key];
		return decryptString(this.settings[key] !== undefined ? this.settings[key].toString() : '');
    }

	getSettingNumber(key: string) {
        // Retrieve a specific setting
		// return this.settings[key];
		//console.log(`key: ${key}`)
		return decryptNumber(this.settings[key] !== undefined ? this.settings[key].toString() : '');
    }

	getSettingBoolean(key: string) {
        // Retrieve a specific setting
		// return this.settings[key];
		return decryptBoolean(this.settings[key] !== undefined ? this.settings[key].toString() : '');
    }


    /*setSetting(key: string, value: number) {
        // Set a specific setting
		//console.log(`new value for ${key} is ${value}`)
        this.settings[key] = value;
        this.saveSettings();
    }*/

	setSettingString(key: string, value: string) {
        // Set a specific setting
		//console.log(`new value for ${key} is ${value}`)
		const valueEncrypted = encryptString(value)
        this.settings[key] = valueEncrypted;
        //this.settings[key] = value;
        this.saveSettings();
	}


	setSettingNumber(key: string, value: number) {
        // Set a specific setting
		//console.log(`new value for ${key} is ${value}`)
		const valueEncrypted = encryptNumber(value)
        this.settings[key] = valueEncrypted;
        //this.settings[key] = value;
        this.saveSettings();
    }

	setSettingBoolean(key: string, value: boolean) {
        // Set a specific setting
		//console.log(`new value for ${key} is ${value}`)
		const valueEncrypted = encryptBoolean(value)
        this.settings[key] = valueEncrypted;
        this.saveSettings();
	}


	

	
	async onload() {
		console.log('obsidian-pkm-gamification loaded!');
		//this.settings = defaultSettings;

		
		
  

		await this.loadSettings();
		

		this.addSettingTab(new GamificationPluginSettings(this.app, this));


		/*
		// take care to reset when opened on a new day, don't wait for trigger
		setTimeout(async () => {
			// Code that you want to execute after the delay
			await this.resetDailyGoals()
		}, 2000); // 2000 milliseconds = 2 seconds
*/

		// to set timer for reset daily and weekly goals
		this.timerInterval = 30 * 60 * 1000; // minutes x seconds x milliseconds
		this.timerId = window.setInterval(this.resetDailyGoals.bind(this), this.timerInterval);

		await this.updateStatusBar(this.statusbarGamification)


		if (this.getSettingBoolean('debug')){
			this.addRibbonIcon("accessibility", "crafting", async () => {

				this.acquireIngredients();
				
			});
		}

		if(this.getSettingNumber('counterMajurityCalcInitial') >= 50){
			this.addRibbonIcon("test-tube-2", "Boosters", async () => {
				//const file: TFile | null = this.app.workspace.getActiveFile();
				new ModalBooster(this.app, ` `, this).open();
			});

			this.addCommand({
				id: 'boosters',
				name: 'open booter pallete',
				callback: async () => {
					new ModalBooster(this.app, ` `, this).open();
				},
			});
		}

		this.addRibbonIcon("sprout", "Calculate Note Maturity", async () => {
			//const file: TFile | null = this.app.workspace.getActiveFile();
			await this.calculateNoteMajurity();
		});



		if (this.getSettingBoolean('enableInitCommand')){
			// command Initialize gamification ratings
			this.addCommand({
				id: 'init-rate-gamification',
				name: 'Initialize gamification ratings',
				callback: async () => {
					await this.initializeGame(this.statusbarGamification);
				},
			});
		}

		if (this.getSettingBoolean('enableInitCommand')){
			// command create avatar profile page
			this.addCommand({
				id: 'create-avatar-page',
				name: 'create profile page',
				callback: async () => {
					const { vault } = this.app;
					await createAvatarFile(this.app, this.getSettingString('avatarPageName'))
					const chartString = await this.createChart(vault)
					await replaceChartContent(this.getSettingString('avatarPageName'), chartString)
				},
			});
		}


		if (this.getSettingBoolean('enableInitCommand')) {
			// command: reset game
			this.addCommand({
				id: 'reset-game',
				name: 'reset the game',
				callback: async () => {
                    await this.resetGame();
                },

			});
		}

		// command: update chart in Avatar Page
		this.addCommand({
			id: 'update-chart-avatarpage',
			name: 'update chart on profile page',
			callback: async () => {
				const { vault } = app;
				const chartString = await this.createChart(vault)
				await replaceChartContent(this.getSettingString('avatarPageName'), chartString)
			},
		});


		// command: rate note maturity
		this.addCommand({
			id: 'rate-note-maturity',
			name: 'Rate note majurity',
			callback: async () => {
				await this.calculateNoteMajurity();
			},
		});


		// command: change progressive summarization symbols
		this.addCommand({
			id: 'change-progressive-formatting',
			name: 'toggle progressive summarization formatting',
			callback: async () => {
				await replaceFormatStrings(this.getSettingString('progressiveSumLayer2'), this.getSettingString('progressiveSumLayer3'));
			},
		});

	}


    private async resetGame() {
        await this.removeKeysFromFrontmatter();
        this.setSettingNumber('statusLevel', 1)
        this.setSettingNumber('statusPoints', 0)
        this.setSettingNumber('xpForNextLevel', 1000)
        this.setSettingBoolean('badgeBoosterState', false)
        this.setSettingNumber('badgeBoosterFactor', 1)
        //await this.saveData(this.settings);
        await this.giveStatusPoints(0,'')
        await this.updateStatusBar(this.statusbarGamification)
        new ModalInformationbox(this.app, `Game is now reseted. Please delete the Profile Page: "${this.getSettingString('avatarPageName')}.md" manually.`).open();
    }


    private async initializeGame(statusbarGamification: HTMLSpanElement) {
		this.setSettingString('gamificationStartDate', format(new Date(), 'yyyy-MM-dd'));
		await this.saveSettings();

		const {vault} = this.app;
		await createAvatarFile(this.app, this.getSettingString('avatarPageName'))
		const chartString = await this.createChart(vault)
		await replaceChartContent(this.getSettingString('avatarPageName'), chartString)
		await this.openAvatarFile()
		const fileCountMap: TFile[] = await getFileMap(this.app, this.getSettingString('tagsExclude'), this.getSettingString('folderExclude'));
		console.log(`fileCountMap loaded. Number of files: ${fileCountMap.length}`);

		let pointsReceived = 0; // to have one message at the end how many points received

		for (const fileName of fileCountMap) {
			const file = fileName
			const fileContents = await app.vault.read(file);
			const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
			if (activeView && activeView.file && activeView.file.path === file.path) {
				console.warn(`File ${file.path} is currently open. Skipping.`);
				continue;
			}
			//console.log(`fileName.basename: ${fileName.basename}`)
			const fileLength = countCharactersInActiveFile(fileContents, fileName.basename);
			const rateFileLength = rateNoteLength(fileLength);
			const {
				charCount,
				highlightedCount,
				boldCount
			} = countLayer2AndLayer3Characters(fileContents, fileName.basename, this.getSettingString('progressiveSumLayer2'), this.getSettingString('progressiveSumLayer3'));
			const rateProgressiveSum: number = rateProgressiveSummarization(charCount, highlightedCount, boldCount);
			const fileNameRate = rateLengthFilename(file.name);
			const inlinkNumber = count_inlinks(file);
			const inlinkClass = rateInlinks(inlinkNumber)//, fileCountMap.size);
			const rateOut = rateOutlinks(getNumberOfOutlinks(file));
			const noteMajurity = rateLevelOfMaturity(rateFileLength, fileNameRate, inlinkClass, rateOut, rateProgressiveSum);


			console.log(`Processing file ${fileName.basename} in path ${fileName.path}`);

			try {
				await this.app.fileManager.processFrontMatter(file, (frontmatter) => {
					if (rateDirectionForStatusPoints(frontmatter['note-maturity'], noteMajurity) >= 1) {
						//pointsReceived += pointsNoteMajurity * rateDirectionForStatusPoints(frontmatter['note-maturity'], noteMajurity)
						this.giveStatusPoints(pointsNoteMajurity * rateDirectionForStatusPoints("frontmatter['note-maturity']", noteMajurity),'fromNoteMajurity')
						pointsReceived += pointsToReceived;
					} else if (!('note-maturity' in frontmatter)) {
						//pointsReceived += pointsNoteMajurity * rateDirectionForStatusPoints("0", noteMajurity)
						this.giveStatusPoints(pointsNoteMajurity * rateDirectionForStatusPoints("0", noteMajurity),'fromNoteMajurityFirstTime')
						pointsReceived += pointsToReceived;
					}

					if (rateDirectionForStatusPoints(frontmatter['title-class'], fileNameRate) >= 1 && 'title-class' in frontmatter) {
						//pointsReceived += pointsMajurity * rateDirectionForStatusPoints(frontmatter['title-class'], fileNameRate)
						this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints(frontmatter['title-class'], fileNameRate),'fromTitleClass')
						pointsReceived += pointsToReceived;
					} else if (!('title-class' in frontmatter)) {
						//pointsReceived += pointsMajurity * rateDirectionForStatusPoints("0", fileNameRate)
						this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints("0", fileNameRate),'fromTitleClassFirstTime')
						pointsReceived += pointsToReceived;
					}

					if (rateDirectionForStatusPoints(frontmatter['note-length-class'], rateFileLength) >= 1) {
						//pointsReceived += pointsMajurity * rateDirectionForStatusPoints(frontmatter['note-length-class'], rateFileLength)
						this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints(frontmatter['note-length-class'], rateFileLength),'fromNoteLengthClass')
						pointsReceived += pointsToReceived;
					} else if (!('note-length-class' in frontmatter)) {
						//pointsReceived += pointsMajurity * rateDirectionForStatusPoints("0", rateFileLength)
						this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints("0", rateFileLength),'fromNoteLengthClassFirstTime')
						pointsReceived += pointsToReceived;
					}

					if (rateDirectionForStatusPoints(frontmatter['inlink-class'], inlinkClass) >= 1) {
						//pointsReceived += pointsMajurity * rateDirectionForStatusPoints(frontmatter['inlink-class'], inlinkClass)
						this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints(frontmatter['inlink-class'], inlinkClass),'fromInlinkClass')
						pointsReceived += pointsToReceived;
					} else if (!('inlink-class' in frontmatter)) {
						//pointsReceived += pointsMajurity * rateDirectionForStatusPoints("0", inlinkClass)
						this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints("0", inlinkClass),'fromInlinkClassFirstTime')
						pointsReceived += pointsToReceived;
					}

					if (rateDirectionForStatusPoints(frontmatter['outlink-class'], rateOut) >= 1) {
						//pointsReceived += pointsMajurity * rateDirectionForStatusPoints(frontmatter['outlink-class'], rateOut)
						this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints(frontmatter['outlink-class'], rateOut),'fromOutlinkClass')
						pointsReceived += pointsToReceived;
					} else if (!('outlink-class' in frontmatter)) {
						//pointsReceived += pointsMajurity * rateDirectionForStatusPoints("0", rateOut)
						this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints("0", rateOut),'fromOutlinkClassFirstTime')
						pointsReceived += pointsToReceived;
					}

					if (rateDirectionForStatusPoints(frontmatter['progressive-summarization-maturity'], rateProgressiveSum) >= 1) {
						//pointsReceived += pointsMajurity * rateDirectionForStatusPoints(frontmatter['progressive-summarization-maturity'], rateProgressiveSum)
						this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints(frontmatter['progressive-summarization-maturity'], rateProgressiveSum),'fromProgressiveTummarizationMaturity')
						pointsReceived += pointsToReceived;
					} else if (!('progressive-summarization-maturity' in frontmatter)) {
						//pointsReceived += pointsMajurity * rateDirectionForStatusPoints(frontmatter['progressive-summarization-maturity'], rateProgressiveSum)
						this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints("0", rateProgressiveSum),'fromProgressiveTummarizationMaturityFirstTime')
						pointsReceived += pointsToReceived;
					}

					this.writeFrontmatter(frontmatter, fileNameRate, rateFileLength, inlinkClass, rateOut, rateProgressiveSum, noteMajurity);
				});
			} catch (e) {
				if (e?.name === 'YAMLParseError') {
					const errorMessage = `Update majuritys failed Malformed frontamtter on this file : ${file.path} ${e.message}`;
					new Notice(errorMessage, 4000);
					console.error(errorMessage);
				}
			}
		}
		if (pointsReceived > 0) {
			new Notice(`${pointsReceived} Points received`,4000)
			console.log(`${pointsReceived} Points received`)
		}


		// Inside your function where you want to introduce a delay
		setTimeout(async () => {
			// Code that you want to execute after the delay
			const initBadge: Badge = getBadgeForInitLevel(this.getSettingNumber('statusLevel'));
			new Notice(`You've earned the "${initBadge.name}" badge. ${initBadge.description}`,5000)
			console.log(`You earned ${initBadge.name} - ${initBadge.description}`)
			await this.giveInitBadgeInProfile(this.getSettingString('avatarPageName'), initBadge);
			await this.removeBadgesWhenInitLevelHigher(this.getSettingString('avatarPageName'), this.getSettingNumber('statusLevel'))
			await this.boosterForInit()
			await this.updateStatusBar(statusbarGamification)
		}, 2000); // 2000 milliseconds = 2 seconds

		new ModalInformationbox(this.app, `Finallized gamification initialistation!\nCongratulation, you earned ${pointsReceived} Points!\n\nCheck the Profile Page: "${this.getSettingString('avatarPageName')}.md"\n\nYou received an initialisation Booster aktiv for your first level ups. Game on!`).open();
	}


	private writeFrontmatter(frontmatter: any, fileNameRate: number, rateFileLength: number, inlinkClass: number, rateOut: number, rateProgressiveSum: number, noteMajurity: number) {
		frontmatter['title-class'] = rateDirection(frontmatter['title-class'], fileNameRate)
		frontmatter['note-length-class'] = rateDirection(frontmatter['note-length-class'], rateFileLength)
		frontmatter['inlink-class'] = rateDirection(frontmatter['inlink-class'], inlinkClass)
		frontmatter['outlink-class'] = rateDirection(frontmatter['outlink-class'], rateOut)
		frontmatter['progressive-summarization-maturity'] = rateDirection(frontmatter['progressive-summarization-maturity'], rateProgressiveSum)
		frontmatter['note-maturity'] = rateDirection(frontmatter['note-maturity'], noteMajurity)
	}


	onunload() {
		console.log('obsidian-pkm-gamification unloaded!');

		// Clear the timer when the plugin is unloaded
		if (this.timerId !== null) {
			clearInterval(this.timerId);
			this.timerId = null;
		}
	}


	async calculateNoteMajurity(){
		const file: TFile | null= this.app.workspace.getActiveFile();
		if (file == null) {
			console.error('got no file, propably none is active')
		}

		let detectIfNoteIsFirstTimeRated = false;

		// get file content length
		const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
		const fileContents = activeView?.editor.getValue();
		const fileName = activeView?.file.basename;
		

		let rateFileLength = 0;
		let fileLength = 0;
		let rateProgressiveSum = 0;

		if (fileContents !== undefined && fileName !== undefined) {
			fileLength = countCharactersInActiveFile(fileContents, fileName);
			rateFileLength = rateNoteLength(fileLength);

			// Check if fileContents and fileName are not null
			if (fileContents !== null && fileName !== null) {
				const { charCount, highlightedCount, boldCount } = countLayer2AndLayer3Characters(fileContents, fileName, this.getSettingString('progressiveSumLayer2'), this.getSettingString('progressiveSumLayer3'));
				rateProgressiveSum = rateProgressiveSummarization(charCount, highlightedCount, boldCount);
			}
		}

		let fileNameRate = 0;
		let inlinkNumber = 0;
		let inlinkClass = 0;
		let rateOut = 0;

		if (file !== null) {
			fileNameRate = rateLengthFilename(file.name ?? '');
			inlinkNumber = count_inlinks(file);
			inlinkClass = rateInlinks(inlinkNumber)//, numAllFiles)
			rateOut = rateOutlinks(getNumberOfOutlinks(file));

			const noteMajurity = rateLevelOfMaturity(rateFileLength, fileNameRate, inlinkClass, rateOut, rateProgressiveSum);
			
			
			
			this.setSettingNumber('counterMajurityCalc',this.getSettingNumber('counterMajurityCalc') + 1)
			
			
			try {
				await this.app.fileManager.processFrontMatter(file, (frontmatter) => {
					if (frontmatter) {
						let pointsReceived = 0; // to have one message at the end how many points received
						if (rateDirectionForStatusPoints(frontmatter['note-maturity'], noteMajurity) >= 1){
							console.log(`note-maturity >=1`)
							//pointsReceived += pointsNoteMajurity*rateDirectionForStatusPoints(frontmatter['note-maturity'], noteMajurity)
							const newLevel = this.giveStatusPoints(pointsNoteMajurity * rateDirectionForStatusPoints("frontmatter['note-maturity']", noteMajurity),'fromNoteMajurity')
							pointsReceived += pointsToReceived;
							this.decisionIfBadge(newLevel)
						} else if (!('note-maturity' in frontmatter)){
							//pointsReceived += pointsNoteMajurity*rateDirectionForStatusPoints("0", noteMajurity)
							const newLevel = this.giveStatusPoints(pointsNoteMajurity * rateDirectionForStatusPoints("0", noteMajurity),'fromNoteMajurityFirstTime')
							pointsReceived += pointsToReceived;
							this.decisionIfBadge(newLevel);
							detectIfNoteIsFirstTimeRated = true;
							this.setSettingNumber('counterMajurityCalcInitial',this.getSettingNumber('counterMajurityCalcInitial') + 1)
							if(this.getSettingNumber('counterMajurityCalcInitial') == 50){
								new ModalInformationbox(this.app, `🚀 Introducing Boosters! 🚀Level up faster, you enabled the next stage! Craft Boosters for an accelerated knowledge journey. Click the "test-tube" on the right or type 'Open Booster Palette' to get started! you got one booster as a gift, so try it out!🌟📚🔍`).open();
							}
						}

						if (rateDirectionForStatusPoints(frontmatter['title-class'], fileNameRate) >= 1 && 'title-class' in frontmatter){
							//pointsReceived += pointsMajurity*rateDirectionForStatusPoints(frontmatter['title-class'], fileNameRate)
							const newLevel = this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints(frontmatter['title-class'], fileNameRate),'fromTitleClass')
							pointsReceived += pointsToReceived;
							this.decisionIfBadge(newLevel)
						} else if (!('title-class' in frontmatter)){
							//pointsReceived += pointsMajurity*rateDirectionForStatusPoints("0", fileNameRate)
							const newLevel = this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints("0", fileNameRate),'fromTitleClassFirstTime')
							pointsReceived += pointsToReceived;
							this.decisionIfBadge(newLevel)
						}

						if (rateDirectionForStatusPoints(frontmatter['note-length-class'], rateFileLength) >= 1){
							//pointsReceived += pointsMajurity*rateDirectionForStatusPoints(frontmatter['note-length-class'], rateFileLength)
							const newLevel = this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints(frontmatter['note-length-class'], rateFileLength),'fromNoteLengthClass')
							pointsReceived += pointsToReceived;
							this.decisionIfBadge(newLevel)
						}else if (!('note-length-class' in frontmatter)){
							//pointsReceived += pointsMajurity*rateDirectionForStatusPoints("0", rateFileLength)
							const newLevel = this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints("0", rateFileLength),'fromNoteLengthClassFirstTime')
							pointsReceived += pointsToReceived;
							this.decisionIfBadge(newLevel)
						}

						if (rateDirectionForStatusPoints(frontmatter['inlink-class'], inlinkClass) >= 1){
							//pointsReceived += pointsMajurity*rateDirectionForStatusPoints(frontmatter['inlink-class'], inlinkClass)
							const newLevel = this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints(frontmatter['inlink-class'], inlinkClass),'fromInlinkClass')
							pointsReceived += pointsToReceived;
							this.decisionIfBadge(newLevel)
						}else if (!('inlink-class' in frontmatter)){
							//pointsReceived += pointsMajurity*rateDirectionForStatusPoints("0", inlinkClass)
							const newLevel = this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints("0", inlinkClass),'fromInlinkClassFirstTime')
							pointsReceived += pointsToReceived;
							this.decisionIfBadge(newLevel)
						}

						if (rateDirectionForStatusPoints(frontmatter['outlink-class'], rateOut) >= 1){
							//pointsReceived += pointsMajurity*rateDirectionForStatusPoints(frontmatter['outlink-class'], rateOut)
							const newLevel = this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints(frontmatter['outlink-class'], rateOut),'fromOutlinkClass')
							pointsReceived += pointsToReceived;
							this.decisionIfBadge(newLevel)
						}else if (!('outlink-class' in frontmatter)){
							//pointsReceived += pointsMajurity*rateDirectionForStatusPoints("0", rateOut)
							const newLevel = this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints("0", rateOut),'fromOutlinkClassFirstTime')
							pointsReceived += pointsToReceived;
							this.decisionIfBadge(newLevel)
						}

						if (rateDirectionForStatusPoints(frontmatter['progressive-summarization-maturity'], rateProgressiveSum) >= 1){
							//pointsReceived += pointsMajurity*rateDirectionForStatusPoints(frontmatter['progressive-summarization-maturity'], rateProgressiveSum)
							const newLevel = this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints(frontmatter['progressive-summarization-maturity'], rateProgressiveSum),'fromProgressiveTummarizationMaturity')
							pointsReceived += pointsToReceived;
							this.decisionIfBadge(newLevel)
						}else if (!('progressive-summarization-maturity' in frontmatter)){
							//pointsReceived += pointsMajurity*rateDirectionForStatusPoints(frontmatter['progressive-summarization-maturity'], rateProgressiveSum)
							const newLevel = this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints("0", rateProgressiveSum),'fromProgressiveTummarizationMaturityFirstTime')
							pointsReceived += pointsToReceived;
							this.decisionIfBadge(newLevel)
						}
						//console.log(`pointsReceived: ${pointsReceived}`)
						if (pointsReceived > 0){
							const messagePoints = getRandomMessagePoints(pointsReceived);
							new Notice(messagePoints,4000)
							console.log(messagePoints)
						}

						this.writeFrontmatter(frontmatter, fileNameRate, rateFileLength, inlinkClass, rateOut, rateProgressiveSum, noteMajurity);
					}
				});
			} catch (e) {
				if (e?.name === 'YAMLParseError') {
					const errorMessage = `Update majuritys failed Malformed frontamtter on this file : ${file.path} ${e.message}`;
					new Notice(errorMessage, 4000);
					console.error(errorMessage);
				}
			}
			new Notice('note majurity updated!');
			console.log('note majurity updated!')
			await this.updateStatusBar(this.statusbarGamification)
		} else {
			console.error('file was not found to calculate majurities. Make sure one is active.')
		}
		if (detectIfNoteIsFirstTimeRated){
			await this.increaseDailyCreatedNoteCount();
			await this.increaseWeeklyCreatedNoteCount();
		}
	}


	async resetDailyGoals(){
		let reset = false;
		if(!isSameDay(window.moment(this.getSettingString('dailyNoteCreationDate'), 'DD.MM.YYYY'))){
			this.setSettingNumber('dailyNoteCreationTask', 0);
			this.setSettingString('dailyNoteCreationDate', window.moment().format('DD.MM.YYYY'))
			await this.saveSettings();
			console.log(`daily Challenge reseted`)
			reset = true;
		}
		if(!isOneDayBefore(window.moment(this.getSettingString('weeklyNoteCreationDate'), 'DD.MM.YYYY')) && !isSameDay(window.moment(this.getSettingString('weeklyNoteCreationDate'), 'DD.MM.YYYY'))){
			const daysPassed = window.moment().diff(window.moment(this.getSettingString('weeklyNoteCreationDate'), 'DD.MM.YYYY'), 'days') - 1; //today is still a chance. 
			this.setSettingNumber('weeklyNoteCreationTask', 0);
			this.setSettingString('weeklyNoteCreationDate',window.moment().subtract(1, 'day').format('DD.MM.YYYY'))
			this.decreaseStreakbooster(daysPassed)
			console.log(`${daysPassed} days passed`)
			await this.saveSettings();
			await this.updateStatusBar(this.statusbarGamification)
			console.log(`weekly Challenge reseted`)
			reset = true;
		}
		if(isOneDayBefore(window.moment(this.getSettingString('weeklyNoteCreationDate'), 'DD.MM.YYYY')) && this.getSettingNumber('weeklyNoteCreationTask') == 7){
			this.setSettingNumber('weeklyNoteCreationTask', 0);
			this.setSettingString('weeklyNoteCreationDate', window.moment().subtract(1, 'day').format('DD.MM.YYYY'))
			await this.saveSettings();
			reset = true;
		}
		if (reset){
			await this.updateAvatarPage(this.getSettingString('avatarPageName'));
		}

		// deativate boosters
		if (this.getSettingBoolean('boosterFactorPerpetualProgress') == true && isMinutesPassed(window.moment(this.getSettingString('boosterDatePerpetualProgress'), 'YYYY-MM-DD HH:mm:ss'),getBoosterRunTimeFromVarName('perpetualProgress'))){
			this.setSettingBoolean('boosterFactorPerpetualProgress',false);
			console.log('"Perpetual Progress" has ended.')
		}
		if (this.getSettingBoolean('boosterFactorStrategicSynapses') == true && isMinutesPassed(window.moment(this.getSettingString('boosterDateStrategicSynapses'), 'YYYY-MM-DD HH:mm:ss'),getBoosterRunTimeFromVarName('strategicSynapses'))){
			this.setSettingBoolean('boosterFactorStrategicSynapses',false);
			console.log('"Strategic Synapses" has ended.')
		}
		if (this.getSettingBoolean('boosterFactorLinkersLode') == true && isMinutesPassed(window.moment(this.getSettingString('boosterDateLinkersLode'), 'YYYY-MM-DD HH:mm:ss'),getBoosterRunTimeFromVarName('linkersLode'))){
			this.setSettingBoolean('boosterFactorLinkersLode',false);
			console.log('"Linkers Lode" has ended.')
		}
		if (this.getSettingBoolean('boosterFactorRecursiveReflection') == true && isMinutesPassed(window.moment(this.getSettingString('boosterDateRecursiveReflection'), 'YYYY-MM-DD HH:mm:ss'),getBoosterRunTimeFromVarName('recursiveReflection'))){
			this.setSettingBoolean('boosterFactorRecursiveReflection',false);
			console.log('"Recursive Reflection" has ended.')
		}
		if (this.getSettingBoolean('boosterFactorSynapticSurge') == true && isMinutesPassed(window.moment(this.getSettingString('boosterDateSynapticSurge'), 'YYYY-MM-DD HH:mm:ss'),getBoosterRunTimeFromVarName('synapticSurge'))){
			this.setSettingBoolean('boosterFactorSynapticSurge',false);
			console.log('"Synaptic Surge" has ended.')
		}
		if (this.getSettingBoolean('boosterFactorTitleTitan') == true && isMinutesPassed(window.moment(this.getSettingString('boosterDateTitleTitan'), 'YYYY-MM-DD HH:mm:ss'),getBoosterRunTimeFromVarName('titleTitan'))){
			this.setSettingBoolean('boosterFactorTitleTitan',false);
			console.log('"Title Titan" has ended.')
		}
		if (this.getSettingBoolean('boosterFactorPrecisionPrism') == true && isMinutesPassed(window.moment(this.getSettingString('boosterDatePrecisionPrism'), 'YYYY-MM-DD HH:mm:ss'),getBoosterRunTimeFromVarName('precisionPrism'))){
			this.setSettingBoolean('boosterFactorPrecisionPrism',false);
			console.log('"Precision Prism" has ended.')
		}
		if (this.getSettingBoolean('boosterFactorHyperlinkHarmony') == true && isMinutesPassed(window.moment(this.getSettingString('boosterDateHyperlinkHarmony'), 'YYYY-MM-DD HH:mm:ss'),getBoosterRunTimeFromVarName('hyperlinkHarmony'))){
			this.setSettingBoolean('boosterFactorHyperlinkHarmony',false);
			console.log('"Hyperlink Harmony" has ended.')
		}
		if (this.getSettingBoolean('boosterFactorEphemeralEuphoria') == true && isMinutesPassed(window.moment(this.getSettingString('boosterDateEphemeralEuphoria'), 'YYYY-MM-DD HH:mm:ss'),getBoosterRunTimeFromVarName('ephemeralEuphoria'))){
			this.setSettingBoolean('boosterFactorEphemeralEuphoria',false);
			console.log('"Ephemeral Euphoria" has ended.')
		}

	}


	async increaseDailyCreatedNoteCount(){
		let newDailyNoteCreationTask = this.getSettingNumber('dailyNoteCreationTask');
        if (newDailyNoteCreationTask < 2){
			newDailyNoteCreationTask ++;
			this.setSettingNumber('dailyNoteCreationTask', newDailyNoteCreationTask);
			await this.saveSettings();

			if(newDailyNoteCreationTask == 1){
				// update Avatar Page
				await this.updateAvatarPage(this.getSettingString('avatarPageName'));
				console.log(`${newDailyNoteCreationTask}/2 Notes created today.`)
			} else if (newDailyNoteCreationTask == 2) {
				this.increaseStreakbooster(streakboosterIncreaseDaily)
				await this.saveSettings();
				await this.updateStatusBar(this.statusbarGamification)
				await this.giveStatusPoints(pointsForDailyChallenge,'formIncreaseDailyCreatedNoteCount')
				const message = getRandomMessageTwoNoteChallenge(pointsForDailyChallenge * (this.getSettingNumber('badgeBoosterFactor') + this.getSettingNumber('streakbooster')));
				console.log(`daily Challenge reached! ${newDailyNoteCreationTask}/2 created.`)
				new Notice(message,4000)
				console.log(message)
			} else {
				// nothing else to do here
				console.log(`${newDailyNoteCreationTask}/2 Notes created today.`)
			}
		}
	}


	async increaseWeeklyCreatedNoteCount(){
		if(isOneDayBefore(window.moment(this.getSettingString('weeklyNoteCreationDate'), 'DD.MM.YYYY'))){
			await this.checkForWeeklyNoteChallengeBelow7();
		} else if (isSameDay(window.moment(this.getSettingString('weeklyNoteCreationDate'), 'DD.MM.YYYY'))){
			// do nothing
			console.log(`daily note creation was rated already today.`)
		} else {
			this.setSettingString('weeklyNoteCreationDate', window.moment().format('DD.MM.YYYY'))
			this.setSettingNumber('weeklyNoteCreationTask', 1);
			await this.saveSettings();
		}
	}


	private async checkForWeeklyNoteChallengeBelow7() {
		let currentWeeklyCreatedNotes = this.getSettingNumber('weeklyNoteCreationTask');
		if (currentWeeklyCreatedNotes < 7) {
			currentWeeklyCreatedNotes++;
			this.setSettingString('weeklyNoteCreationDate', window.moment().format('DD.MM.YYYY'))
			this.setSettingNumber('weeklyNoteCreationTask', currentWeeklyCreatedNotes);
			await this.saveSettings();

			await this.checkForWeeklyNoteChallengeEvaluation(currentWeeklyCreatedNotes);
		}
	}


	private async checkForWeeklyNoteChallengeEvaluation(newWeeklyNoteCreationTask: number) {
		if (newWeeklyNoteCreationTask <= 6) {
			// update Avatar Page
			await this.updateAvatarPage(this.getSettingString('avatarPageName'));
			console.log(`${newWeeklyNoteCreationTask}/7 Notes created in a chain.`)
		} else if (newWeeklyNoteCreationTask == 7) {
			this.increaseStreakbooster(streakboosterIncreaseWeekly);
			await this.saveSettings();
			await this.giveStatusPoints(pointsForWeeklyChallenge, 'fromCheckForWeeklyNoteChallengeEvaluation')
			console.log(`Weekly Challenge reached! ${newWeeklyNoteCreationTask}/7 created in a chain.`)
			const message = getRandomMessageWeeklyChallenge(pointsForWeeklyChallenge * (this.getSettingNumber('badgeBoosterFactor') + this.getSettingNumber('streakbooster')));
			new Notice(message,4000)
			console.log(message)
		} else {
			// nothing else to do here
			console.log(`${newWeeklyNoteCreationTask}/7 Notes created in a chain.`)
		}
	}


	async updateStatusBar(statusbar: HTMLSpanElement){
		const currentLevel = getLevelForPoints(this.getSettingNumber('statusPoints'))
		const progressbarPercent = (this.getSettingNumber('statusPoints') - currentLevel.points)/(currentLevel.pointsNext - currentLevel.points)*100;
		const charNumProgressbar = 10;
		const barLength = Math.round(progressbarPercent / charNumProgressbar)
		const boosterFactor = this.getSettingNumber('streakbooster')
		statusbar.setText(`🎲|lvl: ${this.getSettingNumber('statusLevel')} | ${this.createProgressbar(charNumProgressbar, barLength)}|🚀${boosterFactor}${this.rateBoosterDirection()}`)
	}


	private rateBoosterDirection(){
		let direction = '⬆️'
		if(this.getSettingBoolean('streakboosterDate')){
			direction = '⬆️';
		} else {
			direction = '⬇️';
		}
		return direction
	}


	private createProgressbar(charNumProgressbar: number, barLength: number) {
		let progressbar = ''
		for (let i = 1; i <= charNumProgressbar; i++) {
			if (i <= barLength) {
				progressbar += '='
			} else {
				progressbar += '-'
			}
		}
		return progressbar;
	}

	async loadSettings() {
		this.settings = Object.assign({}, defaultSettings, await this.loadData());
		console.log('loadSettings()')
	}


	async saveSettings() {
		await this.saveData(this.settings);
	}


	async giveStatusPoints(pointsToAdd: number, caller: string): Promise<boolean>{
		let boosterFactor = 1;
		let streakbooster = this.getSettingNumber('streakbooster');
		let boosterFactorPerpetualProgress = 0;
		let boosterFactorStrategicSynapses = 0;
		let boosterFactorLinkersLode = 0;
		let boosterFactorRecursiveReflection = 0;
		let boosterFactorSynapticSurge = 0;
		let boosterFactorTitleTitan = 0;
		let boosterFactorPrecisionPrism = 0;
		let boosterFactorHyperlinkHarmony = 0;
		let boosterFactorEphemeralEuphoria = 0;
		
		if (this.getSettingBoolean('badgeBoosterState')){
			boosterFactor = this.getSettingNumber('badgeBoosterFactor');
		}
		if (this.getSettingBoolean('boosterFactorPerpetualProgress')){
			boosterFactorPerpetualProgress = 3;
		}
		if (this.getSettingBoolean('boosterFactorStrategicSynapses')){
			boosterFactorStrategicSynapses = 3;
		}
		if (this.getSettingBoolean('boosterFactorLinkersLode')){
			boosterFactorLinkersLode = 10;
		}
		if (this.getSettingBoolean('boosterFactorRecursiveReflection') && ( caller == 'fromNoteMajurity' || caller == 'fromTitleClass' || caller == 'fromNoteLengthClass' || caller == 'fromInlinkClass' || caller == 'fromOutlinkClass' || caller == 'fromProgressiveTummarizationMaturity')){
			boosterFactorRecursiveReflection = 5;
		}
		if (this.getSettingBoolean('boosterFactorSynapticSurge') && (caller == 'fromInlinkClass' || caller == 'fromOutlinkClass')){
			boosterFactorSynapticSurge = 20;
		}
		if (this.getSettingBoolean('boosterFactorTitleTitan') && caller == 'fromTitleClass'){
			boosterFactorTitleTitan = 4;
		}
		if (this.getSettingBoolean('boosterFactorPrecisionPrism') && caller == 'fromNoteLengthClass'){
			boosterFactorPrecisionPrism = 4;
		}
		if (this.getSettingBoolean('boosterFactorHyperlinkHarmony') && (caller == 'fromInlinkClass' || caller == 'fromOutlinkClass')){
			boosterFactorHyperlinkHarmony = 5;
		}
		if (this.getSettingBoolean('boosterFactorEphemeralEuphoria')){
			boosterFactorEphemeralEuphoria = 80;
		}
		
		pointsToReceived = pointsToAdd * (boosterFactor + streakbooster + boosterFactorPerpetualProgress + boosterFactorStrategicSynapses + boosterFactorLinkersLode + boosterFactorRecursiveReflection + boosterFactorSynapticSurge + boosterFactorTitleTitan + boosterFactorPrecisionPrism + boosterFactorHyperlinkHarmony + boosterFactorEphemeralEuphoria )
		this.setSettingNumber('statusPoints', pointsToReceived + this.getSettingNumber('statusPoints'))
		//await this.saveData(this.settings)

		return this.updateAvatarPage(this.getSettingString('avatarPageName'))
	}

	async increaseStreakbooster(increaseValue:number){
		let newBoosterFakfor = parseFloat((this.getSettingNumber('streakbooster') + increaseValue).toFixed(1));
		if(newBoosterFakfor > 80){
			newBoosterFakfor = 80;
		}
		this.setSettingNumber('streakbooster', newBoosterFakfor);
		this.setSettingBoolean('streakboosterDate', true);
		//await this.saveData(this.settings)
		console.log(`streakbooster: ${this.getSettingNumber('streakbooster')}`)
	}


	async decreaseStreakbooster(decreaseValue:number){
		let newBoosterFakfor = parseFloat((this.getSettingNumber('streakbooster') - decreaseValue * streakboosterDecrease).toFixed(1))
		this.setSettingNumber('streakbooster', newBoosterFakfor)
		if (newBoosterFakfor < 0){
			newBoosterFakfor = 0
		}
		this.setSettingNumber('streakbooster', newBoosterFakfor)
		this.setSettingBoolean('streakboosterDate', false);
		//await this.saveData(this.settings)
	}


	async updateAvatarPage(avatarPageName: string): Promise<boolean>{
		const existingFile = app.vault.getAbstractFileByPath(`${avatarPageName}.md`);
		if (existingFile == null) {
			console.log(`File ${avatarPageName}.md does not exist`);
			return false;
		}
		const file = existingFile as TFile;

		const content = await app.vault.read(file);
		let reference: number | null = null;
		let reference2: number | null = null;
		let reference3: number | null = null;
		let reference4: number | null = null;
		let end: number | null = null;
		let start: number | null = null;
		let end2: number | null = null;
		let start2: number | null = null;
		let end3: number | null = null;
		let start3: number | null = null;
		let end4: number | null = null;
		let start4: number | null = null;

		const lines = content.split("\n");
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i].trim();
			if (line === "^levelAndPoints") {
				if (reference === null) {
					reference = i;
				}
			}
			if (line === "^dailyNotesChallenge") {
				if (reference2 === null) {
					reference2 = i;
				}
			}
			if (line === "^weeklyNotesChallenge") {
				if (reference3 === null) {
					reference3 = i;
				}
			}
			if (line === "^boosterFactor") {
				if (reference4 === null) {
					reference4 = i;
				}
			}
		}
		// read current Points from settings
		const newPoints = this.getSettingNumber('statusPoints')

		const level = getLevelForPoints(newPoints);
		let nextLevelAt = this.getSettingNumber('xpForNextLevel');
		let receiveBadge = false
		if (this.getSettingNumber('statusLevel') < level.level){
			// Level Up archived
			new Notice(`With ${newPoints} points, the current level is ${level.level}.`,5000)
			// check first if this means a new badge before it gets overwritten
			receiveBadge = checkIfReceiveABadge(this.getSettingNumber('statusLevel'), level.level)
			this.setSettingNumber('statusLevel', level.level);
			nextLevelAt = level.pointsNext;
			this.setSettingNumber('xpForNextLevel', level.pointsNext);
			//await this.saveData(this.settings)
		}

		const progressBarEnd = nextLevelAt - newPoints;
		const newPointsString = '| **Level**  | **' + level.level + '** |\n| Points | ' + newPoints + '    |\n^levelAndPoints\n```chart\ntype: bar\nlabels: [Expririence]\nseries:\n  - title: points reached\n    data: [' + newPoints + ']\n  - title: points to earn to level up\n    data: [' + progressBarEnd + ']\nxMin: ' + level.points + '\nxMax: ' + level.pointsNext + '\ntension: 0.2\nwidth: 40%\nlabelColors: false\nfill: false\nbeginAtZero: false\nbestFit: false\nbestFitTitle: undefined\nbestFitNumber: 0\nstacked: true\nindexAxis: y\nxTitle: "progress"\nlegend: false\n```'
		const dailyChallenge = '| **daily Notes** | *' + pointsForDailyChallenge * (this.getSettingNumber('badgeBoosterFactor') + this.getSettingNumber('streakbooster')) + 'EP* | **' + this.getSettingNumber('dailyNoteCreationTask') + '/2**   |';
		const daysLeftInWeeklyChain : number = 7 - this.getSettingNumber('weeklyNoteCreationTask');
		const weeklyChallenge = '| **weekly Notes** | *' + pointsForWeeklyChallenge * (this.getSettingNumber('badgeBoosterFactor') + this.getSettingNumber('streakbooster')) + 'EP*     |  **' + this.getSettingNumber('weeklyNoteCreationTask') + '/7**   |\n^weeklyNotesChallenge\n```chart\ntype: bar\nlabels: [days done in a row]\nseries:\n  - title: days to do in a row\n    data: [' + this.getSettingNumber('weeklyNoteCreationTask') + ']\n  - title: points to earn to level up\n    data: [' + daysLeftInWeeklyChain + ']\nxMin: 0\nxMax: 7\ntension: 0.2\nwidth: 40%\nlabelColors: false\nfill: false\nbeginAtZero: false\nbestFit: false\nbestFitTitle: undefined\nbestFitNumber: 0\nstacked: true\nindexAxis: y\nxTitle: "progress"\nlegend: false\n```';
		const boosterFactor = '| **booster factor** | **' + this.getSettingNumber('streakbooster') + '** |'

		if (reference != null && reference2 != null && reference3 != null && reference4 != null){
			start = reference - 2;
			end = reference + 24;
			start2 = reference2 - 1 - 25; // no idea why offset 25 is needed
			end2 = reference2 - 25; // no idea why offset 25 is needed
			start3 = reference3 - 1 -25; // no idea why offset 25 is needed
			end3 = reference3 + 24 -25; // no idea why offset 25 is needed
			start4 = reference4 - 1 - 25; // no idea why offset 25 is needed
			end4 = reference4 - 25 ; // no idea why offset 25 is needed

			const newLines = [...lines.slice(0, start), newPointsString, ...lines.slice(end)];
			const newLines2 = [...newLines.slice(0, start2), dailyChallenge, ...newLines.slice(end2)];
			const newLines3 = [...newLines2.slice(0, start3), weeklyChallenge, ...newLines2.slice(end3)];
			const newLines4 = [...newLines3.slice(0, start4), boosterFactor, ...newLines3.slice(end4)];
			await app.vault.modify(file, newLines4.join("\n"));
		}
		return receiveBadge
	}


	async giveBadgeInProfile(avatarPageName: string, badge: Badge){
		const existingFile = app.vault.getAbstractFileByPath(`${avatarPageName}.md`);
		if (existingFile == null) {
			console.log(`File ${avatarPageName}.md does not exist`);
			return;
		}
		const file = existingFile as TFile;

		const content = await app.vault.read(file);
		let reference: number | null = null;
		let reference2: number | null = null;
		let end: number | null = null;
		let start: number | null = null;
		let end2: number | null = null;
		let start2: number | null = null;

		const lines = content.split("\n");
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i].trim();
			if (line === "#### achieved") {
				if (reference === null) {
					reference = i;
				}
			}
			if (line === badge.level + ": *" + badge.name + "*"){
				if (reference2 === null) {
					reference2 = i;
				}
			}
		}
		if (reference != null && reference2 != null){
			end = reference + 1;
			start = reference + 1;

			end2 = reference2 + 2;
			start2 = reference2 + 1;

			const badgeString = "**" + badge.name + "** " + badge.level + "\n> " + badge.description + " - *" + window.moment().format('D.M.YY') + "*\n"
			const newLines = [...lines.slice(0, start), badgeString, ...lines.slice(end)];
			const newLines2 = [...newLines.slice(0, start2), ...newLines.slice(end2)]
			await app.vault.modify(file, newLines2.join("\n"));
			console.log(`badgeString: ${badgeString}`)
		}
	}


	async giveInitBadgeInProfile(avatarPageName: string, badge: Badge){
		const existingFile = app.vault.getAbstractFileByPath(`${avatarPageName}.md`);
		if (existingFile == null) {
			console.log(`File ${avatarPageName}.md does not exist`);
			return;
		}
		const file = existingFile as TFile;

		const content = await app.vault.read(file);
		let reference: number | null = null;
		let end: number | null = null;
		let start: number | null = null;

		const lines = content.split("\n");
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i].trim();
			if (line === "#### achieved") {
				if (reference === null) {
					reference = i;
				}
			}
		}
		if (reference != null ){
			end = reference + 2;
			start = reference + 1;

			const badgeString = "**" + badge.name + "**\n> " + badge.description + " - *" + window.moment().format('D.M.YY') + "*\n"
			const newLines = [...lines.slice(0, start), badgeString, ...lines.slice(end)];
			await app.vault.modify(file, newLines.join("\n"));
			console.log(`badgeString: ${badgeString}`)
		}
	}


	async removeBadgesWhenInitLevelHigher(avatarPageName: string, level: number){
		const existingFile = app.vault.getAbstractFileByPath(`${avatarPageName}.md`);
		if (existingFile == null) {
			console.log(`File ${avatarPageName}.md does not exist`);
			return;
		}
		const file = existingFile as TFile;

		const content = await app.vault.read(file);
		let reference: number | null = null;
		let reference2: number | null = null;

		const lines = content.split("\n");
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i].trim();
			if (line === "#### outstanding") {
				if (reference === null) {
					reference = i;
				}
			}
			if (reference != null && reference2 == null){
				// Regular expression to match the level number
				const levelRegex = /level (\d+)/;
				// Extract the level number using the regular expression
				const match = line.match(levelRegex);

				if(match){
					const levelNumber = parseInt(match[1], 10); // Convert the matched number to an integer
					if (levelNumber > level) {
						reference2 = i
					}
				}
			}
		}
		if (reference != null && reference2 != null){
			const newLines = [...lines.slice(0, reference + 1), ...lines.slice(reference2)];
			await app.vault.modify(file, newLines.join("\n"));
		}
	}


	async createChart(vault: Vault): Promise<string>{
		const files = vault.getMarkdownFiles();
		const earliestFile = findEarliestModifiedFile(files)
		const earliestDate = earliestFile.stat.mtime

		let monthCounter = 0 //format(new Date(earliestDate), 'MM');
		let dateCount = new Date(earliestDate); // um es hochzählen zu können
		const fileDateMonthMapMod = new Map<string, number>();
		const monthcount = monthsBetween(new Date(earliestDate), new Date())
		let dateString = dateCount.getMonth()+1 + "." + dateCount.getFullYear()
		let yLabel = ""

		monthCounter = 0
		dateCount = new Date(earliestDate); // um es hochzählen zu können
		dateString = dateCount.getMonth()+1 + "." + dateCount.getFullYear()
		// create Base for counting modified
		while (monthCounter < monthcount){
			dateString = dateCount.getMonth()+1 + "." + dateCount.getFullYear()
			yLabel = yLabel + dateString + ", "
			dateCount.setMonth(dateCount.getMonth() + 1)
			monthCounter += 1;
			fileDateMonthMapMod.set(dateString, 0)
		}
		yLabel = yLabel.slice(0,yLabel.length-2)

		// count how many mod files in each month
		const modificationDates = getModificationDates(files)
		for (let i = 0; i < modificationDates.length; i++){
			//fileDateMonthMapMod.set(format(modificationDates[i], 'M.yyyy'),fileDateMonthMapMod.get(format(modificationDates[i], 'M.yyyy'))+1)
			const formattedDate = format(modificationDates[i], 'M.yyyy');
			const currentCount = fileDateMonthMapMod.get(formattedDate);

			if (currentCount !== undefined) {
				fileDateMonthMapMod.set(formattedDate, currentCount + 1);
			} else {
				// If the key doesn't exist in the map, initialize it with a count of 1
				fileDateMonthMapMod.set(formattedDate, 1);
			}
		}

		let charStringModified = ""
		for (const [value] of fileDateMonthMapMod) {
			//console.log(`key: ${key}, value: ${value}`);
			charStringModified = charStringModified + value + ", "
		}
		charStringModified = charStringModified.slice(0,charStringModified.length-2)

		return createChartFormat(yLabel, charStringModified, this.getSettingNumber('chartReduzierungMonate'))
	}

	async decisionIfBadge(newLevel: Promise<boolean>){
		newLevel.then((result: boolean)=> {
			if(result){
				const badge : Badge = getBadgeForLevel(this.getSettingNumber('statusLevel'), false)
				new Notice(`You've earned the "${badge.name}" badge. ${badge.description}`,5000)
				console.log(`You've earned the "${badge.name}" badge. ${badge.description}`)
				this.giveBadgeInProfile(this.getSettingString('avatarPageName'), badge)
				this.setSettingBoolean('badgeBoosterState', false);
				this.setSettingNumber('badgeBoosterFactor', 1);
				//this.saveData(this.settings)
			}
		});
	}


	async removeKeysFromFrontmatter() {
		const { vault } = this.app
		const fileCountMap = await getFileCountMap(this.app, this.getSettingString('tagsExclude'), this.getSettingString('folderExclude'));
		for (const fileName of fileCountMap.keys()) {
			const files = vault.getFiles();
			const file = files.find(file => file.basename === fileName);
			if (!file) {
				console.warn(`File ${fileName} not found.`);
				continue;
			}
			console.log(`Processing file ${fileName}`);
			try {
				await this.app.fileManager.processFrontMatter(file, (frontmatter) => {
					delete frontmatter['title-class']
					delete frontmatter['note-length-class']
					delete frontmatter['inlink-class']
					delete frontmatter['outlink-class']
					delete frontmatter['progressive-summarization-maturity']
					delete frontmatter['note-maturity']
				});
			} catch (e) {
				if (e?.name === 'YAMLParseError') {
					const errorMessage = `Update majuritys failed Malformed frontamtter ${e.message}`;
					new Notice(errorMessage, 4000);
					console.error(errorMessage);
				}
			}
		}
	}


	async whichLevelNextBadge(currentLevel: number): Promise<number>{
		let nextBadgeLevel = 0
		for (let i = currentLevel; i < 110; i++){
			const badge : Badge = getBadgeForLevel(i, true)
			// Regular expression to match the level number
			const levelRegex = /level (\d+)/;
			// Extract the level number using the regular expression
			const match = badge.level.match(levelRegex);
			if(match){
				const levelNumber = parseInt(match[1], 10); // Convert the matched number to an integer
				if (levelNumber > currentLevel && nextBadgeLevel == 0 ) {
					nextBadgeLevel = levelNumber;
				}
			}
		}
		return nextBadgeLevel
	}


	async boosterForInit(): Promise<number> {
		const nextBadgeAt = await this.whichLevelNextBadge(this.getSettingNumber('statusLevel'))
		const statusPointsToReach = statusPointsForLevel(nextBadgeAt)
		//console.log(`statusPointsToReach for next Badge: ${statusPointsToReach}`)
		// 50 Notes from Level 1 to 5 to get the first badge.
		// 300 Points in average for a Note.
		const boosterFactor = Math.round((statusPointsToReach - this.getSettingNumber('statusPoints'))/50/300);
		this.setSettingNumber('badgeBoosterFactor', boosterFactor)
		this.setSettingBoolean('badgeBoosterState', true)
		//await this.saveData(this.settings)
		//console.log(`boosterFaktor: ${boosterFactor}`)
		return boosterFactor
	}


	async openAvatarFile() {
		const existingFile = app.vault.getAbstractFileByPath(`${this.getSettingString('avatarPageName')}.md`);
		if (existingFile){
			const sourcePath = this.app.workspace.getActiveFile()?.path || '';
			await app.workspace.openLinkText(existingFile.path, sourcePath);
		} else {
			console.log("File not found or unable to open.");
		}
	}


	getRandomInt(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	  }

	async acquireIngredients() {
		let earnedIngredientToShow = [];
		if (Math.random() < chanceToEarnIngredient) {
			const randomAmount = this.getRandomInt(1,3);
			for (let i=1;i<=randomAmount;i++){
				const randomIngredientIndex = this.getRandomInt(0, listOfUseableIngredientsToBeShown.length-1);
				const earnedIngredient = elements[randomIngredientIndex];
				let elementCount = this.getSettingNumber(earnedIngredient.varName);
				earnedIngredientToShow.push(earnedIngredient.name);

				// Perform a null check
				if (elementCount !== null && typeof elementCount === 'number') {
					this.setSettingNumber(earnedIngredient.varName, elementCount + 1);
					this.saveSettings();
					
				} else {
					console.error(`Invalid element count for ${earnedIngredient.varName}`);
				}
			}
			console.log(`You earned: ${concatenateStrings(earnedIngredientToShow)}`);
			new Notice(`You earned ${concatenateStrings(earnedIngredientToShow)}`,3000)
		} else {
			console.log('You did not earn an ingredient this time.');
		}
		
	}
	
	
}





// Example usage
//const originalData = '2023-08-15 20:00:00';
//const encryptedData = encryptString(originalData);

// Save `encryptedData` in your settings

// Later, when you retrieve the data
//const decryptedData = decryptSrting(encryptedData);

// Use `decryptedData` in your plugin


function concatenateStrings(arr: string[]): string {
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


function getBoosterRunTimeFromVarName(boosterVarName: string) {
	for (const element of boosterRecipes) {
		if (element.varname === boosterVarName) {
			return element.boosterRunTime as number;
		}
	}
	return 0; // Return null if no matching element is found
}


function isSameDay(inputDate: Moment): boolean {
	const currentDate = window.moment(); // Get the current date
	return currentDate.isSame(inputDate, 'day'); // Check if they are the same day
}


function isOneDayBefore(inputDate: Moment): boolean {
	const oneDayBeforeCurrent = window.moment().subtract(1, 'day'); // Calculate one day before current date
	return inputDate.isSame(oneDayBeforeCurrent, 'day');
}


export function isMinutesPassed(inputDate: Moment, minutesPassed: number): boolean {
    const minutesAgo = window.moment().subtract(minutesPassed, 'minutes'); // Calculate time 'minutesPassed' minutes ago
    return inputDate.isSameOrBefore(minutesAgo);
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


async function createAvatarFile(app: App, fileName: string): Promise<void> {

	const existingFile = app.vault.getAbstractFileByPath(`${fileName}.md`);
	if (existingFile instanceof TFile) {
		console.log(`File ${fileName}.md already exists`);
		return;
	}
	// Create the file in the root of the vault
	await app.vault.create(`${fileName}.md`, avatarInitContent);

}


async function replaceFormatStrings(layer2: string, layer3: string) {
	const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);

	if (!activeView) {
		console.error("No active Markdown view found.");
		return;
	}

	const editor = activeView.editor;
	const selectedText = editor.getSelection();

	if (!selectedText) {
		console.error("No text selected (for progressive summarization switch Layer 2 & 3).");
		return;
	}

	let replacedText = selectedText.replaceAll(layer2, "§§§§");
	replacedText = replacedText.replaceAll(layer3, "€€€€")
	replacedText = replacedText.replaceAll("€€€€", layer2)
	replacedText = replacedText.replaceAll("§§§§", layer3)

	editor.replaceSelection(replacedText);
}

function rateDirectionForStatusPoints(ratingCurrent: string, ratingNew: number): number {
	let ratingFaktor: number
	if (parseInt(ratingCurrent, 10) < ratingNew){
		ratingFaktor = ratingNew - parseInt(ratingCurrent, 10)
	} else {
		ratingFaktor = 0
	}

	return ratingFaktor
}



  
  




