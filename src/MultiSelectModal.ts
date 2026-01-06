import {App, Modal, Notice} from 'obsidian';
import {
	elements,
	boosterRecipes,
	listOfUseableBoostersToBeShown,
	listOfUseableIngredientsToBeShown,
	debugLogs
} from './constants';
import { ModalInformationbox } from 'ModalInformationbox';
import { GamificationMediator } from './GamificationMediator';
import {hoursUntilMinutesPassed, isMinutesPassed} from "./Utils";
import {
	createResourceDisplay,
	connectionCrystalSvg,
	nexusNodeSvg,
	masteryScrollSvg,
	insightPrismSvg,
	reflectiveEssenceSvg,
	amplificationCrystalSvg,
	creativeCatalystSvg,
	precisionLensSvg
} from './resourceIcons';



export class MultiSelectModal extends Modal {
	private items: string[];
	private selectedItems: string[] = [];
	private remainingStock: Record<string, number> = {};
	private buttonText: string;
	//private readonly gamificationInstance: gamification;
	private boosters: Record<string, number> = {};
	private useBooster = false;
	private remainingBoosterStock: Record<string, number> = {};
	private readonly mediator: GamificationMediator;
	private level: number;

	private resourceSvgMap: Record<string, string>;

	constructor(app: App, items: string[], buttonText: string, mediator: GamificationMediator) {
		super(app);
		this.items = items;
		this.buttonText = buttonText;
		this.mediator = mediator;
		this.resourceSvgMap = {
			'Nexus Node': nexusNodeSvg,
			'Connection Crystal': connectionCrystalSvg,
			'Mastery Scroll': masteryScrollSvg,
			'Insight Prism': insightPrismSvg,
			'Reflective Essence': reflectiveEssenceSvg,
			'Amplification Crystal': amplificationCrystalSvg,
			'Creative Catalyst': creativeCatalystSvg,
			'Precision Lens': precisionLensSvg,
		};
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.empty();

		this.readBoostersStock();
		// take care only to run several times through when boosters are used
		if (this.useBooster) {
			boosterRecipes.forEach(item => {
				if (this.boosterAvailableForUse(item.name,this.mediator.getSettingNumber('statusLevel'))) {
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
			const craftingLayout = this.createCraftingLayout();
			contentEl.appendChild(craftingLayout);
		}
	}


	onClose() {
		this.selectedItems = [];
	}

	private boosterAvailableForUse(item: string, level: number) {
		if (debugLogs) console.debug(`boosterAvailableForUse: ${item}, level: ${level}`);
	
		const boosterThresholds = [
			{ minLevel: 0, count: 3 },
			{ minLevel: 5, count: 3 },
			{ minLevel: 6, count: 3 },
		];
	
		let availableCount = 0;
		for (const threshold of boosterThresholds) {
			if (level >= threshold.minLevel) {
				availableCount += threshold.count;
			}
		}
	
		const currentlyAvailableBoosters = listOfUseableBoostersToBeShown.slice(0, availableCount);
	
		return currentlyAvailableBoosters.includes(item);
	}
	

	setUseBooster(useBooster: boolean) {
		this.useBooster = useBooster;
	}


	private createItemContainer(labelText: string) {
		if (this.useBooster) {
			return this.createBoosterList(labelText);
		}
		// If not `useBooster`, this function should ideally not be called or return an empty div as a fallback.
		console.warn("createItemContainer called with useBooster=false. This path should be unreachable if onOpen is correct.");
		return document.createElement('div');
	}

	updateIncrementStock(increment: string, stock: number) {
		if(debugLogs) console.debug(`increment "${increment}" new value ${stock}`);
		this.remainingStock[increment] = stock;
		this.mediator.setSettingNumber(this.getIngerementVarNameFromName(increment) || '', stock);
	}



	updateBoosterStock(booster: string, stockIncrease: number) {
		this.boosters[booster] += stockIncrease;
		new Notice(`Booster "${booster}" crafted`,5000);
	}

	decrementBooster(booster: string, stockIncrease: number) {
		const stock = this.boosters[booster];
		const boosterLastUsedDate = this.mediator.getSettingString(this.getBoosterDateFromName(booster));
		// Added null check for momentDate
		if (typeof boosterLastUsedDate === 'string' && boosterLastUsedDate !== null) {
			const momentDate = window.moment(boosterLastUsedDate, 'YYYY-MM-DD HH:mm:ss');
			if (stock > 0 && isMinutesPassed(momentDate, this.getBoosterCooldownFromName(booster))) {
				this.boosters[booster] -= stockIncrease;
				this.mediator.setSettingNumber(this.getBoosterVarNameFromName(booster), this.boosters[booster]);
				this.mediator.setSettingBoolean(this.getBoosterSwitchFromName(booster), true);
				this.mediator.setSettingString(this.getBoosterDateFromName(booster), window.moment().format('YYYY-MM-DD HH:mm:ss'))
				const boosterOverallUse = this.mediator.getSettingNumber('boosterUseCount')
				if (typeof boosterOverallUse === 'number' && boosterOverallUse !== null) {
					this.mediator.setSettingNumber('boosterUseCount',boosterOverallUse + 1)
				} else {
					if(debugLogs) console.debug(`decrementBooster: "boosterUseCount" could not got read.`)
				}
				const boosterUse = this.mediator.getSettingNumber(this.getBoosterUseFromName(booster))
				if (typeof boosterUse === 'number' && boosterUse !== null) {
					this.mediator.setSettingNumber(this.getBoosterUseFromName(booster),boosterUse + 1)
				} else {
					if(debugLogs) console.debug(`decrementBooster: "${this.getBoosterUseFromName(booster)}" could not got read.`)
				}
				this.updateQuantityDisplay(booster);
			}
		} else {
			console.error(`value from ${this.getBoosterVarNameFromName(booster)} could not be read from Settings in decrementBooster()`)
		}
	}


	readBoostersStock() {
		if (this.mediator) {
			this.boosters = {
				'Temporal Tweaker': this.mediator.getSettingNumber('temporalTweaker') as number,
				'Perpetual Progress': this.mediator.getSettingNumber('perpetualProgress') as number,
				'Strategic Synapses': this.mediator.getSettingNumber('strategicSynapses') as number,
				'Accelerated Acquisition': this.mediator.getSettingNumber('acceleratedAcquisition') as number,
				'Linkers Lode': this.mediator.getSettingNumber('linkersLode') as number,
				'Effortless Expansion': this.mediator.getSettingNumber('effortlessExpansion') as number,
				'Recursive Reflection': this.mediator.getSettingNumber('recursiveReflection') as number,
				'Synaptic Surge': this.mediator.getSettingNumber('synapticSurge') as number,
				'Inspiration Infusion': this.mediator.getSettingNumber('inspirationInfusion') as number,
				'Title Titan': this.mediator.getSettingNumber('titleTitan') as number,
				'Precision Prism': this.mediator.getSettingNumber('precisionPrism') as number,
				'Hyperlink Harmony': this.mediator.getSettingNumber('hyperlinkHarmony') as number,
				'Ephemeral Euphoria': this.mediator.getSettingNumber('ephemeralEuphoria') as number,
				'Fortune Infusion': 1,
			};
		}
	}


	readIngrementStock() {
		if (this.mediator) {
			this.remainingStock = {
				'Nexus Node': this.mediator.getSettingNumber('nexusNode') as number,
				'Connection Crystal': this.mediator.getSettingNumber('connectionCrystal') as number,
				'Mastery Scroll': this.mediator.getSettingNumber('masteryScroll') as number,
				'Insight Prism': this.mediator.getSettingNumber('insightPrism') as number,
				'Reflective Essence': this.mediator.getSettingNumber('reflectiveEssence') as number,
				'Amplification Crystal': this.mediator.getSettingNumber('amplificationCrystal') as number,
				'Creative Catalyst': this.mediator.getSettingNumber('creativeCatalyst') as number,
				'Precision Lens': this.mediator.getSettingNumber('precisionLens') as number,
			};
		}
	}


	private createCraftingLayout() {
		this.readIngrementStock();
		const mainContent = this.containerEl.createEl('div'); // A wrapper for the entire crafting area
		mainContent.className = 'modal-crafting-wrapper';

		// 1. Section for displaying available ingredient stock
		const stockSection = mainContent.createDiv({ cls: 'crafting-stock-section' });
		stockSection.createEl('h3', { text: 'Your Ingredients' });

		// const stockDisplayGrid = stockSection.createDiv({ cls: 'stock-display-grid' });
		const stockDisplayGrid = stockSection.createDiv({ cls: 'stock-display-grid' }) as HTMLElement;
		const listOfUseableIngredientsToBeShown = elements
			.filter(item => item.level <= this.mediator.getSettingNumber('statusLevel'))
			.map(item => item.name);

		listOfUseableIngredientsToBeShown.forEach(elementName => {
			const increment = this.getIngerementFromName(elementName);
			const remainingStock = this.remainingStock[increment.name] || 0;
			const svgContent = this.resourceSvgMap[increment.name]; // Look up the SVG

			if (svgContent) {
				// Use the helper to display the icon and quantity
				createResourceDisplay(stockDisplayGrid, increment.name, remainingStock, svgContent);
			} else {
				// Fallback to text if no SVG is defined
				stockDisplayGrid.createEl('div', { text: `${increment.shortName} [${remainingStock}]`, cls: 'resource-text-fallback' });
			}
		});

		// 2. Section for displaying craftable booster recipes
		const recipesSection = mainContent.createDiv({ cls: 'crafting-recipes-section' });
		recipesSection.createEl('h3', { text: 'Craft Boosters' });

		boosterRecipes.forEach(recipe => {
			if (this.boosterAvailableForUse(recipe.name, this.mediator.getSettingNumber('statusLevel'))) {
				const recipeItem = recipesSection.createDiv({ cls: 'crafting-booster-item' });

				const recipeDetails = recipeItem.createDiv({ cls: 'crafting-booster-details' });
				recipeDetails.createEl('span', { text: `${recipe.name}` });
				recipeDetails.createEl('span', { text: ` ⇒ ` }); // Arrow separator

				// Display ingredients required for the recipe with icons
				recipe.incredients.forEach(ingredientText => {
					const [quantityStr, shortName] = ingredientText.split('x');
					const quantity = parseInt(quantityStr);
					const ingredient = elements.find(el => el.shortName === shortName); // Find the full ingredient object

					if (ingredient && this.resourceSvgMap[ingredient.name]) {
						// Use the helper, adding a class for specific recipe item styling
						createResourceDisplay(recipeDetails, ingredient.name, quantity, this.resourceSvgMap[ingredient.name]).addClass('recipe-ingredient-small');
					} else {
						// Fallback to text if no SVG or ingredient found
						recipeDetails.createSpan({ text: `${shortName} [${quantity}]`, cls: 'recipe-ingredient-text-fallback' });
					}
				});

				const buttonGroup = recipeItem.createDiv({ cls: 'crafting-booster-actions' });
				const craftButton = buttonGroup.createEl('button', { text: 'Craft' });
				craftButton.onclick = () => this.craftBoosterItem(recipe);

				const useInfoButton = buttonGroup.createEl('button', { text: '?' });
				useInfoButton.onclick = () => {
					new ModalInformationbox(this.app, this.getBoosterInforFromFromName(recipe.name)).open();
				};
			}
		});

		return mainContent; // Return the full crafting layout wrapper
	}



	private createBoosterList(labelText: string) {
		const container = this.containerEl.createEl('div');
		container.className = 'modal-checkbox-container';

		const stock = this.boosters[labelText];

		// Use regex to replace all spaces for CSS class/ID naming
		const label = container.createEl('div', { cls: `${labelText.replace(/ /g, '-')}` });

		const useButton = container.createEl('button');
		const momentDate = this.mediator.getSettingString(this.getBoosterDateFromName(labelText));

		if (momentDate && isMinutesPassed(window.moment(momentDate, 'YYYY-MM-DD HH:mm:ss'), this.getBoosterCooldownFromName(labelText)) == false) {
			if(debugLogs) console.debug(`Booster ${labelText} is still in cooldown for ${hoursUntilMinutesPassed(window.moment(momentDate, 'YYYY-MM-DD HH:mm:ss'), this.getBoosterCooldownFromName(labelText))} hours`);
			if(debugLogs) console.log(`createBoosterList: Stock amount ${stock}`)

			// OPTIONAL: Add booster icons here as well if you have them
			// const boosterSvg = this.boosterSvgMap[labelText]; // You'd need a separate map for booster SVGs
			// if (boosterSvg) {
			//     createResourceDisplay(label, labelText, stock, boosterSvg).addClass('booster-list-item-icon');
			// } else {
			label.createEl('div', { text: `${labelText} : (${stock})` });
			// }

			useButton.innerText = `cooldown ${hoursUntilMinutesPassed(window.moment(momentDate, 'YYYY-MM-DD HH:mm:ss'), this.getBoosterCooldownFromName(labelText))} hours`;
			useButton.id = `use-button-${labelText.replace(/ /g, '-')}`;
			useButton.onclick = () => {
				new ModalInformationbox(this.app, `${labelText} is for ${hoursUntilMinutesPassed(window.moment(momentDate, 'YYYY-MM-DD HH:mm:ss'), this.getBoosterCooldownFromName(labelText))} hours in cooldown and can only then be used again.`).open();
			};
		} else {
			// TODO: add booster icons here as soon as they are ready
			// const boosterSvg = this.boosterSvgMap[labelText];
			// if (boosterSvg) {
			//     createResourceDisplay(label, labelText, stock, boosterSvg).addClass('booster-list-item-icon');
			// } else {
			label.createEl('div', { text: `${labelText} : (${stock})` });
			// }

			useButton.innerText = 'Use';
			useButton.id = `use-button-${labelText.replace(/ /g, '-')}`;
			useButton.onclick = () => {
				this.useBoosterItem(labelText);
			};
		}

		const useInfoButton = container.createEl('button', { text: '?' });
		useInfoButton.id = `information-${labelText.replace(/ /g, '-')}`;
		useInfoButton.onclick = () => {
			new ModalInformationbox(this.app, this.getBoosterInforFromFromName(labelText)).open();
		};

		// Append elements to container in the desired order
		container.appendChild(label);
		container.appendChild(useButton);
		container.appendChild(useInfoButton);

		return container;
	}




	incrementItem(item: string) {
		const stock = this.remainingStock[item];
		if(debugLogs) console.debug(`incrementItem: stock = ${stock}`);
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
		if(debugLogs) console.debug(`use Booster ${labelText}`);
		if(labelText=='Fortune Infusion'){
			if(debugLogs) console.debug(`acquireIngredients();`)
			this.mediator.acquireIngredients(1,1,10)
		} else if (labelText=='Temporal Tweaker'){

		} else if (labelText=='Perpetual Progress'){
			this.mediator.setSettingBoolean('boosterFactorPerpetualProgress', true)
		} else if (labelText=='Strategic Synapses'){
			this.mediator.setSettingBoolean('boosterFactorStrategicSynapses', true)
		} else if (labelText=='Accelerated Acquisition'){

		} else if (labelText=='Linkers Lode'){
			this.mediator.setSettingBoolean('boosterFactorLinkersLode', true)
		} else if (labelText=='Effortless Expansion'){

		} else if (labelText=='Recursive Reflection'){
			this.mediator.setSettingBoolean('boosterFactorRecursiveReflection', true)
		} else if (labelText=='Synaptic Surge'){
			this.mediator.setSettingBoolean('boosterFactorSynapticSurge', true)
		} else if (labelText=='Inspiration Infusion'){

		} else if (labelText=='Title Titan'){
			this.mediator.setSettingBoolean('boosterFactorTitleTitan', true)
		} else if (labelText=='Precision Prism'){
			this.mediator.setSettingBoolean('boosterFactorPrecisionPrism', true)
		} else if (labelText=='Hyperlink Harmony'){
			this.mediator.setSettingBoolean('boosterFactorHyperlinkHarmony', true)
		} else if (labelText=='Ephemeral Euphoria'){
			this.mediator.setSettingBoolean('boosterFactorEphemeralEuphoria', true)
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
		const stockInfo = this.containerEl.querySelector(`.${labelText.replace(/ /g, '-')}`); // Use regex for all spaces

		if (stockInfo) {
			stockInfo.empty(); // Clear current content

			// TODO: add booster SVGs as soon when ready
			// const boosterSvg = this.boosterSvgMap[labelText];
			// if (boosterSvg) {
			//     createResourceDisplay(stockInfo, labelText, stock, boosterSvg).addClass('booster-list-item-icon');
			// } else {
			stockInfo.createEl('div', { text: `${labelText} : (${stock})` });
			// }
		}

		const buttonUse: HTMLButtonElement | null = this.containerEl.querySelector(`#use-button-${labelText.replace(/ /g, '-')}`);

		if (buttonUse !== null) {
			const momentDate = this.mediator.getSettingString(this.getBoosterDateFromName(labelText));

			if (momentDate && isMinutesPassed(window.moment(momentDate, 'YYYY-MM-DD HH:mm:ss'), this.getBoosterCooldownFromName(labelText)) == false) {
				buttonUse.setText(`cooldown ${hoursUntilMinutesPassed(window.moment(momentDate, 'YYYY-MM-DD HH:mm:ss'), this.getBoosterCooldownFromName(labelText))} hours`);
				buttonUse.onclick = () => {
					new ModalInformationbox(this.app, `${labelText} is for ${hoursUntilMinutesPassed(window.moment(momentDate, 'YYYY-MM-DD HH:mm:ss'), this.getBoosterCooldownFromName(labelText))} hours in cooldown and can only then be used again.`).open();
				};
			} else {
				buttonUse.setText('Use');
				buttonUse.onclick = () => {
					this.useBoosterItem(labelText);
				};
			}
		}
	}
	


	private checkIngredientsAvailability(incredients: { name: string; incredients: string[]; }) {
		for (const ingredient of incredients.incredients) {
			const [quantity, shortName] = ingredient.split('x');
			if(debugLogs) console.debug(`quantity: ${quantity}\tshortName: ${shortName}`)
			const requiredQuantity = parseInt(quantity);
			const availableStock = this.remainingStock[this.getIngerementNameFromShortName(shortName) || 0];
			if(debugLogs) console.debug(`requiredQuantity: ${requiredQuantity}\tavailableStock: ́${availableStock}`)
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
	
		if(debugLogs) console.debug(`total amount of ingrediments: ${totalAvailableIngredients}`)
		// If at least 1000 ingredients are available
		if (totalAvailableIngredients >= 1000) {
			// Burn ingredients proportionally
			//elements.forEach(increment => {
			listOfUseableIngredientsToBeShown.forEach(increment => {
				if (this.remainingStock[this.getIngerementFromName(increment).name]) {
					const proportionalAmount = Math.ceil((this.remainingStock[this.getIngerementFromName(increment).name] / totalAvailableIngredients) * 1000);
					//const rest = this.remainingStock[this.getIngerementFromName(increment).name] - proportionalAmount;
					//if(debugLogs) console.debug(`${this.getIngerementFromName(increment).shortName} ${this.remainingStock[this.getIngerementFromName(increment).name]} shall be ${this.remainingStock[this.getIngerementFromName(increment).name] - rest} = ${this.remainingStock[this.getIngerementFromName(increment).name]} - ${rest}`)
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
		const stockInfo = this.containerEl.querySelector('.stock-display-grid');

		if (stockInfo) {
			// Assert that stockInfo is an HTMLElement for TypeScript
			const stockInfoElement = stockInfo as HTMLElement;

			stockInfoElement.empty(); // Now TypeScript knows `empty()` exists

			const listOfUseableIngredientsToBeShown = elements
				.filter(item => item.level <= this.mediator.getSettingNumber('statusLevel'))
				.map(item => item.name);

			listOfUseableIngredientsToBeShown.forEach(elementName => {
				const increment = this.getIngerementFromName(elementName);
				const remainingStock = this.remainingStock[increment.name] || 0;
				const svgContent = this.resourceSvgMap[increment.name];

				if (svgContent) {
					createResourceDisplay(stockInfoElement, increment.name, remainingStock, svgContent); // Use the asserted element
				} else {
					stockInfoElement.createEl('div', { text: `${increment.shortName} [${remainingStock}]`, cls: 'resource-text-fallback' });
				}
			});
		}
	}



	private craftBoosterItem(selectedItems: { name: string; incredients: string[]; }) {
		// call here the recipe logic and reduce the stock
		if(selectedItems.name == 'Ephemeral Euphoria'){
			if(this.check1000IngredientsAvailableAndBurn()){
				this.updateBoosterStock(selectedItems.name, 1);
				this.mediator.setSettingNumber(this.getBoosterVarNameFromName(selectedItems.name), this.boosters[selectedItems.name]);
				if(debugLogs) console.debug(`craft booster ${selectedItems.name}`);
			} else {
				if(debugLogs) console.debug(`not enough ingredients for booster ${selectedItems.name} in stock`);
				new ModalInformationbox(this.app, `Not enough ingrediments available for '${selectedItems.name}'. Craft more Notes to collect new ingrediments.`).open();
			}
		} else if(selectedItems.name == 'Fortune Infusion'){
			new ModalInformationbox(this.app, `'${selectedItems.name}' cannot be crafted. It is acquired through special means.`).open();
		} else {
			if (this.checkIngredientsAvailability(selectedItems)) {
				if(debugLogs) console.debug(`craft booster ${selectedItems.name}`);
				this.updateBoosterStock(selectedItems.name, 1);
				this.mediator.setSettingNumber(this.getBoosterVarNameFromName(selectedItems.name), this.boosters[selectedItems.name]);
				this.useIngrediments(selectedItems);
				//this.updateQuantityDisplay(selectedItems.name)
				this.updateStockInformation();
			} else {
				if(debugLogs) console.debug(`not enough ingredients for booster ${selectedItems.name} in stock`);
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
		// Fallback for when an element isn't found
		return { name: name, shortName: '?', varName: '' };
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
