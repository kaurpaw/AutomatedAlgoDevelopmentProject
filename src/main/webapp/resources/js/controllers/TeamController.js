'use strict';

var app = angular.module('AutomatedAlgoApp.Team', []);

app.controller('TeamController', function($scope, $rootScope, $location,
		TeamService, PlayerService, CommonService) {

	$scope.header = 'Team Details';

	if (!$rootScope.authenticated) {
		$location.path('/login');
	}
	
	$scope.countries = CommonService.countries;
	$scope.playerTypes = CommonService.playerTypes;
	$scope.team = CommonService.team;
	
	$scope.saveChanges = function(team) {
		TeamService.saveChanges(team).then(function(response) {
			swal('Changes saved.');
		}, function(error) {
			swal('Unable to Save changes of the team : ' + error.data.message);
		});
	}

	$scope.addToTransferList = function(id) {
		$scope.team.players.find(o => o.id === id).presentOnTransferList = true;
		PlayerService.addToTransferList(id).then(function(response) {
			console.log('updated Player details');
		}, function(error) {
			swal('Unable to add player to transfer list : ' + error.data.message);
		});
	}
	
	$scope.removeFromTransferList = function(id) {
		$scope.team.players.find(o => o.id === id).presentOnTransferList = false;
		PlayerService.removeFromTransferList(id).then(function(response) {
			console.log('updated Player details');
		}, function(error) {
			swal('Unable to remove player from the transfer list : ' + error.data.message);
		});
	}
	
});
