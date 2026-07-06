import {
    checkIfReceiveABadge,
    getBadgeForInitLevel,
    Badge,
    getBadgeDetails,
    getBadge
} from '../src/badges'
import { describe } from 'node:test';


describe('checkIfReceiveABadge', () => {
    it('should return false when not over 5', () => {
    const actual = checkIfReceiveABadge(1,2);
    const expected = false;
    expect(actual).toBe(expected);
    });

    it('should return false when not over 5', () => {
        const actual = checkIfReceiveABadge(1,4);
        const expected = false;
        expect(actual).toBe(expected);
        });
    
    it('should return true when level from below 4 to 5', () => {
    const actual = checkIfReceiveABadge(4,5);
    const expected = true;
    expect(actual).toBe(expected);
    });
    
    it('should return false when level 5 ⇒ 6', () => {
        const actual = checkIfReceiveABadge(5,6);
        const expected = false;
        expect(actual).toBe(expected);
    });

    it('should return true when level from below 9 ⇒ 10', () => {
        const actual = checkIfReceiveABadge(9,10);
        const expected = true;
        expect(actual).toBe(expected);
        });
        
    it('should return false when level 10 ⇒ 11', () => {
        const actual = checkIfReceiveABadge(10,11);
        const expected = false;
        expect(actual).toBe(expected);
    });


    it('should return true when level from below 19 ⇒ 20', () => {
        const actual = checkIfReceiveABadge(19,20);
        const expected = true;
        expect(actual).toBe(expected);
        });
        
    it('should return false when level 20 ⇒ 21', () => {
        const actual = checkIfReceiveABadge(20,21);
        const expected = false;
        expect(actual).toBe(expected);
    });


    it('should return true when from below 90 to over 90', () => {
    const actual = checkIfReceiveABadge(89,91);
    const expected = true
    expect(actual).toBe(expected);
    });
});


describe('getBadgeForInitLevel', () => {
	it('should return "Lore Seeker Initiate" when <= 2', () => {
		const actual = getBadgeForInitLevel(2);
		const expected: Badge = {
			"description": "Welcome to the journey of knowledge! As a 'Lore Seeker Initiate,' you've taken your first steps into the world of organized wisdom. Your quest has just begun, and with each note you make, you lay the foundation for a future rich with insights and understanding. Your journey starts here, and the path ahead is filled with potential and discovery.",
			"level": "level 1",
			"name": "Lore Seeker Initiate",
			"icon": `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <rect x="3" y="3" width="18" height="18" rx="4" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5"/>\n  <path d="M7 16H17" stroke="var(--interactive-accent)" stroke-width="2" stroke-linecap="round"/>\n  <path d="M14 6H7V13H17V9L14 6Z" stroke="var(--text-normal)" stroke-width="1.5" stroke-linejoin="round"/>\n  <path d="M14 6V9H17" stroke="var(--text-normal)" stroke-width="1.5" stroke-linejoin="round"/>\n</svg>\n`
		};
		expect(actual).toStrictEqual(expected);
	});

	it('should return "Lore Apprentice" when >= 3', () => {
		const actual = getBadgeForInitLevel(3);
		const expected: Badge = {
			"description": "You've hit the ground running with your existing knowledge treasures! You're already an 'Lore Apprentice,' armed with a wealth of wisdom and ready to shape it further.",
			"level": "level 3",
			"name": "Lore Apprentice",
			"icon": `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <rect x="4" y="4" width="16" height="16" rx="2" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5"/>\n  <path d="M7 16L12 11M9 18L14 13" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round"/>\n  <path d="M11.5 12.5L16 8" stroke="var(--text-normal)" stroke-width="1.5" stroke-linecap="round"/>\n  <path d="M15 7L17 9" stroke="var(--text-normal)" stroke-width="1.5" stroke-linecap="round"/>\n  <path d="M7 9L11 7L13 11L9 13L7 9Z" fill="var(--interactive-accent)" stroke="var(--interactive-accent)" stroke-width="1.5" stroke-linejoin="round"/>\n  <path d="M11 7L13 9" stroke="var(--background-secondary)" stroke-width="1.5" stroke-linecap="round"/>\n</svg>\n`
		};
		expect(actual).toStrictEqual(expected);
	});

	it('should return "The Curious Cartographer" below 90 to over 90', () => {
		const actual = getBadgeForInitLevel(89);
		const expected = {
			"description": "As 'The Curious Cartographer,' your existing notes have mapped out uncharted territories of understanding. Your curiosity knows no bounds, and your notes are the compass guiding your exploration.",
			"level": "level 82",
			"name": "The Curious Cartographer",
			"icon": `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <circle cx="12" cy="12" r="11" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5"/>\n  <circle cx="12" cy="12" r="8" stroke="var(--text-muted)" stroke-width="1" stroke-dasharray="1 2"/>\n  <circle cx="12" cy="12" r="5" stroke="var(--interactive-accent)" stroke-width="1.5"/>\n  <path d="M12 2V5M12 19V22M2 12H5M19 12H22" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round"/>\n  <path d="M12 12L18 6" stroke="var(--interactive-accent)" stroke-width="2" stroke-linecap="round"/>\n  <path d="M12 12L15 15" stroke="var(--text-normal)" stroke-width="2" stroke-linecap="round"/>\n  <circle cx="12" cy="12" r="1.5" fill="var(--text-normal)"/>\n  <path d="M7 17L5 19M17 7L19 5" stroke="var(--text-muted)" stroke-width="1" stroke-linecap="round"/>\n</svg>\n`
		};
		expect(actual).toStrictEqual(expected);
	});

	it('should return "Sultan of Synthesis" to over 90 < 100', () => {
		const actual = getBadgeForInitLevel(90);
		const expected = {
			"description": "Your existing notes have made you the 'Sultan of Synthesis.' You're the master weaver, threading together threads of information into a rich tapestry of insight.",
			"level": "level 90",
			"name": "Sultan of Synthesis",
			"icon": `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <path d="M12 21.5L20.2272 16.75V7.25L12 2.5L3.77277 7.25V16.75L12 21.5Z" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5"/>\n  <circle cx="12" cy="12" r="3.5" stroke="var(--interactive-accent)" stroke-width="2"/>\n  <path d="M12 6V8.5" stroke="var(--text-normal)" stroke-width="1.5" stroke-linecap="round"/>\n  <path d="M12 8.5L10.5 7.5M12 8.5L13.5 7.5" stroke="var(--text-normal)" stroke-width="1.5" stroke-linecap="round"/>\n  <path d="M12 18V15.5" stroke="var(--text-normal)" stroke-width="1.5" stroke-linecap="round"/>\n  <path d="M12 15.5L10.5 16.5M12 15.5L13.5 16.5" stroke="var(--text-normal)" stroke-width="1.5" stroke-linecap="round"/>\n  <path d="M6 12H8.5" stroke="var(--text-normal)" stroke-width="1.5" stroke-linecap="round"/>\n  <path d="M8.5 12L7.5 10.5M8.5 12L7.5 13.5" stroke="var(--text-normal)" stroke-width="1.5" stroke-linecap="round"/>\n  <path d="M18 12H15.5" stroke="var(--text-normal)" stroke-width="1.5" stroke-linecap="round"/>\n  <path d="M15.5 12L16.5 10.5M15.5 12L16.5 13.5" stroke="var(--text-normal)" stroke-width="1.5" stroke-linecap="round"/>\n  <circle cx="12" cy="12" r="1" fill="var(--interactive-accent)"/>\n</svg>\n`
		};
		expect(actual).toStrictEqual(expected);
	});
});

describe('getBadgeDetails', () => {
	it('should return "Enlightened Novice" ', () => {
		const actual = getBadgeDetails('Enlightened Novice');
		const expected: Badge = {
			name: "Enlightened Novice",
			description: "Huzzah! You've embarked on the path of knowledge and earned the title of 'Enlightened Novice.' The journey has just begun, and you're already radiating wisdom like a baby sun!",
			level: "level 5",
			icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <circle cx="12" cy="12" r="11" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1"/>\n  <path d="M12 7V3M15.5 8L18 5.5M8.5 8L6 5.5M19 12H21M3 12H5" stroke="var(--interactive-accent)" stroke-width="1.5" stroke-linecap="round"/>\n  <path d="M12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8Z" fill="var(--interactive-accent)" fill-opacity="0.1" stroke="var(--interactive-accent)" stroke-width="1.5"/>\n  <path d="M11 19C11 19 11.5 16 12.5 14C13.5 12 14.5 10 14.5 8C14.5 8 12.5 9 11.5 11C10.5 13 10.5 15.5 10.5 17.5L10 20" stroke="var(--text-normal)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n  <path d="M10.5 17.5L12.5 16.5M11 15L13 14" stroke="var(--text-normal)" stroke-width="1" stroke-linecap="round"/>\n</svg>`
		};
		expect(actual).toStrictEqual(expected);
	});

	it('should return "Wisdom Seedling"', () => {
		const actual = getBadgeDetails('Wisdom Seedling');
		const expected = {
			name: "Wisdom Seedling",
			description: "Your existing notes have nurtured the growth of a 'Wisdom Seedling.' You're cultivating your garden of knowledge with care and patience.",
			level: "level 23",
			icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <circle cx="12" cy="12" r="10" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5"/>\n  <path d="M7 17H17" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round"/>\n  <path d="M12 17V11" stroke="var(--interactive-accent)" stroke-width="1.5" stroke-linecap="round"/>\n  <path d="M12 13C12 13 13 10 16 10C16 10 15 13 12 13Z" fill="var(--interactive-accent)"/>\n  <path d="M12 11C12 11 11 8 8 8C8 8 9 11 12 11Z" fill="var(--text-normal)"/>\n</svg>\n`
		};
		expect(actual).toStrictEqual(expected);
	});
});

describe('getBadge', () => {
	it('should return badge "Consistent Lore Weaver" ', () => {
		const actual = getBadge('Consistent Lore Weaver');
		const expected: Badge = {
			name: "Consistent Lore Weaver",
			description: "Congratulations! You've woven a tapestry of knowledge for 30 consecutive days. As a 'Consistent Lore Weaver,' your daily contributions have become the threads that enrich the fabric of your growing wisdom.",
			level: "30 Days", // Note: Updated level to match your data array
			icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="4" fill="var(--background-secondary)" stroke="var(--background-modifier-border)" stroke-width="1.5"/><path d="M8 6V18M12 6V18M16 6V18" stroke="var(--interactive-accent)" stroke-width="1.5" stroke-linecap="round"/><path d="M6 8H18M6 12H18M6 16H18" stroke="var(--text-normal)" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="8" r="1" fill="var(--interactive-accent)"/><circle cx="16" cy="8" r="1" fill="var(--interactive-accent)"/><circle cx="12" cy="12" r="1" fill="var(--interactive-accent)"/><circle cx="8" cy="16" r="1" fill="var(--interactive-accent)"/><circle cx="16" cy="16" r="1" fill="var(--interactive-accent)"/></svg>`
		};
		expect(actual).toStrictEqual(expected);
	});

	it('should return empty entry', () => {
		const actual = getBadge('no idea what this could be');
		const expected = { name: "", description: "", level: "", icon: "" }
		expect(actual).toStrictEqual(expected);
	});
});
