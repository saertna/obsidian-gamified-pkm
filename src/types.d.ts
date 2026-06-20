// types.d.ts
import { App } from "obsidian";

declare module "obsidian-dataview" {
	export interface DataviewApi {
		page(path: string): Record<string, unknown> | undefined;
		pages(query?: string): Array<Record<string, unknown>>;
		fileValues(path: string): Record<string, unknown>;
	}

	/**
	 * This allows the getAPI function to be typed correctly.
	 * In Obsidian, 'app' is the global App instance.
	 */
	export function getAPI(app?: App): DataviewApi | undefined;
}
