import { updateFrontmatterInitialisation } from '../src/updateFrontmatterInitialisation';
import { describe } from 'node:test';

const testFrontmatter = {"quelle": 'Meeting bei GKN zur abtestung von Sequenz-Diagrammen', "autor": 'Herr X', "title-class": '1➡️', "note-length-class": '4➡️', "inlink-class": '0', "outlink-class": '0', "progressive-sumarization-maturity": '0', "note-maturity": '0'};
describe('statusPointsForLevel', () => {
    it('should return 0 points as classes are all 0', () => {
        const actual = updateFrontmatterInitialisation(testFrontmatter, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        const expected = 0;
        expect(actual).toBe(expected);
    });

	it('should return 0 points as classes are all 0', () => {
		const actual = updateFrontmatterInitialisation(testFrontmatter, 5, 5, 5, 5, 5, 5, 5, 5, 0);
		const expected = 0;
		expect(actual).toBe(expected);
	});
});
