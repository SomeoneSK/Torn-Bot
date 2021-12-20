import { SlashCommandBuilder } from '@discordjs/builders';
import {Database} from "../../database.js"
import {Server_functions} from "../../helper_functions/server.js"

let data = new SlashCommandBuilder()
	.setName('edit-tag')
	.setDescription("Create, edit or remove server's tag")
	.addStringOption(option =>
		option.setName('tag_name')
			.setDescription('Name of the tag you want to edit')
			.setRequired(true))
	.addStringOption(option =>
		option.setName('content')
			.setDescription('The text this tag should return / nothing to delete the tag')
			.setRequired(false))

async function execute(interaction) {
	let tag_name = interaction.options.getString('tag_name');
	let content = interaction.options.getString('content');
	if (content === null) {
		content = undefined
	}

	if (!(await Server_functions.is_allowed(interaction.member)) ) {
		await interaction.reply( {content:'You need to be server administrator to use this command!' } );
	}

	let result = await Server_functions.edit_tag(interaction.guild, tag_name, content)
	await interaction.reply( {content: result } );
}


export { data }
export { execute }