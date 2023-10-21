import { App, PluginSettingTab, Setting } from 'obsidian';
import gamification from './main';
import type {MomentInput} from 'moment';

export const defaultSettings: Partial<ISettings> = {
  enableInitCommand: true,
  bindEnter: true,
  bindTab: true,
  avatarPageName: 'Avatar - Gamification',
  tagsExclude: '',
  folderExclude: 'Excalidraw',
  progressiveSumLayer2: '==',
  progressiveSumLayer3: '**',
  numAllFiles: 1,
  numAllFilesCount: 0,
  chartReduzierungMonate: 0,
  statusPoints: 0,
  statusLevel: 1,
  xpForNextLevel: 1000,
  gamificationStartDate: '12.08.2023',
  badgeBoosterState: false,
  badgeBoosterFactor: 1,
  debug: false,
  dailyNoteCreationTask: 0,
  dailyNoteCreationDate: '12.08.2023',
  weeklyNoteCreationTask: 0,
  weeklyNoteCreationDate: '12.08.2023',
  nexusNode: 0,
  connectionCrystal: 0,
  masteryScroll: 0,
  insightPrism: 0,
  reflectiveEssence: 0,
  amplificationCrystal: 0,
  creativeCatalyst: 0,
  precisionLens: 0,
  temporalTweaker: 0,
  perpetualProgress: 0,
  strategicSynapses: 0,
  acceleratedAcquisition: 0,
  linkersLode: 0,
  effortlessExpansion: 0,
  recursiveReflection: 0,
  synapticSurge: 0,
  inspirationInfusion: 0,
  titleTitan: 0,
  precisionPrism: 0,
  hyperlinkHarmony: 0,
  ephemeralEuphoria: 0,
  boosterFactorPerpetualProgress: false,
  boosterDatePerpetualProgress: '2023-08-15 20:00:00',
  boosterFactorStrategicSynapses: false,
  boosterDateStrategicSynapses: '2023-08-15 20:00:00',
  boosterFactorLinkersLode: false,
  boosterDateLinkersLode: '2023-08-15 20:00:00',
  boosterFactorRecursiveReflection: false,
  boosterDateRecursiveReflection:'2023-08-15 20:00:00',
  boosterFactorSynapticSurge: false,
  boosterDateSynapticSurge: '2023-08-15 20:00:00',
  boosterFactorTitleTitan: false,
  boosterDateTitleTitan: '2023-08-15 20:00:00',
  boosterFactorPrecisionPrism: false,
  boosterDatePrecisionPrism: '2023-08-15 20:00:00',
  boosterFactorHyperlinkHarmony: false,
  boosterDateHyperlinkHarmony: '2023-08-15 20:00:00',
  boosterFactorEphemeralEuphoria: false,
  boosterDateEphemeralEuphoria: '2022-08-15 20:00:00',
  streakbooster: 0,
  streakboosterDate: false
};

export interface DynamicSettings {
  [key: string]: number | string | boolean;
}

export interface ISettings extends DynamicSettings{
  enableInitCommand: boolean;
  bindEnter: boolean;
  bindTab: boolean;
  avatarPageName: string;
  tagsExclude: string;
  folderExclude: string;
  progressiveSumLayer2: string;
  progressiveSumLayer3: string;
  numAllFiles: number;
  numAllFilesCount: number;
  chartReduzierungMonate: number;
  statusPoints: number;
  statusLevel: number;
  xpForNextLevel: number;
  gamificationStartDate: string;
  badgeBoosterState: boolean;
  badgeBoosterFactor: number;
  debug: boolean;
  dailyNoteCreationTask: number;
  dailyNoteCreationDate: string;
  weeklyNoteCreationTask: number;
  weeklyNoteCreationDate: string;
  streakbooster: number;
  streakboosterDate: boolean;
  nexusNode: number;
  connectionCrystal: number;
  masteryScroll: number;
  insightPrism: number;
  reflectiveEssence: number;
  amplificationCrystal: number;
  creativeCatalyst: number;
  precisionLens: number;
  temporalTweaker: number;
  perpetualProgress: number;
  strategicSynapses: number;
  acceleratedAcquisition: number;
  linkersLode: number;
  effortlessExpansion: number;
  recursiveReflection: number;
  synapticSurge: number;
  inspirationInfusion: number;
  titleTitan: number;
  precisionPrism: number;
  hyperlinkHarmony: number;
  ephemeralEuphoria: number;
  boosterFactorPerpetualProgress: boolean;
  boosterDatePerpetualProgress: string
  boosterFactorStrategicSynapses: boolean;
  boosterDateStrategicSynapses: string;
  boosterFactorLinkersLode: boolean;
  boosterDateLinkersLode: string;
  boosterFactorRecursiveReflection: boolean;
  boosterDateRecursiveReflection: string;
  boosterFactorSynapticSurge: boolean;
  boosterDateSynapticSurge: string;
  boosterFactorTitleTitan: boolean;
  boosterDateTitleTitan: string
  boosterFactorPrecisionPrism: boolean;
  boosterDatePrecisionPrism: string
  boosterFactorHyperlinkHarmony: boolean;
  boosterDateHyperlinkHarmony: string;
  boosterFactorEphemeralEuphoria: boolean;
  boosterDateEphemeralEuphoria: string;
  //[key: string]: number | string | boolean | MomentInput;
}


export class GamificationPluginSettings extends PluginSettingTab {
	private readonly plugin: gamification;
  public settings: ISettings;
  
  public enableInitCommand: boolean;
  public bindEnter: boolean;
  public bindTab: boolean;
  public avatarPageName: string;
  public tagsExclude: string;
  public folderExclude: string;
  public progressiveSumLayer2: string;
  public progressiveSumLayer3: string;
  public numAllFiles: number;
  public numAllFilesCount: number;
  public chartReduzierungMonate: number;
  public statusPoints: number;
  public statusLevel: number;
  public xpForNextLevel: number;
  public gamificationStartDate: string;
  public badgeBoosterState: boolean;
  public badgeBoosterFactor: number;
  public debug: boolean;
  public dailyNoteCreationTask: number;
  public dailyNoteCreationDate: string;
  public weeklyNoteCreationTask: number;
  public weeklyNoteCreationDate: string;
  public streakbooster: number;
  public streakboosterDate: boolean;
  public nexusNode: number;
  public connectionCrystal: number;
  public masteryScroll: number;
  public insightPrism: number;
  public reflectiveEssence: number;
  public amplificationCrystal: number;
  public creativeCatalyst: number;
  public precisionLens: number;
  public temporalTweaker: number;
  public perpetualProgress: number;
  public strategicSynapses: number;
  public acceleratedAcquisition: number;
  public linkersLode: number;
  public effortlessExpansion: number;
  public recursiveReflection: number;
  public synapticSurge: number;
  public inspirationInfusion: number;
  public titleTitan: number;
  public precisionPrism: number;
  public hyperlinkHarmony: number;
  public ephemeralEuphoria: number;
  public boosterFactorPerpetualProgress: boolean;
  public boosterDatePerpetualProgress: string
  public boosterFactorStrategicSynapses: boolean;
  public boosterDateStrategicSynapses: string
  public boosterFactorLinkersLode: boolean;
  public boosterDateLinkersLode: string
  public boosterFactorRecursiveReflection: boolean;
  public boosterDateRecursiveReflection: string
  public boosterFactorSynapticSurge: boolean;
  public boosterDateSynapticSurge: string
  public boosterFactorTitleTitan: boolean;
  public boosterDateTitleTitan: string
  public boosterFactorPrecisionPrism: boolean;
  public boosterDatePrecisionPrism: string
  public boosterFactorHyperlinkHarmony: boolean;
  public boosterDateHyperlinkHarmony: string;
  public boosterFactorEphemeralEuphoria: boolean;
  public boosterDateEphemeralEuphoria: string;

	constructor(app: App, plugin: gamification) {
	  super(app, plugin);
	  this.plugin = plugin;
	}
  
	public display(): void {
		const { containerEl } = this;
		containerEl.addClass("excalidraw-settings");
		this.containerEl.empty();

		const coffeeDiv = containerEl.createDiv("coffee");
		coffeeDiv.addClass("ex-coffee-div");
		const coffeeLink = coffeeDiv.createEl("a", {
		href: "https://ko-fi.com/andreastrebing",
		});
		const coffeeImg = coffeeLink.createEl("img", {
		attr: {
			src: "https://cdn.ko-fi.com/cdn/kofi3.png?v=3",
		},
		});
		coffeeImg.height = 45;

		//const { containerEl } = this;
		//containerEl.empty();
  
		containerEl.createEl('h2', { text: 'Gamify your PKM - Settings' });
		console.log('settings called')
		new Setting(containerEl)
			.setName('#tags to ignore')
			.setDesc('enter tags without # and separate with ", ".\nInclude nested tags.')
			.addText(text => text
				.setPlaceholder('Enter your tag1, tag2/subtag, …')
				.setValue(this.plugin.settings.tagsExclude)
				.onChange(async (value) => {
					this.plugin.settings.tagsExclude = value;
					await this.plugin.saveSettings();
				}));

				
		new Setting(containerEl)
			.setName('folder to ignore')
			.setDesc('enter folder whichs content shall be ignored. Separate with ", ".')
			.addText(text => text
				.setPlaceholder('Enter your folder1, folder2, …')
				.setValue(this.plugin.settings.folderExclude)
				.onChange(async (value) => {
					// console.log('folder to exclude: ' + value);
					this.plugin.settings.folderExclude = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Profile Page Name')
			.setDesc('you can change here the name of your profile page if you like.')
			.addText(text => text
					.setPlaceholder('name')
					.setValue(this.plugin.settings.avatarPageName)
					.onChange(async (value) => {
						// console.log('folder to exclude: ' + value);
						this.plugin.settings.avatarPageName = value;
						await this.plugin.saveSettings();
				}));
				
    containerEl.createEl('h2', { text: 'Other Settings' });
		new Setting(containerEl)
			.setName('Disable Init Command')
			.setDesc('you can remove the init command from command prompt by switching off.\nrestart needed.')
			.addToggle((toggle) => 
				toggle
          		.setValue(this.plugin.settings.enableInitCommand)
        			.onChange((value) => {
            			this.plugin.settings.enableInitCommand = value;
            			this.plugin.saveData(this.plugin.settings);
          			}),
			);

		
		new Setting(containerEl)
			.setName('limit the visible month in the chart on your avatar page: ' + this.plugin.settings.avatarPageName)
			.setDesc('if 0, all month will be shown. Enter a number how many month shall be shown.')
			.addText(text => text
					.setPlaceholder('Number of Month to show')
					.setValue(this.plugin.settings.chartReduzierungMonate.toString())
					.onChange(async (value) => {
						this.plugin.settings.chartReduzierungMonate = parseInt(value);
						await this.plugin.saveSettings();
				}));

  

		new Setting(containerEl)
			.setName('Progressive Summarization')
			.setDesc('you can change which formatting you use for Layer 2 and 3.')
			.addText(text => text
					.setPlaceholder('Layer 2 is usually **')
					.setValue(this.plugin.settings.progressiveSumLayer2)
					.onChange(async (value) => {
						// console.log('folder to exclude: ' + value);
						this.plugin.settings.progressiveSumLayer2 = value;
						await this.plugin.saveSettings();
				}))
			.addText(text => text
					.setPlaceholder('Layer 3 is usually ==')
					.setValue(this.plugin.settings.progressiveSumLayer3)
					.onChange(async (value) => {
						// console.log('folder to exclude: ' + value);
						this.plugin.settings.progressiveSumLayer3 = value;
						await this.plugin.saveSettings();
			}));

	}
  }