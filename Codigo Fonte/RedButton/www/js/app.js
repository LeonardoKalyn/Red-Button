// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'ngCordova','ionic.service.core', 'starter.controllers', 'starter.services'])
.run(function($ionicPlatform, $rootScope, $ionicSideMenuDelegate, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $rootScope.sidemenuClick = function(state){
    $state.go(state);
    $ionicSideMenuDelegate.toggleLeft();
  }

  $rootScope.sidemenuToggle = function(){
    $ionicSideMenuDelegate.toggleLeft();
  }
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      controller: 'HomeCtrl'
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'templates/dashboard.html',
      controller: 'DashCtrl'
    })
    .state('profile', {
    url: '/profile',
    templateUrl: 'templates/profile.html',
    controller: 'ProfileCtrl'
  })
    .state('info', {
    url: '/info',
    templateUrl: 'templates/info.html',
    controller: 'InfoCtrl'
  })
    .state('config', {
      url: '/config',
      templateUrl: 'templates/config.html',
      controller: 'ConfigCtrl'
    })
    .state('contacts', {
      url: '/contacts',
      templateUrl: 'templates/contacts.html',
      controller: 'ContactsCtrl'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

});
