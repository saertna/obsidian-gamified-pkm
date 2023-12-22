import {
	rateProgressiveSummarization,
	countLayer2AndLayer3Characters,
	rateLevelOfMaturity,
	rateOutlinks,
	rateInlinks,
	rateDirection,
	rateLengthFilename,
	rateNoteLength,
	getNumberOfOutlinks,
	countCharactersInActiveFile,
	count_inlinks_single,
	count_inlinks,
	getFileCountMap,
	getFileMap,
} from '../src/maturitycalculation';
import {decryptNumber, encryptNumber} from "../src/encryption";
import { TFile, App, } from 'obsidian';
import { mock, mockFn } from 'jest-mock-extended';

describe('rateProgressiveSummarization', () => {
	test('test description', () => {
        const progSumRate= rateProgressiveSummarization(3003,200,20);
        const expectedResult = 5;
        expect(progSumRate).toEqual(expectedResult);
	});
});

describe('countLayer2AndLayer3Characters', () => {
	test('count how many summarization parts there are', () => {
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
		const layer2 = "=="
		const layer3 = "**"
		const result = countLayer2AndLayer3Characters(content, filename, layer2, layer3);
		const expectedResult = {"boldCount": 35, "charCount": 3124, "highlightedCount": 722}

		expect(result).toEqual(expectedResult);
	});
});


describe('rateLevelOfMaturity', () => {
	test('maturity 0', () => {
		const result= rateLevelOfMaturity(0,0,0,0,0);
		const expectedResult = 0;
		expect(result).toEqual(expectedResult);
	});
	test('maturity 1', () => {
		const result= rateLevelOfMaturity(1,2,1,1,0);
		const expectedResult = 1;
		expect(result).toEqual(expectedResult);
	});
	test('maturity 2', () => {
		const result= rateLevelOfMaturity(2,2,1,1,0);
		const expectedResult = 2;
		expect(result).toEqual(expectedResult);
	});
	test('maturity 3', () => {
		const result= rateLevelOfMaturity(4,3,3,1,0);
		const expectedResult = 3;
		expect(result).toEqual(expectedResult);
	});
	test('maturity 4', () => {
		const result= rateLevelOfMaturity(5,5,4,2,0);
		const expectedResult = 4;
		expect(result).toEqual(expectedResult);
	});
	test('maturity 5', () => {
		const result= rateLevelOfMaturity(5,5,4,4,0);
		const expectedResult = 5;
		expect(result).toEqual(expectedResult);
	});

	// and prog sum in add (is this possible?
	test('maturity 1', () => {
		const result= rateLevelOfMaturity(1,2,1,1,1);
		const expectedResult = 1;
		expect(result).toEqual(expectedResult);
	});

	// prog sum
	test('maturity 1 with prog. sum. 1', () => {
		const result= rateLevelOfMaturity(0,2,1,1,1);
		const expectedResult = 1;
		expect(result).toEqual(expectedResult);
	});
});


describe('rateOutlinks', () => {
	test('rate 0', () => {
		const progSumRate= rateOutlinks(0);
		const expectedResult = 0;
		expect(progSumRate).toEqual(expectedResult);
	});
	test('rate 0', () => {
		const progSumRate= rateOutlinks(1);
		const expectedResult = 0;
		expect(progSumRate).toEqual(expectedResult);
	});
	test('rate 1', () => {
		const progSumRate= rateOutlinks(2);
		const expectedResult = 1;
		expect(progSumRate).toEqual(expectedResult);
	});
	test('rate 4', () => {
		const progSumRate= rateOutlinks(3);
		const expectedResult = 4;
		expect(progSumRate).toEqual(expectedResult);
	});
	test('rate 4', () => {
		const progSumRate= rateOutlinks(4);
		const expectedResult = 4;
		expect(progSumRate).toEqual(expectedResult);
	});
	test('rate 5', () => {
		const progSumRate= rateOutlinks(5);
		const expectedResult = 5;
		expect(progSumRate).toEqual(expectedResult);
	});
	test('rate 5', () => {
		const progSumRate= rateOutlinks(8);
		const expectedResult = 5;
		expect(progSumRate).toEqual(expectedResult);
	});
	test('rate 3', () => {
		const progSumRate= rateOutlinks(9);
		const expectedResult = 3;
		expect(progSumRate).toEqual(expectedResult);
	});
	test('rate 3', () => {
		const progSumRate= rateOutlinks(10);
		const expectedResult = 3;
		expect(progSumRate).toEqual(expectedResult);
	});
	test('rate 1', () => {
		const progSumRate= rateOutlinks(11);
		const expectedResult = 1;
		expect(progSumRate).toEqual(expectedResult);
	});
	test('rate 0', () => {
		const progSumRate= rateOutlinks(12);
		const expectedResult = 0;
		expect(progSumRate).toEqual(expectedResult);
	});
	test('rate 0', () => {
		const progSumRate= rateOutlinks(20);
		const expectedResult = 0;
		expect(progSumRate).toEqual(expectedResult);
	});
});

describe('rateDirection', () => {
	test('same rating', () => {
		const progSumRate= rateDirection('1➡️',1);
		const expectedResult = '1➡️';
		expect(progSumRate).toEqual(expectedResult);
	});
	test('same rating', () => {
		const progSumRate= rateDirection('1',1);
		const expectedResult = '1➡️';
		expect(progSumRate).toEqual(expectedResult);
	});
	test('lower rating', () => {
		const progSumRate= rateDirection('1➡️',1);
		const expectedResult = '1➡️';
		expect(progSumRate).toEqual(expectedResult);
	});
	test('higher rating', () => {
		const progSumRate= rateDirection('2⬇️',1);
		const expectedResult = '1⬇️';
		expect(progSumRate).toEqual(expectedResult);
	});
	test('higher rating', () => {
		const progSumRate= rateDirection('2',1);
		const expectedResult = '1⬇️';
		expect(progSumRate).toEqual(expectedResult);
	});
	test('higher rating', () => {
		const progSumRate= rateDirection('0',1);
		const expectedResult = '1⬆️';
		expect(progSumRate).toEqual(expectedResult);
	});
});


describe('rateLengthFilename', () => {
	test('rating 0', () => {
		const result= rateLengthFilename('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
		const expectedResult = 0;
		expect(result).toEqual(expectedResult);
	});
	test('rating 1', () => {
		const result= rateLengthFilename('aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
		const expectedResult = 1;
		expect(result).toEqual(expectedResult);
	});
	test('rating 3', () => {
		const result= rateLengthFilename('aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa');
		const expectedResult = 3;
		expect(result).toEqual(expectedResult);
	});
	test('rating 5', () => {
		const result= rateLengthFilename('aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
		const expectedResult = 5;
		expect(result).toEqual(expectedResult);
	});
	test('rating 4', () => {
		const result= rateLengthFilename('aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
		const expectedResult = 4;
		expect(result).toEqual(expectedResult);
	});
	test('rating 2', () => {
		const result= rateLengthFilename('aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa');
		const expectedResult = 2;
		expect(result).toEqual(expectedResult);
	});
	test('rating 1', () => {
		const result= rateLengthFilename('aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa Aaaaaaaa');
		const expectedResult = 1;
		expect(result).toEqual(expectedResult);
	});
	test('rating 0', () => {
		const result= rateLengthFilename('aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa Aaaaaaaaa');
		const expectedResult = 0;
		expect(result).toEqual(expectedResult);
	});
	test('rating 0', () => {
		const result= rateLengthFilename('aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa Aaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa Aaaaaaaaa');
		const expectedResult = 0;
		expect(result).toEqual(expectedResult);
	});
});


describe('rateNoteLength', () => {
	test('rate 0', () => {
		const result= rateNoteLength(199);
		const expectedResult = 0;
		expect(result).toEqual(expectedResult);
	});
	test('rate 4', () => {
		const result= rateNoteLength(549);
		const expectedResult = 4;
		expect(result).toEqual(expectedResult);
	});
	test('rate 5', () => {
		const result= rateNoteLength(999);
		const expectedResult = 5;
		expect(result).toEqual(expectedResult);
	});
	test('rate 4', () => {
		const result= rateNoteLength(1199);
		const expectedResult = 4;
		expect(result).toEqual(expectedResult);
	});
	test('rate 3', () => {
		const result= rateNoteLength(1999);
		const expectedResult = 3;
		expect(result).toEqual(expectedResult);
	});
	test('rate 2', () => {
		const result= rateNoteLength(2499);
		const expectedResult = 2;
		expect(result).toEqual(expectedResult);
	});
	test('rate 1', () => {
		const result= rateNoteLength(2999);
		const expectedResult = 1;
		expect(result).toEqual(expectedResult);
	});
	test('rate 0', () => {
		const result= rateNoteLength(3000);
		const expectedResult = 0;
		expect(result).toEqual(expectedResult);
	});
	test('rate 0', () => {
		const result= rateNoteLength(5000);
		const expectedResult = 0;
		expect(result).toEqual(expectedResult);
	});
});


describe('countCharactersInActiveFile', () => {
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
		const result= countCharactersInActiveFile(content,filename);
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






