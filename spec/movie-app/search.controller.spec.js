describe('Search Controller', function(){
    var $scope;
    var $location;
    var $timeout;

    beforeEach(module('movieApp'));

    beforeEach(inject(function(_$controller_, _$location_, _$timeout_){
        $scope={};
        $location=_$location_;
        $timeout= _$timeout_;
        _$controller_('SearchController', { $scope: $scope, $location: _$location_, $timeout:_$timeout_ });
    }));

    it('should redict to query results page for non-empty query', function(){
        $scope.query='star wars';
        $scope.search();
        expect($location.url()).toBe('/results?q=star%20wars');

    });

    it('should redict to query results page for empty query', function(){
        $scope.query='';
        $scope.search();
        expect($location.url()).toBe('');
    });  

    it('should redirect after 1 second of keyboard activity', function(){
        $scope.query='star wars';
        $scope.keyup();
        $timeout.flush();
        expect($timeout.verifyNoPendingTasks).not.toThrow();
        expect($location.url()).toBe('/results?q=star%20wars');
    });

    it('should cancel timeout in keydown', function() {
		$scope.query = 'star wars';
		$scope.keyup();
		$scope.keydown();
		expect($timeout.verifyNoPendingTasks).not.toThrow();
	});

	it('should cancel timeout on search', function() {
		$scope.query = 'star wars';
		$scope.keyup();
		$scope.search();
		expect($timeout.verifyNoPendingTasks).not.toThrow();
	});

});