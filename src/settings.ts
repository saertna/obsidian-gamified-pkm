import { App, PluginSettingTab, Setting } from 'obsidian';
import gamification from './main';
import type {MomentInput} from 'moment';
import { encryptValue, encryptString, decryptString, encryptNumber, decryptNumber, encryptBoolean, decryptBoolean } from 'encryption';

export const defaultSettings: Partial<ISettings> = {
  enableInitCommand: "U2FsdGVkX1+7lWe/h95uqzgl27JBGW2iki7sBwk44YQ=",
  bindEnter: "U2FsdGVkX18RzGkyLEaTSnYuglT9lfhjvsi1mmI8BLo=",
  bindTab: "U2FsdGVkX18hvqMohlkOlQWRrDXthNh0Y6iIU31+fgM=",
  avatarPageName: "U2FsdGVkX19tx7HOhFe//jFZyT7M8iP/57yVK108QS6jyjHSUe6mc5Wqzpt2vdiQ",
  tagsExclude: "U2FsdGVkX1/1DDLTq+emYSwMYdTdLfZtFMEy+v+2lTM=",
  folderExclude: "U2FsdGVkX18h451OSiDtzWciseuXbr1aiod52D/Zthw=",
  progressiveSumLayer2: "U2FsdGVkX18CY7oxtyIPF7Be0q+Dsqh4uF42CZ9b+sw=",
  progressiveSumLayer3: "U2FsdGVkX1+JdwScrMUelt1ay2X2gKm+pjwjIfoeQVU=",
  numAllFiles: "U2FsdGVkX19++peid8UuEoUaRBuVZ57oNlmyBRDXgyQ=",
  numAllFilesCount: "U2FsdGVkX197NvA1/++DqTNGdBenzqKkxolb82XlHUE=",
  chartReduzierungMonate: "U2FsdGVkX1+iuJzyKJMnwYqJkkDD/qMMOhfF6gIT0r4=",
  statusPoints: "U2FsdGVkX19q1aAW1mbu07SLecx4hhLoGuU2xsOYLQo=",
  statusLevel: "U2FsdGVkX1+mrW9/+xmKESLksN/U8suua6whHcompmc=",
  xpForNextLevel: "U2FsdGVkX198I4j+ZJHYvW39SLG8f9rtQELYITZ+jw0=",
  gamificationStartDate: "U2FsdGVkX1/iQSlDZzeISa2rUzwbueZhL88bjrwwqgA=",
  badgeBoosterState: "U2FsdGVkX1+e6QXU8Y1jXfe0FnbkvnHh1bVvi1A5euI=",
  badgeBoosterFactor: "U2FsdGVkX1/gq8KlX95Wa4N9wIddrk855KCdTprCGLM=",
  debug: "U2FsdGVkX1+ThRKdv5UnXteNWll21exiEj5bVw+Zq0g=",
  dailyNoteCreationTask: "U2FsdGVkX1/hAj1ZZ9VK0nFlJh+m/r8B3Lrg2tQoPi4=",
  dailyNoteCreationDate: "U2FsdGVkX195v33EhTQvoQtR2/xfbC2Iag2Ly1UFSj8=",
  weeklyNoteCreationTask: "U2FsdGVkX1/MYfi0r0Btn2J7PmdQcWodJawC/uZAUSQ=",
  weeklyNoteCreationDate: "U2FsdGVkX18OX530OPOaURg/bv8xrM17hE0Y6641e30=",
  nexusNode: "U2FsdGVkX1+5+wg6OjOxBUvEe5w/SU0grvCLIshU/9s=",
  connectionCrystal: "U2FsdGVkX19SFmrQpmHJwAeiB/w1zUwmN3nOvfbfs8c=",
  masteryScroll: "U2FsdGVkX18Kw0rp3b/nkINNN3SpqvweJVE/rATCHtM=",
  insightPrism: "U2FsdGVkX1++HZ/2hGH+6N2troq6QLeUeEMO26tAcfI=",
  reflectiveEssence: "U2FsdGVkX19Z7F2Gh8bZXvDd7N18l1w+HbcJk0gfWA0=",
  amplificationCrystal: "U2FsdGVkX18yMidug9zA9AWEmHMGg9AZgeI7eZ+AXek=",
  creativeCatalyst: "U2FsdGVkX19VtBhRyx6pV/JbEkInmpgcWc14KAnRQDY=",
  precisionLens: "U2FsdGVkX18sNsXFgyqFUoCWskfyNB8PIDGaLWLloNA=",
  temporalTweaker: "U2FsdGVkX19gEZkMGrC9WfDXQJ1dXBTpGVV7FsgqL6c=",
  perpetualProgress: "U2FsdGVkX1+3G/oVNviHJFRqFMB4BsPOCQ4Idrf/17I=",
  strategicSynapses: "U2FsdGVkX1/BrFIepvBEWHDzGyTz5YsLOM2YVrewH4c=",
  acceleratedAcquisition: "U2FsdGVkX19Zh7lhInuLpVfmTyEkk/67rXJ3QCiIN0g=",
  linkersLode: "U2FsdGVkX19xaY2GD0sqSMMf9Yd7bocbKhI10xh5mE8=",
  effortlessExpansion: "U2FsdGVkX1+qXEn+UxHss4I14IjhiALGWPRbLkVdjQQ=",
  recursiveReflection: "U2FsdGVkX1/Gmt0ZFIV1dbgEVhV1ZWgYUD6y2nynX7o=",
  synapticSurge: "U2FsdGVkX18+ooWXF9paTPTKOFyR2X4G9MA4lU+lYbI=",
  inspirationInfusion: "U2FsdGVkX18nz7ETr6ySHiO0ZmEB/WrazgNilPnlKkQ=",
  titleTitan: "U2FsdGVkX1/IMkDcmc8A20Uv9ifppYH5tyVKOaMagEY=",
  precisionPrism: "U2FsdGVkX1+72YwT/XdQzbpOLwA9ltJY8a+3GWB+IkQ=",
  hyperlinkHarmony: "U2FsdGVkX191lYd3kaeLOKdWTo9GllDL25tN36zPYxE=",
  ephemeralEuphoria: "U2FsdGVkX1+ijNputHqHW5gK0frfmswGx7EUdaHxjnk=",
  fortuneInfusion: "U2FsdGVkX1+ijNputHqHW5gK0frfmswGx7EUdaHxjnk=",
  boosterFactorPerpetualProgress: "U2FsdGVkX19/Fss2X+hd+w6ZmI5yNJcuUWA+ImrOGmg=",
  boosterDatePerpetualProgress: "U2FsdGVkX1+RQltOMLx9axaYLmqyGEU9q2EJ6aFkRyvnCWTShMLGhyFmYzT35BaY",
  boosterFactorStrategicSynapses: "U2FsdGVkX18575mGIVSjGk/qJposIrfRUy+v/Cs8dK0=",
  boosterDateStrategicSynapses: "U2FsdGVkX1/T9U0yB5j6ibGAvV8RKrcrjZrKtygKgrhhy/sPmkRzj0LHU0FzqhDG",
  boosterFactorLinkersLode: "U2FsdGVkX1/JDUUUoTFpuDi548f2Nw8MJ+kFwD7lK9s=",
  boosterDateLinkersLode: "U2FsdGVkX1+1jYOChIfzGgtJ8+CYCN41Qnrujq/tmeBpUVrZI/XX+Izuhc7SWCJw",
  boosterFactorRecursiveReflection: "U2FsdGVkX1+tRjjR8AI/6D0EauMuA9vRZ2mhjxdyRH4=",
  boosterDateRecursiveReflection: "U2FsdGVkX1+ntCAllKE7umlYpfLgi6KtRB1O9iIutU2MPIDqHfnh6bx/q9KYtff7",
  boosterFactorSynapticSurge: "U2FsdGVkX19IbcaQ97T2TGNdFr1ftvq9+6gltahvc5Q=",
  boosterDateSynapticSurge: "U2FsdGVkX18IPK2hUqT98pqhjle4ubA7nJlgJ9ZhK/r8N9xzje3oyMcNCw4OGL9F",
  boosterFactorTitleTitan: "U2FsdGVkX18GwzghTQZSY0ZudqWBwCMIk3OMT7chsLM=",
  boosterDateTitleTitan: "U2FsdGVkX19JJyIYYraGdEfbK6CGaGUL9TtlH8bzpJ5mLK+Wr1pgfQqvWCBBLJVo",
  boosterFactorPrecisionPrism: "U2FsdGVkX1+NMV80rm7GA53C6whlwKdSxCAiNmbeECs=",
  boosterDatePrecisionPrism: "U2FsdGVkX18OwTBbWqLLFPE4CwWAFHbjA050EzAa/O77pH0RCXhVXyvfQUN0f+Yi",
  boosterFactorHyperlinkHarmony: "U2FsdGVkX1/G9+A9JIpqpqBbGDCzhITDzbD9VU30gOQ=",
  boosterDateHyperlinkHarmony: "U2FsdGVkX1+qUnz6LN+9w8gDvpVPPOmgy3BNAOa/mm1OwjUaVX05LqorO2wrXLho",
  boosterFactorEphemeralEuphoria: "U2FsdGVkX1+pxM+VURwTAj8eAAGOsb2ERuh1Lh7ZLnE=",
  boosterDateEphemeralEuphoria: "U2FsdGVkX19pJpw2a3f0SvfpjfUS7z9MlPAuqASwQFJBLjWjyHUj5qYGfN6rb/SY",
  boosterFactorFortuneInfusion: "U2FsdGVkX1+pxM+VURwTAj8eAAGOsb2ERuh1Lh7ZLnE=",
  boosterDateFortuneInfusion: "U2FsdGVkX19pJpw2a3f0SvfpjfUS7z9MlPAuqASwQFJBLjWjyHUj5qYGfN6rb/SY",
  streakbooster: "U2FsdGVkX1/lU8z1269GCh/eAbXcmvMeI8MyfL7nzEI=",
  streakboosterDate: "U2FsdGVkX1+DBUBmrzXuSiZlRp1jO9/UJv8sTTfeSNI=",
  boosterUseCount: "U2FsdGVkX1/VWmniuhXR6FAx6PTBe9NS+tCv9XbK32Q=",
  boosterUseCountTemporalTweaker: "U2FsdGVkX1/r2JjeQiWJArz03En3WZO2MecJZ4KA/U8=",
  boosterUseCountPerpetualProgress: "U2FsdGVkX19mSQeU3SjWhwKUV8GSLHCNudf0Va+k/fM=",
  boosterUseCountStrategicSynapses: "U2FsdGVkX1+UVz9evvy+9VJbfufBy5Mv00A9OWGo3M8=",
  boosterUseCountAcceleratedAcquisition: "U2FsdGVkX1+6INJ1upXkyApU2t0oUX6Gm33yStXTsGM=",
  boosterUseCountLinkersLode: "U2FsdGVkX1/PqKkLgWb+qSm+MEYScKaN9dc/2O1NIA4=",
  boosterUseCountEffortlessExpansion: "U2FsdGVkX18tZ1UMsNevgp15doSbDNgb1iBVPCsojmk=",
  boosterUseCountrEcursiveReflection: "U2FsdGVkX1/cRMNf0xd92ddkyEikcfZT80KpSV2reXo=",
  boosterUseCountSynapticSurge: "U2FsdGVkX19aUtz8wGpSpuK6PV1rlJqA947SCgGrrnY=",
  boosterUseCountInspirationInfusion: "U2FsdGVkX1/1FifR678wktsWCIAOauzON9hVqMeGiek=",
  boosterUseCountTitleTitan: "U2FsdGVkX18J9uTJ25ZVaqnEMsZ/Dn1UQzN7DMvN0ug=",
  boosterUseCountPrecisionPrism: "U2FsdGVkX18/kncuSG4klFZ6LpDHkp80wmp2U0knrr4=",
  boosterUseCountHyperlinkHarmony: "U2FsdGVkX1+R4fU/oDIdb34kCIedxc4165PX3oOnCLc=",
  boosterUseCountEphemeralEuphoria: "U2FsdGVkX191hJANYr8JHI1bn1YRrJfBh0cQ0vgkKRM=",
  boosterUseCountFortuneInfusion: "U2FsdGVkX191hJANYr8JHI1bn1YRrJfBh0cQ0vgkKRM=",
  counterMajurityCalc: "U2FsdGVkX19TLndonGY4Y8vHuZFfLJ5gZ2t/CLprh0o=",
  counterMajurityCalcInitial: "U2FsdGVkX1+2Qii8qhFSqrNqmKR1Wh6saEjYbwPdi8Q=",
  delayLoadTime: "U2FsdGVkX19TLndonGY4Y8vHuZFfLJ5gZ2t/CLprh0o=",
  timeShowNotice: "U2FsdGVkX190u8cOsylOs1cQ8MeZFq+i+Wv4ox6qq0k="
};

export interface DynamicSettings {
  [key: string]: number | string | boolean;
}

export interface ISettings extends DynamicSettings{
  enableInitCommand: string;
  bindEnter: string;
  bindTab: string;
  avatarPageName: string;
  tagsExclude: string;
  folderExclude: string;
  progressiveSumLayer2: string;
  progressiveSumLayer3: string;
  numAllFiles: string;
  numAllFilesCount: string;
  chartReduzierungMonate: string;
  statusPoints: string;
  statusLevel: string;
  xpForNextLevel: string;
  gamificationStartDate: string;
  badgeBoosterState: string;
  badgeBoosterFactor: string;
  debug: string;
  dailyNoteCreationTask: string;
  dailyNoteCreationDate: string;
  weeklyNoteCreationTask: string;
  weeklyNoteCreationDate: string;
  streakbooster: string;
  streakboosterDate: string;
  nexusNode: string;
  connectionCrystal: string;
  masteryScroll: string;
  insightPrism: string;
  reflectiveEssence: string;
  amplificationCrystal: string;
  creativeCatalyst: string;
  precisionLens: string;
  temporalTweaker: string;
  perpetualProgress: string;
  strategicSynapses: string;
  acceleratedAcquisition: string;
  linkersLode: string;
  effortlessExpansion: string;
  recursiveReflection: string;
  synapticSurge: string;
  inspirationInfusion: string;
  titleTitan: string;
  precisionPrism: string;
  hyperlinkHarmony: string;
  ephemeralEuphoria: string;
  boosterFactorPerpetualProgress: string;
  boosterDatePerpetualProgress: string
  boosterFactorStrategicSynapses: string;
  boosterDateStrategicSynapses: string;
  boosterFactorLinkersLode: string;
  boosterDateLinkersLode: string;
  boosterFactorRecursiveReflection: string;
  boosterDateRecursiveReflection: string;
  boosterFactorSynapticSurge: string;
  boosterDateSynapticSurge: string;
  boosterFactorTitleTitan: string;
  boosterDateTitleTitan: string
  boosterFactorPrecisionPrism: string;
  boosterDatePrecisionPrism: string
  boosterFactorHyperlinkHarmony: string;
  boosterDateHyperlinkHarmony: string;
  boosterFactorEphemeralEuphoria: string;
  boosterDateEphemeralEuphoria: string;
  boosterUseCount: string;
  boosterUseCountTemporalTweaker: string;
  boosterUseCountPerpetualProgress: string;
  boosterUseCountStrategicSynapses: string;
  boosterUseCountAcceleratedAcquisition: string;
  boosterUseCountLinkersLode: string;
  boosterUseCountEffortlessExpansion: string;
  boosterUseCountrEcursiveReflection: string;
  boosterUseCountSynapticSurge: string;
  boosterUseCountInspirationInfusion: string;
  boosterUseCountTitleTitan: string;
  boosterUseCountPrecisionPrism: string;
  boosterUseCountHyperlinkHarmony: string;
  boosterUseCountEphemeralEuphoria: string;
  counterMajurityCalc: string;
  counterMajurityCalcInitial: string;
  delayLoadTime: string;
  timeShowNotice: string
  //[key: string]: number | string | boolean | MomentInput;
}


export class GamificationPluginSettings extends PluginSettingTab {
	private readonly plugin: gamification;
  public settings: ISettings;
  public enableInitCommand: string;
  public bindEnter: string;
  public bindTab: string;
  public avatarPageName: string;
  public tagsExclude: string;
  public folderExclude: string;
  public progressiveSumLayer2: string;
  public progressiveSumLayer3: string;
  public numAllFiles: string;
  public numAllFilesCount: string;
  public chartReduzierungMonate: string;
  public statusPoints: string;
  public statusLevel: string;
  public xpForNextLevel: string;
  public gamificationStartDate: string;
  public badgeBoosterState: string;
  public badgeBoosterFactor: string;
  public debug: string;
  public dailyNoteCreationTask: string;
  public dailyNoteCreationDate: string;
  public weeklyNoteCreationTask: string;
  public weeklyNoteCreationDate: string;
  public streakbooster: string;
  public streakboosterDate: string;
  public nexusNode: string;
  public connectionCrystal: string;
  public masteryScroll: string;
  public insightPrism: string;
  public reflectiveEssence: string;
  public amplificationCrystal: string;
  public creativeCatalyst: string;
  public precisionLens: string;
  public temporalTweaker: string;
  public perpetualProgress: string;
  public strategicSynapses: string;
  public acceleratedAcquisition: string;
  public linkersLode: string;
  public effortlessExpansion: string;
  public recursiveReflection: string;
  public synapticSurge: string;
  public inspirationInfusion: string;
  public titleTitan: string;
  public precisionPrism: string;
  public hyperlinkHarmony: string;
  public ephemeralEuphoria: string;
  public boosterFactorPerpetualProgress: string;
  public boosterDatePerpetualProgress: string
  public boosterFactorStrategicSynapses: string;
  public boosterDateStrategicSynapses: string
  public boosterFactorLinkersLode: string;
  public boosterDateLinkersLode: string
  public boosterFactorRecursiveReflection: string;
  public boosterDateRecursiveReflection: string
  public boosterFactorSynapticSurge: string;
  public boosterDateSynapticSurge: string
  public boosterFactorTitleTitan: string;
  public boosterDateTitleTitan: string
  public boosterFactorPrecisionPrism: string;
  public boosterDatePrecisionPrism: string
  public boosterFactorHyperlinkHarmony: string;
  public boosterDateHyperlinkHarmony: string;
  public boosterFactorEphemeralEuphoria: string;
  public boosterDateEphemeralEuphoria: string;
  public boosterUseCount: string;
  public boosterUseCountTemporalTweaker: string;
  public boosterUseCountPerpetualProgress: string;
  public boosterUseCountStrategicSynapses: string;
  public boosterUseCountAcceleratedAcquisition: string;
  public boosterUseCountLinkersLode: string;
  public boosterUseCountEffortlessExpansion: string;
  public boosterUseCountrEcursiveReflection: string;
  public boosterUseCountSynapticSurge: string;
  public boosterUseCountInspirationInfusion: string;
  public boosterUseCountTitleTitan: string;
  public boosterUseCountPrecisionPrism: string;
  public boosterUseCountHyperlinkHarmony: string;
  public boosterUseCountEphemeralEuphoria: string;
  public counterMajurityCalc: string;
  public counterMajurityCalcInitial: string;
  public delayLoadTime: string;
  public timeShowNotice: string;

	constructor(app: App, plugin: gamification) {
	  super(app, plugin);
	  this.plugin = plugin;

    let settings = Object.assign({}, defaultSettings);

    /*
    for (const key in settings) {
      if (settings.hasOwnProperty(key)) {
        if(typeof key === 'number'){
          settings[key] = encryptNumber(settings[key] as number)
        } else if (typeof key === 'string'){
          settings[key] = encryptString(settings[key] as string)
        } else if (typeof key === 'boolean'){
          settings[key] = encryptBoolean(settings[key] as boolean)
        }
      }
    }
*/
    // Save `settings` with encrypted values to your storage

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
				//.setValue(this.plugin.settings.tagsExclude)
        .setValue(decryptString(this.plugin.settings.tagsExclude))
				.onChange(async (value) => {
					this.plugin.settings.tagsExclude = encryptString(value);
					await this.plugin.saveSettings();
				}));

				
		new Setting(containerEl)
			.setName('folder to ignore')
			.setDesc('enter folder whichs content shall be ignored. Separate with ", ".')
			.addText(text => text
				.setPlaceholder('Enter your folder1, folder2, …')
				//.setValue(this.plugin.settings.folderExclude)
        .setValue(decryptString(this.plugin.settings.folderExclude))
				.onChange(async (value) => {
					// console.log('folder to exclude: ' + value);
					this.plugin.settings.folderExclude = encryptString(value);
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Profile Page Name')
			.setDesc('you can change here the name of your profile page if you like.')
			.addText(text => text
					.setPlaceholder('name')
					//.setValue(this.plugin.settings.avatarPageName)
          .setValue(decryptString(this.plugin.settings.avatarPageName))
					.onChange(async (value) => {
						// console.log('folder to exclude: ' + value);
						this.plugin.settings.avatarPageName = encryptString(value);
						await this.plugin.saveSettings();
				}));
				
    containerEl.createEl('h2', { text: 'Other Settings' });
		new Setting(containerEl)
			.setName('Disable Init Command')
			.setDesc('you can remove the init command from command prompt by switching off.\nrestart needed.')
			.addToggle((toggle) => 
				toggle
          		.setValue(decryptBoolean(this.plugin.settings.enableInitCommand))
        			.onChange((value) => {
            			this.plugin.settings.enableInitCommand = encryptBoolean(value);
            			this.plugin.saveData(this.plugin.settings);
          			}),
			);

  
    new Setting(containerEl)
			.setName('Delay Settings at startup')
			.setDesc('Enter in seconds to delay the load time. e.g. when GIT pull is performed before and settings get merge conflicts. Without GIT usage, keep it to 0.')
			.addText(text => text
					.setPlaceholder('0')
					.setValue(decryptNumber(this.plugin.settings.delayLoadTime).toString())
          //.setValue("0")
					.onChange(async (value) => {
						this.plugin.settings.delayLoadTime = encryptNumber(parseInt(value));
						await this.plugin.saveSettings();
		}));

    new Setting(containerEl)
			.setName('Time how long Notices are shown')
			.setDesc('Enter in seconds. 4 seconds or more is a good value')
			.addText(text => text
					.setPlaceholder('4')
					.setValue(decryptNumber(this.plugin.settings.timeShowNotice).toString())
          .onChange(async (value) => {
						this.plugin.settings.timeShowNotice = encryptNumber(parseInt(value));
						await this.plugin.saveSettings();
		}));

		new Setting(containerEl)
			.setName('Progressive Summarization')
			.setDesc('you can change which formatting you use for Layer 2 and 3.')
			.addText(text => text
					.setPlaceholder('Layer 2 is usually **')
					.setValue(decryptString(this.plugin.settings.progressiveSumLayer2))
					.onChange(async (value) => {
						// console.log('folder to exclude: ' + value);
						this.plugin.settings.progressiveSumLayer2 = encryptString(value);
						await this.plugin.saveSettings();
				}))
			.addText(text => text
					.setPlaceholder('Layer 3 is usually ==')
					.setValue(decryptString(this.plugin.settings.progressiveSumLayer3))
					.onChange(async (value) => {
						// console.log('folder to exclude: ' + value);
						this.plugin.settings.progressiveSumLayer3 = encryptString(value);
						await this.plugin.saveSettings();
			}));

	}
  }