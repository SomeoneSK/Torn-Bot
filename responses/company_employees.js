const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const general = require('../general.js')
const error = require('./error.js')

const {ShortenTextsFunctions} = require("../helper_functions/shortenTexts.js")
const components = require('../helper_functions/components.js')
const responses = require('../responses')
const embeds = require('../helper_functions/embeds.js')

async function company_employees(interaction, info, page = 1) {
	let fields = []
	
	if (Object.keys(info).includes("company")) {
		info = info["company"]
	}

	let field1 = ''
	let index = 0
	for ( let id of Object.keys(info["employees"] )) {
		if (index % 5 === 0 && index !== 0) {
			fields.push( { name: 'Employees', value: field1, inline: true } )
			field1 = ""
		}
		index += 1
		let member = info["employees"][id]
		field1 += "\n" + general.make_link("player_profile", id=id, format=member["name"] + "[" + id + "]")
		field1 += "\n" + member["days_in_company"] + ", " + member["position"]
		field1 += ShortenTextsFunctions.shortenText( "\n" + member["last_action"]["status"] + " " + member["status"]["description"] + ", " + member["last_action"]["relative"] )
	}

	fields.push( { name: 'Employees', value: field1, inline: true } )



	const embed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle(info["name"] + " [" + info["ID"] + "]")
		.setURL( general.make_link("company_profile", info["ID"]) )
		.setDescription( "Name [ID] Level\nDays in Company, Position\nStatus, Last Action" )
		.addFields(fields)
		.setTimestamp()
		.setFooter('Page 1/1', '');

	async function profile() {
		let profile = await responses.company_profile(interaction=interaction, id=0, info = info)
		await interaction.editReply( profile )
	}

	let profile_button = await components.button(interaction = interaction, button_id = "profile", button_label = "Profile", button_style="PRIMARY", func = profile)

	const row = new MessageActionRow()
			.addComponents(profile_button)

	let the_reply = await embeds.check_reply({ embeds: [embed], components: [row] }, interaction)

	return the_reply
}

exports.company_employees = company_employees;

/*
{
	"company": {
		"ID": 70390,
		"company_type": 12,
		"rating": 10,
		"name": "Aisle 11",
		"director": 2095323,
		"employees_hired": 12,
		"employees_capacity": 12,
		"daily_income": 374059,
		"daily_customers": 7100,
		"weekly_income": 18478735,
		"weekly_customers": 311886,
		"days_old": 1500,
		"employees": {
			"2068649": {
				"name": "hamidreza",
				"position": "Cashier",
				"days_in_company": 161,
				"last_action": {
					"status": "Offline",
					"timestamp": 1634051633,
					"relative": "1 hour ago"
				},
				"status": {
					"description": "Okay",
					"details": "",
					"state": "Okay",
					"color": "green",
					"until": 0
				}
			},
			"2095323": {
				"name": "TyCoon",
				"position": "Director",
				"days_in_company": 403,
				"last_action": {
					"status": "Offline",
					"timestamp": 1634046388,
					"relative": "3 hours ago"
				},
				"status": {
					"description": "Okay",
					"details": "",
					"state": "Okay",
					"color": "green",
					"until": 0
				}
			},
			"2113306": {
				"name": "Jasoncrasher",
				"position": "Cashier",
				"days_in_company": 505,
				"last_action": {
					"status": "Offline",
					"timestamp": 1634056862,
					"relative": "13 minutes ago"
				},
				"status": {
					"description": "Okay",
					"details": "",
					"state": "Okay",
					"color": "green",
					"until": 0
				}
			},
			"2116701": {
				"name": "FinnaNut",
				"position": "Trainer",
				"days_in_company": 558,
				"last_action": {
					"status": "Offline",
					"timestamp": 1634055058,
					"relative": "43 minutes ago"
				},
				"status": {
					"description": "Okay",
					"details": "",
					"state": "Okay",
					"color": "green",
					"until": 0
				}
			},
			"2183745": {
				"name": "HighPerformance",
				"position": "Trainer",
				"days_in_company": 302,
				"last_action": {
					"status": "Idle",
					"timestamp": 1634043302,
					"relative": "3 hours ago"
				},
				"status": {
					"description": "Okay",
					"details": "",
					"state": "Okay",
					"color": "green",
					"until": 0
				}
			},
			"2226802": {
				"name": "JadedMarxist",
				"position": "Trainer",
				"days_in_company": 589,
				"last_action": {
					"status": "Offline",
					"timestamp": 1634039747,
					"relative": "4 hours ago"
				},
				"status": {
					"description": "Okay",
					"details": "",
					"state": "Okay",
					"color": "green",
					"until": 0
				}
			},
			"2228096": {
				"name": "Grimulkin",
				"position": "Trainer",
				"days_in_company": 585,
				"last_action": {
					"status": "Offline",
					"timestamp": 1634056949,
					"relative": "11 minutes ago"
				},
				"status": {
					"description": "Okay",
					"details": "",
					"state": "Okay",
					"color": "green",
					"until": 0
				}
			},
			"2237109": {
				"name": "pktom1",
				"position": "Trainer",
				"days_in_company": 444,
				"last_action": {
					"status": "Offline",
					"timestamp": 1633943683,
					"relative": "1 day ago"
				},
				"status": {
					"description": "Okay",
					"details": "",
					"state": "Okay",
					"color": "green",
					"until": 0
				}
			},
			"2242714": {
				"name": "MrMachine",
				"position": "Trainer",
				"days_in_company": 245,
				"last_action": {
					"status": "Offline",
					"timestamp": 1634043514,
					"relative": "3 hours ago"
				},
				"status": {
					"description": "Okay",
					"details": "",
					"state": "Okay",
					"color": "green",
					"until": 0
				}
			},
			"2305041": {
				"name": "Gourry",
				"position": "Trainer",
				"days_in_company": 590,
				"last_action": {
					"status": "Offline",
					"timestamp": 1634034931,
					"relative": "6 hours ago"
				},
				"status": {
					"description": "Okay",
					"details": "",
					"state": "Okay",
					"color": "green",
					"until": 0
				}
			},
			"2357707": {
				"name": "AshlynIly",
				"position": "Trainer",
				"days_in_company": 97,
				"last_action": {
					"status": "Offline",
					"timestamp": 1634047748,
					"relative": "2 hours ago"
				},
				"status": {
					"description": "Okay",
					"details": "",
					"state": "Okay",
					"color": "green",
					"until": 0
				}
			},
			"2563432": {
				"name": "monogamy",
				"position": "Trainer",
				"days_in_company": 29,
				"last_action": {
					"status": "Idle",
					"timestamp": 1634056489,
					"relative": "19 minutes ago"
				},
				"status": {
					"description": "Okay",
					"details": "",
					"state": "Okay",
					"color": "green",
					"until": 0
				}
			},
			"2572033": {
				"name": "SomeoneSK",
				"position": "Trainer",
				"days_in_company": 39,
				"last_action": {
					"status": "Idle",
					"timestamp": 1634057485,
					"relative": "2 minutes ago"
				},
				"status": {
					"description": "Okay",
					"details": "",
					"state": "Okay",
					"color": "green",
					"until": 0
				}
			}
		}
	}
}
*/