import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } from 'discord.js';
import {Database} from "../database.js"
import {General_functions} from "../helper_functions/general.js"
import {Id_api_functions} from "../helper_functions/id_api.js"

import {Faction_functions} from "../helper_functions/faction.js"
import {Components_functions} from '../helper_functions/components.js'
import {faction_members as faction_members_constructor} from './faction_members.js'
import {error as error_constructor} from './error.js'

async function faction_profile(interaction, id, info = false) {
	if ( info === false ) {
		let data = Database.getData()
		let url = ""
		if ( id === null ) {
			if ( General_functions.get_user(interaction.user.id.toString())["torn_api_key"] === "" ) {
				return await error_constructor( "Set your api with /setapi or use ID in this command!" )
			}
			url = General_functions.make_url( "faction", "", [""] )
		} else {
			url = General_functions.make_url( "faction", id, [""] )
		}

		info = await Id_api_functions.get_data_from_api( url, interaction.user.id, false )
	}


	if ( info["error"] !== undefined ) {
		return await error_constructor(info["error"])
	}
	if ( info["ID"] === null ) {
		return await error_constructor("Faction with such ID does not exist!")
	}

	let fields = []

	let members_info = await Faction_functions.members_info(info)
	let field1 = '\n**Respect: **' + General_functions.format_number(info["respect"])
	field1 += '**\nLeader: **' + members_info["leader_name"] + " [" + info["leader"] + "]"
	field1 += '\n**Co-Leader: **' + members_info["coleader_name"] + " [" + info["co-leader"] + "]"
	field1 += '\n**Age: **' + General_functions.format_number(info["age"]) + " days"
	field1 += '\n**Members: **' + members_info["members_count"] + "/" + General_functions.format_number(info["capacity"])
	field1 += '\n**Best Chain: **' + General_functions.format_number(info["best_chain"])
	fields.push( { name: 'Info', value: field1, inline: true } )

	
	let field2 = ''
	//fields.push( { name: 'Info', value: field2, inline: true } )

	const embed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle(info["name"] + " [" + info["ID"] + "] - " + info["tag"])
		.setURL( General_functions.make_link("faction_profile", info["ID"]) )
		//.setAuthor('Some name', 'https://i.imgur.com/AfFp7pu.png', 'https://discord.js.org')
		//.setDescription(gender + " " + info["rank"] )
		//.setThumbnail('https://i.imgur.com/AfFp7pu.png')
		.addFields(fields)
		//.addField('Inline field title', 'Some value here', true)
		//.setImage('https://i.imgur.com/AfFp7pu.png')
		.setTimestamp()
		.setFooter('Page 1/1', '');

	async function members() {
		let members = await faction_members_constructor(interaction, info)
		await interaction.editReply( members )
	}

	let members_button = await Components_functions.button(interaction, "members", "Members", "PRIMARY", members)

	const row = new MessageActionRow()
			.addComponents(members_button)

	return { embeds: [embed], components: [row] }
}

export { faction_profile }

/*
{
	"ID": 9357,
	"name": "ReactoR",
	"tag": "R!",
	"leader": 433649,
	"co-leader": 2167947,
	"respect": 2533144,
	"age": 4698,
	"capacity": 100,
	"best_chain": 10000,
	"territory_wars": {},
	"raid_wars": {},
	"peace": {},
	"members": {
		"64378": {
			"name": "Mikiala",
			"level": 77,
			"days_in_faction": 1315,
			"last_action": {
				"status": "Offline",
				"timestamp": 1633597558,
				"relative": "6 hours ago"
			},
			"status": {
				"description": "Okay",
				"details": "",
				"state": "Okay",
				"color": "green",
				"until": 0
			},
			"position": "Member Plus"
		},
		"71342": {
			"name": "Dragonik",
			"level": 58,
			"days_in_faction": 1370,
			"last_action": {
				"status": "Offline",
				"timestamp": 1633598611,
				"relative": "5 hours ago"
			},
			"status": {
				"description": "Okay",
				"details": "",
				"state": "Okay",
				"color": "green",
				"until": 0
			},
			"position": "Member Plus"
		},
		"433649": {
			"name": "type568",
			"level": 80,
			"days_in_faction": 2680,
			"last_action": {
				"status": "Idle",
				"timestamp": 1633611687,
				"relative": "2 hours ago"
			},
			"status": {
				"description": "Okay",
				"details": "",
				"state": "Okay",
				"color": "green",
				"until": 0
			},
			"position": "Leader"
		},
		"476523": {
			"name": "nagen1984",
			"level": 75,
			"days_in_faction": 420,
			"last_action": {
				"status": "Offline",
				"timestamp": 1633619049,
				"relative": "13 minutes ago"
			},
			"status": {
				"description": "In an Emirati hospital for 8 mins ",
				"details": "Mugged by <a href = \"http://www.torn.com/profiles.php?XID=2173183\">MrGrimm</a>",
				"state": "Hospital",
				"color": "red",
				"until": 1633620357
			},
			"position": "Member Plus"
		},
*/