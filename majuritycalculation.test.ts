import {rateProgressiveSummarization, countLayer2AndLayer3Characters, rateLevelOfMaturity, rateOutlinks, rateInlinks, rateDirection, rateLengthFilename, rateNoteLength, getNumberOfOutlinks, countCharactersInActiveFile, count_inlinks_single, count_inlinks, getFileCountMap, getFileMap} from './majuritycalculation'
import { describe, test } from 'node:test';


describe('rateProgressiveSummarization', () => {
    it('should return 0 nothing is seleced', () => {
    const actual = rateProgressiveSummarization(0,0,0);
    const expected = 0;
    expect(actual).toBe(expected);
    });
    
    it('should return 5 if it is 10% each stage and enough characters', () => {
    const actual = rateProgressiveSummarization(3500,34,3);
    const expected = 5;
    expect(actual).toBe(expected);
    });
    
    it('should return 0 if to much is selected', () => {
    const actual = rateProgressiveSummarization(3000,2500,2000);
    const expected = 0;
    expect(actual).toBe(expected);
    });
    });
