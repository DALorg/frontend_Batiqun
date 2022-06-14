let chartExample1 = {
    options: {
      scales: {
        yAxes: [
          {
            gridLines: {
              color: colors.gray[900],
              zeroLineColor: colors.gray[900],
            },
            ticks: {
              callback: function (value) {
                if (!(value % 10)) {
                  return "$" + value + "k";
                }
              },
            },
          },
        ],
      },
      tooltips: {
        callbacks: {
          label: function (item, data) {
            var label = data.datasets[item.datasetIndex].label || "";
            var yLabel = item.yLabel;
            var content = "";
  
            if (data.datasets.length > 1) {
              content += label;
            }
  
            content += "$" + yLabel + "k";
            return content;
          },
        },
      },
    },
    data1: (canvas) => {
      return {
        labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Performance",
            data: [0, 20, 10, 30, 15, 40, 20, 60, 60],
          },
        ],
      };
    },
    data2: (canvas) => {
      return {
        labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Performance",
            data: [0, 20, 5, 25, 10, 30, 15, 40, 40],
          },
        ],
      };
    },
  };