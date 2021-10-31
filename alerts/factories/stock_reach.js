const {General_functions} = require("../../helper_functions/general.js")
const {Torn_data} = require('../../torn')
const {Alerts_general} = require('../general.js')

async function stock_reach(stock, higher_or_lower, property, value, owner, to_ping, channel, code="") {
	if ( code === "" ) {
		code = await Alerts_general.new_code()
	}
    let obj = {
	   "code": code,
		"alert": {
			"type": "stocks.reach",
			"stock": stock,
			"higher_or_lower": higher_or_lower,
			"property": property,
			"value": value
		},
		"owner": owner,
		"to_ping": to_ping,
		"channel": channel
	}
	let obj_db = General_functions.copy(obj)

	obj.check = async function(stocks) {
		if (!Object.keys(stocks).includes("stocks") ) {
			return {done:false}
		}
		let index = Torn_data.stocks[ this.alert.stock ]["index"]
		
		let difference = stocks["stocks"][index][this.alert.property] - this.alert.value
		if ( this.alert.higher_or_lower === "lower"  ) {
			difference *= -1
		}
		if ( difference >= 0  ) {

			let client = General_functions.getClient()

			let chan = await General_functions.get_channel(this.channel)

			let mention = undefined
			if ( this.to_ping.type === "user" ) {
				mention = await General_functions.mention_user( this.to_ping.id )
			}

			if ( chan !== undefined && mention !== undefined ) {
				chan.send(mention + ", **" + this.alert.stock + "**'s **" +  this.alert.property.replace("_", " ") + "** is now " + this.alert.higher_or_lower + " than " + this.alert.value + " - it's **" + stocks["stocks"][index][this.alert.property] + "** !")
			}
			Alerts_general.delete_alert(this.code)
			return {done:true}
		}
		return {done:false}
	}

	obj.to_string = async function () {
		let chan = await General_functions.get_channel(this.channel) || "**deleted channel**"
		return this.alert.stock + "'s " + this.alert.property.replace("_"," ") + " will be " + this.alert.higher_or_lower + " than " + General_functions.format_number(this.alert.value) + " in " + chan.toString()
	}
	
	return {"alert":obj, "alert_for_db": obj_db}
}

exports.stock_reach = stock_reach;

