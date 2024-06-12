import {findEarliestCreatedFile, findEarliestModifiedFile, findEarliestDateFile, monthsBetween, getCreationDates, getModificationDates, createChartFormat, replaceChartContent} from '../src/creatmodchartcalculation'
import { describe } from 'node:test';


// Mock data
interface MockFile {
	stat: {
		ctime: number;
		mtime: number;
	};
}

const files: MockFile[] = [
	{ stat: { ctime: 1625234672000 , mtime: 1625234672000 } }, // File created on July 2, 2021
	{ stat: { ctime: 1625233672000 , mtime: 1625233672000 } }, // File created on July 2, 2021 (earliest)
	{ stat: { ctime: 1625235672000 , mtime: 1625235672000 } }, // File created on July 2, 2021
];

describe('findEarliestCreatedFile', () => {
	it('should return the file with the earliest creation time', () => {
		const result = findEarliestCreatedFile(files);
		expect(result).toEqual(files[1]);
	});

	it('should handle an empty array', () => {
		const result = findEarliestCreatedFile([]);
		expect(result).toBeUndefined();
	});

	it('should handle a single element array', () => {
		const singleFile = [files[0]];
		const result = findEarliestCreatedFile(singleFile);
		expect(result).toEqual(files[0]);
	});
});

describe('findEarliestModifiedFile', () => {
	it('should return the file with the earliest modification time', () => {
		const result = findEarliestModifiedFile(files);
		expect(result).toEqual(files[1]);
	});

	it('should handle an empty array', () => {
		const result = findEarliestModifiedFile([]);
		expect(result).toBeUndefined();
	});

	it('should handle a single element array', () => {
		const singleFile = [files[0]];
		const result = findEarliestModifiedFile(singleFile);
		expect(result).toEqual(files[0]);
	});
});

describe('findEarliestDateFile', () => {
	it('should return the file with the earliest date for creation or modification time', () => {
		const result = findEarliestDateFile(files);
		expect(result).toEqual(files[1]);
	});

	it('should handle an empty array', () => {
		const result = findEarliestDateFile([]);
		expect(result).toBeUndefined();
	});

	it('should handle a single element array', () => {
		const singleFile = [files[0]];
		const result = findEarliestDateFile(singleFile);
		expect(result).toEqual(files[0]);
	});
});

describe('monthsBetween', () => {
  it('should return how many month are between March 22 and July 23', () => {
  const actual = monthsBetween(new Date(2022,3), new Date(2023,6));
  const expected = 16
  expect(actual).toStrictEqual(expected);
  });
  
  it('should return how many month are between March 22 and June 22', () => {
    const actual = monthsBetween(new Date(2022,3), new Date(2022,6));
    const expected = 4
    expect(actual).toStrictEqual(expected);
  });
  
  it('should return how many month are between March 22 and January 22', () => {
    const actual = monthsBetween(new Date(2022,3), new Date(2022,1));
    const expected = -1
    expect(actual).toStrictEqual(expected);
    });
});


describe('getCreationDates', () => {
	it('should return an array of creation dates', () => {
		const result = getCreationDates(files);
		expect(result).toEqual([
			new Date(1625234672000),
			new Date(1625233672000),
			new Date(1625235672000)
		]);
	});

	it('should handle an empty array', () => {
		const result = getCreationDates([]);
		expect(result).toEqual([]);
	});

	it('should handle a single element array', () => {
		const singleFile = [files[0]];
		const result = getCreationDates(singleFile);
		expect(result).toEqual([new Date(1625234672000)]);
	});
});

describe('getModificationDates', () => {
	it('should return an array of modification dates', () => {
		const result = getModificationDates(files);
		expect(result).toEqual([
			new Date(1625234672000),
			new Date(1625233672000),
			new Date(1625235672000)
		]);
	});

	it('should handle an empty array', () => {
		const result = getModificationDates([]);
		expect(result).toEqual([]);
	});

	it('should handle a single element array', () => {
		const singleFile = [files[0]];
		const result = getModificationDates(singleFile);
		expect(result).toEqual([new Date(1625234672000)]);
	});
});

describe('createChartFormat', () => {
  it('should return chart full length', () => {
  const actual = createChartFormat("Jan 22, Feb 22, Mar 22, April 22", "0, 1, 2, 3", 0);
  const expected = '```chart\ntype: bar\nlabels: [Jan 22, Feb 22, Mar 22, April 22]\nseries:\n  - title: modified\n    data: [0, 1, 2, 3]\ntension: 0.2\nwidth: 80 %\nlabelColors: false\nfill: false\nbeginAtZero: false\nbestFit: false\nbestFitTitle: undefined\nbestFitNumber: 0\nstacked: true\nyTitle: \"Number of Notes\"\nxTitle: \"Months\"\nxMin: 0\n```'
  expect(actual).toStrictEqual(expected);
  });
  
  it('should return chart with only 2 months visible', () => {
    const actual = createChartFormat("Jan 22, Feb 22, Mar 22, April 22", "0, 1, 2, 3", 2);
    const expected = '```chart\ntype: bar\nlabels: [Jan 22, Feb 22, Mar 22, April 22]\nseries:\n  - title: modified\n    data: [0, 1, 2, 3]\ntension: 0.2\nwidth: 80 %\nlabelColors: false\nfill: false\nbeginAtZero: false\nbestFit: false\nbestFitTitle: undefined\nbestFitNumber: 0\nstacked: true\nyTitle: \"Number of Notes\"\nxTitle: \"Months\"\nxMin: 2\n```'
    expect(actual).toBe(expected);
  });
  
});
