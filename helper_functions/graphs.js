import QuickChart from "quickchart-js";
import fs from "fs";
import luxon from "luxon";

async function timeline_graph(
  data = {},
  title = "",
  x_label = "",
  y_label = ""
) {
  let dataset = {
    label: "",
    backgroundColor: "rgba(75, 192, 192, 0.5)",
    borderColor: "rgb(75, 192, 192)",
    fill: false,
    data: []
  };
  for (let key of Object.keys(data)) {
    dataset.data.push({ x: parseInt(key), y: data[key] });
  }

  let options = {
    title: {
      display: true,
      text: title,
      fontColor: "rgb(143, 143, 143)",
      fontSize: 40
    },
    legend: {
      display: false
    },
    scales: {
      xAxes: [
        {
          type: "time",
          scaleLabel: {
            display: true,
            labelString: x_label,
            fontColor: "rgb(143, 143, 143)",
            fontSize: 30
          },
          ticks: {
            fontColor: "rgb(143, 143, 143)",
            fontSize: 25
          },
          gridLines: {
            color: "rgb(143, 143, 143)",
            zeroLineColor: "rgb(143, 143, 143)"
          }
        }
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: y_label,
            fontColor: "rgb(143, 143, 143)",
            fontSize: 30
          },
          ticks: {
            fontColor: "rgb(143, 143, 143)",
            fontSize: 25
          },
          gridLines: {
            color: "rgb(143, 143, 143)",
            zeroLineColor: "rgb(143, 143, 143)"
          }
        }
      ]
    }
  };

  if (title === "") {
    options.title.display = false;
  }
  if (x_label === "") {
    options.scales.xAxes[0].scaleLabel.display = false;
  }
  if (y_label === "") {
    options.scales.yAxes[0].scaleLabel.display = false;
  }

  const qc = new QuickChart();
  qc.setConfig({
    type: "line",
    data: {
      labels: [],
      datasets: [dataset]
    },
    options: options
  });
  qc.setWidth(1500)
    .setHeight(800)
    .setBackgroundColor("transparent");

  const image = await qc.toBinary();
  return image;
}

const Graphs_functions = {
  timeline_graph: timeline_graph
};

export { Graphs_functions };
