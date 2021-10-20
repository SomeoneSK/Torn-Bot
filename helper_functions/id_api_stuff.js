const {Database} = require("../database.js")

async function set_users_key(user_id, key="") {
	let filter = {"discord_id": user_id.toString() }
	let update = {"$set": {"torn_api_key":key } }
	if ( key === "") {
		update["$set"]["share_api_key"] = false
	}
	let operation1 = {"updateOne": { filter: filter, update: update } }

	data = Database.getData()
	data["players"][ user_id.toString() ]["torn_api_key"] = key
	a = await Database.setData( data, {"players": [ operation1 ] } )
}

async function share_users_key(user_id, share=false) {
	data = Database.getData()
	let this_player = data["players"][user_id.toString()]

	if (this_player["torn_api_key"] === "") {
		return "You have not set your API key or it was removed!"
	}
	if ( share === "!" ) {
		share = !this_player["share_api_key"]
	}

	let filter = {"discord_id": user_id }
	let update = {"$set": {"share_api_key":share } }
	let operation1 = {"updateOne": { filter: filter, update: update } }
	
	this_player["share_api_key"] = share

	let filter2 = {"general": true }
	let update2 = {}
	if ( share === true) {
		let the_info = {"discord_id": user_id.toString(), "torn_id": this_player["torn_id"] }

		update2 = {"$push": {"shared_apis" : the_info } }
		data["general"]["shared_apis"]["apis"].push( the_info )
	} else {
		update2 = {"$pull": {"shared_apis" : {"torn_id": this_player["torn_id"] } } }

		for( var i = 0; i < data["general"]["shared_apis"]["apis"].length; i++){ 
			if ( data["general"]["shared_apis"]["apis"][i]["torn_id"] === this_player["torn_id"]) { 
		
				data["general"]["shared_apis"]["apis"].splice(i, 1); 
			}
		}
	}

	let operation2 = {"updateOne": { filter: filter2, update: update2 } }

	data = await Database.setData( data, {"players": [ operation1 ], "general": [operation2] } )

	if ( share === true ) {
		return "Your API key is now shared (only for public info)!"
	}
	return "Your API key is now no longer shared!"
}

exports.set_users_key = set_users_key;
exports.share_users_key = share_users_key;