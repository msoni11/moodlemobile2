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
                            labelWidth: 50

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
                        legend: {
                            //noColumns: 6,
                            //container: "#placeholder-legend"
                            label: {
                                formatter: function (label, series) {
                                    console.log(label);
                                }
                            }
                        },
                colors: ["#ff0000", "#dba255", "#33ccff", "#ffff00", "#33ccff", "#00FF26", "#00FF26"]

                    }
            var data = scope[attrs.chartData];

            //Change graph on data update
            scope.$watch('data', function(v) {
                if (!chart) {
                    chart = $.plot(elem, v, options);
                    //elem.show();
                } else {
                    chart.setData(v);
                    chart.setupGrid();
                    chart.draw();
                }
            })
        }
    }
});