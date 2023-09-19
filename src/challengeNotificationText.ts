const messagesWeeklyChallenge: string[] = [
	"Seven days of note-taking? You're practically a note ninja turtle now! 🐢📝 [X] points, cowabunga!",
	"You've just completed a week-long note-taking marathon! 🏃‍♂️📝 [X] points earned. Ready for the next lap?",
	"A whole week of notes? You're on fire! 🔥📝 [X] points, keep the spark alive!",
	"Seven notes in seven days - that's like a note symphony! 🎶📝 [X] points, maestro!",
	"You're on a seven-day note-taking fiesta! 🎉📝 [X] points, keep the party going!",
	"Seven days, seven notes - You're like the James Bond of note-taking! 🕶️📝 [X] points, secret agent!",
	"You're officially a 'Note-A-Day' superhero! 🦸‍♂️📝 [X] points, capes optional!",
	"A whole week of notes? You've practically written a mini novel by now! 📚📝 [X] points, author status achieved!",
	"Seven days straight? You're the Usain Bolt of note-taking! 🏃‍♂️📝 [X] points, sprinting towards knowledge!",
	"You're on a seven-day note-taking spree! It's like a notes-plosion! 💥📝 [X] points, keep the fireworks coming!",
	"Seven days, seven notes - you're basically the Michael Jordan of note-taking! 🏀📝 [X] points, slam dunk!",
	"A whole week of notes? You're the note-taking MVP! 🏆📝 [X] points, keep scoring!",
	"You've just unlocked the 'Seven Day Note Fever' achievement! 🌟📝 [X] points, catch the fever!",
	"Seven days, seven notes - you're a note-taking rockstar! 🎸📝 [X] points, keep jammin'!",
	"You're on a seven-day note-taking magic show! Now you see the notes, now you don't! 🎩✨ [X] points, keep the magic alive!",
	"A whole week of notes? You're like a note-taking Jedi Master! 🌌⚔️ [X] points, may the notes be with you!",
	"Seven days straight? You're the Tony Hawk of note-taking! 🛹📝 [X] points, keep shredding!",
	"You're on a seven-day note-taking rollercoaster! Up and down, but always moving forward! 🎢📝 [X] points, enjoy the ride!",
	"Seven days, seven notes - you're a note-taking DJ spinning knowledge beats! 🎧📝 [X] points, drop the knowledge!",
	"You've just conquered the seven-day note-taking challenge! You're the note-taking Indiana Jones! 🏹📝 [X] points, keep exploring!",
	"A whole week of notes? You're the note-taking Sherlock Holmes, solving knowledge mysteries! 🔍📝 [X] points, keep sleuthing!",
	"Seven days, seven notes - you're a note-taking Picasso, creating a masterpiece of knowledge! 🎨📝 [X] points, keep painting!",
	"You're on a seven-day note-taking rocket ship! Destination: Infinite Knowledge! 🚀📝 [X] points, enjoy the journey!",
	"Seven days straight? You're the note-taking MacGyver, turning information into solutions! 🔧📝 [X] points, keep crafting!",
	"You're on a seven-day note-taking safari, exploring the wilds of knowledge! 🐘📝 [X] points, keep exploring!",
	"Seven days, seven notes - you're a note-taking chef, cooking up a knowledge feast! 🍳📝 [X] points, keep cooking!",
	"You've just unlocked the seven-day note-taking badge! You're the note-taking superhero we need! 🦸‍♀️📝 [X] points, keep saving the day!",
	"A whole week of notes? You're the note-taking Lewis and Clark, charting new territories of knowledge! 🗺️📝 [X] points, keep exploring!",
	"Seven days, seven notes - you're a note-taking DJ, dropping beats of wisdom! 🎧📝 [X] points, keep spinning!",
	"You're on a seven-day note-taking treasure hunt, discovering gems of wisdom! 💎📝 [X] points, keep hunting!",
	"Seven days straight? You're the note-taking ninja warrior, conquering the knowledge obstacle course! 🥋📝 [X] points, keep slaying!",
	"You're on a seven-day note-taking rocket ship! Destination: Infinite Knowledge! 🚀📝 [X] points, enjoy the journey!",
	"Seven days, seven notes - you're a note-taking detective, solving cases of curiosity! 🕵️‍♂️📝 [X] points, keep detecting!",
	"You've just unlocked the seven-day note-taking badge! You're the note-taking superhero we need! 🦸‍♂️📝 [X] points, keep saving the day!",
	"A whole week of notes? You're the note-taking pioneer, blazing trails through the forests of information! 🌲📝 [X] points, keep pioneering!",
	"Seven days, seven notes - you're a note-taking DJ, dropping beats of wisdom! 🎧📝 [X] points, keep spinning!",
	"You're on a seven-day note-taking treasure hunt, discovering gems of wisdom! 💎📝 [X] points, keep hunting!",
	"Seven days straight? You're the note-taking ninja warrior, conquering the knowledge obstacle course! 🥋📝 [X] points, keep slaying!",
	"You're on a seven-day note-taking rollercoaster! Up and down, but always moving forward! 🎢📝 [X] points, enjoy the ride!",
	"Seven days, seven notes - you're a note-taking DJ spinning knowledge beats! 🎧📝 [X] points, drop the knowledge!",
	"You've just conquered the seven-day note-taking challenge! You're the note-taking Indiana Jones! 🏹📝 [X] points, keep exploring!",
	"A whole week of notes? You're the note-taking Sherlock Holmes, solving knowledge mysteries! 🔍📝 [X] points, keep sleuthing!",
	"Seven days, seven notes - you're a note-taking Picasso, creating a masterpiece of knowledge! 🎨📝 [X] points, keep painting!",
	"You're on a seven-day note-taking safari, exploring the wilds of knowledge! 🐘📝 [X] points, keep exploring!",
	"Seven days straight? You're the Tony Hawk of note-taking! 🛹📝 [X] points, keep shredding!",
	"You're on a seven-day note-taking rocket ship! Destination: Infinite Knowledge! 🚀📝 [X] points, enjoy the journey!",
	"Seven days, seven notes - you're a note-taking ninja turtle now! 🐢📝 [X] points, cowabunga!",
	"You've just completed a week-long note-taking marathon! 🏃‍♂️📝 [X] points earned. Ready for the next lap?",
	"A whole week of notes? You're on fire! 🔥📝 [X] points, keep the spark alive!",
	"Seven notes in seven days - that's like a note symphony! 🎶📝 [X] points, maestro!"
];

const twoNoteMessages: string[] = [
	"Boom! You just aced the 2-note tango! 🎉 [X] points in the pocket. Keep groovin'!",
	"Two notes in a day? You're officially a Note Ninja! 🥋 [X] points earned. Rock on!",
	"High-five! You've conquered the 2-note rodeo! 🤠 [X] points earned. Yeehaw!",
	"Double trouble! Two notes in one day, you legend! 🌟 [X] points, rockstar!",
	"You're on fire! Two notes in a day - what's your secret weapon? 🔥 [X] points!",
	"Bingo! Two notes in a day! You're on a roll! 🚀 [X] points earned. Keep it up!",
	"Kaboom! You just blew the 2-note challenge out of the water! 💥 [X] points!",
	"You're officially a 2-note superstar! 🌟 [X] points in the bag. Keep shining!",
	"Double up, double down! Two notes in one day - you're a rockstar! 🎸 [X] points!",
	"You've just joined the 2-note party! 🥳 [X] points earned. Let's keep dancing!",
	"Ka-ching! Two notes in a day! You're racking up those points! 💰 [X] earned!",
	"You're a 2-note magician! 🎩✨ [X] points earned. What's your next trick?",
	"Two notes? Nailed it! You're on a roll! 🌟 [X] points earned. Keep it going!",
	"Abra-cadabra! Two notes appear! 🎩✨ [X] points earned. Keep the magic alive!",
	"Double trouble, double the fun! Two notes in one day! 🎉 [X] points, superstar!",
	"You've just unlocked the 2-note achievement! 🌟 [X] points earned. Keep soaring!",
	"Woo-hoo! Two notes in a day! You're on fire! 🔥 [X] points, keep it up!",
	"You're a 2-note wizard! ✨🔮 [X] points earned. What's your next spell?",
	"Double the notes, double the awesomeness! 🌟 [X] points, rockstar!",
	"You've just kicked the 2-note challenge out of the park! ⚾ [X] points!",
	"Boom! You just conquered the 2-note challenge! 🎉 [X] points, superstar!",
	"Double the notes, double the celebration! 🥳 [X] points earned. Party on!",
	"You're a 2-note maestro! 🎵 [X] points in the pocket. Keep the music playing!",
	"Kaboom! Two notes in a day! You're on a roll! 🚀 [X] points earned. Keep it up!",
	"You've just joined the 2-note fiesta! 🥳 [X] points earned. Let's keep dancing!",
	"Zap! You've just electrified the 2-note challenge! ⚡ [X] points, rockstar!",
	"Double notes, double the sparkle! 🌟 [X] points earned. Keep shining bright!",
	"You're a 2-note dynamo! 💥 [X] points earned. What's your next explosion?",
	"Kaboom! Two notes in a day! You're on fire! 🔥 [X] points, keep it up!",
	"You've just unlocked the 2-note achievement! 🌟 [X] points earned. Keep soaring!",
	"Woo-hoo! Two notes in a day! You're on a roll! 🎉 [X] points, keep it up!",
	"You're a 2-note wizard! ✨🔮 [X] points earned. What's your next spell?",
	"Double the notes, double the awesomeness! 🌟 [X] points, rockstar!",
	"You've just kicked the 2-note challenge out of the park! ⚾ [X] points!",
	"Boom! You just conquered the 2-note challenge! 🎉 [X] points, superstar!",
	"Double the notes, double the celebration! 🥳 [X] points earned. Party on!",
	"You're a 2-note maestro! 🎵 [X] points in the pocket. Keep the music playing!",
	"Zap! You've just electrified the 2-note challenge! ⚡ [X] points, rockstar!",
	"Double notes, double the sparkle! 🌟 [X] points earned. Keep shining bright!",
	"You're a 2-note dynamo! 💥 [X] points earned. What's your next explosion?",
	"Kapow! Two notes in a day - you're a superhero! 🦸‍♂️ [X] points!",
	"You're a 2-note legend! 🌟 [X] points earned. What's your next adventure?",
	"Bingo! Two notes in a day! You're on a roll! 🚀 [X] points, keep it up!",
	"You're a 2-note wizard! ✨🔮 [X] points earned. What's your next spell?",
	"Double the notes, double the awesomeness! 🌟 [X] points, rockstar!",
	"You've just kicked the 2-note challenge out of the park! ⚾ [X] points!",
	"Boom! You just conquered the 2-note challenge! 🎉 [X] points, superstar!",
	"Double the notes, double the celebration! 🥳 [X] points earned. Party on!",
	"You're a 2-note maestro! 🎵 [X] points in the pocket. Keep the music playing!",
	"Zap! You've just electrified the 2-note challenge! ⚡ [X] points, rockstar!",
	"Double notes, double the sparkle! 🌟 [X] points earned. Keep shining bright!",
	"You're a 2-note dynamo! 💥 [X] points earned. What's your next explosion?"
];


export function getRandomMessageWeeklyChallenge(points: number): string {
	const randomIndex = Math.floor(Math.random() * messagesWeeklyChallenge.length);
	const message = messagesWeeklyChallenge[randomIndex];
	return message.replace("[X]", points.toString());
}


export function getRandomMessageTwoNoteChallenge(points: number): string {
	const randomIndex = Math.floor(Math.random() * twoNoteMessages.length);
	const message = twoNoteMessages[randomIndex];
	return message.replace("[X]", points.toString());
}

// Example usage
// const randomPoints = 100; // Replace with your actual points value
// const randomMessage = getRandomMessageWeeklyChallenge(randomPoints);
// console.log(randomMessage);


