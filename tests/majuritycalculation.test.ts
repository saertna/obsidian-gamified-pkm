import { describe } from 'node:test';
import {statusPointsForLevel} from "../src/levels";
import {rateProgressiveSummarization} from "../src/majuritycalculation";

describe('rateProgressiveSummarization', () => {
	it('if nothing higlighted shall return 0', () => {
		const actual = rateProgressiveSummarization(0,0,0);
		const expected = 0;
		expect(actual).toBe(expected);
	});

	it('if less then 3000 chars are in the file shall return 0', () => {
		const actual = rateProgressiveSummarization(2999, 0,0);
		const expected = 0;
		expect(actual).toBe(expected);
	});

	it('10% of Layer1 and 10% of Layer2 shall return 5', () => {
		const actual = rateProgressiveSummarization(3000,300,30);
		const expected = 5;
		expect(actual).toBe(expected);
	});

	it('10% of Layer1 and 20% of Layer2 shall return 3', () => {
		const actual = rateProgressiveSummarization(3000,300,60);
		const expected = 4;
		expect(actual).toBe(expected);
	});
});
