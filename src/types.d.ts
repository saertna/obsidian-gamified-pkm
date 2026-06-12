// types.d.ts

// This "augments" the existing module or creates it if missing
declare module "obsidian-dataview" {
	export interface DataviewApi {
		page(path: string): any;
		pages(query?: string): any;
		fileValues(path: string): any;
	}

	// This allows the getAPI function to be typed correctly too
	export function getAPI(app?: any): DataviewApi | undefined;
}
