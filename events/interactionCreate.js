const {General_functions} = require("../helper_functions/general.js")
const { Client, Collection, Intents, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');
const { error_channel, commands_channel } = require('../config.json');
const util = require('util');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		let client = interaction.client
		
		if (!interaction.isCommand()) return;
		const command = client.commands.get(interaction.commandName);
		if (!command) return;

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });

			let chan = await General_functions.get_channel(error_channel)
			if (chan === undefined) {return}
			attachment = new MessageAttachment(Buffer.from(util.inspect(interaction), 'utf-8'), 'myfile.txt');
			chan.send( {content:"error - " + error, files:[attachment]} )
		}

		let chan = await General_functions.get_channel(commands_channel)
		if (chan === undefined) {return}
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

