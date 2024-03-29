(function() {
    'use strict';

    var chart = Morris.Line({
        element: 'chart',
        data: [],
        xkey: 'dateTime',
        ykeys: ['ping', 'download', 'upload'],
        labels: ['Ping [ms]', 'Down [Mbit/s]', 'Up [Mbit/s]'],
        lineColors: ['rgb(110, 110, 245)', 'rgb(234, 27, 19)', 'rgb(230, 100, 19)'],
        pointSize: 0,
        smooth: false,
        resize: true,
        continuousLine: true
    });

    function round(number, decimalPlaces) {
        decimalPlaces = decimalPlaces ? decimalPlaces : 0;
        var factor = Math.pow(10, decimalPlaces);
        return Math.round(number * factor) / factor;
    }

    function refresh() {
        $.ajax({
            type: 'GET',
            cache: false,
            url: 'log.php'
        }).done(function(log) {
            if (log.length === 0)
                alert('There are no log entries yet.');
            var chartData = [];
            for (var i = 0; i < log.length; i++) {
                chartData.push({
                    dateTime: log[i][0],
                    ping:     round(Math.min(75, log[i][1]), 0),
                    download: round(log[i][2], 1),
                    upload:   round(log[i][3], 1)
                });
            }
            chart.setData(chartData);
            document.getElementById('loading').style.display = 'none';
        }).fail(function() {
            alert('Log data could not be fetched :(');
        });
    }

    $(function () {
        $(window).focus(function() {
            refresh()
        });
        refresh();
    });
}());
