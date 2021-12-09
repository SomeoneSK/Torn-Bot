import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const Torn_data = Object.fromEntries(
  await Promise.all(
    fs.readdirSync(__dirname + '/')
    .filter(file => file.endsWith('.js') && file !== 'index.js')
    .map(async file => {
      const name = file.replace('.js', '');
      return [
        name,
        (await import(`./${file}`))[name]
      ];
    }),
  ),
);
export { Torn_data }