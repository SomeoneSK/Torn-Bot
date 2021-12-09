import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } from 'discord.js';

import {Message_constructors} from '../message_constructors/index.js'

let data = new SlashCommandBuilder()
		.setName('item-bazaar')
		.setDescription('Shows bazaar listings of some item')
		.addIntegerOption(option =>
		option.setName('item')
			.setDescription('The item ID')
			.setRequired(true))

async function execute(interaction) {
	let item = interaction.options.getInteger('item');

	return await interaction.reply( await Message_constructors.item_bazaar(interaction, item) )
}

export { data }
export { execute }