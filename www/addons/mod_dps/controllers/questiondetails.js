angular.module('mm.addons.mod_dps')

/**
 * Dps question details controller.
 * Can be used at multiple locations:
 * -- Archived question details view
 * -- Graphs stats question details view
 *
 * @module mm.addons.mod_dps
 * @name mmaModDpsQuestionDetailsCtrl
 */

.controller('mmaModDpsQuestionDetailsCtrl', function($scope, $stateParams, $mmaModDps, $mmUtil) {
    var qId = $stateParams.qId,
        module = $stateParams.module,
        courseid = $stateParams.courseid,
        sectionid = $stateParams.sectionid;
        
        $scope.module = module;
        $scope.courseid = courseid;
        $scope.sectionid = sectionid;
        $scope.favorite = true;
        $scope.sectionLoaded = false;

    function getQuestionDetails(refresh) {
        return $mmaModDps.getQuestionDetails(qId, module.id, refresh).then(function(result) {
            $scope.result = result;
        });
    }

    $scope.markFavorite = function(favorite) {
        return $mmaModDps.markFavorite(qId, module.id, favorite, true).then(function(result){
            // Change the flagged value on success.
            $scope.result.question_flagged =  favorite;
        })
    }

    getQuestionDetails(true).finally(function() {
        $scope.sectionLoaded = true;
    })
})