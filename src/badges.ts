export interface Badge {
    name: string;
    description: string;
    level: string;
  }

export function checkIfReceiveABadge(levelOld: number, levelNew: number): boolean {
  const badgeLevels: number[] = [5, 10, 20, 27, 35, 42, 50, 60, 75, 82, 90, 100];
  let receiveBadge = false
  for (let i=0; i < badgeLevels.length; i++){
    if (levelOld < badgeLevels[i] && levelNew >= badgeLevels[i]){
      receiveBadge = true
    } 
  }
  return receiveBadge
}

export function getBadgeForLevel(level: number, inform: boolean): Badge {
    const badgeLevels: number[] = [5, 10, 20, 27, 35, 42, 50, 60, 75, 82, 90, 100];
    const badgeNames: Badge[] = [
      { name: "Enlightened Novice", description: "Huzzah! You've embarked on the path of knowledge and earned the title of 'Enlightened Novice.' The journey has just begun, and you're already radiating wisdom like a baby sun!", level: "level 5" },
      { name: "Curious Connoisseur", description: "Fantastic! You've embraced the wonders of learning and become a 'Curious Connoisseur.' Your appetite for knowledge is insatiable, like a bottomless bowl of ice cream!" , level: "level 10" },
      { name: "Brainiac Trailblazer", description: "Bravo! As a 'Brainiac Trailblazer,' you've carved your way through a jungle of information and emerged victorious. Your intellect is a beacon shining brightly for others to follow!" , level: "level 20" },
      { name: "Scholarly Trailblazer", description: "Impressive! You're now a 'Scholarly Trailblazer,' boldly venturing through a sea of knowledge with a compass of curiosity and a map of intellect!" , level: "level 27" },
      { name: "Info Ninja Master", description: "Incredible! You've reached the pinnacle of stealthy knowledge management. As an 'Info Ninja Master,' you can snatch information from the shadows like a digital ninja!" , level: "level 35" },
      { name: "Wise Owl Guru", description: "Whoo-hoo! You've achieved 'Wise Owl Guru' status. Your wisdom is legendary, and your hoots of knowledge echo through the forest of ignorance!" , level: "level 42" },
      { name: "Einstein Incarnate", description: "Eureka! You've become an 'Einstein Incarnate,' pushing the boundaries of understanding and bending the fabric of knowledge to your will!" , level: "level 50" },
      { name: "Mastermind Sage", description: "Magnificent! You've ascended to the rank of 'Mastermind Sage,' guiding the rivers of information and enlightening all who seek wisdom!" , level: "level 60" },
      { name: "Cerebral Maestro", description: "Bravissimo! You're now a 'Cerebral Maestro,' conducting the symphony of knowledge with the finesse of a virtuoso conductor!" , level: "level 75" },
      { name: "Zen Knowledge Keeper", description: "Serenity achieved! As a 'Zen Knowledge Keeper,' you maintain a tranquil mind while managing vast pools of knowledge with grace and poise." , level: "level 82" },
      { name: "Grand Archivist Overlord", description: "All hail the 'Grand Archivist Overlord!' You wield the knowledge of ages and hold the keys to unlock the gates of wisdom!" , level: "level 90" },
      { name: "Omniscient Sage of Everything", description: "Congratulations, oh wise one! You've attained the highest level of enlightenment as the 'Omniscient Sage of Everything.' Your understanding knows no bounds, and your wisdom is as vast as the cosmos itself!", level: "level 100"  },
    ];
  
    let index = 0;
    for (let i = 0; i < badgeLevels.length; i++) {
      if (level >= badgeLevels[i]) {
        index = i;
      } else {
        break;
      }
    }
    return badgeNames[index]
  }
  


  export  function getBadgeForInitLevel(level: number): Badge {
    const badgeLevels: number[] = [0, 3, 7, 15, 23, 30, 35, 42, 50, 60, 75, 82, 90, 100];
    const badgeNamesInit: Badge[] = [
      { name: "Lore Seeker Initiate", description: "Welcome to the journey of knowledge! As a 'Lore Seeker Initiate,' you've taken your first steps into the world of organized wisdom. Your quest has just begun, and with each note you make, you lay the foundation for a future rich with insights and understanding. Your journey starts here, and the path ahead is filled with potential and discovery.", level: "level 1" },
      { name: "Lore Apprentice", description: "You've hit the ground running with your existing knowledge treasures! You're already an 'Lore Apprentice,' armed with a wealth of wisdom and ready to shape it further.", level: "level 3" },
      { name: "Savvy Scholar", description: "Your existing notes have given you a head start! You're now a 'Savvy Scholar,' confidently diving into the sea of information with a treasure trove of insights." , level: "level 7" },
      { name: "Sage's Foundation", description: "Building upon your pre-existing notes, you're establishing the 'Sage's Foundation' for an even grander edifice of knowledge. Your groundwork is impressive!" , level: "level 15" },
      { name: "Wisdom Seedling", description: "Your existing notes have nurtured the growth of a 'Wisdom Seedling.' You're cultivating your garden of knowledge with care and patience." , level: "level 23" },
      { name: "Prodigious Preparer", description: "Thanks to your prior efforts, you're a 'Prodigious Preparer,' standing tall among your notes and ready to conquer new realms of understanding." , level: "level 30" },
      { name: "Epic Epiphany Explorer", description: "Your past notes have led you to the grand 'Epic Epiphany Explorer' status! You've already been down a few rabbit holes and come out with dazzling discoveries." , level: "level 35" },
      { name: "Lore Luminary", description: "With your existing notes illuminating your path, you've become a 'Lore Luminary,' shining light on the mysteries of the universe, one idea at a time." , level: "level 42" },
      { name: "Scribe of the Ancients", description: "Your mastery of personal knowledge management has elevated you to the esteemed rank of the 'Scribe of the Ancients.' Your existing notes have transformed into treasures, bridging the gap between old wisdom and new discoveries." , level: "level 50" },
      { name: "Eureka Maestro", description: "Armed with your existing notes, you're the 'Eureka Maestro,' composing a symphony of insights that harmonize with the melody of discovery." , level: "level 60" },
      { name: "Chronicles Champion", description: "With your existing notes standing as a testament, you've ascended to the illustrious 'Chronicles Champion' level. Your journey through time's tapestry has brought forth a symphony of insights that harmonize past and present." , level: "level 75" },
      { name: "The Curious Cartographer", description: "As 'The Curious Cartographer,' your existing notes have mapped out uncharted territories of understanding. Your curiosity knows no bounds, and your notes are the compass guiding your exploration." , level: "level 82" },
      { name: "Sultan of Synthesis", description: "Your existing notes have made you the 'Sultan of Synthesis.' You're the master weaver, threading together threads of information into a rich tapestry of insight." , level: "level 90" },
      { name: "Eternal Archivist", description: "At the pinnacle of personal knowledge mastery, you're now revered as the 'Eternal Archivist.' Your existing notes, carefully curated and nurtured, stand as immortal beacons, guiding seekers through the labyrinth of knowledge across ages." , level: "level 100" },
    ];
  
    let index = 0;
    for (let i = 0; i < badgeLevels.length; i++) {
      if (level >= badgeLevels[i]) {
        index = i;
      } else {
        break;
      }
    }
    return badgeNamesInit[index]
  }


  // Example usage:
  // const currentLevel = 42; // Replace this with the actual player's level
  // const badge = getBadgeForLevel(currentLevel);
  // console.debug(`Congratulations! You've reached Level ${currentLevel}. You've earned the "${badge.name}" badge. ${badge.description}`);
  




    /*
  export function getBadgeForLevel(level: number): Badge {
    const badges: Badge[] = [
      { name: "Enlightened Novice", description: "Huzzah! You've embarked on the path of knowledge and earned the title of 'Enlightened Novice.' The journey has just begun, and you're already radiating wisdom like a baby sun!" },
      { name: "Curious Connoisseur", description: "Fantastic! You've embraced the wonders of learning and become a 'Curious Connoisseur.' Your appetite for knowledge is insatiable, like a bottomless bowl of ice cream!" },
      { name: "Brainiac Trailblazer", description: "Bravo! As a 'Brainiac Trailblazer,' you've carved your way through a jungle of information and emerged victorious. Your intellect is a beacon shining brightly for others to follow!" },
      // Add more badges here for levels 5, 10, 20, 27, 35, 42, 50, 60, 75, 82, 90, and 100
      // Example:
      // { name: "Scholarly Trailblazer", description: "Impressive! You're now a 'Scholarly Trailblazer,' boldly venturing through a sea of knowledge with a compass of curiosity and a map of intellect!" },
      // { name: "Info Ninja Master", description: "Incredible! You've reached the pinnacle of stealthy knowledge management. As an 'Info Ninja Master,' you can snatch information from the shadows like a digital ninja!" },
      // ...and so on
    ];
  
    const maxLevel =100; // Assuming each badge is awarded every 5 levels
    const cappedLevel = Math.min(level, maxLevel);
    const index = Math.floor(cappedLevel / 5) - 1;
    return badges[index];
  }
  

  interface Badge {
    name: string;
    description: string;
  }
  */
