import { badgeLevels, badgeNames, badgeInitLevels, badgeNamesInit , badges} from './data/constants'
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


export function getBadge(badgeName: string): Badge {
  const targetBadge = badges.find(badge => badge.name === badgeName);
if(targetBadge){
  return targetBadge;
} else {
  return {name: '', description:'',level:''}
}


}

