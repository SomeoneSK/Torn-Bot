var data = {
	"players":{},
	"general":{
		"shared_apis": {
			"apis": [],
			"index": -1
		}
	},
	"alerts": [

	]
}

const { MongoClient } = require('mongodb');
const uri = process.env['db_string']
let client = false
if (uri !== undefined ) {
	client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}

async function makeData(){
	if (client === false ) {return}
	await client.connect();
	
	const players = client.db("database0").collection("players");
	let result = await players.find( {} )
	await result.forEach( function(i) {
		data["players"][ i["discord_id"].toString() ] =  i
		if ( i["share_api_key"] === true ) {
			data["general"]["shared_apis"]["apis"].push( {"discord_id":i["discord_id"] } )
		}
	} )

	const alerts = client.db("database0").collection("alerts");
	result = await alerts.find( {} )
	await result.forEach( async function(i) {
		let alert = await db_alert_to_alert.db_alert_to_alert( i )
		data["alerts"].push( alert )
	} )
	//console.log(data)
	client.close();
}

function getData() {
  return data;
};

async function setData(new_data, update) {
	data = new_data;
	if (client === false) {return "done"}
	await client.connect();
	for (let col_name of Object.keys(update)) {
		const col = client.db("database0").collection(col_name);
		await col.bulkWrite( update[col_name] )
	}
	await client.close();
	return "done"
};

function user_to_db(user) {
	return user
}

const Database = {
	getData: getData,
	setData: setData,
	makeData: makeData,
	user_to_db: user_to_db
}

exports.Database = Database;

const db_alert_to_alert = require('./alerts/db_alert_to_alert.js')