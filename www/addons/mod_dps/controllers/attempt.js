 angular.module('mm.addons.mod_dps')

/**
 * Dps question attempt controller
 *
 * @module mm.addons.mod_dps
 * @name mmaModDpsAttemptCtrl
 */

.controller('mmaModDpsAttemptCtrl', function($scope, $stateParams, $mmaModDps, $mmaDpsHelper, $mmUtil, $q, $log) {

    $log = $log.getInstance("mmaModDpsAttemptCtrl");

    var module = $stateParams.module,
        courseid = $stateParams.courseid,
        sectionid = $stateParams.sectionid,
        dpsAttemptInfo,
        timeUpCalled = false;

    $scope.module = module;
    $scope.courseid = courseid;
    $scope.sectionid = sectionid;
    $scope.att = {};

    $scope.title = "Daily Attempt";
    function startAttempt(refresh) {
        return $mmaModDps.startAttempt(module.id, refresh).then(function(result) {
            $scope.attempt = result;
        }).catch(function(error) {
            if (error) {
                $mmUtil.showErrorModal(error);
            } else {
                $mmUtil.showErrorModal('mm.addons.couldnotloadstatus', true);
             }
        });
    }

    // Convenience function to start the timer for attempt.
    function start(preflightData) {
        var promise;
        $scope.dataLoaded = false;

        // Fetch data.
        promise = startOrContinueAttempt(true);

        promise.finally(function() {
            $scope.dataLoaded = true;
        });
    }

    // Convenience function to start/continue the attempt.
    function startOrContinueAttempt(refresh) {
        return $mmaModDps.startAttempt(module.id, refresh).then(function(result) {
            dpsAttemptInfo = result;
            attempt = result;
            $scope.attempt = attempt;
        }).catch(function(error) {
            if (error) {
                $mmUtil.showErrorModal(error);
            } else {
                $mmUtil.showErrorModal('mm.addons.couldnotloadstatus', true);
             }
        }).then(function() {
            console.log(attempt);
            if (attempt.success) {
                // Load page
                initTimer();
            } else {
                // Load Graph here
            }
        });
    }

    $scope.finishAttempt = function() {
        finishAttempt(true, true);
    }

    // Dps time has finished.
    $scope.timeUp = function() {
        if (timeUpCalled) {
            return;
        }

        timeUpCalled = true;
        var modal = $mmUtil.showModalLoading('mm.core.sending', true);
        finishAttempt(false, true).finally(function() {
            modal.dismiss();
        });
    };

    // Finish an attempt, either by timeup or because the user clicked to finish it.
    function finishAttempt(finish, timeup) {
        // Show confirm if the user clicked the finish button and the dps is in progress.
    }

    function processAttempt(finish, timeup) {
        return true;
        // This call will be sent to record user's submission for daily.
        return $mmaModDps.processAttempt(attempt.id, $scope.att, finish, timeup).then(function() {
            // Answers saved.
        });
    }

    function leavePlayer() {

    }

   // Initializes the timer if enabled.
    function initTimer() {
        var t = new Date();
        $log.info(t);
        t.setSeconds(t.getSeconds() + dpsAttemptInfo.timerstartvalue);
        $log.info(t, t.getTime());
        $scope.endTime = t.getTime()/1000;
    }

    start();

    $scope.submit = function(att) {
        console.log($scope.att);
    }
})

