/*jslint browser: true*/
/*global $, ng_all_districts*/

function senators(id, title, source_senate) {
    "use strict";
    $('#' + id).highcharts('Map', {
        chart: {
            spacingBottom: 20
        },
        title : {
            text : title
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
                joinBy: ['name', 'district'],
                // dataLabels: {
                //     enabled: true,
                //     color: '#FFFFFF',
                //     format: '{point.district_code}',
                //     style: {
                //         fontWeight: 'bold'
                //     }
                // },
                mapData: ng_all_districts,
                tooltip: {
                    headerFormat: '',
                    pointFormat: '{point.district}: <b>{point.senator} ({series.name})</b>'
                }
            }
        },
        series : source_senate
    });
}
