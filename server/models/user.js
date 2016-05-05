var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
	name: String,
	topics: {type: Number, default: 0},
	answers: {type: Number, default: 0},
	comments: {type: Number, default: 0}
});

mongoose.model('User', UserSchema);