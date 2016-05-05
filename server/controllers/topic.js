var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');

module.exports = (function() {
	return {
		createTopic: function(req, res) {
			var topic = new Topic(req.body);
			// console.log(topic);
			topic.save(function(err) {
				if(err)
					console.log(err);
				res.json(true);
			})
		},
		getTopics: function(req, res) {
			Topic.find({}).populate("user answers.user").exec(function(err, topics) {
				if(err)
					console.log(err);
				res.json(topics);
			})
		},
		showTopic: function(req, res) {
			Topic.findOne({_id: req.params.id}).populate("user answers.user answers.comments.user").exec(function(err, topic) {	
				if(err)
					console.log(err);
				res.json(topic);
			})
		},
		createAnswer: function(req, res) {
			Topic.findOne({_id: req.params.id}, function(err, topic) {
				topic.answers.push(req.body);

				topic.save(function (err) {
					if(err) console.log(err);
					else
						// Answer.find({topic_id: data.topic_id}, function(err, data) {
						// 	console.log(data);
						// 	if(err) console.log(err);
						// 	else res.json(data);
						res.json(true);
				})
			})
		},
		createComment: function(req, res) {
			Topic.findOne({_id: req.params.tid}, function(err, topic) {
				if(err) console.log(err);
				else {
					var answer = topic.answers.id(req.params.aid);
					answer.comments.push(req.body);
					topic.save(function (err) {
						// console.log(topic);
						if(err) console.log(err);
						else {
							// Comment.find({answer_id: data.answer_id}, function(err, data) {
							// 	if(err) console.log(err);
							// 	else res.json(data);
							res.json(true);
						}
					})
				}
			})
		},
		upVote: function(req, res) {
			Topic.findOne({_id: req.params.id}, function(err, topic) {
				if(err) console.log(err);

				var answer = topic.answers.id(req.body._id);

				answer.upVote++;

				topic.save(function(err) {
					if(err) console.log(err);
					res.json(true);
				})
			})
		},
		downVote: function(req, res) {
			Topic.findOne({_id: req.params.id}, function(err, topic) {
				if(err) console.log(err);

				var answer = topic.answers.id(req.body._id);

				answer.downVote++;

				topic.save(function(err) {
					if(err) console.log(err);
					res.json(true);
				})
			})
		}
	}
})();