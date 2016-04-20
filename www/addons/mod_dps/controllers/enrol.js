angular.module('mm.addons.mod_dps')

/**
 * Dps enrollment controller
 *
 * @module mm.addons.mod_dps
 * @name mmaModDpsEnrolCtrl
 */

.controller('mmaModDpsEnrolCtrl', function($scope, $stateParams, $mmaModDps, $state, $mmUtil){
    var cmid = $stateParams.cmid;
    
    $scope.title = "Enrollment";
    $scope.description = "";

    function enrolUser() {
        return $mmaModDps.enrolUser(cmid).then(function(result){
            if (result.success) {
                //Redirect to confirm page on success.
                $state.go('site.mod_dps-confirm', {'cmid': cmid})
            } else {
                $scope.enrolstatus = result
            }
        }).catch(function(error) {
            if (error) {
                $mmUtil.showErrorModal(error);
            } else {
                $mmUtil.showErrorModal('mm.addons.couldnotloadstatus', true);
            }
        });
    }

    enrolUser().finally(function(){
        console.log('enrolled !! Yay');
    });
});