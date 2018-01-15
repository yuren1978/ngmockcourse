angular.module('search', []).directive('searchControl', function() {
    return {
      replace: true,
      restrict: 'E',
      scope: true,
      template: '<input type="search" placeholder="{{placeholder}}" value={{query}} secondValue={{query2}}  >'
    };
});

describe('Count Watchers', function() {
    var $compile;
    var $rootScope;

    beforeEach(module('search'));

    beforeEach(inject(function(_$rootScope_, _$compile_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
    }));

    it('should render directive', function () {
        var expectedHtml = '<input type="search" placeholder="search..." value="star wars" class="ng-scope">';
        var expectedHtml = '<input type="search" value="star wars" class="ng-scope">';        
      	var element = $compile("<search-control></search-control>")($rootScope);
		
		$rootScope.placeholder = 'search...';
        $rootScope.query = 'star wars';
        $rootScope.query2 = 'star wars2';        
		$rootScope.$$childHead.foo = 'bar';
      	$rootScope.$digest();

    	//expect(element[0].outerHTML).toBe(expectedHtml);
      	
      	//console.log('scopes', $rootScope.$countChildScopes());
      	console.log('watchers', $rootScope.$countWatchers());
      	//console.log(angular.mock.dump($rootScope));
    });
});