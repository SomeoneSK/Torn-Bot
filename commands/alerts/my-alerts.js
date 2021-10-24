const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const {Message_constructors} = require('../../message_constructors')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('my-alerts')
		.setDescription('See your alerts'),
		/*.addStringOption(option =>
		option.setName('type')
			.setDescription('New API key or nothing to unset')
			.setRequired(false)),
*/
	async execute(interaction) {
		let interaction_from = interaction.user.id
		
		return await interaction.reply( await Message_constructors.my_alerts(interaction = interaction, id=id) )
	},
};
