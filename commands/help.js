import { SlashCommandBuilder } from '@discordjs/builders';
import {Database} from "../database.js"

let data = new SlashCommandBuilder()
		.setName('help')
		.setDescription('Need help with the bot?')
		
async function execute(interaction) {
	await interaction.reply( {content:'Discord server: https://discord.gg/3RmCckhXWg\nUse `/command-list` to see command list' } );
}

export { data }
export { execute }