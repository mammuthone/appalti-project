angular.module('appalti.directives', [])

.directive('myDirective', function() {
	return {
		restrict: 'EA',
		templateUrl: 'templates/directives/elemento.html',
		//controller: 'VociController',
		link: function(scope, element, attrs) {
			scope.ricerca = function(){
				scope.startSearchVoce()
			}		
    	}
	}
})

.directive('appaltiHeader', function() {
	return {
		templateUrl: 'templates/directives/header/appalti.header.html',
		link: function(scope, element, attrs) {
			debugger;
			scope.title = scope.appalti.tipo;
			scope.titlecolor = scope.appalti.titlecolor;
			scope.ricerca = function(){
				scope.startSearchVoce()
			}
			element.children()[0].style ='background-color: '+ scope.titlecolor;
    	}
	}
})


.directive('appaltiRicerca', function() {
	return {
		restrict :'E',
		templateUrl: 'templates/directives/appalti.ricerca.html',
		//controller: 'VociController',
		link: function(scope, element, attrs) {
			debugger;
            scope.headerTitle = scope.appalti.tipo;
			scope.ricerca = function() {
				scope.startSearchVoce()
			}
    	}
	}
})

.directive('searchBar', function() {
	return {
		scope: true,
		templateUrl: 'templates/directives/appalti.section.search.html',
		//controller: 'VociController',
		link: function(scope, element, attrs) {
			scope.headerTitle = scope.headerTitle;
			scope.ricerca = function(){
				scope.startSearchVoce()
			}		
    	}
	}
})

.directive('appaltiRisultati', function() {
	return {
		templateUrl: 'templates/directives/appalti.section.results.html',
		//controller: 'VociController',
		link: function(scope, element, attrs) {
			scope.ricerca = function(){
				scope.startSearchVoce()
			}		
    	}
	}
})

.directive('listElement', function() {
	return {
		templateUrl: 'templates/directives/appalti.section.results.listelement.html',
		//controller: 'VociController',
		link: function(scope, element, attrs) {
			debugger;
			var voci = scope.voci;
			var color = scope.color;

    	}
	}
})

.directive('detectGestures', function($ionicGesture) {
  return {
    restrict :  'A',

    link : function(scope, elem, attrs) {
      var gestureType = attrs.gestureType;

      switch(gestureType) {
        case 'swipe':
          $ionicGesture.on('swipe', scope.reportEvent, elem);
          break;
        case 'swiperight':
          $ionicGesture.on('swiperight', scope.reportEvent, elem);
          break;
        case 'swipeleft':
          $ionicGesture.on('swipeleft', scope.reportEvent, elem);
          break;
        case 'doubletap':
          $ionicGesture.on('doubletap', scope.reportEvent, elem);
          break;
        case 'tap':
          $ionicGesture.on('tap', scope.reportEvent, elem);
          break;
      }

    }
  }
})