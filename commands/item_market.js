const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const general = require('../general.js')

const responses = require('../responses')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('item-market')
		.setDescription('Shows market listings of some item')
		.addStringOption(option =>
		option.setName('item')
			.setDescription('The item ID')
			.setRequired(true)),

	async execute(interaction) {
		let item = interaction.options.getString('item');

		return await interaction.reply( await responses.item_market(item, interaction) )
	},
};
