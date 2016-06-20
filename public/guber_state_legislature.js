/*jslint browser: true*/
/*global $, ng_all, state_guber, state_legislature*/

$(function () {
    "use strict";
    $('#guber-party').highcharts('Map', {
        chart: {
            spacingBottom: 20
        },
        title : {
            text : 'Executive control of the states'
        },
        subtitle : {
            text : 'As of May 2016'
        },
        legend: {
            enabled: true
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
                mapData: ng_all,
                tooltip: {
                    headerFormat: '',
                    pointFormat: '{point.name}: <b>{point.governor} ({series.name})</b>'
                }
            }
        },
        series : state_guber
    });
});

$(function () {
    "use strict";
    $('#legislature-party').highcharts('Map', {
        chart: {
            spacingBottom: 20
        },
        title : {
            text : 'Legislative control of the states (Simple majority rule)'
        },
        subtitle : {
            text : 'As of May 2016'
        },
        legend: {
            enabled: true
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
                mapData: ng_all,
                tooltip: {
                    headerFormat: '',
                    pointFormat: '{point.name}: <b>{series.name}</b>'
                }
            }
        },
        series : state_legislature
    });
});
