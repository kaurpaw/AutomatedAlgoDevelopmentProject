'use strict';
var app = angular.module('AutomatedAlgoApp', [ 'ngRoute',
		'AutomatedAlgoApp.Home', 'AutomatedAlgoApp.Registration',
		'AutomatedAlgoApp.Logout', 'AutomatedAlgoApp.Login',
		'AutomatedAlgoApp.Team', 'AutomatedAlgoApp.TransferList',
		'AutomatedAlgoApp.ViewTeams', 'AutomatedAlgoApp.ViewUsers',
		'AutomatedAlgoApp.EditTeam', 'AutomatedAlgoApp.CreatePlayer',
		'Services.CommonService', 'Services.PlayerService',
		'Services.RoleService', 'Services.StaticService',
		'Services.TeamService', 'Services.UserService',
		'Services.NotificationService' ]);

app.directive('userHeader', function() {
	return {
		restrict : 'E',
		templateUrl : 'resources/pages/userHeader.html'
	};
});

app.directive('adminHeader', function() {
	return {
		restrict : 'E',
		templateUrl : 'resources/pages/adminHeader.html'
	};
});

app.config(function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl : 'resources/pages/index.html',
		controller : 'HomeController'
	}).when('/login', {
		templateUrl : 'resources/pages/login.html',
		controller : 'LoginController'
	}).when('/register', {
		templateUrl : 'resources/pages/signUp.html',
		controller : 'RegistrationController'
	}).when('/createProject', {
		templateUrl : 'resources/pages/addProject.html',
		controller : 'CreateProjectController'
	}).otherwise({
		redirectTo : '/home'
	});
});
