import { GamificationMediator } from './GamificationMediator';
import {decryptBoolean, decryptNumber, decryptString, encryptBoolean, encryptNumber, encryptString} from "./encryption";
import {Badge} from "./badges";
import {debugLogs, elements, listOfUseableIngredientsToBeShown, mil2sec} from "./constants";
import {Notice} from 'obsidian';
import {concatenateStrings} from "./Utils";
import {defaultSettings} from "./settings";
import gamification from "./main";

export class GamificationMediatorImpl implements GamificationMediator {
	private settings: any;
	private plugin: gamification;

	constructor(settings: any, plugin: gamification) {
		this.settings = settings;
		this.plugin = plugin;
	}

	updateProfileLeaf() {
		this.plugin.actualizeProfileLeave();
	}

	updateProfileLeafPic() {
		this.plugin.profileLeafUpdatePicture();
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
		const earnedIngredientToShow = [];
		if (Math.random() < chance) {
			const randomAmount = this.getRandomInt(min,max);
			for (let i=1;i<=randomAmount;i++){
				const randomIngredientIndex = this.getRandomInt(0, listOfUseableIngredientsToBeShown.length-1);
				const earnedIngredient = elements[randomIngredientIndex];
				const elementCount = this.getSettingNumber(earnedIngredient.varName);
				earnedIngredientToShow.push(earnedIngredient.name);

				// Perform a null check
				if (elementCount !== null && typeof elementCount === 'number') {
					this.setSettingNumber(earnedIngredient.varName, elementCount + 1);
					await this.saveSettings();

				} else {
					console.error(`Invalid element count for ${earnedIngredient.varName}`);
				}
			}
			if(debugLogs) console.debug(`You earned: ${concatenateStrings(earnedIngredientToShow)}`);
			new Notice(`You earned ${concatenateStrings(earnedIngredientToShow)}`,this.getSettingNumber('timeShowNotice') * mil2sec)
		} else {
			new Notice(`This time you didn't earn an ingredient.`,this.getSettingNumber('timeShowNotice') * mil2sec)
			if(debugLogs) console.debug('You did not earn an ingredient this time.');
		}

	}

	getRandomInt(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}



}
