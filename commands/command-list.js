const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const {Commands} = require("../commands")
const {Embed_functions} = require('../helper_functions/embeds.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('command-list')
		.setDescription('Get list of commands of this bot.'),
		
	async execute(interaction) {
		let the_list = ""
		for (const file of Object.keys(Commands)) {
			the_list += Commands[file].data.name + "\n"
		}
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle("Command list")
			.addFields( [{name:"Commands", value:the_list, inline:true}] )
			.setTimestamp()
			.setFooter('Page 1/1', '')

		let to_reply = await Embed_functions.check_reply( {embeds: [embed]}, interaction, fields_limit = 25, new_lines_limit=25 )

		await interaction.reply( to_reply );
	},
}


