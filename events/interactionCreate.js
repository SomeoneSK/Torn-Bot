import {General_functions} from "../helper_functions/general.js"
import { Client, Collection, Intents, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } from 'discord.js';
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
let config = require('../config.json')
import util from 'util';

let name = 'interactionCreate'
async function execute(interaction) {
	let client = interaction.client

	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
    if (interaction.deferred) {
      interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });
    } else {
      interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }

		let chan = await General_functions.get_channel(config.error_channel)
		if (chan === undefined) {return}
		const attachment = new MessageAttachment(Buffer.from(util.inspect(interaction), 'utf-8'), 'myfile.txt');
		chan.send( {content:"error - " + error, files:[attachment]} )
	}

	let chan = await General_functions.get_channel(config.commands_channel)
	if (chan === undefined) {return}
	let channel = "dm"
	if ( interaction.channel !== null ) {
		channel = interaction.channel.toString()
	}
	let guild = "dm"
	if ( interaction.guild !== null ) {
		guild = interaction.guild.toString()
	}
	chan.send( interaction.user.tag + " in " + channel + " in " + guild + " - " + interaction.commandName) //+ ", options: " + JSON.stringify(interaction.options.data) )
}

export { name }
export { execute }