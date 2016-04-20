angular.module('mm.addons.mod_dps')

/** 
 * Dps confirmation controller
 *
 * @module mm.addons.mod_dpds
 * @name mmaModDpsConfirmCtrl
 */

.controller('mmaModDpsConfirmCtrl', function($scope, $stateParams, $mmaModDps, $mmUtil){
    var cmid = $stateParams.cmid;

    function confirmDaily() {
        return $mmaModDps.confirmDaily(cmid).then(function(result){
            console.log(result);
            //Redirect to attempt question page on success.
        }).catch(function(error) {
            if (error) {
                $mmUtil.showErrorModal(error);
            } else {
                $mmUtil.showErrorModal('mm.addons.couldnotloadstatus', true);
            }
        })
    }

    confirmDaily().finally(function(){
        console.log('confirmed');
    })
})