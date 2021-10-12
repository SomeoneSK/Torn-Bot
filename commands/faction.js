const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const global_data = require('../global_data.js')
const general = require('../general.js')

const responses = require('../responses')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('faction')
		.setDescription('Shows profile of some faction')
		.addStringOption(option =>
		option.setName('faction_id')
			.setDescription('The faction ID')
			.setRequired(false)),

	async execute(interaction) {
		let id = interaction.options.getString('faction_id');

		return await interaction.reply( await responses.faction_profile(id, interaction = interaction) )
	},
};
