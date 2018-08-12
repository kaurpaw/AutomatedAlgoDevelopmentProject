'use strict';

var app = angular.module('AutomatedAlgoApp.Home', []);

app.controller('HomeController', function($scope, $rootScope, $location,
		StaticService, CommonService, TeamService, NotificationService) {
	$scope.header = 'Welcome to Home Page.';
	
});