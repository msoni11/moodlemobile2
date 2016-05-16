angular.module('mm.addons.mod_dps')

/**
 * This directive can be used to display 
 * Add/Remove to/from favorites
 */

.directive('mmaModDpsFavorite', function() {
    return {
        restrict: 'A',
        scope: {
            favorite: '=',
            mmaModDpsFavorite: '&'
        },
        templateUrl: 'addons/mod_dps/templates/favorite.html',
        controller: function($scope) {
            $scope.actionTriggered  = true;
            $scope.markfav = function(favorite) {
                $scope.actionTriggered = false;
                var promise = $scope.mmaModDpsFavorite({favorite: favorite});
                promise.finally(function() {
                    $scope.actionTriggered  = true;
                })
            }

            $scope.$watch('favorite', function(v) {
                $scope.favorite = v;
            })
        }
    }
});