import {findEarliestCreatedFile, findEarliestModifiedFile, findEarliestDateFile, monthsBetween, getCreationDates, getModificationDates, createChartFormat, replaceChartContent} from './creatmodchartcalculation'
import { describe, test } from 'node:test';
import { MockProxy, mock, mockDeep, DeepMockProxy } from 'jest-mock-extended';
//import { App, TFile } from 'obsidian';
import { App } from 'obsidian';

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

