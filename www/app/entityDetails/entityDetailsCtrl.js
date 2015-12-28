/**
 * Created by paulogabriel on 27/07/15.
 */

angular.module('dwguiabase.entitydetailsctrl', ['uiGmapgoogle-maps'])

.controller('entityDetailsCtrl', function($state, $scope, $stateParams, guiaServices,$ionicModal, $cordovaSocialSharing) {
    $scope.isFav = 1;
    guiaServices.getEntity($stateParams.id).then(function(response) {
        //console.log(response);
        $scope.entity = response.data;
        
        $scope.setMapConfig();
        //Begin modal maps
        $ionicModal.fromTemplateUrl('app/entityDetails/howToGet.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.howToGet = modal;
        });

        $scope.showHowToGet = function() {
            $scope.howToGet.show();
        };

        $scope.closehowToGet = function() {
            $scope.howToGet.hide();
        };
        //End modal maps

        $scope.setFavorites();
    });


    $scope.isAndroid = function(){
        return ionic.Platform.isAndroid();
    };

    $scope.isIOS = function(){
        return ionic.Platform.isIOS();
    };

    $scope.openDialup = function() {
        window.open("tel:" + $scope.entity.phone1, '_system');
    };

    $scope.openMaps = function() {
        if (ionic.Platform.isAndroid())
            window.open("geo:0,0?q=" + $scope.entity.latitude + "," + $scope.entity.longitude, '_system');
        if (ionic.Platform.isIOS()) {
            $scope.showHowToGet();
        }
    };


    $scope.openMapWebsite = function(url) {
        window.open(url, '_system', "location=0,resizable=0,menubar=0")
    };

    $scope.openWebsite = function() {
        window.open($scope.entity.website, '_system');
    };

    $scope.openEmail = function() {
        window.open("mailto:" + $scope.entity.email, '_system');
    };

    $scope.setMapConfig = function() {

        $scope.map = {
            center: {
                latitude: parseFloat($scope.entity.latitude),
                longitude: parseFloat($scope.entity.longitude)
            },
            zoom: 17,
            styles: Util.getMapTheme()
        };

        $scope.marker = {
            id: 0,
            coords: {
                latitude: parseFloat($scope.entity.latitude),
                longitude: parseFloat($scope.entity.longitude)
            },
            options: {
                draggable: true,
                icon: {
                    url: 'img/PINMedico@2x.png',
                    scaledSize: {
                        "width": 23,
                        "height": 37,
                        "G": "px",
                        "D": "px"
                    }
                }
            },
            events: {
                dragend: function(marker, eventName, args) {

                    $scope.marker.options = {
                        draggable: true,
                        labelAnchor: "100 0",
                        labelClass: "marker-labels",
                        icon: {
                            url: 'img/PINMedico@2x.png',
                            scaledSize: {
                                "width": 23,
                                "height": 37,
                                "G": "px",
                                "D": "px"
                            }
                        }
                    };
                }
            }
        };
    };

    //Toggle the details of entity.
    //$scope.EntityDetails = false;
    //$scope.showDetails = "Mostrar Detalhes";
    //
    //$scope.showEntityDetails = function() {
    //    if (!$scope.EntityDetails) {
    //        $scope.EntityDetails = true;
    //        $scope.showDetails = "Fechar Detalhes";
    //    } else {
    //        $scope.EntityDetails = false;
    //        $scope.showDetails = "Mostrar Detalhes";
    //    }
    //};

    //Social Sharing
    $scope.shareEntity = function () {
        $scope.address = $scope.entity.street + ", " + $scope.entity.neighborhood + ", " + $scope.entity.city.name;
        $scope.message = $scope.entity.name + "\n" +
                         $scope.entity.description + "\n" +
                         $scope.entity.status1 + " / " + $scope.entity.status2 + "\n" +
                         $scope.entity.phone1 + "\n" +
                         $scope.address + "\n" +
                         $scope.entity.email + "\n" +
                         $scope.entity.website + "\n\n" +
                         "Compartilhado Via EncontreMed App";

        $cordovaSocialSharing
            //.share(message, subject, file, link)
            .share($scope.message, "", "", "") // Share via native share sheet
            .then(function(result) {
                // Success!
            }, function(err) {
                // An error occured. Show a message to the user
            });
    };


    //Favorites

    $scope.setFavorites = function () {

        var favorites = Lockr.get('favorites');
        var isFavorite = _.result(_.find(favorites, function(obj) {
            return obj.entity.id == $stateParams.id;
        }), 'entity');

        if (isFavorite) {
            $scope.isFav = 0;
            $scope.favoriteText = "Remover da lista de favoritos";
        } else {
            $scope.isFav = 1;
            $scope.favoriteText = "Adicionar à lista de favoritos";
        }


        $scope.markAs = function(setFav) {
            var favorite = Lockr.get('favorites');

            var fav = _.result(_.find(favorite, function(obj) {
                return obj.entity.id == $stateParams.id;
            }), 'entity');

            if (fav) setFav = false;

            switch (setFav) {
                case true:
                    if (favorites) {
                        $scope.isFav = 0;
                        $scope.favoriteText = "Remover da lista de favoritos";
                        Lockr.sadd('favorites', {
                            entity: $scope.entity
                        });
                    } else {
                        $scope.isFav = 0;
                        $scope.favoriteText = "Remover da lista de favoritos";
                        Lockr.set('favorites', [{
                            entity: $scope.entity
                        }]);
                    }
                    break;
                case false:
                    $scope.isFav = 1;
                    $scope.favoriteText = "Adicionar à lista de favoritos";
                    Lockr.removeByIndex('favorites', {
                        entity: $scope.entity
                    });
                    break;
            }
        };

    };

});
