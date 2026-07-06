import { Badge } from '../badges'
export const PLUGIN_VERSION = '0.0.109';
export const pointsNoteMajurity = 100;
export const pointsMajurity = 10;
export const pointsForDailyChallenge = 500;
export const pointsForWeeklyChallenge = 2000;
export const streakboosterDecrease = 0.2;
export const streakboosterIncreaseDaily = 0.1;
export const streakboosterIncreaseWeekly = 1;
export const secretKey = "2ZU^12y#QmNB5$yEin5^";
export const debugLogs = false;
export const mil2sec = 1000;
export const milliseconds = 1000;
export const seconds = 1000;
export const minutesTimer = 1000;

export const listOfUseableBoostersToBeShown = ['Perpetual Progress', 'Title Titan', 'Precision Prism','Accelerated Acquisition','Recursive Reflection','Synaptic Surge','Effortless Expansion','Hyperlink Harmony','Temporal Tweaker']
export const listOfUseableIngredientsToBeShown = ['Connection Crystal', 'Insight Prism', 'Creative Catalyst', 'Precision Lens','Nexus Node','Mastery Scroll','Reflective Essence','Amplification Crystal']
export const chanceToEarnIngredient = 0.5;

export interface IngredientElement {
	shortName: string;
	name: string;
	varName: string;
	level: number;
}

export const elements: IngredientElement[] = [
	{ shortName: 'S2', name: 'Connection Crystal', varName: 'connectionCrystal', level: 0 },
	{ shortName: 'S4', name: 'Insight Prism', varName: 'insightPrism', level: 0 },
	{ shortName: 'S7', name: 'Creative Catalyst', varName: 'creativeCatalyst', level: 0 },
	{ shortName: 'S8', name: 'Precision Lens', varName: 'precisionLens', level: 0 },
	{ shortName: 'S1', name: 'Nexus Node', varName: 'nexusNode', level: 5 },
	{ shortName: 'S3', name: 'Mastery Scroll', varName: 'masteryScroll', level: 5 },
	{ shortName: 'S5', name: 'Reflective Essence', varName: 'reflectiveEssence', level: 5 },
	{ shortName: 'S6', name: 'Amplification Crystal', varName: 'amplificationCrystal', level: 6 }
];

//TODO: rewrite all usages pointing to here to data/boosterDefinitions.ts instead.
export const boosterRecipes = [
  { boosterUseCountName: 'boosterUseCountTemporalTweaker', boosterRunTime: 0, boosterCooldown: 0, boosterDate: 'boosterDateTemporalTweaker', boosterSwitch: '', varname: 'temporalTweaker' ,name: 'Temporal Tweaker', incredients: ['20xS1', '10xS6'], color: '#4CAF50', svg:`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
  <path d="M12.5 7v5.25l4.5 2.25-.75 1.5-5.25-2.62V7h1z"/>
  <path d="M15.03 8.97a7 7 0 0 0-6.42-.03L9.5 7.5l-3 3 3 3 .71-.71-1.07-1.07a5.5 5.5 0 0 1 5.37-.02l.71.71 3-3-3-3-.71.71z" fill="currentColor"/>
</svg>
`, description: 'Temporal Tweaker: reset the cooldown phase for a booster your choice' },

  { boosterUseCountName: 'boosterUseCountPerpetualProgress', boosterRunTime: 4*60, boosterCooldown: 36*60, boosterDate: 'boosterDatePerpetualProgress', boosterSwitch: 'boosterFactorPerpetualProgress', varname: 'perpetualProgress' ,name: 'Perpetual Progress', incredients: ['20xS2', '10xS4'], color: '#4CAF50', svg:`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 2l-8 10h5v10h6V12h5L12 2zM9 12v8h6v-8H9z" fill="currentColor"/>
  <path d="M12 4.16L18.84 12H16v8H8v-8H5.16L12 4.16zM10 18h4v-6h-4v6z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M12 4L4 12h5v8h6v-8h5L12 4zM9 12v6h6v-6H9z" fill="currentColor"/>
</svg>
`, description: 'Perpetual Progress: get 3 times points an all your actions for the next 4 hours. You can use Perpetual Progress every three days, if you have the ingredients to craft it.' },

  { boosterUseCountName: 'boosterUseCountStrategicSynapses', boosterRunTime: 4*60, boosterCooldown: 120*60, boosterDate: 'boosterDateStrategicSynapses', boosterSwitch: 'boosterFactorStrategicSynapses', varname: 'strategicSynapses' ,name: 'Strategic Synapses', incredients: ['30xS1', '20xS2'], color: '#4CAF50', svg:`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 2C8.13 2 5 5.13 5 9c0 2.37 1.34 4.45 3.32 5.5V17H7v2h1v4h8v-4h1v-2h-1v-2.5c1.98-1.05 3.32-3.13 3.32-5.5C19 5.13 15.87 2 12 2zM8 7c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm4 10h-2v-2h2v2zm0-4h-2v-2h2v2zm-2-2c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm4 0c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9-2-2z" fill="currentColor"/>
  <path d="M12 2C8.13 2 5 5.13 5 9c0 2.37 1.34 4.45 3.32 5.5V17H7v2h1v4h8v-4h1v-2h-1v-2.5c1.98-1.05 3.32-3.13 3.32-5.5C19 5.13 15.87 2 12 2zm-2 5c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm0 8h4v-2h-4v2zm-2-2h-2v-2h2v2zM12 22h-2v-2h2v2zm4-8h-4v-2h4v2zm2 2h-2v-2h2v2zm0-8c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9-2-2z" fill="currentColor"/>
</svg>
`, description: 'Strategic Synapses: gain 3 times EP for all actions on Map Of Content ratings for the next 4 hours. This booster has a cooldown time of 5 days.' },

  { boosterUseCountName: 'boosterUseCountAcceleratedAcquisition', boosterRunTime: 0, boosterCooldown: 36*60, boosterDate: 'boosterDateAcceleratedAcquisition', boosterSwitch: '', varname: 'acceleratedAcquisition' ,name: 'Accelerated Acquisition', incredients: ['10xS3', '20xS4'], color: '#4CAF50', svg:`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M13 3h-2v10h2V3z"/>
  <path d="M16.5 7.5L12 3 7.5 7.5l1.41 1.41L12 6.32l3.09 3.09 1.41-1.41z"/>
  <path d="M19 12h2L12 2 3 12h2l7-7 7 7z" fill="currentColor"/>
  <path d="M19 12h2L12 2 3 12h2l7-7 7 7zm-7-9L5 12h3v8h8v-8h3L12 3zm0 14H9v-6h6v6z" fill="currentColor"/>
  <path d="M12 2L4 12h5v8h6v-8h5L12 2zm0 17c-2.76 0-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 2.76-2.24 5-5 5z" fill="currentColor"/>
</svg>
`, description: 'Accelerated Acquisition: Use Accelerated Acquisition and collect much faster for the next 12 hours all sorts of ingredients when creating and improving notes' },

  { boosterUseCountName: 'boosterUseCountLinkersLode', boosterRunTime: 3*60, boosterCooldown: 48*60, boosterDate: 'boosterDateLinkersLode', boosterSwitch: 'boosterFactorLinkersLode', varname: 'linkersLode' ,name: 'Linkers Lode', incredients: ['30xS2', '10xS1'], color: '#4CAF50', svg:`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M17 7h-4V4H7v10h4v3h7v-7h-4zM7 7h2v2H7V7zm4 10H9v-2h2v2zm0-6H9V9h2v2zm0-4H9V5h2v2zm4 4h-2V9h2v2zm0-4h-2V5h2v2z" fill="currentColor"/>
  <path d="M17 7h-4V4H7v10h4v3h7v-7h-4zM7 7h2v2H7V7zm4 10H9v-2h2v2zm0-6H9V9h2v2zm0-4H9V5h2v2zm4 4h-2V9h2v2zm0-4h-2V5h2v2zM15 13h2v-2h-2v2z" fill="currentColor"/>
</svg>
`, description: 'Linkers Lode: collect extra points when creating chain of thoughts for the next 3 hours. (cooldown 2 days)' },

  { boosterUseCountName: 'boosterUseCountEffortlessExpansion', boosterRunTime: 0, boosterCooldown: 480*60, boosterDate: 'boosterDateEffortlessExpansion', boosterSwitch: '', varname: 'effortlessExpansion' ,name: 'Effortless Expansion', incredients: ['20xS3', '10xS6'], color: '#4CAF50', svg:`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M3 13h18v-2H3v2zm15-6H6v2h12V7zm-3 8H9v2h6v-2z" fill="currentColor"/>
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
  <path d="M12 10l-4 4h8l-4-4z" transform="rotate(180 12 12)"/>
  <path d="M12 10l-4 4h8l-4-4z" fill="currentColor"/>
  <path d="M12 2L4 12h5v8h6v-8h5L12 2zm0 17c-2.76 0-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 2.76-2.24 5-5 5z" fill="currentColor"/>
</svg>
`, description: 'Effortless Expansion: Cast "Effortless Expansion" and lower the cap to the next level about 20% in the next 5 days. (Cooldown 20 days)' },

  { boosterUseCountName: 'boosterUseCountrEcursiveReflection', boosterRunTime: 5*60, boosterCooldown: 36*60, boosterDate: 'boosterDateRecursiveReflection', boosterSwitch: 'boosterFactorRecursiveReflection', varname: 'recursiveReflection' ,name: 'Recursive Reflection', incredients: ['20xS4', '10xS5'], color: '#4CAF50', svg:`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
  <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" fill="currentColor"/>
</svg>
`, description: 'Recursive Reflection: Improve your notes and get 5 times the points you get on normal condition for the next 5 hours. Cooldown 3 days.' },

  { boosterUseCountName: 'boosterUseCountSynapticSurge', boosterRunTime: 2*60, boosterCooldown: 36*60, boosterDate: 'boosterDateSynapticSurge', boosterSwitch: 'boosterFactorSynapticSurge', varname: 'synapticSurge' ,name: 'Synaptic Surge', incredients: ['20xS2', '10xS1'], color: '#4CAF50', svg:`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M13 14h-2v-4h2v4zM13 18h-2v-2h2v2zM13 6h-2V4h2v2zM17 14h-2v-4h2v4zM17 18h-2v-2h2v2zM17 6h-2V4h2v2zM9 14h-2v-4h2v4zM9 18h-2v-2h2v2zM9 6h-2V4h2v2zM21 10h-2V8h2v2zM5 10H3V8h2v2zM15 22h-2v-2h2v2zM15 2h-2V0h2v2zM7 22h-2v-2h2v2zM7 2h-2V0h2v2zM19 22h-2v-2h2v2zM19 2h-2V0h2v2z" fill="currentColor"/>
</svg>
`, description: 'Synaptic Surge: Link your ideas together, every increase in "linking maturity" pays out 20 times for the next 2 hours.' },

  { boosterUseCountName: 'boosterUseCountInspirationInfusion', boosterRunTime: 0, boosterCooldown: 48*60, boosterDate: 'boosterDateInspirationInfusion', boosterSwitch: '', varname: 'inspirationInfusion' ,name: 'Inspiration Infusion', incredients: ['20xS7', '10xS1'], color: '#4CAF50', svg:`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.69 2 6 4.69 6 8.5V14c0 1.1-.9 2-2 2v1h16v-1c-1.1 0-2-.9-2-2V8.5C18 4.69 15.31 2 12 2zm0 13l-1.5-1.5-1.5 1.5V9h3v5.5z" fill="currentColor"/>
  <path d="M12 2C8.69 2 6 4.69 6 8.5V14c0 1.1-.9 2-2 2v1h16v-1c-1.1 0-2-.9-2-2V8.5C18 4.69 15.31 2 12 2zm0 13l-1.5-1.5-1.5 1.5V9h3v5.5zM9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1z" fill="currentColor"/>
</svg>
`, description: 'Inspiration Infusion: Increase the frequency to get helpful prompts to power up you personal knowledge management for the next 2 days.' },

  { boosterUseCountName: 'boosterUseCountTitleTitan', boosterRunTime: 3*60, boosterCooldown: 36*60, boosterDate: 'boosterDateTitleTitan', boosterSwitch: 'boosterFactorTitleTitan', varname: 'titleTitan' ,name: 'Title Titan', incredients: ['20xS8', '10xS7'], color: '#4CAF50', svg:`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M5 4v3h5.5v12h3V7H19V4H5z"/>
  <path d="M5 4v3h5.5v12h3V7H19V4H5z" fill="currentColor"/>
</svg>
`, description: 'Title Titan: Quadro your points when making your note title more to the point expressing the idea of your note for the next 3 hours.' },

  { boosterUseCountName: 'boosterUseCountPrecisionPrism', boosterRunTime: 3*60, boosterCooldown: 36*60, boosterDate: 'boosterDatePrecisionPrism', boosterSwitch: 'boosterFactorPrecisionPrism', varname: 'precisionPrism' ,name: 'Precision Prism', incredients: ['20xS8', '10xS2'], color: '#4CAF50', svg:`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M11 20H6V4h5v16zm-1-1v-1H7v1h3zm0-3v-1H7v1h3zm0-3v-1H7v1h3zm0-3v-1H7v1h3zm0-3V9H7v1h3zm0-3V6H7v1h3zm7 12h-5V4h5v16zm-1-1v-1h-3v1h3zm0-3v-1h-3v1h3zm0-3v-1h-3v1h3zm0-3v-1h-3v1h3zm0-3V9h-3v1h3zm0-3V6h-3v1h3z" fill="currentColor"/>
</svg>
`, description: 'Precision Prism: 4 times the points when increasing the "note length majurity" for a note the next 3 hours.' },

  { boosterUseCountName: 'boosterUseCountHyperlinkHarmony', boosterRunTime: 3*60, boosterCooldown: 36*60, boosterDate: 'boosterDateHyperlinkHarmony', boosterSwitch: 'boosterFactorHyperlinkHarmony', varname: 'hyperlinkHarmony' ,name: 'Hyperlink Harmony', incredients: ['20xS2', '10xS6'], color: '#4CAF50', svg:`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M17 7h-4V4H7v10h4v3h7v-7h-4zM7 7h2v2H7V7zm4 10H9v-2h2v2zm0-6H9V9h2v2zm0-4H9V5h2v2zm4 4h-2V9h2v2zm0-4h-2V5h2v2zM15 13h2v-2h-2v2z" fill="currentColor"/>
  <path d="M17 7h-4V4H7v10h4v3h7v-7h-4zM7 7h2v2H7V7zm4 10H9v-2h2v2zm0-6H9V9h2v2zm0-4H9V5h2v2zm4 4h-2V9h2v2zm0-4h-2V5h2v2zM15 13h2v-2h-2v2zM10 13c0 1.1-.9 2-2 2H4v2h4c2.21 0 4-1.79 4-4V7h2v6zm4-6V4h-4C9.79 4 8 5.79 8 8v2H6V8c0-1.1.9-2 2-2h6z" fill="currentColor"/>
  <path d="M10 13c0 1.1-.9 2-2 2H4v2h4c2.21 0 4-1.79 4-4V7h2v6zm4-6V4h-4C9.79 4 8 5.79 8 8v2H6V8c0-1.1.9-2 2-2h6z" fill="currentColor"/>
</svg>
`, description: 'Hyperlink Harmony: Get for "Inlink maturity" AND "outlink maturity" improvements 5 times the point the next 3 hours.' },

  { boosterUseCountName: 'boosterUseCountEphemeralEuphoria', boosterRunTime: 2*60, boosterCooldown: 2160*60, boosterDate: 'boosterDateEphemeralEuphoria', boosterSwitch: 'boosterFactorEphemeralEuphoria', varname: 'ephemeralEuphoria' ,name: 'Ephemeral Euphoria', incredients: ['1000xSX'], color: '#4CAF50', svg:`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 1L9 9l-8 1 7 7-2 8 8-2 7 2-2-8 7-7-8-1L12 1z"/>
  <path d="M12 1L9 9l-8 1 7 7-2 8 8-2 7 2-2-8 7-7-8-1L12 1z" fill="currentColor"/>
</svg>
`, description: 'Unearth the hidden potential within your knowledge repository with the Ephemeral Euphoria booster. For a fleeting two-hour window, your notes will resonate with an extraordinary vitality, allowing you to earn points at an astonishing rate. Seize this moment of boundless opportunity and watch your knowledge flourish like never before! Be aware, you need in sum 1000 ingrediments to craft, ingrediments will be taken from all pots.' },

  { boosterUseCountName: 'boosterUseCountFortuneInfusion', boosterRunTime: 0, boosterCooldown: 22*60, boosterDate: 'boosterDateFortuneInfusion', boosterSwitch: 'boosterFactorFortuneInfusion', varname: 'fortuneInfusion' ,name: 'Fortune Infusion', incredients: ['free all 22h'], color: '#4CAF50', svg:`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M6 3h12c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2zm12 2H6v14h12V5zm-8 4v2h2V9h-2zm4 0v2h2V9h-2zm-4 4v2h2v-2h-2zm4 0v2h2v-2h-2z" fill="currentColor"/>
  <path d="M6 3h12c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2zm12 2H6v14h12V5zm-8 4v2h2V9h-2zm4 0v2h2V9h-2zm-4 4v2h2v-2h-2zm4 0v2h2v-2h-2zM12 7l-2 2 2 2 2-2-2-2z" fill="currentColor"/>
</svg>
`, description: "Infuse your knowledge journey with a dash of randomness using the Fortune Infusion booster. Upon activation, you'll receive a randomized amount of valuable ingredients to aid your knowledge crafting endeavors. Sometimes, you'll strike it lucky with a bountiful yield of 10 ingredients, while most of the time, you'll secure a more modest 2. The rarer, the more ingredients you might acquire. Add a twist of unpredictability to your knowledge management strategy and see how your points soar!" },
];


export const badgeLevels: number[] = [5, 10, 20, 27, 35, 42, 50, 60, 75, 82, 90, 100];
export const badgeNames: Badge[] = [
  {
	  name: "Enlightened Novice",
	  description: "Huzzah! You've embarked on the path of knowledge and earned the title of 'Enlightened Novice.' The journey has just begun, and you're already radiating wisdom like a baby sun!",
	  level: "level 5",
	  icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="11" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1"/>
  <path d="M12 7V3M15.5 8L18 5.5M8.5 8L6 5.5M19 12H21M3 12H5" stroke="var(--interactive-accent)" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8Z" fill="var(--interactive-accent)" fill-opacity="0.1" stroke="var(--interactive-accent)" stroke-width="1.5"/>
  <path d="M11 19C11 19 11.5 16 12.5 14C13.5 12 14.5 10 14.5 8C14.5 8 12.5 9 11.5 11C10.5 13 10.5 15.5 10.5 17.5L10 20" stroke="var(--text-normal)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10.5 17.5L12.5 16.5M11 15L13 14" stroke="var(--text-normal)" stroke-width="1" stroke-linecap="round"/>
</svg>`},
  {
	  name: "Curious Connoisseur",
	  description: "Fantastic! You've embraced the wonders of learning and become a 'Curious Connoisseur.' Your appetite for knowledge is insatiable, like a bottomless bowl of ice cream!" ,
	  level: "level 10",
	  icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Badge Background: Hexagon -->
  <path d="M12 2L20.6603 7V17L12 22L3.33975 17V7L12 2Z" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5" stroke-linejoin="round"/>
  
  <!-- Stylized Book / Note Page Lines -->
  <path d="M7 8H17M7 12H11M7 16H12" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round"/>
  
  <!-- Magnifying Glass Morphing into Book Structure -->
  <g stroke="var(--interactive-accent)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- The Lens -->
    <circle cx="15" cy="14.5" r="3.5"/>
    <!-- The Handle / Connection to the "Spine" -->
    <path d="M12.5 12L12.5 6C12.5 6 13.5 5 17 5C20.5 5 21 6 21 6V11"/>
    <path d="M12.5 12C12.5 12 11.5 11 8 11C4.5 11 4 12 4 12V6C4 6 4.5 5 8 5C11.5 5 12.5 6 12.5 6V12Z" stroke="var(--text-normal)"/>
    <!-- Lens Reflection/Accent -->
    <path d="M16 13.5C16 13.5 15.5 13 14.5 13" stroke-width="1"/>
  </g>
</svg>` },
  {
	  name: "Brainiac Trailblazer",
	  description: "Bravo! As a 'Brainiac Trailblazer,' you've carved your way through a jungle of information and emerged victorious. Your intellect is a beacon shining brightly for others to follow!" ,
	  level: "level 20",
	  icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="11" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1"/>
  <circle cx="12" cy="12" r="9" stroke="var(--text-muted)" stroke-width="0.75" stroke-dasharray="1 2"/>
  <path d="M12 3V5M12 19V21M3 12H5M19 12H21" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M12 12L14 15L12 21L10 15L12 12Z" fill="var(--background-modifier-border)" stroke="var(--text-muted)" stroke-width="1" stroke-linejoin="round"/>
  <path d="M12 3L13.5 9L11 11L13 13L12 12L10.5 6L13 4L12 3Z" fill="var(--interactive-accent)" stroke="var(--interactive-accent)" stroke-width="1" stroke-linejoin="round"/>
  <circle cx="12" cy="12" r="1.5" fill="var(--background-secondary)" stroke="var(--interactive-accent)" stroke-width="1.5"/>
</svg>` },
  {
	  name: "Scholarly Trailblazer",
	  description: "Impressive! You're now a 'Scholarly Trailblazer,' boldly venturing through a sea of knowledge with a compass of curiosity and a map of intellect!" ,
	  level: "level 27",
	  icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="11" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5"/>
  <path d="M11 16L11 6L17 11L11 11" fill="var(--interactive-accent)" stroke="var(--interactive-accent)" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M10 16L10 8L6 11L10 11" fill="var(--text-normal)" stroke="var(--text-normal)" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M5 15.5C6.5 14.5 8.5 14.5 10 15.5C11.5 16.5 13.5 16.5 15 15.5C16.5 14.5 18.5 14.5 20 15.5" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M4 18.5C5.5 17.5 7.5 17.5 9 18.5C10.5 19.5 12.5 19.5 14 18.5C15.5 17.5 17.5 17.5 19 18.5" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
  <path d="M6 21C7.5 20.2 9.5 20.2 11 21C12.5 21.8 14.5 21.8 16 21C17.5 20.2 19.5 20.2 21 21" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round" opacity="0.3"/>
</svg>` },
  {
	  name: "Info Ninja Master",
	  description: "Incredible! You've reached the pinnacle of stealthy knowledge management. As an 'Info Ninja Master,' you can snatch information from the shadows like a digital ninja!" ,
	  level: "level 35",
	  icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2L21 6.5V17.5L12 22L3 17.5V6.5L12 2Z" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M12 3L13.5 10.5H21L14 13.5L12 21L10.5 13.5H3L10 10.5L12 3Z" fill="var(--interactive-accent)" stroke="var(--interactive-accent)" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M10.5 10.5V13.5H13.5" stroke="var(--background-secondary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10.5 10.5L13.5 13.5" stroke="var(--background-secondary)" stroke-width="1.5" stroke-linecap="round"/>
  <circle cx="12" cy="12" r="1.5" fill="var(--background-secondary)"/>
</svg>
` },
  {
	  name: "Wise Owl Guru",
	  description: "Whoo-hoo! You've achieved 'Wise Owl Guru' status. Your wisdom is legendary, and your hoots of knowledge echo through the forest of ignorance!" ,
	  level: "level 42",
	  icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2L21 6.5V17.5L12 22L3 17.5V6.5L12 2Z" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5" stroke-linejoin="round"/>
  <circle cx="8" cy="13" r="3" stroke="var(--interactive-accent)" stroke-width="2"/>
  <circle cx="16" cy="13" r="3" stroke="var(--interactive-accent)" stroke-width="2"/>
  <circle cx="8" cy="13" r="1" fill="var(--text-normal)"/>
  <circle cx="16" cy="13" r="1" fill="var(--text-normal)"/>
  <path d="M5 10C5 10 8 7 12 11C16 7 19 10 19 10" stroke="var(--text-normal)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11 11L12 13L13 11" stroke="var(--interactive-accent)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
` },
  {
	  name: "Einstein Incarnate",
	  description: "Eureka! You've become an 'Einstein Incarnate,' pushing the boundaries of understanding and bending the fabric of knowledge to your will!" ,
	  level: "level 50",
	  icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2L21 6.5V17.5L12 22L3 17.5V6.5L12 2Z" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5" stroke-linejoin="round"/>
  <ellipse cx="12" cy="12" rx="8" ry="3" transform="rotate(45 12 12)" stroke="var(--text-muted)" stroke-width="1.2"/>
  <ellipse cx="12" cy="12" rx="8" ry="3" transform="rotate(-45 12 12)" stroke="var(--text-muted)" stroke-width="1.2"/>
  <ellipse cx="12" cy="12" rx="8" ry="3" transform="rotate(90 12 12)" stroke="var(--text-muted)" stroke-width="1.2"/>
  <circle cx="12" cy="12" r="2.5" fill="var(--interactive-accent)" fill-opacity="0.2"/>
  <path d="M12 9.5L13 11.5H11L12 14.5" stroke="var(--interactive-accent)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="12" cy="12" r="1" fill="var(--interactive-accent)"/>
</svg>
` },
  {
	  name: "Mastermind Sage",
	  description: "Magnificent! You've ascended to the rank of 'Mastermind Sage,' guiding the rivers of information and enlightening all who seek wisdom!" ,
	  level: "level 60",
	  icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2L21 6.5V17.5L12 22L3 17.5V6.5L12 2Z" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M12 2V22M3 6.5L21 17.5M21 6.5L3 17.5" stroke="var(--text-muted)" stroke-width="1" opacity="0.5"/>
  <path d="M12 12L21 6.5M12 12L21 17.5M12 12L12 22M12 12L3 17.5M12 12L3 6.5M12 12L12 2" stroke="var(--interactive-accent)" stroke-width="1.5" stroke-linecap="round"/>
  <circle cx="12" cy="12" r="3" fill="var(--background-secondary)" stroke="var(--interactive-accent)" stroke-width="1.5"/>
  <circle cx="12" cy="12" r="1" fill="var(--text-normal)"/>
  <circle cx="12" cy="2" r="1" fill="var(--interactive-accent)"/>
  <circle cx="21" cy="6.5" r="1" fill="var(--interactive-accent)"/>
  <circle cx="21" cy="17.5" r="1" fill="var(--interactive-accent)"/>
  <circle cx="12" cy="22" r="1" fill="var(--interactive-accent)"/>
  <circle cx="3" cy="17.5" r="1" fill="var(--interactive-accent)"/>
  <circle cx="3" cy="6.5" r="1" fill="var(--interactive-accent)"/>
</svg>
` },
  {
	  name: "Cerebral Maestro",
	  description: "Bravissimo! You're now a 'Cerebral Maestro,' conducting the symphony of knowledge with the finesse of a virtuoso conductor!" ,
	  level: "level 75",
	  icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2L21 6.5V17.5L12 22L3 17.5V6.5L12 2Z" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M6 8C9 8 10 6 13 6C16 6 18 8 18 11C18 14 16 16 13 16C12.5 16 12 15.8 11.5 15.5" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M6 11C9 11 10 9 13 9C16 9 17.5 10.5 17.5 12.5C17.5 14.5 16 15.5 14 15.5" stroke="var(--interactive-accent)" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M6 14C9 14 10 12 13 12C14.5 12 15.5 13 15.5 14C15.5 15 14.5 15.5 13.5 15.5" stroke="var(--text-normal)" stroke-width="1.5" stroke-linecap="round"/>
  <circle cx="6" cy="8" r="1" fill="var(--text-muted)"/>
  <circle cx="6" cy="11" r="1" fill="var(--interactive-accent)"/>
  <circle cx="6" cy="14" r="1" fill="var(--text-normal)"/>
  <path d="M12 16V18" stroke="var(--background-modifier-border)" stroke-width="1.5" stroke-linecap="round"/>
</svg>
` },
  {
	  name: "Zen Knowledge Keeper",
	  description: "Serenity achieved! As a 'Zen Knowledge Keeper,' you maintain a tranquil mind while managing vast pools of knowledge with grace and poise." ,
	  level: "level 82",
	  icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2L21 6.5V17.5L12 22L3 17.5V6.5L12 2Z" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M6 17.5H18" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M12 17.5C12 17.5 9 14.5 9 11.5C9 9.5 10.5 8.5 12 8.5C13.5 8.5 15 9.5 15 11.5C15 14.5 12 17.5 12 17.5Z" stroke="var(--interactive-accent)" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M12 17.5C12 17.5 15 16.5 17 14.5C19 12.5 18 10.5 16.5 10C15 9.5 13.5 11 12 13" stroke="var(--text-normal)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 17.5C12 17.5 9 16.5 7 14.5C5 12.5 6 10.5 7.5 10C9 9.5 10.5 11 12 13" stroke="var(--text-normal)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="12" cy="6" r="1" fill="var(--interactive-accent)"/>
</svg>
` },
  {
	  name: "Grand Archivist Overlord",
	  description: "All hail the 'Grand Archivist Overlord!' You wield the knowledge of ages and hold the keys to unlock the gates of wisdom!" ,
	  level: "level 90",
	  icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2L4 5V11C4 16.5 12 22 12 22C12 22 20 16.5 20 11V5L12 2Z" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5" stroke-linejoin="round"/>
  <circle cx="12" cy="8" r="3" stroke="var(--interactive-accent)" stroke-width="2"/>
  <path d="M12 11V18M12 14H15M12 16H15M12 18H15" stroke="var(--text-normal)" stroke-width="2" stroke-linecap="round"/>
  <circle cx="12" cy="8" r="1" fill="var(--interactive-accent)"/>
</svg>
` },
  {
	  name: "Omniscient Sage of Everything",
	  description: "Congratulations, oh wise one! You've attained the highest level of enlightenment as the 'Omniscient Sage of Everything.' Your understanding knows no bounds, and your wisdom is as vast as the cosmos itself!",
	  level: "level 100",
	  icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="11" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5"/>
  <path d="M12 5L20 17H4L12 5Z" stroke="var(--text-muted)" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M8 13.5C8 13.5 9.5 11 12 11C14.5 11 16 13.5 16 13.5C16 13.5 14.5 16 12 16C9.5 16 8 13.5 8 13.5Z" stroke="var(--interactive-accent)" stroke-width="1.5" stroke-linejoin="round"/>
  <circle cx="12" cy="13.5" r="1.5" fill="var(--text-normal)"/>
  <circle cx="12" cy="2" r="0.8" fill="var(--interactive-accent)"/>
  <circle cx="19.1" cy="4.9" r="0.6" fill="var(--interactive-accent)" opacity="0.6"/>
  <circle cx="22" cy="12" r="0.8" fill="var(--interactive-accent)"/>
  <circle cx="19.1" cy="19.1" r="0.6" fill="var(--interactive-accent)" opacity="0.6"/>
  <circle cx="12" cy="22" r="0.8" fill="var(--interactive-accent)"/>
  <circle cx="4.9" cy="19.1" r="0.6" fill="var(--interactive-accent)" opacity="0.6"/>
  <circle cx="2" cy="12" r="0.8" fill="var(--interactive-accent)"/>
  <circle cx="4.9" cy="4.9" r="0.6" fill="var(--interactive-accent)" opacity="0.6"/>
</svg>
`  },
];

export const badgeInitLevels: number[] = [0, 3, 7, 15, 23, 30, 35, 42, 50, 60, 75, 82, 90, 100];
export const badgeNamesInit: Badge[] = [
  {
	  name: "Lore Seeker Initiate",
	  description: "Welcome to the journey of knowledge! As a 'Lore Seeker Initiate,' you've taken your first steps into the world of organized wisdom. Your quest has just begun, and with each note you make, you lay the foundation for a future rich with insights and understanding. Your journey starts here, and the path ahead is filled with potential and discovery.",
	  level: "level 1",
	  icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="3" y="3" width="18" height="18" rx="4" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5"/>
  <path d="M7 16H17" stroke="var(--interactive-accent)" stroke-width="2" stroke-linecap="round"/>
  <path d="M14 6H7V13H17V9L14 6Z" stroke="var(--text-normal)" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M14 6V9H17" stroke="var(--text-normal)" stroke-width="1.5" stroke-linejoin="round"/>
</svg>
`},
  {
	  name: "Lore Apprentice",
	  description: "You've hit the ground running with your existing knowledge treasures! You're already an 'Lore Apprentice,' armed with a wealth of wisdom and ready to shape it further.",
	  level: "level 3",
	  icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="4" y="4" width="16" height="16" rx="2" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5"/>
  <path d="M7 16L12 11M9 18L14 13" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M11.5 12.5L16 8" stroke="var(--text-normal)" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M15 7L17 9" stroke="var(--text-normal)" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M7 9L11 7L13 11L9 13L7 9Z" fill="var(--interactive-accent)" stroke="var(--interactive-accent)" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M11 7L13 9" stroke="var(--background-secondary)" stroke-width="1.5" stroke-linecap="round"/>
</svg>
` },
  {
	  name: "Savvy Scholar",
	  description: "Your existing notes have given you a head start! You're now a 'Savvy Scholar,' confidently diving into the sea of information with a treasure trove of insights." ,
	  level: "level 7",
	  icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 10C4 8.89543 4.89543 8 6 8H18C19.1046 8 20 8.89543 20 10V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V10Z" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5"/>
  <path d="M4 12H20" stroke="var(--background-modifier-border)" stroke-width="1.5"/>
  <rect x="10" y="11" width="4" height="3" rx="0.5" fill="var(--background-secondary)" stroke="var(--text-muted)" stroke-width="1.5"/>
  <path d="M12 6L14 8L12 10L10 8L12 6Z" fill="var(--interactive-accent)"/>
  <path d="M8 5L9.5 7L8 9L6.5 7L8 5Z" fill="var(--text-normal)"/>
  <path d="M16 5L17.5 7L16 9L14.5 7L16 5Z" fill="var(--text-normal)"/>
</svg>
` },
  {
	  name: "Sage's Foundation",
	  description: "Building upon your pre-existing notes, you're establishing the 'Sage's Foundation' for an even grander edifice of knowledge. Your groundwork is impressive!" ,
	  level: "level 15",
	  icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2L21 6.5V17.5L12 22L3 17.5V6.5L12 2Z" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5" stroke-linejoin="round"/>
  <rect x="6" y="16" width="12" height="2" rx="0.5" fill="var(--interactive-accent)"/>
  <rect x="7.5" y="13" width="9" height="2" rx="0.5" fill="var(--text-normal)"/>
  <rect x="9" y="10" width="6" height="2" rx="0.5" fill="var(--text-muted)"/>
  <path d="M12 7V9" stroke="var(--interactive-accent)" stroke-width="1.5" stroke-linecap="round"/>
</svg>
` },
  {
	  name: "Wisdom Seedling",
	  description: "Your existing notes have nurtured the growth of a 'Wisdom Seedling.' You're cultivating your garden of knowledge with care and patience." ,
	  level: "level 23",
	  icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="10" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5"/>
  <path d="M7 17H17" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M12 17V11" stroke="var(--interactive-accent)" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M12 13C12 13 13 10 16 10C16 10 15 13 12 13Z" fill="var(--interactive-accent)"/>
  <path d="M12 11C12 11 11 8 8 8C8 8 9 11 12 11Z" fill="var(--text-normal)"/>
</svg>
` },
  {
	  name: "Prodigious Preparer",
	  description: "Thanks to your prior efforts, you're a 'Prodigious Preparer,' standing tall among your notes and ready to conquer new realms of understanding." ,
	  level: "level 30",
	  icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M12 22V12L20 7" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 12L4 7" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 7.5L16 5M12 12L16 9.5M8 9.5L12 7.5M8 14.5L12 12.5M12 17.5L16 15M8 5L12 3L16 5" stroke="var(--interactive-accent)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" opacity="0.8"/>
  <path d="M12 12L20 7L12 2L4 7L12 12Z" stroke="var(--interactive-accent)" stroke-width="1.5" stroke-linejoin="round"/>
</svg>
` },
  {
	  name: "Epic Epiphany Explorer",
	  description: "Your past notes have led you to the grand 'Epic Epiphany Explorer' status! You've already been down a few rabbit holes and come out with dazzling discoveries." ,
	  level: "level 35",
	  icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5"/>
  <path d="M9 19H15M8 16H16M8 8H16M9 5H15M9 5C9 4 10 3 12 3C14 3 15 4 15 5" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8 8V16M16 8V16" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M12 9L14.5 12L12 15L9.5 12L12 9Z" fill="var(--interactive-accent)" stroke="var(--interactive-accent)" stroke-width="1" stroke-linejoin="round"/>
  <path d="M12 9V15M9.5 12H14.5" stroke="var(--background-secondary)" stroke-width="0.5" stroke-linecap="round"/>
</svg>
` },
  {
	  name: "Lore Luminary",
	  description: "With your existing notes illuminating your path, you've become a 'Lore Luminary,' shining light on the mysteries of the universe, one idea at a time." ,
	  level: "level 42",
	  icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2L3.33975 7V17L12 22L20.6603 17V7L12 2Z" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M10 20L11 14H13L14 20H10Z" fill="var(--text-muted)"/>
  <path d="M12 14L9 11.5L12 4L15 11.5L12 14Z" fill="var(--interactive-accent)"/>
  <path d="M12 14L10 12.5L12 7.5L14 12.5L12 14Z" fill="var(--background-secondary)" opacity="0.4"/>
  <path d="M12 14L11 13L12 10.5L13 13L12 14Z" fill="var(--background-secondary)"/>
</svg>
` },
  {
	  name: "Scribe of the Ancients",
	  description: "Your mastery of personal knowledge management has elevated you to the esteemed rank of the 'Scribe of the Ancients.' Your existing notes have transformed into treasures, bridging the gap between old wisdom and new discoveries." ,
	  level: "level 50",
	  icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2L3.33975 7V17L12 22L20.6603 17V7L12 2Z" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M7 6H13C14.1046 6 15 6.89543 15 8V16C15 17.1046 14.1046 18 13 18H7C5.89543 18 5 17.1046 5 16V8C5 6.89543 5.89543 6 7 6Z" stroke="var(--text-muted)" stroke-width="1.5"/>
  <path d="M5 8.5C5 7.67157 5.67157 7 6.5 7H13.5C14.3284 7 15 7.67157 15 8.5V8.5C15 9.32843 14.3284 10 13.5 10H6.5C5.67157 10 5 9.32843 5 8.5V8.5Z" fill="var(--background-secondary)" stroke="var(--text-muted)" stroke-width="1.2"/>
  <path d="M15 15.5C15 14.6716 15.6716 14 16.5 14H18.5" stroke="var(--interactive-accent)" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M18.5 6L16 12L17.5 18L18.5 19L19.5 18L21 12L18.5 6Z" fill="var(--interactive-accent)"/>
  <path d="M18.5 14V19" stroke="var(--background-secondary)" stroke-width="0.8" stroke-linecap="round"/>
  <path d="M7.5 13H12.5M7.5 15.5H11.5" stroke="var(--text-muted)" stroke-width="1.2" stroke-linecap="round"/>
</svg>
` },
  {
	  name: "Eureka Maestro",
	  description: "Armed with your existing notes, you're the 'Eureka Maestro,' composing a symphony of insights that harmonize with the melody of discovery." ,
	  level: "level 60",
	  icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="11" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5"/>
  <path d="M9 18H15M9.5 20.5H14.5" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M12 18V16M12 4V3M17.5 6L18.5 5M6.5 6L5.5 5M19 11H20M5 11H4" stroke="var(--background-modifier-border)" stroke-width="1" stroke-linecap="round"/>
  <path d="M12 16C15.3137 16 18 13.3137 18 10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10C6 13.3137 8.68629 16 12 16Z" stroke="var(--text-normal)" stroke-width="1.5"/>
  <path d="M11 13.5C11 13.5 13.5 13.5 13.5 11C13.5 8.5 11.5 7.5 10.5 8.5C9.5 9.5 11 11 12 11C13 11 14 10 14 8" stroke="var(--interactive-accent)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="14" cy="7.5" r="0.8" fill="var(--interactive-accent)"/>
</svg>
` },
  {
	  name: "Chronicles Champion",
	  description: "With your existing notes standing as a testament, you've ascended to the illustrious 'Chronicles Champion' level. Your journey through time's tapestry has brought forth a symphony of insights that harmonize past and present." ,
	  level: "level 75",
	  icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2L19 5V11C19 15.2784 16.0093 19.058 12 22C7.99067 19.058 5 15.2784 5 11V5L12 2Z" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5"/>
  <path d="M8 7H16M8 11L12 14L16 11M11 14V16.5" stroke="var(--text-muted)" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M10 16.5H14V19H10V16.5Z" stroke="var(--interactive-accent)" stroke-width="1.2"/>
  <path d="M12 7V10" stroke="var(--interactive-accent)" stroke-width="1.5" stroke-linecap="round">
    <animate attributeName="stroke-dasharray" values="0,10;5,5" dur="3s" repeatCount="indefinite" />
  </path>
  <path d="M8 17.5C8 17.5 9 16.5 12 16.5C15 16.5 16 17.5 16 17.5V20C16 20 15 19 12 19C9 19 8 20 8 20V17.5Z" fill="var(--interactive-accent)" opacity="0.2"/>
  <path d="M8 17.5C8 17.5 9 16.5 12 16.5C15 16.5 16 17.5 16 17.5M8 18.8C8 18.8 9 17.8 12 17.8C15 17.8 16 18.8 16 18.8M8 20C8 20 9 19 12 19C15 19 16 20 16 20M12 16.5V20" stroke="var(--text-normal)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
` },
  {
	  name: "The Curious Cartographer",
	  description: "As 'The Curious Cartographer,' your existing notes have mapped out uncharted territories of understanding. Your curiosity knows no bounds, and your notes are the compass guiding your exploration." ,
	  level: "level 82",
	  icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="11" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5"/>
  <circle cx="12" cy="12" r="8" stroke="var(--text-muted)" stroke-width="1" stroke-dasharray="1 2"/>
  <circle cx="12" cy="12" r="5" stroke="var(--interactive-accent)" stroke-width="1.5"/>
  <path d="M12 2V5M12 19V22M2 12H5M19 12H22" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M12 12L18 6" stroke="var(--interactive-accent)" stroke-width="2" stroke-linecap="round"/>
  <path d="M12 12L15 15" stroke="var(--text-normal)" stroke-width="2" stroke-linecap="round"/>
  <circle cx="12" cy="12" r="1.5" fill="var(--text-normal)"/>
  <path d="M7 17L5 19M17 7L19 5" stroke="var(--text-muted)" stroke-width="1" stroke-linecap="round"/>
</svg>
` },
  {
	  name: "Sultan of Synthesis",
	  description: "Your existing notes have made you the 'Sultan of Synthesis.' You're the master weaver, threading together threads of information into a rich tapestry of insight." ,
	  level: "level 90",
	  icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 21.5L20.2272 16.75V7.25L12 2.5L3.77277 7.25V16.75L12 21.5Z" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5"/>
  <circle cx="12" cy="12" r="3.5" stroke="var(--interactive-accent)" stroke-width="2"/>
  <path d="M12 6V8.5" stroke="var(--text-normal)" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M12 8.5L10.5 7.5M12 8.5L13.5 7.5" stroke="var(--text-normal)" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M12 18V15.5" stroke="var(--text-normal)" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M12 15.5L10.5 16.5M12 15.5L13.5 16.5" stroke="var(--text-normal)" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M6 12H8.5" stroke="var(--text-normal)" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M8.5 12L7.5 10.5M8.5 12L7.5 13.5" stroke="var(--text-normal)" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M18 12H15.5" stroke="var(--text-normal)" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M15.5 12L16.5 10.5M15.5 12L16.5 13.5" stroke="var(--text-normal)" stroke-width="1.5" stroke-linecap="round"/>
  <circle cx="12" cy="12" r="1" fill="var(--interactive-accent)"/>
</svg>
` },
  {
	  name: "Eternal Archivist",
	  description: "At the pinnacle of personal knowledge mastery, you're now revered as the 'Eternal Archivist.' Your existing notes, carefully curated and nurtured, stand as immortal beacons, guiding seekers through the labyrinth of knowledge across ages." ,
	  level: "level 100",
	  icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 21.5L20.2272 16.75V7.25L12 2.5L3.77277 7.25V16.75L12 21.5Z" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5"/>
  <path d="M12 16V17.5M12 16C10 16 7 15.5 5 17.5V9.5C7 7.5 10 8 12 8M12 16C14 16 17 15.5 19 17.5V9.5C17 7.5 14 8 12 8M12 16V8M12 8C12 6.5 12 5.5 12 5" stroke="var(--text-muted)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M14.5 10.5C16.5 8.5 19.5 8.5 19.5 12C19.5 15.5 16.5 15.5 14.5 13.5L9.5 10.5C7.5 8.5 4.5 8.5 4.5 12C4.5 15.5 7.5 15.5 9.5 13.5L14.5 10.5Z" stroke="var(--interactive-accent)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
` },
];


export const badges: Badge[] = [
	{
		name: "Consistent Lore Weaver",
		description: "Congratulations! You've woven a tapestry of knowledge for 30 consecutive days. As a 'Consistent Lore Weaver,' your daily contributions have become the threads that enrich the fabric of your growing wisdom.",
		level: "30 Days",
		icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="4" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5"/><path d="M8 6V18M12 6V18M16 6V18" stroke="var(--interactive-accent)" stroke-width="1.5" stroke-linecap="round"/><path d="M6 8H18M6 12H18M6 16H18" stroke="var(--text-normal)" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="8" r="1" fill="var(--interactive-accent)"/><circle cx="16" cy="8" r="1" fill="var(--interactive-accent)"/><circle cx="12" cy="12" r="1" fill="var(--interactive-accent)"/><circle cx="8" cy="16" r="1" fill="var(--interactive-accent)"/><circle cx="16" cy="16" r="1" fill="var(--interactive-accent)"/></svg>`
	},
	{
		name: "Knowledge Artisan Stalwart",
		description: "You've forged a robust foundation with 90 consecutive days of dedicated note crafting. As a 'Knowledge Artisan Stalwart,' your commitment has sculpted your repository into a work of art, a testament to your persistent curiosity.",
		level: "90 Days",
		icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L21 6.5V17.5L12 22L3 17.5V6.5L12 2Z" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5" stroke-linejoin="round"/><path d="M6 16.5H18M7.5 16.5L8.5 13.5H15.5L16.5 16.5M19 10H8.5C6.5 10 5.5 11 5.5 11.5C5.5 12 6.5 13.5 8.5 13.5H16L19 10Z" stroke="var(--text-normal)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.5 5L15.1 6.9L17 7.5L15.1 8.1L14.5 10L13.9 8.1L12 7.5L13.9 6.9L14.5 5Z" fill="var(--interactive-accent)" stroke="var(--interactive-accent)" stroke-width="0.5" stroke-linejoin="round"/><path d="M10 13.5V16.5M14 13.5V16.5" stroke="var(--text-muted)" stroke-width="1" stroke-linecap="round"/></svg>`
	},
	{
		name: "Wisdom Architect Virtuoso",
		description: "With each passing day, you've laid down the blueprints of a profound structure. As a 'Wisdom Architect Virtuoso' at 180 days, your continuous efforts have transformed your knowledge space into an architectural marvel, a testament to your enduring passion for learning.",
		level: "180 Days",
		icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L21 6.5V17.5L12 22L3 17.5V6.5L12 2Z" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5" stroke-linejoin="round"/><path d="M6 10L12 6L18 10" stroke="var(--interactive-accent)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.5 10.5H18.5" stroke="var(--text-normal)" stroke-width="1.5" stroke-linecap="round"/><path d="M7 11V16M10.33 11V16M13.66 11V16M17 11V16" stroke="var(--text-normal)" stroke-width="1.5" stroke-linecap="round"/><path d="M6 16.5H18" stroke="var(--text-normal)" stroke-width="1.5" stroke-linecap="round"/><path d="M5 18H19" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round"/></svg>`
	},
	{
		name: "Eternal Scholar Maestro",
		description: "A year of unwavering dedication! You've earned the title of 'Eternal Scholar Maestro' by contributing daily for 365 days. Your commitment has created a masterpiece of continuous learning, setting you apart as a true maestro of personal knowledge.",
		level: "365 Days",
		icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L21 6.5V17.5L12 22L3 17.5V6.5L12 2Z" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5" stroke-linejoin="round"/><path d="M7 16C6 14 5.5 12 6 9M17 16C18 14 18.5 12 18 9" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round"/><path d="M5.5 15L7 14M5.5 12L7.5 11.5M6.5 9L8 9.5" stroke="var(--interactive-accent)" stroke-width="1.5" stroke-linecap="round"/><path d="M18.5 15L17 14M18.5 12L16.5 11.5M17.5 9L16 9.5" stroke="var(--interactive-accent)" stroke-width="1.5" stroke-linecap="round"/><path d="M11 8H13M12 8V16M11 16H13" stroke="var(--text-normal)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
	},
	{
		name: "Divine Omniscience Overlord",
		description: "Behold the divine! Your unbroken streak of daily contributions for 730 days crowns you as the 'Divine Omniscience Overlord.' Your two-year feat is a testament to your unmatched commitment and the creation of a knowledge empire that stands as a beacon for all seekers.",
		level: "730 Days",
		icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L21 6.5V17.5L12 22L3 17.5V6.5L12 2Z" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5" stroke-linejoin="round"/><path d="M5 18H19L20 12L16.5 14L12 10L7.5 14L4 12L5 18Z" fill="var(--interactive-accent)" fill-opacity="0.1" stroke="var(--text-normal)" stroke-width="1.5" stroke-linejoin="round"/><circle cx="5" cy="11.5" r="1" fill="var(--text-normal)"/><circle cx="12" cy="9.5" r="1" fill="var(--text-normal)"/><circle cx="19" cy="11.5" r="1" fill="var(--text-normal)"/><path d="M12 3L12.5 4.5L14 5L12.5 5.5L12 7L11.5 5.5L10 5L11.5 4.5L12 3Z" fill="var(--interactive-accent)"/><path d="M7 5L7.3 6.1L8.2 6.5L7.3 6.9L7 8L6.7 6.9L5.8 6.5L6.7 6.1L7 5Z" fill="var(--interactive-accent)"/><path d="M17 5L17.3 6.1L18.2 6.5L17.3 6.9L17 8L16.7 6.9L15.8 6.5L16.7 6.1L17 5Z" fill="var(--interactive-accent)"/><rect x="7" y="15.5" width="10" height="1" rx="0.5" fill="var(--background-secondary)" stroke="var(--text-muted)" stroke-width="0.75"/></svg>`
	},
];

