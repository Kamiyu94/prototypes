import {cp, mkdir, readdir, rm} from 'node:fs/promises';
import './render-cases.mjs';
// Deploy only the public pages and assets, never source notes or private files.
await rm('dist', {recursive: true, force: true});
await mkdir('dist', {recursive: true});
for (const file of await readdir('.')) {
  if (file.endsWith('.html')) await cp(file, `dist/${file}`);
}
await cp('assets', 'dist/assets', {recursive: true});
console.log('Static site built in dist/.');
