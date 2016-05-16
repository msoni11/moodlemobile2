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
            console.log($scope);
            $scope.markfav = function(favorite) {
                console.log('fave : ' + favorite);
                $scope.mmaModDpsFavorite({favorite: favorite});
            }

            $scope.$watch('favorite', function(v) {
                $scope.favorite = v;
            })
        }
    }
});