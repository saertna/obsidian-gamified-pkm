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
import {TFile} from "obsidian";

describe('rateProgressiveSummarization', () => {
	test('test description', () => {
        const progSumRate= rateProgressiveSummarization(3003,200,20);
        const expectedResult = 5;

        expect(progSumRate).toEqual(expectedResult);
	});
});






jest.mock('../src/maturitycalculation.ts', () => ({
	...jest.requireActual('../src/maturitycalculation.ts'),
	count_inlinks: jest.fn(),
}));

describe('count_inlinks2', () => {
	test('returns the correct count of inlinks', async () => {
		// Mock the necessary objects or functions used within count_inlinks
		const mockApp = {
			metadataCache: {
				resolvedLinks: {
					'/path/to/your_target_file_name.md': {
						'/path/to/linking_file_1.md': 1,
						'/path/to/linking_file_2.md': 2,
					},
				},
			},
		};

		// Mock the TFile object with relevant data
		const mockFile = {
			path: '/path/to/your_target_file_name.md',
		};

		// Set up the mock context for count_inlinks
		const mockContext = {
			app: mockApp,
		};

		// Call the count_inlinks function with the mock context and file
		const inlinkCount = await count_inlinks.call(mockContext, mockFile);

		// Assert the expected count based on the mocked data
		expect(inlinkCount).toBe(3); // Adjust the expected count based on your mock data

		// Verify that count_inlinks was called with the correct arguments
		expect((count_inlinks as jest.Mock).mock.calls[0]).toEqual([mockFile]);
	});
});







