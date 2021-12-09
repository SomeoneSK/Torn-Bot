import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } from 'discord.js';

import {Id_api_functions} from "../helper_functions/id_api.js"

let data = new SlashCommandBuilder()
		.setName('set-api')
		.setDescription('Sets API key')
		.addStringOption(option =>
		option.setName('key')
			.setDescription('New API key or nothing to unset')
			.setRequired(false))

async function execute(interaction) {
	let key = interaction.options.getString('key');
	let to_send = "Set your API!"
	if (key === null) { key = ""; to_send = "Unset your API!" }
	let interaction_from = interaction.user
	
	let result = await Id_api_functions.set_users_key( interaction_from.id, interaction.guild.id, key )

	if ( result["error"] !== undefined ) {
		to_send = result["error"]
	}
	
	return await interaction.reply( {content: to_send, ephemeral :true} )
}

export { data }
export { execute }