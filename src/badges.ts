import { badgeLevels, badgeNames, badgeInitLevels, badgeNamesInit } from './constants'
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
    let index = 0;
    for (let i = 0; i < badgeInitLevels.length; i++) {
      if (level >= badgeInitLevels[i]) {
        index = i;
      } else {
        break;
      }
    }
    return badgeNamesInit[index]
  }


  export  function getBadgeDetails(badgeNameString: string): Badge {
    "Rückgabe der Badge details wenn der Badge name übergeben wird."
    let index = null;
    let badgeFound : Badge = { name: "", description: "", level: "" }
    for (let i = 0; i < badgeNames.length; i++) {
      if (badgeNameString == badgeNames[i].name) {
        index = i;
      } //else {
        //break;
      //}
    }
    if (index != null){
      badgeFound = badgeNames[index]
    } else if (index == null) {
      for (let i = 0; i < badgeNamesInit.length; i++) {
        if (badgeNameString == badgeNamesInit[i].name) {
          index = i;
        } //else {
          //break;
        //}
      }
      if (index != null){
        badgeFound = badgeNamesInit[index]
      }
    } 
    return badgeFound
  }


  // Example usage:
  // const currentLevel = 42; // Replace this with the actual player's level
  // const badge = getBadgeForLevel(currentLevel);
  // if(debugLogs) console.debug(`Congratulations! You've reached Level ${currentLevel}. You've earned the "${badge.name}" badge. ${badge.description}`);
  




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
