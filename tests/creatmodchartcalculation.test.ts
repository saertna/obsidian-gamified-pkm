import {findEarliestCreatedFile, findEarliestModifiedFile, findEarliestDateFile, monthsBetween, getCreationDates, getModificationDates, createChartFormat, replaceChartContent} from '../src/creatmodchartcalculation'
import { describe, test } from 'node:test';
import { MockProxy, mock, mockDeep, DeepMockProxy } from 'jest-mock-extended';
//import { App, TFile } from 'obsidian';
import { App } from 'obsidian';



/*
export type Vault = {
    name: string;
    path: string;
    adapter: DataAdapter;
    configDir: string;
    getName: string;
    getAbstractFileByPath: string;
    getRoot: string; 
    create: string;
    createBinary: string; 
    createFolder: string;
    read: string;
    cachedRead: string;
    readBinary: string;
    getResourcePath: string;
    delete: string;
    trash: string;
    rename: string;
    modify: string;
    modifyBinary: string; 
    append: string; 
    process: string; 
    copy: string;
    getAllLoadedFiles: string;
    getMarkdownFiles: string;
    getFiles: string;
    on: string;
    off: string; 
    offref: string;
    trigger: string;
    tryTrigger: string;
  };


export type TFile = {
    stat: {
      ctime: number;
      mtime: number;
      size: number;
    };
    basename: string;
    extension: string;
    vault: Vault;
    path: string;
    name: string;
    parent: null;
  };
*/

/*
test('test', () => {
  const tfileArrayMock: MockProxy<TFile[]> = mock<TFile[]>();
  tfileArrayMock
  // @ts-ignore
  const mockObj: DeepMockProxy<App> = mockDeep<App>();
  global.app = mockObj;
  mockObj.vault.getFiles.mockReturnValue(fakeGetFilesResponse);
  expect(labTest1()).toEqual(fakeGetFilesResponse);
});
*/
/*
export type DataAdapter = {
  basePath: string;
  files: null;
  getName: string
  exists: string
  stat: string
  list: string
  read: string
  readBinary: string
  write: string
  writeBinary: string
  append: string
  process: string
  getResourcePath: string
  mkdir: string
  trashSystem: string
  trashLocal: string
  rmdir: string
  remove: string
  rename: string
  copy: string
}
*/

/*
const fakeGetFilesResponse: TFile[] = [
  {
      "name": "file1",
      "path": "path1",
      "parent": {
          "name": "folder1",
          "children": [
              {
                  "name": "file2",
                  "path": "path2",
                  "vault": {name: 'my-vault',path: '/path/to/vault',adapter: '', configDir:'', getName:'', getAbstractFileByPath:'',getRoot: '', create: '',createBinary: '',createFolder: '',read:'',cachedRead: '',readBinary: '',getResourcePath: '',delete: '',trash: '',rename: '',modify: '',modifyBinary: '',append: '',process: '',copy: '',getAllLoadedFiles: '',getMarkdownFiles: '',getFiles: '',on: '',off: '',offref: '',trigger: '',tryTrigger: '',},
                  //"vault": null
                  "parent": null,
              },
          ],
          "isRoot": () => true,
          "vault": {name: 'my-vault',path: '/path/to/vault',adapter:'', configDir:'', getName:'', getAbstractFileByPath:'',getRoot: '', create: '',createBinary: '',createFolder: '',read:'',cachedRead: '',readBinary: '',getResourcePath: '',delete: '',trash: '',rename: '',modify: '',modifyBinary: '',append: '',process: '',copy: '',getAllLoadedFiles: '',getMarkdownFiles: '',getFiles: '',on: '',off: '',offref: '',trigger: '',tryTrigger: '',},
          //"vault": null
          "path": "path1",
          "parent": null
      },
      "basename": "file1",
      "vault": {name: 'my-vault',path: '/path/to/vault',adapter:'', configDir:'', getName:'', getAbstractFileByPath:'',getRoot: '', create: '',createBinary: '',createFolder: '',read:'',cachedRead: '',readBinary: '',getResourcePath: '',delete: '',trash: '',rename: '',modify: '',modifyBinary: '',append: '',process: '',copy: '',getAllLoadedFiles: '',getMarkdownFiles: '',getFiles: '',on: '',off: '',offref: '',trigger: '',tryTrigger: '',},
      //"vault": null
      "extension": "",
      "stat": {
        "ctime": 1587767000,
        "mtime": 1587767001,
        "size": 100,
      },
  },
  {
      "name": "file2",
      "path": "path2",
      "parent": {
          "name": "folder1",
          "children": [
              {
                  "name": "file2",
                  "path": "path2",
                  "vault": {name: 'my-vault',path: '/path/to/vault',adapter:'', configDir:'', getName:'', getAbstractFileByPath:'',getRoot: '', create: '',createBinary: '',createFolder: '',read:'',cachedRead: '',readBinary: '',getResourcePath: '',delete: '',trash: '',rename: '',modify: '',modifyBinary: '',append: '',process: '',copy: '',getAllLoadedFiles: '',getMarkdownFiles: '',getFiles: '',on: '',off: '',offref: '',trigger: '',tryTrigger: '',},
                  //"vault": null
                  "parent": null,
              },
          ],
          "isRoot": () => true,
          "vault": {name: 'my-vault',path: '/path/to/vault',adapter:'', configDir:'', getName:'', getAbstractFileByPath:'',getRoot: '', create: '',createBinary: '',createFolder: '',read:'',cachedRead: '',readBinary: '',getResourcePath: '',delete: '',trash: '',rename: '',modify: '',modifyBinary: '',append: '',process: '',copy: '',getAllLoadedFiles: '',getMarkdownFiles: '',getFiles: '',on: '',off: '',offref: '',trigger: '',tryTrigger: '',},
          //"vault": null
          "path": "path1",
          "parent": null
      },
      "basename": "file2",
      "vault": {name: 'my-vault',path: '/path/to/vault',adapter:'', configDir:'', getName:'', getAbstractFileByPath:'',getRoot: '', create: '',createBinary: '',createFolder: '',read:'',cachedRead: '',readBinary: '',getResourcePath: '',delete: '',trash: '',rename: '',modify: '',modifyBinary: '',append: '',process: '',copy: '',getAllLoadedFiles: '',getMarkdownFiles: '',getFiles: '',on: '',off: '',offref: '',trigger: '',tryTrigger: '',},
      //"vault": null
      "extension": "",
      "stat": {
        "ctime": 1587767001,
        "mtime": 1587767002,
        "size": 200,
      },
  },
];
*/
/*
const files : TFile[] = [
  {
    stat: {
      ctime: 1587767000,
      mtime: 1587767001,
      size: 100,
    },
    basename: 'file1.md',
    extension: 'md',
    vault: {name: 'my-vault',path: '/path/to/vault',adapter:{basePath:'/path/to/vault', files: null, getName: '', exists: '', stat: '', list: '', readBinary: '', read: '', write: '', writeBinary: '', append: '', process: '', getResourcePath: '', mkdir: '', trashSystem: '', trashLocal: '', rmdir: '', remove: '', rename: '', copy: ''}, configDir:'', getName:'', getAbstractFileByPath:'',getRoot: '',
    create: '',
    createBinary: '',
    createFolder: '',
    read:'',
    cachedRead: '',
    readBinary: '',
    getResourcePath: '',
    delete: '',
    trash: '',
    rename: '',
    modify: '',
    modifyBinary: '',
    append: '',
    process: '',
    copy: '',
    getAllLoadedFiles: '',
    getMarkdownFiles: '',
    getFiles: '',
    on: '',
    off: '',
    offref: '',
    trigger: '',
    tryTrigger: '',},
    path: '/path/to/file1.md',
    name: 'file1.md',
    parent: null,
  },
  {
    stat: {
      ctime: 1587767001,
      mtime: 1587767002,
      size: 200,
    },
    basename: 'file2.md',
    extension: 'md',
    vault: {name: 'my-vault',path: '/path/to/vault',adapter:{basePath:'/path/to/vault', files: null, getName: '', exists: '', stat: '', list: '', readBinary: '', read: '', write: '', writeBinary: '', append: '', process: '', getResourcePath: '', mkdir: '', trashSystem: '', trashLocal: '', rmdir: '', remove: '', rename: '', copy: ''}, configDir:'', getName:'', getAbstractFileByPath:'',getRoot: '',
    create: '',
    createBinary: '',
    createFolder: '',
    read:'',
    cachedRead: '',
    readBinary: '',
    getResourcePath: '',
    delete: '',
    trash: '',
    rename: '',
    modify: '',
    modifyBinary: '',
    append: '',
    process: '',
    copy: '',
    getAllLoadedFiles: '',
    getMarkdownFiles: '',
    getFiles: '',
    on: '',
    off: '',
    offref: '',
    trigger: '',
    tryTrigger: '',},
    path: '/path/to/file2.md',
    name: 'file2.md',
    parent: null,
  },
];
          

describe('findEarliestDateFile Test', () => {
  test('test', () => {
    const tfileArrayMock: MockProxy<TFile[]> = mock<TFile[]>();
    tfileArrayMock
    // @ts-ignore
    const mockObj: DeepMockProxy<App> = mockDeep<App>();
    global.app = mockObj;
    mockObj.vault.getFiles.mockReturnValue(files);
    expect(findEarliestDateFile(files)).toEqual(files[0]);
  });
});
*/

// Mock data
interface MockFile {
	stat: {
		ctime: number;
	};
}

const files: MockFile[] = [
	{ stat: { ctime: 1625234672000 } }, // File created on July 2, 2021
	{ stat: { ctime: 1625233672000 } }, // File created on July 2, 2021 (earliest)
	{ stat: { ctime: 1625235672000 } }, // File created on July 2, 2021
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
