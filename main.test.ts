import {updateStatusBar} from 'main'
import { describe, test } from 'node:test';

export type HTMLSpanElement = {
    stat: {
      ctime: number;
      mtime: number;
      size: number;
    };
    basename: string;
    extension: string;
    path: string;
    name: string;
    parent: null;
  };
const statusbar : HTMLSpanElement = this.addStatusBarItem().createEl("span", { text: "" });

describe('updateStatusBar', () => {
    it('should return 0 if the target level is less than 1', () => {
    const actual = updateStatusBar(statusbar);
    const expected = 0;
    expect(actual).toBe(expected);
    });
    });