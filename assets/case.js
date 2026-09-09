const frame = document.querySelector('iframe');
const stepButtons = [...document.querySelectorAll('.step-button')];
stepButtons.forEach(button=>button.addEventListener('click',()=>{
 const step=button.closest('.guide-step');
 document.querySelectorAll('.guide-step').forEach(el=>el.classList.toggle('current',el===step));
 stepButtons.forEach(el=>el.setAttribute('aria-pressed',String(el===button)));
 if(button.dataset.preview && frame){frame.src=button.dataset.preview;document.querySelector('#expand-demo').href=button.dataset.preview;}
 const status=document.querySelector('#frame-status');
 if(status)status.textContent=`步驟 ${String(Number(button.dataset.index)+1).padStart(2,'0')} · ${step.querySelector('h3').textContent}`;
 if(matchMedia('(max-width:760px)').matches&&frame)frame.parentElement.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'});
}));
document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
 const status=button.parentElement.querySelector('.copy-status');
 try{await navigator.clipboard.writeText(button.dataset.copy);status.textContent='已複製，可貼到 GenBI Demo。';}catch{status.textContent='請選取上方問句後手動複製。';}
}));
