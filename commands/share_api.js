const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');

const {Id_api_functions} = require("../helper_functions/id_api.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('share-api')
		.setDescription('Shares or unshares your API key'),

	async execute(interaction) {
		let interaction_from = interaction.user
		let done = await Id_api_functions.share_users_key(interaction_from.id, share="!")
		return await interaction.reply( {content: done } )
	},
};