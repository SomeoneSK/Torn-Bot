const {Database} = require("../database.js")
const {General_functions} = require("../helper_functions/general.js")

const {Alerts_checks} = require('../alerts/checks')
const { status_channel } = require('../config.json');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		await Database.makeData()

		let guild = client.guilds.cache.get('892037665719984128')
		let names = ["offline", "online", "idle", "in_hospital", "traveling", "in_jail"]
		let emojis = {}
		for (let i of names) {
			emojis[i] = guild.emojis.cache.find(emoji => emoji.name === i).toString();
		}
		await General_functions.set_emojis(emojis)

		General_functions.makeClient(client)
		
		
		await Alerts_checks.start_checks()

		let chan = await General_functions.get_channel(status_channel)
		async function send_msg() {
			let now = new Date()
			chan.send( now.toString() )
		}
		if (chan !== undefined) {
			setInterval(send_msg, 1000*60*15)
		}

		client.user.setPresence({ activities: [{ name: 'https://discord.gg/3RmCckhXWg' }], status: 'online' });

		let stocks = {"1":{"stock_id":1,"name":"Torn & Shanghai Banking","acronym":"TSB","current_price":882.87,"market_cap":10443523274004,"total_shares":11829061214,"benefit":{"type":"active","frequency":31,"requirement":3000000,"description":"$50,000,000"}},"2":{"stock_id":2,"name":"Torn City Investments","acronym":"TCB","current_price":975.43,"market_cap":10503504854542,"total_shares":10768076494,"benefit":{"type":"passive","frequency":7,"requirement":1500000,"description":"a 10% Bank Interest Bonus"}},"3":{"stock_id":3,"name":"Syscore MFG","acronym":"SYS","current_price":473.34,"market_cap":2951141837499,"total_shares":6234718886,"benefit":{"type":"passive","frequency":7,"requirement":3000000,"description":"an Advanced Firewall"}},"4":{"stock_id":4,"name":"Legal Authorities Group","acronym":"LAG","current_price":300.39,"market_cap":1872478124783,"total_shares":6233490212,"benefit":{"type":"active","frequency":7,"requirement":750000,"description":"1x Lawyer Business Card"}},"5":{"stock_id":5,"name":"Insured On Us","acronym":"IOU","current_price":133.53,"market_cap":28568424342469,"total_shares":213947609844,"benefit":{"type":"active","frequency":31,"requirement":3000000,"description":"$12,000,000"}},"6":{"stock_id":6,"name":"Grain","acronym":"GRN","current_price":256.75,"market_cap":2197835546836,"total_shares":8560216346,"benefit":{"type":"active","frequency":31,"requirement":500000,"description":"$4,000,000"}},"7":{"stock_id":7,"name":"Torn City Health Service","acronym":"THS","current_price":336.21,"market_cap":2166339519270,"total_shares":6443411913,"benefit":{"type":"active","frequency":7,"requirement":150000,"description":"1x Box of Medical Supplies"}},"8":{"stock_id":8,"name":"Yazoo","acronym":"YAZ","current_price":40.32,"market_cap":1793307241031,"total_shares":44476866097,"benefit":{"type":"passive","frequency":7,"requirement":1000000,"description":"Free Banner Advertising"}},"9":{"stock_id":9,"name":"The Torn City Times","acronym":"TCT","current_price":269.44,"market_cap":759686916072,"total_shares":2819503103,"benefit":{"type":"active","frequency":31,"requirement":100000,"description":"$1,000,000"}},"10":{"stock_id":10,"name":"Crude & Co","acronym":"CNC","current_price":678.45,"market_cap":4454624332919,"total_shares":6565884491,"benefit":{"type":"active","frequency":31,"requirement":7500000,"description":"$80,000,000"}},"11":{"stock_id":11,"name":"Messaging Inc.","acronym":"MSG","current_price":204.71,"market_cap":960222192814,"total_shares":4690646245,"benefit":{"type":"passive","frequency":7,"requirement":300000,"description":"Free Classified Advertising"}},"12":{"stock_id":12,"name":"TC Music Industries","acronym":"TMI","current_price":174.99,"market_cap":6141268353026,"total_shares":35094967444,"benefit":{"type":"active","frequency":31,"requirement":6000000,"description":"$25,000,000"}},"13":{"stock_id":13,"name":"TC Media Productions","acronym":"TCP","current_price":370.96,"market_cap":1883332274144,"total_shares":5076914692,"benefit":{"type":"passive","frequency":7,"requirement":1000000,"description":"a Company Sales Boost"}},"14":{"stock_id":14,"name":"I Industries Ltd.","acronym":"IIL","current_price":99.81,"market_cap":1043330718242,"total_shares":10453168202,"benefit":{"type":"passive","frequency":7,"requirement":1000000,"description":"50% Coding Time Reduction"}},"15":{"stock_id":15,"name":"Feathery Hotels Group","acronym":"FHG","current_price":646.36,"market_cap":24715053842044,"total_shares":38237288573,"benefit":{"type":"active","frequency":7,"requirement":2000000,"description":"1x Feathery Hotel Coupon"}},"16":{"stock_id":16,"name":"Symbiotic Ltd.","acronym":"SYM","current_price":708.17,"market_cap":24869015143613,"total_shares":35117295485,"benefit":{"type":"active","frequency":7,"requirement":500000,"description":"1x Drug Pack"}},"17":{"stock_id":17,"name":"Lucky Shots Casino","acronym":"LSC","current_price":385.1,"market_cap":2782625763633,"total_shares":7225722575,"benefit":{"type":"active","frequency":7,"requirement":500000,"description":"1x Lottery Voucher"}},"18":{"stock_id":18,"name":"Performance Ribaldry","acronym":"PRN","current_price":510.86,"market_cap":8617706687716,"total_shares":16869018298,"benefit":{"type":"active","frequency":7,"requirement":1000000,"description":"1x Erotic DVD"}},"19":{"stock_id":19,"name":"Eaglewood Mercenary","acronym":"EWM","current_price":240.37,"market_cap":2213651104474,"total_shares":9209348523,"benefit":{"type":"active","frequency":7,"requirement":1000000,"description":"1x Box of Grenades"}},"20":{"stock_id":20,"name":"Torn City Motors","acronym":"TCM","current_price":309.92,"market_cap":2600748648651,"total_shares":8391677364,"benefit":{"type":"passive","frequency":7,"requirement":1000000,"description":"10% Racing Skill Boost"}},"21":{"stock_id":21,"name":"Empty Lunchbox Traders","acronym":"ELT","current_price":203.33,"market_cap":1110733840950,"total_shares":5462715000,"benefit":{"type":"passive","frequency":7,"requirement":5000000,"description":"10% Home Upgrade Discount"}},"22":{"stock_id":22,"name":"Home Retail Group","acronym":"HRG","current_price":222.79,"market_cap":7424454907668,"total_shares":33324901960,"benefit":{"type":"active","frequency":31,"requirement":10000000,"description":"1x Random Property"}},"23":{"stock_id":23,"name":"Tell Group Plc.","acronym":"TGP","current_price":89.16,"market_cap":1577898665605,"total_shares":17697382970,"benefit":{"type":"passive","frequency":7,"requirement":2500000,"description":"a Company Advertising Boost"}},"24":{"stock_id":24,"name":"Munster Beverage Corp.","acronym":"MUN","current_price":452.35,"market_cap":3456734617229,"total_shares":7641725693,"benefit":{"type":"active","frequency":7,"requirement":5000000,"description":"1x Six Pack of Energy Drink"}},"25":{"stock_id":25,"name":"West Side University","acronym":"WSU","current_price":80.08,"market_cap":1909276778209,"total_shares":23842117610,"benefit":{"type":"passive","frequency":7,"requirement":1000000,"description":"a 10% Education Course Time Reduction"}},"26":{"stock_id":26,"name":"International School TC","acronym":"IST","current_price":358.53,"market_cap":275418397748,"total_shares":768187872,"benefit":{"type":"passive","frequency":7,"requirement":100000,"description":"Free Education Courses"}},"27":{"stock_id":27,"name":"Big Al's Gun Shop","acronym":"BAG","current_price":375.64,"market_cap":3506540111612,"total_shares":9334842167,"benefit":{"type":"active","frequency":7,"requirement":3000000,"description":"1x Ammunition Pack"}},"28":{"stock_id":28,"name":"Evil Ducks Candy Corp","acronym":"EVL","current_price":428.67,"market_cap":2201156197511,"total_shares":5134850112,"benefit":{"type":"active","frequency":7,"requirement":100000,"description":"1000 Happiness"}},"29":{"stock_id":29,"name":"Mc Smoogle Corp","acronym":"MCS","current_price":613.41,"market_cap":11482269431224,"total_shares":18718751620,"benefit":{"type":"active","frequency":7,"requirement":350000,"description":"100 Energy"}},"30":{"stock_id":30,"name":"Wind Lines Travel","acronym":"WLT","current_price":556.08,"market_cap":7003525224271,"total_shares":12594456237,"benefit":{"type":"passive","frequency":7,"requirement":9000000,"description":"Private Jet Access"}},"31":{"stock_id":31,"name":"Torn City Clothing","acronym":"TCC","current_price":382.08,"market_cap":2189738170664,"total_shares":5731098646,"benefit":{"type":"active","frequency":31,"requirement":7500000,"description":"1x Clothing Cache"}},"32":{"stock_id":32,"name":"Alcoholics Synonymous","acronym":"ASS","current_price":307.64,"market_cap":966360897176,"total_shares":3141206921,"benefit":{"type":"active","frequency":7,"requirement":1000000,"description":"1x Six Pack of Alcohol"}}}
		
		data = Database.getData()
		let operations = []
		let now = + new Date()
		for (let key of Object.keys(stocks)) {
			let filter = {"name": stocks[key]["name"] }
			let update = {"$set": { "history": {
				"current_price": [ {"timestamp":now, "value":stocks[key]["current_price"]} ],
				"market_cap": [ {"timestamp":now, "value":stocks[key]["market_cap"]} ],
				"total_shares": [ {"timestamp":now, "value":stocks[key]["total_shares"]} ],
			} } }
			operations.push( {"updateOne": { filter: filter, update: update } } )
		}
		//a = await Database.setData( data, {"stocks": operations } )
		
	},
};

