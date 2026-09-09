const path=location.pathname.split('/').pop();
const map={
 'hr-service-desk.html':{back:'hr-case.html',name:'HR 流程原型',tip:'建議從事件提報開始，再查看案件進度與 HR 後台。'},
 'talent-radar.html':{back:'talent-case.html',name:'人才畫像原型',tip:'調整能力分數與 Must／Should／Nice，觀察雷達圖及提醒。'},
 'org-chart.html':{back:'hr-case.html',name:'組織圖原型',tip:'可搜尋、收合部門與查看虛構成員；管理權限未在此公開。'},
 'platform.html':{back:'hr-case.html',name:'HR 平台方案說明',tip:'以下含正式系統的設計說明；公開原型僅展示畫面與部分互動。'}
};
const config=map[path];
if(config){
 const bar=document.createElement('aside');bar.className='legacy-tour';bar.setAttribute('aria-label','作品導覽');
 const a=document.createElement('a');a.href=config.back;a.textContent='← 回案例導覽';a.target='_top';
 const div=document.createElement('div');div.className='legacy-tour-content';const title=document.createElement('strong');title.textContent=config.name+' · 範例資料';const p=document.createElement('p');const small=document.createElement('small');small.textContent=config.tip;p.append(small);div.append(title,p);bar.append(a,div);document.body.prepend(bar);
}
const params=new URLSearchParams(location.search);
if(path==='hr-service-desk.html'&&typeof go==='function'){
 const view=params.get('view');if(['home','general','report','track','org','hr'].includes(view))go(view);
}
if(path==='talent-radar.html'&&params.get('tour')==='1'&&typeof loadTemplate==='function'){
 document.getElementById('jobName').value='專案經理（需求討論範例）';document.getElementById('jobType').value='pm';document.getElementById('level').value='junior';loadTemplate();
}
