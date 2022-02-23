$(document).ready(function(){
    
    var chartData = generateChartData();

    var chart = AmCharts.makeChart("visitorsDateChart", {
        "type": "serial",
        "theme": "light",
        "marginRight": 80,
        "autoMarginOffset": 20,
        "marginTop": 7,
        "dataProvider": chartData,
        "dataDateFormat": "YYYY-MM-DD",
        "valueAxes": [{
            "axisAlpha": 0.2,
            "dashLength": 1,
            "position": "left"
        }],
        "mouseWheelZoomEnabled": true,
        "graphs": [{
            "id": "g1",
            "balloonText": "[[value]]",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "hideBulletsCount": 50,
            "title": "red line",
            "valueField": "visits",
            "useLineColorForBulletBorder": true,
            "balloon":{
                "drop":true
            }
        }],
        "chartScrollbar": {
            "autoGridCount": true,
            "graph": "g1",
            "scrollbarHeight": 40
        },
        "chartCursor": {
           "limitToGraph":"g1"
        },
        "categoryField": "visitDate",
        "categoryAxis": {
            "parseDates": true,
            "equalSpacing": true,
            "minPeriod": "DD",
            "axisColor": "#DADADA",
            "dashLength": 1,
            "minorGridEnabled": true
        },
        "export": {
            "enabled": true
        }
    });

    chart.addListener("rendered", zoomChart);
    zoomChart();

    function zoomChart() {
        chart.zoomToIndexes(chartData.length - 40, chartData.length - 1);
    }


    function generateChartData() {
        var visitorsData = [];
        // Creating a JS variable from the JSON file
        $.ajax({
        url: 'visitors.json',
        async: false,
        dataType: 'json',
        success: function(response){
            visitorsData = response;            
        }
        });

          // Reformat date into readable JS date
        for(var x=0; x < visitorsData.length; x++){
            var temp = visitorsData[x].date;
            visitorsData[x].date = new Date(temp);
        }

        return visitorsData;
    }

}); 












