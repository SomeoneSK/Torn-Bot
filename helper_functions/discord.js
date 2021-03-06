import { General_functions } from "../helper_functions/general.js"

async function rename_user(user_id, guild_id, name) {
	let client = General_functions.getClient()
	let guild = client.guilds.cache.get(guild_id)
	if (guild === undefined) {
		return { "error": "Could not find guild" }
	}
	let member = await guild.members.fetch(user_id)
	if (member === undefined) {
		return { "error": "Could not find member" }
	}
	try {
		let x = await member.setNickname(name)
		return { "done": true }
	} catch (error) {
		return { "error": error }
	}
}

const Discord_functions = {
	rename_user: rename_user,
}

export { Discord_functions }