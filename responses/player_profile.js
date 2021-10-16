const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const global_data = require('../global_data.js')
const general = require('../general.js')
const error = require('./error.js')

const components = require('../helper_functions/components.js')
const embeds = require('../helper_functions/embeds.js')

async function player_profile(interaction, id, info=false) {
	if ( info === false ) {
		let data = global_data.getData()
		if ( id === null ) {
			if ( !Object.keys(data["players"]).includes(interaction.user.id.toString()) ) {
				return await error.error( "Set your ID with /setid or use ID in this command!" )
			}
			id = data["players"][ interaction.user.id.toString() ]["torn_id"]
		}
		let url = general.make_url( "user", id=id, selections=["profile"] )
		info = await general.get_data_from_api( url, user_id=interaction.user.id, private=false )
	}
	
	if ( info["error"] !== undefined ) {
		return await error.error(info["error"])
	}

	let gender = ":male_sign:"
	if ( info["gender"] == "Female" ) {
		gender = ":female_sign:"
	}

	let fields = []

	let field1 = '**Signup: **' + info["signup"]
	field1 += '\n**Age: **' + general.format_number(info["age"]) + ' days'
	field1 += '\n**Level: **' + general.format_number(info["level"])
	field1 += '\n**Awards: **' + general.format_number(info["awards"])
	field1 += '\n**Friends/Enemies: **' + general.format_number(info["friends"]) + "/" + general.format_number(info["enemies"])
	field1 += '\n**Forum Posts: **' + general.format_number(info["forum_posts"])
	field1 += '\n**Karma: **' + general.format_number(info["karma"])
	field1 += '\n**Role: **' + general.format_number(info["role"])
	fields.push( { name: 'Info', value: field1, inline: true } )
	
	let details = ''
	if ( info["status"]["details"] !== '' ) {
		details = ' - ' + info["status"]["details"]
	}
	let field2 = ''
	field2 += ':heart: ' + general.format_number(info["life"]['current']) + ' / ' + general.format_number(info["life"]['maximum'])
	field2 += '\n**Status: **' + info["status"]["description"] + details
	field2 += '\n**' + info["last_action"]["status"] + '** - ' + info["last_action"]["relative"]
	let married = '\n**Spouse**: None'
	if ( info["married"]["spouse_id"] !== 0 ) {
		married = '\nMarried to ' + '[' + info["married"]["spouse_name"] + ' [' + info["married"]["spouse_id"] + ']](' + general.make_link("player_profile", id=info["married"]["spouse_id"]) + ')' + ' - ' + info["married"]["duration"] + ' days'
	}
	field2 += married
	let faction = '\n**Faction**: None'
	if ( info["faction"]["faction_id"] !== 0 ) {
		faction = '\n' + info["faction"]["position"] + ' at ' + '[' + info["faction"]["faction_name"] + ' [' + info["faction"]["faction_id"] + ']](' + general.make_link("faction_profile", id=info["faction"]["faction_id"]) + ')' + ' - ' + info["faction"]["days_in_faction"] + ' days'
	}
	field2 += faction
	let job = '\n**Job**: None'
	if ( info["job"]["company_id"] !== 0 ) {
		job = '\n' + info["job"]["position"] + ' at ' + '[' + info["job"]["company_name"] + ' [' + info["job"]["company_id"] + ']](' + general.make_link("company_profile", id=info["job"]["company_id"]) + ')'
	}
	field2 += job

	fields.push( { name: 'Info', value: field2, inline: true } )
	
	let links = general.make_link("attack", info["player_id"], formnat="Attack") + ', ' + general.make_link("message", info["player_id"], formnat="Message") + ', ' + general.make_link("send_money", info["player_id"], formnat="Send Money") + ', ' + general.make_link("trade", info["player_id"], formnat="Trade") + ', ' + general.make_link("player_bazaar", info["player_id"], formnat="Bazaar") + ', ' + general.make_link("place_bounty", info["player_id"], formnat="Bounty") + ', ' + general.make_link("add_friend", info["player_id"], formnat="Add Friend") + ', ' + general.make_link("add_enemy", info["player_id"], formnat="Add Enemy") + ', ' + general.make_link("display_case", info["player_id"], formnat="Display") + ', ' + general.make_link("personal_stats", info["player_id"], formnat="Stats")
	fields.push( { name: 'Info', value: links, inline: false } )

	const embed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle(info["name"] + " [" + info["player_id"] + "]")
		.setURL( general.make_link("player_profile", info["player_id"]) )
		//.setAuthor('Some name', 'https://i.imgur.com/AfFp7pu.png', 'https://discord.js.org')
		.setDescription(gender + " " + info["rank"] )
		//.setThumbnail('https://i.imgur.com/AfFp7pu.png')
		.addFields(fields)
		//.addField('Inline field title', 'Some value here', true)
		//.setImage('https://i.imgur.com/AfFp7pu.png')
		.setTimestamp()
		.setFooter('Page 1/1', '');

	const row1 = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setURL(general.make_link("attack", info["player_id"]))
				.setLabel('Attack')
				.setStyle('LINK')
		)

	let to_reply = await embeds.check_reply({ embeds: [embed], components: [] }, interaction)

	return to_reply
}

exports.player_profile = player_profile;

/*
{
	"rank": "Professional Trader",
	"level": 45,
	"gender": "Male",
	"property": "Private Island",
	"signup": "2020-06-17 18:26:58",
	"awards": 154,
	"friends": 6,
	"enemies": 2,
	"forum_posts": 240,
	"karma": 103,
	"age": 467,
	"role": "Civilian",
	"donator": 0,
	"player_id": 2572033,
	"name": "SomeoneSK",
	"property_id": 2042960,
	"active_gym": 18,
	"life": {
		"current": 2231,
		"maximum": 2231,
		"increment": 138,
		"interval": 300,
		"ticktime": 82,
		"fulltime": 0
	},
	"status": {
		"description": "Okay",
		"details": "",
		"state": "Okay",
		"color": "green",
		"until": 0
	},
	"job": {
		"position": "Employee",
		"company_id": 70390,
		"company_name": "Aisle 11",
		"company_type": 12
	},
	"faction": {
		"position": "Discord-api management",
		"faction_id": 9357,
		"days_in_faction": 458,
		"faction_name": "ReactoR",
		"faction_tag": "R!"
	},
	"married": {
		"spouse_id": 606698,
		"spouse_name": "Blainyckz_",
		"duration": 400
	},
	"basicicons": {
		"icon6": "Male",
		"icon8": "Married - To Blainyckz_",
		"icon27": "Company - Trainer of Aisle 11 (Grocery Store)",
		"icon9": "Faction - Discord-api management of ReactoR"
	},
	"states": {
		"hospital_timestamp": 0,
		"jail_timestamp": 0
	},
	"last_action": {
		"status": "Offline",
		"timestamp": 1632840764,
		"relative": "2 hours ago"
	},
	"competition": {
		"name": "Elimination"
	}
}
*/