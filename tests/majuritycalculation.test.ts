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
} from '../src/majuritycalculation';
import {decryptNumber, encryptNumber} from "../src/encryption";
import {TFile} from "obsidian";

describe('rateProgressiveSummarization', () => {
	test('test description', () => {
        const progSumRate= rateProgressiveSummarization(3003,200,20);
        const expectedResult = 5;

        expect(progSumRate).toEqual(expectedResult);
	});
});



/*describe('count_inlinks', () => {
	test('returns the correct count of inlinks', () => {
		// Mock the necessary objects or functions used within count_inlinks
		const mockApp = {
			metadataCache: {
				resolvedLinks: {
					// Mock the resolvedLinks object with relevant data
					// Replace 'your_target_file_name.md' with the actual target file name
					'/path/to/your_target_file_name.md': {
						// Mock the path to your target file with the count
						'/path/to/linking_file_1.md': 1,
						'/path/to/linking_file_2.md': 2,
						// Add more mock linking files as needed
					},
					// Add more mocked target files if needed
				},
			},
		};

		// Mock the TFile object with relevant data
		/!*const mockFile = {
			path: '/path/to/your_target_file_name.md', // Replace with the actual path
		};*!/
		const mockFileContent = `
# Es erzeugt Motivation wenn die Arbeit sich interessant organisieren lässt

Ich versuche immer die [[}L Arbeit interessant organisieren]] soweit ich es kann. Es ist jedoch weder für mich, noch für meine Mitarbeiter und auch nicht bei allen Jobs möglich. Natürlich sollte es überwiegend so sein, dass die Arbeit interessant ist. Das hängt direkt mit dem Thema [[}L Motivation und Demotivation]] zusammen. Es sollte nach den Prinzipien von dem [[}L Flow Zustand]] allerdings wiederum möglich sein.
`;

		const mockFile: TFile = {
			basename: 'your_target_file_name.md', // Replace with the actual file name
			extension: 'md',
			stat: null, // You can add relevant stat information if needed
			information: null, // You can add relevant information if needed
			isReadonly: false, // Adjust as needed
			isDraft: false, // Adjust as needed
			created: new Date(), // Adjust as needed
			modified: new Date(), // Adjust as needed
			accessed: new Date(), // Adjust as needed
			cache: {
				linkedFiles: [],
				frontmatter: {},
				headings: [],
				outline: [],
			},
			cachedData: null, // You can add relevant cached data if needed
			current: false, // Adjust as needed
			parent: null, // Adjust as needed
			lines: mockFileContent.split('\n'), // Split content into lines
			markdownMode: true, // Adjust as needed
		};

		//export default mockFile;


		// Set up the mock context for count_inlinks
		const mockContext = {
			app: mockApp,
		};

		// Call the count_inlinks function with the mock context and file
		const inlinkCount = count_inlinks.call(mockContext, mockFile);

		// Assert the expected count based on the mocked data
		expect(inlinkCount).toBe(3); // Adjust the expected count based on your mock data
	});

	// Add more test cases for other scenarios...
});*/
