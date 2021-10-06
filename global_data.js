var data = {
	"players":{},
	"general":{
		"shared_apis": {
			"apis": [],
			"index": -1
		}
	}
}

const { MongoClient } = require('mongodb');
const db_string = process.env['db_string']
const uri = db_string
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function make_data(){
	await client.connect();
	const players = client.db("database0").collection("players");
	const result = await players.find( {} )

	await result.forEach( function(i) {
		data["players"][ i["discord_id"].toString() ] =  i 
		data["general"]["shared_apis"]["apis"].push( {"discord_id":i["discord_id"] } )
	} )

	console.log(data)
	client.close();
}

function getData() {
  return data;
};

async function setData(new_data, update) {
	data = new_data;
	await client.connect();
	for (let col_name of Object.keys(update)) {
		const col = client.db("database0").collection(col_name);
		await col.bulkWrite( update[col_name] )
	}
	client.close();
	return "done"
};

exports.getData = getData;
exports.setData = setData;
exports.make_data = make_data;

