import { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } from 'discord.js';
import {General_functions} from "../helper_functions/general.js"

async function button(interaction, button_id, button_label, button_style="PRIMARY", func) {
	let random = General_functions.make_random_str(10)
	let the_button = new MessageButton()
		.setCustomId(button_id + random)
		.setLabel(button_label)
		.setStyle(button_style)
	
	const filter = async (i) => {
		if ( i.customId === button_id + random && i.user.id === interaction.user.id ) {
			return true
		}
    }

	const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

	collector.on('collect', async i => {
		await func()
		await i.deferUpdate();
		collector.stop()
	})

	return the_button
}

async function select_menu(interaction, custom_id, placeholder, options = [], func, min=1, max=1) {
	let random = General_functions.make_random_str(10)

	for (let option of options) {
		if (option["value"] === undefined) {
			option["value"] = option["label"]
		}
	}

	let the_menu = new MessageSelectMenu()
		.setCustomId(custom_id + random)
		.setPlaceholder(placeholder)
		.setMinValues(min)
		.setMaxValues(max)
		.addOptions(options)


	const filter = async (i) => {
		if ( i.customId === custom_id + random && i.user.id === interaction.user.id ) {
			return true
		}
    }

	const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

	collector.on('collect', async i => {
		await func( i.values )
		await i.deferUpdate();
		collector.stop()
	})

	return the_menu
}


const Components_functions = {
	button: button,
	select_menu: select_menu,
}

export { Components_functions }