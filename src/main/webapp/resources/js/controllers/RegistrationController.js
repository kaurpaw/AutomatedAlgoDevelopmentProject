'use strict';

var app = angular.module('AutomatedAlgoApp.Registration', []);

app.controller('RegistrationController',
				function($scope, $location, UserService) {
	
	$scope.header = 'Registration  form';
});
