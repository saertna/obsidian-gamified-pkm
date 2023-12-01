import {getLevelForPoints, statusPointsForLevel} from '../src/levels'
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


describe('getLevelForPoints', () => {
    it('should return 1 (level) if points are 0', () => {
        const actual = getLevelForPoints(0);
        const expected = { points: 0, level: 1, pointsNext: 1000 };
        expect(actual).toStrictEqual(expected);
    });

    it('should return 1 (level) if points are 1', () => {
        const actual = getLevelForPoints(1);
        const expected = { points: 0, level: 1, pointsNext: 1000 };
        expect(actual).toStrictEqual(expected);
    });

    it('should return 49 (level) if points are 16920000', () => {
        const actual = getLevelForPoints(16920000);
        const expected = { points: 16920000, level: 49, pointsNext: 17750000 };
        expect(actual).toStrictEqual(expected);
    });

    it('should return 49 (level) if points are 17020000', () => {
        const actual = getLevelForPoints(17020000);
        const expected = { points: 16920000, level: 49, pointsNext: 17750000 };
        expect(actual).toStrictEqual(expected);
    });

    it('should return 49 (level) if points are 17749999', () => {
        const actual = getLevelForPoints(17749999);
        const expected = { points: 16920000, level: 49, pointsNext: 17750000 };
        expect(actual).toStrictEqual(expected);
    });

    it('should return 110 (level) if points are 104150000', () => {
        const actual = getLevelForPoints(104150000);
        const expected = { points: 104150000, level: 110, pointsNext: 106150000 };
        expect(actual).toStrictEqual(expected);
    });
});
