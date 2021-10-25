const host = require('./host.js')
host.host()

const util = require('util');

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const { Client, Collection, Intents, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');
const { clientId, guildId } = require('./config.json');
const token = process.env['token']

const {Database} = require("./database.js")
const {General_functions} = require("./helper_functions/general.js")

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] })

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

const {Commands} = require("./commands")
client.commands = new Collection();

const commands = [];
for (const file of Object.keys(Commands)) {
	client.commands.set(Commands[file].data.name, Commands[file]);
	commands.push(Commands[file].data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');
		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);
		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();


const commandFiles_test = fs.readdirSync('./test_commands').filter(file => file.endsWith('.js'));

const commands_test = [];
for (const file of commandFiles_test) {
	const command = require(`./test_commands/${file}`);
	command.data.name += '_test'
	client.commands.set(command.data.name, command);
	commands_test.push(command.data.toJSON());
}

(async () => {
	try {
		console.log('Started refreshing application (/) test commands.');
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands_test },
		);
		console.log('Successfully reloaded application (/) test commands.');
	} catch (error) {
		console.error(error);
	}
})();


client.login(token);
