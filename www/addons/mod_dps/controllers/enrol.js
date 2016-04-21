angular.module('mm.addons.mod_dps')

/**
 * Dps enrollment controller
 *
 * @module mm.addons.mod_dps
 * @name mmaModDpsEnrolCtrl
 */

.controller('mmaModDpsEnrolCtrl', function($scope, $stateParams, $mmaModDps, $state, $mmUtil){
    var module = $stateParams.module;
    var courseid = $stateParams.courseid;
    var sectionid = $stateParams.sectionid;

    $scope.title = "Enrollment";
    $scope.description = "";

    $scope.module = module;
    $scope.sectionid = sectionid;
    $scope.courseid = courseid;

    function enrolUser() {
        return $mmaModDps.enrolUser(module.id).then(function(result){
            $scope.enrolstatus = result;
        }).catch(function(error) {
            if (error) {
                $mmUtil.showErrorModal(error);
            } else {
                $mmUtil.showErrorModal('mm.addons.couldnotloadstatus', true);
            }
        });
    }

    enrolUser().finally(function(){
        $scope.sectionLoaded = true;
    });
});