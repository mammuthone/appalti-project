angular.module('appalti.controllers', [])

.controller('SplashCtrl', function($scope, $rootScope, $state, $ionicLoading, $ionicSlideBoxDelegate,$ionicModal, $timeout, User, $rootScope, SessionService, $ionicBackdrop, $ionicPlatform) {
    debugger;
    
    $scope.openFab = function() {
        openFAB();
    }
    $scope.keybOnScreen = false;
    $scope.nextSlide = function() {


        $scope.loader();
       //$ionicSlideBoxDelegate.next();
    }



    $rootScope.$on('keyboardOnScreen', adaptLayout);
    $rootScope.$on('keyboardClosed', recoverLayout);
    
    function adaptLayout() {
        sezioneAnimation.play();
        svgAnimation.play();
    }

    function recoverLayout() {
        sezioneAnimationrewind.play();
                svgAnimationrewind.play();
    }

    var sezioneAnimationrewind = anime({
        targets: ['.sezione'],
        translateY: '3rem',
        autoplay: false,
        loop: false
    })
    
    var svgAnimationrewind = anime({
        targets: ['.svg'],
        scale: [0.7,1],
        translateY: [ '0.3em', 20 ],
        duration: 1500,
        loop: false,
        autoplay: false

    });
        
    var sezioneAnimation = anime({
        targets: ['.sezione'],
        translateY: '-3rem',
        duration: 1500,
        autoplay: false,
        loop: false 
    });

    var svgAnimation = anime({
        targets: ['.svg'],
        scale: {
            value: 0.7
        },
        translateY: '-4rem',
        duration: 1500,
        loop: false,
        autoplay: false

    });

    $scope.doLogin = function(user) {
        
      $rootScope.username = user.username;
      $rootScope.password = user.password;

      $rootScope.userlogin = {
        username: user.username,
        password: user.password
      }

      $ionicLoading.show();

      User.getSessionToken()
         .then(function(token){
            $rootScope.token = token;
            User.login(user)
               .then(
                  function(data){
                    SessionService.setItem('Appalti.Token', data.token);
                    SessionService.setItem('Appalti.User', data.user.name)
                    
                    $rootScope.session = {
                      user : data.user.name
                    }
                    
                    $state.go('app.home');
                    $rootScope.loginSuccess = true;
                    $ionicLoading.hide();
                     
                  }, 
                  function (status) {
                  debugger;
                  switch (status) {
                    case 401:
                      $ionicLoading.hide();
                      $ionicPopup.show({
                          template: '<p>Il nome utente e/o la password sono errati. Riprovare</p>',
                          title: 'Errore nella login',
                          //subTitle: 'Please use normal things',
                          scope: $scope,
                          buttons: [
                             { text: 'Ok' }
                          ]
                       });
                      $scope.user.username = '';
                      $scope.user.password = '';
                      break;
                    case 406:
                      User.logout()
                      .then(function(success){
                          debugger;
                          //console.log(data)
                          $state.go('splash');
                          $ionicLoading.hide();
                      }, function(error) {
                         debugger;
                        console.log('test');
                      });
                      break;
                        default:
                      break;
                  }
               })
         })
     }


    $scope.loader = function(){
        if (SessionService.exists("Appalti.Token")) 
        {
            
            $ionicLoading.show({
                template:"<span>Accesso in corso...</span>",
                animation: 'fade-in',
                duration: 1900
            })
            setTimeout(function(){
                $state.go('app.home');
                debugger;
                User.getSubscription()
                    .then(
                        function(subscription){
                            console.trace("Subscription collection retrieved: ",subscription.length);
                            $rootScope.subscription = subscription;
                            $scope.loginError = false;
                            $rootScope.loginSuccess = true;
                            $state.go('app.home');
                            $ionicLoading.hide();

                        },
                        function(data){
                            SessionService.removeItem('Appalti.Token');
                            //$state.go('login')
                            /*User.logout()
                              .then(function(success){
                                  debugger;
                                  //console.log(data)
                                  $state.go('splash');
                                  $ionicLoading.hide();
                              }, function(error) {
                                 debugger;
                                console.log('test');
                              });*/
                        }
                    )
            }, 1000);
        }
        else {
            $ionicSlideBoxDelegate.next();
            //$scope.doLogin($scope.user)
        }
        
    }


   $rootScope.logout = function(){
        debugger;
        $rootScope.loginSuccess = false;
        User.logout()
            .then(function(data){
                console.log(data)
                SessionService.removeItem('Appalti.Token')
                SessionService.removeItem('appalti-session');
                $state.go('splash');
            })
    }

    var imageObj = new Image();
    imageObj.src = 'img/piselli.png';
})

.controller('LoginCtrl', ['$scope', '$ionicLoading','$rootScope', '$state','UserService','User','ApiUrl', '$ionicPopup', 'SessionService','$ionicBackdrop','$ionicHistory',
   function($scope, $ionicLoading, $rootScope, $state, UserService,User, ApiUrl, $ionicPopup, SessionService, $ionicBackdrop, $ionicHistory){
   
   $scope.user = {};
   
   $scope.doLogin = function(user) {
        
      $rootScope.username = user.username;
      $rootScope.password = user.password;

      $rootScope.userlogin = {
        username: user.username,
        password: user.password
      }

      $ionicLoading.show();

      User.getSessionToken()
         .then(function(token){
            $rootScope.token = token;
            User.login(user)
               .then(
                  function(data){
                    SessionService.setItem('Appalti.Token', data.token);
                    SessionService.setItem('Appalti.User', data.user.name)
                    
                    $rootScope.session = {
                      user : data.user.name
                    }
                     
                  }, 
                  function (status) {
                  debugger;
                  switch (status) {
                    case 401:
                      $ionicLoading.hide();
                      $ionicPopup.show({
                          template: '<p>Il nome utente e/o la password sono errati. Riprovare</p>',
                          title: 'Errore nella login',
                          //subTitle: 'Please use normal things',
                          scope: $scope,
                          buttons: [
                             { text: 'Ok' }
                          ]
                       });
                      $scope.user.username = '';
                      $scope.user.password = '';
                      break;
                    case 406:
                      User.logout()
                      .then(function(success){
                          debugger;
                          //console.log(data)
                          $state.go('splash');
                          $ionicLoading.hide();
                      }, function(error) {
                         debugger;
                        console.log('test');
                      });
                      break;
                    default:
                      break;
                  }
               })
         })
  }
  
}])

.controller('HomeCtrl', function($rootScope, $scope, $ionicModal, $timeout){
    console.log('index')
    
})

.controller('PayPalCtrl', function($rootScope, $scope, $ionicPopup, User, $ionicLoading){
    console.trace();
    
   $scope.paypalInit = function(sub) {
      debugger;
      $scope.sub = sub;
      console.log(parseFloat(sub._PRICE))
      console.log(sub._TITLE)
      PayPalMobile.renderSinglePaymentUI(app.createPayment(), app.onSuccesfulPayment, app.onUserCanceled);
   }

   var app = {
   // Application Constructor
   initialize: function() {
      debugger;
       this.bindEvents();
   },
   // Bind Event Listeners
   //
   // Bind any events that are required on startup. Common events are:
   // 'load', 'deviceready', 'offline', and 'online'.
   bindEvents: function() {
      debugger;
       document.addEventListener('deviceready', this.onDeviceReady, false);
   },
   // deviceready Event Handler
   //
   // The scope of 'this' is the event. In order to call the 'receivedEvent'
   // function, we must explicity call 'app.receivedEvent(...);'
   onDeviceReady: function() {
      debugger;
       app.receivedEvent('deviceready');
   },
   // Update DOM on a Received Event
   receivedEvent: function(id) {
      debugger;
       var parentElement = document.getElementById(id);
       var listeningElement = parentElement.querySelector('.listening');
       var receivedElement = parentElement.querySelector('.received');

       listeningElement.setAttribute('style', 'display:none;');
       receivedElement.setAttribute('style', 'display:block;');

       console.log('Received Event: ' + id);

       // start to initialize PayPalMobile library
       app.initPaymentUI();
   },
   initPaymentUI : function () {
      debugger;
     var clientIDs = {
      "PayPalEnvironmentProduction": "YOUR_PRODUCTION_CLIENT_ID",
      "PayPalEnvironmentSandbox": "AZ-TKN_oA-WjrCrkjUeeB81uXRF_mpj0V9UoXlNGsIPoXH6r0lw1ek_y3WXF_gpUgMYdPA21BPhQP0oU"
     };
     PayPalMobile.init(clientIDs, app.onPayPalMobileInit);

   },
   onSuccesfulPayment : function(payment) {
      console.log("payment success: " + JSON.stringify(payment, null, 4));
      $ionicPopup.show(
         {
            template: '<p>Vi ringraziamo per aver effettuato la sottoscrizione.</p>',
            title: 'Pagamento riuscito!',
            //subTitle: 'Please use normal things',
            scope: $scope,
            buttons: [
               { text: 'Ok' }
            ]
         }
      );
      $state.go('app.home');
   },
   onAuthorizationCallback : function(authorization) {
      debugger;
     console.log("authorization: " + JSON.stringify(authorization, null, 4));
   },
   createPayment : function () {
      debugger;
     // for simplicity use predefined amount
     // optional payment details for more information check [helper js file](https://github.com/paypal/PayPal-Cordova-Plugin/blob/master/www/paypal-mobile-js-helper.js)
     //var paymentDetails = new PayPalPaymentDetails("50.00", "0.00", "0.00");
     //var payment = new PayPalPayment("50.00", "USD", "Awesome Sauce", "Sale", paymentDetails);

     var paymentDetails = new PayPalPaymentDetails($scope.sub._PRICE, "0.00", "0.00");
     var payment = new PayPalPayment($scope.sub._PRICE, "EUR", $scope.sub._TITLE, "Sale", paymentDetails);
     return payment;
   },
   configuration : function () {
      debugger;
     // for more options see `paypal-mobile-js-helper.js`
     var config = new PayPalConfiguration({merchantName: "Piselli", merchantPrivacyPolicyURL: "https://mytestshop.com/policy", merchantUserAgreementURL: "https://mytestshop.com/agreement"});
     return config;
   },
   onPrepareRender : function() {
      debugger;
     // buttons defined in index.html
     //  <button id="buyNowBtn"> Buy Now !</button>
     //  <button id="buyInFutureBtn"> Pay in Future !</button>
     //  <button id="profileSharingBtn"> ProfileSharing !</button>
     var buyNowBtn = document.getElementById("buyNowBtn");
     var buyInFutureBtn = document.getElementById("buyInFutureBtn");
     var profileSharingBtn = document.getElementById("profileSharingBtn");

     buyNowBtn.onclick = function(e) {
      debugger;
       // single payment
       console.log(e)
       PayPalMobile.renderSinglePaymentUI(app.createPayment(), app.onSuccesfulPayment, app.onUserCanceled);
     };

     buyInFutureBtn.onclick = function(e) {
      debugger;
       // future payment
       PayPalMobile.renderFuturePaymentUI(app.onAuthorizationCallback, app.onUserCanceled);
     };

     profileSharingBtn.onclick = function(e) {
      debugger;
       // profile sharing
       PayPalMobile.renderProfileSharingUI(["profile", "email", "phone", "address", "futurepayments", "paypalattributes"], app.onAuthorizationCallback, app.onUserCanceled);
     };
   },
   onPayPalMobileInit : function() {
      debugger;
     // must be called
     // use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
     PayPalMobile.prepareToRender("PayPalEnvironmentSandbox", app.configuration(), app.onPrepareRender);
   },
   onUserCanceled : function(result) {
     console.log(result);
   }
   };
   app.initialize();
})

.controller('VociController', function($scope, $attrs,$stateParams, VociService, $ionicLoading, RiferimentiService, $q, $location, $ionicSlideBoxDelegate) {
   var self = this;
   var tipologiaRicerca = {
      voce: 1001,
      normativa: 1002,
      giurisprudenza: 1003,
      anacsoftlaw: 1004
   }

      var riferimenti = {
      anacsoftlaw: 1,
      normativa: 2,
      giurisprudenza: 3,
      articolonormativa: 4,
      voce: 5
   }

  

   self.init = function(){
      $scope.appalti = {};
      var path = $location.url().split('/');
      debugger;
      $scope.appalti.tipo = path[path.length-1].replace(/%20/g,' ');
      switch($scope.appalti.tipo) {
         case 'voce':
            $scope.appalti.titlecolor = 'rgb(38,168,226)';
            $scope.appalti.searchType = tipologiaRicerca.voce;
            break;
         case 'normativa':
            $scope.appalti.titlecolor = 'rgba(89,131,46, 1)!important';
            $scope.appalti.searchType = tipologiaRicerca.normativa;
            break;
         case 'giurisprudenza':
            $scope.appalti.titlecolor = 'rgba(254,147,55,1)!important';
            $scope.appalti.searchType = tipologiaRicerca.giurisprudenza;
            break;
         case 'anac e softlaw':
            $scope.appalti.titlecolor = 'rgba(147,170,226,1)!important';
            $scope.appalti.searchType = tipologiaRicerca.anacsoftlaw;
            break;
         default:
            break;
      }
   }

   
   self.init();

   $scope.search = "";
   /*this.init = function( element ) {
    self.$element = element;
    $scope.isOpen = angular.isDefined($attrs.isOpen) ? $scope.$parent.$eval($attrs.isOpen) : false;
   };*/


    $scope.startSearchVoce = function(){
      console.trace('VociController: prima della search')
      console.log($scope.search)
      $ionicLoading.show({
         template: '<ion-spinner icon="lines" class="android"></ion-spinner>'
      });
   
   //ricerca delle keyword
      VociService
         .searchVoce($scope.search)
         .then(function(results){
            debugger;
            console.log(results)
            $scope.voci = results;
            $ionicLoading.hide()
         });  
      }
   
      var voceId = $stateParams.id;
  
      //ricerca del singolo nodo
      VociService
         .getVoce(voceId)
         .then(function(results){
            debugger;
            console.log(results)
            $scope.selectedVoce = results;
            var cleanNode = removeNull(results.node);
            retrieveRiferimenti(cleanNode);
         })

      function retrieveRiferimenti(nodo){
         for (key in nodo){
            switch(key) {
               case "_REF_ANAC_SOFTLAW":
                  retrieveRiferimentiService(riferimenti.anacsoftlaw, nodo[key])
                  break;
               case "_REF_ARTICOLO_NORMATIVA":
                  retrieveRiferimentiService(riferimenti.articolonormativa, nodo[key])
                  break;
               case "_REF_GIURISPRUDENZA":
                  retrieveRiferimentiService(riferimenti.giurisprudenza, nodo[key])
                  break;
               case "_REF_NORMATIVA":
                  retrieveRiferimentiService(riferimenti.normativa, nodo[key])               
                  break;
               case "_REF_VOCE":
                  retrieveRiferimentiService(riferimenti.voce, nodo[key])               
                  break;
               default:
                  break;
            }
         }
      }

      function removeNull(nodo) {
         for(key in nodo){
            if(nodo[key] === null) {
               delete nodo[key]
            }
         }

         return nodo;
      }

      function retrieveRiferimentiService(tipo, values){
         console.trace("retrieveRiferimentiService")
         var array = listRef(values);
         var risultati = [];

         console.log(array)
         switch(tipo) {
            
            case(riferimenti.anacsoftlaw):
               var lista = RiferimentiService.get_anacsoftlaw(array);
               $q
                  .all(lista)
                  .then(function(result) {
                     var tmp = [];
                     angular.forEach(result, function(response) {
                        tmp.push(response.data);
                        console.log(response.data)
                     });
                     return tmp;                  
                  })
                  .then(function(tmpResult) {
                     $scope.combinedResult = tmpResult.join(", ");
                  });
                  console.log("results: ", risultati)
                  break;
                  
            case(riferimenti.normativa):
               var lista = RiferimentiService.get_normative(array);
               $q
                  .all(lista)
                  .then(function(result) {
                     var tmp = [];
                     angular.forEach(result, function(response) {
                        tmp.push(response.data);
                        console.log(response.data)
                     });
                     return tmp;                  
                  })
                  .then(function(tmpResult) {
                     $scope.combinedResult = tmpResult.join(", ");
                  });
                  console.log("results: ", risultati)
               break;

            case(riferimenti.giurisprudenza):
               var lista = RiferimentiService.get_giurisprudenza(array);
               $q
                  .all(lista)
                  .then(function(result) {
                     var tmp = [];
                     angular.forEach(result, function(response) {
                        tmp.push(response.data);
                        console.log(response.data)
                     });
                     return tmp;                  
                  })
                  .then(function(tmpResult) {
                     $scope.combinedResult = tmpResult.join(", ");
                  });
                  console.log("results: ", risultati)
               break;

            case(riferimenti.articolonormativa):
               var lista = RiferimentiService.get_articolonormativa(array);
               $q
                  .all(lista)
                  .then(function(result) {
                     var tmp = [];
                     angular.forEach(result, function(response) {
                        tmp.push(response.data);
                        console.log(response.data)
                     });
                     return tmp;                  
                  })
                  .then(function(tmpResult) {
                     $scope.combinedResult = tmpResult.join(", ");
                  });
                  console.log("results: ", risultati)
               break;

            case(riferimenti.voce):
               var lista = RiferimentiService.get_voci(array);
               $q
                  .all(lista)
                  .then(function(result) {
                     var tmp = [];
                     angular.forEach(result, function(response) {
                        tmp.push(response.data);
                        console.log(response.data)
                     });
                     return tmp;                  
                  })
                  .then(function(tmpResult) {
                     $scope.combinedResult = tmpResult.join(", ");
                  });
                  console.log("results: ", risultati)
               break;
         
            
         }   
               
               
   
         }
      

      function listRef(values){
        var array = [];
        var arrayResponse = [];
        array = values.split(",");
        for ( var i=0; i<array.length; i++){
            arrayResponse.push(array[i].trim());
        }
        console.log(arrayResponse)
        return arrayResponse;
    }
})

.controller('RicercaController', ['$rootScope','$scope', '$attrs', '$stateParams', 
   '$ionicLoading', '$q', '$location', 'RicercaService', '$ionicPopup', 'StorageService', '$ionicHistory', '$state',
   function($rootScope, $scope, $attrs, $stateParams, $ionicLoading, $q, $location, RicercaService, $ionicPopup, StorageService, $ionicHistory, $state) {
   debugger;
   $ionicHistory.clearCache();
   var self = this;
   $scope.loadingAllElements = true;

   $scope.slideChanged = function(idx){
      $scope.slideIndex=idx;
   }

   var tipologiaRicerca = {
      voce: 1001,
      normativa: 1002,
      giurisprudenza: 1003,
      anacsoftlaw: 1004
   }
   var riferimenti = {
      anacsoftlaw: 1,
      normativa: 2,
      giurisprudenza: 3,
      articolonormativa: 4,
      voce: 5
   }

   $scope.color = {
      voce: 'rgb(38,168,226)',
      normativa: 'rgba(89,131,46, 1)',
      giurisprudenza: 'rgba(254,147,55,1)',
      anacsoftlaw: 'rgba(147,170,226,1)'
   }

   self.init = function(){
      $rootScope.appalti = {};
      $scope.appalti = {}
      var path = $location.url().split('/');
      debugger;
      $rootScope.appalti.tipo = path[path.length-1].replace(/-/g,' ');
      $scope.appalti.tipo = $rootScope.appalti.tipo;
      switch($rootScope.appalti.tipo) {
         case 'voci':
            $scope.appalti.titlecolor = 'rgb(38,168,226)';
            $scope.appalti.searchType = tipologiaRicerca.voce;
            $rootScope.searchType = tipologiaRicerca.voce;
            break;
         case 'normativa':
            $scope.appalti.titlecolor = 'rgba(89,131,46, 1)!important';
            $scope.appalti.searchType = tipologiaRicerca.normativa;
            $rootScope.searchType = tipologiaRicerca.normativa;
            break;
         case 'giurisprudenza':
            $scope.appalti.titlecolor = 'rgba(254,147,55,1)!important';
            $scope.appalti.searchType = tipologiaRicerca.giurisprudenza;
            $rootScope.searchType = tipologiaRicerca.giurisprudenza;
            break;
         case 'anac e softlaw':
            $scope.appalti.titlecolor = 'rgba(147,170,226,1)!important';
            $scope.appalti.searchType = tipologiaRicerca.anacsoftlaw;
            $rootScope.searchType = tipologiaRicerca.anacsoftlaw;
            break;
         default:
            break;
      }
   }
   
   self.init();
   $rootScope.all = {};
   RicercaService
      .getList($rootScope.searchType)
      .then(function(results){
         debugger;
         $rootScope.all = results.data.nodes
         $scope.loadingAllElements = false;
         RicercaService
          .getList($rootScope.searchType)
          .then(function(results){
             debugger;
             $rootScope.all = results.data.nodes
             $scope.loadingAllElements = false;
          },
          function(error){
             console.log(error)
          });

      },
      function(error){
         console.log(error)
      })

   $scope.search = "";
   /*this.init = function( element ) {
    self.$element = element;
    $scope.isOpen = angular.isDefined($attrs.isOpen) ? $scope.$parent.$eval($attrs.isOpen) : false;
   };*/

   $scope.reportEvent = function(event)  {
      console.log('Reporting : ' + event.type);
      $timeout(function() {
         $scope.data[event.type]++;
      })
   }


   $scope.searchKeyword = function(){
      console.trace('RicercaController: ')
      $ionicLoading.show({
         template: '<ion-spinner icon="lines" class="android"></ion-spinner>'
      });
      debugger;
   //ricerca delle keyword
      RicercaService
         .searchKeyword($scope.search)
         .then(function(results){
            debugger;
            $scope.voci = results.data.nodes;
            var voci = {
               voci : results.data.nodes
            }

            $ionicLoading.hide();
            if (voci.length < 1) {
               $ionicPopup.show({
                  template: '<p>Nessun risultato trovato. Riprovare</p>',
                  title: 'Nessun risultato',
                  //subTitle: 'Please use normal things',
                  scope: $scope,
                  buttons: [
                     { text: 'Ok' }
                  ]
               });
            }
         },
         function(error){
            $ionicLoading.hide();
            switch(error.status) 
            {
                case(404):
                    $ionicPopup.show({
                          template: '<p>Nessun risultato trovato. Riprovare</p>',
                          title: 'Nessun risultato',
                          //subTitle: 'Please use normal things',
                          scope: $scope,
                          buttons: [
                             { text: 'Ok' }
                          ]
                    });
                    break;
                case(403):
                    $ionicPopup.confirm({
                          template: '<p>Effettuare nuovamente il login.</p>',
                          title: 'Sessione scaduta',
                    }).then(function(res){
                        if(res)
                            $state.go('login');
                        else {
                            $ionicPlatform.exitApp();
                        }
                    });
                    
            }
            
         });
      var voceId = $stateParams.id;
   }
}])

.controller('DetailsController', ['$scope', '$stateParams','DetailsService', '$ionicLoading','$ionicPopup', function($scope, $stateParams, DetailsService, $ionicLoading, $ionicPopup){
   debugger;
   $ionicLoading.show({
         template: '<ion-spinner icon="lines" class="android"></ion-spinner>'
   });
   //ricerca delle keyword
   var id = $stateParams.id;

   DetailsService
      .getId(id)
      .then(
         function(results){
            debugger;
            $scope.det = results.data.nodes[0];
            console.log($scope.det)
            $ionicLoading.hide();
         },
         function(error){
            $ionicLoading.hide();
            $ionicPopup.show({
               template: '<p>Nessun risultato trovato. Riprovare</p>',
               title: 'Nessun risultato',
               //subTitle: 'Please use normal things',
               scope: $scope,
               buttons: [
                  { text: 'Ok' }
               ]
            });
         });
}])

/*
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
 

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
*/