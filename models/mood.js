const mongoose = require("mongoose");

const moodSchema = mongoose.Schema({
	date: String,
	mood: String,
});

const Mood = mongoose.model("Mood", moodSchema);

module.exports = Mood;

/* POSSIBLE MOODS:
"excited" (yellow)
"happy" (green)
"neutral" (gray)
"sad" (blue)
"depressed" (purple)
"angry" (red)
"anxious" (orange)
*/