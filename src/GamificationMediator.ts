export interface GamificationMediator {
	getSettingNumber(key: string):number;
	getSettingString(key: string): string;
	getSettingBoolean(key: string):boolean;


	setSettingString(key: string, value: string): void;
	setSettingNumber(key: string, value: number): void;
	setSettingBoolean(key: string, value: boolean): void;

	acquireIngredients(chance:number, min:number, max:number): void;

	saveSettings(): Promise<void>;

	updateProfileLeaf(): void;

	updateProfileLeafPic(): void;

	updateChartWeeklyColorReceived(value: string): void

	updateChartWeeklyColorToGo(value: string): void
}
