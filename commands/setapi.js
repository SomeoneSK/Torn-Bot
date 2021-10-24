const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');

const {Id_api_functions} = require("../helper_functions/id_api.js")

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
		
		await Id_api_functions.set_users_key( interaction_from.id, key )

		return await interaction.reply( {content: to_send, ephemeral :true} )
	},
};
