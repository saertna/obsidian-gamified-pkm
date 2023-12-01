import {
    checkIfReceiveABadge,
    getBadgeForLevel,
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


describe('getBadgeDetails', () => {
    it('should return "Enlightened Novice" ', () => {
        const actual = getBadgeDetails('Enlightened Novice');
        const expected: Badge = { name: "Enlightened Novice", description: "Huzzah! You've embarked on the path of knowledge and earned the title of 'Enlightened Novice.' The journey has just begun, and you're already radiating wisdom like a baby sun!", level: "level 5" };
        //const expected = false;
        expect(actual).toStrictEqual(expected);
    });

    it('should return "Scholarly Trailblazer"', () => {
        const actual = getBadgeDetails('Scholarly Trailblazer');
        const expected = { name: "Scholarly Trailblazer", description: "Impressive! You're now a 'Scholarly Trailblazer,' boldly venturing through a sea of knowledge with a compass of curiosity and a map of intellect!" , level: "level 27" };
        expect(actual).toStrictEqual(expected);
    });

    it('should return "Wisdom Seedling"', () => {
        const actual = getBadgeDetails('Wisdom Seedling');
        const expected = { name: "Wisdom Seedling", description: "Your existing notes have nurtured the growth of a 'Wisdom Seedling.' You're cultivating your garden of knowledge with care and patience." , level: "level 23" };
        expect(actual).toStrictEqual(expected);
    });
});


describe('getBadge', () => {
    it('should return badge "Consistent Lore Weaver" ', () => {
        const actual = getBadge('Consistent Lore Weaver');
        const expected: Badge = { name: "Consistent Lore Weaver", description: "Congratulations! You've woven a tapestry of knowledge for 30 consecutive days. As a 'Consistent Lore Weaver,' your daily contributions have become the threads that enrich the fabric of your growing wisdom.", level: "" };
        expect(actual).toStrictEqual(expected);
    });

    it('should return badge "Knowledge Artisan Stalwart"', () => {
        const actual = getBadge('Knowledge Artisan Stalwart');
        const expected = { name: "Knowledge Artisan Stalwart", description: "You've forged a robust foundation with 90 consecutive days of dedicated note crafting. As a 'Knowledge Artisan Stalwart,' your commitment has sculpted your repository into a work of art, a testament to your persistent curiosity.", level: "" };
        expect(actual).toStrictEqual(expected);
    });

    it('should return badge "Wisdom Architect Virtuoso"', () => {
        const actual = getBadge('Wisdom Architect Virtuoso');
        const expected = { name: "Wisdom Architect Virtuoso", description: "With each passing day, you've laid down the blueprints of a profound structure. As a 'Wisdom Architect Virtuoso' at 180 days, your continuous efforts have transformed your knowledge space into an architectural marvel, a testament to your enduring passion for learning.", level: "" };
        expect(actual).toStrictEqual(expected);
    });

    it('should return badge "Eternal Scholar Maestro"', () => {
        const actual = getBadge('Eternal Scholar Maestro');
        const expected = { name: "Eternal Scholar Maestro", description: "A year of unwavering dedication! You've earned the title of 'Eternal Scholar Maestro' by contributing daily for 365 days. Your commitment has created a masterpiece of continuous learning, setting you apart as a true maestro of personal knowledge.", level: "" }
        expect(actual).toStrictEqual(expected);
    });

    it('should return badge "Divine Omniscience Overlord"', () => {
        const actual = getBadge('Divine Omniscience Overlord');
        const expected = { name: "Divine Omniscience Overlord", description: "Behold the divine! Your unbroken streak of daily contributions for 730 days crowns you as the 'Divine Omniscience Overlord.' Your two-year feat is a testament to your unmatched commitment and the creation of a knowledge empire that stands as a beacon for all seekers.", level: "" }
        expect(actual).toStrictEqual(expected);
    });

    it('should return empty entry', () => {
        const actual = getBadge('no idea what this could be');
        const expected = { name: "", description: "", level: "" }
        expect(actual).toStrictEqual(expected);
    });
});
