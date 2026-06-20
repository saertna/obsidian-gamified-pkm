// types.d.ts
import { App, TFile, Link } from "obsidian";

declare module "obsidian-dataview" {
	export interface DataArray<T> {
		length: number;
		where(predicate: (obj: T) => boolean): DataArray<T>;
		map<U>(mapper: (obj: T) => U): DataArray<U>;
		array(): T[];
	}

	// Define the structure of a Dataview Page
	export interface DataviewPage {
		file: {
			path: string;
			name: string;
			frontmatter: Record<string, any>;
			inlinks: DataArray<Link>;  // or Link[]
			outlinks: DataArray<Link>; // or Link[]
			[key: string]: any;
		};
		[key: string]: any;
	}

	export interface DataviewApi {
		// Change from Record<string, unknown> to DataviewPage
		page(path: string): DataviewPage | undefined;
		pages(query?: string): DataArray<DataviewPage>;
		fileValues(path: string): Record<string, any>;
	}

	export function getAPI(app?: App): DataviewApi | undefined;
}
