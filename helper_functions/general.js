const axios = require('axios');
const fs=require('fs');

const {Database} = require(".././database.js")
const {Torn_data} = require('.././torn')


function template_user() {
	let user = {
		"torn_id": "",
		"torn_name": "",
		"discord_id": "",
		"torn_api_key": "",
		"share_api_key": false
	}
	return user
}

function get_user( user_id=false ) {
	data = Database.getData()
	if ( Object.keys( data["players"] ).includes( user_id.toString() )  ) {
		return data["players"][ user_id.toString() ]
	}
	return template_user()
}

function get_user_by_key(key, value) {
	data = Database.getData()
	for (let player of data["players"] ) {
		if (player[key].toString() === value.toString()) {
			return player
		}
	}
	return undefined
}

async function http_request(url) {
	try {
		const response = await axios.get(url);
		return response.data
	} catch (error) {
    	console.log(error.config);
		return {"error":"Error while making http request!"}
	}
}

function make_url( category, id="", selections=[], key="" ) {
	let selection = ""
	for (let sel of selections) {
		selection += "," + sel
	}
	selection = selection.slice(1)
	return "https://api.torn.com/" + category + "/" + id + "?selections=" + selection + "&key=" + key
}

function make_link(which, id="", format=false) {
	let link = ''
	if (which === "player_profile") {
		link = "https://www.torn.com/profiles.php?XID=" + id
	} else if (which === "faction_profile") {
		link = "https://www.torn.com/factions.php?step=profile&ID=" + id
	} else if (which === "company_profile") {
		link = "https://www.torn.com/companies.php?step=profile&ID=" + id
	} else if (which === "attack") {
		link = "https://www.torn.com/loader2.php?sid=getInAttack&user2ID=" + id
	} else if (which === "message") {
		link = "https://www.torn.com/messages.php#/p=compose&XID=" + id
	} else if (which === "send_money") {
		link = "https://www.torn.com/sendcash.php#/XID=" + id
	} else if (which === "trade") {
		link = "https://www.torn.com/trade.php#step=start&userID=" + id
	} else if (which === "place_bounty") {
		link =	"https://www.torn.com/bounties.php?p=add&XID=" + id
	} else if (which === "add_friend") {
		link = "https://www.torn.com/friendlist.php#/p=add&XID=" + id
	} else if (which === "add_enemy") {
		link = "https://www.torn.com/blacklist.php#/p=add&XID=" + id
	} else if (which === "personal_stats") {
		link = "https://www.torn.com/personalstats.php?ID=" + id
	} else if (which === "player_bazaar") {
		link = "https://www.torn.com/bazaar.php?userId=" + id
	} else if (which === "place_bounty") {
		link = "https://www.torn.com/bounties.php?p=add&XID=" + id
	} else if (which === "display_case") {
		link = "https://www.torn.com/displaycase.php#display/" + id
	} else if (which === "item_market") {
		link = "https://www.torn.com/imarket.php#/p=shop&step=shop&type=&searchname=" + id.replace(" ", "+")
	}

	if (format !== false) {
		return '[' + format + '](' + link + ')'
	}
	return link
}

function isInt(value) {
  return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}

function format_number(number) {
	if ( number === null ) { return 0 }
	if ( !isInt(number) ) { number = number.toString() }
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function make_random_str(length) {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

function copy(obj) {
    return JSON.parse(JSON.stringify(obj))
}

let emojis = {} 
async function set_emojis(new_emojis){
	emojis = new_emojis
}

function get_emoji(name){
	return emojis[name]
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function add_stock_options(option) {
	for (let acronym of Object.keys(Torn_data.stocks)) {
		option.addChoice(Torn_data.stocks[acronym].name + " - " + acronym, acronym)
	}
	return option
}

function delete_from_list_by_key(list, key, value) {
	let new_list = list.filter(x => {
		return x[key] != value;
	})
	return new_list
}

function delete_from_list(list, remove) {
	let new_list = list.filter(function(item) {
    	return item !== remove
})
	return new_list
}

let client = undefined
function getClient() {
  return client;
};
async function makeClient(new_client){
	client = new_client
}

async function mention_user(id) {
	let to_mention = await client.users.fetch( id )
	if ( to_mention === undefined) {
		return undefined
	}
	let mention = to_mention.toString()
	return mention
}

async function get_channel(id) {
	return await client.channels.cache.get(id)
}

function get_files_in_folder(dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            get_files_in_folder(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}

function am_i_original() {
	if (client.user.id === "892034594700951593" || client.user.id === 892034594700951593) {
		return true
	}
	return false
}

const General_functions = {
	getClient: getClient,
	makeClient: makeClient,
	mention_user: mention_user,
	get_channel: get_channel,
	get_user: get_user,
	http_request: http_request,
	make_url: make_url,
	make_link: make_link,
	format_number: format_number,
	make_random_str: make_random_str,
	copy: copy,
	set_emojis: set_emojis,
	get_emoji: get_emoji,
	sleep: sleep,
	add_stock_options: add_stock_options,
	delete_from_list_by_key: delete_from_list_by_key,
	delete_from_list: delete_from_list,
	get_files_in_folder: get_files_in_folder,
	am_i_original: am_i_original,
	get_user_by_key: get_user_by_key
}

exports.General_functions = General_functions;