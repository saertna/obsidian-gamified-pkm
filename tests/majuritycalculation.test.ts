import { describe } from 'node:test';
import {
	countLayer2AndLayer3Characters,
	rateLevelOfMaturity,
	rateProgressiveSummarization
} from "../src/majuritycalculation";

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


describe('countLayer2AndLayer3Characters', () => {
	it('return the number chars for each layer.', () => {
		const actual = countLayer2AndLayer3Characters('# This is an example Text for Test\nThis is Line 1\nThis is Line 2\nThis is Line 3\n#thisIsATag','This is an example Text for Test', 'This is Line 1', 'is');
		const expected = {charCount:44, highlightedCount:14, boldCount:2};
		expect(actual).toBe(expected);
	});

});


describe('rateLevelOfMaturity', () => {
	it('if all classes are at 5, result shall be 5', () => {
		const actual = rateLevelOfMaturity(5,5,5,5,5);
		const expected = 5;
		expect(actual).toBe(expected);
	});

	it('if all classes but ProgSum are at 5, result shall be 5', () => {
		const actual = rateLevelOfMaturity(5,5,5,5,0);
		const expected = 5;
		expect(actual).toBe(expected);
	});

	it('if all classes but note length are at 5, result shall be 5', () => {
		const actual = rateLevelOfMaturity(5,0,5,5,5);
		const expected = 5;
		expect(actual).toBe(expected);
	});

});
