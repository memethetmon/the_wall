var users = require('./../controllers/user.js');
var topics = require('./../controllers/topic.js');

module.exports = function(app) {
	// --------------User routes--------------------
	app.post('/users', users.login);
	app.get('/users/:id', users.showProfile);
	app.post('/users/topic', users.countTopics);
	app.post('/users/answer', users.countAnswers);
	app.post('/users/comment', users.countComments);

	// --------------Topic routes-------------------
	app.post('/topics', topics.createTopic);
	app.get('/topics', topics.getTopics);
	app.get('/topics/:id', topics.showTopic);
	app.post('/topics/:id/answer', topics.createAnswer);
	app.post('/topics/:id/upVote', topics.upVote);
	app.post('/topics/:id/downVote', topics.downVote);
	app.post('/topics/:tid/:aid', topics.createComment);
}