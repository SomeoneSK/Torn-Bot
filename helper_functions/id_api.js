import {Database} from "../database.js"
import {Discord_functions} from '../helper_functions/discord.js'
import {General_functions} from '../helper_functions/general.js'

async function get_shared_api_key() {
	let data = Database.getData()

	if (data["general"]["shared_apis"]["apis"].length === 0) {
		return ""
	}
	data["general"]["shared_apis"]["index"] += 1
	if ( data["general"]["shared_apis"]["index"] > data["general"]["shared_apis"]["apis"].length -1 ) {
		data["general"]["shared_apis"]["index"] = 0
	}
	await Database.setData(data, false)
	let discord_id = data["general"]["shared_apis"]["apis"][ data["general"]["shared_apis"]["index"] ]["discord_id"]
	return data["players"][ discord_id.toString() ]["torn_api_key"]
}

async function get_users_key(user_id) {
	const doc = await General_functions.get_user( user_id )
	return doc["torn_api_key"]
}

async function get_data_from_api_shared(url) {
	let data = Database.getData()
	let key = await get_shared_api_key()
	let start_index = data["general"]["shared_apis"]["index"]
	let index_used = data["general"]["shared_apis"]["index"]
	while (true) {
		let result = await General_functions.http_request(url + key)
		if ( result["error"] !== undefined ) {
			if ( ![2, 5, 10, 11, 12, 13, 14].includes(result["error"]["code"]) ) {
				return result
			}

			data = Database.getData()
			key = await get_shared_api_key()
			if (key === "") {
				return {"error":"No shared API keys!"}
			}
			let index = data["general"]["shared_apis"]["index"]
			if ( [2, 10].includes(result["error"]["code"]) ) {
				await share_users_key(data["general"]["shared_apis"]["apis"][index_used]["discord_id"], false)
			}
			if (index === start_index) {
				return {"error":"All shared APIs failed!"}
			}
			index_used = index
			continue
		}
		return result
	}
	return 0
}

async function get_data_from_api( url, user_id=false, private_data=false ) {
  if (user_id !== false) {
    const key = await get_users_key( user_id=user_id.toString() )
    if ( key !== "" ) {
      const res = await General_functions.http_request(url + key)
      return res
    }
  }
	if ( private_data === false ) {
		return await get_data_from_api_shared(url)
	}
	return { "error": "You did not set your api!"}
};

async function set_users_key(user_id, guild_id, key="") {

	let to_return = {"done":true}
	let info = {}
	if (key !== "") {
		let url = General_functions.make_url( "user", "", ["profile"] )
		info = await General_functions.http_request( url + key )
		if ( info["error"] !== undefined ) {
			let error = info["error"]["error"] || info["error"]
			to_return = {"error": "Set your API key but did not rename you - " + error }
		} else {
			const torn_id = info["player_id"]
			let result = await Discord_functions.rename_user( user_id, guild_id, info["name"] + " [" + info["player_id"] + "]" )
			if ( result["error"] !== undefined ) {
				to_return = {"error": "Set your API key, but could not rename you."}
			}
		}
	}

	let data = Database.getData()
	let user = await General_functions.get_user(user_id)

	user["torn_api_key"] = key
	if (info["player_id"] !== undefined) {
		user["torn_id"] = info["player_id"]
		user["torn_name"] = info["name"]
	}
	if ( key === "") {
		user["share_api_key"] = false
	}

	let filter = {"discord_id": user_id.toString() }
	let replacement = Database.user_to_db(user)
	let operation1 = {"replaceOne": { filter: filter, replacement: replacement } }

	data["players"][user_id] = user
	const a = await Database.setData( data, {"players": [ operation1 ] } )

	return to_return
}

async function set_users_id(user_id, guild_id, id="") {
	let data = Database.getData()
	let to_return = {"done":true}
	let user = await General_functions.get_user(user_id)

	if ( user["torn_api_key"] !== "" ) {
		return {"error": "Can't set your ID when you have set API key!"}
	}

	let info = {}
	if (id !== "") {
		let url = General_functions.make_url( "user", id, ["profile"] )
		info = await get_data_from_api( url, user_id, false )
		if ( info["error"] !== undefined ) {
			let error = info["error"] 
			if (error["error"] !== undefined) {
				error = info["error"]["error"]
			}
			to_return = {"error": "Set your ID but can't get your name - " + error.toString() }
		}
	}

	user["torn_id"] = id
	if (info["player_id"] !== undefined) {
		user["torn_id"] = info["player_id"]
		user["torn_name"] = info["name"]

		let result = await Discord_functions.rename_user( user_id, guild_id, info["name"] + " [" + info["player_id"] + "]" )
		if ( result["error"] !== undefined ) {
			to_return = {"error": "Set your ID, but could not rename you."}
		}
	}

	let filter = {"discord_id": user_id.toString() }
	let replacement = Database.user_to_db(user)
	let operation1 = {"replaceOne": { filter: filter, replacement: replacement } }

	data["players"][user_id] = user
	const a = await Database.setData( data, {"players": [ operation1 ] })

	return to_return
}

async function share_users_key(user_id, share=false) {
	let data = Database.getData()
	let this_player = General_functions.get_user(user_id)

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

let Id_api_functions = {
	set_users_key: set_users_key,
	share_users_key: share_users_key,
	set_users_id: set_users_id,
	get_shared_api_key: get_shared_api_key,
	get_users_key: get_users_key,
	get_data_from_api_shared: get_data_from_api_shared,
	get_data_from_api: get_data_from_api
}

export { Id_api_functions }