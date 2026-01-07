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
	createBoosterDisplay,
	connectionCrystalSvg,
	nexusNodeSvg,
	masteryScrollSvg,
	insightPrismSvg,
	reflectiveEssenceSvg,
	amplificationCrystalSvg,
	creativeCatalystSvg,
	precisionLensSvg, createRecipeDisplay
} from './resourceIcons';
import { Booster } from './interfaces/Booster'
import { getBoosterByName, allBoosters} from './data/boosterDefinitions';


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
	private boosterSvgMap: Record<string, string>;

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
		contentEl.empty(); // Clears any existing content

		this.readBoostersStock();

		if (this.useBooster) {
			// Iterate over all boosters from the new centralized 'allBoosters' object
			Object.values(allBoosters).forEach(booster => { // Changed from boosterRecipes
				if (this.boosterAvailableForUse(booster.name, this.mediator.getSettingNumber('statusLevel'))) {
					const listItem = this.createItemContainer(booster.name); // createItemContainer returns HTMLDivElement | undefined
					if (listItem) { // Add this check! Only append if listItem is not undefined
						contentEl.appendChild(listItem);
					}
				}
			});

			const fortuneInfusionBooster = getBoosterByName('Fortune Infusion'); // Use the exact name
			if (fortuneInfusionBooster) { // Check if the booster was found
				const listItem = this.createItemContainer(fortuneInfusionBooster.name);
				if (listItem) { // Add this check!
					contentEl.appendChild(listItem);
				}
			}
		} else {
			const craftingLayout = this.createCraftingLayout(); // Assuming this always returns an HTMLElement
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


	private createItemContainer(labelText: string): HTMLDivElement | undefined {
		if (this.useBooster) {
			return this.createBoosterList(labelText);
		}
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


	private createCraftingLayout(): HTMLDivElement {
		this.readIngrementStock();
		const mainContent = this.containerEl.createEl('div');
		mainContent.className = 'modal-crafting-wrapper';

		// 1. Section for displaying available ingredient stock (no change here)
		const stockSection = mainContent.createDiv({ cls: 'crafting-stock-section' });
		stockSection.createEl('h3', { text: 'Your Ingredients' });

		const stockDisplayGrid = stockSection.createDiv({ cls: 'stock-display-grid' }) as HTMLElement;
		const listOfUseableIngredientsToBeShown = elements
			.filter(item => item.level <= this.mediator.getSettingNumber('statusLevel'))
			.map(item => item.name);

		listOfUseableIngredientsToBeShown.forEach(elementName => {
			const increment = this.getIngerementFromName(elementName);
			const remainingStock = this.remainingStock[increment.name] || 0;
			const svgContent = this.resourceSvgMap[increment.name];

			if (svgContent) {
				createResourceDisplay(stockDisplayGrid, increment.name, remainingStock, svgContent);
			} else {
				stockDisplayGrid.createEl('div', { text: `${increment.shortName} [${remainingStock}]`, cls: 'resource-text-fallback' });
			}
		});

		// 2. Section for displaying craftable booster recipes
		const recipesSection = mainContent.createDiv({ cls: 'crafting-recipes-section' });
		recipesSection.createEl('h3', { text: 'Craft Boosters' });

		Object.values(allBoosters).forEach(booster => {
			if (this.boosterAvailableForUse(booster.name, this.mediator.getSettingNumber('statusLevel'))) {
				const recipeItem = recipesSection.createDiv({ cls: 'crafting-booster-item' });

				// This container will hold Booster Identity and the Ingredients block
				const boosterInfoAndIngredients = recipeItem.createDiv({ cls: 'booster-info-and-ingredients' }); // NEW WRAPPER

				// Wrapper for Booster Icon and Name
				const boosterIdentity = boosterInfoAndIngredients.createDiv({ cls: 'booster-identity' });

				// Booster Icon
				const boosterIconHolder = boosterIdentity.createDiv({ cls: 'gamified-pkm-booster-icon-holder' });
				boosterIconHolder.innerHTML = booster.svg;
				boosterIconHolder.style.color = booster.color;
				boosterIconHolder.setAttribute('title', booster.description);

				// Booster Name
				boosterIdentity.createEl('span', { text: booster.name, cls: 'booster-name' });

				// Wrapper for Ingredients (two line display)
				const boosterRecipeIngredients = boosterInfoAndIngredients.createDiv({ cls: 'booster-recipe-ingredients' });

				// Display ingredients required for the recipe with icons
				if (booster.specialIngredientRequirement === 'free all 22h' && booster.id === 'fortuneInfusion') {
					boosterRecipeIngredients.createSpan({ text: '(Free every 22h)', cls: 'recipe-ingredient-text-free' });
				} else if (booster.specialIngredientRequirement === 'all pots' && booster.id === 'ephemeralEuphoria') {
					boosterRecipeIngredients.createSpan({ text: '(1000 total from all pots)', cls: 'recipe-ingredient-text-all-pots' });
				} else if (booster.ingredients.length > 0) {
					booster.ingredients.forEach(ingredient => {
						const fullIngredient = elements.find(el => el.shortName === ingredient.type);

						if (fullIngredient && this.resourceSvgMap[fullIngredient.name]) {
							// Create a wrapper for each ingredient item for precise styling
							const ingredientWrapper = boosterRecipeIngredients.createDiv({ cls: 'recipe-ingredient-item' }); // NEW CLASS
							createRecipeDisplay(ingredientWrapper, fullIngredient.name, ingredient.quantity, this.resourceSvgMap[fullIngredient.name]);
						} else {
							boosterRecipeIngredients.createSpan({ text: `${ingredient.type} [${ingredient.quantity}]`, cls: 'recipe-ingredient-text-fallback' });
						}
					});
				}

				// Crafting Actions (buttons)
				const buttonGroup = recipeItem.createDiv({ cls: 'crafting-booster-actions' });
				const craftButton = buttonGroup.createEl('button', { text: 'Craft' });
				craftButton.onclick = () => this.craftBoosterItem(booster);

				const useInfoButton = buttonGroup.createEl('button', { text: '?' });
				useInfoButton.onclick = () => {
					new ModalInformationbox(this.app, booster.description).open();
				};
			}
		});

		return mainContent;
	}



	private createBoosterList(labelText: string): HTMLDivElement | undefined {
		const boosterDefinition = getBoosterByName(labelText);

		if (!boosterDefinition) {
			console.warn(`Booster definition not found for: ${labelText}. Skipping display.`);
			return undefined; // Explicitly return undefined
		}

		// 1. Create the outer container for the entire booster list item
		const container = this.containerEl.createEl('div');
		container.className = 'modal-checkbox-container';

		const stock = this.boosters[labelText] || 0;

		// 2. Create the inner div that will hold the icon, name, and stock information.
		const boosterDetailsContainer = container.createEl('div', { cls: `booster-item-${boosterDefinition.id}` });

		boosterDetailsContainer.addClass('booster-list-item-icon');


		// 3. Create the 'Use' button
		const useButton = container.createEl('button');
		useButton.id = `use-button-${boosterDefinition.id}`;

		// 4. Create the 'Info' button
		const useInfoButton = container.createEl('button', { text: '?' });
		useInfoButton.id = `information-${labelText.replace(/ /g, '-')}`;
		useInfoButton.onclick = () => {
			new ModalInformationbox(this.app, this.getBoosterInforFromFromName(labelText)).open();
		};

		const cooldownDurationSeconds = boosterDefinition.cooldown;
		const cooldownDurationMinutes = cooldownDurationSeconds / 60;
		const momentDateString = this.mediator.getSettingString(boosterDefinition.boosterDateSettingKey);

		if (momentDateString) {
			const momentDate = window.moment(momentDateString, 'YYYY-MM-DD HH:mm:ss');

			if (!isMinutesPassed(momentDate, cooldownDurationMinutes)) {
				const hoursRemaining = hoursUntilMinutesPassed(momentDate, cooldownDurationMinutes);
				if (debugLogs) console.debug(`Booster ${labelText} is still in cooldown for ${hoursRemaining.toFixed(1)} hours`);
				if (debugLogs) console.log(`createBoosterList: Stock amount ${stock}`);

				createBoosterDisplay(boosterDetailsContainer, boosterDefinition, stock);

				useButton.innerText = `cooldown ${hoursRemaining.toFixed(1)} hours`;
				useButton.disabled = true;
				useButton.addClass('cooldown');
				useButton.onclick = () => {
					new ModalInformationbox(this.app, `${labelText} is for ${hoursRemaining.toFixed(1)} hours in cooldown and can only then be used again.`).open();
				};
			} else {
				createBoosterDisplay(boosterDetailsContainer, boosterDefinition, stock);

				useButton.innerText = 'Use';
				useButton.disabled = false;
				useButton.onclick = () => {
					this.useBoosterItem(labelText);
				};
			}
		} else {
			createBoosterDisplay(boosterDetailsContainer, boosterDefinition, stock);

			useButton.innerText = 'Use';
			useButton.disabled = false;
			useButton.onclick = () => {
				this.useBoosterItem(labelText);
			};
		}

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
		// 1. Get the full booster definition using the labelText (booster name)
		const boosterDefinition = getBoosterByName(labelText);

		if (!boosterDefinition) {
			console.warn(`Booster definition not found for: ${labelText}. Cannot display.`);
			return;
		}

		const stock = this.boosters[labelText] || 0;

		// Use the booster's 'id' for a consistent DOM element selector
		const stockInfoSelector = `.booster-item-${boosterDefinition.id}`; // Example class: 'booster-item-temporalTweaker'
		const stockInfo = this.containerEl.querySelector(stockInfoSelector) as HTMLElement;

		if (stockInfo) {
			stockInfo.empty();

			// 2. Pass the booster definition and stock to the display function
			createBoosterDisplay(stockInfo, boosterDefinition, stock);
		} else {
			console.warn(`Display element (selector: ${stockInfoSelector}) not found for booster: ${labelText}. Ensure it's rendered.`);
		}

		const buttonUseId = `#use-button-${boosterDefinition.id}`;
		const buttonUse: HTMLButtonElement | null = this.containerEl.querySelector(buttonUseId);

		if (buttonUse !== null) {
			const cooldownDurationSeconds = boosterDefinition.cooldown;
			const lastUsedSettingKey = boosterDefinition.boosterDateSettingKey;
			const momentDateString = this.mediator.getSettingString(lastUsedSettingKey);

			if (momentDateString) {
				const lastUsedMoment = window.moment(momentDateString, 'YYYY-MM-DD HH:mm:ss');

				const cooldownDurationMinutes = cooldownDurationSeconds / 60;

				if (!isMinutesPassed(lastUsedMoment, cooldownDurationMinutes)) {
					const hoursRemaining = hoursUntilMinutesPassed(lastUsedMoment, cooldownDurationMinutes);
					buttonUse.setText(`Cooldown: ${hoursRemaining.toFixed(1)}h`);
					buttonUse.disabled = true;
					buttonUse.onclick = () => {
						new ModalInformationbox(this.app, `${labelText} is in cooldown for ${hoursRemaining.toFixed(1)} hours.`).open();
					};
				} else {
					buttonUse.setText('Use');
					buttonUse.disabled = false;
					buttonUse.onclick = () => {
						this.useBoosterItem(labelText);
					};
				}
			} else {
				buttonUse.setText('Use');
				buttonUse.disabled = false;
				buttonUse.onclick = () => {
					this.useBoosterItem(labelText);
				};
			}
		}
	}


	private checkIngredientsAvailability(booster: Booster): boolean {
		for (const ingredient of booster.ingredients) {
			if ((this.remainingStock[ingredient.type] || 0) < ingredient.quantity) {
				return false;
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


	private useIngrediments(booster: Booster) {
		for (const ingredient of booster.ingredients) {
			this.remainingStock[ingredient.type] = (this.remainingStock[ingredient.type] || 0) - ingredient.quantity;
			this.updateStockInformation();
		}
	}


	private updateStockInformation() {
		const stockInfo = this.containerEl.querySelector('.stock-display-grid');

		if (stockInfo) {
			const stockInfoElement = stockInfo as HTMLElement;
			stockInfoElement.empty();

			const listOfUseableIngredientsToBeShown = elements
				.filter(item => item.level <= this.mediator.getSettingNumber('statusLevel'))
				.map(item => item.name);

			listOfUseableIngredientsToBeShown.forEach(elementName => {
				const increment = this.getIngerementFromName(elementName);
				const remainingStock = this.remainingStock[increment.name] || 0;
				const svgContent = this.resourceSvgMap[increment.name];

				if (svgContent) {
					createResourceDisplay(stockInfoElement, increment.name, remainingStock, svgContent);
				} else {
					stockInfoElement.createEl('div', { text: `${increment.shortName} [${remainingStock}]`, cls: 'resource-text-fallback' });
				}
			});
		}
	}



	private craftBoosterItem(selectedBooster: Booster) {
		const boosterName = selectedBooster.name;
		//const boosterId = selectedBooster.id;

		if (boosterName === 'Ephemeral Euphoria') {
			if (this.check1000IngredientsAvailableAndBurn()) {
				this.updateBoosterStock(boosterName, 1);
				this.mediator.setSettingNumber(this.getBoosterVarNameFromName(boosterName), this.boosters[boosterName]); // Adjust getBoosterVarNameFromName if it needs boosterId
				if (debugLogs) console.debug(`craft booster ${boosterName}`);
			} else {
				if (debugLogs) console.debug(`not enough ingredients for booster ${boosterName} in stock`);
				new ModalInformationbox(this.app, `Not enough ingredients available for '${boosterName}'. Craft more Notes to collect new ingredients.`).open();
			}
		} else if (boosterName === 'Fortune Infusion') {
			new ModalInformationbox(this.app, `'${boosterName}' cannot be crafted. It is acquired through special means.`).open();
		} else {
			// --- IMPORTANT: Update checkIngredientsAvailability and useIngrediments ---
			// These functions will now receive `selectedBooster` (type Booster)
			// or specifically `selectedBooster.ingredients` (type Ingredient[]).
			// You'll need to adapt their implementation to work with the `Ingredient[]` structure
			// instead of the old `string[]` format.
			if (this.checkIngredientsAvailability(selectedBooster)) { // Pass the Booster object
				if (debugLogs) console.debug(`craft booster ${boosterName}`);
				this.updateBoosterStock(boosterName, 1);
				this.mediator.setSettingNumber(this.getBoosterVarNameFromName(boosterName), this.boosters[boosterName]); // Adjust getBoosterVarNameFromName if it needs boosterId
				this.useIngrediments(selectedBooster); // Pass the Booster object
				this.updateStockInformation(); // Assuming this refreshes ingredient displays
			} else {
				if (debugLogs) console.debug(`not enough ingredients for booster ${boosterName} in stock`);
				new ModalInformationbox(this.app, `Not enough ingredients available for '${boosterName}'. Craft more Notes to collect new ingredients.`).open();
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

	private getBoosterVarNameFromName(boosterName: string): string {
		const booster = getBoosterByName(boosterName);
		return booster ? booster.id : '';
	}

	private getBoosterInforFromFromName(boosterName: string) {
		for (const element of boosterRecipes) {
			if (element.name === boosterName) {
				return element.description;
			}
		}
		return '';
	}

	private getBoosterSwitchFromName(boosterName: string): string {
		const booster = getBoosterByName(boosterName);
		return booster ? booster.boosterFactorSwitchSettingKey : '';
	}

	private getBoosterDateFromName(boosterName: string): string {
		const booster = getBoosterByName(boosterName);
		return booster ? booster.boosterDateSettingKey : `boosterDateUnknown-${boosterName}`;
	}

	private getBoosterCooldownFromName(boosterName: string) {
		const booster = getBoosterByName(boosterName);
		return booster ? booster.cooldown / 60 : 0;
	}

	private getBoosterUseFromName(boosterName: string): string {
		const booster = getBoosterByName(boosterName);
		// If a booster is found, return its boosterUseCountName.
		// Otherwise, return an empty string as per your original logic.
		return booster ? booster.boosterUseCountName : '';
	}


}
