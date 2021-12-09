import { createRequire } from "module";
const require = createRequire(import.meta.url);

var data = {
  players: {},
  general: {
    shared_apis: {
      apis: [],
      index: -1
    }
  },
  alerts: [],
  alerts_raw: []
};

import { MongoClient } from "mongodb";

let config = false
try {
	config = require('./config.json')
} catch(error) {
	config = {
		"clientId": "895302817672204368",
		"guildId": "892037665719984128",
		"error_channel": "899743106482704434",
		"status_channel": "899732115384594442",
		"commands_channel": "899734106290671636",
		"token": process.env.token,
		"db_string": process.env.db_string
	}
}

const uri = config.db_string;
let client = false;
if (uri !== undefined) {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

async function makeData() {
  if (client === false) {
    return;
  }
  await client.connect();

  const players = client.db("database0").collection("players");
  let result = await players.find({});
  await result.forEach(function(i) {
    data["players"][i["discord_id"].toString()] = i;
    if (i["share_api_key"] === true) {
      data["general"]["shared_apis"]["apis"].push({
        discord_id: i["discord_id"]
      });
    }
  });

  const alerts = client.db("database0").collection("alerts");
  result = await alerts.find({});
  await result.forEach(async function(alert) {
    data["alerts_raw"].push(alert);
  });

  //console.log(data)
  client.close();
  return data;
}

function getData() {
  return data;
}

async function setData(new_data, update) {
  data = new_data;
  if (client === false) {
    return "done";
  }
  if (update !== false) {
    await client.connect();
    for (let col_name of Object.keys(update)) {
      const col = client.db("database0").collection(col_name);
      await col.bulkWrite(update[col_name]);
    }
    await client.close();
  }
  return "done";
}

function user_to_db(user) {
  return user;
}

const Database = {
  getData: getData,
  setData: setData,
  makeData: makeData,
  user_to_db: user_to_db
};

export { Database };