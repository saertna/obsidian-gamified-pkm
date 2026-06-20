export interface GamificationMediator {
	getSettingNumber(_key: string):number;
	getSettingString(_key: string): string;
	getSettingBoolean(_key: string):boolean;


	setSettingString(_key: string, value: string): void;
	setSettingNumber(_key: string, value: number): void;
	setSettingBoolean(_key: string, value: boolean): void;

	acquireIngredients(chance:number, min:number, max:number): Promise<void> | void;

	saveSettings(): Promise<void>;

	updateProfileLeaf(): Promise<void>;

	updateProfileLeafPic(): void;

	updateChartWeeklyColorReceived(value: string): void

	updateChartWeeklyColorToGo(value: string): void

	closeProfileView(): void

	updateIngredientStock(ingredientName: string, newAmount: number ):  Promise<void> | void;

	updateMultipleIngredients(updates: { name: string, newAmount: number }[]): Promise<void>

	loadSettings(): Promise<void> | void;
}
