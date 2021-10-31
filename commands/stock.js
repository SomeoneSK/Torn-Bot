const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');

const {Message_constructors} = require('../message_constructors')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stock')
		.setDescription('Shows info about some stock')
		.addStringOption((option) =>
			option.setName('stock').setDescription('The stock - use stock acronym').setRequired(false),
		),

	async execute(interaction) {
		let stock = interaction.options.getString('stock');

		return await interaction.reply( await Message_constructors.stock(interaction, stock) )
	},
};
