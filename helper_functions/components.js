const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const general = require('../general.js')

async function button(interaction, button_id, button_label, button_style="PRIMARY", func) {
	let random = general.make_random_str(10)
	let the_button = new MessageButton()
		.setCustomId(button_id + random)
		.setLabel(button_label)
		.setStyle(button_style)
	
	const filter = async (i) => {
		if ( i.customId === button_id + random && i.user.id === interaction.user.id ) {
			return true
		}
    }

	const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

	collector.on('collect', async i => {
		await func()
		await i.deferUpdate();
		collector.stop()
	})

	return the_button
}



exports.button = button;