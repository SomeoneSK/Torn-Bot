import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } from 'discord.js';

import {Id_api_functions} from "../helper_functions/id_api.js"

let data = new SlashCommandBuilder()
		.setName('set-id')
		.setDescription('Sets ID')
		.addIntegerOption(option =>
		option.setName('id')
			.setDescription('New ID or nothing to unset')
			.setRequired(false))

async function execute(interaction) {
	let id = interaction.options.getInteger('id');
	let to_send = "Set your ID!"
	if (id === null) { id = ""; to_send = "Unset your ID!" }
	let interaction_from = interaction.user
	
	let result = await Id_api_functions.set_users_id( interaction_from.id, interaction.guild.id, id )

	console.log(result)
	if ( result["error"] !== undefined ) {
		to_send = result["error"]
	}

	return await interaction.reply( {content: to_send} )
}

export { data }
export { execute }