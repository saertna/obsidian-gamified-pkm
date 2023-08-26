import {checkIfReceiveABadge, getBadgeForLevel, getBadgeForInitLevel, Badge} from './badges'
import { describe, test } from 'node:test';


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


describe('getBadgeForLevel', () => {
    it('should return "Enlightened Novice" when level < 10', () => {
    const actual = getBadgeForLevel(1,false);
    const expected: Badge = {"description": "Huzzah! You've embarked on the path of knowledge and earned the title of 'Enlightened Novice.' The journey has just begun, and you're already radiating wisdom like a baby sun!", "level": "level 5", "name": "Enlightened Novice"};
    //const expected = false;
    expect(actual).toStrictEqual(expected);
    });
    
    it('should return "Enlightened Novice" when level < 10', () => {
    const actual = getBadgeForLevel(7,false);
    const expected = {"description": "Huzzah! You've embarked on the path of knowledge and earned the title of 'Enlightened Novice.' The journey has just begun, and you're already radiating wisdom like a baby sun!", "level": "level 5", "name": "Enlightened Novice"};
    expect(actual).toStrictEqual(expected);
    });
    
    it('should return "Zen Knowledge Keeper" when >= 82 <90', () => {
    const actual = getBadgeForLevel(89,false);
    const expected = {"description": "Serenity achieved! As a 'Zen Knowledge Keeper,' you maintain a tranquil mind while managing vast pools of knowledge with grace and poise.", "level": "level 82", "name": "Zen Knowledge Keeper"};
    expect(actual).toStrictEqual(expected);
    });
});


describe('getBadgeForInitLevel', () => {
    it('should return "Lore Seeker Initiate" when <= 2', () => {
        const actual = getBadgeForInitLevel(2);
        const expected: Badge = {"description": "Welcome to the journey of knowledge! As a 'Lore Seeker Initiate,' you've taken your first steps into the world of organized wisdom. Your quest has just begun, and with each note you make, you lay the foundation for a future rich with insights and understanding. Your journey starts here, and the path ahead is filled with potential and discovery.", "level": "level 1", "name": "Lore Seeker Initiate"};
        expect(actual).toStrictEqual(expected);
        });

    it('should return "Lore Apprentice" when >= 3', () => {
        const actual = getBadgeForInitLevel(3);
        const expected: Badge = {"description": "You've hit the ground running with your existing knowledge treasures! You're already an 'Lore Apprentice,' armed with a wealth of wisdom and ready to shape it further.", "level": "level 3", "name": "Lore Apprentice"};
        expect(actual).toStrictEqual(expected);
        });

    it('should return "Lore Apprentice" when >= 3', () => {
    const actual = getBadgeForInitLevel(4)
    const expected = {"description": "You've hit the ground running with your existing knowledge treasures! You're already an 'Lore Apprentice,' armed with a wealth of wisdom and ready to shape it further.", "level": "level 3", "name": "Lore Apprentice"};
    expect(actual).toStrictEqual(expected);
    });
    
    it('should return "The Curious Cartographer" below 90 to over 90', () => {
    const actual = getBadgeForInitLevel(89);
    const expected = {"description": "As 'The Curious Cartographer,' your existing notes have mapped out uncharted territories of understanding. Your curiosity knows no bounds, and your notes are the compass guiding your exploration.", "level": "level 82", "name": "The Curious Cartographer"};
    expect(actual).toStrictEqual(expected);
    });

    it('should return "Sultan of Synthesis" to over 90 < 100', () => {
        const actual = getBadgeForInitLevel(90);
        const expected = {"description": "Your existing notes have made you the 'Sultan of Synthesis.' You're the master weaver, threading together threads of information into a rich tapestry of insight.", "level": "level 90", "name": "Sultan of Synthesis"};
        expect(actual).toStrictEqual(expected);
        });
});