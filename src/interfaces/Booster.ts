export interface Ingredient {
	type: string; // e.g., 'S1', 'S6', 'SX'
	quantity: number;
}

export interface Booster {
	// Core definition properties
	id: string; // A unique programmatic identifier (your 'varname')
	name: string; // The display name
	description: string;
	runtime: number; // Duration of effect, in SECONDS (your 'boosterRunTime' converted from minutes)
	cooldown: number; // Cooldown duration, in SECONDS (your 'boosterCooldown' converted from minutes)

	// Properties related to your game state/settings management
	boosterUseCountName: string; // Key for tracking how many times used (e.g., 'boosterUseCountTemporalTweaker')
	boosterDateSettingKey: string; // Setting key for the last used date (e.g., 'boosterDateTemporalTweaker')
	boosterFactorSwitchSettingKey: string; // Setting key for the booster's active factor (e.g., 'boosterFactorPerpetualProgress')

	// Visual properties
	svg: string; // The SVG content for the icon
	color: string; // The primary color for the icon

	// Ingredient requirements
	ingredients: Ingredient[]; // Structured list of ingredients needed for crafting
	specialIngredientRequirement?: string; // For special cases like 'free all 22h' or 'all pots'

	// Effect modifiers (optional, based on booster type)
	multiplier?: number; // e.g., 2 for 2x points
	pointReductionFactor?: number; // e.g., 0.20 for 20% reduction (Effortless Expansion)
	frequencyIncrease?: number; // e.g., 0.40 for 40% increase (Inspiration Infusion)
	// Add other specific effect properties as needed for your game logic
}
