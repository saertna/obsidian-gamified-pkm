export const FIRST_TIME = `
Imagine transforming your knowledge management into an adventure where every step forward is a celebration. Introducing the Obsidian Gamification Plugin – a tool designed to harness the motivating power of game techniques and apply it to our pursuit of knowledge.

This plugin reimagines the way we interact with our knowledge base. By integrating game-like elements, it offers rewards for your progress, nurtures consistency, and makes the journey of learning a truly motivating experience. From achieving milestones to conquering challenges that shape your learning path, this plugin adds a layer of excitement to your knowledge management process.

Thank you & Enjoy!
`;

export const RELEASE_NOTES: { [k: string]: string } = {
  Intro: `After each update you'll be prompted with the release notes. You can disable this in plugin settings.

I develop this plugin as a hobby, spending my free time doing this. If you find it valuable, then please say THANK YOU or...

<div class="ex-coffee-div"><a href="https://ko-fi.com/andreastrebing"><img src="https://cdn.ko-fi.com/cdn/kofi3.png?v=3" height=45 alt="Support me on Ko-fi (https://ko-fi.com/andreastrebing)"></a></div>

It would mean a lot to me.
`,
"0.0.93": `
Special shout out for lulunac27a, who stayed tuned and asked to enable the new boosters and ingredients. 
## New
- Introducing new boosters and ingredients when reaching certain level

<div class="gPKM-videoWrapper">
  <div>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/SK7pYCiXTFs?si=xAwKfg_x0IR_w_Sr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  </div>
</div>

<!-- Add a blank line here -->
`,
"0.0.92": `
## Fixed
- when starting obsidian plugin not loading correctly [#77](https://github.com/saertna/obsidian-gamified-pkm/issues/77)
`,
"0.0.91": `
## New
- Profile is transferred to right side leaf
  - Enable through settings or with command 'Open Profile Leaf'
  - Set a picture from vault as Avatar Profile picture
  - adjust in Settings with Color Picker bar colors to layout
  
<div class="gPKM-videoWrapper">
  <div>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/S8SZ2iUeiUg?si=yZeUGEBSFyj7_MnS" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  </div>
</div>

<!-- Add a blank line here -->
  
## Changed
- In Dataview plugin Settings 'Inline Queries', 'JavaScript Queries' and 'Inline JavaScript Queries' can be disabled. They are not needed anymore to display the maturity count table. 
- Avatar Markdown File is obsolete and is not actualized anymore
- Badges are not shown anymore. They are still saved and be shown again in a later release
- In- and Out-Links will be counted with Dataview when Dataview is installed
`,
"0.0.90": `
## New
- added an avatar picture field (contribution goes to the obsidian-avatar plugin from froehlichA). When creating the avatar page it will be there. Bellow the code how to exchange in existing profile pages.

<div class="gPKM-videoWrapper"><div>
<iframe width="560" height="315" src="https://www.youtube.com/embed/BOc5jzh_WtM?si=861K3FNrfAu0jJNI" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div></div>

Replace the first table and bar graph with this and you get the new layout. (don't worry, the data will update with the next received points):
\`\`\`
\`\`\`gamification-avatar
image: 
description: |-2
    |           |         |
    | --------- | ------- |
  | **Level**  | **0** |
  | Points | 0    |
  ^levelAndPoints
  \`\`\`chart
  type: bar
  labels: [Experience]
  series:
    - title: points reached
      data: [0]
    - title: points to earn to level up
      data: [1000]
  xMin: 0
  xMax: 1000
  tension: 0.2
  width: 70%
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

`,
"0.0.89": `
## New
- Introduction to Release Note showcase
- Added automatic triggering of rate, can be enabled in settings
- booster factor is not going below a multiple of 5. Means, whenever you reach a multiple of 5, it's a secured milestone.
- inform about booster factor milestone achievement`,
"0.0.88":`
## Changed 
- Support more levels, up to 200, and fix incorrect calculations
- Make layer 2 and layer 3 in 'progressive summarization' score more accurate`,
"0.0.87":`
## New 
- check for new available version`,
"0.0.86":`
## New 
- support for mobile devices`,
"0.0.85":`
## New 
- Store received Badges for recover possibility`,
"0.0.84":`
## Improved 
- Formatting booster board by`,
"0.0.8":`
## Start 
- First Release for the gamified personal knowledge management in Obsidian!`,
};
