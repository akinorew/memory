const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

const Score = new Schema({
	name: String,
	score: Number,
});

module.exports = Mongoose.model('Score', Score);
