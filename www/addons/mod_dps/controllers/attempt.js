 angular.module('mm.addons.mod_dps')

/**
 * Dps question attempt controller
 *
 * @module mm.addons.mod_dps
 * @name mmaModDpsAttemptCtrl
 */

.controller('mmaModDpsAttemptCtrl', function($scope, $stateParams, $mmaModDps) {
    var module = $stateParams.module;
    var courseid = $stateParams.courseid;
    var sectionid = $stateParams.sectionid;

    $scope.module = module;
    $scope.courseid = courseid;
    $scope.sectionid = sectionid;
    $scope.att = {};

    $scope.title = "Daily Attempt";
    function attemptDaily(refresh) {
        return $mmaModDps.attemptDaily(module.id, refresh).then(function(result) {
            $scope.attempt = result;
        }).catch(function(error) {
            if (error) {
                $mmUtil.showErrorModal(error);
            } else {
                $mmUtil.showErrorModal('mm.addons.couldnotloadstatus', true);
             }
        });
    }

    attemptDaily(true).finally(function() {
        console.log('Finally Called');
    })

    $scope.submit = function(att) {
        //att.choice = '';
        console.log('IN');
        console.log($scope.att);
    }
})

