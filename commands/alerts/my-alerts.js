import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } from 'discord.js';
import {Message_constructors} from '../../message_constructors/index.js'

let data = new SlashCommandBuilder()
		.setName('my-alerts')
		.setDescription('See your alerts')
		/*.addStringOption(option =>
		option.setName('type')
			.setDescription('New API key or nothing to unset')
			.setRequired(false)),
*/

async function execute(interaction) {
	let interaction_from = interaction.user.id
	
	return await interaction.reply( await Message_constructors.my_alerts(interaction, interaction_from) )
}

export { data }
export { execute }
