import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } from 'discord.js';

async function error(error) {
	
	let fields = [ { name: '', value: '', inline: false } ]

	if ( error["error"] !== undefined ) {
		error =  error["error"]
	}

	const embed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle( "An error occured!" )
		.setDescription( "" + error )
		//.addFields(fields)
		.setTimestamp()
		.setFooter('Page 1/1', '');

	return { embeds: [embed], components: [] }
}

export { error }