const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');

const {Message_constructors} = require('../message_constructors')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('item')
		.setDescription('Shows info about some item')
		.addIntegerOption(option =>
		option.setName('item')
			.setDescription('The item ID')
			.setRequired(true)),

	async execute(interaction) {
		let item = interaction.options.getInteger('item');

		return await interaction.reply( await Message_constructors.item(interaction, item) )
	},
};
