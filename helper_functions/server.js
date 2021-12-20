import { Database } from ".././database.js"
import {General_functions} from "./general.js"

async function is_allowed(member) {
	return member.permissions.has("ADMINISTRATOR")
}

async function edit_tag(server, tag_name, content) {
	let server_id = server.id.toString()

	let data = Database.getData()
	let operation1
	let return_message

	if (content !== undefined) {
		operation1 = {"updateOne": {filter: { "server_id":server_id }, update:{"$set": {} } } }
		operation1["updateOne"]["update"]["$set"]["tags."+tag_name] = content
		return_message = "Added/changed tag " + tag_name
		data["servers"][server_id]["tags"][tag_name] = content
	} else {
		operation1 = {"updateOne": {filter: { "server_id":server_id }, update:{"$unset": {} } } }
		operation1["updateOne"]["update"]["$unset"]["tags."+tag_name] = 0
		return_message = "Removed tag " + tag_name
		delete data["servers"][server_id]["tags"][tag_name]
	}

	const a = await Database.setData( data, {"servers": [ operation1 ] } )
	return return_message
}

async function tag_list(server) {
	let server_from_db = await General_functions.get_server(server.id)
	let the_list = []
	for (const tag of Object.keys(server_from_db["tags"])) {
		the_list.push(tag)
	}
	return the_list
}

async function get_tag(server_object, tag_name) {
	let server = await General_functions.get_server(server_object.id)
	return server["tags"][tag_name]
}

const Server_functions = {
	is_allowed: is_allowed,
	edit_tag: edit_tag,
	tag_list: tag_list,
	get_tag: get_tag
}

export { Server_functions }