const {General_functions} = require("../helper_functions/general.js")
const {Components_functions} = require('../helper_functions/components.js')
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');

/*
Embed titles are limited to 256 characters
Embed descriptions are limited to 4096 characters
There can be up to 25 fields
A field's name is limited to 256 characters and its value to 1024 characters
The footer text is limited to 2048 characters
The author name is limited to 256 characters
The sum of all characters from all embed structures in a message must not exceed 6000 characters
Ten embeds can be sent per message
*/

async function limit_buttons(the_reply, interaction) {
	return the_reply
}

async function check_reply(the_reply, interaction, fields_limit = 25, new_lines_limit=99999999) {
	the_reply = await limit_embed(the_reply, interaction, fields_limit, new_lines_limit)
	the_reply = await limit_buttons(the_reply, interaction)
	return the_reply
}

function get_nth_position_of_substring(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}

function replace_elem_with_array(array, elem, new_array) {
	let the_index = array.indexOf(elem)
	let to_return = array.slice(0, the_index)
	to_return = to_return.concat(  new_array )
	to_return = to_return.concat(  array.slice(the_index+1) )
	return to_return
}

async function limit_embed(returning, interaction, fields_limit, new_lines_limit ) {
	let embed = General_functions.copy(returning.embeds[0] )

	for (let field2 of embed.fields) {
		let field = General_functions.copy(field2)
		let count = (field.value.match(/\n/g) || []).length
		let fields = [field]
		while ( count > new_lines_limit ) {
			let pos_of_nth = get_nth_position_of_substring(fields[fields.length-1].value, "\n", new_lines_limit+1)
			let new_last = {name:fields[fields.length-1].name, value: fields[fields.length-1].value.substring(pos_of_nth+1), inline:fields[fields.length-1].inline }
			fields[fields.length-1].value = fields[fields.length-1].value.substring(0,pos_of_nth)
			if (new_last.value !== "") {
				fields.push(new_last)
			}
			count = (fields[fields.length-1].value.match(/\n/g) || []).length
		}
		embed.fields = replace_elem_with_array(embed.fields, embed.fields[embed.fields.length-1], fields)
	}

	for (let field of embed.fields) {
		if ( field.value.length > 1024 ) {
			let the_fields = [field]
			while ( the_fields[ 0 ].value.length > 1024 ) {
				//await new Promise(r => setTimeout(r, 1000));
				let more_than = (the_fields[0].value.length-1024)
				let next_new_line = more_than + the_fields[0].value.substring(more_than).indexOf("\n")
				if (next_new_line === -1 ) {
					next_new_line = more_than + the_fields[0].value.substring(more_than).indexOf(" ")
					if (next_new_line === -1 ) { 
						next_new_line = more_than
					}
				}
				let field1 = {name:field.name, value: the_fields[ 0 ].value.substring(0,next_new_line), inline: field.inline }
				let field2 = {name:field.name, value: the_fields[ 0 ].value.substring(next_new_line), inline: field.inline }

				let new_fields = [field1, field2]
				new_fields = new_fields.concat(  the_fields.slice(1) )
				the_fields = new_fields
			}

			let page = 1
			for (let field of the_fields) {
				field.name = field.name + " " + page + "/" + the_fields.length
				page += 1
			}

			embed.fields = replace_elem_with_array(embed.fields, field, the_fields)
		}
	}

	let the_messages = [ [] ]
	let sum_of_other =  embed.title.length + embed.description.length + embed.footer.text.length 
	if (embed.author !== null) { sum_of_other += embed.author.name.length }

	let sum_of_current_message = sum_of_other

	for (let field of embed.fields) {
		let this_field_len = field.value.length + field.name.length
		if ( the_messages[the_messages.length - 1].length + 1 > fields_limit ||  sum_of_current_message + this_field_len > 6000) {
			the_messages[the_messages.length] = [field]
			sum_of_current_message = this_field_len
		} else {
			the_messages[the_messages.length - 1].push(field)
			sum_of_current_message += this_field_len
		}
	}

	embed.fields = the_messages[0]
	returning.embeds = [ General_functions.copy(embed) ]

	let current = 0
	async function next_page() {
		if (current !== the_messages.length-1) {
			current += 1
		}
		returning.embeds[0].fields = the_messages[current]
		returning.embeds[0].footer.text = "Page " + (current + 1) + "/" + the_messages.length
		let next_page_button = await Components_functions.button(interaction = interaction, button_id = "next_page", button_label = "Next Page", button_style="SECONDARY", func = next_page)
		returning.components[0].components[1] = next_page_button
		await interaction.editReply( returning )
	}

	async function previous_page() {
		if (current !== 0) {
			current -= 1
		}
		returning.embeds[0].fields = the_messages[current]
		returning.embeds[0].footer.text = "Page " + (current + 1) + "/" + the_messages.length
		let previous_page_button = await Components_functions.button(interaction = interaction, button_id = "previous_page", button_label = "Previous Page", button_style="SECONDARY", func = previous_page)
		returning.components[0].components[0] = previous_page_button
		await interaction.editReply( returning )
	}
	
	let buttons = []
	if (the_messages.length > 1) {
		let next_page_button = await Components_functions.button(interaction = interaction, button_id = "next_page", button_label = "Next", button_style="SECONDARY", func = next_page)
		let previous_page_button = await Components_functions.button(interaction = interaction, button_id = "previous_page", button_label = "Previous", button_style="SECONDARY", func = previous_page)
		buttons.push(previous_page_button)
		buttons.push(next_page_button)
	}

	if ( buttons.length !== 0 ) {
		if (returning.components !== undefined) {
			// multiple rows
			buttons = buttons.concat( returning.components[0].components )
			returning.components[0].components = buttons
		} else {
			const row = new MessageActionRow()
				.addComponents(buttons[0])
				.addComponents(buttons[1])
			returning.components = [row]
		}
	}

	returning.embeds[0].footer.text = "Page 1/" + the_messages.length

	return returning
}

const Embed_functions = {
	check_reply: check_reply,
}

exports.Embed_functions = Embed_functions;