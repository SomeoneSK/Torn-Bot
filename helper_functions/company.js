
/*async function get_users_company(interaction_from) {
	let id = data["players"][ interaction_from.id.toString() ]["torn_id"]

	let url = general.make_url( "company", id=company_id, selections=["profile"] )
	info = await general.get_data_from_api( url, user_id=interaction_from.id, private=false )
}
*/
async function employees_info(company) {
	let count = 0
	let director = ""
	for (let i of Object.keys(company["employees"])) {
		count += 1
		if (parseInt(i) === company["director"]) {
			director = company["employees"][i]["name"]
		}
	}
	return {"employees_count":count, "director_name":director}
}

const Company_functions = {
	employees_info: employees_info,
}

exports.Company_functions = Company_functions;