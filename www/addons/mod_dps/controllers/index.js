angular.module('mm.addons.mod_dps')

/**
 * Dps index controller.
 *
 * @module mm.addons.mod_dps
 * @ngdoc controller
 * @name mmaModDpsIndexCtrl
 */
.controller('mmaModDpsIndexCtrl', function($scope, $stateParams, $mmaModDps, $mmUtil, $translate
        ) {
    var module = $stateParams.module || {},
        courseid = $stateParams.courseid;

    $scope.title = module.name;
    $scope.description = module.description;
    $scope.dpsurl = module.url;
    $scope.courseid = courseid;
});