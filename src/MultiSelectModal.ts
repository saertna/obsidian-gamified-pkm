import {App, Modal, Notice} from 'obsidian';
import {
	elements,
	IngredientElement,
	boosterRecipes,
	listOfUseableBoostersToBeShown,
	listOfUseableIngredientsToBeShown,
	debugLogs
} from './data/constants';
import { ModalInformationbox } from 'ModalInformationbox';
import { GamificationMediator } from './GamificationMediator';
import {appendSafeSvg, hoursUntilMinutesPassed, isMinutesPassed} from "./Utils";
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
} from './data/resourceIcons';
import { Booster } from './interfaces/Booster'
import { getBoosterByName, allBoosters} from './data/boosterDefinitions';
//import {updateIngredientStock} from './GamificationMediatorImpl';

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
		this.refresh();
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
		return activeDocument.createElement('div');
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
				'Temporal Tweaker': this.mediator.getSettingNumber('temporalTweaker'),
				'Perpetual Progress': this.mediator.getSettingNumber('perpetualProgress'),
				'Strategic Synapses': this.mediator.getSettingNumber('strategicSynapses'),
				'Accelerated Acquisition': this.mediator.getSettingNumber('acceleratedAcquisition'),
				'Linkers Lode': this.mediator.getSettingNumber('linkersLode'),
				'Effortless Expansion': this.mediator.getSettingNumber('effortlessExpansion'),
				'Recursive Reflection': this.mediator.getSettingNumber('recursiveReflection'),
				'Synaptic Surge': this.mediator.getSettingNumber('synapticSurge'),
				'Inspiration Infusion': this.mediator.getSettingNumber('inspirationInfusion'),
				'Title Titan': this.mediator.getSettingNumber('titleTitan'),
				'Precision Prism': this.mediator.getSettingNumber('precisionPrism'),
				'Hyperlink Harmony': this.mediator.getSettingNumber('hyperlinkHarmony'),
				'Ephemeral Euphoria': this.mediator.getSettingNumber('ephemeralEuphoria'),
				'Fortune Infusion': 1,
			};
		}
	}


	refresh() {
		const scrollPos = this.contentEl.scrollTop;

		this.contentEl.empty();
		const layout = this.createCraftingLayout();

		if (layout) {
			this.contentEl.appendChild(layout);
		}

		window.requestAnimationFrame(() => {
			this.contentEl.scrollTop = scrollPos;
		});
	}



	readIngrementStock() {
		if (this.mediator) {
			this.remainingStock = {
				'Nexus Node': this.mediator.getSettingNumber('nexusNode'),
				'Connection Crystal': this.mediator.getSettingNumber('connectionCrystal'),
				'Mastery Scroll': this.mediator.getSettingNumber('masteryScroll'),
				'Insight Prism': this.mediator.getSettingNumber('insightPrism'),
				'Reflective Essence': this.mediator.getSettingNumber('reflectiveEssence'),
				'Amplification Crystal': this.mediator.getSettingNumber('amplificationCrystal'),
				'Creative Catalyst': this.mediator.getSettingNumber('creativeCatalyst'),
				'Precision Lens': this.mediator.getSettingNumber('precisionLens'),
			};
		}
	}

	// Layout to Craft boosters
	private createCraftingLayout(): HTMLDivElement {
		this.readIngrementStock();
		this.readBoostersStock();

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
				appendSafeSvg(boosterIconHolder, booster.svg);
				boosterIconHolder.style.color = booster.color;
				boosterIconHolder.setAttribute('title', booster.description);

				// Booster Name
				boosterIdentity.createEl('span', { text: booster.name, cls: 'booster-name' });

				const stock = this.boosters[booster.name] || 0;
				const stockDisplay = boosterIdentity.createEl('span', {
					text: ` [Stock: ${stock}]`,
					cls: 'booster-stock-count-crafting'
				});
				// Visual cue: if stock is 0, make it a bit more subtle
				if (stock === 0) stockDisplay.classList.add('gpkm-stock-empty');
				else stockDisplay.classList.remove('gpkm-stock-empty');


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
				craftButton.onclick = () => {
					void this.craftBoosterItem(booster);
					this.refresh();
				}

				const useInfoButton = buttonGroup.createEl('button', { text: '?' });
				useInfoButton.onclick = () => {
					new ModalInformationbox(this.app, booster.description).open();
				};
			}
		});

		return mainContent;
	}


	// Layout to use Boosters
	private createBoosterList(labelText: string): HTMLDivElement | undefined {
		const boosterDefinition = getBoosterByName(labelText);

		if (!boosterDefinition) {
			console.warn(`Booster definition not found for: ${labelText}. Skipping display.`);
			return undefined;
		}

		const container = this.containerEl.createEl('div');
		container.className = 'modal-checkbox-container';

		const stock = this.boosters[labelText] || 0;

		// 2. Create the inner div that will hold the icon, name, and stock information.
		const boosterDetailsContainer = container.createEl('div', { cls: `booster-item-${boosterDefinition.id}` });
		boosterDetailsContainer.addClass('booster-list-item-icon');

		// --- ADDED: Stock display field ---
		const stockDisplay = boosterDetailsContainer.createEl('span', {
			text: ` (Stock: ${stock})`,
			cls: 'booster-stock-count'
		});
		// Optional: make it look a bit different if empty
		if (stock === 0) stockDisplay.classList.add('gpkm-stock-empty');
		else stockDisplay.classList.remove('gpkm-stock-empty');


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

		// Initial helper call
		createBoosterDisplay(boosterDetailsContainer, boosterDefinition);

		// LOGIC FOR BUTTON STATE
		if (momentDateString) {
			const momentDate = window.moment(momentDateString, 'YYYY-MM-DD HH:mm:ss');

			if (!isMinutesPassed(momentDate, cooldownDurationMinutes)) {
				// CASE 1: Cooldown Active
				const hoursRemaining = hoursUntilMinutesPassed(momentDate, cooldownDurationMinutes);
				useButton.innerText = `cooldown ${hoursRemaining.toFixed(1)} hours`;
				useButton.disabled = true;
				useButton.addClass('cooldown');
				useButton.onclick = () => {
					new ModalInformationbox(this.app, `${labelText} is for ${hoursRemaining.toFixed(1)} hours in cooldown and can only then be used again.`).open();
				};
				return container; // Exit early for this item
			}
		}

		// CASE 2: No Cooldown, but check Stock
		if (stock <= 0) {
			useButton.innerText = 'Out of Stock';
			useButton.disabled = true;
			useButton.addClass('gpkm-out-of-stock');
		} else {
			// CASE 3: Ready to use
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
			void this.mediator.acquireIngredients(1,1,10)
		} else if (labelText=='Temporal Tweaker'){
			if(debugLogs) console.debug(`left empty by intention as Temporal Tweaker not implemented yet`);
		} else if (labelText=='Perpetual Progress'){
			this.mediator.setSettingBoolean('boosterFactorPerpetualProgress', true)
		} else if (labelText=='Strategic Synapses'){
			this.mediator.setSettingBoolean('boosterFactorStrategicSynapses', true)
		} else if (labelText=='Accelerated Acquisition'){
			if(debugLogs) console.debug(`left empty by intention as Accelerated Acquisition not implemented yet`);
		} else if (labelText=='Linkers Lode'){
			this.mediator.setSettingBoolean('boosterFactorLinkersLode', true)
		} else if (labelText=='Effortless Expansion'){
			if(debugLogs) console.debug(`left empty by intention as Effortless Expansion not implemented yet`);
		} else if (labelText=='Recursive Reflection'){
			this.mediator.setSettingBoolean('boosterFactorRecursiveReflection', true)
		} else if (labelText=='Synaptic Surge'){
			this.mediator.setSettingBoolean('boosterFactorSynapticSurge', true)
		} else if (labelText=='Inspiration Infusion'){
			if(debugLogs) console.debug(`left empty by intention as Inspiration Infusion not implemented yet`);
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

		const _stock = this.boosters[labelText] || 0;

		// Use the booster's 'id' for a consistent DOM element selector
		const stockInfoSelector = `.booster-item-${boosterDefinition.id}`; // Example class: 'booster-item-temporalTweaker'
		const stockInfo = this.containerEl.querySelector(stockInfoSelector) as HTMLElement;

		if (stockInfo) {
			stockInfo.empty();

			// 2. Pass the booster definition and stock to the display function
			createBoosterDisplay(stockInfo, boosterDefinition);
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
		if(debugLogs) console.debug(`Checking ingredients for Booster: ${booster.name}`);

		for (const requiredIngredient of booster.ingredients) {
			const fullIngredientDefinition: IngredientElement | undefined = elements.find(el => el.shortName === requiredIngredient.type);

			if (!fullIngredientDefinition) {
				if(debugLogs) console.error(`Ingredient definition not found for shortName: ${requiredIngredient.type}. Cannot check availability for ${booster.name}.`);
				return false;
			}

			const currentStock = this.remainingStock[fullIngredientDefinition.name] || 0;

			if (currentStock < requiredIngredient.quantity) {
				if(debugLogs) console.debug(`Not enough ${fullIngredientDefinition.name} for ${booster.name}. Needed: ${requiredIngredient.quantity}, Have: ${currentStock}.`);
				return false;
			}
		}

		return true;
	}

	private async check1000IngredientsAvailableAndBurn(): Promise<boolean> {
		let totalAvailableIngredients = 0;
		const ingredientsToUpdate: { name: string; newAmount: number }[] = [];

		// First pass: calculate total available ingredients (using in-memory remainingStock)
		// Note: listOfUseableIngredientsToBeShown should contain full ingredient names
		listOfUseableIngredientsToBeShown.forEach(ingredientName => {
			totalAvailableIngredients += this.remainingStock[ingredientName] || 0;
		});

		if(debugLogs) console.debug(`total amount of ingredients: ${totalAvailableIngredients}`)

		if (totalAvailableIngredients >= 1000) {
			if (ingredientsToUpdate.length > 0) {
				await this.mediator.updateMultipleIngredients(ingredientsToUpdate);
			}

			this.updateStockInformation();
			return true;
		}

		return false;
	}


	private async useIngrediments(booster: Booster): Promise<void> {
		console.debug(`Using ingredients for Booster: ${booster.name}`);

		let changesMade = false;

		for (const requiredIngredient of booster.ingredients) {
			const fullIngredientDefinition: IngredientElement | undefined = elements.find(el => el.shortName === requiredIngredient.type);

			if (!fullIngredientDefinition) {
				console.error(`Ingredient definition not found for shortName: ${requiredIngredient.type}. Cannot reduce stock for ${booster.name}.`);
				continue;
			}

			const currentStockInSettings = this.mediator.getSettingNumber(fullIngredientDefinition.varName);
			const currentStock = currentStockInSettings !== null ? currentStockInSettings : (this.remainingStock[fullIngredientDefinition.name] || 0);
			const newStock = Math.max(0, currentStock - requiredIngredient.quantity); // Ensure stock doesn't go below 0

			if (newStock !== currentStock) {
				this.remainingStock[fullIngredientDefinition.name] = newStock;

				this.mediator.setSettingNumber(fullIngredientDefinition.varName, newStock);
				changesMade = true;
				console.debug(`Reduced ${fullIngredientDefinition.name} by ${requiredIngredient.quantity}. New stock: ${newStock}`);
			} else if (newStock === currentStock && requiredIngredient.quantity > 0) {
				console.warn(`Attempted to reduce ${fullIngredientDefinition.name} by ${requiredIngredient.quantity}, but stock did not change from ${currentStock}.`);
			}
		}

		if (changesMade) {
			await this.mediator.saveSettings();
		}
		this.updateStockInformation();
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



	private async craftBoosterItem(selectedBooster: Booster) {
		const boosterName = selectedBooster.name;
		//const boosterId = selectedBooster.id;

		if (boosterName === 'Ephemeral Euphoria') {
			if (await this.check1000IngredientsAvailableAndBurn()) {
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
			if (this.checkIngredientsAvailability(selectedBooster)) {
				if (debugLogs) console.debug(`craft booster ${boosterName}`);
				this.updateBoosterStock(boosterName, 1);
				this.mediator.setSettingNumber(this.getBoosterVarNameFromName(boosterName), this.boosters[boosterName]); // Adjust getBoosterVarNameFromName if it needs boosterId
				void this.useIngrediments(selectedBooster);
				this.updateStockInformation();
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
		return null;
	}

	private getIngerementShortNameFromName(name: string) {
		for (const element of elements) {
			if (element.name === name) {
				return element.shortName;
			}
		}
		return null;
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
		return null;
	}

	private getIngerementVarNameFromName(name: string) {
		for (const element of elements) {
			if (element.name === name) {
				return element.varName;
			}
		}
		return null;
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
