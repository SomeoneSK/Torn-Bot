const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const {General_functions} = require("../helper_functions/general.js")
const {Components_functions} = require('../helper_functions/components.js')
const {Message_constructors} = require('../message_constructors')
const {Torn_data} = require('../torn')
const {Embed_functions} = require('../helper_functions/embeds.js')

async function foreign_stocks(interaction, country_name = null, info=false) {
	if (info === false) {
		info = await General_functions.http_request( 'https://yata.yt/api/v1/travel/export/')
	}

	if ( info["error"] !== undefined ) {
		return await Message_constructors.error(info["error"])
	}

	let fields = []

	if (Object.keys(info).includes("stocks")) {
		info = info["stocks"]
	}

	if (country_name === null) {country_name = "Mexico"}

	let country_code = Torn_data.country_codes[country_name]
	let field1 = ''
	let third = Math.floor( info[country_code]["stocks"].length / 3 )
	let index = 0
	for (let item of info[country_code]["stocks"] ) {
		if (index % third === 0 && index !== 0) {
			fields.push( { name: country_name + " - Foreign Stocks", value: field1, inline: true } )
			field1 = ""
		}
		index += 1
		field1 += "**" + General_functions.format_number(item["quantity"]) + "x " + item["name"] + "**" + "\n$" + General_functions.format_number(item["cost"]) + "\n"
	}
	fields.push( { name: country_name + " - Foreign Stocks", value: field1, inline: true } )

	const embed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle( country_name + " - Foreign Stocks" )
		.setDescription( "Updated: " +  '<t:' + info[country_code]["update"] + ':R>' )
		.addFields(fields)
		.setTimestamp()
		.setFooter('Page 1/1', '')

	let options = [
		{"label":"Mexico"},
		{"label":"Cayman Islands"},
		{"label":"Canada"},
		{"label":"Hawaii"},
		{"label":"United Kingdom"},
		{"label":"Argentina"},
		{"label":"Switzerland"},
		{"label":"Japan"},
		{"label":"China"},
		{"label":"UAE"},
		{"label":"South Africa"},
	]
	async function select_country(country) {
		let new_country = await foreign_stocks(interaction, country_name = country[0], info=info)
		await interaction.editReply(new_country)
	}

	let select = await Components_functions.select_menu(interaction, custom_id="country", placeholder="Change Country", options = options, select_country, min=1, max=1)

	const row = new MessageActionRow()
			.addComponents(select)

	let to_reply = await Embed_functions.check_reply({ embeds: [embed], components: [row] }, interaction)

	return to_reply
}


exports.foreign_stocks = foreign_stocks;

/*
{
   "stocks":{
      "mex":{
         "update":1634134230,
         "stocks":[
            {
               "id":229,
               "name":"Claymore Mine",
               "quantity":0,
               "cost":15000
            },
            {
               "id":258,
               "name":"Jaguar Plushie",
               "quantity":0,
               "cost":10000
            },
            {
               "id":426,
               "name":"Bottle of Tequila",
               "quantity":700,
               "cost":85
            },
            {
               "id":399,
               "name":"ArmaLite M-15A4",
               "quantity":50,
               "cost":20000000
            },
            {
               "id":108,
               "name":"9mm Uzi",
               "quantity":45,
               "cost":1100000
            },
            {
               "id":11,
               "name":"Samurai Sword",
               "quantity":0,
               "cost":75000
            },
            {
               "id":26,
               "name":"AK-47",
               "quantity":134,
               "cost":15000
            },
            {
               "id":259,
               "name":"Mayan Statue",
               "quantity":0,
               "cost":500
            },
            {
               "id":232,
               "name":"SIG 550",
               "quantity":0,
               "cost":65000
            },
            {
               "id":409,
               "name":"Yucca Plant",
               "quantity":97,
               "cost":20000
            },
            {
               "id":21,
               "name":"Dual 92G Berettas",
               "quantity":0,
               "cost":500000
            },
            {
               "id":63,
               "name":"Minigun",
               "quantity":95,
               "cost":3000000
            },
            {
               "id":107,
               "name":"Trench Coat",
               "quantity":72,
               "cost":500000
            },
            {
               "id":175,
               "name":"Taser",
               "quantity":36,
               "cost":5500
            },
            {
               "id":31,
               "name":"M249 PARA LMG",
               "quantity":75,
               "cost":950000
            },
            {
               "id":327,
               "name":"Blank Tokens",
               "quantity":15,
               "cost":100000
            },
            {
               "id":50,
               "name":"Outer Tactical Vest",
               "quantity":0,
               "cost":1000000
            },
            {
               "id":231,
               "name":"Heckler & Koch SL8",
               "quantity":18,
               "cost":45000
            },
            {
               "id":111,
               "name":"Ninja Claws",
               "quantity":0,
               "cost":8000
            },
            {
               "id":640,
               "name":"Kevlar Gloves",
               "quantity":237,
               "cost":400000
            },
            {
               "id":99,
               "name":"Springfield 1911",
               "quantity":47,
               "cost":430
            },
            {
               "id":230,
               "name":"Flare Gun",
               "quantity":0,
               "cost":300
            },
            {
               "id":260,
               "name":"Dahlia",
               "quantity":0,
               "cost":300
            },
            {
               "id":159,
               "name":"Bolt Cutters",
               "quantity":778,
               "cost":25
            },
            {
               "id":432,
               "name":"Crazy Straw",
               "quantity":394,
               "cost":25
            },
            {
               "id":177,
               "name":"Cobra Derringer",
               "quantity":21,
               "cost":70000
            },
            {
               "id":20,
               "name":"Desert Eagle",
               "quantity":0,
               "cost":45000
            },
            {
               "id":110,
               "name":"Leather Bullwhip",
               "quantity":308,
               "cost":1500
            },
            {
               "id":178,
               "name":"Flak Jacket",
               "quantity":47,
               "cost":7500
            },
            {
               "id":8,
               "name":"Axe",
               "quantity":0,
               "cost":4200
            }
         ]
      },
      "cay":{
         "update":1634134205,
         "stocks":[
            {
               "id":625,
               "name":"Wetsuit",
               "quantity":0,
               "cost":30000
            },
            {
               "id":623,
               "name":"Speedo",
               "quantity":47,
               "cost":6000
            },
            {
               "id":617,
               "name":"Banana Orchid",
               "quantity":5232,
               "cost":4000
            },
            {
               "id":626,
               "name":"Diving Gloves",
               "quantity":45,
               "cost":5000
            },
            {
               "id":613,
               "name":"Harpoon",
               "quantity":0,
               "cost":300000
            },
            {
               "id":615,
               "name":"Naval Cutlass",
               "quantity":1,
               "cost":50000000
            },
            {
               "id":622,
               "name":"Flippers",
               "quantity":20,
               "cost":10000
            },
            {
               "id":620,
               "name":"Nodding Turtle",
               "quantity":53,
               "cost":750
            },
            {
               "id":624,
               "name":"Bikini",
               "quantity":0,
               "cost":8000
            },
            {
               "id":616,
               "name":"Trout",
               "quantity":113,
               "cost":10000
            },
            {
               "id":618,
               "name":"Stingray Plushie",
               "quantity":859,
               "cost":400
            },
            {
               "id":614,
               "name":"Diamond Bladed Knife",
               "quantity":94,
               "cost":950000
            },
            {
               "id":619,
               "name":"Steel Drum",
               "quantity":0,
               "cost":1500
            },
            {
               "id":621,
               "name":"Snorkel",
               "quantity":38,
               "cost":20000
            },
            {
               "id":612,
               "name":"Tavor TAR-21",
               "quantity":152,
               "cost":495000
            }
         ]
	   }
   },
   "timestamp":1634134235
}
*/