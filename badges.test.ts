import { execPath } from 'node:process';
import {checkIfReceiveABadge, getBadgeForLevel, getBadgeForInitLevel, Badge} from './badges'
import { describe, test } from 'node:test';


describe('checkIfReceiveABadge', () => {
    it('should return false when not over 5', () => {
    const actual = checkIfReceiveABadge(1,2);
    //const expected: Badge = {name:"Grand Archivist Overlord", description:"All hail the 'Grand Archivist Overlord!' You wield the knowledge of ages and hold the keys to unlock the gates of wisdom!",level:"level 90"}
    const expected = false;
    expect(actual).toBe(expected);
    });
    
    it('should return true when level from below 1 to 5', () => {
    const actual = checkIfReceiveABadge(1,5);
    const expected = true;
    expect(actual).toBe(expected);
    });
    
    it('should return true when from below 90 to over 90', () => {
    const actual = checkIfReceiveABadge(89,91);
    const expected = true
    expect(actual).toBe(expected);
    });
});


describe('getBadgeForLevel', () => {
    it('should return false when not over 5', () => {
    const actual = getBadgeForLevel(1,false);
    const expected: Badge = {"description": "Huzzah! You've embarked on the path of knowledge and earned the title of 'Enlightened Novice.' The journey has just begun, and you're already radiating wisdom like a baby sun!", "level": "level 5", "name": "Enlightened Novice"};
    //const expected = false;
    expect(actual).toStrictEqual(expected);
    });
    
    it('should return true when level from below 1 to 5', () => {
    const actual = getBadgeForLevel(1,false);
    const expected = {"description": "Huzzah! You've embarked on the path of knowledge and earned the title of 'Enlightened Novice.' The journey has just begun, and you're already radiating wisdom like a baby sun!", "level": "level 5", "name": "Enlightened Novice"};
    expect(actual).toStrictEqual(expected);
    });
    
    it('should return true when from below 90 to over 90', () => {
    const actual = getBadgeForLevel(89,false);
    const expected = {"description": "Serenity achieved! As a 'Zen Knowledge Keeper,' you maintain a tranquil mind while managing vast pools of knowledge with grace and poise.", "level": "level 82", "name": "Zen Knowledge Keeper"};
    expect(actual).toStrictEqual(expected);
    });
});


describe('getBadgeForInitLevel', () => {
    it('should return false when not over 5', () => {
    const actual = getBadgeForInitLevel(1);
    const expected: Badge = {"description": "You've hit the ground running with your existing knowledge treasures! You're already an 'Lore Apprentice,' armed with a wealth of wisdom and ready to shape it further.", "level": "level 3", "name": "Lore Apprentice"};
    //const expected = false;
    expect(actual).toStrictEqual(expected);
    });
    
    it('should return true when level from below 1 to 5', () => {
    const actual = getBadgeForInitLevel(4)
    const expected = {"description": "You've hit the ground running with your existing knowledge treasures! You're already an 'Lore Apprentice,' armed with a wealth of wisdom and ready to shape it further.", "level": "level 3", "name": "Lore Apprentice"};
    expect(actual).toStrictEqual(expected);
    });
    
    it('should return true when from below 90 to over 90', () => {
    const actual = getBadgeForInitLevel(89);
    const expected = {"description": "As 'The Curious Cartographer,' your existing notes have mapped out uncharted territories of understanding. Your curiosity knows no bounds, and your notes are the compass guiding your exploration.", "level": "level 82", "name": "The Curious Cartographer"};
    expect(actual).toStrictEqual(expected);
    });
});