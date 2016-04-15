var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
	name: String,
	topics: [{type: mongoose.Schema.Types.Mixed, ref: "Topic"}]
});

mongoose.model('User', UserSchema);