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
import {MarkdownView, Notice, Plugin, TFile, requireApiVersion} from 'obsidian';
import {GamificationPluginSettings, ISettings} from './settings';
import format from 'date-fns/format';
import {
	chanceToEarnIngredient,
	debugLogs,
	PLUGIN_VERSION,
	pointsMajurity,
	pointsNoteMajurity,
	pointsForDailyChallenge,
	pointsForWeeklyChallenge,
	streakboosterDecrease,
	streakboosterIncreaseDaily,
	streakboosterIncreaseWeekly,
	mil2sec, milliseconds, seconds, minutesTimer
} from './constants'
import {Badge, getBadge, getBadgeForInitLevel, getBadgeForLevel} from './badges'
import {getLevelForPoints, statusPointsForLevel} from './levels'
// import type {Moment} from 'moment';
import { getRandomMessageWeeklyChallenge, getRandomMessageTwoNoteChallenge , getRandomMessagePoints, getRandomMessageBoosterFactor } from './randomNotificationText'
import { ModalInformationbox } from 'ModalInformationbox';
import { ModalBooster } from 'ModalBooster';
import { GamifiedPkmProfileView, VIEW_TYPE_GAMIFICATION_PROFILE } from "./view";
import {
	checkGamifiedPkmVersion,
	getBoosterRunTimeFromVarName,
	isMinutesPassed,
	isOneDayBefore,
	isSameDay,
	isVersionNewerThanOther,
	parseBadgeCSV2Dict,
	rateDirectionForStatusPoints
} from './Utils'
import {ReleaseNotes} from "./ReleaseNotes";
import {renderCodeBlockProcessor} from "./avatar/renderCodeBlockProcessor";
// @ts-ignore
import AvatarView from "./avatar/AvatarView.svelte";
import {withCodeblockState} from "./avatar/stateProviders";
import { GamificationMediatorImpl } from './GamificationMediatorImpl';
import { MaturityCalculator } from './maturitycalculation'

let pointsToReceived = 0;

export default class gamification extends Plugin {
	private timerInterval: number;
	private timerId: number | null;
	private statusBarItem = this.addStatusBarItem();
	private statusbarGamification = this.statusBarItem.createEl("span", { text: "" });
	public settings: ISettings;
	private lastEditTimes: Record<string, number> = {};
	private editTimers: Record<string, ReturnType<typeof setTimeout>> = {};
	mediator: GamificationMediatorImpl;
	private maturityCalculator: MaturityCalculator;
	private isProfileViewOpen = false;


	async onload() {
		console.log('obsidian-pkm-gamification loaded!');

		this.mediator = new GamificationMediatorImpl(this.settings, this);
		this.maturityCalculator = new MaturityCalculator(this.app);

		this.addSettingTab(new GamificationPluginSettings(this.app, this, this.mediator));

		await this.mediator.loadSettings();

		if(this.mediator.getSettingBoolean('showNewVersionNotification')) {
			await checkGamifiedPkmVersion(this.app);
		}


		const delayLoadTime = this.mediator.getSettingNumber('delayLoadTime') * 1000;

		setTimeout(() => {
			// Use onLayoutReady to ensure the workspace is ready
			this.app.workspace.onLayoutReady(() => {
				this.mediator.loadSettings();
				this.initializeAfterLayoutReady();
			});
		}, 1000 + delayLoadTime);


		// to set timer for reset daily and weekly goals
		this.timerInterval = minutesTimer * seconds * milliseconds; // minutes x seconds x milliseconds
		this.timerId = window.setInterval(this.resetDailyGoals.bind(this), this.timerInterval);

		this.registerEvent(
			this.app.workspace.on('editor-change', this.onEditorChanged.bind(this))
		);

		this.registerEvent(
			this.app.vault.on('rename', this.onFileRenamed.bind(this))
		);

		this.registerView(
			VIEW_TYPE_GAMIFICATION_PROFILE,
			(leaf) => new GamifiedPkmProfileView(leaf, this.mediator)
		);



		// This portion of code is adapted from the following source under the MIT License:
		// https://github.com/zsviczian/obsidian-excalidraw-plugin
		// Copyright (c) [2024], [zsviczian]
		// License: MIT
		let obsidianJustInstalled = false;

		if (this.mediator.getSettingBoolean('showReleaseNotes')) {
			if(debugLogs) console.log(`show release note`)
			if(debugLogs) console.log(`current entry ${this.mediator.getSettingString('previousRelease')}`)
			//I am repurposing imageElementNotice, if the value is true, this means the plugin was just newly installed to Obsidian.
			obsidianJustInstalled = this.mediator.getSettingString('previousRelease')  === "0.0.0";

			if (isVersionNewerThanOther(PLUGIN_VERSION, this.mediator.getSettingString('previousRelease'))) {
				if(debugLogs) console.log(`${PLUGIN_VERSION} newer than ${this.mediator.getSettingString('previousRelease')}`)
				new ReleaseNotes(
					this.app,
					this.mediator,
					obsidianJustInstalled ? "0.0.0" : PLUGIN_VERSION,
				).open();
			}
		}
		// import ends here

		// This portion of code is adapted from the following source under the MIT License:
		// https://github.com/froehlichA/obsidian-avatar
		// Copyright (c) [2024], [froehlichA]
		// License: MIT
		this.registerMarkdownCodeBlockProcessor("gamification-avatar", renderCodeBlockProcessor(
			AvatarView,
			{ app: this.app, plugin: this },
			withCodeblockState()
		));
		// import ends here

		if (this.mediator.getSettingBoolean('showProfileLeaf')) {
			await this.openProfileView();
		}

		this.registerCommands();

	}


	private registerCommands(){


		if (this.mediator.getSettingBoolean('debug')){
			this.addRibbonIcon("accessibility", "Crafting", async () => {
				console.log('Debug Help Function accessibility is called')
				//this.mediator.acquireIngredients(1,400,500);
				//this.resetDailyGoals();
				//this.mediator.setSettingString('weeklyNoteCreationDate', window.moment().subtract(1, 'day').format('DD.MM.YYYY'))
				//this.mediator.setSettingString('weeklyNoteCreationDate', window.moment().subtract(1, 'day').format('DD.MM.YYYY'))
				//this.mediator.setSettingString('weeklyNoteCreationDate', window.moment().format('DD.MM.YYYY'))
				//this.mediator.setSettingString('weeklyNoteCreationDate', window.moment().format('DD.MM.YYYY'))
				//await this.saveSettings();

				//new ModalBooster(this.app, ` `, this).open();

				//this.updateAvatarPage(this.mediator.getSettingString('avatarPageName'))


				// Example CSV string
				//const csvString = "Brainiac Trailblazer,2023-09-07,20\nSavvy Scholar,2023-08-15,15\nScribe of the Ancients,2023-07-1,10";

				// Parse the CSV string
				//const badgeDict = parseBadgeCSV(csvString);
				//const badgeDict = parseBadgeCSV2Dict(this.mediator.getSettingString('receivedBadges'))
				//console.log(`badgeDict: ${badgeDict}`)

				// Access badge information
				//console.log(badgeDict["Brainiac Trailblazer"]);

				/*
				for (const badgeName in badgeDict) {
					if (badgeDict.hasOwnProperty(badgeName)) {
						const badgeInfo = badgeDict[badgeName];
						const badgeDetails = getBadgeDetails(badgeName)
						console.log(`Badge: ${badgeName}, Date: ${badgeInfo.date}, Level: ${badgeInfo.level}, Description: ${badgeDetails.name}`);
					}
				}

				 */

				//await this.checkForContinuouslyNoteCreation(180)

				//const obsidianJustInstalled = this.settings.previousRelease === "0.0.0"

				/*new ReleaseNotes(
					this.app,
					this.mediator,
					//obsidianJustInstalled ? null :
					PLUGIN_VERSION
				).open();*/

				//await this.giveStatusPoints(10000,'')
				//await this.actualizeProfileLeave();
				//console.log(`receivedBadges: ${this.mediator.getSettingString('receivedBadges')}`)
				//console.log(parseBadgeCSV2Dict(this.mediator.getSettingString('receivedBadges')))



				//await this.decreaseStreakbooster(50);
				//await this.increaseStreakbooster(0.8);

				//this.setBadgeSave(getBadgeDetails('Brainiac Trailblazer'),'23-09-07', 'level 20');
				//this.setBadgeSave(getBadgeDetails('Savvy Scholar'), '23-08-15', 'level 15');

				//this.mediator.updateProfileLeaf();
				await this.actualizeProfileLeaf();

			});

			this.addRibbonIcon("chevrons-right", "boost", async () => {
				//this.mediator.setSettingNumber('streakbooster',80)
				//await this.writeBadgeCSV(getBadgeDetails('Cerebral Maestro'), '24-01-03', 'level 21')

			});

			this.addRibbonIcon("chevrons-right", "update overview leaf", () => {
				this.actualizeProfileLeaf().then(() => {if(debugLogs) console.log('Profile updated successfully')});
			});

			this.addRibbonIcon("target", "gamification side overview", () => {
				this.activateView().then(() => {if(debugLogs) console.log('Profile view activated')});
			});

		}

		/*this.addCommand({ id: 'overview', name: 'open gamification side overview', callback: async () => {
				this.activateView();
			},
		});*/
		this.addCommand({
			id: 'open-gamification-profile-view',
			name: 'Open Profile Leaf',
			callback: () => this.openProfileView(),
		});

		this.addCommand({
			id: 'close-gamification-profile-view',
			name: 'Close Profile Leaf',
			callback: () => this.closeProfileView(),
		});

		if(this.mediator.getSettingNumber('counterMajurityCalcInitial') >= 50){
			this.addRibbonIcon("test-tube-2", "Boosters", async () => {
				//const file: TFile | null = this.app.workspace.getActiveFile();
				new ModalBooster(this.app, ` `, this.mediator).open();
			});

			this.addCommand({
				id: 'booster',
				name: 'Open booster pallete',
				callback: async () => {
					new ModalBooster(this.app, ` `, this.mediator).open();
				},
			});
		}

		this.addRibbonIcon("sprout", "Calculate note maturity", async () => {
			//const file: TFile | null = this.app.workspace.getActiveFile();
			await this.calculateNoteMajurity();
		});


		if (this.mediator.getSettingBoolean('enableInitCommand')){
			// command Initialize gamification ratings
			this.addCommand({
				id: 'init-rate-gamification',
				name: 'Initialize gamification ratings',
				callback: async () => {
					await this.initializeGame(this.statusbarGamification);
				},
			});
		}


		if (this.mediator.getSettingBoolean('enableInitCommand')) {
			// command: reset game
			this.addCommand({
				id: 'reset-game',
				name: 'Reset game',
				callback: async () => {
					await this.resetGame();
				},

			});
		}


		// command: rate note maturity
		this.addCommand({
			id: 'rate-note-maturity',
			name: 'Rate note majurity',
			checkCallback: (checking: boolean) => {
				const view = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (view) {
					if (!checking) {
						this.calculateNoteMajurity().then(() => {if(debugLogs) console.log('Note Maturity calculated')});
					}
					return true;
				}
				return false;
			}
		});


		// command: change progressive summarization symbols
		this.addCommand({
			id: 'change-progressive-formatting',
			name: 'Toggle progressive summarization formatting',
			checkCallback: (checking: boolean) => {
				const view = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (view) {
					if (!checking) {
						replaceFormatStrings(this.mediator.getSettingString('progressiveSumLayer2'),
							this.mediator.getSettingString('progressiveSumLayer3')).then(() =>
						{if(debugLogs) console.log('Format Strings replaced for prog. sum.')});
					}
					return true;
				}
				return false;
			}
		});
	}

	async onEditorChanged() {
		const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (!activeView) return;

		const activeFile = activeView.file;
		if (!activeFile) return;

		//this.mediator.getSettingString('folderExclude')
		const foldersToExclude = this.mediator.getSettingString('folderExclude');
		const folderNames = foldersToExclude.split(',').map(folder => folder.trim());

		const isInExcludedFolder = folderNames.some(folderName => activeFile.path.includes(folderName));

		if (isInExcludedFolder) return;

		const currentTime = Date.now();

		const fileLastModifiedTime = activeFile.stat.mtime || 0;

		// Check if the file was recently modified by comparing the last modification time
		if (currentTime - fileLastModifiedTime < 900) {
			return;
		}

		// Update last edit time for the file
		this.lastEditTimes[activeFile.path] = currentTime;

		// Clear previous timer if exists
		if (this.editTimers[activeFile.path]) {
			clearTimeout(this.editTimers[activeFile.path]);
		}

		this.editTimers[activeFile.path] = setTimeout(() => {
			// Check if no further edits happened within the delay
			if (this.lastEditTimes[activeFile.path] === currentTime) {
				// Trigger your action here
				this.triggerAction();
			}
		}, this.mediator.getSettingNumber('autoRateOnChangeDelayTime') * mil2sec);
	}


	onFileRenamed(newPath: string) {
		if(debugLogs) console.log(`${newPath}`);
		const foldersToExclude = this.mediator.getSettingString('folderExclude');
		if(debugLogs) console.log(`foldersToExclude: ${foldersToExclude}`);
		const folderNames = foldersToExclude.split(',').map(folder => folder.trim() + '/');

		const isInExcludedFolder = folderNames.some(folderName => newPath.includes(folderName));

		if (isInExcludedFolder) {
			if(debugLogs) console.log(isInExcludedFolder);
			return;
		}

		this.triggerAction();
	}


	triggerAction() {
		if(this.mediator.getSettingBoolean('autoRateOnChange')){
			this.calculateNoteMajurity().then(r => console.log(r));
			//if(debugLogs) console.log(`File ${filePath} was edited and no further changes occurred.`);
		}
	}


	initializeAfterLayoutReady() {
		try {
			this.resetDailyGoals().then(() => {if(debugLogs) console.log('Daily Goals resetted')});
			this.updateStatusBar(this.statusbarGamification).then(() =>
				{if(debugLogs) console.log('Daily Goal status bar resettet')});
			this.mediator.updateProfileLeaf();
		} catch (error) {
			console.error('Error during post-layout initialization:', error);
		}
	}


	async actualizeProfileLeaf(){
		const showProfileLeaf = this.mediator.getSettingBoolean('showProfileLeaf');
		if (!showProfileLeaf) {
			return;
		}
		const newPoints = this.mediator.getSettingNumber('statusPoints')
		const level = getLevelForPoints(newPoints);
		await this.profileLeafUpdateLevel(this.mediator.getSettingNumber('statusLevel'),this.mediator.getSettingNumber('statusPoints'),this.mediator.getSettingNumber('xpForNextLevel'),level.points,level.pointsNext)
		await this.profileLeafUpdateBoosterFactor(this.mediator.getSettingNumber('streakbooster'))
		await this.profileLeafUpdateDailyNotes(pointsForDailyChallenge * (this.mediator.getSettingNumber('badgeBoosterFactor') + this.mediator.getSettingNumber('streakbooster')) + 'EP | ' + this.mediator.getSettingNumber('dailyNoteCreationTask') + '/2')
		await this.profileLeafUpdateWeeklyNotes(pointsForWeeklyChallenge * (this.mediator.getSettingNumber('badgeBoosterFactor') + this.mediator.getSettingNumber('streakbooster')) + 'EP | ' + this.mediator.getSettingNumber('weeklyNoteCreationTask') + '/7')
		await this.profileLeafUpdateWeeklyChart(this.mediator.getSettingNumber('weeklyNoteCreationTask'));
		await this.updateChartWeeklyColorReceived(this.mediator.getSettingString('colorBarReceived'));
		await this.updateChartWeeklyColorToGo(this.mediator.getSettingString('colorBarToGo'));
		await this.profileLeafUpdateMajurityList()
	}


	async getLeafAndView() {
		const showProfileLeaf = this.mediator.getSettingBoolean('showProfileLeaf');
		if (!showProfileLeaf) {
			return { leaf: null, view: null };
		}

		const { workspace } = this.app;
		let leaf = null;
		const leaves = this.app.workspace.getLeavesOfType(VIEW_TYPE_GAMIFICATION_PROFILE);

		if (leaves.length > 0) {
			leaf = leaves[0];
		} else {
			leaf = workspace.getRightLeaf(false);
			// @ts-ignore
			await leaf.setViewState({ type: VIEW_TYPE_GAMIFICATION_PROFILE, active: true });
		}

		// @ts-ignore
		return leaf.view;
	}


	async activateView() {
		const view = await this.getLeafAndView();

		if (view instanceof GamifiedPkmProfileView) {
			await this.actualizeProfileLeaf();
		}

		// Optional: reveal the leaf if it's in a collapsed sidebar
		// workspace.revealLeaf(leaf);
	}

	async profileLeafUpdateLevel(newLevel:number, newPoints:number, nextLevel:number, min:number, max:number) {
		const view = await this.getLeafAndView();

		if (view instanceof GamifiedPkmProfileView) {
			view.updateLevel(newLevel)
			view.updatePoints(newPoints)
			view.updateChartMinMax(newPoints, nextLevel, min, max)
		}else {
			console.log('gamified-pkm-profile is not loaded yet.');
		}
	}

	async updateChartWeeklyColorReceived(value: string) {
		const view = await this.getLeafAndView();

		if (view instanceof GamifiedPkmProfileView) {
			view.updateChartWeeklyColorReceived(value)
		}else {
			console.log('gamified-pkm-profile is not loaded yet.');
		}
	}

	async updateChartWeeklyColorToGo(value: string) {
		const view = await this.getLeafAndView();

		if (view instanceof GamifiedPkmProfileView) {
			view.updateChartWeeklyColorToGo(value)
		}else {
			console.log('gamified-pkm-profile is not loaded yet.');
		}
	}

	async profileLeafUpdatePicture() {
		const view = await this.getLeafAndView();

		if (view instanceof GamifiedPkmProfileView) {
			view.updateProfilePicture()
		}else {
			console.log('gamified-pkm-profile is not loaded yet.');
		}
	}

	async profileLeafUpdatePoints(newPoints:number, nextLevel: number) {
		const view = await this.getLeafAndView();

		if (view instanceof GamifiedPkmProfileView) {
			view.updatePoints(newPoints)
			view.updateChart(newPoints,nextLevel-newPoints)
		}else {
			if(debugLogs) console.log('gamified-pkm-profile is not loaded yet.');
		}
	}

	async profileLeafUpdateBoosterFactor(newFactor:number) {
		const view = await this.getLeafAndView();

		if (view instanceof GamifiedPkmProfileView) {
			view.updateBoosterFactor(newFactor)
		}else {
			if(debugLogs) console.log('gamified-pkm-profile is not loaded yet.');
		}
	}

	async profileLeafUpdateDailyNotes(dailyString:string) {
		const view = await this.getLeafAndView();

		if (view instanceof GamifiedPkmProfileView) {
			view.updateDailyNotes(dailyString)
		}else {
			if(debugLogs) console.log('gamified-pkm-profile is not loaded yet.');
		}
	}

	async profileLeafUpdateWeeklyNotes(weeklyString:string) {
		const view = await this.getLeafAndView();

		if (view instanceof GamifiedPkmProfileView) {
			view.updateWeeklyNotes(weeklyString)
		}else {
			if(debugLogs) console.log('gamified-pkm-profile is not loaded yet.');
		}
	}

	async profileLeafUpdateWeeklyChart(days:number) {
		const view = await this.getLeafAndView();

		if (view instanceof GamifiedPkmProfileView) {
			view.updateChartWeekly(days)
		}else {
			if(debugLogs) console.log('gamified-pkm-profile is not loaded yet.');
		}
	}

	async profileLeafUpdateMajurityList() {
		const view = await this.getLeafAndView();

		if (view instanceof GamifiedPkmProfileView) {
			view.updateMaturityCounts();
		} else {
			if (debugLogs) console.log('gamified-pkm-profile is not loaded yet.');
		}
	}



	private async resetGame() {
        await this.removeKeysFromFrontmatter();
        this.mediator.setSettingNumber('statusLevel', 1);
        this.mediator.setSettingNumber('statusPoints', 0);
        this.mediator.setSettingNumber('xpForNextLevel', 1000);
        this.mediator.setSettingBoolean('badgeBoosterState', false);
        this.mediator.setSettingNumber('badgeBoosterFactor', 1);
        await this.giveStatusPoints(0,'');
        await this.updateStatusBar(this.statusbarGamification);
        this.mediator.updateProfileLeaf();
		new ModalInformationbox(this.app, `Game is now reseted. Please delete the Profile Page: "${this.mediator.getSettingString('avatarPageName')}.md" manually.`).open();
    }


    private async initializeGame(statusbarGamification: HTMLSpanElement) {
		this.mediator.setSettingString('gamificationStartDate', format(new Date(), 'yyyy-MM-dd'));
		await this.saveSettings();

		const fileCountMap: TFile[] | null = await this.maturityCalculator.getFileMap(this.app, this.mediator.getSettingString('tagsExclude'), this.mediator.getSettingString('folderExclude'));
		if (fileCountMap !== null) {
			if(debugLogs) console.debug(`fileCountMap loaded. Number of files: ${fileCountMap.length}`);

			let pointsReceived = 0; // to have one message at the end how many points received

			for (const fileName of fileCountMap) {
				const file = fileName
				const fileContents = await this.app.vault.read(file);
				const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (activeView && activeView.file && activeView.file.path === file.path) {
					console.warn(`File ${file.path} is currently open. Skipping.`);
					continue;
				}
				//if(debugLogs) console.debug(`fileName.basename: ${fileName.basename}`)
				const fileLength = this.maturityCalculator.countCharactersInActiveFile(fileContents, fileName.basename);
				const rateFileLength = this.maturityCalculator.rateNoteLength(fileLength);
				const {
					charCount,
					highlightedCount,
					boldCount
				} = this.maturityCalculator.countLayer2AndLayer3Characters(fileContents, fileName.basename, this.mediator.getSettingString('progressiveSumLayer2'), this.mediator.getSettingString('progressiveSumLayer3'));
				const rateProgressiveSum: number = this.maturityCalculator.rateProgressiveSummarization(charCount, highlightedCount, boldCount);
				const fileNameRate = this.maturityCalculator.rateLengthFilename(file.name);
				const inlinkNumber = this.maturityCalculator.count_inlinks(file);
				const inlinkClass = this.maturityCalculator.rateInlinks(inlinkNumber)//, fileCountMap.size);
				const rateOut = this.maturityCalculator.rateOutlinks(this.maturityCalculator.getNumberOfOutlinks(file, this.app));
				const noteMajurity = this.maturityCalculator.rateLevelOfMaturity(rateFileLength, fileNameRate, inlinkClass, rateOut, rateProgressiveSum);


				if(debugLogs) console.debug(`Processing file ${fileName.basename} in path ${fileName.path}`);

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
						new Notice(errorMessage, this.mediator.getSettingNumber('timeShowNotice') * mil2sec);
						console.error(errorMessage);
					}
				}
			}
			if (pointsReceived > 0) {
				new Notice(`${pointsReceived} Points received`,this.mediator.getSettingNumber('timeShowNotice') * mil2sec)
				if(debugLogs) console.debug(`${pointsReceived} Points received`)
			}


		// Inside your function where you want to introduce a delay
		setTimeout(async () => {
			// Code that you want to execute after the delay
			const initBadge: Badge = getBadgeForInitLevel(this.mediator.getSettingNumber('statusLevel'));
			new Notice(`You've earned the "${initBadge.name}" badge. ${initBadge.description}`,this.mediator.getSettingNumber('timeShowNotice') * mil2sec * 1.2)
			if(debugLogs) console.log(`You earned ${initBadge.name} - ${initBadge.description}`)
			await this.boosterForInit()
			await this.updateStatusBar(statusbarGamification)
			await this.writeBadgeCSV(initBadge, window.moment().format('YYYY-MM-DD'),'level ' + (this.mediator.getSettingNumber('statusLevel')).toString())
		}, 2000); // 2000 milliseconds = 2 seconds

			new ModalInformationbox(this.app, `Finallized gamification initialistation!\nCongratulation, you earned ${pointsReceived} Points!\n\nCheck the Profile Page: "${this.mediator.getSettingString('avatarPageName')}.md"\n\nYou received an initialisation Booster aktiv for your first level ups. Game on!`).open();
		}
	}


	private writeFrontmatter(frontmatter: any, fileNameRate: number, rateFileLength: number, inlinkClass: number, rateOut: number, rateProgressiveSum: number, noteMajurity: number) {
		frontmatter['title-class'] = this.maturityCalculator.rateDirection(frontmatter['title-class'], fileNameRate)
		frontmatter['note-length-class'] = this.maturityCalculator.rateDirection(frontmatter['note-length-class'], rateFileLength)
		frontmatter['inlink-class'] = this.maturityCalculator.rateDirection(frontmatter['inlink-class'], inlinkClass)
		frontmatter['outlink-class'] = this.maturityCalculator.rateDirection(frontmatter['outlink-class'], rateOut)
		frontmatter['progressive-summarization-maturity'] = this.maturityCalculator.rateDirection(frontmatter['progressive-summarization-maturity'], rateProgressiveSum)
		frontmatter['note-maturity'] = this.maturityCalculator.rateDirection(frontmatter['note-maturity'], noteMajurity)
	}


	onunload() {
		console.log('obsidian-pkm-gamification unloaded!');

		// Clear the timer when the plugin is unloaded
		if (this.timerId !== null) {
			clearInterval(this.timerId);
			this.timerId = null;
		}

		for (const timerId in this.editTimers) {
			clearTimeout(this.editTimers[timerId]);
		}

		this.app.workspace.detachLeavesOfType(VIEW_TYPE_GAMIFICATION_PROFILE);
		this.isProfileViewOpen = false; // Reset the flag when the plugin is unloaded
	}

	async openProfileView() {
		if (this.isProfileViewOpen) {
			return;
		}

		const existingLeaf = this.app.workspace.getLeavesOfType(VIEW_TYPE_GAMIFICATION_PROFILE)[0];

		if (existingLeaf) {
			await this.app.workspace.revealLeaf(existingLeaf);
			if (requireApiVersion("1.7.2")) {
				await existingLeaf.loadIfDeferred();
			}
			if (existingLeaf.view instanceof GamifiedPkmProfileView) {
				this.isProfileViewOpen = true;
				this.mediator.setSettingBoolean('showProfileLeaf', true);
				return;
			}
		}

		let leaf = this.app.workspace.getRightLeaf(false);

		if (!leaf) {
			console.error("Failed to get a right leaf. Cannot open the profile view.");
			return;
		}

		await leaf.setViewState({ type: VIEW_TYPE_GAMIFICATION_PROFILE });

		if (requireApiVersion("1.7.2")) {
			await leaf.loadIfDeferred();
		}

		await this.app.workspace.revealLeaf(leaf);

		if (leaf.view instanceof GamifiedPkmProfileView) {
			this.isProfileViewOpen = true;
			this.mediator.setSettingBoolean('showProfileLeaf', true);
		}
	}


	closeProfileView() {
		this.app.workspace.detachLeavesOfType(VIEW_TYPE_GAMIFICATION_PROFILE);
		this.isProfileViewOpen = false; // Set the flag to indicate the view is closed

		// Set the setting to reflect that the profile leaf is closed
		this.mediator.setSettingBoolean('showProfileLeaf', false);
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
		const fileName = activeView?.file?.basename;
		if (fileName === null || fileName === undefined) {
			console.error("File name is null or undefined. Stopping further processing.");
			return;
		}
		

		let rateFileLength = 0;
		let fileLength = 0;
		let rateProgressiveSum = 0;

		if (fileContents !== undefined) {
			fileLength = this.maturityCalculator.countCharactersInActiveFile(fileContents, fileName);
			rateFileLength = this.maturityCalculator.rateNoteLength(fileLength);

			if (fileContents !== null) {
				const { charCount, highlightedCount, boldCount } = this.maturityCalculator.countLayer2AndLayer3Characters(fileContents, fileName, this.mediator.getSettingString('progressiveSumLayer2'), this.mediator.getSettingString('progressiveSumLayer3'));
				rateProgressiveSum = this.maturityCalculator.rateProgressiveSummarization(charCount, highlightedCount, boldCount);
			}
		}

		let fileNameRate = 0;
		let inlinkNumber = 0;
		let inlinkClass = 0;
		let rateOut = 0;

		if (file !== null) {
			fileNameRate = this.maturityCalculator.rateLengthFilename(file.name ?? '');
			inlinkNumber = this.maturityCalculator.count_inlinks(file);
			inlinkClass = this.maturityCalculator.rateInlinks(inlinkNumber)//, numAllFiles)
			rateOut = this.maturityCalculator.rateOutlinks(this.maturityCalculator.getNumberOfOutlinks(file, this.app));

			const noteMajurity = this.maturityCalculator.rateLevelOfMaturity(rateFileLength, fileNameRate, inlinkClass, rateOut, rateProgressiveSum);
			
			
			
			this.mediator.setSettingNumber('counterMajurityCalc',this.mediator.getSettingNumber('counterMajurityCalc') + 1)
			
			
			try {
				await this.app.fileManager.processFrontMatter(file, (frontmatter) => {
					if (frontmatter) {
						let pointsReceived = 0; // to have one message at the end how many points received
						if (rateDirectionForStatusPoints(frontmatter['note-maturity'], noteMajurity) >= 1){
							if(debugLogs) console.debug(`note-maturity >=1`)
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
							this.mediator.setSettingNumber('counterMajurityCalcInitial',this.mediator.getSettingNumber('counterMajurityCalcInitial') + 1)
							this.mediator.acquireIngredients(chanceToEarnIngredient,1,3);
							if(this.mediator.getSettingNumber('counterMajurityCalcInitial') == 50){
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
						//if(debugLogs) console.debug(`pointsReceived: ${pointsReceived}`)
						if (pointsReceived > 0){
							const messagePoints = getRandomMessagePoints(pointsReceived);
							new Notice(messagePoints,this.mediator.getSettingNumber('timeShowNotice') * mil2sec)
							if(debugLogs) console.debug(messagePoints)
						}

						this.writeFrontmatter(frontmatter, fileNameRate, rateFileLength, inlinkClass, rateOut, rateProgressiveSum, noteMajurity);
					}
				});
			} catch (e) {
				if (e?.name === 'YAMLParseError') {
					const errorMessage = `Update majuritys failed Malformed frontamtter on this file : ${file.path} ${e.message}`;
					new Notice(errorMessage, this.mediator.getSettingNumber('timeShowNotice') * mil2sec);
					console.error(errorMessage);
				}
			}
			new Notice('note majurity updated!');
			if(debugLogs) console.debug('note majurity updated!')
			await this.updateStatusBar(this.statusbarGamification)
			await this.actualizeProfileLeaf();
		} else {
			console.error('file was not found to calculate majurities. Make sure one is active.')
		}
		if (detectIfNoteIsFirstTimeRated){
			await this.increaseDailyCreatedNoteCount();
			await this.increaseWeeklyCreatedNoteCount();
			await this.actualizeProfileLeaf();
		}
	}


	async resetDailyGoals(){
		let reset = false;
		await this.mediator.loadSettings()
		if(!isSameDay(window.moment(this.mediator.getSettingString('dailyNoteCreationDate'), 'DD.MM.YYYY'))){
			this.mediator.setSettingNumber('dailyNoteCreationTask', 0);
			this.mediator.setSettingString('dailyNoteCreationDate', window.moment().format('DD.MM.YYYY'))
			await this.saveSettings();
			if(debugLogs) console.debug(`reset daily Challenge`)
			reset = true;
		}
		if(!isOneDayBefore(window.moment(this.mediator.getSettingString('weeklyNoteCreationDate'), 'DD.MM.YYYY')) && !isSameDay(window.moment(this.mediator.getSettingString('weeklyNoteCreationDate'), 'DD.MM.YYYY'))){
			const daysPassed = window.moment().diff(window.moment(this.mediator.getSettingString('weeklyNoteCreationDate'), 'DD.MM.YYYY'), 'days') - 1; //today is still a chance. 
			this.mediator.setSettingNumber('weeklyNoteCreationTask', 0);
			this.mediator.setSettingNumber('weeklyNoteCreationTaskContinuously', 0);
			this.mediator.setSettingString('weeklyNoteCreationDate', window.moment().subtract(1, 'day').format('DD.MM.YYYY'))
			await this.decreaseStreakbooster();
			if(debugLogs) console.debug(`${daysPassed} days passed`)
			await this.saveSettings();
			await this.updateStatusBar(this.statusbarGamification)
			if(debugLogs) console.debug(`reset weekly Challenge`)
			reset = true;
		}
		if(isOneDayBefore(window.moment(this.mediator.getSettingString('weeklyNoteCreationDate'), 'DD.MM.YYYY')) && this.mediator.getSettingNumber('weeklyNoteCreationTask') == 7){
			this.mediator.setSettingNumber('weeklyNoteCreationTask', 0);
			this.mediator.setSettingString('weeklyNoteCreationDate', window.moment().subtract(1, 'day').format('DD.MM.YYYY'))
			await this.saveSettings();
			reset = true;
		}
		if (reset){
			await this.actualizeProfileLeaf();
		}

		// deactivate boosters
		if (this.mediator.getSettingBoolean('boosterFactorPerpetualProgress') == true && isMinutesPassed(window.moment(this.mediator.getSettingString('boosterDatePerpetualProgress'), 'YYYY-MM-DD HH:mm:ss'),getBoosterRunTimeFromVarName('perpetualProgress'))){
			this.mediator.setSettingBoolean('boosterFactorPerpetualProgress',false);
			if(debugLogs) console.debug('"Perpetual Progress" has ended.')
		}
		if (this.mediator.getSettingBoolean('boosterFactorStrategicSynapses') == true && isMinutesPassed(window.moment(this.mediator.getSettingString('boosterDateStrategicSynapses'), 'YYYY-MM-DD HH:mm:ss'),getBoosterRunTimeFromVarName('strategicSynapses'))){
			this.mediator.setSettingBoolean('boosterFactorStrategicSynapses',false);
			if(debugLogs) console.debug('"Strategic Synapses" has ended.')
		}
		if (this.mediator.getSettingBoolean('boosterFactorLinkersLode') == true && isMinutesPassed(window.moment(this.mediator.getSettingString('boosterDateLinkersLode'), 'YYYY-MM-DD HH:mm:ss'),getBoosterRunTimeFromVarName('linkersLode'))){
			this.mediator.setSettingBoolean('boosterFactorLinkersLode',false);
			if(debugLogs) console.debug('"Linkers Lode" has ended.')
		}
		if (this.mediator.getSettingBoolean('boosterFactorRecursiveReflection') == true && isMinutesPassed(window.moment(this.mediator.getSettingString('boosterDateRecursiveReflection'), 'YYYY-MM-DD HH:mm:ss'),getBoosterRunTimeFromVarName('recursiveReflection'))){
			this.mediator.setSettingBoolean('boosterFactorRecursiveReflection',false);
			if(debugLogs) console.debug('"Recursive Reflection" has ended.')
		}
		if (this.mediator.getSettingBoolean('boosterFactorSynapticSurge') == true && isMinutesPassed(window.moment(this.mediator.getSettingString('boosterDateSynapticSurge'), 'YYYY-MM-DD HH:mm:ss'),getBoosterRunTimeFromVarName('synapticSurge'))){
			this.mediator.setSettingBoolean('boosterFactorSynapticSurge',false);
			if(debugLogs) console.debug('"Synaptic Surge" has ended.')
		}
		if (this.mediator.getSettingBoolean('boosterFactorTitleTitan') == true && isMinutesPassed(window.moment(this.mediator.getSettingString('boosterDateTitleTitan'), 'YYYY-MM-DD HH:mm:ss'),getBoosterRunTimeFromVarName('titleTitan'))){
			this.mediator.setSettingBoolean('boosterFactorTitleTitan',false);
			if(debugLogs) console.debug('"Title Titan" has ended.')
		}
		if (this.mediator.getSettingBoolean('boosterFactorPrecisionPrism') == true && isMinutesPassed(window.moment(this.mediator.getSettingString('boosterDatePrecisionPrism'), 'YYYY-MM-DD HH:mm:ss'),getBoosterRunTimeFromVarName('precisionPrism'))){
			this.mediator.setSettingBoolean('boosterFactorPrecisionPrism',false);
			if(debugLogs) console.debug('"Precision Prism" has ended.')
		}
		if (this.mediator.getSettingBoolean('boosterFactorHyperlinkHarmony') == true && isMinutesPassed(window.moment(this.mediator.getSettingString('boosterDateHyperlinkHarmony'), 'YYYY-MM-DD HH:mm:ss'),getBoosterRunTimeFromVarName('hyperlinkHarmony'))){
			this.mediator.setSettingBoolean('boosterFactorHyperlinkHarmony',false);
			if(debugLogs) console.debug('"Hyperlink Harmony" has ended.')
		}
		if (this.mediator.getSettingBoolean('boosterFactorEphemeralEuphoria') == true && isMinutesPassed(window.moment(this.mediator.getSettingString('boosterDateEphemeralEuphoria'), 'YYYY-MM-DD HH:mm:ss'),getBoosterRunTimeFromVarName('ephemeralEuphoria'))){
			this.mediator.setSettingBoolean('boosterFactorEphemeralEuphoria',false);
			if(debugLogs) console.debug('"Ephemeral Euphoria" has ended.')
		}

	}


	async increaseDailyCreatedNoteCount(){
		let newDailyNoteCreationTask = this.mediator.getSettingNumber('dailyNoteCreationTask');
        if (newDailyNoteCreationTask < 2){
			newDailyNoteCreationTask ++;
			this.mediator.setSettingNumber('dailyNoteCreationTask', newDailyNoteCreationTask);
			await this.saveSettings();

			if(newDailyNoteCreationTask == 1){
				await this.actualizeProfileLeaf();
				if(debugLogs) console.debug(`${newDailyNoteCreationTask}/2 Notes created today.`)
			} else if (newDailyNoteCreationTask == 2) {
				await this.increaseStreakbooster(streakboosterIncreaseDaily)
				await this.saveSettings();
				await this.updateStatusBar(this.statusbarGamification)
				await this.giveStatusPoints(pointsForDailyChallenge,'formIncreaseDailyCreatedNoteCount')
				const message = getRandomMessageTwoNoteChallenge(pointsForDailyChallenge * (this.mediator.getSettingNumber('badgeBoosterFactor') + this.mediator.getSettingNumber('streakbooster')));
				if(debugLogs) console.debug(`daily Challenge reached! ${newDailyNoteCreationTask}/2 created.`)
				new Notice(message,this.mediator.getSettingNumber('timeShowNotice') * mil2sec)
				if(debugLogs) console.debug(message)
			} else {
				// nothing else to do here
				if(debugLogs) console.debug(`${newDailyNoteCreationTask}/2 Notes created today.`)
			}
		}
	}


	async increaseWeeklyCreatedNoteCount(){
		if(isOneDayBefore(window.moment(this.mediator.getSettingString('weeklyNoteCreationDate'), 'DD.MM.YYYY'))){
			await this.checkForWeeklyNoteChallengeBelow7();
		} else if (isSameDay(window.moment(this.mediator.getSettingString('weeklyNoteCreationDate'), 'DD.MM.YYYY'))){
			// do nothing
			if(debugLogs) console.debug(`daily note creation was rated already today.`)
		} else {
			this.mediator.setSettingString('weeklyNoteCreationDate', window.moment().format('DD.MM.YYYY'))
			this.mediator.setSettingNumber('weeklyNoteCreationTask', 1);
			this.mediator.setSettingNumber('weeklyNoteCreationTaskContinuously', 1);
			await this.saveSettings();
		}
	}


	private async checkForWeeklyNoteChallengeBelow7() {
		let currentWeeklyCreatedNotes = this.mediator.getSettingNumber('weeklyNoteCreationTask');
		let weeklyNoteCreationTaskContinuously = this.mediator.getSettingNumber('weeklyNoteCreationTaskContinuously');
		if (currentWeeklyCreatedNotes < 7) {
			currentWeeklyCreatedNotes++;
			weeklyNoteCreationTaskContinuously++;
			this.mediator.setSettingString('weeklyNoteCreationDate', window.moment().format('DD.MM.YYYY'))
			this.mediator.setSettingNumber('weeklyNoteCreationTask', currentWeeklyCreatedNotes);
			this.mediator.setSettingNumber('weeklyNoteCreationTaskContinuously', weeklyNoteCreationTaskContinuously);
			await this.saveSettings();
			await this.checkForContinuouslyNoteCreation(weeklyNoteCreationTaskContinuously)
			await this.checkForWeeklyNoteChallengeEvaluation(currentWeeklyCreatedNotes);
		}
	}


	private async checkForContinuouslyNoteCreation(noteCount: number){
		if (noteCount == 30){
			await this.giveSecretBadge(this.mediator.getSettingNumber('statusLevel'), getBadge('Consistent Lore Weaver'));
		} else if (noteCount == 90){
			await this.giveSecretBadge(this.mediator.getSettingNumber('statusLevel'), getBadge('Knowledge Artisan Stalwart'));
		} else if (noteCount == 180){
			await this.giveSecretBadge(this.mediator.getSettingNumber('statusLevel'), getBadge('Wisdom Architect Virtuoso'));
		} else if (noteCount == 365){
			await this.giveSecretBadge(this.mediator.getSettingNumber('statusLevel'), getBadge('Eternal Scholar Maestro'));
		} else if (noteCount == 730){
			await this.giveSecretBadge(this.mediator.getSettingNumber('statusLevel'), getBadge('Divine Omniscience Overlord'));
		}
	}


	private async checkForWeeklyNoteChallengeEvaluation(newWeeklyNoteCreationTask: number) {
		if (newWeeklyNoteCreationTask <= 6) {
			// update Avatar Page
			await this.actualizeProfileLeaf();
			if(debugLogs) console.debug(`${newWeeklyNoteCreationTask}/7 Notes created in a chain.`)
		} else if (newWeeklyNoteCreationTask == 7) {
			await this.increaseStreakbooster(streakboosterIncreaseWeekly);
			await this.saveSettings();
			await this.updateStatusBar(this.statusbarGamification)
			await this.giveStatusPoints(pointsForWeeklyChallenge, 'fromCheckForWeeklyNoteChallengeEvaluation')
			if(debugLogs) console.debug(`Weekly Challenge reached! ${newWeeklyNoteCreationTask}/7 created in a chain.`)
			const message = getRandomMessageWeeklyChallenge(pointsForWeeklyChallenge * (this.mediator.getSettingNumber('badgeBoosterFactor') + this.mediator.getSettingNumber('streakbooster')));
			new Notice(message,this.mediator.getSettingNumber('timeShowNotice') * mil2sec)
			if(debugLogs) console.debug(message)
		} else {
			// nothing else to do here
			if(debugLogs) console.debug(`${newWeeklyNoteCreationTask}/7 Notes created in a chain.`)
		}
	}


	async updateStatusBar(statusbar: HTMLSpanElement){
		const currentLevel = getLevelForPoints(this.mediator.getSettingNumber('statusPoints'))
		const progressbarPercent = (this.mediator.getSettingNumber('statusPoints') - currentLevel.points)/(currentLevel.pointsNext - currentLevel.points)*100;
		const charNumProgressbar = 10;
		const barLength = Math.round(progressbarPercent / charNumProgressbar)
		const boosterFactor = this.mediator.getSettingNumber('streakbooster')
		statusbar.setText(`🎲|lvl: ${this.mediator.getSettingNumber('statusLevel')} | ${this.createProgressbar(charNumProgressbar, barLength)}|🚀${boosterFactor}${this.rateBoosterDirection()}`)
	}


	private rateBoosterDirection(){
		let direction = '↕️'
		if(this.mediator.getSettingNumber('dailyNoteCreationTask')==1){
			direction = '➡️';
		} else if(this.mediator.getSettingBoolean('streakboosterDate')){
			direction = '⬆️';
		} else if(!this.mediator.getSettingBoolean('streakboosterDate')){
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


	async saveSettings() {
		await this.saveData(this.settings);
	}


	// @ts-ignore
	async giveStatusPoints(pointsToAdd: number, caller: string): Promise<boolean>{
		let boosterFactor = 1;
		const streakbooster = this.mediator.getSettingNumber('streakbooster');
		let boosterFactorPerpetualProgress = 0;
		let boosterFactorStrategicSynapses = 0;
		let boosterFactorLinkersLode = 0;
		let boosterFactorRecursiveReflection = 0;
		let boosterFactorSynapticSurge = 0;
		let boosterFactorTitleTitan = 0;
		let boosterFactorPrecisionPrism = 0;
		let boosterFactorHyperlinkHarmony = 0;
		let boosterFactorEphemeralEuphoria = 0;
		
		if (this.mediator.getSettingBoolean('badgeBoosterState')){
			boosterFactor = this.mediator.getSettingNumber('badgeBoosterFactor');
		}
		if (this.mediator.getSettingBoolean('boosterFactorPerpetualProgress')){
			boosterFactorPerpetualProgress = 3;
		}
		if (this.mediator.getSettingBoolean('boosterFactorStrategicSynapses')){
			boosterFactorStrategicSynapses = 3;
		}
		if (this.mediator.getSettingBoolean('boosterFactorLinkersLode')){
			boosterFactorLinkersLode = 10;
		}
		if (this.mediator.getSettingBoolean('boosterFactorRecursiveReflection') && ( caller == 'fromNoteMajurity' || caller == 'fromTitleClass' || caller == 'fromNoteLengthClass' || caller == 'fromInlinkClass' || caller == 'fromOutlinkClass' || caller == 'fromProgressiveTummarizationMaturity')){
			boosterFactorRecursiveReflection = 5;
		}
		if (this.mediator.getSettingBoolean('boosterFactorSynapticSurge') && (caller == 'fromInlinkClass' || caller == 'fromOutlinkClass')){
			boosterFactorSynapticSurge = 20;
		}
		if (this.mediator.getSettingBoolean('boosterFactorTitleTitan') && caller == 'fromTitleClass'){
			boosterFactorTitleTitan = 4;
		}
		if (this.mediator.getSettingBoolean('boosterFactorPrecisionPrism') && caller == 'fromNoteLengthClass'){
			boosterFactorPrecisionPrism = 4;
		}
		if (this.mediator.getSettingBoolean('boosterFactorHyperlinkHarmony') && (caller == 'fromInlinkClass' || caller == 'fromOutlinkClass')){
			boosterFactorHyperlinkHarmony = 5;
		}
		if (this.mediator.getSettingBoolean('boosterFactorEphemeralEuphoria')){
			boosterFactorEphemeralEuphoria = 80;
		}
		
		pointsToReceived = pointsToAdd * (boosterFactor + streakbooster + boosterFactorPerpetualProgress + boosterFactorStrategicSynapses + boosterFactorLinkersLode + boosterFactorRecursiveReflection + boosterFactorSynapticSurge + boosterFactorTitleTitan + boosterFactorPrecisionPrism + boosterFactorHyperlinkHarmony + boosterFactorEphemeralEuphoria )
		const pointsTotal = pointsToReceived + this.mediator.getSettingNumber('statusPoints')
		this.mediator.setSettingNumber('statusPoints', pointsTotal)


		const level = getLevelForPoints(pointsTotal);
		const receiveBadge = false
		if ( this.mediator.getSettingNumber('statusLevel') < level.level){
			//receiveBadge = checkIfReceiveABadge(this.mediator.getSettingNumber('statusLevel'), level.level)
			this.mediator.setSettingNumber('statusLevel', level.level)
			new Notice(`With ${pointsTotal} points, the current level is ${level.level}.`,this.mediator.getSettingNumber('timeShowNotice') * mil2sec * 1.2)
			await this.giveBadge(level.level);
		}

		return receiveBadge;

	}


	async increaseStreakbooster(increaseValue: number) {
		const oldBoosterFactor = this.mediator.getSettingNumber('streakbooster');
		let newBoosterFactor = parseFloat((oldBoosterFactor + increaseValue).toFixed(1));

		if (newBoosterFactor > 80) {
			newBoosterFactor = 80;
		}

		// Send message if newBoosterFactor crosses a multiple of 5
		const oldIntegerPart = Math.floor(oldBoosterFactor);
		const newIntegerPart = Math.floor(newBoosterFactor);
		if (oldBoosterFactor <= 80 && newBoosterFactor <= 80 && newBoosterFactor > oldBoosterFactor &&
			newIntegerPart !== oldIntegerPart && newIntegerPart % 5 === 0) {
			new Notice(getRandomMessageBoosterFactor(),this.mediator.getSettingNumber('timeShowNotice') * mil2sec * 1.2)
			console.log(`${getRandomMessageBoosterFactor()} : ${newBoosterFactor}`)
		}

		if (debugLogs) console.debug(`newBoosterFakfor: ${newBoosterFactor}`);

		this.mediator.setSettingNumber('streakbooster', newBoosterFactor);
		this.mediator.setSettingBoolean('streakboosterDate', true);
	}


	async decreaseStreakbooster(){
		//let newBoosterFakfor = parseFloat((this.mediator.getSettingNumber('streakbooster') - decreaseValue * streakboosterDecrease).toFixed(1))
		const currentValue = this.mediator.getSettingNumber('streakbooster');
		let newBoosterFakfor;
		if (streakboosterDecrease >= currentValue % 5) {
			// If streakboosterDecrease is greater than or equal to the difference to the next multiple of 5
			newBoosterFakfor = Math.floor(currentValue / 5) * 5; // Round down to the nearest multiple of 5
		} else {
			// If streakboosterDecrease is smaller than the difference to the next multiple of 5
			newBoosterFakfor = currentValue - (currentValue % 5 - streakboosterDecrease); // Subtract the difference
		}

		this.mediator.setSettingNumber('streakbooster', newBoosterFakfor)
		if (newBoosterFakfor < 0){
			newBoosterFakfor = 0
		}
		this.mediator.setSettingNumber('streakbooster', newBoosterFakfor)
		this.mediator.setSettingBoolean('streakboosterDate', false);
	}


	async giveBadge(currenLevel: number){
		const badge = getBadgeForLevel(currenLevel,true)
		const badgeDict = parseBadgeCSV2Dict(this.mediator.getSettingString('receivedBadges'));
		if (!badgeDict[badge.name]) {
			await this.writeBadgeCSV(badge, window.moment().format('YYYY-MM-DD'), 'level ' + currenLevel.toString())

		}
	}

	async giveSecretBadge(currenLevel: number, badge: Badge){
		const badgeDict = parseBadgeCSV2Dict(this.mediator.getSettingString('receivedBadges'));
		if (!badgeDict[badge.name]) {
			await this.writeBadgeCSV(badge, window.moment().format('YYYY-MM-DD'), 'level ' + currenLevel.toString())
		}
	}


	async decisionIfBadge(newLevel: Promise<boolean>){
		newLevel.then((result: boolean)=> {
			if(result){
				const badge : Badge = getBadgeForLevel(this.mediator.getSettingNumber('statusLevel'), false)
				new Notice(`You've earned the "${badge.name}" badge. ${badge.description}`,this.mediator.getSettingNumber('timeShowNotice') * mil2sec * 1.2)
				if(debugLogs) console.debug(`You've earned the "${badge.name}" badge. ${badge.description}`)
				this.mediator.setSettingBoolean('badgeBoosterState', false);
				this.mediator.setSettingNumber('badgeBoosterFactor', 1);
				this.writeBadgeCSV(badge, window.moment().format('YYYY-MM-DD'), 'level ' + this.mediator.getSettingNumber('statusLevel').toString())
			}
		});
	}


	async removeKeysFromFrontmatter() {
		const { vault } = this.app
		const fileCountMap = await this.maturityCalculator.getFileCountMap(this.app, this.mediator.getSettingString('tagsExclude'), this.mediator.getSettingString('folderExclude'));
		if (fileCountMap != null){
			for (const fileName of fileCountMap.keys()) {
				const files = vault.getFiles();
				const file = files.find(file => file.basename === fileName);
				if (!file) {
					console.warn(`File ${fileName} not found.`);
					continue;
				}
				if(debugLogs) console.debug(`Processing file ${fileName}`);
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
						const errorMessage = `Update majuritys failed Malformed frontmatter ${e.message}`;
						new Notice(errorMessage, this.mediator.getSettingNumber('timeShowNotice') * mil2sec);
						console.error(errorMessage);
					}
				}
			}
		} else {
			if(debugLogs) console.debug(`No files in vault found to remove frontmatter keys from`)
		}
	}


	async whichLevelNextBadge(currentLevel: number): Promise<number | null> {
		try {
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
		catch (e) {
			console.error(e)
			return null;
		}
	}


	async boosterForInit(): Promise<number | null> {
		try {
			const nextBadgeAt = await this.whichLevelNextBadge(this.mediator.getSettingNumber('statusLevel'))
			if (nextBadgeAt != null){
				const statusPointsToReach = statusPointsForLevel(nextBadgeAt)
				//if(debugLogs) console.debug(`statusPointsToReach for next Badge: ${statusPointsToReach}`)
				// 50 Notes from Level 1 to 5 to get the first badge.
				// 300 Points in average for a Note.
				const boosterFactor = Math.round((statusPointsToReach - this.mediator.getSettingNumber('statusPoints'))/50/300);
				this.mediator.setSettingNumber('badgeBoosterFactor', boosterFactor)
				this.mediator.setSettingBoolean('badgeBoosterState', true)
				//await this.saveData(this.settings)
				//if(debugLogs) console.debug(`boosterFaktor: ${boosterFactor}`)
				return boosterFactor
			} else {
				return 0
			}
		}
		catch (e) {
			console.error(e);
			return null;
		}
	}


	async writeBadgeCSV(newBadge: Badge, date: string, level: string){
		// check first if badge is already in
		const badgeDict = parseBadgeCSV2Dict(this.mediator.getSettingString('receivedBadges'));
        if (!badgeDict[newBadge.name]) {
			this.mediator.setBadgeSave(newBadge, date, level);
		} else {
			console.log(`Badge "${newBadge.name}" is already received before`)
        }
	}
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


