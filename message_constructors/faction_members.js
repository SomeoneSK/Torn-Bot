import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } from 'discord.js';
import {General_functions} from "../helper_functions/general.js"

import {Components_functions} from '../helper_functions/components.js'
import {faction_profile as faction_profile_constructor} from './faction_profile.js'
import {Embed_functions} from '../helper_functions/embeds.js'
import {Shorten_texts_functions} from "../helper_functions/shorten_texts.js"

async function faction_members(interaction, info, page = 1) {
	let fields = []
	
	let field1 = ''
	for ( let id of Object.keys(info["members"] )) {
		let member = info["members"][id]
		field1 += "\n" + General_functions.make_link("player_profile", id, member["name"] + "[" + id + "]")
		field1 += " - " + member["level"]
		field1 += "\n" + member["days_in_faction"] + ", " + member["position"]
		field1 += Shorten_texts_functions.shortenText( "\n" + member["last_action"]["status"] + " " + member["status"]["description"] + ", " + member["last_action"]["relative"] )
	}
	if (field1 === "") {
		field1 = "This faction has no members!"
	}
	fields.push( { name: 'Members', value: field1, inline: true } )


	const embed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle(info["name"] + " [" + info["ID"] + "] - " + info["tag"])
		.setURL( General_functions.make_link("faction_profile", info["ID"]) )
		.setDescription( "Name [ID] Level\nDays in Faction, Position\nStatus, Last Action" )
		.addFields(fields)
		.setTimestamp()
		.setFooter('Page 1/1', '');

	async function profile() {
		let profile = await faction_profile_constructor( interaction, 0, info)
		await interaction.editReply( profile )
	}

	let profile_button = await Components_functions.button(interaction, "profile", "Profile", "PRIMARY", profile)

	const row = new MessageActionRow()
			.addComponents(profile_button)

	let the_reply = await Embed_functions.check_reply({ embeds: [embed], components: [row] }, interaction)

	return the_reply
}

export { faction_members }

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