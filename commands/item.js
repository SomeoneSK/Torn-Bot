const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const global_data = require('../global_data.js')
const general = require('../general.js')

const responses = require('../responses')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('item')
		.setDescription('Shows info about some item')
		.addStringOption(option =>
		option.setName('item')
			.setDescription('The item ID')
			.setRequired(true)),

	async execute(interaction) {
		let item = interaction.options.getString('item');

		return await interaction.reply( await responses.item(item, interaction) )
	},
};
