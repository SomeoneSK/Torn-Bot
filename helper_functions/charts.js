const QuickChart = require('quickchart-js');
const moment = require('moment');
moment().format(); 

async function timeline_graph(data={}, title = "", x_label = "", y_label = "") {
	let dataset = {
		label: "",
		backgroundColor: "rgba(75, 192, 192, 0.5)",
		borderColor: "rgb(75, 192, 192)",
		fill: false,
		data: []
	}
	for (let key of Object.keys(data)) {
		dataset.data.push( {x: moment(parseInt(key)), y: data[key] } )
	}

	let options = {
		title: {
			display: true,
			text: title,
			fontColor: 'white',
		},
		legend: {
			display: false
		},
		scales: {
			xAxes: [{
				type: "time",
				//time: {parser: "MM/DD/YYYY HH:mm",},
				scaleLabel: {
					display: true,
					labelString: x_label,
					fontColor: 'white',
				},
				ticks: {
					fontColor: 'white',
				},
				gridLines: {
					color: 'rgb(143, 143, 143)',
					zeroLineColor: 'rgb(143, 143, 143)',
				}
			}],
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: y_label,
					fontColor: 'white',
				},
				ticks: {
					fontColor: 'white',
				},
				gridLines: {
					color: 'rgb(143, 143, 143)',
					zeroLineColor: 'rgb(143, 143, 143)',
				}
			}]
		}
	}

	if (title === "") {options.title.display = false}
	if (x_label === "") {options.scales.xAxes[0].scaleLabel.display = false}
	if (y_label === "") {options.scales.yAxes[0].scaleLabel.display = false}

	const qc = new QuickChart();
	qc.setConfig({
	type: 'line',
	data: {
		labels: [],
		datasets: [dataset],
	},
	options: options,
	});
	qc.setWidth(600).setHeight(400).setBackgroundColor('transparent');

	const image = await qc.toBinary();
	return image
}

const Charts_functions = {
	timeline_graph: timeline_graph,
}

exports.Charts_functions = Charts_functions;