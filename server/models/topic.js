var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comments = new mongoose.Schema({
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	comment: String
});

var Answers = new mongoose.Schema({
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	answer: String,
	upVote: {type: Number, default: 0},
	downVote: {type: Number, default: 0},
	comments: [Comments]
});

var TopicSchema = new mongoose.Schema({
	// name: String,
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	category: String,
	topic: String,
	description: String,
	created_at: {type: Date, default: Date.now},
	answers: [Answers]
});

mongoose.model('Topic', TopicSchema);