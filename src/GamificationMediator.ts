export interface GamificationMediator {
	getSettingNumber(key: string):number;
	getSettingString(key: string): string;


	setSettingString(key: string, value: string): void;
	setSettingNumber(key: string, value: number): void;
	setSettingBoolean(key: string, value: boolean): void;

	acquireIngredients(chance:number, min:number, max:number): void;
}
