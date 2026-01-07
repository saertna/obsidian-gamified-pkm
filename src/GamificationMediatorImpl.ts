import { GamificationMediator } from './GamificationMediator';
import {decryptBoolean, decryptNumber, decryptString, encryptBoolean, encryptNumber, encryptString} from "./encryption";
import {Badge} from "./badges";
import {debugLogs, elements, listOfUseableIngredientsToBeShown, mil2sec, IngredientElement} from "./constants";
import {Notice} from 'obsidian';
import {concatenateStrings} from "./Utils";
import {defaultSettings} from "./settings";
import gamification from "./main";
import { createEarnedIngredientHtml } from './ui/noticeUtils';
import { resourceSvgMap } from './resourceIcons';


export class GamificationMediatorImpl implements GamificationMediator {
	private settings: any;
	private plugin: gamification;
	public resourceSvgMap: Record<string, string>;

	constructor(settings: any, plugin: gamification) {
		this.settings = settings;
		this.plugin = plugin;
		this.resourceSvgMap = resourceSvgMap;
	}

	closeProfileView(){
		this.plugin.closeProfileView();
	}

	updateProfileLeaf() {
		this.plugin.actualizeProfileLeaf();
	}

	updateProfileLeafPic() {
		this.plugin.profileLeafUpdatePicture();
	}

	updateChartWeeklyColorReceived(value: string){
		this.plugin.updateChartWeeklyColorReceived(value);
	}

	updateChartWeeklyColorToGo(value: string){
		this.plugin.updateChartWeeklyColorToGo(value);
	}

	getSettingString(key: string): string {
		const decryptedValue = this.settings[key] !== undefined ? this.settings[key].toString() : ''
		//if(debugLogs) console.debug(`String: decrypted ${key} is ${decryptString(decryptedValue)}`)
		return decryptString(decryptedValue);
	}

	getSettingNumber(key: string) {
		const decryptedValue = this.settings[key] !== undefined ? this.settings[key].toString() : ''
		//if(debugLogs) console.debug(`Number: decrypted ${key} is ${decryptNumber(decryptedValue)}`)
		return decryptNumber(decryptedValue);
	}

	getSettingBoolean(key: string) {
		const decryptedValue = this.settings[key] !== undefined ? this.settings[key].toString() : ''
		//if(debugLogs) console.debug(`Boolean: decrypted ${key} is ${decryptBoolean(decryptedValue)}`)
		return decryptBoolean(decryptedValue);
	}


	setSettingString(key: string, value: string) {
		// Set a specific setting
		this.settings[key] = encryptString(value);
		this.saveSettings();
	}

	setBadgeSave(newBadge: Badge, date: string, level: string){
		const currentBadgeString:string = this.getSettingString('receivedBadges');
		if(debugLogs) console.log(`currentBadgeString: ${currentBadgeString}`)
		const newBadgeString = currentBadgeString + newBadge.name + ',' + date + ',' + level + '##';
		//window.moment().format('YYYY-MM-DD') + ',' + this.getSettingNumber('statusLevel') + '\n';
		if(debugLogs) console.log(`newBadgeString: ${newBadgeString}`)
		this.setSettingString('receivedBadges',newBadgeString);
		this.saveSettings();
	}


	setSettingNumber(key: string, value: number) {
		// Set a specific setting
		this.settings[key] = encryptNumber(value);
		this.saveSettings();
	}


	setSettingBoolean(key: string, value: boolean) {
		// Set a specific setting
		this.settings[key] = encryptBoolean(value);
		this.saveSettings();
	}

	async saveSettings(): Promise<void> {
		await this.plugin.saveData(this.settings);
	}

	async loadSettings() {
		this.settings = Object.assign({}, defaultSettings, await this.plugin.loadData());
		if(debugLogs) console.debug('loadSettings()')
	}

	async acquireIngredients(chance:number, min:number, max:number) {
		const earnedIngredientCounts = new Map<string, { ingredient: IngredientElement, count: number }>();
		let anyIngredientEarned = false;

		const minNoticeDurationSeconds = 4; // seconds
		const userConfiguredDuration = this.getSettingNumber('timeShowNotice');
		const actualNoticeDurationMs = Math.max(userConfiguredDuration, minNoticeDurationSeconds) * mil2sec;

		if (Math.random() < chance) {
			const randomAmount = this.getRandomInt(min,max);
			if (randomAmount > 0) {
				anyIngredientEarned = true;
			}

			for (let i=1;i<=randomAmount;i++){
				const randomIngredientIndex = this.getRandomInt(0, listOfUseableIngredientsToBeShown.length-1);
				const earnedIngredient = elements[randomIngredientIndex];
				const elementCount = this.getSettingNumber(earnedIngredient.varName);

				if (earnedIngredientCounts.has(earnedIngredient.name)) {
					earnedIngredientCounts.get(earnedIngredient.name)!.count++;
				} else {
					earnedIngredientCounts.set(earnedIngredient.name, { ingredient: earnedIngredient, count: 1 });
				}

				if (elementCount !== null) {
					this.setSettingNumber(earnedIngredient.varName, elementCount + 1);
				} else {
					console.error(`Invalid element count for ${earnedIngredient.varName}`);
				}
			}
			await this.saveSettings();

			if (anyIngredientEarned) {
				const uniqueEarnedIngredients = Array.from(earnedIngredientCounts.values());

				// Construct the HTML message for the Notice
				const messageFragment = document.createDocumentFragment();
				messageFragment.appendChild(document.createTextNode('You earned:\n'));

				uniqueEarnedIngredients.forEach((item, index) => {
					const ingredientHtml = createEarnedIngredientHtml(item.ingredient, item.count);
					messageFragment.appendChild(ingredientHtml);
					if (index < uniqueEarnedIngredients.length - 1) {
						messageFragment.appendChild(document.createTextNode('\n'));
					}
				});

				if(debugLogs) console.debug(`You earned: ${uniqueEarnedIngredients.map(item => `${item.ingredient.name} x${item.count}`).join(', ')}`);
				new Notice(messageFragment, actualNoticeDurationMs);
			} else {
				new Notice(`You didn't find any ingredients this time, but better luck next time!`, this.getSettingNumber('timeShowNotice') * mil2sec);
				if(debugLogs) console.debug('You did not earn an ingredient this time (random amount was 0).');
			}
		} else {
			new Notice(`This time you didn't earn an ingredient.`,this.getSettingNumber('timeShowNotice') * mil2sec)
			if(debugLogs) console.debug('You did not earn an ingredient this time.');
		}
	}

	getRandomInt(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

}
