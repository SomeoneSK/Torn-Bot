import {General_functions} from "../helper_functions/general.js"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

let Message_constructors = {

}

let files = General_functions.get_files_in_folder(__dirname)

for (let file of files) {
	files = General_functions.delete_from_list(files, file)
	if (file !== __dirname && file.substring(file.length - 3) === ".js" && file.substring(file.length - 8) !== "index.js") {
		files.push( file.substring(__dirname.length+1) )
	}
}
for (let file of files) {
  let func_name = file.substring(file.indexOf("/") + 1,file.length - 3)
	Message_constructors[func_name] = (await import("./" + file))[func_name]
}

export { Message_constructors }