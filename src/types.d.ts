// types.d.ts
import { App } from "obsidian";

declare module "obsidian-dataview" {
	// 1. Define what a DataArray looks like (the collection dv.pages() returns)
	export interface DataArray<T> {
		length: number;
		/** Filters the data array by a predicate. */
		where(predicate: (obj: T) => boolean): DataArray<T>;
		/** Maps the data array. */
		map<U>(mapper: (obj: T) => U): DataArray<U>;
		/** Accesses the raw array. */
		array(): T[];
		// Add other methods if you use them (e.g., sort, limit)
	}

	export interface DataviewApi {
		page(path: string): Record<string, unknown> | undefined;

		// 2. Change Array<...> to DataArray<...>
		pages(query?: string): DataArray<Record<string, unknown>>;

		fileValues(path: string): Record<string, unknown>;
	}

	export function getAPI(app?: App): DataviewApi | undefined;
}
