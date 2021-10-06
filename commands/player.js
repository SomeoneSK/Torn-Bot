const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const global_data = require('../global_data.js')
const general = require('../general.js')

const embeds = require('../embeds')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('Shows profile of some player')
		.addStringOption(option =>
		option.setName('player_id')
			.setDescription('The player')
			.setRequired(false)),

	async execute(interaction) {
		let id = interaction.options.getString('player_id');
		let interaction_from = interaction.user

		return await interaction.reply( await embeds.player_profile(id, interaction_from) )
	},
};
