angular.module('mm.addons.mod_dps')

/**
 * This directive can be used to display graphs.
 * 
 * @module mm.addons.mod_dps
 * @name mmaModDpsChart
 */

.directive('mmaModDpsChart', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            var chart = null,
                options = {
                        series: {
                            lines: {
                                show: false },
                            points: {
                                show: false,
                                radius: 7,
                                fill: 1,
                                fillColor: false
                            }
                        }, grid: { hoverable: true, clickable: true },
                        xaxis: {
                            mode: "time",
                            ticks: scope[attrs.chartTicks],
                        },
                        yaxis: {
                            min: 0,
                            max: 100
                        },
                        grid: {
                            borderWidth: 0,
                            show: true,
                            clickable: true,
                            hoverable: true,
                            mouseActiveRadius: 10
                        },
                        colors: ["#ff0000", "#dba255", "#33ccff", "#ffff00", "#33ccff", "#00FF26", "#00FF26"]

                    }
            var data = scope[attrs.chartData];

            // If directive loads after we retrieve data, it works fine
            // If directive loads before data retrieval, graph layout got disturbed.
            // The only solution for me now to re-initiate graph everytime a change occured.
            scope.$watchGroup(['data', 'ticks'], function(newVals, oldVals, scope) {
                options['xaxis']['ticks'] = newVals[1];
                if (chart) {
                    chart.shutdown();
                }
                chart = $.plot(elem, newVals[0], options);
            });
        }
    }
});