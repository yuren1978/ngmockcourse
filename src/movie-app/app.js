console.log('loading app js');

angular.module('movieApp', ['ui.bootstrap', 'ngRoute', 'omdb'])
	.config(function ($routeProvider, $locationProvider) {
	
	$routeProvider
  		.when('/results', {
    		templateUrl: 'movie-app/results.html',
    		controller: 'ResultsController'
  		})
  		.otherwise({
    		redirectTo: '/'
		  });

	$locationProvider.html5Mode(false);	
	console.log($locationProvider.html5Mode());	  
	console.log('app loading..')
		  
});