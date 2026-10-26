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

// Discoverability regression: the home page must expose every public work
// without requiring JavaScript or a detour through a case study.
const home=await readFile(resolve(root,'index.html'),'utf8');
for(const href of ['pmo-intake.html','project-dashboard.html','https://kamiyu94.github.io/pmo-intake-demo/','https://kamiyu94.github.io/project-portfolio-demo/','hr-service-desk.html','platform.html','org-chart.html','talent-radar.html','genbi.html','hr-case.html','talent-case.html','voxlog.html','https://genbi-mini.streamlit.app/','https://github.com/Kamiyu94/VoxLog#readme']){
 assert(home.includes(`href="${href}"`),`Homepage missing direct work entry: ${href}`);
}
assert(home.indexOf('id="work"')<home.indexOf('id="experience"'),'Work must precede resume content');
for(const page of ['index.html','voxlog.html','pmo-intake.html','project-dashboard.html']){
 const html=await readFile(resolve(root,page),'utf8');
 for(const tag of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g))assert(tag[0].includes('rel="noopener noreferrer"'),`${page}: unsafe new tab`);
 assert(!/爭鮮|STARCO|kamiyux@gmail|937.?888.?824|IT Head/.test(html),`${page}: private resume details or unsupported title`);
}
assert(home.includes('仍在測試')&&home.includes('最終判定由人員負責'),'Preserve AI Intake status and human decision boundary');
console.log('PASS: all works directly discoverable, portfolio before experience, public profile boundaries.');

for(const page of ['index.html','genbi.html']){
 const html=await readFile(resolve(root,page),'utf8');
 assert(!html.includes('github.com/Kamiyu94/genbi-mini'),'Do not link visitors to private GenBI source');
 assert(html.includes('demo-preview'),'GenBI must have a sleep-independent visual walkthrough');
}
console.log('PASS: GenBI screenshot fallback and public link boundaries.');

// Keep the public resume reachable and both case templates on the reading system.
const resume=await readFile(resolve(root,'assets/resume/kris-lu-resume.pdf'));
assert(resume.subarray(0,5).toString()==='%PDF-','Resume download must be a PDF');
assert(home.includes('href="assets/resume/kris-lu-resume.pdf" download'),'Resume CTA must download the public PDF');
for(const page of ['pmo-intake.html','project-dashboard.html','voxlog.html','hr-case.html','genbi.html','talent-case.html']){
 const html=await readFile(resolve(root,page),'utf8');
 assert(html.includes('class="case-hero-band"')&&html.includes('assets/editorial.css?v='),`${page}: missing shared reading canvas`);
}
console.log('PASS: public resume download and all six case reading layouts.');
