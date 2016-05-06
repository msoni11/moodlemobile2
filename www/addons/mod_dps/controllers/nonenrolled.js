angular.module('mm.addons.mod_dps')

/**
 * This method can be used to display the question
 * for non-enrolled users.
 *
 * @module mm.addons.mod_dps
 * @name mmaModDpsNonEnrolledCtrl
 */

.controller('mmaModDpsNonEnrolledCtrl', function($scope, $stateParams, $mmaModDps) {
    var courseid = $stateParams.courseid,
        module = $stateParams.module;
    $scope.courseid = courseid;

    function nonAttempt() {
        return $mmaModDps.getDailyQuestion(module.id).then(function(result) {
            $scope.attempt = result;
        })
    }

    nonAttempt();
})