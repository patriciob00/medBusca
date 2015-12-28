/**
 * Created by paulogabriel on 27/07/15.
 */

angular.module('dwguiabase.contactctrl', ['ui.utils.masks'])

.controller('contactCtrl', function($state, $scope, $http, $ionicPopup) {
    $scope.contactData = {};

    $scope.sendContact = function() {
        $scope.payload = {
            'to': ['contato@encontremed.com.br'],
            'subject': 'Contato EncontreMed',
            'body': "<b>Nome:</b> " + $scope.contactData.name + "<br/>" +
                "<b>E-mail:</b> " + $scope.contactData.email + "<br/>" +
                "<b>Telefone:</b> " + $scope.contactData.phone + "<br/><br/>" +
                "<b>Mensagem:</b> " + "<br/><br/>" + "    " + $scope.contactData.message
        };
        $http({
            method: 'POST',
            url: 'http://wizapp.deway.com.br/core/send_mail/',
            data: $scope.payload,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        $scope.contactSuccess();
    };

    $scope.contactSuccess = function() {
        $ionicPopup.show({
            title: 'Contato',
            subTitle: 'Seu contato foi enviado com sucesso! Em breve retornaremos sua mensagem.',
            scope: $scope,
            buttons: [{
                type: "button-calm",
                text: 'Ok'
            }]
        });
        $scope.contactData = {};
    };

});
