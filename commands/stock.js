import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } from 'discord.js';

import {Message_constructors} from '../message_constructors/index.js'

let data = new SlashCommandBuilder()
		.setName('stock')
		.setDescription('Shows info about some stock')
		.addStringOption((option) =>
			option.setName('stock').setDescription('The stock - use stock acronym').setRequired(false),
		)

async function execute(interaction) {
	let stock = interaction.options.getString('stock');

  await interaction.deferReply();
  try {
	  await Message_constructors.stock(interaction, stock)
  } catch (e) {
	console.log("error command")
  }
}

export { data }
export { execute }
