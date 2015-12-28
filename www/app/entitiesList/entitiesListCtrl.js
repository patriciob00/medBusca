angular.module('dwguiabase.entitieslistctrl', ['jett.ionic.filter.bar'])

.controller('entitiesListCtrl' , function($state, $timeout, $ionicFilterBar, $scope, $stateParams, guiaServices, sharedProperties) {
    entities = sharedProperties.getObject().data.entities;
    $scope.entities = _.sortByOrder(entities, ['distance'],['asc'])

    	var filterBarInstance,
    	items = [],

    	showFilterBar = function () {
    		filterBarInstance = $ionicFilterBar.show({
    			items: $scope.entities,
    			update: function (filteredItems) {
    				$scope.entities = filteredItems;
    			}
    		})
    	};

    	refreshItems = function () {
      		if (filterBarInstance) {
        		filterBarInstance();
        		filterBarInstance = null;
      		}

      		$timeout(function () {
        		entities = sharedProperties.getObject().data.entities;
    			$scope.entities = _.sortByOrder(entities, ['distance'],['asc'])
        		$scope.$broadcast('scroll.refreshComplete');
      		}, 1000);
    	};
  	});	


    //console.log($scope.entities);
    //    $scope.entities =[{"id":4,"type_attendance":1,"status1":"Status 1 Weslei Prudencio","status2":"","name":"Weslei Prudencio","open":"12:52:23","close":"12:52:24","opened_days":"[u'1', u'2']","photo":"guidephotos/guest_user.jpg","description":"Medico excelente","address":"","latitude":"","longitude":"","country":"","website":"","twitter":"","instagram":"","facebook":"","email":"","phone1":"","phone2":"","phone3":"","phone4":"","category":1,"city":1,"health_insurance":[1,2],"$$hashKey":"object:49"}]
    //console.log(sharedProperties.getObject().data.entities)
