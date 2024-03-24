// This portion of code is adapted from the following source under the MIT License:
// https://github.com/froehlichA/obsidian-avatar
// Copyright (c) [2024], [froehlichA]
// License: MIT
import {App, SuggestModal, normalizePath, prepareFuzzySearch} from "obsidian";
import type {SearchMatchPart} from "obsidian";

export interface Image {
	title: DocumentFragment;
	desc?: string;
	path: string;
}

export class SelectImageModal extends SuggestModal<Image> {
	constructor(
		app: App,
		private readonly onSelect: (path: string) => void
	) {
		super(app);
		this.setPlaceholder("Select image / Paste URL...");
		this.setInstructions([
			{ command: "↑↓", purpose: "to navigate" },
			{ command: "↵", purpose: "to select" }
		]);
	}

	override getSuggestions(query: string): Image[] {
		const search = prepareFuzzySearch(query);
		const files = this.app.vault.getFiles()
			.filter(f => ["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(f.extension))
			.map(f => ({ title: f.name, path: f.path }));
		const searchResults = files
			.map<Image & { score: number }>(f => {
				const result = search(f.title);
				return {
					title: result?.matches ? fuzzyStrToFragment(f.title, result?.matches) : strToFragment(f.title),
					path: f.path,
					score: result?.score ?? 1
				}
			})
			.filter(f => f.score < 1)
			.sort((a, b) => Math.abs(a.score) - Math.abs(b.score));

		if (query.startsWith("http://") || query.startsWith("https://")) {
			const shortenedQuery = query.substring(0, 30) + (query.length >= 30 ? "..." : "");
			return [
				...searchResults,
				{ title: strToFragment(shortenedQuery), desc: "Use URL", path: query }
			];
		} else {
			return searchResults;
		}
	}

	override renderSuggestion(item: Image, el: HTMLElement) {
		el.createEl("span", { text: item.title });
		el.createEl("small", { text: item.desc, cls: "avatar-plugin--float-right" });
	}

	override onChooseSuggestion(item: Image, evt: MouseEvent | KeyboardEvent): any {
		this.onSelect(normalizePath(item.path));
	}
}

function strToFragment(str: string): DocumentFragment {
	const fragment = new DocumentFragment();
	fragment.createEl("span", { text: str });
	return fragment;
}

function fuzzyStrToFragment(str: string, matches: SearchMatchPart[]) : DocumentFragment {
	const fragment = new DocumentFragment();

	const highlightedIndices: number[] = [];
	for(const match of matches) {
		for(let i = match[0]; i < match[1]; i++) {
			highlightedIndices.push(i);
		}
	}

	for(let i = 0; i < str.length; i++) {
		const char = str[i];
		if(highlightedIndices.includes(i)) {
			fragment.createEl("span", { text: char, cls: "suggestion-highlight" });
		} else {
			fragment.createEl("span", { text: char });
		}
	}
	return fragment;
}
