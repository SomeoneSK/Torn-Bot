const {General_functions} = require("../helper_functions/general.js")

let Message_constructors = {

}
exports.Message_constructors = Message_constructors;

let files = General_functions.get_files_in_folder(__dirname)

for (let file of files) {
	files = General_functions.delete_from_list(files, file)
	if (file !== __dirname && file.substring(file.length - 3) === ".js" && file.substring(file.length - 8) !== "index.js") {
		files.push( file.substring(__dirname.length+1) )
	}
}
for (let file of files) {
	Message_constructors[file.substring(file.indexOf("/") + 1,file.length - 3)] = require("./" + file)[file.substring(file.indexOf("/") + 1,file.length - 3)]
}

