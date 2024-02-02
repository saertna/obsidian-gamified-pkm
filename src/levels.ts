export interface LevelData {
    points: number;
    level: number;
    pointsNext: number;
  }
  
  const levelData: LevelData[] = [
    { points: 0, level: 0, pointsNext: 0},
    { points: 0, level: 1, pointsNext: 1000 },
    { points: 1000, level: 2, pointsNext: 3000 },
    { points: 3000, level: 3, pointsNext: 7500 },
    { points: 7500, level: 4, pointsNext: 15000 },
    { points: 15000, level: 5, pointsNext: 30000 },
    { points: 30000, level: 6, pointsNext: 50000 },
    { points: 50000, level: 7, pointsNext: 80000 },
    { points: 80000, level: 8, pointsNext: 120000 },
    { points: 120000, level: 9, pointsNext: 170000 },
    { points: 170000, level: 10, pointsNext: 230000 },
    { points: 230000, level: 11, pointsNext: 300000 },
    { points: 300000, level: 12, pointsNext: 380000 },
    { points: 380000, level: 13, pointsNext: 470000 },
    { points: 470000, level: 14, pointsNext: 600000 },
    { points: 600000, level: 15, pointsNext: 750000 },
    { points: 750000, level: 16, pointsNext: 920000 },
    { points: 920000, level: 17, pointsNext: 1110000 },
    { points: 1110000, level: 18, pointsNext: 1320000 },
    { points: 1320000, level: 19, pointsNext: 1550000 },
    { points: 1550000, level: 20, pointsNext: 1800000 },
    { points: 1800000, level: 21, pointsNext: 2070000 },
    { points: 2070000, level: 22, pointsNext: 2360000 },
    { points: 2360000, level: 23, pointsNext: 2670000 },
    { points: 2670000, level: 24, pointsNext: 3000000 },
    { points: 3000000, level: 25, pointsNext: 3350000 },
    { points: 3350000, level: 26, pointsNext: 3720000 },
    { points: 3720000, level: 27, pointsNext: 4110000 },
    { points: 4110000, level: 28, pointsNext: 4520000 },
    { points: 4520000, level: 29, pointsNext: 4950000 },
    { points: 4950000, level: 30, pointsNext: 5400000 },
    { points: 5400000, level: 31, pointsNext: 5870000 },
    { points: 5870000, level: 32, pointsNext: 6360000 },
    { points: 6360000, level: 33, pointsNext: 6870000 },
    { points: 6870000, level: 34, pointsNext: 7400000 },
    { points: 7400000, level: 35, pointsNext: 7950000 },
    { points: 7950000, level: 36, pointsNext: 8520000 },
    { points: 8520000, level: 37, pointsNext: 9110000 },
    { points: 9110000, level: 38, pointsNext: 9720000 },
    { points: 9720000, level: 39, pointsNext: 10350000 },
    { points: 10350000, level: 40, pointsNext: 11000000 },
    { points: 11000000, level: 41, pointsNext: 11670000 },
    { points: 11670000, level: 42, pointsNext: 12360000 },
    { points: 12360000, level: 43, pointsNext: 13070000 },
    { points: 13070000, level: 44, pointsNext: 13800000 },
    { points: 13800000, level: 45, pointsNext: 14550000 },
    { points: 14550000, level: 46, pointsNext: 15320000 },
    { points: 15320000, level: 47, pointsNext: 16110000 },
    { points: 16110000, level: 48, pointsNext: 16920000 },
    { points: 16920000, level: 49, pointsNext: 17750000 },
    { points: 17750000, level: 50, pointsNext: 18600000 },
    { points: 18600000, level: 51, pointsNext: 19470000 },
    { points: 19470000, level: 52, pointsNext: 20360000 },
    { points: 20360000, level: 53, pointsNext: 21270000 },
    { points: 21270000, level: 54, pointsNext: 22200000 },
    { points: 22200000, level: 55, pointsNext: 23150000 },
    { points: 23150000, level: 56, pointsNext: 24120000 },
    { points: 24120000, level: 57, pointsNext: 25110000 },
    { points: 25110000, level: 58, pointsNext: 26120000 },
    { points: 26120000, level: 59, pointsNext: 27150000 },
    { points: 27150000, level: 60, pointsNext: 28200000 },
    { points: 28200000, level: 61, pointsNext: 29270000 },
    { points: 29270000, level: 62, pointsNext: 30360000 },
    { points: 30360000, level: 63, pointsNext: 31470000 },
    { points: 31470000, level: 64, pointsNext: 32600000 },
    { points: 32600000, level: 65, pointsNext: 33750000 },
    { points: 33750000, level: 66, pointsNext: 34920000 },
    { points: 34920000, level: 67, pointsNext: 36110000 },
    { points: 36110000, level: 68, pointsNext: 37320000 },
    { points: 37320000, level: 69, pointsNext: 38550000 },
    { points: 38550000, level: 70, pointsNext: 39800000 },
    { points: 39800000, level: 71, pointsNext: 41070000 },
    { points: 41070000, level: 72, pointsNext: 42360000 },
    { points: 42360000, level: 73, pointsNext: 43670000 },
    { points: 43670000, level: 74, pointsNext: 45000000 },
    { points: 45000000, level: 75, pointsNext: 46350000 },
    { points: 46350000, level: 76, pointsNext: 47720000 },
    { points: 47720000, level: 77, pointsNext: 49110000 },
    { points: 49110000, level: 78, pointsNext: 50520000 },
    { points: 50520000, level: 79, pointsNext: 51950000 },
    { points: 51950000, level: 80, pointsNext: 53400000 },
    { points: 53400000, level: 81, pointsNext: 54870000 },
    { points: 54870000, level: 82, pointsNext: 56360000 },
    { points: 56360000, level: 83, pointsNext: 57870000 },
    { points: 57870000, level: 84, pointsNext: 59400000 },
    { points: 59400000, level: 85, pointsNext: 60950000 },
    { points: 60950000, level: 86, pointsNext: 62520000 },
    { points: 62520000, level: 87, pointsNext: 64110000 },
    { points: 64110000, level: 88, pointsNext: 65720000 },
    { points: 65720000, level: 89, pointsNext: 67350000 },
    { points: 67350000, level: 90, pointsNext: 69000000 },
    { points: 69000000, level: 91, pointsNext: 70670000 },
    { points: 70670000, level: 92, pointsNext: 72360000 },
    { points: 72360000, level: 93, pointsNext: 74070000 },
    { points: 74070000, level: 94, pointsNext: 75800000 },
    { points: 75800000, level: 95, pointsNext: 77550000 },
    { points: 77550000, level: 96, pointsNext: 79320000 },
    { points: 79320000, level: 97, pointsNext: 81110000 },
    { points: 81110000, level: 98, pointsNext: 82920000 },
    { points: 82920000, level: 99, pointsNext: 84750000 },
    { points: 84750000, level: 100, pointsNext: 86600000 },
    { points: 86600000, level: 101, pointsNext: 88470000 },
    { points: 88470000, level: 102, pointsNext: 90360000 },
    { points: 90360000, level: 103, pointsNext: 92270000 },
    { points: 92270000, level: 104, pointsNext: 94200000 },
    { points: 94200000, level: 105, pointsNext: 96150000 },
    { points: 96150000, level: 106, pointsNext: 98120000 },
    { points: 98120000, level: 107, pointsNext: 100110000 },
    { points: 100110000, level: 108, pointsNext: 102120000 },
    { points: 102120000, level: 109, pointsNext: 104150000 },
    { points: 104150000, level: 110, pointsNext: 106200000 },
    { points: 106200000, level: 111, pointsNext: 108300000 },
    { points: 108300000, level: 112, pointsNext: 110450000 },
    { points: 110450000, level: 113, pointsNext: 112650000 },
    { points: 112650000, level: 114, pointsNext: 114900000 },
    { points: 114900000, level: 115, pointsNext: 117200000 },
    { points: 117200000, level: 116, pointsNext: 119550000 },
    { points: 119550000, level: 117, pointsNext: 121950000 },
    { points: 121950000, level: 118, pointsNext: 124400000 },
    { points: 124400000, level: 119, pointsNext: 126900000 },
    { points: 126900000, level: 120, pointsNext: 129450000 },
    { points: 129450000, level: 121, pointsNext: 132050000 },
    { points: 132050000, level: 122, pointsNext: 134700000 },
    { points: 134700000, level: 123, pointsNext: 137100000 },
    { points: 137100000, level: 124, pointsNext: 139850000 },
    { points: 139850000, level: 125, pointsNext: 142650000 },
    { points: 142650000, level: 126, pointsNext: 145500000 },
    { points: 145500000, level: 127, pointsNext: 148400000 },
    { points: 148400000, level: 128, pointsNext: 151350000 },
    { points: 151350000, level: 129, pointsNext: 154350000 },
    { points: 154350000, level: 130, pointsNext: 157400000 },
    { points: 157400000, level: 131, pointsNext: 160500000 },
    { points: 160500000, level: 132, pointsNext: 163650000 },
    { points: 163650000, level: 133, pointsNext: 166850000 },
    { points: 166850000, level: 134, pointsNext: 170100000 },
    { points: 170100000, level: 135, pointsNext: 173400000 },
    { points: 173400000, level: 136, pointsNext: 176750000 },
    { points: 176750000, level: 137, pointsNext: 180150000 },
    { points: 180150000, level: 138, pointsNext: 183600000 },
    { points: 183600000, level: 139, pointsNext: 187100000 },
    { points: 187100000, level: 140, pointsNext: 190650000 },
    { points: 190650000, level: 141, pointsNext: 194250000 },
    { points: 194250000, level: 142, pointsNext: 197900000 },
    { points: 197900000, level: 143, pointsNext: 201600000 },
    { points: 201600000, level: 144, pointsNext: 205350000 },
    { points: 205350000, level: 145, pointsNext: 209150000 },
    { points: 209150000, level: 146, pointsNext: 213000000 },
    { points: 213000000, level: 147, pointsNext: 216900000 },
    { points: 216900000, level: 148, pointsNext: 220850000 },
    { points: 220850000, level: 149, pointsNext: 224850000 },
    { points: 224850000, level: 150, pointsNext: 228900000 },
    { points: 228900000, level: 151, pointsNext: 233000000 },
    { points: 233000000, level: 152, pointsNext: 237150000 },
    { points: 237150000, level: 153, pointsNext: 241350000 },
    { points: 241350000, level: 154, pointsNext: 245600000 },
    { points: 245600000, level: 155, pointsNext: 249900000 },
    { points: 249900000, level: 156, pointsNext: 254250000 },
    { points: 254250000, level: 157, pointsNext: 258650000 },
    { points: 258650000, level: 158, pointsNext: 263100000 },
    { points: 263100000, level: 159, pointsNext: 267600000 },
    { points: 267600000, level: 160, pointsNext: 272200000 },
  ];
  
  export function getLevelForPoints(points: number): LevelData {
    let level :LevelData = levelData[0];
    for (const data of levelData) {
      if (points >= data.points) {
        level = data;
      } else {
        break;
      }
    }
    return level;
  }

  export function statusPointsForLevel(targetLevel: number): number {
    let statusPoints = 0;
    for (const data of levelData) {
      if (targetLevel == data.level && statusPoints == 0) {
        statusPoints = data.points;
      } 
    }

		
		return statusPoints
  }
  

/*
const points = 5500;
const level = getLevelForPoints(points);
console.debug(`With ${points} points, the current level is ${level}.`);
*/
