angular.module('mm.addons.mod_dps')

/**
 * Dps score and statistics controller
 *
 * @module mm.addon.mod_dps
 * @name mmaModDpsStatsCtrl
 */

.controller('mmaModDpsStatsCtrl', function($scope, $stateParams, $mmaModDps, $mmUtil) {
    var module = $stateParams.module,
        courseid = $stateParams.courseid,
        sectionid = $stateParams.sectionid

    function getStats() {
        return $mmaModDps.getStats(module.id).then(function(result){
            console.log(result);
            $scope.result = result;
        })
    }

    getStats().finally(function(){
        console.log('Stats Printed');
    })
})