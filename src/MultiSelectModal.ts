import { App, Modal } from 'obsidian';
import {
	craftingItems,
	elements,
	boosterRecipes,
	listOfUseableBoostersToBeShown,
	listOfUseableIngredientsToBeShown
} from './constants';
import { ModalInformationbox } from 'ModalInformationbox';
import gamification, { isMinutesPassed, hoursUntilMinutesPassed} from 'main';




export class MultiSelectModal extends Modal {
	private items: string[];
	private selectedItems: string[] = [];
	private remainingStock: Record<string, number> = {};
	private buttonText: string;
	private readonly gamificationInstance: gamification;
	private boosters: Record<string, number> = {};
	private useBooster: boolean = false;
	private remainingBoosterStock: Record<string, number> = {};

	constructor(app: App, items: string[], buttonText: string, gamificationInstance: gamification) {
		super(app);
		this.items = items;
		this.buttonText = buttonText;
		this.gamificationInstance = gamificationInstance;
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.empty();

		//this.readBoostersStock();
		// take care only to run several times through when boosters are used
		if (this.useBooster) {
			boosterRecipes.forEach(item => {
				if (this.boosterAvailableForUse(item.name)) {
					const listItem = this.createItemContainer(item.name);
					contentEl.appendChild(listItem);
				}
			});
			const fortuneInfusionBooster = boosterRecipes.find(entry => entry.varname === 'fortuneInfusion');
			if (fortuneInfusionBooster){
				const listItem = this.createItemContainer(fortuneInfusionBooster.name);
				contentEl.appendChild(listItem);
			}
		} else {
			const listItem = this.createItemContainer("");
			contentEl.appendChild(listItem);
		}
	}


	onClose() {
		this.selectedItems = [];
	}

	private boosterAvailableForUse(item: string) {
		//console.debug(`boosterAvailableForUse: ${item}`)
		let found = false;
		listOfUseableBoostersToBeShown.forEach(element => {
			//console.debug(`${item} == ${element} ??`)
			if (item == element) {
				if (!found) {
					found = true;
				}

			}

		});
		return found;
	}

	setUseBooster(useBooster: boolean) {
		this.useBooster = useBooster;
	}


	// Updated createItemContainer method
	private createItemContainer(labelText: string) {
		if (this.useBooster) {
			return this.createBoosterList(labelText);
		} else {
			//return this.createCheckbox(labelText);
			return this.createCraftingLayout();
		}
	}

	updateIncrementStock(increment: string, stock: number) {
		console.debug(`increment "${increment}" new value ${stock}`);
		this.remainingStock[increment] = stock;
		this.gamificationInstance.setSettingNumber(this.getIngerementVarNameFromName(increment) || '', stock);
	}


	updateBoosterStock(booster: string, stockIncrease: number) {
		this.boosters[booster] += stockIncrease;
	}

	decrementBooster(booster: string, stockIncrease: number) {
		const stock = this.boosters[booster];
		const boosterLastUsedDate = this.gamificationInstance.getSettingString(this.getBoosterDateFromName(booster));
		if (typeof boosterLastUsedDate === 'string' && boosterLastUsedDate !== null) {
		const momentDate = window.moment(boosterLastUsedDate, 'YYYY-MM-DD HH:mm:ss');
		if (stock > 0 && isMinutesPassed(momentDate, this.getBoosterCooldownFromName(booster))) {
			this.boosters[booster] -= stockIncrease;
			this.gamificationInstance.setSettingNumber(this.getBoosterVarNameFromName(booster), this.boosters[booster]);
			this.gamificationInstance.setSettingBoolean(this.getBoosterSwitchFromName(booster), true);
			this.gamificationInstance.setSettingString(this.getBoosterDateFromName(booster), window.moment().format('YYYY-MM-DD HH:mm:ss'));
			const boosterOverallUse = this.gamificationInstance.getSettingNumber('boosterUseCount')
			if (typeof boosterOverallUse === 'number' && boosterOverallUse !== null) {
				// Now you can safely assign boosterLastUsedDate to boosterLastUsedDate.
				this.gamificationInstance.setSettingNumber('boosterUseCount',boosterOverallUse + 1)
			  } else {
				// Handle the case where boosterLastUsedDate is not a valid string.
				console.debug(`decrementBooster: "boosterUseCount" could not got read.`)
			  }
			const boosterUse = this.gamificationInstance.getSettingNumber(this.getBoosterUseFromName(booster))
			if (typeof boosterUse === 'number' && boosterUse !== null) {
				// Now you can safely assign boosterLastUsedDate to boosterLastUsedDate.
				this.gamificationInstance.setSettingNumber(this.getBoosterUseFromName(booster),boosterUse + 1)
			  } else {
				// Handle the case where boosterLastUsedDate is not a valid string.
				console.debug(`decrementBooster: "${this.getBoosterUseFromName(booster)}" could not got read.`)
			  }
			this.updateQuantityDisplay(booster);
		}
		} else {
		// Handle the case where boosterLastUsedDate is not a valid string.
		console.error(`value from ${this.getBoosterVarNameFromName(booster)} could not be read from Settings in decrementBooster()`)
		}
		
	}


	readBoostersStock() {
		if (this.gamificationInstance) {
			this.boosters = {
				'Temporal Tweaker': this.gamificationInstance.getSettingNumber('temporalTweaker') as number,
				'Perpetual Progress': this.gamificationInstance.getSettingNumber('perpetualProgress') as number,
				'Strategic Synapses': this.gamificationInstance.getSettingNumber('strategicSynapses') as number,
				'Accelerated Acquisition': this.gamificationInstance.getSettingNumber('acceleratedAcquisition') as number,
				'Linkers Lode': this.gamificationInstance.getSettingNumber('linkersLode') as number,
				'Effortless Expansion': this.gamificationInstance.getSettingNumber('effortlessExpansion') as number,
				'Recursive Reflection': this.gamificationInstance.getSettingNumber('recursiveReflection') as number,
				'Synaptic Surge': this.gamificationInstance.getSettingNumber('synapticSurge') as number,
				'Inspiration Infusion': this.gamificationInstance.getSettingNumber('inspirationInfusion') as number,
				'Title Titan': this.gamificationInstance.getSettingNumber('titleTitan') as number,
				'Precision Prism': this.gamificationInstance.getSettingNumber('precisionPrism') as number,
				'Hyperlink Harmony': this.gamificationInstance.getSettingNumber('hyperlinkHarmony') as number,
				'Ephemeral Euphoria': this.gamificationInstance.getSettingNumber('ephemeralEuphoria') as number,
				'Fortune Infusion': 1,
			};
		}
	}


	readIngrementStock() {
		if (this.gamificationInstance) {
			this.remainingStock = {
				'Nexus Node': this.gamificationInstance.getSettingNumber('nexusNode') as number,
				'Connection Crystal': this.gamificationInstance.getSettingNumber('connectionCrystal') as number,
				'Mastery Scroll': this.gamificationInstance.getSettingNumber('masteryScroll') as number,
				'Insight Prism': this.gamificationInstance.getSettingNumber('insightPrism') as number,
				'Reflective Essence': this.gamificationInstance.getSettingNumber('reflectiveEssence') as number,
				'Amplification Crystal': this.gamificationInstance.getSettingNumber('amplificationCrystal') as number,
				'Creative Catalyst': this.gamificationInstance.getSettingNumber('creativeCatalyst') as number,
				'Precision Lens': this.gamificationInstance.getSettingNumber('precisionLens') as number,
			};
		}
	}


	private createCraftingLayout() {
		this.readIngrementStock();
		const container = this.containerEl.createEl('div');
		container.className = 'modal-crafting-container';
	
		const stockContainer = container.createEl('div');
		stockContainer.className = 'stock-container';
	
		const stockInfo = stockContainer.createEl('div');
		stockInfo.className = 'stock-info';
		stockInfo.style.display = 'flex'; // Set display to flex to make items side by side
	
		boosterRecipes.forEach(recipe => {
			if (this.boosterAvailableForUse(recipe.name)) {
				const itemContainer = stockContainer.createEl('div');
				itemContainer.className = 'crafting-item-container';
	
				const button = itemContainer.createEl('button', { text: 'Craft' });
				button.onclick = () => this.craftBoosterItem(recipe);
	
				const useInfoButton = itemContainer.createEl('button', { text: '?' });
				useInfoButton.onclick = () => {
					new ModalInformationbox(this.app, this.getBoosterInforFromFromName(recipe.name)).open();
				};
	
				const itemText = itemContainer.createEl('span', { text: `${recipe.name} ⇒ ${recipe.incredients.join('    ')}` });
		
				container.appendChild(itemContainer);
			}
		});
	
		listOfUseableIngredientsToBeShown.forEach(element => {
			const increment = this.getIngerementFromName(element);
			const shortName = increment.shortName;
			const remainingStock = this.remainingStock[increment.name] || 0;
	
			const stockDiv = stockInfo.createEl('div');
			stockDiv.innerText = `${shortName} [${remainingStock}]`;
	
			// Adding margin for spacing between stock items
			stockDiv.style.marginRight = '20px'; 
		});
	
		stockContainer.appendChild(stockInfo);
	
		container.appendChild(stockContainer);
	
		return container;
	}
	
	
	
	



	private createBoosterList(labelText: string) {
		const container = this.containerEl.createEl('div');
		container.className = 'modal-checkbox-container';
	
		//const stock = this.remainingStock[labelText] || 0;
		const stock = this.boosters[labelText];
	
		const label = container.createEl('div', { cls: `${labelText.replace(' ', '-')}` });
	
		const useButton = container.createEl('button');
		const momentDate = this.gamificationInstance.getSettingString(this.getBoosterDateFromName(labelText));
	
		if (isMinutesPassed(window.moment(momentDate as string, 'YYYY-MM-DD HH:mm:ss'), this.getBoosterCooldownFromName(labelText)) == false) {
			console.debug(`Booster ${labelText} is still in cooldown for ${window.moment(momentDate as string, 'YYYY-MM-DD HH:mm:ss'), this.getBoosterCooldownFromName(labelText) / 60} hours`);
			label.createEl('div', { text: `${labelText} : (${stock})` });
	
			useButton.innerText = `cooldown ${hoursUntilMinutesPassed(window.moment(momentDate as string, 'YYYY-MM-DD HH:mm:ss'), this.getBoosterCooldownFromName(labelText))} hours`;
			useButton.id = `use-button-${labelText.replace(' ', '-')}`;
			useButton.onclick = () => {
				new ModalInformationbox(this.app, `${labelText} is for ${hoursUntilMinutesPassed(window.moment(momentDate as string, 'YYYY-MM-DD HH:mm:ss'), this.getBoosterCooldownFromName(labelText))} hours in cooldown and can only then be used again.`).open();
			};
		} else {
			label.createEl('div', { text: `${labelText} : (${stock})` });
	
			useButton.innerText = 'Use';
			useButton.id = `use-button-${labelText.replace(' ', '-')}`;
			useButton.onclick = () => {
				this.useBoosterItem(labelText);
			};
		}
	
		const useInfoButton = container.createEl('button', { text: '?' });
		useInfoButton.id = `information-${labelText.replace(' ', '-')}`;
		useInfoButton.onclick = () => {
			new ModalInformationbox(this.app, this.getBoosterInforFromFromName(labelText)).open();
		};
	
		container.appendChild(useButton);
		container.appendChild(useInfoButton);
		container.appendChild(label);
	
		return container;
	}
	
	


	incrementItem(item: string) {
		const stock = this.remainingStock[item];
		//console.debug(`incrementItem: stock = ${stock}`);
		if (stock > 0) {
			this.selectedItems.push(item);
			this.remainingStock[item]--;
			this.updateQuantityDisplay(item);
		}
		if (this.boosters[item] !== undefined) {
			this.boosters[item]--;
			this.updateQuantityDisplay(item);
		}
	}


	decrementItem(item: string) {
		const itemIndex = this.selectedItems.indexOf(item);

		if (itemIndex > -1) {
			this.selectedItems.splice(itemIndex, 1);
			this.remainingStock[item]++;
			this.updateQuantityDisplay(item);
		}
		if (this.boosters[item] !== undefined) {
			this.boosters[item]++;
			this.updateQuantityDisplay(item);
		}
	}


	private useBoosterItem(labelText: string) {
		console.debug(`use Booster ${labelText}`);
		if(labelText=='Fortune Infusion'){
			//console.debug(`acquireIngredients();`)
			this.gamificationInstance.acquireIngredients(1,1,10)
		} else if (labelText=='Temporal Tweaker'){
			
		} else if (labelText=='Perpetual Progress'){
			this.gamificationInstance.setSettingBoolean('boosterFactorPerpetualProgress', true)
		} else if (labelText=='Strategic Synapses'){
			this.gamificationInstance.setSettingBoolean('boosterFactorStrategicSynapses', true)
		} else if (labelText=='Accelerated Acquisition'){

		} else if (labelText=='Linkers Lode'){
			this.gamificationInstance.setSettingBoolean('boosterFactorLinkersLode', true)
		} else if (labelText=='Effortless Expansion'){

		} else if (labelText=='Recursive Reflection'){
			this.gamificationInstance.setSettingBoolean('boosterFactorRecursiveReflection', true)
		} else if (labelText=='Synaptic Surge'){
			this.gamificationInstance.setSettingBoolean('boosterFactorSynapticSurge', true)
		} else if (labelText=='Inspiration Infusion'){

		} else if (labelText=='Title Titan'){
			this.gamificationInstance.setSettingBoolean('boosterFactorTitleTitan', true)
		} else if (labelText=='Precision Prism'){
			this.gamificationInstance.setSettingBoolean('boosterFactorPrecisionPrism', true)
		} else if (labelText=='Hyperlink Harmony'){
			this.gamificationInstance.setSettingBoolean('boosterFactorHyperlinkHarmony', true)
		} else if (labelText=='Ephemeral Euphoria'){
			this.gamificationInstance.setSettingBoolean('boosterFactorEphemeralEuphoria', true)
		}
		
		/*const stock = this.boosters[labelText];
		if (stock > 0) {
			//this.selectedItems.push(labelText);
			//this.boosters[labelText]--;
			this.updateQuantityDisplay(labelText);
		}*/
		this.decrementBooster(labelText, 1);

	}



	private updateQuantityDisplay(labelText: string) {
		const stock = this.boosters[labelText];
		const stockInfo = document.querySelector(`.${labelText.replace(' ', '-')}`);
		if (stockInfo) {
			stockInfo.innerHTML = ''; // Clear the current content
			stockInfo.innerHTML = `${labelText} : (${stock})`;
		}
		const buttonUse: HTMLButtonElement | null = document.querySelector(`#use-button-${labelText.replace(' ', '-')}`);
		if (buttonUse !== null) {
			const date = this.gamificationInstance.getSettingString(this.getBoosterDateFromName(labelText));
			const momentDate = window.moment(this.gamificationInstance.getSettingString(this.getBoosterDateFromName(labelText)), 'YYYY-MM-DD HH:mm:ss');
			if (isMinutesPassed(momentDate, this.getBoosterCooldownFromName(labelText)) == false) {
				buttonUse.setText(`cooldown ${hoursUntilMinutesPassed(momentDate, this.getBoosterCooldownFromName(labelText))} hours`);
				buttonUse.onclick = () => {
					new ModalInformationbox(this.app, `${labelText} is for ${hoursUntilMinutesPassed(momentDate, this.getBoosterCooldownFromName(labelText))} hours in cooldown and can only then be used again.`).open();
				}
			}
		}
	}


	private checkIngredientsAvailability(incredients: { name: string; incredients: string[]; }) {
		for (const ingredient of incredients.incredients) {
			const [quantity, shortName] = ingredient.split('x');
			//console.debug(`quantity: ${quantity}\tshortName: ${shortName}`)
			const requiredQuantity = parseInt(quantity);
			const availableStock = this.remainingStock[this.getIngerementNameFromShortName(shortName) || 0];
			//console.debug(`requiredQuantity: ${requiredQuantity}\tavailableStock: ́${availableStock}`)
			if (requiredQuantity > availableStock) {
				return false; // Not enough stock for this ingredient
			}
		}

		return true;
	}


	private check1000IngredientsAvailableAndBurn() {
		let totalAvailableIngredients = 0;
	
		// Calculate the total number of available ingredients
		//elements.forEach(increment => {
		listOfUseableIngredientsToBeShown.forEach(increment => {
			totalAvailableIngredients += this.remainingStock[this.getIngerementFromName(increment).name] || 0;
		});
	
		console.debug(`total amount of ingrediments: ${totalAvailableIngredients}`)
		// If at least 1000 ingredients are available
		if (totalAvailableIngredients >= 1000) {
			// Burn ingredients proportionally
			//elements.forEach(increment => {
			listOfUseableIngredientsToBeShown.forEach(increment => {
				if (this.remainingStock[this.getIngerementFromName(increment).name]) {
					const proportionalAmount = Math.ceil((this.remainingStock[this.getIngerementFromName(increment).name] / totalAvailableIngredients) * 1000);
					//const rest = this.remainingStock[this.getIngerementFromName(increment).name] - proportionalAmount;
					//console.debug(`${this.getIngerementFromName(increment).shortName} ${this.remainingStock[this.getIngerementFromName(increment).name]} shall be ${this.remainingStock[this.getIngerementFromName(increment).name] - rest} = ${this.remainingStock[this.getIngerementFromName(increment).name]} - ${rest}`)
					//this.remainingStock[this.getIngerementFromName(increment).name] = this.remainingStock[this.getIngerementFromName(increment).name] - proportionalAmount;
					//this.updateIncrementStock(this.getIngerementFromName(increment).varName, this.remainingStock[this.getIngerementFromName(increment).name])
					this.updateIncrementStock(this.getIngerementFromName(increment).name, this.remainingStock[this.getIngerementFromName(increment).name] - proportionalAmount)
				}
			});
	
			//save new stock

			// Update the stock information display
			this.updateStockInformation();
	
			return true;
		}
	
		return false;
	}
	

	


	private useIngrediments(incredients: { name: string; incredients: string[]; }) {
		for (const ingredient of incredients.incredients) {
			const [quantity, shortName] = ingredient.split('x');
			const requiredQuantity = parseInt(quantity);
			const availableStock = this.remainingStock[this.getIngerementNameFromShortName(shortName) || 0];
			const ingrementName = this.getIngerementNameFromShortName(shortName) || '';
			this.updateIncrementStock(ingrementName, availableStock - requiredQuantity);
		}

		return true;
	}


	private updateStockInformation() {
		const stockInfo = document.querySelector('.stock-info');
		if (stockInfo) {
			stockInfo.innerHTML = ''; // Clear the current content

			//elements.forEach(element => {
			listOfUseableIngredientsToBeShown.forEach(element => {
				//stockInfo.innerHTML += `${element.shortName} [${this.remainingStock[element.name] || 0}]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
				stockInfo.innerHTML += `${this.getIngerementFromName(element).shortName} [${this.remainingStock[this.getIngerementFromName(element).name] || 0}]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
			});
		}
	}


	private craftBoosterItem(selectedItems: { name: string; incredients: string[]; }) {
		// call here the recipe logic and reduce the stock
		if(selectedItems.name == 'Ephemeral Euphoria'){
			if(this.check1000IngredientsAvailableAndBurn()){
				this.updateBoosterStock(selectedItems.name, 1);
				this.gamificationInstance.setSettingNumber(this.getBoosterVarNameFromName(selectedItems.name), this.boosters[selectedItems.name]);
				console.debug(`craft booster ${selectedItems.name}`);
			} else {
				console.debug(`not enough ingredients for booster ${selectedItems.name} in stock`);
				new ModalInformationbox(this.app, `Not enough ingrediments available for '${selectedItems.name}'. Craft more Notes to collect new ingrediments.`).open();
			}
		} else if(selectedItems.name == 'Fortune Infusion'){
			
		} else {
			if (this.checkIngredientsAvailability(selectedItems)) {
				console.debug(`craft booster ${selectedItems.name}`);
				this.updateBoosterStock(selectedItems.name, 1);
				this.gamificationInstance.setSettingNumber(this.getBoosterVarNameFromName(selectedItems.name), this.boosters[selectedItems.name]);
				this.useIngrediments(selectedItems);
				//this.updateQuantityDisplay(selectedItems.name)
				this.updateStockInformation();
			} else {
				console.debug(`not enough ingredients for booster ${selectedItems.name} in stock`);
				new ModalInformationbox(this.app, `Not enough ingrediments available for '${selectedItems.name}'. Craft more Notes to collect new ingrediments.`).open();
			}
		}
	}


	private getIngerementNameFromShortName(shortName: string) {
		for (const element of elements) {
			if (element.shortName === shortName) {
				return element.name;
			}
		}
		return null; // Return null if no matching element is found
	}

	private getIngerementShortNameFromName(name: string) {
		for (const element of elements) {
			if (element.name === name) {
				return element.shortName;
			}
		}
		return null; // Return null if no matching element is found
	}

	private getIngerementFromName(name: string) {
		for (const element of elements) {
			if (element.name === name) {
				return element;
			}
		}
		return { shortName: '', name: '', varName: '' }; // Return null if no matching element is found
	}


	private getIngerementVarNameFromShortName(shortName: string) {
		for (const element of elements) {
			if (element.shortName === shortName) {
				return element.varName;
			}
		}
		return null; // Return null if no matching element is found
	}

	private getIngerementVarNameFromName(name: string) {
		for (const element of elements) {
			if (element.name === name) {
				return element.varName;
			}
		}
		return null; // Return null if no matching element is found
	}

	private getBoosterVarNameFromName(boosterName: string) {
		for (const element of boosterRecipes) {
			if (element.name === boosterName) {
				return element.varname;
			}
		}
		return ''; // Return null if no matching element is found
	}

	private getBoosterInforFromFromName(boosterName: string) {
		for (const element of boosterRecipes) {
			if (element.name === boosterName) {
				return element.description;
			}
		}
		return ''; // Return null if no matching element is found
	}

	private getBoosterSwitchFromName(boosterName: string) {
		for (const element of boosterRecipes) {
			if (element.name === boosterName) {
				return element.boosterSwitch;
			}
		}
		return ''; // Return null if no matching element is found
	}

	private getBoosterDateFromName(boosterName: string) {
		for (const element of boosterRecipes) {
			if (element.name === boosterName) {
				return element.boosterDate as string;
			}
		}
		return ''; // Return null if no matching element is found
	}

	private getBoosterCooldownFromName(boosterName: string) {
		for (const element of boosterRecipes) {
			if (element.name === boosterName) {
				return element.boosterCooldown;
			}
		}
		return 0; // Return null if no matching element is found
	}

	private getBoosterUseFromName(boosterName: string) {
		for (const element of boosterRecipes) {
			if (element.name === boosterName) {
				return element.boosterUseCountName as string;
			}
		}
		return ''; // Return null if no matching element is found
	}

}
