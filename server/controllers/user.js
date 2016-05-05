var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function() {
	return {
		login: function(req, res) {

			User.findOne({name: req.body.name}, function(err, user) {
				if(err)
					console.log(err);
				else if(user)
					res.json(user);
				else {
					var newUser = new User(req.body);
					newUser.save(function(err) {
						if(err)
							console.log(err);
						else
							res.json(newUser);
					})
				}
			})
		},
		showProfile: function(req, res) {
			User.findOne({_id: req.params.id}, function(err, user) {
				if(err)
					console.log(err);
				res.json(user);
			})
		},
		countTopics: function(req, res) {
			User.findOne({_id: req.body._id}, function(err, user) {
				if(err)
					console.log(err);
				user.topics++;
				console.log("counting topic", user);
				user.save(function(err) {
					if(err)
						console.log(err);
					else
						res.json(true);
				})
			})
		},
		countAnswers: function(req, res) {
			User.findOne({_id: req.body._id}, function(err, user) {
				if(err)
					console.log(err);
				user.answers++;
				user.save(function(err) {
					if(err)
						console.log(err);
					else
						res.json(true);
				})
			})
		},
		countComments: function(req, res) {
			User.findOne({_id: req.body._id}, function(err, user) {
				if(err)
					console.log(err);
				user.comments++;
				user.save(function(err) {
					if(err)
						console.log(err);
					else
						res.json(true);
				})
			})
		}
	}
})();