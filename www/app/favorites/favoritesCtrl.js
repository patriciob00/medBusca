/**
 * Created by paulogabriel on 27/07/15.
 */

angular.module('dwguiabase.favoritesctrl', [])

.controller('favoritesCtrl', function($state, $scope) {
   $scope.entities = Lockr.get('favorites');
});