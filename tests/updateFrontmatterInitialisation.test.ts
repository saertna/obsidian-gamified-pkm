import { updateFrontmatterInitialisation } from '../src/updateFrontmatterInitialisation';
import { describe } from 'node:test';


describe('statusPointsForLevel', () => {
    it('should return 0 if the target level is less than 1', () => {
        const actual = updateFrontmatterInitialisation(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        const expected = 0;
        expect(actual).toBe(expected);
    });

});
