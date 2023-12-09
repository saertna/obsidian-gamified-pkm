# obsidian-gamified-pkm

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/J3J6DYYS5)

## **🌟 Elevate Your Knowledge Management with the Obsidian Gamification Plugin! 🚀**

Hello, fellow learners and knowledge seekers! 📚 If you're as passionate about personal growth as I am, and you believe that motivation is the key to unlocking new horizons, then you're in for something special.

[find the manual installation advice here](https://github.com/saertna/obsidian-gamified-pkm#manual-installation)

## Hey there! 👋 
Imagine transforming your knowledge management into an adventure where every step forward is a celebration. Introducing the Obsidian Gamification Plugin – a tool designed to harness the motivating power of game techniques and apply it to our pursuit of knowledge.

This plugin reimagines the way we interact with our knowledge base. By integrating game-like elements, it offers rewards for your progress, nurtures consistency, and makes the journey of learning a truly motivating experience. From achieving milestones to conquering challenges that shape your learning path, this plugin adds a layer of excitement to your knowledge management process.

The purpose of this plugin is, to support you to foster you personal knowledge. The principle idea is, when you increase you knowledge, think about your surrounding, you work, your personal life and connect your ideas, this will feed with a positive impact back to society. This is a big thing to say and still I believe in. It's independent if you do your knowledge management to increase your own good in the market, for charity or else. When brought more thought into what you do, it will get better in one way or another. Personal knowledge management is paying out after some time, and this plugin will help you bridge the time till then. It generates fun and excitement and keeps motivation high, also after your pkm is paying out.

**Why Support on Ko-Fi is Vital?**

I'm the creator behind this venture, and I'm genuinely thrilled to share it with you all. Building and refining this plugin is a commitment that requires resources. By showing your support on Ko-Fi, you're directly contributing to:

- **Enhancing Motivational Techniques:** Your contributions enable me to refine the plugin, introduce new motivational features, and enhance the overall user experience based on your insights.

- **Expanding the Experience:** More challenges, more opportunities! With your support, I can craft diverse quests and challenges that cater to various learning paths and interests.

- **Sustaining Continuous Progress:** Just like life itself, this plugin is a journey. Your support ensures that it receives regular updates, improvements, and remains aligned with the latest advancements.

🎉 **How Can You Contribute?**

If you resonate with the idea of infusing motivational game techniques into personal development, consider fueling my motivation with a virtual coffee on Ko-Fi. Your support plays a significant role in unlocking the full potential of this plugin!

👉 [![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/J3J6DYYS5)

Thank you for being a part of this movement to revolutionize our approach to knowledge management. Let's harness the power of motivation and level up our learning journey together! 🌐🌱

## Manual installation

1. Download the latest release 🔗 **Plugin Download:** [Obsidian Gamification Plugin](https://github.com/saertna/obsidian-gamified-pkm/releases/tag/0.0.85)
2. Extract the obsidian-gamified-pkm folder from the zip to your vault's plugins folder: `<vault>`/.obsidian/plugins/
 - Note: On some machines the .obsidian folder may be hidden. On MacOS you should be able to press Command+Shift+Dot to show the folder in Finder.
 - Note: the files `main.js` and `manifest.json` are the files which you need in this folder.
3. Reload Obsidian
4. If prompted about Safe Mode, you can disable safe mode and enable the plugin.
5. plugins needed to be installed
 -  `dataview`. In dataview settings enable `Enable JavaScript Queries` and `Enable Inline JavaScript Queries` to display counting in profile.
 -  `obsidian-charts`
6. in Obsidian hit `CTRL+P` and run command `Initialize gamification ratings`
7. create and improve notes and rate again to increase points

**Embark on a Motivational Journey!**

### Additional config informations

In some cases the same vault is used vor other activities as well an the knowledge management shall stay separated. Then you can exclude #tags and/or folders, which shall not be used when initialized. By default the folder 'Excalidraw' is entered. You can ignore this setting if you want to use all files in you vault for you pkm.
![Settings for exclude TAGs and folders](/docs/images/SettingsExcludeTagsFolders.png)

## Getting Started

### initialise game

When not already done during installation, hit `CTRL+P` and run command `Initialize gamification ratings`. This command will create you profile, rate you existing notes and give you a starting level. On the profile you can get informations to you current level, points, badges and see the distribution of you note maturitys. 

![Gamification Initialization Command](/docs/images/GamificationInitializationCommand.png)

### next steps

create a new note and use the plant-icon on the side or `CTRL+P` and ran command `Rate note maturity`.
![Rate Note First Time](/docs/images/RateNoteFirstTime.png)

work on an existing note, improve you thougts, you title, link it to other fitting notes and run `CTRL+P` and ran command `Rate note maturity`, or use the plant-icon.
![Rate again after improving](/docs/images/RateAfterImprovement.png)

## More information and Help
You can use the Discussion Area here at GitHub to speak about issues, ideas and ask questions. For issues, use the issues area to raise them.

## Roadmap
Upcoming developments are in store for the Gamification Plugin! Here's a glimpse into the future:

- further metrics to generate points
	- points for index/MOC creation & quality levels
	- points for chain of thoughts
- overview in sidebar for game elements
	- challenge status
	- active boosters
	- crafted boosters
	- ingredients overview
- boosters
	- icons and full names for ingredients to craft
	- icons for booster potions
	- additional boosters
- badges
	- link to open-badges
	- add further badges for achievements
- implement check if update of plugin is available
- new challenges
- Quests to follow and fulfill