const QuickChart = require('quickchart-js');

//await interaction.reply( {content:'test!', files: [image]} )
async function line_chart() {
	const qc = new QuickChart();
	qc.setConfig({
	type: 'line',
	data: {
		labels: [],
		datasets: [
			{
				"label": "Dataset with point data",
				"backgroundColor": "rgba(75, 192, 192, 0.5)",
				"borderColor": "rgb(75, 192, 192)",
				"fill": false,
				"data": [
				{
					"x": "06/14/2020 09:08",
					"y": -29
				},
				{
					"x": "06/19/2020 09:08",
					"y": -34
				},
				{
					"x": "06/21/2020 09:08",
					"y": -62
				},
				{
					"x": "06/29/2020 19:08",
					"y": 1
				}
				]
			},
		],
	},
	options: {
		"scales": {
			"xAxes": [{
				"type": "time",
				"time": {
				"parser": "MM/DD/YYYY HH:mm",
				},
				"scaleLabel": {
				"display": true,
				"labelString": "Date"
				}
			}],
			"yAxes": [{
				"scaleLabel": {
				"display": true,
				"labelString": "value"
				}
			}]
		}
	},
	});
	qc.setWidth(500).setHeight(300).setBackgroundColor('transparent');

	const image = await qc.toBinary();
	qc.toFile('/tmp/mychart.png');
	return image
}

const Charts_functions = {
	line_chart: line_chart,
}

exports.Charts_functions = Charts_functions;