import { Badge } from '../badges'
export const PLUGIN_VERSION = '0.0.97';
export const pointsNoteMajurity = 100;
export const pointsMajurity = 10;
export const pointsForDailyChallenge = 500;
export const pointsForWeeklyChallenge = 2000;
export const streakboosterDecrease = 0.2;
export const streakboosterIncreaseDaily = 0.1;
export const streakboosterIncreaseWeekly = 1;
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const CryptoJS = require("crypto-js");
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
  { name: "Enlightened Novice", description: "Huzzah! You've embarked on the path of knowledge and earned the title of 'Enlightened Novice.' The journey has just begun, and you're already radiating wisdom like a baby sun!", level: "level 5" },
  { name: "Curious Connoisseur", description: "Fantastic! You've embraced the wonders of learning and become a 'Curious Connoisseur.' Your appetite for knowledge is insatiable, like a bottomless bowl of ice cream!" , level: "level 10" },
  { name: "Brainiac Trailblazer", description: "Bravo! As a 'Brainiac Trailblazer,' you've carved your way through a jungle of information and emerged victorious. Your intellect is a beacon shining brightly for others to follow!" , level: "level 20" },
  { name: "Scholarly Trailblazer", description: "Impressive! You're now a 'Scholarly Trailblazer,' boldly venturing through a sea of knowledge with a compass of curiosity and a map of intellect!" , level: "level 27" },
  { name: "Info Ninja Master", description: "Incredible! You've reached the pinnacle of stealthy knowledge management. As an 'Info Ninja Master,' you can snatch information from the shadows like a digital ninja!" , level: "level 35" },
  { name: "Wise Owl Guru", description: "Whoo-hoo! You've achieved 'Wise Owl Guru' status. Your wisdom is legendary, and your hoots of knowledge echo through the forest of ignorance!" , level: "level 42" },
  { name: "Einstein Incarnate", description: "Eureka! You've become an 'Einstein Incarnate,' pushing the boundaries of understanding and bending the fabric of knowledge to your will!" , level: "level 50" },
  { name: "Mastermind Sage", description: "Magnificent! You've ascended to the rank of 'Mastermind Sage,' guiding the rivers of information and enlightening all who seek wisdom!" , level: "level 60" },
  { name: "Cerebral Maestro", description: "Bravissimo! You're now a 'Cerebral Maestro,' conducting the symphony of knowledge with the finesse of a virtuoso conductor!" , level: "level 75" },
  { name: "Zen Knowledge Keeper", description: "Serenity achieved! As a 'Zen Knowledge Keeper,' you maintain a tranquil mind while managing vast pools of knowledge with grace and poise." , level: "level 82" },
  { name: "Grand Archivist Overlord", description: "All hail the 'Grand Archivist Overlord!' You wield the knowledge of ages and hold the keys to unlock the gates of wisdom!" , level: "level 90" },
  { name: "Omniscient Sage of Everything", description: "Congratulations, oh wise one! You've attained the highest level of enlightenment as the 'Omniscient Sage of Everything.' Your understanding knows no bounds, and your wisdom is as vast as the cosmos itself!", level: "level 100"  },
];
export const badgeInitLevels: number[] = [0, 3, 7, 15, 23, 30, 35, 42, 50, 60, 75, 82, 90, 100];
export const badgeNamesInit: Badge[] = [
  { name: "Lore Seeker Initiate", description: "Welcome to the journey of knowledge! As a 'Lore Seeker Initiate,' you've taken your first steps into the world of organized wisdom. Your quest has just begun, and with each note you make, you lay the foundation for a future rich with insights and understanding. Your journey starts here, and the path ahead is filled with potential and discovery.", level: "level 1" },
  { name: "Lore Apprentice", description: "You've hit the ground running with your existing knowledge treasures! You're already an 'Lore Apprentice,' armed with a wealth of wisdom and ready to shape it further.", level: "level 3" },
  { name: "Savvy Scholar", description: "Your existing notes have given you a head start! You're now a 'Savvy Scholar,' confidently diving into the sea of information with a treasure trove of insights." , level: "level 7" },
  { name: "Sage's Foundation", description: "Building upon your pre-existing notes, you're establishing the 'Sage's Foundation' for an even grander edifice of knowledge. Your groundwork is impressive!" , level: "level 15" },
  { name: "Wisdom Seedling", description: "Your existing notes have nurtured the growth of a 'Wisdom Seedling.' You're cultivating your garden of knowledge with care and patience." , level: "level 23" },
  { name: "Prodigious Preparer", description: "Thanks to your prior efforts, you're a 'Prodigious Preparer,' standing tall among your notes and ready to conquer new realms of understanding." , level: "level 30" },
  { name: "Epic Epiphany Explorer", description: "Your past notes have led you to the grand 'Epic Epiphany Explorer' status! You've already been down a few rabbit holes and come out with dazzling discoveries." , level: "level 35" },
  { name: "Lore Luminary", description: "With your existing notes illuminating your path, you've become a 'Lore Luminary,' shining light on the mysteries of the universe, one idea at a time." , level: "level 42" },
  { name: "Scribe of the Ancients", description: "Your mastery of personal knowledge management has elevated you to the esteemed rank of the 'Scribe of the Ancients.' Your existing notes have transformed into treasures, bridging the gap between old wisdom and new discoveries." , level: "level 50" },
  { name: "Eureka Maestro", description: "Armed with your existing notes, you're the 'Eureka Maestro,' composing a symphony of insights that harmonize with the melody of discovery." , level: "level 60" },
  { name: "Chronicles Champion", description: "With your existing notes standing as a testament, you've ascended to the illustrious 'Chronicles Champion' level. Your journey through time's tapestry has brought forth a symphony of insights that harmonize past and present." , level: "level 75" },
  { name: "The Curious Cartographer", description: "As 'The Curious Cartographer,' your existing notes have mapped out uncharted territories of understanding. Your curiosity knows no bounds, and your notes are the compass guiding your exploration." , level: "level 82" },
  { name: "Sultan of Synthesis", description: "Your existing notes have made you the 'Sultan of Synthesis.' You're the master weaver, threading together threads of information into a rich tapestry of insight." , level: "level 90" },
  { name: "Eternal Archivist", description: "At the pinnacle of personal knowledge mastery, you're now revered as the 'Eternal Archivist.' Your existing notes, carefully curated and nurtured, stand as immortal beacons, guiding seekers through the labyrinth of knowledge across ages." , level: "level 100" },
];

export const badges: Badge[] = [
  { name: "Consistent Lore Weaver", description: "Congratulations! You've woven a tapestry of knowledge for 30 consecutive days. As a 'Consistent Lore Weaver,' your daily contributions have become the threads that enrich the fabric of your growing wisdom.", level: "" },
  { name: "Knowledge Artisan Stalwart", description: "You've forged a robust foundation with 90 consecutive days of dedicated note crafting. As a 'Knowledge Artisan Stalwart,' your commitment has sculpted your repository into a work of art, a testament to your persistent curiosity.", level: "" },
  { name: "Wisdom Architect Virtuoso", description: "With each passing day, you've laid down the blueprints of a profound structure. As a 'Wisdom Architect Virtuoso' at 180 days, your continuous efforts have transformed your knowledge space into an architectural marvel, a testament to your enduring passion for learning.", level: "" },
  { name: "Eternal Scholar Maestro", description: "A year of unwavering dedication! You've earned the title of 'Eternal Scholar Maestro' by contributing daily for 365 days. Your commitment has created a masterpiece of continuous learning, setting you apart as a true maestro of personal knowledge.", level: "" },
  { name: "Divine Omniscience Overlord", description: "Behold the divine! Your unbroken streak of daily contributions for 730 days crowns you as the 'Divine Omniscience Overlord.' Your two-year feat is a testament to your unmatched commitment and the creation of a knowledge empire that stands as a beacon for all seekers.", level: "" },
];
