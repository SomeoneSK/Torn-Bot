const general = require('../general.js')

function shortenText(desc) {
	desc = desc.replace(" hours ", " hrs ")
	desc = desc.replace(" minutes ", " mins ")
	desc = desc.replace(" seconds ", " secs ")
	desc = desc.replace(" days ", " d ")
	desc = desc.replace(" weeks ", " w ")
	desc = desc.replace(" years ", " y ")
	desc = desc.replace("Traveling to ", general.get_emoji("traveling") + " to ")
	desc = desc.replace("Returning to Torn from ", general.get_emoji("traveling") + " from ")
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

	desc = desc.replace("Online", general.get_emoji("online"))
	desc = desc.replace("Offline", general.get_emoji("offline"))
	desc = desc.replace("Idle", general.get_emoji("idle"))

	desc = desc.replace("Okay", "OK")
	desc = desc.replace("In hospital for ", general.get_emoji("in_hospital") + " - ")
	desc = desc.replace("In jail for ", general.get_emoji("in_jail") + " - ")
	return desc
}

const ShortenTextsFunctions = {
	shortenText: shortenText,
}

exports.ShortenTextsFunctions = ShortenTextsFunctions;