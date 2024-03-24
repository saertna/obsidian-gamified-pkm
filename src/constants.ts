import { Badge } from './badges'
export const PLUGIN_VERSION = '0.0.89';
export const pointsNoteMajurity = 100;
export const pointsMajurity = 10;
export const pointsForDailyChallenge = 500;
export const pointsForWeeklyChallenge = 2000;
export const streakboosterDecrease = 0.2;
export const streakboosterIncreaseDaily = 0.1;
export const streakboosterIncreaseWeekly = 1;
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const CryptoJS = require("crypto-js");
export const secretKey = "2ZU^12y#QmNB5$yEin5^";
export const debugLogs = false;
export const avatarInitContent =  `# Avatar


\`\`\`gamification-avatar
image: 
description: |-2
  |           |         | 
  | --------- | ------- |
  | **Level**  | **1** |
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

|                  |       |
| ---------------- | ----- |
| **booster factor** | **0** |
^boosterFactor

|                 |         |         | 
| --------------- | ------- | ------- |
| **daily Notes** | *500EP* | **0/2**   |
^dailyNotesChallenge

|                  |          |         | 
| ---------------- | -------- | ------- |
| **weekly Notes** | *2000EP*     |  **0/7**   |
^weeklyNotesChallenge
\`\`\`chart
type: bar
labels: [days done in a row]
series:
  - title: days to do in a row
    data: [0]
  - title: points to earn to level up
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
xTitle: "progress"
legend: false
\`\`\`

| Level | Count |
| :---: | :---: |
| Maturity 5 |\`$=dv.pages().where(p => [5, '5', '5➡️', '5⬇️', '5⬆️'].includes(p.file.frontmatter['note-maturity'])).length\`|
| Maturity 4 |\`$=dv.pages().where(p => [4, '4', '4➡️', '4⬇️', '4⬆️'].includes(p.file.frontmatter['note-maturity'])).length\`|
| Maturity 3 |\`$=dv.pages().where(p => [3, '3', '3➡️', '3⬇️', '3⬆️'].includes(p.file.frontmatter['note-maturity'])).length\`|
| Maturity 2 |\`$=dv.pages().where(p => [2, '2', '2➡️', '2⬇️', '2⬆️'].includes(p.file.frontmatter['note-maturity'])).length\`|
| Maturity 1 |\`$=dv.pages().where(p => [1, '1', '1➡️', '1⬇️', '1⬆️'].includes(p.file.frontmatter['note-maturity'])).length\`|
| Maturity 0 |\`$=dv.pages().where(p => [0, '0', '0➡️', '0⬇️', '0⬆️'].includes(p.file.frontmatter['note-maturity'])).length\`|



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
  { name: 'Temporal Tweaker', incredients: ['20xS1', '10xS6'] },
  { name: 'Perpetual Progress', incredients: ['20xS2', '10xS4'] },
  { name: 'Strategic Synapses', incredients: ['30xS1', '20xS2'] },
  { name: 'Accelerated Acquisition', incredients: ['10xS3', '20xS4'] },
  { name: 'Linkers Lode', incredients: ['30xS2', '10xS1'] },
  { name: 'Effortless Expansion', incredients: ['20xS3', '10xS6'] },
  { name: 'Recursive Reflection', incredients: ['20xS4', '10xS5'] },
  { name: 'Synaptic Surge', incredients: ['20xS2', '10xS1'] },
  { name: 'Inspiration Infusion', incredients: ['20xS7', '10xS1'] },
  { name: 'Title Titan', incredients: ['20xS8', '10xS7'] },
  { name: 'Precision Prism', incredients: ['20xS8', '10xS2'] },
  { name: 'Hyperlink Harmony', incredients: ['20xS2', '10xS6'] },
];

export const listOfUseableBoostersToBeShown = ['Perpetual Progress', 'Title Titan', 'Precision Prism']
export const listOfUseableIngredientsToBeShown = ['Connection Crystal', 'Insight Prism', 'Creative Catalyst', 'Precision Lens']
export const chanceToEarnIngredient = 0.5;

export const elements = [
  { shortName: 'S2', name: 'Connection Crystal', varName: 'connectionCrystal' },
  { shortName: 'S4', name: 'Insight Prism', varName: 'insightPrism' },
  { shortName: 'S7', name: 'Creative Catalyst', varName: 'creativeCatalyst' },
  { shortName: 'S8', name: 'Precision Lens', varName: 'precisionLens' },
  { shortName: 'S1', name: 'Nexus Node', varName: 'nexusNode' },
  { shortName: 'S3', name: 'Mastery Scroll', varName: 'masteryScroll' },
  { shortName: 'S5', name: 'Reflective Essence', varName: 'reflectiveEssence' },
  { shortName: 'S6', name: 'Amplification Crystal', varName: 'amplificationCrystal' }
];

export const boosterRecipes = [
  { boosterUseCountName: 'boosterUseCountTemporalTweaker', boosterRunTime: 0, boosterCooldown: 0, boosterDate: '', boosterSwitch: '', varname: 'temporalTweaker' ,name: 'Temporal Tweaker', incredients: ['20xS1', '10xS6'], description: 'Temporal Tweaker: reset the cooldown phase for a booster your choice' },
  { boosterUseCountName: 'boosterUseCountPerpetualProgress', boosterRunTime: 4*60, boosterCooldown: 36*60, boosterDate: 'boosterDatePerpetualProgress', boosterSwitch: 'boosterFactorPerpetualProgress', varname: 'perpetualProgress' ,name: 'Perpetual Progress', incredients: ['20xS2', '10xS4'], description: 'Perpetual Progress: get 3 times points an all your actions for the next 4 hours. You can use Perpetual Progress every three days, if you have the ingredients to craft it.' },
  { boosterUseCountName: 'boosterUseCountStrategicSynapses', boosterRunTime: 4*60, boosterCooldown: 120*60, boosterDate: 'boosterDateStrategicSynapses', boosterSwitch: 'boosterFactorStrategicSynapses', varname: 'strategicSynapses' ,name: 'Strategic Synapses', incredients: ['30xS1', '20xS2'], description: 'Strategic Synapses: gain 3 times EP for all actions on Map Of Content ratings for the next 4 hours. This booster has a cooldown time of 5 days.' },
  { boosterUseCountName: 'boosterUseCountAcceleratedAcquisition', boosterRunTime: 0, boosterCooldown: 36*60, boosterDate: '', boosterSwitch: '', varname: 'acceleratedAcquisition' ,name: 'Accelerated Acquisition', incredients: ['10xS3', '20xS4'], description: 'Accelerated Acquisition: Use Accelerated Acquisition and collect much faster for the next 12 hours all sorts of ingredients when creating and improving notes' },
  { boosterUseCountName: 'boosterUseCountLinkersLode', boosterRunTime: 3*60, boosterCooldown: 48*60, boosterDate: 'boosterDateLinkersLode', boosterSwitch: 'boosterFactorLinkersLode', varname: 'linkersLode' ,name: 'Linkers Lode', incredients: ['30xS2', '10xS1'], description: 'Linkers Lode: collect extra points when creating chain of thoughts for the next 3 hours. (cooldown 2 days)' },
  { boosterUseCountName: 'boosterUseCountEffortlessExpansion', boosterRunTime: 0, boosterCooldown: 480*60, boosterDate: '', boosterSwitch: '', varname: 'effortlessExpansion' ,name: 'Effortless Expansion', incredients: ['20xS3', '10xS6'], description: 'Effortless Expansion: Cast "Effortless Expansion" and lower the cap to the next level about 20% in the next 5 days. (Cooldown 20 days)' },
  { boosterUseCountName: 'boosterUseCountrEcursiveReflection', boosterRunTime: 5*60, boosterCooldown: 36*60, boosterDate: 'boosterDateRecursiveReflection', boosterSwitch: 'boosterFactorRecursiveReflection', varname: 'recursiveReflection' ,name: 'Recursive Reflection', incredients: ['20xS4', '10xS5'], description: 'Recursive Reflection: Improve your notes and get 5 times the points you get on normal condition for the next 5 hours. Cooldown 3 days.' },
  { boosterUseCountName: 'boosterUseCountSynapticSurge', boosterRunTime: 2*60, boosterCooldown: 36*60, boosterDate: 'boosterDateSynapticSurge', boosterSwitch: 'boosterFactorSynapticSurge', varname: 'synapticSurge' ,name: 'Synaptic Surge', incredients: ['20xS2', '10xS1'], description: 'Synaptic Surge: Link your ideas together, every increase in "linking maturity" pays out 20 times for the next 2 hours.' },
  { boosterUseCountName: 'boosterUseCountInspirationInfusion', boosterRunTime: 0, boosterCooldown: 48*60, boosterDate: '', boosterSwitch: '', varname: 'inspirationInfusion' ,name: 'Inspiration Infusion', incredients: ['20xS7', '10xS1'], description: 'Inspiration Infusion: Increase the frequency to get helpful prompts to power up you personal knowledge management for the next 2 days.' },
  { boosterUseCountName: 'boosterUseCountTitleTitan', boosterRunTime: 3*60, boosterCooldown: 36*60, boosterDate: 'boosterDateTitleTitan', boosterSwitch: 'boosterFactorTitleTitan', varname: 'titleTitan' ,name: 'Title Titan', incredients: ['20xS8', '10xS7'], description: 'Title Titan: Quadro your points when making your note title more to the point expressing the idea of your note for the next 3 hours.' },
  { boosterUseCountName: 'boosterUseCountPrecisionPrism', boosterRunTime: 3*60, boosterCooldown: 36*60, boosterDate: 'boosterDatePrecisionPrism', boosterSwitch: 'boosterFactorPrecisionPrism', varname: 'precisionPrism' ,name: 'Precision Prism', incredients: ['20xS8', '10xS2'], description: 'Precision Prism: 4 times the points when increasing the "note length majurity" for a note the next 3 hours.' },
  { boosterUseCountName: 'boosterUseCountHyperlinkHarmony', boosterRunTime: 3*60, boosterCooldown: 36*60, boosterDate: 'boosterDateHyperlinkHarmony', boosterSwitch: 'boosterFactorHyperlinkHarmony', varname: 'hyperlinkHarmony' ,name: 'Hyperlink Harmony', incredients: ['20xS2', '10xS6'], description: 'Hyperlink Harmony: Get for "Inlink majurity" AND "outlink majurity" improvements 5 times the point the next 3 hours.' },
  { boosterUseCountName: 'boosterUseCountEphemeralEuphoria', boosterRunTime: 2*60, boosterCooldown: 2160*60, boosterDate: 'boosterDateEphemeralEuphoria', boosterSwitch: 'boosterFactorEphemeralEuphoria', varname: 'ephemeralEuphoria' ,name: 'Ephemeral Euphoria', incredients: ['1000xSX'], description: 'Unearth the hidden potential within your knowledge repository with the Ephemeral Euphoria booster. For a fleeting two-hour window, your notes will resonate with an extraordinary vitality, allowing you to earn points at an astonishing rate. Seize this moment of boundless opportunity and watch your knowledge flourish like never before! Be aware, you need in sum 1000 ingrediments to craft, ingrediments will be taken from all pots.' },
  { boosterUseCountName: 'boosterUseCountFortuneInfusion', boosterRunTime: 0, boosterCooldown: 22*60, boosterDate: 'boosterDateFortuneInfusion', boosterSwitch: 'boosterFactorFortuneInfusion', varname: 'fortuneInfusion' ,name: 'Fortune Infusion', incredients: ['free all 22h'], description: "Infuse your knowledge journey with a dash of randomness using the Fortune Infusion booster. Upon activation, you'll receive a randomized amount of valuable ingredients to aid your knowledge crafting endeavors. Sometimes, you'll strike it lucky with a bountiful yield of 10 ingredients, while most of the time, you'll secure a more modest 2. The rarer, the more ingredients you might acquire. Add a twist of unpredictability to your knowledge management strategy and see how your points soar!" },
];

export const badgeLevels: number[] = [5, 10, 20, 27, 35, 42, 50, 60, 75, 82, 90, 100];
export const badgeNames: Badge[] = [
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
export const badgeInitLevels: number[] = [0, 3, 7, 15, 23, 30, 35, 42, 50, 60, 75, 82, 90, 100];
export const badgeNamesInit: Badge[] = [
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

export const badges: Badge[] = [
  { name: "Consistent Lore Weaver", description: "Congratulations! You've woven a tapestry of knowledge for 30 consecutive days. As a 'Consistent Lore Weaver,' your daily contributions have become the threads that enrich the fabric of your growing wisdom.", level: "" },
  { name: "Knowledge Artisan Stalwart", description: "You've forged a robust foundation with 90 consecutive days of dedicated note crafting. As a 'Knowledge Artisan Stalwart,' your commitment has sculpted your repository into a work of art, a testament to your persistent curiosity.", level: "" },
  { name: "Wisdom Architect Virtuoso", description: "With each passing day, you've laid down the blueprints of a profound structure. As a 'Wisdom Architect Virtuoso' at 180 days, your continuous efforts have transformed your knowledge space into an architectural marvel, a testament to your enduring passion for learning.", level: "" },
  { name: "Eternal Scholar Maestro", description: "A year of unwavering dedication! You've earned the title of 'Eternal Scholar Maestro' by contributing daily for 365 days. Your commitment has created a masterpiece of continuous learning, setting you apart as a true maestro of personal knowledge.", level: "" },
  { name: "Divine Omniscience Overlord", description: "Behold the divine! Your unbroken streak of daily contributions for 730 days crowns you as the 'Divine Omniscience Overlord.' Your two-year feat is a testament to your unmatched commitment and the creation of a knowledge empire that stands as a beacon for all seekers.", level: "" },
];
