import { getRandomMessageTwoNoteChallenge, getRandomMessageWeeklyChallenge, getRandomMessagePoints } from '../src/randomNotificationText'
import { describe } from 'node:test';

global.Math.random = jest.fn(() => 0); // Change this value if needed

test('getRandomMessageWeeklyChallenge returns a string with replaced points', () => {
	const points = 10; // Example points value
	const result = getRandomMessageWeeklyChallenge(points);
	expect(result).toMatch(/.*10.*/); // Ensure it contains the points value
});

describe('getRandomMessageTwoNoteChallenge', () => {
	it('should include correct points in message', () => {
		const actual = getRandomMessageTwoNoteChallenge(300);
		expect(actual).toBe("Boom! You just aced the 2-note tango! 🎉 300 points in the pocket. Keep groovin'!")
	});
});


describe('getRandomMessageWeeklyChallenge', () => {
	it('should include correct points in message', () => {
		const actual = getRandomMessageWeeklyChallenge(300);
		const expected = "Seven days of note-taking? You're practically a note ninja turtle now! 🐢📝 300 points, cowabunga!";
		expect(actual).toBe(expected)
	});
});

describe('getRandomMessagePoints', () => {
	it('should include correct points in message', () => {
		const actual = getRandomMessagePoints(300);
		const expected = "Bazinga! You just snagged 300 points!";
		expect(actual).toBe(expected)
	});
});
