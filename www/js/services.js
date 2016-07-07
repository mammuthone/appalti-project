'use strict';

angular.module('appalti.services', [])

.service('SessionService', ['$rootScope', function($rootScope){
    return {
        setAppaltiToken : function(value){
            localStorage.setItem('Appalti.Token', value);
        },
        getAppaltiToken : function(){
            return localStorage.getItem('Appalti.Token');
        },
        setItem: function(key, value) {
            localStorage.setItem(key, value);
        },
        getItem: function(key) {
            return localStorage.getItem(key);
        },
        removeItem: function(key){
            localStorage.removeItem(key);
        },
        exists: function(key) {
            return (!(this.getItem(key) == null))
        }
    } 
}])

.service('UserService', ['$q', '$http', '$rootScope', '$location', '$ionicPlatform','ApiUrl',
    function ($q, $http, $rootScope, $location, $ionicPlatform, ApiUrl){

    var service = {
        getToken: getToken, 
        login: login,
        register: register
    }

    var deferred = $q.defer();

    function getToken() {
        var tokenResource = 'http://94.32.66.29/rest/user/token.json';
        return $http.post(tokenResource);
    }

    function login(userData, token){
        console.log(userData)

        var user = {
            username: userData.username,
            password : userData.password
        }

        var headers = {
            headers: {
                'Content-Type' : 'application/json; charset=UTF-8',
                'X-CSRF-Token' : token
            }
        }
        return $http.post(ApiUrl.loginUrl, user, headers);
    }

    function register() {}

    return service;
}])

.service('VociService', ['$http', '$rootScope', function($http, $rootScope){
    var searchVoce = function(keyword) {
        debugger;
        return $http
            .get('http://94.32.66.29/json/search_voci/'+keyword, {cache:false})
            .then(
                function(results) {
                return results.data.nodes; 
                },
                function(results){
                    console.log(results)
                });
    }

    var getVoce = function(node) {
        debugger;
        return $http
                .get('http://94.32.66.29/json/get_voci/'+node, {cache:false})
                .then(function(results) {
                    return results.data.nodes[0]; 
                });
    }

    return {
        getVoce : getVoce,
        searchVoce: searchVoce
    }
}])

.service('RiferimentiService', ['$http', '$rootScope', '$q','ApiUrl', function($http, $rootScope, $q, ApiUrl){
    
    var get_anacsoftlaw = function(values) {
        console.trace("Entering in RiferimentiService: get specific node of anac_softlaw");
        console.trace("Retrieving: ", values)

        var promiseList = [];

        console.log(values)
        values.forEach(function(value){
            promiseList.push($http.get(ApiUrl.getAnac + value, {cache:false}))
        })
        console.trace("Lista promise: ", promiseList)
       
        return promiseList;
    }

    var get_normative = function(values) {
        console.trace("Entering in RiferimentiService: get specific node of get_normative");
        console.trace("Retrieving: ", values)

        var promiseList = [];

        console.log(values)
        values.forEach(function(value){
            promiseList.push($http.get(ApiUrl.getNormative + value, {cache:false}))
        })
        console.trace("Lista promise: ", promiseList)
       
        return promiseList;
    }

    var get_giurisprudenza = function(values) {
        console.trace("Entering in RiferimentiService: get specific node of get_giurisprudenza");
        console.trace("Retrieving: ", values)

        var promiseList = [];

        console.log(values)
        values.forEach(function(value){
            promiseList.push($http.get(ApiUrl.getGiurisprudenza + value, {cache:false}))
        });

        console.trace("Lista promise: ", promiseList)
       
        return promiseList;
    }

    var get_articolonormativa = function(values) {
        console.trace("Entering in RiferimentiService: get specific node of get_articolonormativa");
        console.trace("Retrieving: ", values)

        var promiseList = [];

        var url_get = 'http://94.32.66.29/json/get_articolonormativa/';
        console.log(values)
        values.forEach(function(value){
            promiseList.push($http.get(url_get+value, {cache:false}))
        })
        console.trace("Lista promise: ", promiseList)
       
        return promiseList;
    }

    var get_voci = function(values) {
        console.trace("Entering in RiferimentiService: get specific node of get_voci");
        console.trace("Retrieving: ", values)

        var promiseList = [];

        console.log(values)
        values.forEach(function(value){
            promiseList.push($http.get(ApiUrl.getVoci + value, {cache:false}))
        })
        console.trace("Lista promise: ", promiseList)
       
        return promiseList;
    }

    return {
        get_normative: get_normative,
        get_anacsoftlaw: get_anacsoftlaw,
        get_giurisprudenza: get_giurisprudenza,
        get_articolonormativa: get_articolonormativa,
        get_voci: get_voci
    }
}])

.factory('User', ['$q', 
    '$http', '$rootScope', '$location', '$ionicPlatform','ApiUrl',
    function ($q, $http, $rootScope, $location, $ionicPlatform, ApiUrl){

        return {

            getSubscription: function(){
                var defer = $q.defer();

                $http.get(ApiUrl.subscription)
                    .success(function(data,status,heaers,config){
                        defer.resolve(data.nodes);
                    })
                    .error(function(data,status,headers,config){
                        defer.reject(data.nodes)
                    })
                return defer.promise;
            },

            getSessionToken: function() {
                var defer = $q.defer();
                debugger;
                $http.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
                $http
                    .post(ApiUrl.tokenUrl, {withCredentials: true})
                    .success(function(data,status,headers,config){
                        defer.resolve(data);
                    })
                    .error(function(data,status,headers,config){
                        defer.reject(data);
                    });

                return defer.promise;   
            },

            login: function(userData){
                var defer = $q.defer();
                var user = {
                    username: userData.username,
                    password : userData.password
                }

                
                $http
                    ({
                        method      : 'POST',
                        url         : ApiUrl.loginUrl,
                        dataType    : 'json',
                        crossDomain : true,
                        data        : 'username=' + user.username + '&password=' + user.password,
                        headers: {
                        'Content-Type' : 'application/x-www-form-urlencoded',
                        'X-CSRF-Token' : localStorage.getItem('Appalti.Token')
                    }
                })
                .success(function(data, status, headers, config){
                    defer.resolve(data);
                })
                .error(function(data, status, headers, config){
                    defer.reject(status);
                })

                return defer.promise;
            },

            logout: function() {
                debugger;
                var defer = $q.defer();
                $http
                    ({
                        method      : 'POST',
                        url         : ApiUrl.logout,
                        dataType    : 'json',
                        crossDomain : true,
                        //data        : 'username=' + user.username + '&password=' + user.password,
                        headers: {
                            'Accept': "application/json", 
                            'Content-Type' : 'application/x-www-form-urlencoded',
                            'X-CSRF-Token' : localStorage.getItem('Appalti.Token')
                        }
                    })
                    .success(function(data, status, headers, config){
                        defer.resolve(data);
                    })
                    .error(function(data, status, headers, config){
                        defer.reject(status);
                    })

                    return defer.promise;
                },

            register: function() {
                var defer = $q.defer();

                $http
                    ({
                        method: 'POST',
                        url: ApiUrl.register,
                        dataType : 'json',
                        crossDomain: true
                    })
            }

        }

}])

.service('RicercaService', ['$http', '$rootScope', 'ApiUrl', function($http, $rootScope, ApiUrl){
    
    var tipologiaRicerca = {
      voce: 1001,
      normativa: 1002,
      giurisprudenza: 1003,
      anacsoftlaw: 1004
    }
    
    var api = function() {
        debugger;
         
        switch ($rootScope.searchType) {
            case 1001:
                return ApiUrl.searchVoci;
                break;
            case 1002:
                return ApiUrl.searchNormative;
                break;
            case 1003:
                return ApiUrl.searchGiurisprudenza;
                break;
            case 1004:
                return ApiUrl.searchAnac;
                break;
        }
    }

    var apiGetList = function() {
        debugger;
         
        switch ($rootScope.searchType) {
            case 1001:
                return ApiUrl.getVoci;
                break;
            case 1002:
                return ApiUrl.getNormative;
                break;
            case 1003:
                return ApiUrl.getGiurisprudenza;
                break;
            case 1004:
                return ApiUrl.getAnac;
                break;
        }
    }


    var searchh = function(){
        return $http.post('http://276b5d53.ngrok.io/v1/users/');
    }


    var getList = function(){
        return $http.get(apiGetList(), { 
            headers : {
                'X-CSRF-Token' : $rootScope.session.token,
                'Content-Type': 'text/plain',
                'Cookie' : $rootScope.session.session_name + '=' + $rootScope.session.sessid
            }
        })
    }

    var searchKeyword = function(keyword) {
        debugger;
        console.log($rootScope.session);
        var user = {
            username: $rootScope.username,
            password: $rootScope.password
        }

        return $http.post(api() + keyword, { 
            headers : {
                'Content-Type': 'text/plain',
                'Cookie' : $rootScope.session.session_name + '=' + $rootScope.session.sessid,
                'X-CSRF-Token' : localStorage.getItem('Appalti.Token')
            }
        })
    }

 
    return {
        searchKeyword: searchKeyword,
        getList: getList,
        searchh: searchh 
    };
}])

.service('DetailsService', ['$q', '$http', 'ApiUrl','$rootScope', function($q, $http, ApiUrl, $rootScope){
    
    $rootScope.appalti = {
        searchType: null
    }   

    var tipologiaRicerca = {
      voce: 1001,
      normativa: 1002,
      giurisprudenza: 1003,
      anacsoftlaw: 1004
    }
    
    var kind = $rootScope.appalti.searchType;

    var api = function() {
        debugger;
         
        switch ($rootScope.appalti.searchType) {
            case 1001:
                return ApiUrl.searchVoci;
                break;
            case 1002:
                return ApiUrl.searchNormative;
                break;
            case 1003:
                return ApiUrl.searchGiurisprudenza;
                break;
            case 1004:
                return ApiUrl.searchAnac;
                break;
        }
    }


    var _getId = function(id){
        var defer = $q.defer();
        
        return $http.post(ApiUrl.getItem + id, { 
            headers : {
                'Content-Type': 'text/plain',
                'Cookie' : $rootScope.session.session_name + '=' + $rootScope.session.sessid,
                'X-CSRF-Token' : localStorage.getItem('Appalti.Token')
            }
        })
        .success(function(data, status, headers, config){
            defer.resolve(data);
        })
        .error(function(data, status, headers, config){
            defer.reject(status);
        })
    }


    return {
        getId : _getId
    }
}])

.factory ('StorageService', function ($localStorage) {
    $localStorage = $localStorage.$default({
      store: []
    });

    var _getAll = function () {
      return $localStorage.store;
    };
    var _add = function (item) {
      $localStorage.store.push(item);
    }
    var _remove = function (item) {
      $localStorage.store.splice($localStorage.store.indexOf(item), 1);
    }


    return {
        getAll: _getAll,
        add: _add,
        remove: _remove
      };
})