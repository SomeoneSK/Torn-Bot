import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } from 'discord.js';

import {Message_constructors} from '../message_constructors/index.js'

let data = new SlashCommandBuilder()
		.setName('company')
		.setDescription('Shows profile of some company')
		.addIntegerOption(option =>
		option.setName('company_id')
			.setDescription('The company ID')
			.setRequired(false))

async function execute(interaction) {
	let id = interaction.options.getInteger('company_id');

	return await interaction.reply( await Message_constructors.company_profile(interaction = interaction, id=id) )
}

export { data }
export { execute }