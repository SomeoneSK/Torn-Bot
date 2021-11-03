const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');

const {Message_constructors} = require('../message_constructors')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('faction')
		.setDescription('Shows profile of some faction')
		.addIntegerOption(option =>
		option.setName('faction_id')
			.setDescription('The faction ID')
			.setRequired(false)),

	async execute(interaction) {
		let id = interaction.options.getInteger('faction_id');

		return await interaction.reply( await Message_constructors.faction_profile(interaction = interaction, id=id) )
	},
};
