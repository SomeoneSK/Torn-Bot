import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import {General_functions} from "../helper_functions/general.js"

let Commands = {

}

let files = General_functions.get_files_in_folder(__dirname)
for (let file of files) {
	files = General_functions.delete_from_list(files, file)
	if (file !== __dirname && file.substring(file.length - 3) === ".js" && file.substring(file.length - 8) !== "index.js" ) {
		files.push( file.substring(__dirname.length+1) )
	}
}

Commands = Object.fromEntries(
  await Promise.all(
   files
    .filter(file => file.endsWith('.js') && file !== 'index.js' )
    .map(async file => {
      const name = file.substring(file.indexOf("/") + 1,file.length - 3)
      return [
        name,
        (await import(`./${file}`))
      ];
    }),
  ),
);

export { Commands }