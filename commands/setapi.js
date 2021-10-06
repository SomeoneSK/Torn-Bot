const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const global_data = require('../global_data.js')
const general = require('../general.js')

const embeds = require('../embeds')
const id_api_stuff = require('../id_api_stuff.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setapi')
		.setDescription('Sets API key')
		.addStringOption(option =>
		option.setName('key')
			.setDescription('New API key or nothing to unset')
			.setRequired(false)),

	async execute(interaction) {
		let key = interaction.options.getString('key');
		let to_send = "Set your API!"
		if (key === null) { key = ""; to_send = "Unset your API!" }
		let interaction_from = interaction.user
		
		await id_api_stuff.set_users_key( interaction_from.id, key )

		return await interaction.reply( {content: to_send} )
	},
};
