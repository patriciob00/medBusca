angular.module('dwguiabase', ['ionic', 'jett.ionic.filter.bar', 'dwguiabase.controllers', 'dwguiabase.mainctrl', 'dwguiabase.filterctrl', 'dwguiabase.favoritesctrl',
    'dwguiabase.entitieslistctrl', 'dwguiabase.entitydetailsctrl', 'dwguiabase.contactctrl', 'dwguiabase.services', 'ngCordova'])

.run(function($ionicPlatform, $ionicPopup) {
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


.config(function($ionicConfigProvider) {
    if (!ionic.Platform.isIOS()) $ionicConfigProvider.scrolling.jsScrolling(false);
    
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $ionicFilterBarConfigProvider) {
    $stateProvider

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.main', {
        url: '/main',
        views: {
            'menuContent': {
                templateUrl: 'app/main/main.html',
                controller: 'mainCtrl'
            }
        }
    })

    .state('app.filter', {
        url: '/filter/:id',
        views: {
            'menuContent': {
                templateUrl: 'app/filter/filter.html',
                controller: 'filterCtrl'
            }
        }
    })

    .state('app.entitiesList', {
        url: '/entities/:idCategoria',
        views: {
            'menuContent': {
                templateUrl: 'app/entitiesList/entitiesList.html',
                controller: 'entitiesListCtrl'
            }
        }
    })

    .state('app.entityDetails', {
        url: '/entity/:id',
        views: {
            'menuContent': {
                templateUrl: 'app/entityDetails/entityDetails.html',
                controller: 'entityDetailsCtrl'
            }
        }
    })

    .state('app.favorites', {
        url: '/favorites',
        views: {
            'menuContent': {
                templateUrl: 'app/favorites/favorites.html',
                controller: 'favoritesCtrl'
            }
        }
    })

    .state('app.contact', {
        url: '/contact',
        views: {
            'menuContent': {
                templateUrl: 'app/contact/contact.html',
                controller: 'contactCtrl'
            }
        }
    });

    $urlRouterProvider.otherwise('/app/main');


    //NavBar align title to center.
    $ionicConfigProvider.navBar.alignTitle('center');

});
