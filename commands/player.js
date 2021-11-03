const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');

const {Message_constructors} = require('../message_constructors')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('Shows profile of some player')
		.addStringOption(option =>
		option.setName('player')
			.setDescription('The player ID or mention or nothing')
			.setRequired(false)),

	async execute(interaction) {
		let player = interaction.options.getString('player');

		return await interaction.reply( await Message_constructors.player_profile(interaction, player) )
	},
};
