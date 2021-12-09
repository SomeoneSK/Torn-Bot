import { SlashCommandBuilder } from '@discordjs/builders';

let data = new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong')
	
async function execute(interaction) {
	await interaction.reply(`🏓Latency is ${Date.now() - interaction.createdTimestamp}ms.`);
}

export { data }
export { execute }