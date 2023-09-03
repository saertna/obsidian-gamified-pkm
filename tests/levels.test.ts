import {getLevelForPoints, LevelData, statusPointsForLevel} from '../src/levels'
import { describe } from 'node:test';


describe('statusPointsForLevel', () => {
    it('should return 0 if the target level is less than 1', () => {
    const actual = statusPointsForLevel(0);
    const expected = 0;
    expect(actual).toBe(expected);
    });
    
    it('should return the points for the first level that is greater than or equal to the target level', () => {
    const actual = statusPointsForLevel(5);
    const expected = 15000;
    expect(actual).toBe(expected);
    });
    
    it('should return 0 if there is no level that is greater than or equal to the target level', () => {
    const actual = statusPointsForLevel(110);
    const expected = 104150000;
    expect(actual).toBe(expected);
    });
    });
