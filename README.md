# obsidian-gamified-pkm

## **🌟 Elevate Your Knowledge Management with the Obsidian Gamification Plugin! 🚀**

Hello, fellow learners and knowledge seekers! 📚 If you're as passionate about personal growth as I am, and you believe that motivation is the key to unlocking new horizons, then you're in for something special.

## Hey there! 👋 
Imagine transforming your knowledge management into an adventure where every step forward is a celebration. Introducing the Obsidian Gamification Plugin – a tool designed to harness the motivating power of game techniques and apply it to our pursuit of knowledge.

This plugin reimagines the way we interact with our knowledge base. By integrating game-like elements, it offers rewards for your progress, nurtures consistency, and makes the journey of learning a truly motivating experience. From achieving milestones to conquering challenges that shape your learning path, this plugin adds a layer of excitement to your knowledge management process.

The purpose of this plugin is to support you to foster your personal knowledge. The principal idea is to have a positive impact on society by connecting ideas across your knowledge, work, and personal life through better thinking. This is a big thing to say, and I still believe in it. This is relevant whether your knowledge management is for personal improvement, for business reasons or for charity. With better thinking comes better outcomes. Personal knowledge management takes time to pay out, and this plugin will help you bridge the time till then. It generates fun and excitement, maintaining high motivation even long after your PKM has started to provide returns on the time you've invested.

**Why Support on Ko-Fi is Vital?**

I'm the creator behind this venture, and I'm genuinely thrilled to share it with you all. Building and refining this plugin is a commitment that requires resources. By showing your support on Ko-Fi, you're directly contributing to:

- **Enhancing Motivational Techniques:** Your contributions enable me to refine the plugin, introduce new motivational features, and enhance the overall user experience based on your insights.

- **Expanding the Experience:** More challenges, more opportunities! With your support, I can craft diverse quests and challenges that cater to various learning paths and interests.

- **Sustaining Continuous Progress:** Just like life itself, this plugin is a journey. Your support ensures that it receives regular updates, improvements, and remains aligned with the latest advancements.

🎉 **How Can You Contribute?**

If you resonate with the idea of infusing motivational game techniques into personal development, consider fueling my motivation with a virtual coffee on Ko-Fi. Your support plays a significant role in unlocking the full potential of this plugin!

👉 [![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/J3J6DYYS5)

Thank you for being a part of this movement to revolutionize our approach to knowledge management. Let's harness the power of motivation and level up our learning journey together! 🌐🌱

## Installation
Follow the steps below to install 'Gamificate your PKM'.

1. Search for "Gamificate your PKM" in Obsidian's community plugins browser
2. Enable the plugin in your Obsidian settings (find "Gamificate your PKM" under "Community plugins").
3. Check the settings. Maybe you would like to exclude TAGs (more about it below).
4. The plugin needed to be installed and enabled to be fully operational 
  -  `dataview` for the number of notes in specified note maturity (0-5)
5. In Obsidian, hit `CTRL+P` and run the command `Initialize gamification ratings`
6. Create and improve notes and rate them again to increase points

**Embark on a Motivational Journey!**

### Additional config informations

In some cases, the same vault is used for other activities as well as the knowledge management shall stay separated. Then you can exclude #tags and/or folders, which shall not be used when initialized. By default, the folder 'Excalidraw' is entered. You can ignore this setting if you want to use all files in your vault for your pkm.
![Settings for exclude TAGs and folders](/docs/images/SettingsExcludeTagsFolders.png)

## Getting Started

### Initialise game

When not already done during installation, hit `CTRL+P` and run the command `Initialize gamification ratings`. 
This command will rate all you notes (the ones which are not excluded by TAG and/or folder). You will be informed when the initialisation is finished.
The resulting points, level, and distribution of note ratings will be displayed in the leaf. When the leaf is not open, you can open it with the command `Open Profile Leave`.

![Gamification Initialization Command](/docs/images/GamificationInitializationCommand.png)

### Next steps

Create a new note and use the plant-icon on the side or `CTRL+P` or and the command `Rate note maturity`.
![Rate Note First Time](/docs/images/RateNoteFirstTime.png)

work on an existing note, improve your thoughts, your title, link it to other fitting notes, and run `CTRL+P` and run the command `Rate note maturity`, or use the plant-icon.
![Rate again after improving](/docs/images/RateAfterImprovement.png)

### Boosters

When you have progressed for a while (rated several new notes) boosters will be enabled. You will be informed with a message when you have archived them. 
The boosters can be opened with the `test tube` icon or with the command `Open booster pallete`. (When you don't like to see the icon, all icons can be controlled directly in Obsidian if they shall be shown or not. Just do a right click on the icon area.)
Rating of a new note will bring you a chance to collect ingredients, with which you can craft boosters to speed up your progress.

![Booster Menu](docs/images/GamificteYourPKM-Boosters.png)

For each booster you can display a description by using the `?` button, or just hoovering above the icon. Hoovering with the mouse over the ingredient icon will show also show its name.

### Ractings

There are four rating categorties with which your note will be rated
- title
- note length
- inklinks
- outlinks
  Out of this four categories, an overall rating will be calculated (`note-maturity`).

The ratings are based on statistics, so it's a pure calculation. There's no reflection on the content itself.

###### Title
A very short or a very long title (filename) will get a low rating. When you have a meaningful and to the point title expressing the core of your thought, the title will have a certain range of length. This leads to a high rating.
On the other hand, when you need a long title to express what's your note about, you should work at it to increase the rating.

This said, when you feel pretty fine with your title, but it's a low rating, don't mind and keep it as it is. The rating is based on character length, not content.

###### Note length / summarization

A very short note (a sentence) get's a low rating. A long text about several pages will get a low rating as well.
A note which has roughly the length of an A5 index card will get a high rating.
###### Inklinks
A good amount of links from other notes to the rated one will increase the rating. Overlinking will decrease it.

(It's on the roadmap to deal with Hub/MOC notes which have by nature high link numbers)
###### Outlinks
A good amount of links from the rated one to  other notes will increase the rating. Overlinking will decrease it.

(It's on the roadmap to deal with Hub/MOC notes which have by nature high link numbers)


## More information and Help
You can use the Discussion Area here at GitHub to speak about issues, ideas, and ask questions. For issues, use the issues area to raise them.

## Roadmap
Upcoming developments are in store for the Gamification Plugin! Here's a glimpse into the future:

- further metrics to generate points
	- points for index/MOC creation & quality levels
	- points for the chain of thoughts
- overview in the sidebar for game elements
	- Challenge status
	- active boosters
- boosters
	- additional boosters
- badges
	- link to open-badges
	- Add further badges for achievements
- new challenges
- Quests to follow and fulfill
