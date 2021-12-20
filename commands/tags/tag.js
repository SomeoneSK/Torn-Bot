import { SlashCommandBuilder } from '@discordjs/builders';
import {Server_functions} from "../../helper_functions/server.js"
import {Embed_functions} from "../../helper_functions/embeds.js"
import { MessageEmbed } from 'discord.js';

let data = new SlashCommandBuilder()
	.setName('tag')
	.setDescription("Get tag")
	.addStringOption(option =>
		option.setName('tag_name')
			.setDescription('Name of the tag you want to get')
			.setRequired(true))

async function execute(interaction) {
	let tag_name = interaction.options.getString('tag_name');
	let tag_content = await Server_functions.get_tag(interaction.guild, tag_name)

	if (tag_content === undefined) {
		tag_content = "This tag was not defined in this server. You can tell the server administrator to add it."
	}
	await interaction.reply( {content: tag_content} );
}


export { data }
export { execute }