const general = require('../../general.js')
const torn = require('../../torn')
const alerts_general = require('../general.js')

async function stock_reach(stock, higher_or_lower, property, value, owner, to_ping, channel, code="") {
	if ( code === "" ) {
		code = await alerts_general.new_code()
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
	let obj_db = general.copy(obj)

	obj.check = async function(stocks) {
		if (!Object.keys(stocks).includes("stocks") ) {
			return {done:false}
		}
		let id = torn.stocks[ this.alert.stock ]["id"]
		
		let difference = stocks["stocks"][id][this.alert.property] - this.alert.value
		if ( this.alert.higher_or_lower === "lower"  ) {
			difference *= -1
		}
		if ( difference >= 0  ) {

			let client = general.getCient()

			let chan = await general.get_channel(this.channel)

			let mention = undefined
			if ( this.to_ping.type === "user" ) {
				mention = await general.mention_user( this.to_ping.id )
			}

			if ( chan !== undefined && mention !== undefined ) {
				chan.send(mention + ", **" + this.alert.stock + "**'s **" +  this.alert.property.replace("_", " ") + "** is now " + this.alert.higher_or_lower + " than " + this.alert.value + " - it's **" + stocks["stocks"][id][this.alert.property] + "** !")
			}
			alerts_general.delete_alert(this.code)
			return {done:true}
		}
		return {done:false}
	}
	return {"alert":obj, "alert_for_db": obj_db}
}

exports.stock_reach = stock_reach;
