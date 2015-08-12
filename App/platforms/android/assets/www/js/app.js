// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.services', 'LocalStorageModule', 'ionic.contrib.ui.cards']);

app.run(function ($ionicPlatform, $state, authService) {

    // Fill Authentication Data
    authService.fillAuthData();

    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }

        //console.log('isLogin', authService.authentication.isAuth);
        //if (authService.authentication.isAuth) {
        //    $state.go('tab.dash');
        //} else {
        //    $state.go('login');
        //}
        $state.go('tab.dash');
    });
})

app.config(function ($httpProvider) {
    //$httpProvider.interceptors.push('authInterceptorService');
});

app.directive('noScroll', function () {

    return {
        restrict: 'A',
        link: function ($scope, $element, $attr) {

            $element.on('touchmove', function (e) {
                e.preventDefault();
            });
        }
    }
})

app.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html",
        controller: "MainCtrl"
    })

    .state('menu', {
        url: '/menu',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    // Each tab has its own nav history stack:

    .state('login', {
        url: "/login",
        templateUrl: "templates/login.html",
        controller: 'LoginCtrl'
    })

    //.state('tab.account', {
    //    url: "/account",
    //    views: {
    //        'tab-dash': {
    //            templateUrl: "templates/account.html",
    //            controller: 'AccountCtrl'
    //        }
    //    }
    //})

    .state('tab.dash', {
        url: '/dash',
        views: {
            'tab-dash': {
                templateUrl: 'templates/tab-dash.html',
                controller: 'DashCtrl'
            }
        }
    })

    .state('tab.chats', {
        url: '/chats',
        views: {
            'tab-chats': {
                templateUrl: 'templates/tab-chats.html',
                controller: 'ChatsCtrl'
            }
        }
    })
      .state('tab.chat-detail', {
          url: '/chats/:chatId',
          views: {
              'tab-chats': {
                  templateUrl: 'templates/chat-detail.html',
                  controller: 'ChatDetailCtrl'
              }
          }
      })

    .state('currency-from', {
        url: '/currency-from',
        templateUrl: 'templates/currency-from.html',
        controller: 'CurrencyCtrl'
    })

    .state('currency-to', {
        url: '/currency-to',
        templateUrl: 'templates/currency-to.html',
        controller: 'CurrencyCtrl'
    })

    .state('complete', {
        url: '/complete',
        templateUrl: 'templates/complete.html',
        controller: 'CurrencyCtrl'
    })

    .state('tab.match', {
        url: '/match',
        views: {
            'tab-dash': {
                templateUrl: 'templates/match.html',
                controller: 'MatchCtrl'
            }
        }
    })

    .state('tab.post', {
        url: '/post',
        views: {
            'tab-post': {
                templateUrl: 'templates/post.html',
                controller: 'PostCtrl'
            }
        }
    })

    .state('tab.topup', {
        url: '/topup',
        views: {
            'tab-topup': {
                templateUrl: 'templates/topup.html'
                //controller: 'PostCtrl'
            }
        }
    })

    .state('rates', {
        url: '/rates',
        templateUrl: 'templates/rates.html',
        controller: 'RatesCtrl'
    })

    .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/account.html',
                controller: 'AccountCtrl'
            }
        }
    });



    // if none of the above states are matched, use this as the fallback
    //$urlRouterProvider.otherwise('/tab/dash');
    //$urlRouterProvider.otherwise('/rates');
});
