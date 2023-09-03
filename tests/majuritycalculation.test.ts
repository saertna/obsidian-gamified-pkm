import { describe } from 'node:test';
import {
	countLayer2AndLayer3Characters,
	rateLevelOfMaturity, rateOutlinks,
	rateInlinks, rateDirection,
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


describe('rateOutlinks', () => {
	it('if < 2 ⇒ 0', () => {
		const actual = rateOutlinks(1);
		const expected = 0;
		expect(actual).toBe(expected);
	});

	it('if >= 2 < 3 ⇒ 1', () => {
		const actual = rateOutlinks(2);
		const expected = 1;
		expect(actual).toBe(expected);
	});

	it('if >= 3 < 5 ⇒ 4', () => {
		const actual = rateOutlinks(4);
		const expected = 4;
		expect(actual).toBe(expected);
	});

	it('if >= 5 < 9 ⇒ 5', () => {
		const actual = rateOutlinks(8);
		const expected = 5;
		expect(actual).toBe(expected);
	});

	it('if >= 9 < 10 ⇒ 3', () => {
		const actual = rateOutlinks(10);
		const expected = 3;
		expect(actual).toBe(expected);
	});

	it('if >= 11 < 12 ⇒ 1', () => {
		const actual = rateOutlinks(11);
		const expected = 1;
		expect(actual).toBe(expected);
	});

	it('if >= 12 ⇒ 0', () => {
		const actual = rateOutlinks(12);
		const expected = 0;
		expect(actual).toBe(expected);
	});

});


describe('rateInlinks', () => {
	it('rateInlinks ⇒ 0', () => {
		const actual = rateInlinks(0);
		const expected = 0;
		expect(actual).toBe(expected);
	});

	it('rateInlinks ⇒ 1', () => {
		const actual = rateInlinks(3);
		const expected = 1;
		expect(actual).toBe(expected);
	});

	it('rateInlinks ⇒ 2', () => {
		const actual = rateInlinks(7);
		const expected = 2;
		expect(actual).toBe(expected);
	});

	it('rateInlinks ⇒ 3', () => {
		const actual = rateInlinks(10);
		const expected = 3;
		expect(actual).toBe(expected);
	});

	it('rateInlinks ⇒ 4', () => {
		const actual = rateInlinks(15);
		const expected = 4;
		expect(actual).toBe(expected);
	});

	it('rateInlinks ⇒ 5', () => {
		const actual = rateInlinks(16);
		const expected = 5;
		expect(actual).toBe(expected);
	});

	it('rateInlinks ⇒ 5', () => {
		const actual = rateInlinks(499);
		const expected = 5;
		expect(actual).toBe(expected);
	});

});


describe('rateDirection', () => {
	it('new is lower', () => {
		const actual = rateDirection("4⬇️",3);
		const expected = '3⬇️';
		expect(actual).toBe(expected);
	});

	it('new is equal', () => {
		const actual = rateDirection("3⬇️",3);
		const expected = '3➡️';
		expect(actual).toBe(expected);
	});

	it('new is higher', () => {
		const actual = rateDirection("2⬇️",3);
		const expected = '3⬆️';
		expect(actual).toBe(expected);
	});

	it('new is something else', () => {
		const actual = rateDirection("",3);
		const expected = '3';
		expect(actual).toBe(expected);
	});
});
