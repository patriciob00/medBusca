/**
 * Created by paulogabriel on 27/07/15.
 */

angular.module('dwguiabase.mainctrl', [])

.controller('mainCtrl', function($scope, $window, $ionicPlatform, $ionicSlideBoxDelegate, $cordovaNetwork, $ionicPopup, $state, $stateParams, guiaServices, $timeout, $rootScope) {

    document.addEventListener("deviceready", function() {
        var type = $cordovaNetwork.getNetwork();
        var isOnline = $cordovaNetwork.isOnline();
        var isOffline = $cordovaNetwork.isOffline();

        if (isOffline) {
            $ionicPopup.show({
                title: "Sem Conexão",
                // subTitle: 'Conecte-se à Internet para utilizar o App EncontreMed.',
                subTitle: 'Conexão com a Internet está atualmente indisponível',
                scope: $scope,
            });
        }

        // listen for Online event
        $scope.$on('$cordovaNetwork:online', function(event, networkState) {
            $window.location.reload();
        });

        // listen for Offline event
        $scope.$on('$cordovaNetwork:offline', function(event, networkState) {
            $ionicPopup.show({
                title: "Sem Conexão",
                // subTitle: 'Conecte-se à Internet para utilizar o App EncontreMed.',
                subTitle: 'Conexão com a Internet está atualmente indisponível',
                scope: $scope,
            });
        });
    }, false);



    guiaServices.getCategories().then(function(response) {
        $scope.categories = _.sortByOrder(response.data, ['position'], ['asc']);
        $rootScope.categoriesTemp = response.data;

        guiaServices.getBanners().then(function(response) {
            $scope.banners = _.shuffle(response.data);
            $ionicSlideBoxDelegate.update();
        });

    });

    $scope.openWebView = function(banner) {
        if (banner.url !== "") {
            window.open(banner.url, '_system');
        } else {
            $state.go('app.entityDetails', {
                id: banner.interno
            });
        }
    };

    $scope.slideHasChanged = function($index) {
        if ($index == $scope.banners.length - 1) {
            $timeout(function() {
                $ionicSlideBoxDelegate.slide(0);
                $ionicSlideBoxDelegate.update();
            }, 4000);
        }
    };

});
