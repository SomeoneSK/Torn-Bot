
async function get_users_faction(interaction_from) {
	let id = data["players"][ interaction_from.id.toString() ]["torn_id"]

	let url = general.make_url( "faction", id=faction_id, selections=["profile"] )
	info = await general.get_data_from_api( url, user_id=interaction_from.id, private=false )

}

async function members_info(faction) {
	let count = 0
	let leader = ""
	let coleader = ""
	for (let i of Object.keys(faction["members"])) {
		count += 1
		if (parseInt(i) === faction["leader"]) {
			leader = faction["members"][i]["name"]
		}
		if (parseInt(i) === faction["co-leader"]) {
			coleader = faction["members"][i]["name"]
		}
	}
	return {"members_count":count, "leader_name":leader, "coleader_name":coleader}
}

const Faction_functions = {
	members_info: members_info,
	get_users_faction: get_users_faction,
}

exports.Faction_functions = Faction_functions;