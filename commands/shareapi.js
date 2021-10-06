const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const global_data = require('../global_data.js')
const general = require('../general.js')

const embeds = require('../embeds')
const id_api_stuff = require('../id_api_stuff.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shareapi')
		.setDescription('Shares or unshares your API key'),

	async execute(interaction) {
		let interaction_from = interaction.user
		
		let done = await id_api_stuff.share_users_key(interaction_from.id, share="!")

		return await interaction.reply( {content: done } )
	},
};