import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } from 'discord.js';

import {Message_constructors} from '../message_constructors/index.js'

const data = new SlashCommandBuilder()
		.setName('foreign-stocks')
		.setDescription('Shows stock of items in foreign countries')
		.addStringOption(option =>
		option.setName('country')
			.setDescription('The country')
			.setRequired(true)
			.addChoice('Mexico', 'Mexico')
			.addChoice('Cayman Islands', 'Cayman Islands')
			.addChoice('Canada', 'Canada')
			.addChoice('Hawaii', 'Hawaii')
			.addChoice('United Kingdom', 'United Kingdom')
			.addChoice('Argentina', 'Argentina')
			.addChoice('Switzerland', 'Switzerland')
			.addChoice('Japan', 'Japan')
			.addChoice('China', 'China')
			.addChoice('UAE', 'UAE')
			.addChoice('South Africa', 'South Africa'))

async function execute(interaction) {
	let country = interaction.options.getString('country');

	return await interaction.reply( await Message_constructors.foreign_stocks(interaction=interaction, country) )
}

export { data }
export { execute }