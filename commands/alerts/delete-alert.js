import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } from 'discord.js';
import {Alerts_general} from '../../alerts/general.js'

let data = new SlashCommandBuilder()
		.setName('delete-alert')
		.setDescription('Delete one of your alerts')
		.addIntegerOption(option =>
		option.setName('index')
			.setDescription('Index of the alert you want to delete. Get it with command /my-alerts')
			.setRequired(true))

async function execute(interaction) {
		let interaction_from = interaction.user.id
		let index = interaction.options.getInteger('index');
		
		let alerts = await Alerts_general.get_users_alerts(interaction_from)
		let alert = alerts[index-1]

		if (alert === undefined) {
			return await interaction.reply( {content: "There's no such alert! You have only " + alerts.length + " alerts!" } )
		}
		await Alerts_general.delete_alert(alert.code)

		let alert_string = await alert.to_string()
		return await interaction.reply( {content: "Deleted this alert: \n" + alert_string } )
}

export { data }
export { execute }
