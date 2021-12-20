import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } from 'discord.js';

import {Message_constructors} from '../message_constructors/index.js'

let data = new SlashCommandBuilder()
		.setName('profile')
		.setDescription('Shows profile of some player')
		.addStringOption(option =>
		option.setName('player')
			.setDescription('The player ID or mention or nothing')
			.setRequired(false))

async function execute(interaction) {
	let player = interaction.options.getString('player');
		
	return await interaction.reply( await Message_constructors.player_profile(interaction, player) )
}

export { data }
export { execute }
