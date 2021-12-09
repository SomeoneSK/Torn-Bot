import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } from 'discord.js';

import {Id_api_functions} from "../helper_functions/id_api.js"

let data = new SlashCommandBuilder()
		.setName('share-api')
		.setDescription('Shares or unshares your API key')

async function execute(interaction) {
	let interaction_from = interaction.user
	let done = await Id_api_functions.share_users_key(interaction_from.id, share="!")
	return await interaction.reply( {content: done } )
}

export { data }
export { execute }