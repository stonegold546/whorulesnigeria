/*jslint browser: true*/
/*global $, ng_all_drill, ng_all_districts, console*/

function nppDrilldown(id, title, source_state, source_national) {
    "use strict";
    // Set drilldown pointers
    $.each(ng_all_drill, function () {
        this.drilldown = this.code;
    });

    // Instanciate the map
    $('#' + id).highcharts('Map', {
        chart : {
            events: {
                drilldown: function (e) {

                    if (!e.seriesOptions) {
                        var chart = this,
                            data = ng_all_districts[e.point.code];
                        console.log(data);

                        chart.addSeriesAsDrilldown(e.point, {
                            // name: e.point.name,
                            joinBy: ['NAME_2', 'district'],
                            data: source_state,
                            mapData: data,
                            // dataLabels: {
                            //     enabled: true,
                            //     format: '{point.properties.VARNAME_2}'
                            // },
                            // tooltip: {
                            //     pointFormat: '{point.properties.NAME_2}: {series.name}'
                            // }
                        });
                    }
                    this.setTitle(null, { text: e.point.name });
                },
                drillup: function () {
                    this.setTitle(null, { text: 'NG' });
                }
            }
        },

        title : {
            text : title
        },

        subtitle: {
            text: 'NG',
            floating: true,
            align: 'right',
            y: 50,
            style: {
                fontSize: '16px'
            }
        },

        legend: {
            enabled: true
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        plotOptions: {
            map: {
                allAreas: false,
                joinBy: ['name', 'code'],
                dataLabels: {
                    enabled: true,
                    color: '#FFFFFF',
                    format: '{point.code}',
                    style: {
                        fontWeight: 'bold'
                    }
                },
                mapData: ng_all_drill,
                tooltip: {
                    headerFormat: '',
                    pointFormat: '{point.name}: {point.governor} <b>({series.name})</b>'
                }
            }
        },
        series : source_national,
        drilldown: {
            //series: drilldownSeries,
            activeDataLabelStyle: {
                color: '#FFFFFF',
                textDecoration: 'none',
                textShadow: '0 0 3px #000000'
            },
            drillUpButton: {
                relativeTo: 'spacingBox',
                position: {
                    x: 0,
                    y: 60
                }
            }
        }

    });
}
