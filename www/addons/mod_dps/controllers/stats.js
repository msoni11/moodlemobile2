angular.module('mm.addons.mod_dps')

/**
 * Dps score and statistics controller
 *
 * @module mm.addon.mod_dps
 * @name mmaModDpsStatsCtrl
 */

.controller('mmaModDpsStatsCtrl', function($scope, $stateParams, $mmaModDps, $mmUtil, $mmText, $state, $ionicHistory) {
    var module = $stateParams.module,
        courseid = $stateParams.courseid,
        sectionid = $stateParams.sectionid;
        $scope.loaded = false;

    function getStats() {
        return $mmaModDps.getStats(module.id).then(function(result){
            if (result.success) {
                $scope.result =  result;
                $scope.data = formatData(result.chartdata.misseddata);
                $scope.ticks = result.chartdata.ticktitles;
                $scope.question = result.question;
                $scope.weekdays = result.chartdata.datesplits;
                $scope.initday = result.chartdata.initial_day;
            }
        })
    }

    $scope.getNextData = function(dayFrom, refresh, forced) {
        if (undefined == forced && dayFrom == $scope.initday) return;
        $scope.dayFrom = dayFrom;
        return $mmaModDps.getStats(module.id, dayFrom, refresh).then(function(result){
            $scope.loaded = false;
            if (result.success) {
                $scope.loaded = true;
                $scope.data = formatData(result.chartdata.misseddata);
                $scope.ticks = result.chartdata.ticktitles;
                $scope.initday = result.chartdata.initial_day;
            }
        })
    }

    function getNextData(dayFrom, refresh, forced) {
        return $scope.getNextData(dayFrom, refresh, forced);
    }

    /** Handle multilang labels **/
    function formatData(data) {
        var formattedData = Array();
        angular.forEach(data, function(v, k) {
            if (undefined !== v.label) {
                $mmText.formatText(v.label).then(function(label) {
                    v.label = label
                });
            }
            formattedData.push(v);
        });
        return formattedData;
    }

    $scope.markFavorite = function(favorite) {
        var qId = $scope.result.question_id;
        return $mmaModDps.markFavorite(qId, module.id, favorite, true).then(function(result){
            // Change the flagged value on success.
            $scope.result.question_flagged =  favorite;
            getNextData($scope.dayFrom, true, true);
        })
    }

    $scope.gotoindex = function() {
        //clear cache first so that ionic forget all back histories
        $ionicHistory.clearCache();
        $state.go('site.mm_course-section',{
            'cid': courseid,
            'sectionid': sectionid
        });
    }

    getStats().finally(function(){
        $scope.loaded = true;
    })
})