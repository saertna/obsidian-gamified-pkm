import { TFile, } from 'obsidian';
import { MaturityCalculator } from '../src/maturitycalculation'

describe('rateProgressiveSummarization', () => {
	let maturityCalculator: MaturityCalculator;
	let mockApp: any;

	beforeEach(() => {
		// Mock the app object and metadataCache
		mockApp = {
			metadataCache: {
				getFileCache: jest.fn(),
			},
			workspace: {
				getActiveFile: jest.fn(),
				getActiveViewOfType: jest.fn()
			},
			fileManager: {
				processFrontMatter: jest.fn()
			}
		};
		maturityCalculator = new MaturityCalculator(mockApp);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	test('should return 0 if charCountTotal is less than 3000', () => {
		expect(maturityCalculator.rateProgressiveSummarization(2999, 100, 10)).toBe(0);
	});

	test('should return correct maturity for different layer2 and layer3 counts', () => {
		// Test percentLayer2 boundaries
		expect(maturityCalculator.rateProgressiveSummarization(3000, 0, 0)).toBe(0);
		expect(maturityCalculator.rateProgressiveSummarization(3000, 300, 30)).toBe(5);
		expect(maturityCalculator.rateProgressiveSummarization(3000, 600, 60)).toBe(4);
		expect(maturityCalculator.rateProgressiveSummarization(3000, 900, 90)).toBe(2);
		expect(maturityCalculator.rateProgressiveSummarization(3000, 900, 800)).toBe(2);
		expect(maturityCalculator.rateProgressiveSummarization(3000, 1200, 120)).toBe(2);
		expect(maturityCalculator.rateProgressiveSummarization(3000, 1500, 150)).toBe(1);
		expect(maturityCalculator.rateProgressiveSummarization(3000, 1800, 180)).toBe(0);

		// Test percentLayer3 boundaries
		expect(maturityCalculator.rateProgressiveSummarization(3000, 300, 0)).toBe(0);
		expect(maturityCalculator.rateProgressiveSummarization(3000, 300, 30)).toBe(5);
		expect(maturityCalculator.rateProgressiveSummarization(3000, 300, 60)).toBe(4);
		expect(maturityCalculator.rateProgressiveSummarization(3000, 300, 90)).toBe(2);

		// Test layer2maturity and layer3maturity combinations
		expect(maturityCalculator.rateProgressiveSummarization(3000, 300, 0)).toBe(0);
		expect(maturityCalculator.rateProgressiveSummarization(3000, 1200, 0)).toBe(2);
		expect(maturityCalculator.rateProgressiveSummarization(3000, 900, 0)).toBe(2);
		expect(maturityCalculator.rateProgressiveSummarization(3000, 600, 60)).toBe(4);
		expect(maturityCalculator.rateProgressiveSummarization(3000, 300, 30)).toBe(5);
		expect(maturityCalculator.rateProgressiveSummarization(3000, 1500, 0)).toBe(1);
		expect(maturityCalculator.rateProgressiveSummarization(3000, 900, 60)).toBe(2);
	});

	test('should return correct maturity for edge cases', () => {
		// Edge cases
		expect(maturityCalculator.rateProgressiveSummarization(3000, 1500, 150)).toBe(1); // 50% L2, 10% L3
		expect(maturityCalculator.rateProgressiveSummarization(3000, 1800, 180)).toBe(0); // 60% L2, 10% L3
		expect(maturityCalculator.rateProgressiveSummarization(3000, 600, 30)).toBe(4); // 20% L2, 5% L3
		expect(maturityCalculator.rateProgressiveSummarization(3000, 600, 60)).toBe(4); // 20% L2, 10% L3
		expect(maturityCalculator.rateProgressiveSummarization(3000, 300, 30)).toBe(5); // 10% L2, 10% L3
		expect(maturityCalculator.rateProgressiveSummarization(3000, 120, 10)).toBe(5); // 4% L2, 8.3% L3
		expect(maturityCalculator.rateProgressiveSummarization(3000, 119, 11)).toBe(3); // 3.97% L2, 9.24% L3 (slightly below 4% for L2)
		expect(maturityCalculator.rateProgressiveSummarization(3000, 200, 50)).toBe(2); // 6.67% L2, 25% L3
	});
});


describe('countLayer2AndLayer3Characters', () => {
	let maturityCalculator: MaturityCalculator;
	let mockApp: any;

	beforeEach(() => {
		// Mock the app object and metadataCache
		mockApp = {
			metadataCache: {
				getFileCache: jest.fn(),
			},
			workspace: {
				getActiveFile: jest.fn(),
				getActiveViewOfType: jest.fn()
			},
			fileManager: {
				processFrontMatter: jest.fn()
			}
		};
		maturityCalculator = new MaturityCalculator(mockApp);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});
	test('should return correct counts for empty content', () => {
		const content = "";
		const filename = "file";
		const layer2 = "==";
		const layer3 = "**";
		const result = maturityCalculator.countLayer2AndLayer3Characters(content, filename, layer2, layer3);
		const expectedResult = { charCount: 0, highlightedCount: 0, boldCount: 0 };

		expect(result).toEqual(expectedResult);
	});

	test('should return correct counts for content without markdown formatting', () => {
		const content = "This is a simple text with no formatting.";
		const filename = "file";
		const layer2 = "==";
		const layer3 = "**";
		const result = maturityCalculator.countLayer2AndLayer3Characters(content, filename, layer2, layer3);
		const expectedResult = { charCount: 41, highlightedCount: 0, boldCount: 0 };

		expect(result).toEqual(expectedResult);
	});

	test('should return correct counts for content with headings matching filename', () => {
		const content = "# file\nThis is a test.";
		const filename = "file";
		const layer2 = "==";
		const layer3 = "**";
		const result = maturityCalculator.countLayer2AndLayer3Characters(content, filename, layer2, layer3);
		const expectedResult = { charCount: 15, highlightedCount: 0, boldCount: 0 };

		expect(result).toEqual(expectedResult);
	});

	test('should return correct counts for content with metadata blocks', () => {
		const content = "---\nmetadata: value\n---\nContent without metadata.";
		const filename = "file";
		const layer2 = "==";
		const layer3 = "**";
		const result = maturityCalculator.countLayer2AndLayer3Characters(content, filename, layer2, layer3);
		const expectedResult = { charCount: 25, highlightedCount: 0, boldCount: 0 };

		expect(result).toEqual(expectedResult);
	});

	test('should return correct counts for content with hashtags', () => {
		const content = "This is a test #hashtag.";
		const filename = "file";
		const layer2 = "==";
		const layer3 = "**";
		const result = maturityCalculator.countLayer2AndLayer3Characters(content, filename, layer2, layer3);
		const expectedResult = { charCount: 15, highlightedCount: 0, boldCount: 0 };

		expect(result).toEqual(expectedResult);
	});

	test('should return correct counts for content with links', () => {
		const content = "This is a [link](http://example.com).";
		const filename = "file";
		const layer2 = "==";
		const layer3 = "**";
		const result = maturityCalculator.countLayer2AndLayer3Characters(content, filename, layer2, layer3);
		const expectedResult = { charCount: 11, highlightedCount: 0, boldCount: 0 };

		expect(result).toEqual(expectedResult);
	});

	test('should return correct counts for content with blank newlines', () => {
		const content = "Line 1\n\nLine 2\n\n\nLine 3\n";
		const filename = "file";
		const layer2 = "==";
		const layer3 = "**";
		const result = maturityCalculator.countLayer2AndLayer3Characters(content, filename, layer2, layer3);
		const expectedResult = { charCount: 20, highlightedCount: 0, boldCount: 0 };

		expect(result).toEqual(expectedResult);
	});

	test('should return correct counts for content with overlapping highlight and bold markers', () => {
		const content = "==This is **bold** and highlighted==.";
		const filename = "file";
		const layer2 = "==";
		const layer3 = "**";
		const result = maturityCalculator.countLayer2AndLayer3Characters(content, filename, layer2, layer3);
		const expectedResult = { charCount: 33, highlightedCount: 32, boldCount: 4 };

		expect(result).toEqual(expectedResult);
	});

	test('should return correct counts for given example content', () => {
		const content= "---\n" +
			"initDate: 02.12.23\n" +
			"title-class: 0➡️\n" +
			"note-length-class: 0➡️\n" +
			"inlink-class: 0➡️\n" +
			"outlink-class: 0➡️\n" +
			"progressive-summarization-maturity: 4➡️\n" +
			"note-maturity: 1➡️\n" +
			"---\n" +
			"#inbox\n" +
			"\n" +
			"\n" +
			"# Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt\n" +
			"\n" +
			"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   \n" +
			"\n" +
			"==Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et **accumsan et iusto odio** dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh eu dolore magna aliquam erat volutpat.==   \n" +
			"\n" +
			"Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.   \n" +
			"\n" +
			"Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.   \n" +
			"\n" +
			"Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.   \n" +
			"\n" +
			"==At vero **eos** et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, **consetetur** sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.== At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur"
		const filename = "progressive summarization"
		const layer2 = "=="
		const layer3 = "**"
		const result = maturityCalculator.countLayer2AndLayer3Characters(content, filename, layer2, layer3);
		const expectedResult = { charCount: 3098, highlightedCount: 696, boldCount: 35 };

		expect(result).toEqual(expectedResult);
	});
});



describe('rateLevelOfMaturity', () => {
	let maturityCalculator: MaturityCalculator;
	let mockApp: any;

	beforeEach(() => {
		// Mock the app object and metadataCache
		mockApp = {
			metadataCache: {
				getFileCache: jest.fn(),
			},
			workspace: {
				getActiveFile: jest.fn(),
				getActiveViewOfType: jest.fn()
			},
			fileManager: {
				processFrontMatter: jest.fn()
			}
		};
		maturityCalculator = new MaturityCalculator(mockApp);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	// Test cases for noteLength >= progressiveSumMajurity
	test('maturity 0', () => {
		const result = maturityCalculator.rateLevelOfMaturity(0, 0, 0, 0, 0);
		const expectedResult = 0;
		expect(result).toEqual(expectedResult);
	});
	test('maturity 1 with noteLength and totalWeight', () => {
		const result = maturityCalculator.rateLevelOfMaturity(1, 1, 1, 1, 0);
		const expectedResult = 1;
		expect(result).toEqual(expectedResult);
	});
	test('maturity 2 with noteLength and totalWeight', () => {
		const result = maturityCalculator.rateLevelOfMaturity(2, 2, 2, 2, 0);
		const expectedResult = 2;
		expect(result).toEqual(expectedResult);
	});
	test('maturity 3 with noteLength and totalWeight', () => {
		const result = maturityCalculator.rateLevelOfMaturity(3, 3, 3, 3, 0);
		const expectedResult = 3;
		expect(result).toEqual(expectedResult);
	});
	test('maturity 4 with noteLength and totalWeight', () => {
		const result = maturityCalculator.rateLevelOfMaturity(4, 4, 4, 4, 0);
		const expectedResult = 4;
		expect(result).toEqual(expectedResult);
	});
	test('maturity 5 with noteLength and totalWeight', () => {
		const result = maturityCalculator.rateLevelOfMaturity(5, 5, 5, 5, 0);
		const expectedResult = 5;
		expect(result).toEqual(expectedResult);
	});

	// Test cases for noteLength < progressiveSumMajurity
	test('maturity 1 when using progressiveSumMajurity', () => {
		const result = maturityCalculator.rateLevelOfMaturity(0, 1, 1, 1, 2);
		const expectedResult = 1;
		expect(result).toEqual(expectedResult);
	});
	test('maturity 2 when using progressiveSumMajurity', () => {
		const result = maturityCalculator.rateLevelOfMaturity(0, 2, 2, 2, 3);
		const expectedResult = 2;
		expect(result).toEqual(expectedResult);
	});
	test('maturity 3 when using progressiveSumMajurity', () => {
		const result = maturityCalculator.rateLevelOfMaturity(0, 3, 3, 3, 4);
		const expectedResult = 3;
		expect(result).toEqual(expectedResult);
	});
	test('maturity 4 when using progressiveSumMajurity', () => {
		const result = maturityCalculator.rateLevelOfMaturity(0, 4, 4, 4, 5);
		const expectedResult = 4;
		expect(result).toEqual(expectedResult);
	});
	test('maturity 5 when using progressiveSumMajurity', () => {
		const result = maturityCalculator.rateLevelOfMaturity(0, 5, 5, 5, 5);
		const expectedResult = 5;
		expect(result).toEqual(expectedResult);
	});

	// Edge cases
	test('maturity 0 with averageWeight < 0.5', () => {
		const result = maturityCalculator.rateLevelOfMaturity(0, 0, 0, 0, 0);
		const expectedResult = 0;
		expect(result).toEqual(expectedResult);
	});
	test('maturity 1 with averageWeight == 1', () => {
		const result = maturityCalculator.rateLevelOfMaturity(1, 1, 1, 1, 1);
		const expectedResult = 1;
		expect(result).toEqual(expectedResult);
	});
	test('maturity 2 with averageWeight == 2', () => {
		const result = maturityCalculator.rateLevelOfMaturity(2, 2, 2, 2, 2);
		const expectedResult = 2;
		expect(result).toEqual(expectedResult);
	});
	test('maturity 3 with averageWeight == 3', () => {
		const result = maturityCalculator.rateLevelOfMaturity(3, 3, 3, 3, 3);
		const expectedResult = 3;
		expect(result).toEqual(expectedResult);
	});
	test('maturity 4 with averageWeight == 3.5', () => {
		const result = maturityCalculator.rateLevelOfMaturity(4, 4, 4, 4, 0);
		const expectedResult = 4;
		expect(result).toEqual(expectedResult);
	});
	test('maturity 5 with averageWeight == 4', () => {
		const result = maturityCalculator.rateLevelOfMaturity(5, 5, 5, 5, 0);
		const expectedResult = 5;
		expect(result).toEqual(expectedResult);
	});

	// Ensure the function does not unexpectedly fall into the else clause
	test('ensure no else clause hit', () => {
		const result = maturityCalculator.rateLevelOfMaturity(5, 5, 5, 5, 5);
		const expectedResult = 5; // As averageWeight = (5+5+5+5+5)/5 = 5
		expect(result).toEqual(expectedResult);

	});
	test('ensure no else clause hit', () => {
		const result = maturityCalculator.rateLevelOfMaturity(10, 10, 10, 10, 10);
		const expectedResult = 0; // As averageWeight = (10+10+10+10+10)/5 = 10
		expect(result).toEqual(expectedResult);

	});
});

describe('rateInlinks', () => {
	let maturityCalculator: MaturityCalculator;
	let mockApp: any;

	beforeEach(() => {
		// Mock the app object and metadataCache
		mockApp = {
			metadataCache: {
				getFileCache: jest.fn(),
			},
			workspace: {
				getActiveFile: jest.fn(),
				getActiveViewOfType: jest.fn()
			},
			fileManager: {
				processFrontMatter: jest.fn()
			}
		};
		maturityCalculator = new MaturityCalculator(mockApp);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	test('returns 0 when numInlinks is 0', () => {
		const result = maturityCalculator.rateInlinks(0);
		const expectedResult = 0;
		expect(result).toEqual(expectedResult);
	});

	test('returns 1 when numInlinks is between 1 and 3', () => {
		expect(maturityCalculator.rateInlinks(1)).toEqual(1);
		expect(maturityCalculator.rateInlinks(2)).toEqual(1);
		expect(maturityCalculator.rateInlinks(3)).toEqual(1);
	});

	test('returns 2 when numInlinks is between 4 and 7', () => {
		expect(maturityCalculator.rateInlinks(4)).toEqual(2);
		expect(maturityCalculator.rateInlinks(5)).toEqual(2);
		expect(maturityCalculator.rateInlinks(6)).toEqual(2);
		expect(maturityCalculator.rateInlinks(7)).toEqual(2);
	});

	test('returns 3 when numInlinks is between 8 and 10', () => {
		expect(maturityCalculator.rateInlinks(8)).toEqual(3);
		expect(maturityCalculator.rateInlinks(9)).toEqual(3);
		expect(maturityCalculator.rateInlinks(10)).toEqual(3);
	});

	test('returns 4 when numInlinks is between 11 and 15', () => {
		expect(maturityCalculator.rateInlinks(11)).toEqual(4);
		expect(maturityCalculator.rateInlinks(12)).toEqual(4);
		expect(maturityCalculator.rateInlinks(13)).toEqual(4);
		expect(maturityCalculator.rateInlinks(14)).toEqual(4);
		expect(maturityCalculator.rateInlinks(15)).toEqual(4);
	});

	test('returns 5 when numInlinks is between 16 and 499', () => {
		expect(maturityCalculator.rateInlinks(16)).toEqual(5);
		expect(maturityCalculator.rateInlinks(100)).toEqual(5);
		expect(maturityCalculator.rateInlinks(499)).toEqual(5);
	});

	test('returns 0 when numInlinks is 500 or more', () => {
		expect(maturityCalculator.rateInlinks(500)).toEqual(0);
		expect(maturityCalculator.rateInlinks(1000)).toEqual(0);
	});
});


describe('rateOutlinks', () => {
	let maturityCalculator: MaturityCalculator;
	let mockApp: any;

	beforeEach(() => {
		// Mock the app object and metadataCache
		mockApp = {
			metadataCache: {
				getFileCache: jest.fn(),
			},
			workspace: {
				getActiveFile: jest.fn(),
				getActiveViewOfType: jest.fn()
			},
			fileManager: {
				processFrontMatter: jest.fn()
			}
		};
		maturityCalculator = new MaturityCalculator(mockApp);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	test('rate 0', () => {
		const progSumRate= maturityCalculator.rateOutlinks(0);
		const expectedResult = 0;
		expect(progSumRate).toEqual(expectedResult);
	});
	test('rate 0', () => {
		const progSumRate= maturityCalculator.rateOutlinks(1);
		const expectedResult = 0;
		expect(progSumRate).toEqual(expectedResult);
	});
	test('rate 1', () => {
		const progSumRate= maturityCalculator.rateOutlinks(2);
		const expectedResult = 1;
		expect(progSumRate).toEqual(expectedResult);
	});
	test('rate 4', () => {
		const progSumRate= maturityCalculator.rateOutlinks(3);
		const expectedResult = 4;
		expect(progSumRate).toEqual(expectedResult);
	});
	test('rate 4', () => {
		const progSumRate= maturityCalculator.rateOutlinks(4);
		const expectedResult = 4;
		expect(progSumRate).toEqual(expectedResult);
	});
	test('rate 5', () => {
		const progSumRate= maturityCalculator.rateOutlinks(5);
		const expectedResult = 5;
		expect(progSumRate).toEqual(expectedResult);
	});
	test('rate 5', () => {
		const progSumRate= maturityCalculator.rateOutlinks(8);
		const expectedResult = 5;
		expect(progSumRate).toEqual(expectedResult);
	});
	test('rate 3', () => {
		const progSumRate= maturityCalculator.rateOutlinks(9);
		const expectedResult = 3;
		expect(progSumRate).toEqual(expectedResult);
	});
	test('rate 3', () => {
		const progSumRate= maturityCalculator.rateOutlinks(10);
		const expectedResult = 3;
		expect(progSumRate).toEqual(expectedResult);
	});
	test('rate 1', () => {
		const progSumRate= maturityCalculator.rateOutlinks(11);
		const expectedResult = 1;
		expect(progSumRate).toEqual(expectedResult);
	});
	test('rate 0', () => {
		const progSumRate= maturityCalculator.rateOutlinks(12);
		const expectedResult = 0;
		expect(progSumRate).toEqual(expectedResult);
	});
	test('rate 0', () => {
		const progSumRate= maturityCalculator.rateOutlinks(20);
		const expectedResult = 0;
		expect(progSumRate).toEqual(expectedResult);
	});
});

describe('rateDirection', () => {
	let maturityCalculator: MaturityCalculator;
	let mockApp: any;

	beforeEach(() => {
		// Mock the app object and metadataCache
		mockApp = {
			metadataCache: {
				getFileCache: jest.fn(),
			},
			workspace: {
				getActiveFile: jest.fn(),
				getActiveViewOfType: jest.fn()
			},
			fileManager: {
				processFrontMatter: jest.fn()
			}
		};
		maturityCalculator = new MaturityCalculator(mockApp);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	test('same rating with direction', () => {
		const result = maturityCalculator.rateDirection('1➡️', 1);
		const expectedResult = '1➡️';
		expect(result).toEqual(expectedResult);
	});

	test('same rating without direction', () => {
		const result = maturityCalculator.rateDirection('1', 1);
		const expectedResult = '1➡️';
		expect(result).toEqual(expectedResult);
	});

	test('lower rating with current direction', () => {
		const result = maturityCalculator.rateDirection('2⬆️', 1);
		const expectedResult = '1⬇️';
		expect(result).toEqual(expectedResult);
	});

	test('lower rating without direction', () => {
		const result = maturityCalculator.rateDirection('2', 1);
		const expectedResult = '1⬇️';
		expect(result).toEqual(expectedResult);
	});

	test('higher rating with current direction', () => {
		const result = maturityCalculator.rateDirection('0⬇️', 1);
		const expectedResult = '1⬆️';
		expect(result).toEqual(expectedResult);
	});

	test('higher rating without direction', () => {
		const result = maturityCalculator.rateDirection('0', 1);
		const expectedResult = '1⬆️';
		expect(result).toEqual(expectedResult);
	});

	test('default else condition (unexpected)', () => {
		// This case is theoretically unreachable with the current code logic,
		// but let's handle it for robustness.
		const result = maturityCalculator.rateDirection('NaN', 1);
		const expectedResult = '1';
		expect(result).toEqual(expectedResult);
	});
});


describe('rateLengthFilename', () => {
	let maturityCalculator: MaturityCalculator;
	let mockApp: any;

	beforeEach(() => {
		// Mock the app object and metadataCache
		mockApp = {
			metadataCache: {
				getFileCache: jest.fn(),
			},
			workspace: {
				getActiveFile: jest.fn(),
				getActiveViewOfType: jest.fn()
			},
			fileManager: {
				processFrontMatter: jest.fn()
			}
		};
		maturityCalculator = new MaturityCalculator(mockApp);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	test('rating 0', () => {
		const result= maturityCalculator.rateLengthFilename('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
		const expectedResult = 0;
		expect(result).toEqual(expectedResult);
	});
	test('rating 1', () => {
		const result= maturityCalculator.rateLengthFilename('aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
		const expectedResult = 1;
		expect(result).toEqual(expectedResult);
	});
	test('rating 3', () => {
		const result= maturityCalculator.rateLengthFilename('aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa');
		const expectedResult = 3;
		expect(result).toEqual(expectedResult);
	});
	test('rating 5', () => {
		const result= maturityCalculator.rateLengthFilename('aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
		const expectedResult = 5;
		expect(result).toEqual(expectedResult);
	});
	test('rating 4', () => {
		const result= maturityCalculator.rateLengthFilename('aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
		const expectedResult = 4;
		expect(result).toEqual(expectedResult);
	});
	test('rating 2', () => {
		const result= maturityCalculator.rateLengthFilename('aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa');
		const expectedResult = 2;
		expect(result).toEqual(expectedResult);
	});
	test('rating 1', () => {
		const result= maturityCalculator.rateLengthFilename('aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa Aaaaaaaa');
		const expectedResult = 1;
		expect(result).toEqual(expectedResult);
	});
	test('rating 0', () => {
		const result= maturityCalculator.rateLengthFilename('aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa Aaaaaaaaa');
		const expectedResult = 0;
		expect(result).toEqual(expectedResult);
	});
	test('rating 0', () => {
		const result= maturityCalculator.rateLengthFilename('aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa Aaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa Aaaaaaaaa');
		const expectedResult = 0;
		expect(result).toEqual(expectedResult);
	});
});


describe('rateNoteLength', () => {
	let maturityCalculator: MaturityCalculator;
	let mockApp: any;

	beforeEach(() => {
		// Mock the app object and metadataCache
		mockApp = {
			metadataCache: {
				getFileCache: jest.fn(),
			},
			workspace: {
				getActiveFile: jest.fn(),
				getActiveViewOfType: jest.fn()
			},
			fileManager: {
				processFrontMatter: jest.fn()
			}
		};
		maturityCalculator = new MaturityCalculator(mockApp);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});
	test('rate 0', () => {
		const result= maturityCalculator.rateNoteLength(199);
		const expectedResult = 0;
		expect(result).toEqual(expectedResult);
	});
	test('rate 4', () => {
		const result= maturityCalculator.rateNoteLength(549);
		const expectedResult = 4;
		expect(result).toEqual(expectedResult);
	});
	test('rate 5', () => {
		const result= maturityCalculator.rateNoteLength(999);
		const expectedResult = 5;
		expect(result).toEqual(expectedResult);
	});
	test('rate 4', () => {
		const result= maturityCalculator.rateNoteLength(1199);
		const expectedResult = 4;
		expect(result).toEqual(expectedResult);
	});
	test('rate 3', () => {
		const result= maturityCalculator.rateNoteLength(1999);
		const expectedResult = 3;
		expect(result).toEqual(expectedResult);
	});
	test('rate 2', () => {
		const result= maturityCalculator.rateNoteLength(2499);
		const expectedResult = 2;
		expect(result).toEqual(expectedResult);
	});
	test('rate 1', () => {
		const result= maturityCalculator.rateNoteLength(2999);
		const expectedResult = 1;
		expect(result).toEqual(expectedResult);
	});
	test('rate 0', () => {
		const result= maturityCalculator.rateNoteLength(3000);
		const expectedResult = 0;
		expect(result).toEqual(expectedResult);
	});
	test('rate 0', () => {
		const result= maturityCalculator.rateNoteLength(5000);
		const expectedResult = 0;
		expect(result).toEqual(expectedResult);
	});
});


describe('countCharactersInActiveFile', () => {
	let maturityCalculator: MaturityCalculator;
	let mockApp: any;

	beforeEach(() => {
		// Mock the app object and metadataCache
		mockApp = {
			metadataCache: {
				getFileCache: jest.fn(),
			},
			workspace: {
				getActiveFile: jest.fn(),
				getActiveViewOfType: jest.fn()
			},
			fileManager: {
				processFrontMatter: jest.fn()
			}
		};
		maturityCalculator = new MaturityCalculator(mockApp);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	test('test description', () => {
		const content= "---\n" +
			"initDate: 02.12.23\n" +
			"title-class: 0➡️\n" +
			"note-length-class: 0➡️\n" +
			"inlink-class: 0➡️\n" +
			"outlink-class: 0➡️\n" +
			"progressive-summarization-maturity: 4➡️\n" +
			"note-maturity: 1➡️\n" +
			"---\n" +
			"#inbox\n" +
			"\n" +
			"\n" +
			"# Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt\n" +
			"\n" +
			"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   \n" +
			"\n" +
			"==Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et **accumsan et iusto odio** dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.==   \n" +
			"\n" +
			"Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.   \n" +
			"\n" +
			"Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.   \n" +
			"\n" +
			"Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.   \n" +
			"\n" +
			"==At vero **eos** et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, **consetetur** sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.== At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur"
		const filename = "progressive summarization"
		const result= maturityCalculator.countCharactersInActiveFile(content,filename);
		const expectedResult = 3124;
		expect(result).toEqual(expectedResult);
	});
});



jest.mock('../src/maturitycalculation.ts', () => ({
	...jest.requireActual('../src/maturitycalculation.ts'),
	count_inlinks: jest.fn(),
}));

/*
describe('count_inlinks2', () => {
	test('returns the correct count of inlinks', async () => {
		const mockFile = {
			path: '/path/to/target_file_name.md',
		};

		const mockApp = {
			metadataCache: {
				resolvedLinks: {
					[mockFile.path]: {
						'/path/to/linking_file_1.md': 1,
						'/path/to/linking_file_2.md': 2,
					},
				},
			},
		};

		const mockContext = {
			app: mockApp,
		};

		const inlinkCount = await count_inlinks.call(mockContext, mockFile);

		expect(inlinkCount).toBe(3);
	});
	test('returns the correct count of inlinks', async () => {
		const mockFile = {
			path: '/path/to/target_file_name.md',
		};

		// Set up the mock context for count_inlinks
		const mockContext = {
			app: new App(), // You might need to create a more complete mock of the App object if necessary
		};

		// Log the actual resolved links data during the test
		console.log('Actual Resolved Links Data:', mockContext.app.metadataCache.resolvedLinks);

		// Call the count_inlinks function with the mock context and file
		const inlinkCount = await count_inlinks.call(mockContext, mockFile);

		// Assert the expected count based on the mocked data
		expect(inlinkCount).toBe(3);
	});


	const mockTFile = jest.fn<TFile, [basename?: string, extension?: string]>(
		(basename = 'target_file_name', extension = 'md') => {
			const name = `${basename}.${extension}`;

			return mock<TFile>({
				path: `/path/to/${name}`,
				basename,
				extension,
				name,
			});
		},
	);

	test('returns the correct count of inlinks', async () => {
		const mockFile = mockTFile(); // Using the mockTFile function to create a mock TFile

		const mockApp = {
			metadataCache: {
				resolvedLinks: {
					[mockFile.path]: {
						'/path/to/linking_file_1.md': 1,
						'/path/to/linking_file_2.md': 2,
					},
				},
			},
		};

		const mockContext = {
			app: mockApp,
		};

		const inlinkCount = await count_inlinks.call(mockContext, mockFile);

		expect(inlinkCount).toBe(3);
	});


});
*/


describe('getNumberOfOutlinks', () => {
	let maturityCalculator: MaturityCalculator;
	let mockApp: any;

	beforeEach(() => {
		// Mock the app object and metadataCache
		mockApp = {
			metadataCache: {
				getFileCache: jest.fn(),
			},
			workspace: {
				getActiveFile: jest.fn(),
				getActiveViewOfType: jest.fn()
			},
			fileManager: {
				processFrontMatter: jest.fn()
			}
		};
		maturityCalculator = new MaturityCalculator(mockApp);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	test('should return 0 if activeFile is null', () => {
		// Assuming TFile cannot be null, this might need adjustment in the function itself
		const result = maturityCalculator.getNumberOfOutlinks(null as unknown as TFile);
		expect(result).toBe(0);
	});

	test('should return 0 if activeFile has no links', () => {
		const activeFile: TFile = {} as TFile;
		mockApp.metadataCache.getFileCache.mockReturnValue(null);
		const result = maturityCalculator.getNumberOfOutlinks(activeFile, mockApp);
		expect(result).toBe(0);
		expect(mockApp.metadataCache.getFileCache).toHaveBeenCalledWith(activeFile);
	});

	test('should return the number of links if activeFile has links', () => {
		const activeFile: TFile = {} as TFile; // mock TFile object
		const links = { link1: {}, link2: {} }; // mock links object
		mockApp.metadataCache.getFileCache.mockReturnValue({ links });
		const result = maturityCalculator.getNumberOfOutlinks(activeFile);
		expect(result).toBe(2);
		expect(mockApp.metadataCache.getFileCache).toHaveBeenCalledWith(activeFile);
	});

	test('should return 0 if inlinks is undefined', () => {
		const activeFile: TFile = {} as TFile; // mock TFile object
		mockApp.metadataCache.getFileCache.mockReturnValue({ links: undefined });
		const result = maturityCalculator.getNumberOfOutlinks(activeFile);
		expect(result).toBe(0);
		expect(mockApp.metadataCache.getFileCache).toHaveBeenCalledWith(activeFile);
	});
});




