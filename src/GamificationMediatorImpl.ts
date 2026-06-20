import { GamificationMediator } from './GamificationMediator';
import {decryptBoolean, decryptNumber, decryptString, encryptBoolean, encryptNumber, encryptString} from "./encryption";
import {Badge} from "./badges";
import {debugLogs, elements, listOfUseableIngredientsToBeShown, mil2sec, IngredientElement} from "./data/constants";
import {Notice} from 'obsidian';
//import {concatenateStrings} from "./Utils";
import {defaultSettings, ISettings } from "./settings";
import gamification from "./main";
import { createEarnedIngredientHtml } from './ui/noticeUtils';
import { resourceSvgMap } from './data/resourceIcons';


export class GamificationMediatorImpl implements GamificationMediator {
	private settings: ISettings;
	private plugin: gamification;
	public resourceSvgMap: Record<string, string>;
	private remainingStock: Record<string, number> = {};

	constructor(settings: ISettings, plugin: gamification) {
		this.settings = settings;
		this.plugin = plugin;
		this.resourceSvgMap = resourceSvgMap;
	}

	closeProfileView(){
		void this.plugin.closeProfileView();
	}

	async updateProfileLeaf() {
		try {
			await this.plugin.actualizeProfileLeaf();
		} catch (error) {
			console.error("Failed to update Profile Leaf:", error);
		}
	}

	updateProfileLeafPic() {
		void this.plugin.profileLeafUpdatePicture();
	}

	updateChartWeeklyColorReceived(value: string){
		void this.plugin.updateChartWeeklyColorReceived(value);
	}

	updateChartWeeklyColorToGo(value: string){
		void this.plugin.updateChartWeeklyColorToGo(value);
	}

	getSettingString(key: keyof ISettings): string {
		const decryptedValue = this.settings[key] !== undefined ? this.settings[key].toString() : ''
		//if(debugLogs) console.debug(`String: decrypted ${key} is ${decryptString(decryptedValue)}`)
		return decryptString(decryptedValue);
	}

	getSettingNumber(key: keyof ISettings):number {
		const decryptedValue = this.settings[key] !== undefined ? this.settings[key].toString() : ''
		//if(debugLogs) console.debug(`Number: decrypted ${key} is ${decryptNumber(decryptedValue)}`)
		return decryptNumber(decryptedValue);
	}

	getSettingBoolean(key: keyof ISettings): boolean {
		const decryptedValue = this.settings[key] !== undefined ? this.settings[key].toString() : ''
		//if(debugLogs) console.debug(`Boolean: decrypted ${key} is ${decryptBoolean(decryptedValue)}`)
		return decryptBoolean(decryptedValue);
	}


	setSettingString(key: keyof ISettings, value: string) {
		// Set a specific setting
		this.settings[key] = encryptString(value);
		void this.saveSettings();
	}

	setBadgeSave(newBadge: Badge, date: string, level: string){
		const currentBadgeString:string = this.getSettingString('receivedBadges');
		if(debugLogs) console.debug(`currentBadgeString: ${currentBadgeString}`)
		const newBadgeString = currentBadgeString + newBadge.name + ',' + date + ',' + level + '##';
		//window.moment().format('YYYY-MM-DD') + ',' + this.getSettingNumber('statusLevel') + '\n';
		if(debugLogs) console.debug(`newBadgeString: ${newBadgeString}`)
		void this.setSettingString('receivedBadges',newBadgeString);
		void this.saveSettings();
	}


	setSettingNumber(key: keyof ISettings, value: number) {
		// Set a specific setting
		this.settings[key] = encryptNumber(value);
		void this.saveSettings();
	}


	setSettingBoolean(key: keyof ISettings, value: boolean) {
		// Set a specific setting
		this.settings[key] = encryptBoolean(value);
		void this.saveSettings();
	}

	async saveSettings(): Promise<void> {
		await this.plugin.saveData(this.settings);
	}

	async loadSettings() {
		this.settings = Object.assign({}, defaultSettings, await this.plugin.loadData());
		console.debug('loadSettings()')
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
				const existingEntry = earnedIngredientCounts.get(earnedIngredient.name);

				if (existingEntry) {
					existingEntry.count++;
				} else {
					earnedIngredientCounts.set(earnedIngredient.name, {
						ingredient: earnedIngredient,
						count: 1
					});
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
				const messageFragment = activeDocument.createDocumentFragment();
				messageFragment.appendChild(activeDocument.createTextNode('You earned:\n'));

				uniqueEarnedIngredients.forEach((item, index) => {
					const ingredientHtml = createEarnedIngredientHtml(item.ingredient, item.count);
					messageFragment.appendChild(ingredientHtml);
					if (index < uniqueEarnedIngredients.length - 1) {
						messageFragment.appendChild(activeDocument.createTextNode('\n'));
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

	async updateIngredientStock(ingredientName: string, newAmount: number): Promise<void> {
		const ingredient = elements.find(el => el.name === ingredientName);
		if (!ingredient) {
			console.error(`Ingredient not found for name: ${ingredientName}. Cannot update stock.`);
			return;
		}

		// Update in-memory cache
		this.remainingStock[ingredientName] = newAmount;

		// Update persistent setting
		this.setSettingNumber(ingredient.varName, newAmount);
		await this.saveSettings(); // Save immediately after each change
	}

	// In GamificationMediator
	async updateMultipleIngredients(updates: { name: string, newAmount: number }[]): Promise<void> {
		for (const update of updates) {
			const ingredient = elements.find(el => el.name === update.name);
			if (ingredient) {
				// Update in-memory cache
				this.remainingStock[update.name] = update.newAmount;
				// Update settings (without saving yet)
				this.setSettingNumber(ingredient.varName, update.newAmount);
			}
		}
		// SAVE ONCE at the end
		await this.saveSettings();
	}


}
