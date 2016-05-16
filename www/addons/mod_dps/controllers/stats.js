angular.module('mm.addons.mod_dps')

/**
 * Dps score and statistics controller
 *
 * @module mm.addon.mod_dps
 * @name mmaModDpsStatsCtrl
 */

.controller('mmaModDpsStatsCtrl', function($scope, $stateParams, $mmaModDps, $mmUtil, $mmText) {
    var module = $stateParams.module,
        courseid = $stateParams.courseid,
        sectionid = $stateParams.sectionid;
        $scope.loaded = false;

    function getStats() {
        return $mmaModDps.getStats(module.id).then(function(result){
            if (result.success) {
                $scope.data = formatData(result.chartdata.misseddata);
                $scope.ticks = result.chartdata.ticktitles;
                $scope.question = result.question;
                $scope.weekdays = result.chartdata.datesplits;
            }
        })
    }

    $scope.getNextData = function(dayFrom) {
        return $mmaModDps.getStats(module.id, dayFrom).then(function(result){
            $scope.loaded = false;
            if (result.success) {
                $scope.loaded = true;
                $scope.data = formatData(result.chartdata.misseddata);
                $scope.ticks = result.chartdata.ticktitles;
            }
        })
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

    getStats().finally(function(){
        $scope.loaded = true;
    })
})