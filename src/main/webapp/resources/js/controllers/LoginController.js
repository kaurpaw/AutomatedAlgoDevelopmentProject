'use strict';

var app = angular.module('AutomatedAlgoApp.Login', []);

app.controller('LoginController', function($rootScope, $scope, $location, CommonService, 
		UserService) {
	
	$scope.header = 'Please login';
});
