const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const global_data = require('../global_data.js')
const general = require('../general.js')

const responses = require('../responses')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('Shows profile of some player')
		.addStringOption(option =>
		option.setName('player_id')
			.setDescription('The player ID')
			.setRequired(false)),

	async execute(interaction) {
		let id = interaction.options.getString('player_id');

		return await interaction.reply( await responses.player_profile(interaction, id) )
	},
};
