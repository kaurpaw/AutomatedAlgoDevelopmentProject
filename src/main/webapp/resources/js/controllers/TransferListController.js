'use strict';

var app = angular.module('AutomatedAlgoApp.TransferList', []);

app.controller('TransferListController', function($rootScope, CommonService,
		$scope, $location, PlayerService) {

	if (!$rootScope.authenticated) {
		$location.path('/login');
	}
	$scope.header = 'Transfer List';

	$scope.countries = CommonService.countries;
	$scope.playerTypes = CommonService.playerTypes;

	$scope.clearFilters = function() {
		$scope.filter = {};
		$scope.filterData = $scope.players;
	}

	$scope.clearFilters();
	
	$scope.search = function() {
		console.log($scope.filter);
		$scope.filterData = $scope.players;
		
		if($scope.filter.firstName && $scope.filter.firstName != '') {
			$scope.filterData =
				$scope.filterData.filter((player) => player.firstName.toLocaleLowerCase().includes($scope.filter.firstName.toLocaleLowerCase()));
		}
		
		if($scope.filter.lastName && $scope.filter.lastName != '') {
			$scope.filterData =
				$scope.filterData.filter((player) => player.lastName.toLocaleLowerCase().includes($scope.filter.lastName.toLocaleLowerCase()));
		}

		if($scope.filter.country && $scope.filter.country != '') {
			$scope.filterData =
				$scope.filterData.filter((player) => player.country.toLocaleLowerCase().includes($scope.filter.country.toLocaleLowerCase()));
		}
		
		if($scope.filter.playerType && $scope.filter.playerType != '') {
			$scope.filterData =
				$scope.filterData.filter((player) => player.playerType.toLocaleLowerCase().includes($scope.filter.playerType.toLocaleLowerCase()));
		}
		
		if($scope.filter.marketValue && $scope.filter.marketValue != '') {
			$scope.filterData =
				$scope.filterData.filter((player) => player.marketValue <= $scope.filter.marketValue);
		}
		
		if($scope.filter.teamName && $scope.filter.teamName != '') {
			$scope.filterData =
				$scope.filterData.filter((player) => player.teamName.toLocaleLowerCase().includes($scope.filter.teamName.toLocaleLowerCase()));
		}
		
		// if($scope.filterData)
	}

	

	$scope.loadTransferList = function() {
		PlayerService.getTransferList().then(function(response) {
			$scope.players = response.data;
			$scope.filterData = $scope.players;
		}, function(error) {
			swal('Unable to load Transfer List : ' + error.data.message);
		});
	}
	$scope.loadTransferList();
	
	$scope.buyPlayer = function(id) {
		const player = $scope.players.filter((player) => player.id === id);
		if(CommonService.team.teamBudget < player[0].marketValue) {
			swal("can't buy player. check your budget");
			return;
		}
		PlayerService.buyPlayer(id).then(function(response) {
			player[0].presentOnTransferList  = false;
			CommonService.team.players.push(player[0]);
			CommonService.team.teamBudget -= player[0].marketValue;
			CommonService.team.teamValue += player[0].marketValue;
			
			if(CommonService.allTeams.length > 0) {
				for (var i in CommonService.allTeams) {
					if (CommonService.allTeams[i].id == CommonService.team.id) {
						CommonService.allTeams[i].teamBudget =  CommonService.team.teamBudget;
						break; 
					}
				}
			}			
			$scope.players = $scope.players.filter((player) => player.id != id);
			$scope.filterData = $scope.players;
			swal('Player is added in the team.');
		}, function(error) {
			swal('Unable to Purchase player : ' + error.data.message);
		});
	}
	
	$scope.canBuyPlayer = function(id) {
		const player = $scope.players.filter((player) => player.id === id);
		return player.marketValue > CommonService.team.teamBudget;
	}

});