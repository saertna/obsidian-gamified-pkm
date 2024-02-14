export interface GamificationMediator {
	// Define methods for communication between ModalBooster and main.ts
	// For example:
	// method1(): void;
	// method2(arg: string): number;
	updateIncrementStock(increment: string, stock: number): void;

	getSettingNumber(key: string):number;
	getSettingString(key: string): string;


	setSettingString(key: string, value: string): void;
	setSettingNumber(key: string, value: number): void;
	setSettingBoolean(key: string, value: boolean): void;


	acquireIngredients(chance:number, min:number, max:number): void;
}
