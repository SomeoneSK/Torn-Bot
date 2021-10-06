const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('button')
		.setDescription('Replies with Pong!'),

	async execute(interaction) {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Primary')
					.setStyle('PRIMARY'),
			);
			
		const embed = new MessageEmbed()
			.setColor('#F091ff')
			.setTitle('Some title')
			.setURL('https://discord.js.org')
			.setDescription('Some description here');

		await interaction.reply({ content: 'Pong!', ephemeral: true, embeds: [embed], components: [row] });

		const filter = i => i.customId === 'primary';
		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

		collector.on('collect', async i => {
			if (i.customId === 'primary') {
				await i.update({ content: 'A button was clicked!', components: [] });
			}
		});
		collector.on('end', collected => console.log(`Collected ${collected.size} items`));
	},
};

