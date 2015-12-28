angular.module('dwguiabase.filterctrl', [])

.controller('filterCtrl', function($state, $scope, $ionicHistory, $rootScope, $cordovaGeolocation, $stateParams, sharedProperties, $ionicLoading, $ionicPopup, $ionicModal, filterServices, $templateCache, RESOURCES) {

    $scope.filterArgs = {};

    result = _.find($rootScope.categoriesTemp, {
        'id': parseInt($stateParams.id)
    });

    if (result) {
        $scope.title = result.name;
        $scope.has_health_insurance = result.has_health_insurance;
        if (!$scope.has_health_insurance)
            $scope.filterArgs.attendance = 1;
    } else {
        $scope.title = "Busca";
    }


    $ionicLoading.show({
        template: RESOURCES.TEMPLATE_LOADING
    });

    var posOptions = {
        timeout: 10000,
        enableHighAccuracy: false
    };

    $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function(position) {
            //console.log("::::: GPS POSITION ::::::", position);
            $scope.filterArgs.latitude = position.coords.latitude;
            $scope.filterArgs.longitude = position.coords.longitude;
            $ionicLoading.hide();

            getInfoLocation();

        }, function(err) {
            $ionicLoading.hide();
            //console.log("::::: ERRO GPS ::::::", err);
            $ionicPopup.show({
                title: 'Localização',
                subTitle: 'Não foi possível determinar sua localização, favor ativar o GPS.',
                scope: $scope,
                buttons: [{
                    text: 'ok',
                    type: "button-calm",
                    onTap: function() {
                        $ionicHistory.goBack();
                    }
                }]
            });
        }).then(function() {
            $ionicLoading.hide();

        });

    var fromGps = false;

    function getInfoLocation() {
        filterServices.getLocaltionInfo($scope.filterArgs.latitude, $scope.filterArgs.longitude).then(function(response) {
            var googleData = response.data.data;
            filterServices.getStates().then(function(response) {
                _.forEach(response.data, function(n, key) {
                    if (n.name === googleData.state) {
                        $scope.states = response.data;
                        $scope.filterArgs.state = n.id;
                        $scope.labels.stateLabel = n.name;
                        _.forEach(n.citys, function(n, key) {
                            if (n.name == googleData.city) {
                                $scope.filterArgs.city = n;
                                $scope.filterArgs.city.id = n.id;
                                $scope.labels.cityLabel = n.name;
                            }
                        });
                    }
                });
            });
        });
    }

    //////////// END GPS

    //////////// BEGIN MODALS



    // attendancesModal
    $ionicModal.fromTemplateUrl('app/filter/attendancesModal.html', {
        scope: $scope
    }).then(function(attendancesModal) {
        $scope.attendancesModal = attendancesModal;
    });

    $scope.closeAttendances = function() {
        $scope.attendancesModal.hide();
    };

    $scope.openAttendances = function() {
        $scope.attendancesModal.show();

    };

    // statesModal
    $ionicModal.fromTemplateUrl('app/filter/statesModal.html', {
        scope: $scope
    }).then(function(statesModal) {
        $scope.statesModal = statesModal;
    });

    $scope.closeStates = function() {
        $scope.statesModal.hide();
    };

    $scope.openStates = function() {
        $scope.statesModal.show();
        filterServices.getStates().then(function(response) {
            $scope.states = response.data;
        });
    };

    // citysModal
    $ionicModal.fromTemplateUrl('app/filter/citysModal.html', {
        scope: $scope
    }).then(function(citysModal) {
        $scope.citysModal = citysModal;
    });

    $scope.closeCitys = function() {
        $scope.citysModal.hide();
    };

    $scope.openCitys = function() {
        $scope.citysModal.show();
        $scope.citys = $scope.filterArgs.citys;
    };

    // healthInsuranceModal
    $ionicModal.fromTemplateUrl('app/filter/healthInsuranceModal.html', {
        scope: $scope
    }).then(function(healthInsuranceModal) {
        $scope.healthInsuranceModal = healthInsuranceModal;
    });

    $scope.closeHealthInsurance = function() {
        $scope.healthInsuranceModal.hide();
    };

    $scope.openHealthInsurance = function() {
        $scope.healthInsuranceModal.show();
        filterServices.getHealthInsurances().then(function(response) {
            $scope.healthInsurances = response.data;
        });
    };

    // SpecialtyModal
    $ionicModal.fromTemplateUrl('app/filter/specialtyModal.html', {
        scope: $scope
    }).then(function(specialtyModal) {
        $scope.specialtyModal = specialtyModal;
    });

    $scope.closeSpecialty = function() {
        $scope.specialtyModal.hide();
    };

    $scope.openSpecialty = function() {
        $scope.specialtyModal.show();
        filterServices.getSpecialty($stateParams.id).then(function(response) {
            $scope.specialties = _.sortBy(response.data.specialty, 'name');
        });
    };

    //////////// END MODALS

    $scope.labels = {};


    var attendances = ['Particular', 'Convênio'];

    $scope.$watch('filterArgs.attendance', function(n, o) {
        $scope.labels.attendanceLabel = attendances[parseInt($scope.filterArgs.attendance - 1)];
        if ($scope.filterArgs.attendance == 1) {
            $scope.filterArgs.healthInsurance = {
                value: 0
            };
        } else {
            if ($scope.filterArgs.healthInsurance) {
                delete $scope.filterArgs.healthInsurance;
                delete $scope.labels.healthInsuranceLabel
            }
        }
    });

    $scope.$watch('filterArgs.healthInsurance', function(n, o) {
        if ($scope.healthInsurances) {
            var result = _.find($scope.healthInsurances, {
                'id': $scope.filterArgs.healthInsurance
            });
            if (result)
                $scope.labels.healthInsuranceLabel = result.name;
        }
    });

    $scope.$watch('filterArgs.state', function(n, o) {
        if ($scope.filterArgs.state) {
            var result = _.find($scope.states, {
                'id': $scope.filterArgs.state
            });
            $scope.filterArgs.citys = result.citys;
            $scope.labels.stateLabel = result.name;
            delete $scope.labels.cityLabel;
            // if ($scope.filterArgs.city)
            // delete $scope.filterArgs.city.id;
        }
    });

    $scope.$watch('filterArgs.specialty', function(n, o) {
        if ($scope.filterArgs.specialty) {
            var result = _.find($scope.specialties, {
                'id': $scope.filterArgs.specialty
            });
            $scope.labels.specialtyLabel = result.name;
        }
    });

    $scope.$watch('filterArgs.city', function(n, o) {
        if ($scope.filterArgs.state)
            $scope.labels.cityLabel = $scope.filterArgs.city.name;
    });

    $scope.filter = function() {
        var data = {
            city: $scope.filterArgs.city.id,
            healthInsurance: ($scope.filterArgs.attendance == 1) ? 0 : $scope.filterArgs.healthInsurance,
            attendance: $scope.filterArgs.attendance,
            category: parseInt($stateParams.id),
            latitude: $scope.filterArgs.latitude,
            longitude: $scope.filterArgs.longitude,
            specialty: $scope.filterArgs.specialty
        };

        filterServices.postSearch(data).then(function(response) {
            var data = response.data;
            if (data.size > 0) {
                sharedProperties.setObject(response.data);
                $state.go('app.entitiesList', {
                    idCategoria: $stateParams.id
                });
            } else {
                $ionicPopup.show({
                    title: 'Resultado',
                    subTitle: 'Não encontramos nenhum resultado para a sua pesquisa.',
                    scope: $scope,
                    buttons: [{
                        type: "button-calm",
                        text: 'ok'
                    }]
                });
            }
        });

    };

});
