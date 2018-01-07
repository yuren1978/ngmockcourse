describe('Home Controller', function() {
	
	var results = [
	      {
	         "Title":"Star Wars: Episode IV - A New Hope",
	         "imdbID":"tt0076759"
	      },
	      {
	         "Title":"Star Wars: Episode V - The Empire Strikes Back",
	         "imdbID":"tt0080684"
	      },
	      {
	         "Title":"Star Wars: Episode VI - Return of the Jedi",
	         "imdbID":"tt0086190"
	      }
	  ];
	var $scope;
	var $interval;
	var omdbApi;

	beforeEach(module('movieApp'));

	beforeEach(inject(function(_$location_, _$interval_, _omdbApi_) {
		$scope = {};
		$interval = _$interval_;
		omdbApi = _omdbApi_;
	}));

	beforeEach(inject(function(_$q_, _PopularMovies_) {
		spyOn(_PopularMovies_, 'get').and.callFake(function() {
	      var deferred = _$q_.defer();
	      deferred.resolve(['tt0076759', 'tt0080684', 'tt0086190']);
	      return deferred.promise;
	    });
	}));

	beforeEach(inject(function(_$controller_, _$q_) {
	    spyOn(omdbApi, 'find').and.callFake(function() {
      		var deferred = _$q_.defer();
      		var args = omdbApi.find.calls.mostRecent().args[0];

			if (args === 'tt0076759') {
				deferred.resolve(results[0]);
			} else if (args === 'tt0080684') {
				deferred.resolve(results[1]);
			} else if (args === 'tt0086190') {
				deferred.resolve(results[2]);
			} else {
				deferred.reject();
			}

	      return deferred.promise;
	    });
	}));

	beforeEach(inject(function(_$controller_, _$rootScope_, _PopularMovies_) {
		_$controller_('HomeController', { 
			$scope: $scope, 
			$interval_: $interval,
			omdbApi: omdbApi,
			PopularMovies: _PopularMovies_
		});

		_$rootScope_.$apply();
	}));


	it('should rotate movies every 5 seconds', function() {
		// should have a default starting movie
		expect($scope.result.Title).toBe(results[0].Title);
		
		// after 5 seconds, should be next movie
		$interval.flush(5000);
		expect($scope.result.Title).toBe(results[1].Title);
		
		// after 5 seconds, should be next movie
		$interval.flush(5000);
		expect($scope.result.Title).toBe(results[2].Title);

		// should go back to start
		$interval.flush(5000);
		expect($scope.result.Title).toBe(results[0].Title);

		expect(omdbApi.find.calls.argsFor(0)).toEqual(['tt0076759']);
    	expect(omdbApi.find.calls.argsFor(1)).toEqual(['tt0080684']);
    	expect(omdbApi.find.calls.argsFor(2)).toEqual(['tt0086190']);
    	expect(omdbApi.find.calls.argsFor(3)).toEqual(['tt0076759']);

	});

});
