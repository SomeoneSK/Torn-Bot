import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } from 'discord.js';
import {Database} from "../database.js"
import {General_functions} from "../helper_functions/general.js"
import {Id_api_functions} from "../helper_functions/id_api.js"

import {Company_functions} from "../helper_functions/company.js"
import {Components_functions} from '../helper_functions/components.js'
import {company_employees as company_employees_constructor} from './company_employees.js'
import {error as error_constructor} from './error.js'
import {Torn_data} from '../torn/index.js'

async function company_profile(interaction, id, info = false) {
	if ( info === false ) {
		let data = Database.getData()
		let url = ""
		if ( id === null ) {
      let get_user_result = await General_functions.get_user(interaction.user.id.toString())
			if ( get_user_result["torn_api_key"] === "" ) {
				return await error_constructor( "Set your api with /setapi or use ID in this command!" )
			}
			url = General_functions.make_url( "company", "", [""] )
		} else {
			url = General_functions.make_url( "company", id, [""] )
		}

		info = await Id_api_functions.get_data_from_api( url, interaction.user.id, false )
	}


	if ( info["error"] !== undefined ) {
		return await error_constructor(info["error"])
	}

	let fields = []

	if (Object.keys(info).includes("company")) {
		info = info["company"]
	}

	let employees_info = await Company_functions.employees_info(info)
	let field1 = '**' + info["rating"] + "⭐ " + Torn_data.companies[info["company_type"]]["name"] + '**'
	field1 += '\n**Director: **' +employees_info["director_name"] + " [" + info["director"] + "]"
	field1 += '\n**Age: **' + General_functions.format_number(info["days_old"]) + " days"
	field1 += '\n**Employees: **' + info["employees_hired"] + "/" + info["employees_capacity"]
	field1 += '\n**Daily, Weekly Income: **' + General_functions.format_number(info["daily_income"]) + ", " + General_functions.format_number(info["weekly_income"])
	field1 += '\n**Daily, Weekly Customers: **' + General_functions.format_number(info["daily_customers"]) + ", " + General_functions.format_number(info["weekly_customers"])
	fields.push( { name: 'Info', value: field1, inline: true } )

	const embed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle(info["name"] + " [" + info["ID"] + "]")
		.setURL( General_functions.make_link("company_profile", info["ID"]) )
		.addFields(fields)
		.setTimestamp()
		.setFooter('Page 1/1', '');

	async function employees() {
		let members = await company_employees_constructor(interaction, info)
		await interaction.editReply( members )
	}

	let members_button = await Components_functions.button( interaction, "members", "Members", "PRIMARY", employees)

	const row = new MessageActionRow()
			.addComponents(members_button)

	return { embeds: [embed], components: [row] }
}

export { company_profile }

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