angular.module('mm.addons.mod_dps')

/**
 * Dps enrollment controller
 *
 * @module mm.addons.mod_dps
 * @name mmaModDpsEnrolCtrl
 */

.controller('mmaModDpsEnrolCtrl', function($scope, $stateParams, $mmaModDps){
    var courseid = $stateParams.courseid;
    
    $scope.title = "Enrollment";
    $scope.description = "";

    function enrolUser() {
        return $mmaModDps.enrolUser(courseid).then(function(result){
            console.log(result);
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