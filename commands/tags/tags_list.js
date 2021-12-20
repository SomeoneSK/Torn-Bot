import { SlashCommandBuilder } from '@discordjs/builders';
import {Server_functions} from "../../helper_functions/server.js"
import {Embed_functions} from "../../helper_functions/embeds.js"
import { MessageEmbed } from 'discord.js';

let data = new SlashCommandBuilder()
	.setName('tags-list')
	.setDescription("Get a list of tags in this server")

async function execute(interaction) {
	let the_list = await Server_functions.tag_list(interaction.guild)

	const embed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle("Tags in this server")
		.addFields( [{name:"Tags", value:the_list.join('\n'), inline:true}] )
		.setTimestamp()
		.setFooter('Page 1/1', '')

	let to_reply = await Embed_functions.check_reply( {embeds: [embed]}, interaction, 25, 25 )
	await interaction.reply( to_reply );
}


export { data }
export { execute }