(function() {
'use strict';

addToHomescreen();

function round(number, decimalPlaces) {
    decimalPlaces = decimalPlaces ? decimalPlaces : 0;
    var factor = Math.pow(10, decimalPlaces);
    return Math.round(number * factor) / factor;
}

$(function () {
    $.ajax({
        type: 'GET',
        cache: false,
        url: 'log.php'
    }).done(function (log) {
        var chartData = [];
        for (var i = 0; i < log.length; i++) {
            chartData.push({
                dateTime: log[i][0],
                ping:     round(log[i][1], 0),
                download: round(log[i][2], 1),
                upload:   round(log[i][3], 1)
            });
        }

        new Morris.Line({
            element: 'speedtest-chart',
            data: chartData,
            xkey: 'dateTime',
            ykeys: ['ping', 'download', 'upload'],
            labels: ['Ping [ms]', 'Down [Mbit/s]', 'Up [Mbit/s]'],
            lineColors: ['rgb(21, 21, 234)', 'rgb(234, 93, 19)', 'rgb(230, 156, 19)'],
            smooth: true,
            resize: true,
            continuousLine: true
        });
    });
});
}());
