const {General_functions} = require("../helper_functions/general.js")

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isCommand() ) {
			return
		}
		let chan = await General_functions.get_channel("899734106290671636")
		let channel = "dm"
		if ( interaction.channel !== null ) {
			channel = interaction.channel.toString()
		}
		let guild = "dm"
		if ( interaction.guild !== null ) {
			guild = interaction.guild.toString()
		}
		chan.send( interaction.user.tag + " in " + channel + " in " + guild + " - " + interaction.commandName) //+ ", options: " + JSON.stringify(interaction.options.data) )
	},
};

