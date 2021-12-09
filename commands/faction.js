import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } from 'discord.js';

import {Message_constructors} from '../message_constructors/index.js'

let data = new SlashCommandBuilder()
		.setName('faction')
		.setDescription('Shows profile of some faction')
		.addIntegerOption(option =>
		option.setName('faction_id')
			.setDescription('The faction ID')
			.setRequired(false))

async function execute(interaction) {
	let id = interaction.options.getInteger('faction_id');

	return await interaction.reply( await Message_constructors.faction_profile(interaction = interaction, id=id) )
}

export { data }
export { execute }
