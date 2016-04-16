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
        courseid = $stateParams.courseid,
        sectionid = $stateParams.sectionid;
 
    $scope.title = module.name;
    $scope.description = module.description;
    $scope.dpsurl = module.url;
    $scope.courseid = courseid;
    $scope.sectionid = sectionid;
    $scope.module = module;
    cmid = module.id
    function getDpsStatus() {
        return $mmaModDps.getDpsStatus(courseid, cmid).then(function(status){
            $scope.status = status;
        }).catch(function(error) {
            if (error) {
                $mmUtil.showErrorModal(error);
            } else {
                $mmUtil.showErrorModal('mm.addons.couldnotloadstatus', true);
            }
        });
    }

    getDpsStatus().finally(function() {
        console.log('finally we are here');
    }); 
});