const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const general = require('../general.js')

const {IdApiFunctions} = require("../helper_functions/idApi.js")

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
		
		await IdApiFunctions.set_users_key( interaction_from.id, key )

		return await interaction.reply( {content: to_send} )
	},
};
