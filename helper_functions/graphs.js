import luxon from "luxon";
import luxon_adapter from 'chartjs-adapter-luxon'
import chartjs from "chartjs-node-canvas"
import fs from 'fs'

async function make_chart(type, labels, datasets, options) {
	const width = 1500;
	const height = 800;
  const bg_color = "transparent"
	const chartJSNodeCanvas = new chartjs.ChartJSNodeCanvas({ width, height, bg_color });
  const config = {
  type: type,
  data: {
    labels: labels,
    datasets: datasets
    },
    options: options
  }
	const image = await chartJSNodeCanvas.renderToBuffer(config);
  return image
}


async function timeline_graph(data={}, title = "", x_label = "", y_label = "") {
	let dataset = {
		label: "",
		backgroundColor: "rgba(75, 192, 192, 0.5)",
		borderColor: "rgb(75, 192, 192)",
		fill: false,
		data: []
	}
	for (let key of Object.keys(data)) {
    dataset.data.push( {x: luxon.DateTime.fromMillis((parseInt(key))), y: data[key] } )
	}
  
	let options = {
		scales: {
			x: {
				type: "time",
        time: {
          displayFormats: {
             'hour': 'T',
          },
        },
				title: {
					display: true,
					labelString: x_label,
					fontColor: 'rgb(143, 143, 143)',
          font: {
            size: 20,
          },
				},
				ticks: {
					color: 'rgb(143, 143, 143)',
          font: {
            size: 20,
          },
				},
				grid: {
					color: 'rgb(143, 143, 143)',
				}
			},
			y: {
				title: {
					display: true,
					labelString: y_label,
					fontColor: 'rgb(143, 143, 143)',
          font: {
            size: 20,
          },
				},
				ticks: {
					color: 'rgb(143, 143, 143)',
          font: {
            size: 20,
          },
				},
				grid: {
					color: 'rgb(143, 143, 143)',
				}
			}
		},
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: title,
        color: 'rgb(143, 143, 143)',
        font: {
          size: 35,
        }
      },
    }
	}

	if (title === "") {options.plugins.title.display = false}
	if (x_label === "") {options.scales.x.title.display = false}
	if (y_label === "") {options.scales.y.title.display = false}
  const chart = await make_chart('line', [], [dataset], options )
  return chart
}

const Graphs_functions = {
	timeline_graph: timeline_graph,
}

export { Graphs_functions }