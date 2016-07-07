// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var appalti = angular.module('appalti', ['ionic', 'appalti.services','appalti.controllers', 'appalti.directives','pascalprecht.translate','ngStorage'])

.run(function($ionicPlatform, $http, $rootScope, $ionicPopup, SessionService, User, $ionicLoading, $state, IONIC_BACK_PRIORITY) {
  $rootScope.loginSuccess = false;
  $rootScope.session = {};
    
  var loading = $ionicLoading.show({
    templateUrl:"templates/loading.html",
    animation: 'fade-in',
    duration: 1500
  })
    
  window.addEventListener('native.keyboardshow', function(e){
    $rootScope.$emit('keyboardOnScreen');
  });
  
  window.addEventListener('native.keyboardhide', function(e){
    $rootScope.$emit('keyboardClosed');
  });



  //clean all default headers on every method
  // ***IMPORTANT!! THIS AVOID CORS BLOCK TESTING ON BROWSER
  $http.defaults.useXDomain = true;
  $http.defaults.headers.common = {};
  $http.defaults.headers.post = {};
  $http.defaults.headers.put = {};
  $http.defaults.headers.patch = {};
  $http.defaults.headers.options = {};
  //$http.defaults.headers.post['X-CSRF-Token'] = $cookies.csrftoken;
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }


  });
})
/*
.run(['$http', '$cookies', function($http, $cookies) {
  $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
}])
*/
.constant('$ionicLoadingConfig', {
  template: 'Caricamento...',
  animation: 'fade-in'
})



.config(function($stateProvider, $urlRouterProvider, $httpProvider, $translateProvider) {
/*debugger;    
$httpProvider.defaults.useXDomain = true;
$httpProvider.defaults.headers.common = {};
$httpProvider.defaults.headers.post = {};
$httpProvider.defaults.headers.put = {};
$httpProvider.defaults.headers.patch = {};
$httpProvider.defaults.headers.options = {};*/
$httpProvider.defaults.withCredentials = true;


$stateProvider
  .state('splash', {
    url: '/splash',
    templateUrl: 'templates/splash.html',
  })
  .state('login', {
    url: '/login',
    templateUrl: 'templates/form.html'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html'
  })
  .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html"
      //controller: 'AppCtrl'
  })
  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })

 /* .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/form.html',
      }
    }
  })*/

  .state('app.ricerca', {
    url: "/ricerca",
    abstract: true
  })

  .state('app.ricerca.voci', {
    url:"/ricerca/voci",
    views: {
      'menuContent': {
        templateUrl: 'templates/ricerca.html'
      }
    }
  })

  .state('app.voci', {
    url: '/voci',
    views: {
      'menuContent': {
        templateUrl: 'templates/ricerca.html'
      }
    }
  })
  .state('app.giurisprudenza', {
    url: '/giurisprudenza',
    views: {
      'menuContent': {
        templateUrl: 'templates/ricerca.html'
      }
    }
  })
  .state('app.anacsoftlaw', {
    url: '/anac-e-softlaw',
    views: {
      'menuContent': {
        templateUrl: 'templates/ricerca.html'
      }
    }
  })
  
  .state('app.voce', {
    url: '/voce/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/voce.html'      
      }
    }
  })
  .state('app.normativa', {
    url: '/normativa',
    views: {
      'menuContent': {
        templateUrl: 'templates/ricerca.html'
      }
    }
  })
 
  .state('app.acquista', {
      url: '/acquista',
      views: {
        'menuContent': {
          templateUrl: 'templates/paypal.html',
          controller : 'PayPalCtrl'
        }
      }
    })
    .state('app.index', {
      url: '/index',
      views: {
        'menuContent': {
          templateUrl: 'index.html',
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('splash');

  $translateProvider.translations('it', {
        'TITLE': '<i class="fa fa-search fa-2x"></i>',
        'TWO': '<i class="fa fa-list fa-2x"></i>',
        'THREE': '<i class="icon ion-university"></i>',
        'FOUR': '<i class="icon ion-social-euro"></i>',
        'FIVE': '<i class="icon ion-android-more-vertical"></i>'
    });
  
    $translateProvider.preferredLanguage('it');
});
