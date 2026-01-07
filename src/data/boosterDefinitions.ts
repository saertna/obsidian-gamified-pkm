import { Booster, Ingredient } from '../interfaces/Booster';

// Helper function to parse ingredient strings like '20xS1'
function parseIngredients(ingredientStrings: string[]): Ingredient[] {
	if (!Array.isArray(ingredientStrings) || ingredientStrings.length === 0) {
		return [];
	}
	return ingredientStrings.map(str => {
		const match = str.match(/(\d+)x(S\d+|SX)/);
		if (match) {
			return { type: match[2], quantity: parseInt(match[1], 10) };
		}
		return { type: 'UNKNOWN', quantity: 0 };
	}).filter(item => item.type !== 'UNKNOWN');
}


export const allBoosters: Booster[] = [
	{
		id: 'temporalTweaker',
		name: 'Temporal Tweaker',
		description: 'Temporal Tweaker: reset the cooldown phase for a booster your choice',
		runtime: 0 * 60,
		cooldown: 0 * 60,
		boosterUseCountName: 'boosterUseCountTemporalTweaker',
		boosterDateSettingKey: 'boosterDateTemporalTweaker',
		boosterFactorSwitchSettingKey: '',
		ingredients: parseIngredients(['20xS1', '10xS6']),
		svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
  <path d="M12.5 7v5.25l4.5 2.25-.75 1.5-5.25-2.62V7h1z"/>
  <path d="M15.03 8.97a7 7 0 0 0-6.42-.03L9.5 7.5l-3 3 3 3 .71-.71-1.07-1.07a5.5 5.5 0 0 1 5.37-.02l.71.71 3-3-3-3-.71-.71z" fill="currentColor"/>
</svg>`,
		color: '#4CAF50' // Dark green
	},
	{
		id: 'perpetualProgress',
		name: 'Perpetual Progress',
		description: 'Perpetual Progress: get 3 times points an all your actions for the next 4 hours. You can use Perpetual Progress every three days, if you have the ingredients to craft it.',
		runtime: 4 * 60 * 60, // 4 hours -> 4 * 60 minutes -> 4 * 60 * 60 seconds
		cooldown: 3 * 24 * 60 * 60, // 3 days -> 3 * 24 * 60 * 60 seconds
		boosterUseCountName: 'boosterUseCountPerpetualProgress',
		boosterDateSettingKey: 'boosterDatePerpetualProgress',
		boosterFactorSwitchSettingKey: 'boosterFactorPerpetualProgress',
		ingredients: parseIngredients(['20xS2', '10xS4']),
		svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 2l-8 10h5v10h6V12h5L12 2zM9 12v8h6v-8H9z" fill="currentColor"/>
  <path d="M12 4.16L18.84 12H16v8H8v-8H5.16L12 4.16zM10 18h4v-6h-4v6z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M12 4L4 12h5v8h6v-8h5L12 4zM9 12v6h6v-6H9z" fill="currentColor"/>
</svg>`,
		color: '#FFC107', // Amber
		multiplier: 3
	},
	{
		id: 'strategicSynapses',
		name: 'Strategic Synapses',
		description: 'Strategic Synapses: gain 3 times EP for all actions on Map Of Content ratings for the next 4 hours. This booster has a cooldown time of 5 days.',
		runtime: 4 * 60 * 60,
		cooldown: 5 * 24 * 60 * 60,
		boosterUseCountName: 'boosterUseCountStrategicSynapses',
		boosterDateSettingKey: 'boosterDateStrategicSynapses',
		boosterFactorSwitchSettingKey: 'boosterFactorStrategicSynapses',
		ingredients: parseIngredients(['30xS1', '20xS2']),
		svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 2C8.13 2 5 5.13 5 9c0 2.37 1.34 4.45 3.32 5.5V17H7v2h1v4h8v-4h1v-2h-1v-2.5c1.98-1.05 3.32-3.13 3.32-5.5C19 5.13 15.87 2 12 2zM8 7c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm4 10h-2v-2h2v2zm0-4h-2v-2h2v2zm-2-2c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm4 0c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9-2-2z" fill="currentColor"/>
  <path d="M12 2C8.13 2 5 5.13 5 9c0 2.37 1.34 4.45 3.32 5.5V17H7v2h1v4h8v-4h1v-2h-1v-2.5c1.98-1.05 3.32-3.13 3.32-5.5C19 5.13 15.87 2 12 2zm-2 5c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm0 8h4v-2h-4v2zm-2-2h-2v-2h2v2zM12 22h-2v-2h2v2zm4-8h-4v-2h4v2zm2 2h-2v-2h2v2zm0-8c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9-2-2z" fill="currentColor"/>
</svg>`,
		color: '#9C27B0', // Deep Purple
		multiplier: 3
	},
	{
		id: 'acceleratedAcquisition',
		name: 'Accelerated Acquisition',
		description: 'Accelerated Acquisition: Use Accelerated Acquisition and collect much faster for the next 12 hours all sorts of ingredients when creating and improving notes',
		runtime: 12 * 60 * 60, // 12 hours -> 12 * 60 minutes -> 12 * 60 * 60 seconds
		cooldown: 36 * 60 * 60, // 36 hours (your code has 36*60 minutes)
		boosterUseCountName: 'boosterUseCountAcceleratedAcquisition',
		boosterDateSettingKey: 'boosterDateAcceleratedAcquisition',
		boosterFactorSwitchSettingKey: '', // No factor switch for this one, implies it might be a direct rate increase
		ingredients: parseIngredients(['10xS3', '20xS4']),
		svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M13 3h-2v10h2V3z"/>
  <path d="M16.5 7.5L12 3 7.5 7.5l1.41 1.41L12 6.32l3.09 3.09 1.41-1.41z"/>
  <path d="M19 12h2L12 2 3 12h2l7-7 7 7z" fill="currentColor"/>
  <path d="M19 12h2L12 2 3 12h2l7-7 7 7zm-7-9L5 12h3v8h8v-8h3L12 3zm0 14H9v-6h6v6z" fill="currentColor"/>
  <path d="M12 2L4 12h5v8h6v-8h5L12 2zm0 17c-2.76 0-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 2.76-2.24 5-5 5z" fill="currentColor"/>
</svg>`,
		color: '#2196F3', // Blue
		multiplier: 2
	},
	{
		id: 'linkersLode',
		name: 'Linkers Lode',
		description: 'Linkers Lode: collect extra points when creating chain of thoughts for the next 3 hours. (cooldown 2 days)',
		runtime: 3 * 60 * 60,
		cooldown: 2 * 24 * 60 * 60,
		boosterUseCountName: 'boosterUseCountLinkersLode',
		boosterDateSettingKey: 'boosterDateLinkersLode',
		boosterFactorSwitchSettingKey: 'boosterFactorLinkersLode',
		ingredients: parseIngredients(['30xS2', '10xS1']),
		svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M17 7h-4V4H7v10h4v3h7v-7h-4zM7 7h2v2H7V7zm4 10H9v-2h2v2zm0-6H9V9h2v2zm0-4H9V5h2v2zm4 4h-2V9h2v2zm0-4h-2V5h2v2z" fill="currentColor"/>
  <path d="M17 7h-4V4H7v10h4v3h7v-7h-4zM7 7h2v2H7V7zm4 10H9v-2h2v2zm0-6H9V9h2v2zm0-4H9V5h2v2zm4 4h-2V9h2v2zm0-4h-2V5h2v2zM15 13h2v-2h-2v2z" fill="currentColor"/>
</svg>`,
		color: '#E91E63', // Pink
		multiplier: 2
	},
	{
		id: 'effortlessExpansion',
		name: 'Effortless Expansion',
		description: 'Effortless Expansion: Cast "Effortless Expansion" and lower the cap to the next level about 20% in the next 5 days. (Cooldown 20 days)',
		runtime: 5 * 24 * 60 * 60,
		cooldown: 20 * 24 * 60 * 60,
		boosterUseCountName: 'boosterUseCountEffortlessExpansion',
		boosterDateSettingKey: 'boosterDateEffortlessExpansion',
		boosterFactorSwitchSettingKey: '',
		ingredients: parseIngredients(['20xS3', '10xS6']),
		svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M3 13h18v-2H3v2zm15-6H6v2h12V7zm-3 8H9v2h6v-2z" fill="currentColor"/>
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
  <path d="M12 10l-4 4h8l-4-4z" transform="rotate(180 12 12)"/>
  <path d="M12 10l-4 4h8l-4-4z" fill="currentColor"/>
  <path d="M12 2L4 12h5v8h6v-8h5L12 2zm0 17c-2.76 0-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 2.76-2.24 5-5 5z" fill="currentColor"/>
</svg>`,
		color: '#00BCD4', // Cyan
		pointReductionFactor: 0.20
	},
	{
		id: 'recursiveReflection',
		name: 'Recursive Reflection',
		description: 'Recursive Reflection: Improve your notes and get 5 times the points you get on normal condition for the next 5 hours. Cooldown 3 days.',
		runtime: 5 * 60 * 60,
		cooldown: 3 * 24 * 60 * 60,
		boosterUseCountName: 'boosterUseCountrEcursiveReflection',
		boosterDateSettingKey: 'boosterDateRecursiveReflection',
		boosterFactorSwitchSettingKey: 'boosterFactorRecursiveReflection',
		ingredients: parseIngredients(['20xS4', '10xS5']),
		svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
  <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" fill="currentColor"/>
</svg>`,
		color: '#FF5722', // Deep Orange
		multiplier: 5
	},
	{
		id: 'synapticSurge',
		name: 'Synaptic Surge',
		description: 'Synaptic Surge: Link your ideas together, every increase in "linking maturity" pays out 20 times for the next 2 hours.',
		runtime: 2 * 60 * 60,
		cooldown: 36 * 60 * 60,
		boosterUseCountName: 'boosterUseCountSynapticSurge',
		boosterDateSettingKey: 'boosterDateSynapticSurge',
		boosterFactorSwitchSettingKey: 'boosterFactorSynapticSurge',
		ingredients: parseIngredients(['20xS2', '10xS1']),
		svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M13 14h-2v-4h2v4zM13 18h-2v-2h2v2zM13 6h-2V4h2v2zM17 14h-2v-4h2v4zM17 18h-2v-2h2v2zM17 6h-2V4h2v2zM9 14h-2v-4h2v4zM9 18h-2v-2h2v2zM9 6h-2V4h2v2zM21 10h-2V8h2v2zM5 10H3V8h2v2zM15 22h-2v-2h2v2zM15 2h-2V0h2v2zM7 22h-2v-2h2v2zM7 2h-2V0h2v2zM19 22h-2v-2h2v2zM19 2h-2V0h2v2z" fill="currentColor"/>
</svg>`,
		color: '#FFEB3B', // Yellow
		multiplier: 20
	},
	{
		id: 'inspirationInfusion',
		name: 'Inspiration Infusion',
		description: 'Inspiration Infusion: Increase the frequency to get helpful prompts to power up you personal knowledge management for the next 2 days.',
		runtime: 2 * 24 * 60 * 60,
		cooldown: 48 * 60 * 60,
		boosterUseCountName: 'boosterUseCountInspirationInfusion',
		boosterDateSettingKey: 'boosterDateInspirationInfusion',
		boosterFactorSwitchSettingKey: '',
		ingredients: parseIngredients(['20xS7', '10xS1']),
		svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.69 2 6 4.69 6 8.5V14c0 1.1-.9 2-2 2v1h16v-1c-1.1 0-2-.9-2-2V8.5C18 4.69 15.31 2 12 2zm0 13l-1.5-1.5-1.5 1.5V9h3v5.5z" fill="currentColor"/>
  <path d="M12 2C8.69 2 6 4.69 6 8.5V14c0 1.1-.9 2-2 2v1h16v-1c-1.1 0-2-.9-2-2V8.5C18 4.69 15.31 2 12 2zm0 13l-1.5-1.5-1.5 1.5V9h3v5.5zM9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1z" fill="currentColor"/>
</svg>`,
		color: '#673AB7', // Deep Purple
		frequencyIncrease: 0.40
	},
	{
		id: 'titleTitan',
		name: 'Title Titan',
		description: 'Title Titan: Quadro your points when making your note title more to the point expressing the idea of your note for the next 3 hours.',
		runtime: 3 * 60 * 60,
		cooldown: 36 * 60 * 60,
		boosterUseCountName: 'boosterUseCountTitleTitan',
		boosterDateSettingKey: 'boosterDateTitleTitan',
		boosterFactorSwitchSettingKey: 'boosterFactorTitleTitan',
		ingredients: parseIngredients(['20xS8', '10xS7']),
		svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M5 4v3h5.5v12h3V7H19V4H5z"/>
  <path d="M5 4v3h5.5v12h3V7H19V4H5z" fill="currentColor"/>
</svg>`,
		color: '#F44336', // Red
		multiplier: 4
	},
	{
		id: 'precisionPrism',
		name: 'Precision Prism',
		description: 'Precision Prism: 4 times the points when increasing the "note length maturity" for a note the next 3 hours.',
		runtime: 3 * 60 * 60,
		cooldown: 36 * 60 * 60,
		boosterUseCountName: 'boosterUseCountPrecisionPrism',
		boosterDateSettingKey: 'boosterDatePrecisionPrism',
		boosterFactorSwitchSettingKey: 'boosterFactorPrecisionPrism',
		ingredients: parseIngredients(['20xS8', '10xS2']),
		svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M11 20H6V4h5v16zm-1-1v-1H7v1h3zm0-3v-1H7v1h3zm0-3v-1H7v1h3zm0-3v-1H7v1h3zm0-3V9H7v1h3zm0-3V6H7v1h3zm7 12h-5V4h5v16zm-1-1v-1h-3v1h3zm0-3v-1h-3v1h3zm0-3v-1h-3v1h3zm0-3v-1h-3v1h3zm0-3V9h-3v1h3zm0-3V6h-3v1h3z" fill="currentColor"/>
</svg>`,
		color: '#795548', // Brown
		multiplier: 4
	},
	{
		id: 'hyperlinkHarmony',
		name: 'Hyperlink Harmony',
		description: 'Hyperlink Harmony: Get for "Inlink maturity" AND "outlink maturity" improvements 5 times the point the next 3 hours.',
		runtime: 3 * 60 * 60,
		cooldown: 36 * 60 * 60,
		boosterUseCountName: 'boosterUseCountHyperlinkHarmony',
		boosterDateSettingKey: 'boosterDateHyperlinkHarmony',
		boosterFactorSwitchSettingKey: 'boosterFactorHyperlinkHarmony',
		ingredients: parseIngredients(['20xS2', '10xS6']),
		svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M17 7h-4V4H7v10h4v3h7v-7h-4zM7 7h2v2H7V7zm4 10H9v-2h2v2zm0-6H9V9h2v2zm0-4H9V5h2v2zm4 4h-2V9h2v2zm0-4h-2V5h2v2zM15 13h2v-2h-2v2z" fill="currentColor"/>
  <path d="M17 7h-4V4H7v10h4v3h7v-7h-4zM7 7h2v2H7V7zm4 10H9v-2h2v2zm0-6H9V9h2v2zm0-4H9V5h2v2zm4 4h-2V9h2v2zm0-4h-2V5h2v2zM15 13h2v-2h-2v2zM10 13c0 1.1-.9 2-2 2H4v2h4c2.21 0 4-1.79 4-4V7h2v6zm4-6V4h-4C9.79 4 8 5.79 8 8v2H6V8c0-1.1.9-2 2-2h6z" fill="currentColor"/>
  <path d="M10 13c0 1.1-.9 2-2 2H4v2h4c2.21 0 4-1.79 4-4V7h2v6zm4-6V4h-4C9.79 4 8 5.79 8 8v2H6V8c0-1.1.9-2 2-2h6z" fill="currentColor"/>
</svg>`,
		color: '#607D8B',
		multiplier: 5
	},
	{
		id: 'ephemeralEuphoria',
		name: 'Ephemeral Euphoria',
		description: 'Unearth the hidden potential within your knowledge repository with the Ephemeral Euphoria booster. For a fleeting two-hour window, your notes will resonate with an extraordinary vitality, allowing you to earn points at an astonishing rate. Seize this moment of boundless opportunity and watch your knowledge flourish like never before! Be aware, you need in sum 1000 ingrediments to craft, ingrediments will be taken from all pots.',
		runtime: 2 * 60 * 60,
		cooldown: 2160 * 60 * 60,
		boosterUseCountName: 'boosterUseCountEphemeralEuphoria',
		boosterDateSettingKey: 'boosterDateEphemeralEuphoria',
		boosterFactorSwitchSettingKey: 'boosterFactorEphemeralEuphoria',
		ingredients: parseIngredients(['1000xSX']),
		specialIngredientRequirement: 'all pots',
		svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 1L9 9l-8 1 7 7-2 8 8-2 7 2-2-8 7-7-8-1L12 1z"/>
  <path d="M12 1L9 9l-8 1 7 7-2 8 8-2 7 2-2-8 7-7-8-1L12 1z" fill="currentColor"/>
</svg>`,
		color: '#FFD54F', // Light Yellow
		multiplier: 5
	},
	{
		id: 'fortuneInfusion',
		name: 'Fortune Infusion',
		description: "Infuse your knowledge journey with a dash of randomness using the Fortune Infusion booster. Upon activation, you'll receive a randomized amount of valuable ingredients to aid your knowledge crafting endeavors. Sometimes, you'll strike it lucky with a bountiful yield of 10 ingredients, while most of the time, you'll secure a more modest 2. The rarer, the more ingredients you might acquire. Add a twist of unpredictability to your knowledge management strategy and see how your points soar!",
		runtime: 0 * 60,
		cooldown: 22 * 60 * 60,
		boosterUseCountName: 'boosterUseCountFortuneInfusion',
		boosterDateSettingKey: 'boosterDateFortuneInfusion',
		boosterFactorSwitchSettingKey: 'boosterFactorFortuneInfusion',
		ingredients: [],
		specialIngredientRequirement: 'free all 22h',
		svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M6 3h12c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2zm12 2H6v14h12V5zm-8 4v2h2V9h-2zm4 0v2h2V9h-2zm-4 4v2h2v-2h-2zm4 0v2h2v-2h-2z" fill="currentColor"/>
  <path d="M6 3h12c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2zm12 2H6v14h12V5zm-8 4v2h2V9h-2zm4 0v2h2V9h-2zm-4 4v2h2v-2h-2zm4 0v2h2v-2h-2zM12 7l-2 2 2 2 2-2-2-2z" fill="currentColor"/>
</svg>`,
		color: '#CDDC39' // Lime Green
	}
];

export const getBoosterById = (id: string): Booster | undefined => {
	return allBoosters.find(b => b.id === id);
}

export const getBoosterByName = (name: string): Booster | undefined => {
	return allBoosters.find(b => b.name === name);
}

