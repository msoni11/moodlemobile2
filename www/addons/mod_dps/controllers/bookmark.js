angular.module('mm.addons.mod_dps')

/**
 * Dps bookmark controller
 *
 * @module mm.addons.mod_dps
 * @name mmaModDpsBookmarkCtrl
 */

.controller('mmaModDpsBookmarkCtrl', function($scope, $stateParams, $mmaModDps, $mmUtil) {

    var module = $stateParams.module,
        courseid = $stateParams.courseid,
        sectionid = $stateParams.sectionid,
        checked = $stateParams.state;
    
    $scope.courseid = courseid;
    $scope.module = module;
    $scope.sectionid = sectionid;

    function setBookmark() {
        return $mmaModDps.setBookmark(module.id, checked).then(function(result) {
            $scope.result = result;
        });
    }

    setBookmark().finally(function(){
       console.log('finally');
    })
})