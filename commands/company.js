const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');

const {Message_constructors} = require('../message_constructors')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('company')
		.setDescription('Shows profile of some company')
		.addIntegerOption(option =>
		option.setName('company_id')
			.setDescription('The company ID')
			.setRequired(false)),

	async execute(interaction) {
		let id = interaction.options.getInteger('company_id');

		return await interaction.reply( await Message_constructors.company_profile(interaction = interaction, id=id) )
	},
};
