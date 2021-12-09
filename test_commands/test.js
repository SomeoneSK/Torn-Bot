import { SlashCommandBuilder } from '@discordjs/builders';
import {Database} from "../database.js"

let data = new SlashCommandBuilder()
		.setName('test')
		.setDescription('test!')

async function execute(interaction) {
	await interaction.reply( {content:'test!', files: [] } );
}


export { data }
export { execute }