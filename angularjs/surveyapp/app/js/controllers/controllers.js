'use strict';
var surveyApp = angular.module('SurveyApp',[]);

surveyApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/',{
		controller:'ListController',
		templateUrl:'views/list.html'
	}).when('/new',{
		controller: 'NewController',
		templateUrl: 'views/surveyForm.html'	
	}).when('/edit',{
		controller: 'EditController',
		templateUrl: 'views/surveyForm.html'
	}).otherwise({redirectTo:'/'});
}]);

surveyApp.controller('NewController',function($scope,$location, surveyStorage){
	$scope.surveys = surveyStorage.get();
	
	$scope.save= function(){
		 var surveyName = $scope.surveyName.trim();
		if (!surveyName.length) {return;}

		$scope.surveys.push({
				name: surveyName,
		});

		$scope.surveyName = '';		
		surveyStorage.put($scope.surveys);
		$location.path('/');
	}
})

surveyApp.controller('EditController',function($scope,$location,$routeParams, surveyStorage){		
	$scope.surveys = surveyStorage.get();
	$scope.surveys.forEach(function(survey){
		if(survey.name == $routeParams.surveyName){$scope.survey = survey};			
	}); 
	$scope.surveyName = $scope.survey.name;
	
	
	$scope.save= function(){
		 var surveyName = $scope.surveyName.trim();
		if (!surveyName.length) {return;}
		$scope.survey.name = surveyName;
		surveyStorage.put($scope.surveys);
		$location.path('/');
	}
})

surveyApp.controller('ListController',function($scope,$location, surveyStorage, $window){		
		$scope.surveys = surveyStorage.get();
		
		$scope.remove = function(index){
			if($window.confirm('Are you sure?')){
				$scope.surveys.splice(index,1);
				surveyStorage.put($scope.surveys);
			}
		}		
})




