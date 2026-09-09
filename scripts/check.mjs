import assert from 'node:assert/strict';
import {readFile, readdir, stat} from 'node:fs/promises';
import {resolve, dirname} from 'node:path';
import vm from 'node:vm';
import {cases} from './cases.mjs';
const root=resolve('dist');
const pages=(await readdir(root)).filter(f=>f.endsWith('.html'));
let links=0, scripts=0;
for(const page of pages){
 const source=await readFile(resolve(root,page),'utf8');
 assert(source.includes('lang="zh-Hant"'),`${page}: missing language`);
 assert(!source.includes('/Users/')&&!source.includes('localhost')&&!source.includes('127.0.0.1'),`${page}: local path leak`);
 const ids=[...source.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(new Set(ids).size,ids.length,`${page}: duplicate IDs`);
 for(const match of source.matchAll(/\b(?:href|src)="([^"]*)"/g)){
  const ref=match[1];
  if(!ref||/^(?:https?:|data:|mailto:|javascript:)/.test(ref))continue;
  const url=new URL(ref,`https://local.test/${page}`);
  const target=resolve(root,'.'+url.pathname);
  assert(target.startsWith(root+'/'),`Unsafe path: ${ref}`);
  assert((await stat(target)).isFile(),`${page}: missing ${ref}`);
  if(url.hash){const targetHtml=await readFile(target,'utf8');assert(targetHtml.includes(`id="${url.hash.slice(1)}"`),`${page}: missing fragment ${ref}`);}
  links++;
 }
 for(const script of source.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)){
  if(script[1].includes('src=')||script[1].includes('application/ld+json'))continue;
  new vm.Script(script[2],{filename:page});scripts++;
 }
}
for(const file of (await readdir('assets')).filter(f=>f.endsWith('.js'))){new vm.Script(await readFile(`assets/${file}`,'utf8'),{filename:file});scripts++;}
for(const c of cases){
 assert.equal(c.steps.length,3);
 for(const step of c.steps){if(!step.preview)continue;const url=new URL(step.preview,'https://local.test');const html=await readFile(resolve(root,'.'+url.pathname),'utf8');if(url.searchParams.has('view'))assert(html.includes(`id="v-${url.searchParams.get('view')}"`));}
}
console.log(`PASS: ${pages.length} pages, ${links} local links/anchors/assets, ${scripts} scripts, all guided HR view targets.`);
