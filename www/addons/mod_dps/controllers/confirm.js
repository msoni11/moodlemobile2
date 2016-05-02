angular.module('mm.addons.mod_dps')

/** 
 * Dps confirmation controller
 *
 * @module mm.addons.mod_dps
 * @name mmaModDpsConfirmCtrl
 */

.controller('mmaModDpsConfirmCtrl', function($scope, $stateParams, $mmaModDps, $mmUtil, $state){
    var module = $stateParams.module;
    var courseid = $stateParams.courseid;
    var sectionid = $stateParams.sectionid;

    $scope.title = "Confirmation";
    
    $scope.module = module;
    $scope.courseid = courseid;
    $scope.sectionid = sectionid;

    function confirmDaily() {
        return $mmaModDps.confirmDaily(module.id).then(function(status) {
            $scope.status = status;
            if (status.success) {
                $state.go("site.mod_dps-attempt", {
                    courseid: courseid,
                    module: module,
                    sectionid: sectionid
                })
            }
        }).catch(function(error) {
            if (error) {
                $mmUtil.showErrorModal(error);
            } else {
                $mmUtil.showErrorModal('mm.addons.couldnotloadstatus', true);
            }
        })
    }

    confirmDaily().finally(function(){
        $scope.sectionLoaded = true;
    })
})