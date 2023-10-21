import { App, Modal } from 'obsidian';
import {
	craftingItems,
	elements,
	boosterRecipes,
	listOfUseableBoostersToBeShown,
	listOfUseableIngredientsToBeShown
} from './constants';
import { ModalInformationbox } from 'ModalInformationbox';
import gamification, { isMinutesPassed, hoursUntilMinutesPassed } from 'main';




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
		} else {
			const listItem = this.createItemContainer("");
			contentEl.appendChild(listItem);
		}
	}


	onClose() {
		this.selectedItems = [];
	}

	private boosterAvailableForUse(item: string) {
		//console.log(`boosterAvailableForUse: ${item}`)
		let found = false;
		listOfUseableBoostersToBeShown.forEach(element => {
			//console.log(`${item} == ${element} ??`)
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
		console.log(`increment "${increment}" new value ${stock}`);
		this.remainingStock[increment] = stock;
		this.gamificationInstance.setSetting(this.getIngerementVarNameFromName(increment) || '', stock);
	}


	updateBoosterStock(booster: string, stockIncrease: number) {
		this.boosters[booster] += stockIncrease;
	}

	decrementBooster(booster: string, stockIncrease: number) {
		const stock = this.boosters[booster];
		const momentDate = window.moment(booster, 'YYYY-MM-DD HH:mm:ss');
		if (stock > 0 && isMinutesPassed(momentDate, this.getBoosterCooldownFromName(booster))) {
			this.boosters[booster] -= stockIncrease;
			this.gamificationInstance.setSetting(this.getBoosterVarNameFromName(booster), this.boosters[booster]);
			this.gamificationInstance.setSettingBoolean(this.getBoosterSwitchFromName(booster), true);
			this.gamificationInstance.setSettingString(this.getBoosterDateFromName(booster), window.moment().format('YYYY-MM-DD HH:mm:ss'));
			this.updateQuantityDisplay(booster);
		}
	}


	readBoostersStock() {
		if (this.gamificationInstance) {
			this.boosters = {
				'Temporal Tweaker': this.gamificationInstance.getSetting('temporalTweaker') as number,
				'Perpetual Progress': this.gamificationInstance.getSetting('perpetualProgress') as number,
				'Strategic Synapses': this.gamificationInstance.getSetting('strategicSynapses') as number,
				'Accelerated Acquisition': this.gamificationInstance.getSetting('acceleratedAcquisition') as number,
				'Linkers Lode': this.gamificationInstance.getSetting('linkersLode') as number,
				'Effortless Expansion': this.gamificationInstance.getSetting('effortlessExpansion') as number,
				'Recursive Reflection': this.gamificationInstance.getSetting('recursiveReflection') as number,
				'Synaptic Surge': this.gamificationInstance.getSetting('synapticSurge') as number,
				'Inspiration Infusion': this.gamificationInstance.getSetting('inspirationInfusion') as number,
				'Title Titan': this.gamificationInstance.getSetting('titleTitan') as number,
				'Precision Prism': this.gamificationInstance.getSetting('precisionPrism') as number,
				'Hyperlink Harmony': this.gamificationInstance.getSetting('hyperlinkHarmony') as number,
				'Ephemeral Euphoria': this.gamificationInstance.getSetting('ephemeralEuphoria') as number,
			};
		}
	}


	readIngrementStock() {
		if (this.gamificationInstance) {
			this.remainingStock = {
				'Nexus Node': this.gamificationInstance.getSetting('nexusNode') as number,
				'Connection Crystal': this.gamificationInstance.getSetting('connectionCrystal') as number,
				'Mastery Scroll': this.gamificationInstance.getSetting('masteryScroll') as number,
				'Insight Prism': this.gamificationInstance.getSetting('insightPrism') as number,
				'Reflective Essence': this.gamificationInstance.getSetting('reflectiveEssence') as number,
				'Amplification Crystal': this.gamificationInstance.getSetting('amplificationCrystal') as number,
				'Creative Catalyst': this.gamificationInstance.getSetting('creativeCatalyst') as number,
				'Precision Lens': this.gamificationInstance.getSetting('precisionLens') as number,
			};
		}
	}


	private createCraftingLayout() {
		const container = document.createElement('div');
		container.className = 'modal-crafting-container';

		// Create a container for the stock information
		const stockContainer = document.createElement('div');
		stockContainer.className = 'stock-container';


		boosterRecipes.forEach(recipe => {
			if (this.boosterAvailableForUse(recipe.name)) {
				const itemContainer = document.createElement('div');
				itemContainer.className = 'crafting-item-container';

				const button = document.createElement('button');
				button.innerText = 'Craft';
				button.onclick = () => this.craftBoosterItem(recipe);

				const useInfoButton = document.createElement('button');
				useInfoButton.innerText = '?';
				useInfoButton.onclick = () => {
					new ModalInformationbox(this.app, this.getBoosterInforFromFromName(recipe.name)).open();
				};

				const itemText = document.createElement('span');
				itemText.innerText = `${recipe.name} ⇒ ${recipe.incredients.join('    ')}`;

				itemContainer.appendChild(button);
				itemContainer.appendChild(useInfoButton);
				itemContainer.appendChild(itemText);
				container.appendChild(itemContainer);
			}
		});

		const stockInfo = document.createElement('div');
		stockInfo.className = 'stock-info';

		listOfUseableIngredientsToBeShown.forEach(element => {
			//console.log(`${element.name} : ${this.remainingStock[element.name]}`)
			stockInfo.innerHTML += `${this.getIngerementFromName(element).shortName} [${this.remainingStock[this.getIngerementFromName(element).name] || 0}]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
		});

		stockContainer.appendChild(stockInfo);



		// Add the stock container to the main container
		container.appendChild(stockContainer);

		return container;
	}



	private createBoosterList(labelText: string) {
		const container = document.createElement('div');
		container.className = 'modal-checkbox-container';

		//const stock = this.remainingStock[labelText] || 0;
		const stock = this.boosters[labelText];

		const label = document.createElement('div');
		label.className = `${labelText.replace(' ', '-')}`;
		const useButton = document.createElement('button');
		const momentDate = this.gamificationInstance.getSetting(this.getBoosterDateFromName(labelText));
		if (isMinutesPassed(window.moment(momentDate as string, 'YYYY-MM-DD HH:mm:ss'), this.getBoosterCooldownFromName(labelText)) == false) {
			console.log(`Booster ${labelText} is still in cooldown for ${window.moment(momentDate as string, 'YYYY-MM-DD HH:mm:ss'), this.getBoosterCooldownFromName(labelText) / 60} hours`);
			label.innerHTML = `${labelText} : (${stock})`;
			//const useButton = document.createElement('button');
			useButton.innerText = `cooldown ${hoursUntilMinutesPassed(window.moment(momentDate as string, 'YYYY-MM-DD HH:mm:ss'), this.getBoosterCooldownFromName(labelText))} hours`;
			useButton.id = `use-button-${labelText.replace(' ', '-')}`;
			useButton.onclick = () => {
				new ModalInformationbox(this.app, `${labelText} is for ${hoursUntilMinutesPassed(window.moment(momentDate as string, 'YYYY-MM-DD HH:mm:ss'), this.getBoosterCooldownFromName(labelText))} hours in cooldown and can only then be used again.`).open();
			};
		} else {
			label.innerHTML = `${labelText} : (${stock})`;
			//const useButton = document.createElement('button');
			useButton.innerText = 'Use';
			useButton.id = `use-button-${labelText.replace(' ', '-')}`;
			useButton.onclick = () => {
				this.useBoosterItem(labelText);
			};
		}

		const useInfoButton = document.createElement('button');
		useInfoButton.innerText = '?';
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
		//console.log(`incrementItem: stock = ${stock}`);
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
		console.log(`use Booster ${labelText}`);
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
		const buttonUse = document.querySelector(`#use-button-${labelText.replace(' ', '-')}`);
		const date = this.gamificationInstance.getSetting(this.getBoosterDateFromName(labelText));
		const momentDate = window.moment(date as string, 'YYYY-MM-DD HH:mm:ss');
		if (buttonUse && isMinutesPassed(momentDate, this.getBoosterCooldownFromName(labelText)) == false) {
			buttonUse.setText(`cooldown ${hoursUntilMinutesPassed(momentDate, this.getBoosterCooldownFromName(labelText))} hours`);
		}
	}


	private checkIngredientsAvailability(incredients: { name: string; incredients: string[]; }) {
		for (const ingredient of incredients.incredients) {
			const [quantity, shortName] = ingredient.split('x');
			//console.log(`quantity: ${quantity}\tshortName: ${shortName}`)
			const requiredQuantity = parseInt(quantity);
			const availableStock = this.remainingStock[this.getIngerementNameFromShortName(shortName) || 0];
			//console.log(`requiredQuantity: ${requiredQuantity}\tavailableStock: ́${availableStock}`)
			if (requiredQuantity > availableStock) {
				return false; // Not enough stock for this ingredient
			}
		}

		return true;
	}

	private check1000IngredientsAvailableAndBurn() {
		let totalAvailableIngredients = 0;
	
		// Calculate the total number of available ingredients
		elements.forEach(increment => {
			totalAvailableIngredients += this.remainingStock[increment.name] || 0;
		});
	
		// If at least 1000 ingredients are available
		if (totalAvailableIngredients >= 1000) {
			// Burn ingredients proportionally
			elements.forEach(increment => {
				if (this.remainingStock[increment.name]) {
					const proportionalAmount = Math.ceil((this.remainingStock[increment.name] / totalAvailableIngredients) * 1000);
					const difference = this.remainingStock[increment.name] - proportionalAmount;
					this.remainingStock[increment.name] -= difference;
				}
			});
	
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
				this.gamificationInstance.setSetting(this.getBoosterVarNameFromName(selectedItems.name), this.boosters[selectedItems.name]);
				console.log(`craft booster ${selectedItems.name}`);
			} else {
				console.log(`not enough ingredients for booster ${selectedItems.name} in stock`);
				new ModalInformationbox(this.app, `Not enough ingrediments available for '${selectedItems.name}'. Craft more Notes to collect new ingrediments.`).open();
			}
		} else {
			if (this.checkIngredientsAvailability(selectedItems)) {
				console.log(`craft booster ${selectedItems.name}`);
				this.updateBoosterStock(selectedItems.name, 1);
				this.gamificationInstance.setSetting(this.getBoosterVarNameFromName(selectedItems.name), this.boosters[selectedItems.name]);
				this.useIngrediments(selectedItems);
				//this.updateQuantityDisplay(selectedItems.name)
				this.updateStockInformation();
			} else {
				console.log(`not enough ingredients for booster ${selectedItems.name} in stock`);
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

}
