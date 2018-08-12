'use strict';

var app = angular.module('AutomatedAlgoApp.Home', []);

app.controller('HomeController', function($scope, $rootScope, $location,
		StaticService, CommonService, TeamService, NotificationService) {
	$scope.header = 'Welcome to Home Page.';
	/*$rootScope.authenticated=true;
	if (!$rootScope.authenticated) {
		$location.path('/login');
	}*/
	$scope.admin = $rootScope.admin;

	$scope.getAllCountries = function() {
		StaticService.getAllCountries().then(function(response) {
			CommonService.countries = response.data;
			console.log(response.data);
		}, function(error) {
			swal('Unable to load countries : ' + error.data.message);
		});
	}
	$scope.getAllCountries();

	$scope.getAllPlayerTypes = function() {
		StaticService.getAllPlayerTypes().then(function(response) {
			CommonService.playerTypes = response.data;
			console.log(response.data);
		}, function(error) {
			swal('Unable to load PlayerTypes : ' + error.data.message);
		});
	}
	$scope.getAllPlayerTypes();

	$scope.loadTeam = function() {
		TeamService.getTeam().then(function(response) {
			CommonService.setTeam(response.data);
		}, function(error) {
			swal('Unable to load Team details : ' + error.data.message);
		});
	}
	$scope.loadTeam();
	
	$scope.getNotifications = function() {
		NotificationService.getNotifications().then(function(response) {
			$scope.notifications = response.data;
		}, function(error) {
			swal('Unable to get notifications : ' + error.data.message);
		});
	}
	$scope.getNotifications();

	$scope.markItRead = function(id) {
		NotificationService.markItRead(id).then(function(response) {
			var notification = $scope.notifications.filter(x => x.id === id);
			notification[0].seen = true;
		}, function(error) {
			swal('Unable to mark notification read : ' + error.data.message);
		});
	}
	
	$scope.markItUnRead = function(id) {
		NotificationService.markItUnRead(id).then(function(response) {
			var notification = $scope.notifications.filter(x => x.id === id);
			notification[0].seen = false;
		}, function(error) {
			swal('Unable to mark notification unread : ' + error.data.message);
		});
	}

	$scope.getAllTeams = function() {
		TeamService.getAllTeams().then(function(response) {
			CommonService.setAllTeams(response.data); 
			
		}, function(error) {
			swal('Unable to load all Teams : ' + error.data.message);
		});
	}
	if($scope.admin) {
		$scope.getAllTeams();
	}

	
});