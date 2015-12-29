angular.module('dwguiabase.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
    $scope.openInstagram = function() {
        window.open("https://instagram.com/encontremed", '_system');
    };
    $scope.openFacebook = function() {
        window.open("https://www.facebook.com/EncontreMed", '_system');
    };
    $scope.openYoutube = function() {
        window.open("https://www.youtube.com/user/harvardmedicalschool", '_system');
    };

    $ionicModal.fromTemplateUrl('app/main/termos.html', {
        scope: $scope
    }).then(function(modalTermos) {
        $scope.modalTermos = modalTermos;
    });

    $scope.closeTermos = function() {
        $scope.modalTermos.hide();
    };

    $scope.openTermos = function() {
        $scope.modalTermos.show();
    };


});
