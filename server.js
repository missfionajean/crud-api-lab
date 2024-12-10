/* ----------------------------------------------------------- */
/* -------------------------- Modules ------------------------ */
/* ----------------------------------------------------------- */

const dontenv = require("dotenv");
dontenv.config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const Mood = require("./models/mood.js");

const cors = require("cors");
app.use(cors());

/* ----------------------------------------------------------- */
/* ------------------------- Middleware ---------------------- */
/* ----------------------------------------------------------- */

app.use(express.json());

/* ----------------------------------------------------------- */
/* -------------------------- Database ----------------------- */
/* ----------------------------------------------------------- */

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
	console.log(`Connected to database: ${mongoose.connection.name}`);
});

/* ----------------------------------------------------------- */
/* --------------------------- Server ------------------------ */
/* ----------------------------------------------------------- */

const PORT = 3000;

app.listen(PORT, () => {
	console.log("Server connection established!");
});

/* ----------------------------------------------------------- */
/* --------------------------- Routes ------------------------ */
/* ----------------------------------------------------------- */

app.post("/moods", async (req, res) => {
	const newMood = await Mood.create(req.body);
	res.json(newMood);
});

app.get("/moods", async (req, res) => {
	const allMoods = await Mood.find();
	res.json(allMoods);
});

app.put("/moods/:moodId", async (req, res) => {
	const updatedMood = await Mood.findByIdAndUpdate(
		req.params.moodId,
		req.body,
		{ new: true }
	);
	res.json(updatedMood);
});

app.delete("/moods/:moodId", async (req, res) => {
	const deletedMood = await Mood.findByIdAndDelete(req.params.moodId);
	res.json(deletedMood);
});
