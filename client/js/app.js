var app = angular.module('discussionBoard', ['ngRoute'])
	.config(function ($routeProvider) {
		$routeProvider
		.when("/", {
			templateUrl: "/partials/login.html",
			controller: "UserController"
		})
		.when("/dashboard", {
			templateUrl: "/partials/topics.html",
			controller: "TopicsController"
		})
		.when("/topic/:id", {
			templateUrl: "/partials/showTopic.html",
			controller: "TopicDetailsController"
		})
		.when("/user/:id", {
			templateUrl: "/partials/userProfile.html",
			controller: "UserController"
		})
		.otherwise('/')
	})