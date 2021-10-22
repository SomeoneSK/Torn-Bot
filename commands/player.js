const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');

const {Message_constructors} = require('../message_constructors')

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

		return await interaction.reply( await Message_constructors.player_profile(interaction, id) )
	},
};
