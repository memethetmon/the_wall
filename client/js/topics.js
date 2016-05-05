angular.module('discussionBoard')
	.controller("TopicsController", TopicsController)
	.controller("TopicDetailsController", TopicDetailsController)
	.factory("TopicFactory", TopicFactory)

function TopicsController (TopicFactory, UserFactory, $scope, $location, $routeParams) {
	$scope.currentUser = UserFactory.getCurrentUser();
  	if(!$scope.currentUser){
    	$location.path('/');
	}
	// console.log($routeParams);
	
	// $scope.topic = [];
	// $scope.category = ['Ruby on Rails', 'MySQL', 'UX', 'Web Development'];
	
	TopicFactory.getTopics(function(response) {
		$scope.topics = response.data;
		// console.log($scope.topics);
	})

	$scope.createTopic = function(newTopic) {
		newTopic.user = $scope.currentUser;

		TopicFactory.createTopic(newTopic, function() {
			// console.log(topic.user);
			alert("Topic successfully added!");
			$scope.newTopic = {};

			TopicFactory.getTopics(function(response) {
				$scope.topics = response.data;
				// console.log($scope.topics);
			})
		})
	}
}
function TopicDetailsController($scope, UserFactory, TopicFactory, $location, $routeParams) {
	$scope.currentUser = UserFactory.getCurrentUser();
  	if(!$scope.currentUser){
    	$location.path('/');
	}
	TopicFactory.showTopic($routeParams.id, function(response) {
		$scope.topic = response.data;
		// console.log($scope.topic);
	})

	$scope.createAnswer = function(answer) {
		answer.user = $scope.currentUser;
		// console.log(answer);

		TopicFactory.createAnswer($routeParams.id, answer, function() {
			$scope.newAnswer = {};
			// $location.path('/topics/' + $routeParams.id + '/answer');
			TopicFactory.showTopic($routeParams.id, function(response) {
				$scope.topic = response.data;
			})
		})
	}
	
	$scope.createComment = function(new_comment, topic, answer, callback) {
		new_comment.user = $scope.currentUser;
		// console.log(new_comment.user.name);
		TopicFactory.createComment(new_comment, topic, answer, function() {
			// $location.path('/topics/' + $routeParams.id);
			TopicFactory.showTopic($routeParams.id, function(response) {
				$scope.topic = response.data;
				// console.log($scope.topic);
			})
		})
	}
	$scope.upVote = function(answer) {
		// console.log('upvote button pressed for ', answer);
		TopicFactory.upVote($routeParams.id, answer, function() {
			// console.log('upvote factory callback');
			TopicFactory.showTopic($routeParams.id, function(response) {
				$scope.topic = response.data;
			})
		})
	}
	$scope.downVote = function(answer) {
		TopicFactory.downVote($routeParams.id, answer, function() {
			TopicFactory.showTopic($routeParams.id, function(response) {
				$scope.topic = response.data;
			})
		})
	}
}

function TopicFactory($http) {
	var Topic = {};

	Topic.getTopics = function(callback) {
		$http.get('/topics').then(callback);
	}

	Topic.createTopic = function(topic, callback) {
		$http.post('/users/topic', topic.user);
		$http.post('/topics', topic).then(callback);
	}

	Topic.showTopic = function(id, callback) {
		$http.get('/topics/' + id).then(callback);
	}

	Topic.createAnswer = function(id, answer, callback) {
		$http.post('/users/answer', answer.user);
		$http.post('/topics/' + id + '/answer' , answer).then(callback);
	}

	Topic.createComment = function(comment, tid, aid, callback) {
		$http.post('/users/comment', comment.user);
		$http.post('/topics/' + tid + '/' + aid, comment).then(callback);
	}

	Topic.upVote = function(id, answer, callback) {
		$http.post('/topics/' + id + '/upVote', answer).then(callback);
	}

	Topic.downVote = function(id, answer, callback) {
		$http.post('/topics/' + id + '/downVote', answer).then(callback);
	}

	return Topic;
}