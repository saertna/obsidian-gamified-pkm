// This portion of code is adapted from the following source under the MIT License:
// https://github.com/froehlichA/obsidian-avatar
// Copyright (c) [2024], [froehlichA]
// License: MIT
import type {MarkdownPostProcessorContext} from "obsidian";
import type {CodeBlockProcessorProps} from "./renderCodeBlockProcessor";
import {parseYaml, stringifyYaml} from "obsidian";

export type State<T> = Partial<T>;
export type SetState<T> = (setter: (state: Partial<T>) => void) => void;

export type StateProvider<T> = (props: CodeBlockProcessorProps, source: string, node: HTMLElement, ctx: MarkdownPostProcessorContext) => {
	state: State<T>,
	setState: SetState<T>
};

export function withCodeblockState<T>(): StateProvider<T> {
	return (props, source, node, ctx) => {
		let state: State<T> = {};
		try {
			state = parseYaml(source) ?? {};
		} catch (_) {}

		const setState: SetState<T> = (stateSetter) => {
			const newState = { ...state };
			stateSetter(newState);
			const newStateStr: string = stringifyYaml(newState);

			const info = ctx.getSectionInfo(node);
			if(info) {
				this.app.workspace.activeEditor?.editor?.replaceRange(
					newStateStr + "```",
					{ line: info.lineStart + 1, ch: 0 },
					{ line: info.lineEnd, ch: 3 }
				);
			}
		};

		return {
			state,
			setState
		}
	};
}
