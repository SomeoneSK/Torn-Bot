const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const global_data = require('../global_data.js')
const general = require('../general.js')
const error = require('./error.js')

const faction_stuff = require('../helper_functions/faction_stuff.js')
const components = require('../helper_functions/components.js')
const responses = require('../responses')
const embeds = require('../helper_functions/embeds.js')
const shorten_texts = require('../helper_functions/shorten_texts.js')

async function faction_members(interaction, info, page = 1) {
	let fields = []
	
	let field1 = ''
	for ( let id of Object.keys(info["members"] )) {
		let member = info["members"][id]
		field1 += "\n" + general.make_link("player_profile", id=id, format=member["name"] + "[" + id + "]")
		field1 += " - " + member["level"]
		field1 += "\n" + member["days_in_faction"] + ", " + member["position"]
		field1 += shorten_texts.shorten_texts( "\n" + member["last_action"]["status"] + " " + member["status"]["description"] + ", " + member["last_action"]["relative"] )
	}

	fields.push( { name: 'Members', value: field1, inline: true } )


	const embed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle(info["name"] + " [" + info["ID"] + "] - " + info["tag"])
		.setURL( general.make_link("faction_profile", info["ID"]) )
		.setDescription( "Name [ID] Level\nDays in Faction, Position\nStatus, Last Action" )
		.addFields(fields)
		.setTimestamp()
		.setFooter('Page 1/1', '');

	async function profile() {
		let profile = await responses.faction_profile( interaction=interaction, id=0, info = info)
		await interaction.editReply( profile )
	}

	let profile_button = await components.button(interaction = interaction, button_id = "profile", button_label = "Profile", button_style="PRIMARY", func = profile)

	const row = new MessageActionRow()
			.addComponents(profile_button)

	let the_reply = await embeds.check_reply({ embeds: [embed], components: [row] }, interaction)

	return the_reply
}

exports.faction_members = faction_members;

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