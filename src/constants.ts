export const pointsNoteMajurity = 100;
export const pointsMajurity = 10;
export const pointsForDailyChallenge = 500;
export const pointsForWeeklyChallenge = 2000;
export const avatarInitContent =  `# Avatar

|        |     |
| ------ | --- |
| Level  | 0    |
| Points | 0    |
^levelAndPoints	
\`\`\`chart
type: bar
labels: [Expririence]
series:
  - title: points reached
    data: [0]
  - title: points to earn to level up
    data: [1000]
xMin: 0
xMax: 1000
tension: 0.2
width: 40%
labelColors: false
fill: false
beginAtZero: false
bestFit: false
bestFitTitle: undefined
bestFitNumber: 0
stacked: true
indexAxis: y
xTitle: "progress"
legend: false
\`\`\`

|             |     |       |
| ----------- | --- | ----- |
| **daily Notes** | *500EP* | **0/2** |
^dailyNotesChallenge
|  |     ||
| ---- | --- | --- |
| **weekly Notes** | *2000EP*     |  **0/7**   |
^weeklyNotesChallenge
\`\`\`chart
type: bar
labels: [Notes]
series:
  - title: days done in a row
    data: [0]
  - title: days to do in a row
    data: [7]
xMin: 0
xMax: 7
tension: 0.2
width: 40%
labelColors: false
fill: false
beginAtZero: false
bestFit: false
bestFitTitle: undefined
bestFitNumber: 0
stacked: true
indexAxis: y
xTitle: "days"
legend: false
\`\`\`

| Level | Count |
| :---: | :---: |
| Majurity 5 |\`$=dv.pages().where(p => [5, '5', '5➡️', '5⬇️', '5⬆️'].includes(p.file.frontmatter['note-maturity'])).length\`|
| Majurity 4 |\`$=dv.pages().where(p => [4, '4', '4➡️', '4⬇️', '4⬆️'].includes(p.file.frontmatter['note-maturity'])).length\`|
| Majurity 3 |\`$=dv.pages().where(p => [3, '3', '3➡️', '3⬇️', '3⬆️'].includes(p.file.frontmatter['note-maturity'])).length\`|
| Majurity 2 |\`$=dv.pages().where(p => [2, '2', '2➡️', '2⬇️', '2⬆️'].includes(p.file.frontmatter['note-maturity'])).length\`|
| Majurity 1 |\`$=dv.pages().where(p => [1, '1', '1➡️', '1⬇️', '1⬆️'].includes(p.file.frontmatter['note-maturity'])).length\`|
| Majurity 0 |\`$=dv.pages().where(p => [0, '0', '0➡️', '0⬇️', '0⬆️'].includes(p.file.frontmatter['note-maturity'])).length\`|


\`\`\`chart
type: bar
labels: [0, 0, 0]
series:
  - title: modified
    data: [0, 0, 0]
tension: 0.2
width: 80 %
labelColors: false
fill: false
beginAtZero: false
bestFit: false
bestFitTitle: undefined
bestFitNumber: 0
stacked: true
yTitle: "Number of Notes"
xTitle: "Months"
xMin: 0
\`\`\`
^ChartMonth


### Badges
#### achieved


#### outstanding
level 5: *Enlightened Novice*
level 10: *Curious Connoisseur*
level 20: *Brainiac Trailblazer*
level 27: *Scholarly Trailblazer*
level 35: *Info Ninja Master*
level 42: *Wise Owl Guru*
level 50: *Einstein Incarnate*
level 60: *Mastermind Sage*
level 75: *Cerebral Maestro*
level 82: *Zen Knowledge Keeper*
level 90: *Grand Archivist Overlord*
level 100: *Omniscient Sage of Everything*



### **note-maturity = 5**
\`\`\`dataview
List NoteMaturityCount
from ""
Where note-maturity = 5 or note-maturity = "5" or note-maturity = "5➡️" or note-maturity = "5⬆️" or note-maturity = "5⬇️"
\`\`\`

### **note-maturity = 4**
\`\`\`dataview
List NoteMaturityCount
from ""
Where note-maturity = 4 or note-maturity = "4" or note-maturity = "4➡️" or note-maturity = "4⬆️" or note-maturity = "4⬇️"
\`\`\`

### note-maturity = 3
\`\`\`dataview
List NoteMaturityCount
from ""
Where note-maturity = 3 or note-maturity = "3" or note-maturity = "3➡️" or note-maturity = "3⬆️" or note-maturity = "3⬇️"
\`\`\`

### note-maturity = 2
\`\`\`dataview
List NoteMaturityCount
from ""
Where note-maturity = 2 or note-maturity = "2" or note-maturity = "2➡️" or note-maturity = "2⬆️" or note-maturity = "2⬇️"
\`\`\`

### note-maturity = 1
\`\`\`dataview
List NoteMaturityCount
from ""
Where note-maturity = 1 or note-maturity = "1" or note-maturity = "1➡️" or note-maturity = "1⬆️" or note-maturity = "1⬇️"
\`\`\`

### note-maturity = 0
\`\`\`dataview
List NoteMaturityCount
from ""
Where note-maturity = 0 or note-maturity = "0" or note-maturity = "0➡️" or note-maturity = "0⬆️" or note-maturity = "0⬇️"
\`\`\`
`;
export const incrediments = [
  'Nexus Node',
  'Connection Crystal',
  'Mastery Scroll',
  'Insight Prism',
  'Reflective Essence',
  'Amplification Crystal',
  'Creative Catalyst',
  'Precision Lens'
];

export const incredimentsDataName = [
  'nexusNode',
  'connectionCrystal',
  'masteryScroll',
  'insightPrism',
  'reflectiveEssence',
  'amplificationCrystal',
  'creativeCatalyst',
  'precisionLens'
];

export const craftingItems = [
  { name: 'Temporal Tweaker', incredients: ['2xS1', '1xS6'] },
  { name: 'Perpetual Progress', incredients: ['2xS2', '1xS4'] },
  { name: 'Strategic Synapses', incredients: ['3xS1', '2xS2'] },
  { name: 'Accelerated Acquisition', incredients: ['1xS3', '2xS4'] },
  { name: 'Linkers Lode', incredients: ['3xS2', '1xS1'] },
  { name: 'Effortless Expansion', incredients: ['2xS3', '1xS6'] },
  { name: 'Recursive Reflection', incredients: ['2xS4', '1xS5'] },
  { name: 'Synaptic Surge', incredients: ['2xS2', '1xS1'] },
  { name: 'Inspiration Infusion', incredients: ['2xS7', '1xS1'] },
  { name: 'Title Titan', incredients: ['2xS8', '1xS7'] },
  { name: 'Precision Prism', incredients: ['2xS8', '1xS2'] },
  { name: 'Hyperlink Harmony', incredients: ['2xS2', '1xS6'] },
];

export const listOfUseableBoostersToBeShown = ['Perpetual Progress', 'Title Titan', 'Precision Prism']

export const elements = [
  { shortName: 'S1', name: 'Nexus Node', varName: 'nexusNode' },
  { shortName: 'S2', name: 'Connection Crystal', varName: 'connectionCrystal' },
  { shortName: 'S3', name: 'Mastery Scroll', varName: 'masteryScroll' },
  { shortName: 'S4', name: 'Insight Prism', varName: 'insightPrism' },
  { shortName: 'S5', name: 'Reflective Essence', varName: 'reflectiveEssence' },
  { shortName: 'S6', name: 'Amplification Crystal', varName: 'amplificationCrystal' },
  { shortName: 'S7', name: 'Creative Catalyst', varName: 'creativeCatalyst' },
  { shortName: 'S8', name: 'Precision Lens', varName: 'precisionLens' }
];

export const boosterRecipes = [
  { varname: 'temporalTweaker' ,name: 'Temporal Tweaker', incredients: ['2xS1', '1xS6'], description: 'Temporal Tweaker: reset the cooldown phase for a booster your choice' },
  { varname: 'perpetualProgress' ,name: 'Perpetual Progress', incredients: ['2xS2', '1xS4'], description: 'Perpetual Progress: get 3 times points an all your actions for the next 4 hours. You can use Perpetual Progress every three days, if you have the ingredients to craft it.' },
  { varname: 'strategicSynapses' ,name: 'Strategic Synapses', incredients: ['3xS1', '2xS2'], description: 'Strategic Synapses: gain 3 times EP for all actions on Map Of Content ratings for the next 4 hours. This booster has a cooldown time of 5 days.' },
  { varname: 'acceleratedAcquisition' ,name: 'Accelerated Acquisition', incredients: ['1xS3', '2xS4'], description: 'Accelerated Acquisition: Use Accelerated Acquisition and collect much faster for the next 12 hours all sorts of ingredients when creating and improving notes' },
  { varname: 'linkersLode' ,name: 'Linkers Lode', incredients: ['3xS2', '1xS1'], description: 'Linkers Lode: collect extra points when creating chain of thoughts for the next 3 hours. (cooldown 2 days)' },
  { varname: 'effortlessExpansion' ,name: 'Effortless Expansion', incredients: ['2xS3', '1xS6'], description: 'Effortless Expansion: Cast "Effortless Expansion" and lower the cap to the next level about 20% in the next 5 days.' },
  { varname: 'recursiveReflection' ,name: 'Recursive Reflection', incredients: ['2xS4', '1xS5'], description: 'Recursive Reflection: Improve your notes and get 5 times the points you get on normal condition for the next 5 hours. Cooldown 3 days.' },
  { varname: 'synapticSurge' ,name: 'Synaptic Surge', incredients: ['2xS2', '1xS1'], description: 'Synaptic Surge: Link your ideas together, every increase in "linking maturity" pays out 3 times for the next 2 hours.' },
  { varname: 'inspirationInfusion' ,name: 'Inspiration Infusion', incredients: ['2xS7', '1xS1'], description: 'Inspiration Infusion: Increase the frequency to get helpful prompts to power up you personal knowledge management for the next 2 days.' },
  { varname: 'titleTitan' ,name: 'Title Titan', incredients: ['2xS8', '1xS7'], description: 'Title Titan: Quadro your points when making your note title more to the point expressing the idea of you note for the next 3 hours.' },
  { varname: 'precisionPrism' ,name: 'Precision Prism', incredients: ['2xS8', '1xS2'], description: 'Precision Prism: 4 times the points when increasing the "note length majurity" for a note the next 3 hours.' },
  { varname: 'hyperlinkHarmony' ,name: 'Hyperlink Harmony', incredients: ['2xS2', '1xS6'], description: 'Hyperlink Harmony: Get for "Inlink majurity" AND "outlink majurity" improvements 5 times the point the next 3 hours.' },
];

