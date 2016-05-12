angular.module('mm.addons.mod_dps')

/**
 * Dps question attempt controller
 *
 * @module mm.addons.mod_dps
 * @name mmaModDpsAttemptCtrl
 */

.controller('mmaModDpsAttemptCtrl', function($scope, $stateParams, $mmaModDps, $mmaDpsHelper, $mmUtil, $q, $log, 
    $translate, $state) {

    $log = $log.getInstance("mmaModDpsAttemptCtrl");

    var module = $stateParams.module,
        courseid = $stateParams.courseid,
        sectionid = $stateParams.sectionid,
        dpsAttemptInfo,
        timeUpCalled = false;

    $scope.module = module;
    $scope.courseid = courseid;
    $scope.sectionid = sectionid;
    //Model for choice selection for dps question.
    $scope.att = {'choice': 0}

    $scope.title = $translate.instant('mma.mod_dps.dailyattempt');
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
    function start() {
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
            if (attempt.success) {
                // Init the timer here.
                initTimer();
            } else {
                // Load Graph here
            }
        });
    }

    $scope.finishAttempt = function() {
        finishAttempt();
    }

    // Dps time has finished.
    $scope.timeUp = function() {
        if (timeUpCalled) {
            return;
        }

        timeUpCalled = true;
        var modal = $mmUtil.showModalLoading('mm.core.sending', true);
        processAttempt(true).then(function(result) {
            modal.dismiss();
            if (result.success) {
                $state.go('site.mod_dps-stats', {
                    courseid: courseid,
                    module: module
                });
            }
        });
    };

    // Finish an attempt, either by timeup or because the user clicked to finish it.
    function finishAttempt() {
        //Display warning if no selection is made and user submits
        if (!$scope.att.choice) {
            $mmUtil.showModal('mma.mod_dps.warning', 'mma.mod_dps.warningattempt');
        } else {
            //Show confirmation only if user submit by itself.
            promise = $mmUtil.showConfirm($translate.instant('mma.mod_dps.confirmsubmit'));
            promise.then(function() {
                return processAttempt(false).then(function(result) {
                    if (result.success) {
                        $state.go('site.mod_dps-stats', {
                            courseid: courseid,
                            module: module
                        });
                    }
                }).catch(function(message) {
                });
            });
        }
    }

    function processAttempt(timeup) {
        // This call will be sent to record user's submission for daily.
        return $mmaModDps.processAttempt(module.id, getQuestionId(), timeup, getAnswers());
    }

   // Initializes the timer if enabled.
    function initTimer() {
        var t = new Date();
        t.setSeconds(t.getSeconds() + dpsAttemptInfo.timerstartvalue);
        $scope.endTime = t.getTime()/1000;
    }

    // Get questionId
    function getQuestionId() {
        var qid = 0;
        angular.forEach(dpsAttemptInfo.questions, function (v, k) {
            //We're sure that we will get single question for a day only:)
            qid = v.id;
        });
        return qid;
    }

    function getAnswers() {
        return $scope.att.choice;
    }

    //Initialize start page with start
    start();
})

