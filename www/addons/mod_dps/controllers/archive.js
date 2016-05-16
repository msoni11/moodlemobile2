angular.module('mm.addons.mod_dps')

/**
 * Dps archive controller
 *
 * @module mm.addons.mod_dps
 * @name mmaModDpsArchiveCtrl
 */

.controller('mmaModDpsArchiveCtrl', function($scope, $stateParams, $mmaModDps, $state) {
    var module = $stateParams.module,
        courseid = $stateParams.courseid,
        sectionid = $stateParams.sectionid;
        $scope.sectionLoaded = false;

    function getArchivedQuestions(refresh) {
        return $mmaModDps.getArchivedQuestions(module.id, refresh).then(function(result) {
            $scope.result = result;
        });
    }

    getArchivedQuestions().finally(function() {
        $scope.sectionLoaded = true;
    });

    $scope.doRefresh = function() {
        getArchivedQuestions(true).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    }

    $scope.showDetails = function(qId) {
        console.log('IN' + qId);
        $state.go('site.mod_dps-questiondetails', {
            'qId': qId,
            'module': module,
            'courseid': courseid,
            'sectionid': sectionid
        })
    }
})