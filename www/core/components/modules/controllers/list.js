angular.module('mm.core.modules')

/**
 * Controller to handle the modules list.
 *
 * @module mm.core.modules
 * @ngdoc controller
 * @name mmModulesListCtrl
 */
.controller('mmModulesListCtrl', function($scope, $mmModules, $mmUtil, $mmEvents, $mmSite,
            mmModulesEventMyModulesUpdated) {

    $scope.searchEnabled = $mmModules.isSearchModulesAvailable();
    $scope.filter = {};

    // Convenience function to fetch modules.
    function fetchModules(refresh) {
        return $mmModules.getUserModules().then(function(modules) {
            $scope.modules = modules;
            $scope.filter.filterText = ''; // Filter value MUST be set after modules are shown.
        }, function(error) {
            if (typeof error != 'undefined' && error !== '') {
                $mmUtil.showErrorModal(error);
            } else {
                $mmUtil.showErrorModal('mm.modules.errorloadmodules', true);
            }
        });
    }
    fetchModules().finally(function() {
        $scope.modulesLoaded = true;
    });

    $scope.refreshModules = function() {
        $mmModules.invalidateUserModules().finally(function() {
            fetchModules(true).finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        });
    };

    $mmEvents.on(mmModulesEventMyModulesUpdated, function(siteid) {
        if (siteid == $mmSite.getId()) {
            fetchModules();
        }
    });
});
