angular.module('dwguiabase.services', [])

.constant('RESOURCES', {
    'IP': 'http://encontremed.deway.com.br/',
    // 'IP': 'http://127.0.0.1:8080/',
    'GET_CATEGORIES': 'categories/',
    'CATEGORY_AND_ENTITY': 'categoryAndEntity/',
    'ENTITY': 'entity/',
    'HEALTHINSURANCES': 'healthInsurances/',
    'STATES': 'states/',
    'BANNERS': 'banner/',
    'SEARCH': 'api/search/',
    'SPECIALTY': 'api/specialty/',
    // Loading
    'TEMPLATE_LOADING':'<img src="img/loading2.GIF" style="HEIGHT: 40px;"></img>'
})

.factory('guiaServices', function($q, $http, RESOURCES, $ionicLoading) {
    //$ionicLoading.hide = function() {};

    function getCategories(formData) {
        $ionicLoading.show({
            template: RESOURCES.TEMPLATE_LOADING
        });

        return $http({
            timeout: 10000,
            method: 'GET',
            url: RESOURCES.IP + RESOURCES.GET_CATEGORIES,
            headers: {
                'Content-Type': 'application/json'
            }

        }).success(function(response) {
            $ionicLoading.hide();
        }).error(function(error) {
            $ionicLoading.hide();
        });
    }

    function getCategoryAndEntity(id) {
        $ionicLoading.show({
            template: RESOURCES.TEMPLATE_LOADING
        });

        return $http({
            method: 'GET',
            url: RESOURCES.IP + RESOURCES.CATEGORY_AND_ENTITY + id,
            headers: {
                'Content-Type': 'application/json'
            }

        }).success(function(response) {
            $ionicLoading.hide();
        }).error(function(error) {
            $ionicLoading.hide();
        });
    }

    function getEntity(id) {
        $ionicLoading.show({
            template: RESOURCES.TEMPLATE_LOADING
        });

        return $http({
            method: 'GET',
            url: RESOURCES.IP + RESOURCES.ENTITY + id,
            headers: {
                'Content-Type': 'application/json'
            }

        }).success(function(response) {
            $ionicLoading.hide();
        }).error(function(error) {
            $ionicLoading.hide();
        });
    }

    function getBanners() {
        $ionicLoading.show({
            template: RESOURCES.TEMPLATE_LOADING
        });

        return $http({
            timeout: 10000,
            method: 'GET',
            url: RESOURCES.IP + RESOURCES.BANNERS,
            headers: {
                'Content-Type': 'application/json'
            }

        }).success(function(response) {
            $ionicLoading.hide();
        }).error(function(error) {
            $ionicLoading.hide();
        });
    }
    return {
        getCategories: getCategories,
        getCategoryAndEntity: getCategoryAndEntity,
        getEntity: getEntity,
        getBanners: getBanners
    };

})

.factory('filterServices', function($q, $http, RESOURCES, $ionicLoading) {
        function getLocaltionInfo(latitude, longitude) {
            $ionicLoading.show({
                template: RESOURCES.TEMPLATE_LOADING
            });

            return $http({
                method: 'GET',
                url: "http://nodeutil.deway.com.br/api/location/" + latitude + ',' + longitude,
                headers: {
                    'Content-Type': 'application/json'
                }

            }).success(function(response) {
                $ionicLoading.hide();
            }).error(function(error) {
                $ionicLoading.hide();
            });
        }

        function getHealthInsurances(id) {
            $ionicLoading.show({
                template: RESOURCES.TEMPLATE_LOADING
            });

            return $http({
                method: 'GET',
                url: RESOURCES.IP + RESOURCES.HEALTHINSURANCES,
                headers: {
                    'Content-Type': 'application/json'
                }

            }).success(function(response) {
                $ionicLoading.hide();
            }).error(function(error) {
                $ionicLoading.hide();
            });
        }



        function getSpecialty(idCategoria) {
            $ionicLoading.show({
                template: RESOURCES.TEMPLATE_LOADING
            });

            return $http({
                method: 'GET',
                url: RESOURCES.IP + RESOURCES.GET_CATEGORIES + idCategoria,
                headers: {
                    'Content-Type': 'application/json'
                }

            }).success(function(response) {
                $ionicLoading.hide();
            }).error(function(error) {
                $ionicLoading.hide();
            });
        }

        function getStates(id) {
            $ionicLoading.show({
                template: RESOURCES.TEMPLATE_LOADING
            });

            return $http({
                method: 'GET',
                url: RESOURCES.IP + RESOURCES.STATES,
                headers: {
                    'Content-Type': 'application/json'
                }

            }).success(function(response) {
                $ionicLoading.hide();
            }).error(function(error) {
                $ionicLoading.hide();
            });
        }

        function postSearch(formData) {
            $ionicLoading.show({
                template: RESOURCES.TEMPLATE_LOADING
            });

            return $http({
                method: 'POST',
                url: RESOURCES.IP + RESOURCES.SEARCH,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: formData

            }).success(function(response) {
                $ionicLoading.hide();
            }).error(function(error) {
                $ionicLoading.hide();
            });
        }
        return {
            getHealthInsurances: getHealthInsurances,
            getStates: getStates,
            postSearch: postSearch,
            getSpecialty: getSpecialty,
            getLocaltionInfo: getLocaltionInfo,
        };


    })
    //Use it to share data between controllers
    .service('sharedProperties', function() {
        var stringValue = '';
        var objectValue = {
            data: ''
        };

        return {
            getString: function() {
                return stringValue;
            },
            setString: function(value) {
                stringValue = value;
            },
            setObject: function(value) {
                objectValue.data = value;
            },
            getObject: function() {
                return objectValue;
            }
        };
    });
