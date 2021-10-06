const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const global_data = require('../global_data.js')
const general = require('../general.js')

async function error(error) {
	
	fields = [ { name: '', value: '', inline: false } ]

	if ( error["error"] !== undefined ) {
		error =  error["error"]
	}

	const embed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle( "An error occured!" )
		.setDescription( "" + error )
		//.addFields(fields)
		.setTimestamp()
		.setFooter('Hi', '');

	return { embeds: [embed], components: [] }
}

exports.error = error;