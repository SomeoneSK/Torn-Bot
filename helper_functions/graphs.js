import {General_functions} from "./general.js"
import {Graphs_builders} from './graph_builders.js'

async function stock(stock_acronym, property, interval){
  console.log(stock_acronym, property, interval)
  let data = await General_functions.http_request( 'https://tornsy.com/api/' +  stock_acronym + '?interval=' + interval)

	let formatted_data = {}
	let index = 0
	for (let one of data["data"]) {
    let values = {}
		values.current_price = one[1]
    values.total_shares = one[2]
    if (interval !== 'm1') {
      values.total_shares = one[5]
      values.high = one[2]
      values.low = one[3]
      values. close = one[4]
    }
    values.market_cap = values.current_price * values.total_shares
		formatted_data[ one[0]*1000 ] = values[property]
	}
  const property_capitalized = property.charAt(0).toUpperCase() + property.slice(1);
  const title = property_capitalized.replace("_", " ") + " of " + stock_acronym.toUpperCase() + " with interval " + interval
	let graph = await Graphs_builders.timeline_graph(formatted_data, title, "", property.replace("_", " "))
  return graph
  }

const Graphs_functions = {
  stock: stock
};

export { Graphs_functions };
