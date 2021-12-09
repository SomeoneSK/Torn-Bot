import host from './host.js'
host()
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
aaa
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import fs from 'fs';
import { Client, Collection, Intents, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } from 'discord.js';

let config = false
try {
	config = require('./config.json')
} catch(error) {
	config = {
		"clientId": "895302817672204368",
		"guildId": "892037665719984128",
		"error_channel": "899743106482704434",
		"status_channel": "899732115384594442",
		"commands_channel": "899734106290671636",
		"token": process.env.token,
		"db_string": process.env.db_string
	}
}

const token = config.token

import {Database} from "./database.js"

import {General_functions} from "./helper_functions/general.js"

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] })

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));


for (const file of eventFiles) {
	const event = await import(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

import {Commands} from "./commands/index.js"

client.commands = new Collection();
const commands = [];
for (const file of Object.keys(Commands)) {
	if (config.clientId === "895302817672204368"){
    Commands[file].data.name = 'test_' + Commands[file].data.name
	}
	client.commands.set(Commands[file].data.name, Commands[file]);
	commands.push(Commands[file].data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');
		await rest.put(
			Routes.applicationCommands(config.clientId),
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
	const command = await import(`./test_commands/${file}`);
	command.data.name += '_test'
	client.commands.set(command.data.name, command);
	commands_test.push(command.data.toJSON());
}

(async () => {
	try {
		console.log('Started refreshing application (/) test commands.');
		await rest.put(
			Routes.applicationGuildCommands(config.clientId, config.guildId),
			{ body: commands_test },
		);
		console.log('Successfully reloaded application (/) test commands.');
	} catch (error) {
		console.error(error);
	}
})();

client.login(token);