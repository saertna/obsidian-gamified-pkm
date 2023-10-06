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
import {App, MarkdownView, Modal, Notice, Plugin, TFile, Vault} from 'obsidian';
import {defaultSettings, GamificationPluginSettings} from './settings';
import format from 'date-fns/format';
import {
	avatarInitContent,
	pointsMajurity,
	pointsNoteMajurity,
	pointsForDailyChallenge,
	pointsForWeeklyChallenge
} from './constants'
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

export default class gamification extends Plugin {
	public settings: GamificationPluginSettings;
	private timerInterval: number;
	private timerId: number | null;
	private statusBarItem = this.addStatusBarItem();
	private statusbarGamification = this.statusBarItem.createEl("span", { text: "" });

	async onload() {
		console.log('obsidian-pkm-gamification loaded!');

		await this.loadSettings();

		this.addSettingTab(new GamificationPluginSettings(this.app, this));

		// take care to reset when opened on a new day, don't wait for trigger
		setTimeout(async () => {
			// Code that you want to execute after the delay
			await this.resetDailyGoals()
		}, 2000); // 2000 milliseconds = 2 seconds


		// to set timer for reset daily and weekly goals
		this.timerInterval = 30 * 60 * 1000; // minutes x seconds x milliseconds
		this.timerId = window.setInterval(this.resetDailyGoals.bind(this), this.timerInterval);

		await this.updateStatusBar(this.statusbarGamification)


		if (this.settings.debug){
			this.addRibbonIcon("accessibility", "change text formatting", async () => {

				// const pointsReceived = 500;
				// new ModalInformationbox(this.app, `Finalized gamification initialization!\nCongratulation, you earned ${pointsReceived} Points!\n\nCheck the Profile Page: \"${this.settings.avatarPageName}.md\".`).open();

				// const newLevel = this.giveStatusPoints(this.settings.avatarPageName, 300)
				// this.decisionIfBadge(newLevel)

				// const nextBadgeLevel = await this.whichLevelNextBadge(this.settings.statusLevel)
				// console.log(`Nächste Badge mit Level ${nextBadgeLevel}`)


				// const initBadge : Badge = await getBadgeForInitLevel(this.settings.statusLevel);
				// await this.giveInitBadgeInProfile(this.settings.avatarPageName, initBadge);
				// await this.removeBadgesWhenInitLevelHigher(this.settings.avatarPageName ,this.settings.statusLevel)
				// await this.boosterForInit()

				// this.openAvatarFile()


				// change text in status bar

				// this.updateStatusBar(statusbarGamification)
				//statusbarGamification.setText("Hallo")


				//await this.loadSettings();
				//await this.updateAvatarPage(this.settings.avatarPageName);

				// this.loadSettings()
				//await this.resetDailyGoals()


				new ModalBooster(this.app, ` `).open();

			});
		}


		this.addRibbonIcon("sprout", "Calculate Note Maturity", async () => {
			//const file: TFile | null = this.app.workspace.getActiveFile();
			await this.calculateNoteMajurity();
		});


		if (this.settings.enableInitCommand){
			// command Initialize gamification ratings
			this.addCommand({
				id: 'init-rate-gamification',
				name: 'Initialize gamification ratings',
				callback: async () => {
					await this.initializeGame(this.statusbarGamification);
				},
			});
		}

		if (this.settings.enableInitCommand){
			// command create avatar profile page
			this.addCommand({
				id: 'create-avatar-page',
				name: 'create profile page',
				callback: async () => {
					const { vault } = this.app;
					await createAvatarFile(this.app, this.settings.avatarPageName)
					const chartString = await this.createChart(vault)
					await replaceChartContent(this.settings.avatarPageName, chartString)
				},
			});
		}


		if (this.settings.enableInitCommand) {
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
				await replaceChartContent(this.settings.avatarPageName, chartString)
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
				await replaceFormatStrings(this.settings.progressiveSumLayer2, this.settings.progressiveSumLayer3);
			},
		});

	}


    private async resetGame() {
        await this.removeKeysFromFrontmatter();
        this.settings.statusLevel = 1;
        this.settings.statusPoints = 0;
        this.settings.xpForNextLevel = 1000
        this.settings.badgeBoosterState = false
        this.settings.badgeBoosterFactor = 1
        await this.saveData(this.settings);
        await this.giveStatusPoints(0)
        await this.updateStatusBar(this.statusbarGamification)
        new ModalInformationbox(this.app, `Game is now reseted. Please delete the Profile Page: "${this.settings.avatarPageName}.md" manually.`).open();
    }

    private async initializeGame(statusbarGamification: HTMLSpanElement) {
		this.settings.gamificationStartDate = format(new Date(), 'yyyy-MM-dd');
		await this.saveSettings();

		const {vault} = this.app;
		await createAvatarFile(this.app, this.settings.avatarPageName)
		const chartString = await this.createChart(vault)
		await replaceChartContent(this.settings.avatarPageName, chartString)
		await this.openAvatarFile()
		const fileCountMap: TFile[] = await getFileMap(this.app, this.settings.tagsExclude, this.settings.folderExclude);
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
			} = countLayer2AndLayer3Characters(fileContents, fileName.basename, this.settings.progressiveSumLayer2, this.settings.progressiveSumLayer3);
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
						pointsReceived += pointsNoteMajurity * rateDirectionForStatusPoints(frontmatter['note-maturity'], noteMajurity)
						this.giveStatusPoints(pointsNoteMajurity * rateDirectionForStatusPoints("frontmatter['note-maturity']", noteMajurity))
					} else if (!('note-maturity' in frontmatter)) {
						pointsReceived += pointsNoteMajurity * rateDirectionForStatusPoints("0", noteMajurity)
						this.giveStatusPoints(pointsNoteMajurity * rateDirectionForStatusPoints("0", noteMajurity))
					}

					if (rateDirectionForStatusPoints(frontmatter['title-class'], fileNameRate) >= 1 && 'title-class' in frontmatter) {
						pointsReceived += pointsMajurity * rateDirectionForStatusPoints(frontmatter['title-class'], fileNameRate)
						this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints(frontmatter['title-class'], fileNameRate))
					} else if (!('title-class' in frontmatter)) {
						pointsReceived += pointsMajurity * rateDirectionForStatusPoints("0", fileNameRate)
						this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints("0", fileNameRate))
					}

					if (rateDirectionForStatusPoints(frontmatter['note-length-class'], rateFileLength) >= 1) {
						pointsReceived += pointsMajurity * rateDirectionForStatusPoints(frontmatter['note-length-class'], rateFileLength)
						this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints(frontmatter['note-length-class'], rateFileLength))
					} else if (!('note-length-class' in frontmatter)) {
						pointsReceived += pointsMajurity * rateDirectionForStatusPoints("0", rateFileLength)
						this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints("0", rateFileLength))
					}

					if (rateDirectionForStatusPoints(frontmatter['inlink-class'], inlinkClass) >= 1) {
						pointsReceived += pointsMajurity * rateDirectionForStatusPoints(frontmatter['inlink-class'], inlinkClass)
						this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints(frontmatter['inlink-class'], inlinkClass))
					} else if (!('inlink-class' in frontmatter)) {
						pointsReceived += pointsMajurity * rateDirectionForStatusPoints("0", inlinkClass)
						this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints("0", inlinkClass))
					}

					if (rateDirectionForStatusPoints(frontmatter['outlink-class'], rateOut) >= 1) {
						pointsReceived += pointsMajurity * rateDirectionForStatusPoints(frontmatter['outlink-class'], rateOut)
						this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints(frontmatter['outlink-class'], rateOut))
					} else if (!('outlink-class' in frontmatter)) {
						pointsReceived += pointsMajurity * rateDirectionForStatusPoints("0", rateOut)
						this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints("0", rateOut))
					}

					if (rateDirectionForStatusPoints(frontmatter['progressive-summarization-maturity'], rateProgressiveSum) >= 1) {
						pointsReceived += pointsMajurity * rateDirectionForStatusPoints(frontmatter['progressive-summarization-maturity'], rateProgressiveSum)
						this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints(frontmatter['progressive-summarization-maturity'], rateProgressiveSum))
					} else if (!('progressive-summarization-maturity' in frontmatter)) {
						pointsReceived += pointsMajurity * rateDirectionForStatusPoints(frontmatter['progressive-summarization-maturity'], rateProgressiveSum)
						this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints("0", rateProgressiveSum))

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
			let boosterFactor = 1;
			if (this.settings.badgeBoosterState){
				boosterFactor = this.settings.badgeBoosterFactor;
			}
			new Notice(`${pointsReceived * boosterFactor} Points received`)
			console.log(`${pointsReceived * boosterFactor} Points received`)
		}

		// Inside your function where you want to introduce a delay
		setTimeout(async () => {
			// Code that you want to execute after the delay
			const initBadge: Badge = getBadgeForInitLevel(this.settings.statusLevel);
			new Notice(`You've earned the "${initBadge.name}" badge. ${initBadge.description}`)
			console.log(`You earned ${initBadge.name} - ${initBadge.description}`)
			await this.giveInitBadgeInProfile(this.settings.avatarPageName, initBadge);
			await this.removeBadgesWhenInitLevelHigher(this.settings.avatarPageName, this.settings.statusLevel)
			await this.boosterForInit()
			await this.updateStatusBar(statusbarGamification)
		}, 2000); // 2000 milliseconds = 2 seconds

		new ModalInformationbox(this.app, `Finallized gamification initialistation!\nCongratulation, you earned ${pointsReceived} Points!\n\nCheck the Profile Page: "${this.settings.avatarPageName}.md"\n\nYou received an initialisation Booster aktiv for your first level ups. Game on!`).open();
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
				const { charCount, highlightedCount, boldCount } = countLayer2AndLayer3Characters(fileContents, fileName, this.settings.progressiveSumLayer2, this.settings.progressiveSumLayer3);
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

			try {
				await this.app.fileManager.processFrontMatter(file, (frontmatter) => {
					if (frontmatter) {
						let pointsReceived = 0; // to have one message at the end how many points received
						if (rateDirectionForStatusPoints(frontmatter['note-maturity'], noteMajurity) >= 1){
							console.log(`note-maturity >=1`)
							pointsReceived += pointsNoteMajurity*rateDirectionForStatusPoints(frontmatter['note-maturity'], noteMajurity)
							const newLevel = this.giveStatusPoints(pointsNoteMajurity * rateDirectionForStatusPoints("frontmatter['note-maturity']", noteMajurity))
							this.decisionIfBadge(newLevel)
						} else if (!('note-maturity' in frontmatter)){
							pointsReceived += pointsNoteMajurity*rateDirectionForStatusPoints("0", noteMajurity)
							const newLevel = this.giveStatusPoints(pointsNoteMajurity * rateDirectionForStatusPoints("0", noteMajurity))
							this.decisionIfBadge(newLevel);
							detectIfNoteIsFirstTimeRated = true;
						}

						if (rateDirectionForStatusPoints(frontmatter['title-class'], fileNameRate) >= 1 && 'title-class' in frontmatter){
							pointsReceived += pointsMajurity*rateDirectionForStatusPoints(frontmatter['title-class'], fileNameRate)
							const newLevel = this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints(frontmatter['title-class'], fileNameRate))
							this.decisionIfBadge(newLevel)
						} else if (!('title-class' in frontmatter)){
							pointsReceived += pointsMajurity*rateDirectionForStatusPoints("0", fileNameRate)
							const newLevel = this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints("0", fileNameRate))
							this.decisionIfBadge(newLevel)
						}

						if (rateDirectionForStatusPoints(frontmatter['note-length-class'], rateFileLength) >= 1){
							pointsReceived += pointsMajurity*rateDirectionForStatusPoints(frontmatter['note-length-class'], rateFileLength)
							const newLevel = this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints(frontmatter['note-length-class'], rateFileLength))
							this.decisionIfBadge(newLevel)
						}else if (!('note-length-class' in frontmatter)){
							pointsReceived += pointsMajurity*rateDirectionForStatusPoints("0", rateFileLength)
							const newLevel = this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints("0", rateFileLength))
							this.decisionIfBadge(newLevel)
						}

						if (rateDirectionForStatusPoints(frontmatter['inlink-class'], inlinkClass) >= 1){
							pointsReceived += pointsMajurity*rateDirectionForStatusPoints(frontmatter['inlink-class'], inlinkClass)
							const newLevel = this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints(frontmatter['inlink-class'], inlinkClass))
							this.decisionIfBadge(newLevel)
						}else if (!('inlink-class' in frontmatter)){
							pointsReceived += pointsMajurity*rateDirectionForStatusPoints("0", inlinkClass)
							const newLevel = this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints("0", inlinkClass))
							this.decisionIfBadge(newLevel)
						}

						if (rateDirectionForStatusPoints(frontmatter['outlink-class'], rateOut) >= 1){
							pointsReceived += pointsMajurity*rateDirectionForStatusPoints(frontmatter['outlink-class'], rateOut)
							const newLevel = this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints(frontmatter['outlink-class'], rateOut))
							this.decisionIfBadge(newLevel)
						}else if (!('outlink-class' in frontmatter)){
							pointsReceived += pointsMajurity*rateDirectionForStatusPoints("0", rateOut)
							const newLevel = this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints("0", rateOut))
							this.decisionIfBadge(newLevel)
						}

						if (rateDirectionForStatusPoints(frontmatter['progressive-summarization-maturity'], rateProgressiveSum) >= 1){
							pointsReceived += pointsMajurity*rateDirectionForStatusPoints(frontmatter['progressive-summarization-maturity'], rateProgressiveSum)
							const newLevel = this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints(frontmatter['progressive-summarization-maturity'], rateProgressiveSum))
							this.decisionIfBadge(newLevel)
						}else if (!('progressive-summarization-maturity' in frontmatter)){
							pointsReceived += pointsMajurity*rateDirectionForStatusPoints(frontmatter['progressive-summarization-maturity'], rateProgressiveSum)
							const newLevel = this.giveStatusPoints(pointsMajurity * rateDirectionForStatusPoints("0", rateProgressiveSum))
							this.decisionIfBadge(newLevel)
						}
						console.log(`pointsReceived: ${pointsReceived}`)
						if (pointsReceived > 0){
							const messagePoints = getRandomMessagePoints(pointsReceived * this.settings.badgeBoosterFactor)
							new Notice(messagePoints)
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
			//await this.updateAvatarPage(this.settings.avatarPageName)
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
		if(!isSameDay(window.moment(this.settings.dailyNoteCreationDate, 'DD.MM.YYYY'))){
			this.settings.dailyNoteCreationTask = 0;
			this.settings.dailyNoteCreationDate = window.moment().format('DD.MM.YYYY')
			await this.saveSettings();
			console.log(`daily Challenge reseted`)
			reset = true;
		}
		if(!isOneDayBefore(window.moment(this.settings.weeklyNoteCreationDate, 'DD.MM.YYYY')) && !isSameDay(window.moment(this.settings.weeklyNoteCreationDate, 'DD.MM.YYYY'))){
			this.settings.weeklyNoteCreationTask = 0;
			this.settings.weeklyNoteCreationDate = window.moment().subtract(1, 'day').format('DD.MM.YYYY')
			await this.saveSettings();
			console.log(`weekly Challenge reseted`)
			reset = true;
		}
		if(isOneDayBefore(window.moment(this.settings.weeklyNoteCreationDate, 'DD.MM.YYYY')) && this.settings.weeklyNoteCreationTask == 7){
			this.settings.weeklyNoteCreationTask = 0;
			this.settings.weeklyNoteCreationDate = window.moment().subtract(1, 'day').format('DD.MM.YYYY')
			await this.saveSettings();
			reset = true;
		}
		if (reset){
			//this.dailyChallengeUpdateProfile(this.settings.avatarPageName, 0)
			await this.updateAvatarPage(this.settings.avatarPageName);
		}

	}

	async increaseDailyCreatedNoteCount(){
		let newDailyNoteCreationTask = this.settings.dailyNoteCreationTask;
        if (newDailyNoteCreationTask < 2){
			newDailyNoteCreationTask ++;
			this.settings.dailyNoteCreationTask = newDailyNoteCreationTask;
			await this.saveSettings();

			if(newDailyNoteCreationTask == 1){
				// update Avatar Page
				await this.updateAvatarPage(this.settings.avatarPageName);
				console.log(`${newDailyNoteCreationTask}/2 Notes created today.`)
			} else if (newDailyNoteCreationTask == 2) {
				await this.giveStatusPoints(pointsForDailyChallenge)
				const message = getRandomMessageTwoNoteChallenge(pointsForDailyChallenge);
				console.log(`daily Challenge reached! ${newDailyNoteCreationTask}/2 created.`)
				new Notice(message)
				console.log(message)
			} else {
				// nothing else to do here
				console.log(`${newDailyNoteCreationTask}/2 Notes created today.`)
			}
		}
	}

	async increaseWeeklyCreatedNoteCount(){
		if(isOneDayBefore(window.moment(this.settings.weeklyNoteCreationDate, 'DD.MM.YYYY'))){
			await this.checkForWeeklyNoteChallengeBelow7();
		} else if (isSameDay(window.moment(this.settings.weeklyNoteCreationDate, 'DD.MM.YYYY'))){
			// do nothing
			console.log(`daily note creation was rated already today.`)
		} else {
			this.settings.weeklyNoteCreationDate = window.moment().format('DD.MM.YYYY')
			this.settings.weeklyNoteCreationTask = 1;
			await this.saveSettings();
		}
	}

	private async checkForWeeklyNoteChallengeBelow7() {
		let currentWeeklyCreatedNotes = this.settings.weeklyNoteCreationTask;
		if (currentWeeklyCreatedNotes < 7) {
			currentWeeklyCreatedNotes++;
			this.settings.weeklyNoteCreationDate = window.moment().format('DD.MM.YYYY')
			this.settings.weeklyNoteCreationTask = currentWeeklyCreatedNotes;
			await this.saveSettings();

			await this.checkForWeeklyNoteChallengeEvaluation(currentWeeklyCreatedNotes);
		}
	}

	private async checkForWeeklyNoteChallengeEvaluation(newWeeklyNoteCreationTask: number) {
		if (newWeeklyNoteCreationTask <= 6) {
			// update Avatar Page
			await this.updateAvatarPage(this.settings.avatarPageName);
			console.log(`${newWeeklyNoteCreationTask}/7 Notes created in a chain.`)
		} else if (newWeeklyNoteCreationTask == 7) {
			await this.giveStatusPoints(pointsForWeeklyChallenge)
			console.log(`Weekly Challenge reached! ${newWeeklyNoteCreationTask}/7 created in a chain.`)
			const message = getRandomMessageWeeklyChallenge(pointsForWeeklyChallenge);
			new Notice(message)
			console.log(message)
		} else {
			// nothing else to do here
			console.log(`${newWeeklyNoteCreationTask}/7 Notes created in a chain.`)
		}
	}

	async updateStatusBar(statusbar: HTMLSpanElement){
		const currentLevel = getLevelForPoints(this.settings.statusPoints)
		const progressbarPercent = (this.settings.statusPoints - currentLevel.points)/(currentLevel.pointsNext - currentLevel.points)*100;
		const charNumProgressbar = 10
		const barLength = Math.round(progressbarPercent / charNumProgressbar)
		statusbar.setText(`🎲|lvl: ${this.settings.statusLevel} | ${this.createProgressbar(charNumProgressbar, barLength)}`)
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

	async giveStatusPoints(pointsToAdd: number): Promise<boolean>{
		let boosterFactor = 1;
		if (this.settings.badgeBoosterState){
			boosterFactor = this.settings.badgeBoosterFactor;
		}

		this.settings.statusPoints = pointsToAdd * boosterFactor + this.settings.statusPoints
		await this.saveData(this.settings)

		return this.updateAvatarPage(this.settings.avatarPageName)
	}


	async updateAvatarPage(avatarPageName: string): Promise<boolean>{
		const existingFile = app.vault.getAbstractFileByPath(`${avatarPageName}.md`);
		if (existingFile == null) {
			console.log(`File ${avatarPageName}.md does not exist`);
			return false;
		}
		const file = existingFile as TFile;

		//console.log(`current statusPoints: ${this.settings.statusPoints}`)
		const content = await app.vault.read(file);
		let reference: number | null = null;
		let reference2: number | null = null;
		let reference3: number | null = null;
		let end: number | null = null;
		let start: number | null = null;
		let end2: number | null = null;
		let start2: number | null = null;
		let end3: number | null = null;
		let start3: number | null = null;

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
		}
		// read current Points from settings
		const newPoints = this.settings.statusPoints

		const level = getLevelForPoints(newPoints);
		let nextLevelAt = this.settings.xpForNextLevel;
		let receiveBadge = false
		if (this.settings.statusLevel < level.level){
			// Level Up archived
			new Notice(`With ${newPoints} points, the current level is ${level.level}.`)
			// check first if this means a new badge before it gets overwritten
			receiveBadge = checkIfReceiveABadge(this.settings.statusLevel, level.level)
			this.settings.statusLevel = level.level;
			nextLevelAt = level.pointsNext;
			this.settings.xpForNextLevel = level.pointsNext;
			await this.saveData(this.settings)
		}

		const progressBarEnd = nextLevelAt - newPoints;
		const newPointsString = '| **Level**  | **' + level.level + '** |\n| Points | ' + newPoints + '    |\n^levelAndPoints\n```chart\ntype: bar\nlabels: [Expririence]\nseries:\n  - title: points reached\n    data: [' + newPoints + ']\n  - title: points to earn to level up\n    data: [' + progressBarEnd + ']\nxMin: ' + level.points + '\nxMax: ' + level.pointsNext + '\ntension: 0.2\nwidth: 40%\nlabelColors: false\nfill: false\nbeginAtZero: false\nbestFit: false\nbestFitTitle: undefined\nbestFitNumber: 0\nstacked: true\nindexAxis: y\nxTitle: "progress"\nlegend: false\n```'
		const dailyChallenge = '| **daily Notes** | *500EP* | **' + this.settings.dailyNoteCreationTask + '/2**   |';
		const daysLeftInWeeklyChain : number = 7 - this.settings.weeklyNoteCreationTask;
		const weeklyChallenge = '| **weekly Notes** | *2000EP*     |  **' + this.settings.weeklyNoteCreationTask + '/7**   |\n^weeklyNotesChallenge\n```chart\ntype: bar\nlabels: [days done in a row]\nseries:\n  - title: days to do in a row\n    data: [' + this.settings.weeklyNoteCreationTask + ']\n  - title: points to earn to level up\n    data: [' + daysLeftInWeeklyChain + ']\nxMin: 0\nxMax: 7\ntension: 0.2\nwidth: 40%\nlabelColors: false\nfill: false\nbeginAtZero: false\nbestFit: false\nbestFitTitle: undefined\nbestFitNumber: 0\nstacked: true\nindexAxis: y\nxTitle: "progress"\nlegend: false\n```';

		if (reference != null && reference2 != null && reference3 != null){
			start = reference - 2;
			end = reference + 24;
			start2 = reference2 - 1 - 25; // no idea wby offset 25 is needed
			end2 = reference2 - 25; // no idea wby offset 25 is needed
			start3 = reference3 - 1 -25; // no idea wby offset 25 is needed
			end3 = reference3 + 24 -25; // no idea wby offset 25 is needed


			const newLines = [...lines.slice(0, start), newPointsString, ...lines.slice(end)];
			const newLines2 = [...newLines.slice(0, start2), dailyChallenge, ...newLines.slice(end2)];
			const newLines3 = [...newLines2.slice(0, start3), weeklyChallenge, ...newLines2.slice(end3)];
			await app.vault.modify(file, newLines3.join("\n"));
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
		//let earliestDate = earliestFile.stat.ctime
		//if (earliestFile.stat.mtime < earliestFile.stat.ctime ){
		const earliestDate = earliestFile.stat.mtime
		//}

		let monthCounter = 0 //format(new Date(earliestDate), 'MM');
		let dateCount = new Date(earliestDate); // um es hochzählen zu können
		//const fileDateMonthMap = new Map<string, number>();
		const fileDateMonthMapMod = new Map<string, number>();
		const monthcount = monthsBetween(new Date(earliestDate), new Date())
		let dateString = dateCount.getMonth()+1 + "." + dateCount.getFullYear()
		let yLabel = ""
		// create Base for counting created
		/*while (monthCounter < monthcount){
			dateString = dateCount.getMonth()+1 + "." + dateCount.getFullYear()
			//console.log(`dateString: ${dateString}`)
			dateCount.setMonth(dateCount.getMonth() + 1)
			monthCounter += 1;
			fileDateMonthMap.set(dateString, 0)
		}*/

		monthCounter = 0
		dateCount = new Date(earliestDate); // um es hochzählen zu können
		dateString = dateCount.getMonth()+1 + "." + dateCount.getFullYear()
		// create Base for counting modified
		while (monthCounter < monthcount){
			dateString = dateCount.getMonth()+1 + "." + dateCount.getFullYear()
			//console.log(`dateString: ${dateString}`)
			yLabel = yLabel + dateString + ", "
			dateCount.setMonth(dateCount.getMonth() + 1)
			monthCounter += 1;
			fileDateMonthMapMod.set(dateString, 0)
		}
		yLabel = yLabel.slice(0,yLabel.length-2)

		// count how many files in each month
		/*const creationDates = getCreationDates(files)
		for (let i = 0; i < creationDates.length; i++){
			//fileDateMonthMap.set(format(creationDates[i], 'M.yyyy'),fileDateMonthMap.get(format(creationDates[i], 'M.yyyy'))+1)
			const formattedDate = format(creationDates[i], 'M.yyyy');
			const currentCount = fileDateMonthMap.get(formattedDate);

			if (currentCount !== undefined) {
				fileDateMonthMap.set(formattedDate, currentCount + 1);
			} else {
				// If the key doesn't exist in the map, initialize it with a count of 1
				fileDateMonthMap.set(formattedDate, 1);
			}
		}*/

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

		// build Chart String created
		/*let charStringCreated = ""
		for (const [value] of fileDateMonthMap) {
			charStringCreated = charStringCreated + value + ", "
		}
		charStringCreated = charStringCreated.slice(0,charStringCreated.length-2)*/

		// build Chart String modified
		let charStringModified = ""
		for (const [value] of fileDateMonthMapMod) {
			//console.log(`key: ${key}, value: ${value}`);
			charStringModified = charStringModified + value + ", "
		}
		charStringModified = charStringModified.slice(0,charStringModified.length-2)

		return createChartFormat(yLabel, charStringModified, this.settings.chartReduzierungMonate)
	}

	async decisionIfBadge(newLevel: Promise<boolean>){
		newLevel.then((result: boolean)=> {
			if(result){
				const badge : Badge = getBadgeForLevel(this.settings.statusLevel, false)
				new Notice(`You've earned the "${badge.name}" badge. ${badge.description}`)
				console.log(`You've earned the "${badge.name}" badge. ${badge.description}`)
				//console.log(`badge for level ${this.settings.statusLevel} is ${badge.name} - ${badge.level}`)
				this.giveBadgeInProfile(this.settings.avatarPageName, badge)
				this.settings.badgeBoosterState = false;
				this.settings.badgeBoosterFactor = 1;
				this.saveData(this.settings)
			}
		});
	}


	async removeKeysFromFrontmatter() {
		//const { Vault, TFile } = window.app;
		const { vault } = this.app
		//const vault = Vault.reopen();

		// Get all Markdown files in the vault
		//const markdownFiles = vault.getMarkdownFiles();
		const fileCountMap = await getFileCountMap(this.app, this.settings.tagsExclude, this.settings.folderExclude);
		for (const fileName of fileCountMap.keys()) {
			const files = vault.getFiles();
			const file = files.find(file => file.basename === fileName);
			if (!file) {
				console.warn(`File ${fileName} not found.`);
				continue;
			}
			//const fileContents = await app.vault.read(file);
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
			// new Notice(`Removed specified keys from frontmatter from file \"${fileName}\".`);
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
		const nextBadgeAt = await this.whichLevelNextBadge(this.settings.statusLevel)
		const statusPointsToReach = statusPointsForLevel(nextBadgeAt)
		//console.log(`statusPointsToReach for next Badge: ${statusPointsToReach}`)
		// 50 Notes from Level 1 to 5 to get the first badge.
		// 300 Points in average for a Note.
		const boosterFactor = Math.round((statusPointsToReach - this.settings.statusPoints)/50/300);
		this.settings.badgeBoosterFactor = boosterFactor
		this.settings.badgeBoosterState = true
		await this.saveData(this.settings)
		//console.log(`boosterFaktor: ${boosterFactor}`)
		return boosterFactor
	}

	async openAvatarFile() {
		const existingFile = app.vault.getAbstractFileByPath(`${this.settings.avatarPageName}.md`);
		if (existingFile){
			const sourcePath = this.app.workspace.getActiveFile()?.path || '';
			await app.workspace.openLinkText(existingFile.path, sourcePath);
		} else {
			console.log("File not found or unable to open.");
		}
	}

}


function isSameDay(inputDate: Moment): boolean {
	const currentDate = window.moment(); // Get the current date
	return currentDate.isSame(inputDate, 'day'); // Check if they are the same day
}

function isOneDayBefore(inputDate: Moment): boolean {
	const oneDayBeforeCurrent = window.moment().subtract(1, 'day'); // Calculate one day before current date
	return inputDate.isSame(oneDayBeforeCurrent, 'day');
}




async function createAvatarFile(app: App, fileName: string): Promise<void> {
	//settings: GamificationPluginSettings;
	// Define the file name and content
	//const fileName = 'Avatar - Gamification'; // this.settings.avatarPageName;
	//console.log(`fileName: ${fileName}`)

	const existingFile = app.vault.getAbstractFileByPath(`${fileName}.md`);
	if (existingFile instanceof TFile) {
		console.log(`File ${fileName}.md already exists`);
		return;
	}
	// Create the file in the root of the vault
	await app.vault.create(`${fileName}.md`, avatarInitContent);

}


class MultiSelectModal extends Modal {
    private readonly items: string[];
    private selectedItems: string[] = [];

    constructor(app: App, items: string[]) {
        super(app);
        this.items = items;
    }

    onOpen() {
		const { contentEl } = this;
		contentEl.empty();
	
		const modal = this;  // Store 'this' in a variable
	
		this.items.forEach(item => {
			const checkboxContainer = createCheckbox(item, modal);
			contentEl.appendChild(checkboxContainer);
		});
	
		const submitButton = createSubmitButton(this);
		contentEl.appendChild(submitButton);
	}
	
	

    onClose() {
        this.selectedItems = [];
    }

    getSelectedItems() {
		console.log(`selectedItems: ${this.selectedItems}`)
        return this.selectedItems;
    }

	
}


function createCheckbox(labelText: string, modal: MultiSelectModal) {
    const listItem = document.createElement('li');

    const container = document.createElement('div');
    container.className = 'modal-checkbox-container';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = labelText;
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            modal.getSelectedItems().push(labelText);
        } else {
            //modal.setSelectedItems(modal.getSelectedItems().filter(item => item !== labelText));
        }
    });

    const label = document.createElement('label');
    label.innerText = labelText;

    container.appendChild(checkbox);
    container.appendChild(label);

    listItem.appendChild(container);

    return listItem;
}



/*function createCheckbox(labelText: string) {
    const listItem = document.createElement('li');

    const container = document.createElement('div');
    container.className = 'modal-checkbox-container';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = labelText;
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            this.selectedItems.push(labelText);
        } else {
            this.selectedItems = this.selectedItems.filter(item => item !== labelText);
        }
    });

    const label = document.createElement('label');
    label.innerText = labelText;

    container.appendChild(checkbox);
    container.appendChild(label);

    listItem.appendChild(container);

    return listItem;
}*/






function createSubmitButton(modal: MultiSelectModal): HTMLButtonElement {
    const submitButton = document.createElement('button');
    submitButton.innerText = 'Craft Booster Item';
    submitButton.onclick = () => {
        modal.close();
        const selectedItems = modal.getSelectedItems();
		console.log(`selectedItmes: ${selectedItems}`)
        craftBoosterItem(selectedItems);
    };
    return submitButton;
}

function craftBoosterItem(selectedItems:string[]) {
    console.log('Crafted Item:', selectedItems.join(', '));
}


class ModalBooster extends Modal {
    private readonly displayText: string;

    constructor(app: App, displayText: string) {
        super(app);
        this.displayText = displayText;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.setText(this.displayText);

        // Add a button to open the multi-select modal
        const button = document.createElement('button');
        button.innerText = 'Open Crating Table';
        button.onclick = () => {
            const items = [
                'Whimsical Wisdom Crystals',
                'Curiosity Coins',
                'Eureka Energy Orbs',
                'Serendipity Stars',
                'Creativity Crystals',
                'Discovery Dice',
                'Metaphorical Medals',
                'Curious Cat Companion'
            ];

            const multiSelectModal = new MultiSelectModal(this.app, items);
            multiSelectModal.open();
        };

        contentEl.appendChild(button);
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}


class ModalInformationbox extends Modal {
	private readonly displayText: string; // Store the text to be displayed

	constructor(app: App, displayText: string) {
		super(app);
		this.displayText = displayText; // Store the passed text
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.setText(this.displayText); // Use the stored text
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
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

function rateDirectionForStatusPoints(ratingCurrent: string, ratingNew: number): number {
	let ratingFaktor: number
	if (parseInt(ratingCurrent, 10) < ratingNew){
		ratingFaktor = ratingNew - parseInt(ratingCurrent, 10)
	} else {
		ratingFaktor = 0
	}

	return ratingFaktor
}



  
  




