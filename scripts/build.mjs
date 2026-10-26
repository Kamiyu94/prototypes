import {cp, mkdir, readdir, rm, readFile, writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import './render-cases.mjs';
// Deploy only the public pages and assets, never source notes or private files.
await rm('dist', {recursive: true, force: true});
await mkdir('dist', {recursive: true});
const portfolioVersion=createHash('sha256').update(await readFile('assets/portfolio.css')).digest('hex').slice(0,10);
for (const file of await readdir('.')) {
  if (!file.endsWith('.html')) continue;
  const before=await readFile(file,'utf8');
  const after=before.replace(/href="assets\/portfolio\.css(?:\?v=[^"]*)?"/g, `href="assets/portfolio.css?v=${portfolioVersion}"`);
  if(after!==before) await writeFile(file,after);
  await cp(file, `dist/${file}`);
}
await cp('assets', 'dist/assets', {recursive: true});
console.log('Static site built in dist/.');
