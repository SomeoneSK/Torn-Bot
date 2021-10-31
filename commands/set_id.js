const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');

const {Id_api_functions} = require("../helper_functions/id_api.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set-id')
		.setDescription('Sets ID')
		.addIntegerOption(option =>
		option.setName('id')
			.setDescription('New ID or nothing to unset')
			.setRequired(false)),

	async execute(interaction) {
		let id = interaction.options.getInteger('id');
		let to_send = "Set your ID!"
		if (id === null) { id = ""; to_send = "Unset your ID!" }
		let interaction_from = interaction.user
		
		let result = await Id_api_functions.set_users_id( interaction_from.id, interaction.guild.id, id )

		if ( result["error"] !== undefined ) {
			to_send = result["error"]
		}

		return await interaction.reply( {content: to_send} )
	},
};
