angular.module('movieApp')
    .controller('SearchController', function($scope, $location){
        $scope.search=function(){
            console.log('search');
            if($scope.query){
                $location.path('/results').search('q', $scope.query);
            }
        }
    });