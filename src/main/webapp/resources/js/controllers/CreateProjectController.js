'use strict';

var app = angular.module('AutomatedAlgoApp.CreateProject', []);

app.controller('CreateProjectController', function($scope, $rootScope) {
	
$scope.modelTypes = [  {
						modelTypeName: "Sentiment Analysis",
					    modelClassName: ["Positive", "Negative", "Neutral"]}, 				  
					  { 
						modelTypeName: "Category Analysis",
						modelClassName: ["cat01", "cat02","cat03","cat04"]},					   
					  {
						  modelTypeName: "BrandOBrand Analysis",
						  modelClassName: ["b01", "b02","b03","b04"]
					  }];

	


});