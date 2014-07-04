$(function() {

  var lastmousex = -1,
      lastmousey = -1,
      lastmousetime,
      mousetravel = 0,
      chartConfig =
      {
        chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
        },

        title: {
          text: 'Mousometer'
        },

        pane: {
          startAngle: -150,
          endAngle: 150,
          background: [
            {
              backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                  [0, '#FFF'],
                  [1, '#333']
                ]
              },
              borderWidth: 0,
              outerRadius: '109%'
            },
            {
              backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                  [0, '#333'],
                  [1, '#FFF']
                ]
              },
              borderWidth: 1,
              outerRadius: '107%'
            },
            {
              // default background
            },
            {
              backgroundColor: '#DDD',
              borderWidth: 0,
              outerRadius: '105%',
              innerRadius: '103%'
            }
          ]
        },

        // the value axis
        yAxis: {
          min: 0,
          max: 20,

          minorTickInterval: 'auto',
          minorTickWidth: 1,
          minorTickLength: 10,
          minorTickPosition: 'inside',
          minorTickColor: '#666',

          tickPixelInterval: 30,
          tickWidth: 2,
          tickPosition: 'inside',
          tickLength: 10,
          tickColor: '#666',
          labels: {
            step: 2,
            rotation: 'auto'
          },
          title: {
            text: 'km/h'
          },
          plotBands: [
            {
              from: 0,
              to: 12,
              color: '#55BF3B' // green
            },
            {
              from: 12,
              to: 16,
              color: '#DDDF0D' // yellow
            },
            {
              from: 16,
              to: 20,
              color: '#DF5353' // red
            }
          ]
        },

        series: [
          {
            name: 'Speed',
            data: [0],
            tooltip: {
              valueSuffix: ' km/h'
            }
          }
        ]

      };


  $('#container').highcharts(chartConfig, function(chart) {
    if (!chart.renderer.forExport) {
      setInterval(function() {
        chart.series[0].points[0].update(getSpeed());
      }, 500);
    }
  });

  $('html').mousemove(function(event) {
    if (lastmousex > -1)
      mousetravel += Math.max(Math.abs(event.pageX - lastmousex), Math.abs(event.pageY - lastmousey));
    lastmousex = event.pageX;
    lastmousey = event.pageY;
  });

  function getSpeed() {
    var timenow = +new Date(),
        pps = 0, //pixels pur second
        kmh = 0;
    if (lastmousetime && lastmousetime != timenow) {
      pps = Math.round(mousetravel / (timenow - lastmousetime) * 1000 * 2);
      //1km = 3779527px
      kmh = Math.floor((pps / 3779527) * 3600 * 100) / 100;
      mousetravel = 0;
    }
    lastmousetime = timenow;
    return kmh;
  }

});