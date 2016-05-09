angular.module('mm.addons.mod_dps')

/**
 * Dps index controller.
 *
 * @module mm.addons.mod_dps
 * @ngdoc controller
 * @name mmaModDpsIndexCtrl
 */
.controller('mmaModDpsIndexCtrl', function($scope, $stateParams, $mmaModDps, $mmUtil, $translate, $ionicHistory, $state) {
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

    function getDpsStatus(refresh) {
        return $mmaModDps.getDpsStatus(cmid, refresh).then(function(status){
            if (status.finish.hasFinished) {
                //Redirect to stats page
                $state.go('site.mod_dps-stats', {
                    courseid: courseid,
                    module: module,
                    sectionid: sectionid
                })
            } else if (status.dps.isActive && status.enrol.isEnrolled && 
                status.confirm.hasConfirmed && !status.missed.hasExceeded) {
                $state.go('site.mod_dps-attempt', {
                    courseid: courseid,
                    module: module,
                    sectionid: sectionid
                });
            } else {
                $scope.status = status;
            }
        }).catch(function(error) {
            if (error) {
                $mmUtil.showErrorModal(error);
            } else {
                $mmUtil.showErrorModal('mm.addons.couldnotloadstatus', true);
            }
        });
    }

    getDpsStatus(true).finally(function() {
        $scope.sectionLoaded = true;
    });

    $scope.doRefresh = function() {
        getDpsStatus(true).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
});