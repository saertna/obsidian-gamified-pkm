import { App, PluginSettingTab, Setting } from 'obsidian';
import gamification from './main';

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
};

export interface ISettings {
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
}


export class GamificationPluginSettings extends PluginSettingTab {
	private readonly plugin: gamification;
  
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