angular.module('omdb', [])
	.factory('omdbApi', function($http, $q) {
		var service = {};
		//var baseUrl = 'http://www.omdbapi.com/?v=1&';
		var baseUrl = 'http://www.omdbapi.com/?v=1&apikey=6913b21f&';
		function httpPromise (url) {
			var deferred = $q.defer();
            $http.get(url).then(function(response){
                deferred.resolve(response.data);
            }, function(error){
                deferred.reject();
            });
			return deferred.promise;
		}

		service.search = function(query) {
			return httpPromise(baseUrl + 's=' + encodeURIComponent(query));
		}

		service.find = function(id) {
			return httpPromise(baseUrl + 'i=' + id);
		}

		return service;
	});