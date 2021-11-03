const QuickChart = require('quickchart-js');

//await interaction.reply( {content:'test!', files: [image]} )
async function line_chart() {
	const qc = new QuickChart();
	qc.setConfig({
	type: 'line',
	data: {
		labels: ['January', 'February', 'March', 'April', 'May'],
		datasets: [
		{
			label: 'Dogs',
			data: [50, 60, 70, 180, 190],
		},
		],
	},
	options: {
		scales: {
		yAxes: [
			{
			ticks: {
				callback: function (value) {
				return '$' + value;
				},
			},
			},
		],
		},
	},
	});
	qc.setWidth(500).setHeight(300).setBackgroundColor('transparent');

	const image = await qc.toBinary();

	return image
}

const Charts_functions = {
	line_chart: line_chart,
}

exports.Charts_functions = Charts_functions;