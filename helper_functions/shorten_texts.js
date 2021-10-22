const {General_functions} = require("../helper_functions/general.js")

function shortenText(desc) {
	desc = desc.replace(" hours ", " hrs ")
	desc = desc.replace(" minutes ", " mins ")
	desc = desc.replace(" seconds ", " secs ")
	desc = desc.replace(" days ", " d ")
	desc = desc.replace(" weeks ", " w ")
	desc = desc.replace(" years ", " y ")
	desc = desc.replace("Traveling to ", General_functions.get_emoji("traveling") + " to ")
	desc = desc.replace("Returning to Torn from ", General_functions.get_emoji("traveling") + " from ")
	desc = desc.replace("Mexico", "Mex")
	desc = desc.replace("Cayman Islands", "Cay")
	desc = desc.replace("Canada", "Can")
	desc = desc.replace("Hawaii", "Haw")
	desc = desc.replace("United Kingdom", "UK")
	desc = desc.replace("Argentina", "Arg")
	desc = desc.replace("Switzerland", "Swi")
	desc = desc.replace("Japan", "Jap")
	desc = desc.replace("China", "Chi")
	desc = desc.replace("UAE", "UAE")
	desc = desc.replace("South Africa", "SA")

	desc = desc.replace("Online", General_functions.get_emoji("online"))
	desc = desc.replace("Offline", General_functions.get_emoji("offline"))
	desc = desc.replace("Idle", General_functions.get_emoji("idle"))

	desc = desc.replace("Okay", "OK")
	desc = desc.replace("In hospital for ", General_functions.get_emoji("in_hospital") + " - ")
	desc = desc.replace("In jail for ", General_functions.get_emoji("in_jail") + " - ")
	return desc
}

const Shorten_texts_functions = {
	shortenText: shortenText,
}

exports.Shorten_texts_functions = Shorten_texts_functions;