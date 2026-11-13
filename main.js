/* ===== EDIT ME: projects (placeholder copy — replace with your real work) ===== */
const EMAIL = 'hello@example.com';
const PROJECTS = [
  {t:'Making enterprise case management launch-ready', d:'Reworked onboarding and core workflows of a multi-tenant case-management platform so new teams go from sign-up to first case in minutes, not days.', tags:['Full-stack','Workflow engine','Enterprise SaaS'], art:'dash', bg:'m-a', acc:'#7a5cd6', yr:'2026'},
  {t:'Access requests as one-click approvals', d:'An approval workflow that provisions cloud access the moment it is signed off — audit trail, auto-expiry, and no standing credentials.', tags:['Automation','Azure','Security'], art:'table', bg:'m-b', acc:'#2f7a4f', yr:'2026'},
  {t:'AI suggestions, right where people type', d:'Inline AI completions across the product — streaming suggestions that feel instant and stay out of the way.', tags:['LLMs','Streaming UX','Platform'], art:'term', bg:'m-c', acc:'#3d63c9', yr:'2025'},
  {t:'A mobile-first expense tracker', d:'A side project: offline-first expense tracking with receipt scanning, built to stay fast on a slow phone and a slower network.', tags:['React Native','Offline-first','OCR'], art:'phone', bg:'m-d', acc:'#e0582c', yr:'2025'}
];
const SNAPS=[['dash','m-a','#7a5cd6','case dashboards'],['term','m-c','#3d63c9','shipping w/ AI'],['phone','m-d','#e0582c','weekend app'],['table','m-b','#2f7a4f','approval flows'],['dash','m-c','#3d63c9','analytics'],['term','m-a','#7a5cd6','late-night deploys']];

/* ===== helpers ===== */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v)),lerp=(a,b,t)=>a+(b-a)*t;
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches,FINE=matchMedia('(hover:hover) and (pointer:fine)').matches;
$('#yr').textContent=new Date().getFullYear();$('#mail2').textContent=EMAIL;

/* ===== UI mock art (pure HTML/CSS — no images) ===== */
const chartSVG=()=>`<svg viewBox="0 0 200 80" preserveAspectRatio="none"><path d="M0 62 C 20 58, 30 40, 50 44 S 80 20, 100 30 S 140 8, 160 18 S 190 6, 200 4"/><path class="b" d="M0 70 C 30 66, 40 58, 70 60 S 120 46, 150 50 S 185 40, 200 38"/></svg>`;
const ART={
  dash:()=>`<div class="win"><div class="side"><i></i><i></i><i></i><i></i><i></i></div><div class="pane"><div class="bar"></div><div class="kpis"><div class="kpi"><b>56</b><i></i></div><div class="kpi"><b>21</b><i></i></div><div class="kpi"><b>130</b><i></i></div></div><div class="chart">${chartSVG()}</div></div></div>`,
  table:()=>`<div class="win" style="transform:rotate(2deg)"><div class="side"><i></i><i></i><i></i><i></i></div><div class="pane"><div class="bar"></div><div class="rows"><i></i><i></i><i></i><i></i><i></i><i></i></div></div></div>`,
  term:()=>`<div class="term"><b>$</b> npm run ship<br><em>✦ ai</em> suggesting next step…<br>&nbsp;&nbsp;const plan = <u>await</u> design(idea)<br>&nbsp;&nbsp;const app&nbsp; = build(plan)<br><b>✓</b> tests passed (128)<br><b>✓</b> deployed to prod in 41s</div>`,
  phone:()=>`<div class="phone"><div class="scr"><i class="h"></i><i></i><i class="c"></i><i class="c"></i><i></i><i class="c"></i></div></div>`
};
const mock=(art,bg,acc)=>`<div class="mock ${bg}" style="--acc:${acc}">${ART[art]()}</div>`;

/* polaroid belt */
const pol=SNAPS.map(([a,b,c,cap],i)=>`<figure class="pol" style="--r:${[-3,2,-1.5,3,-2.5,1.5][i]}deg"><div class="ph">${mock(a,b,c)}</div><figcaption>${cap}</figcaption></figure>`).join('');
const rowA=$('#rowA');rowA.innerHTML=pol+pol;

/* work cards (horizontal) */
const track=$('#track');$('#work').style.setProperty('--n',PROJECTS.length);
track.innerHTML=PROJECTS.map((p,i)=>`<a href="#" class="proj"><div class="art">${mock(p.art,p.bg,p.acc)}</div><div class="info"><span class="mono">0${i+1} — ${p.yr}</span><h3>${p.t}</h3><p>${p.d}</p><div class="chips">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div><span class="more">Read the case study</span></div></a>`).join('');

/* ===== split headings into masked words ===== */
$$('.split').forEach(el=>{const walk=n=>[...n.childNodes].forEach(c=>{if(c.nodeType===3){const f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(w=>{if(!w)return;if(/^\s+$/.test(w)){f.append(w);return}const o=document.createElement('span');o.className='w';const i=document.createElement('span');i.textContent=w;o.append(i);f.append(o)});c.replaceWith(f)}else if(c.nodeType===1)walk(c)});walk(el);
  $$('.w>span',el).forEach((s,k)=>s.style.transitionDelay=(k*60)+'ms')});

/* ===== reveal ===== */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15,rootMargin:'0px 0px -6% 0px'});
$$('.reveal,.split:not(h1)').forEach(el=>{if(el.classList.contains('reveal'))el.style.transitionDelay=(([...el.parentElement.children].indexOf(el))%5*80)+'ms';io.observe(el)});
const intro=()=>{if(document.body.classList.contains('ready'))return;document.body.classList.add('ready');$('h1').classList.add('in');setTimeout(()=>$$('.hero .reveal').forEach(e=>e.classList.add('in')),450)};
(document.fonts?document.fonts.ready:Promise.resolve()).then(()=>requestAnimationFrame(intro));setTimeout(intro,1600);

/* ===== smooth scroll + anchors ===== */
let lenis=null;if(window.Lenis&&!RM)lenis=new Lenis({lerp:.085});
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href');if(id.length<2)return e.preventDefault();const t=$(id);if(!t)return;e.preventDefault();nav.classList.remove('open');lenis?lenis.scrollTo(t,{offset:0,duration:1.4}):t.scrollIntoView({behavior:'smooth'})}));

/* ===== cursor + magnetic ===== */
const cur=$('#cursor');let cx=-99,cy=-99,tx=-99,ty=-99;
addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY});
document.addEventListener('pointerover',e=>{const d=!!e.target.closest('.note');cur.classList.toggle('drag',d);cur.classList.toggle('big',!d&&!!e.target.closest('a,button,.pol,.proj'))});
if(FINE)$$('.mag').forEach(m=>{m.addEventListener('pointermove',e=>{const r=m.getBoundingClientRect();m.style.translate=`${(e.clientX-r.left-r.width/2)*.25}px ${(e.clientY-r.top-r.height/2)*.35}px`});m.addEventListener('pointerleave',()=>m.style.translate='')});

/* ===== draggable sticky notes (with a little toss + tilt) ===== */
const board=$('#board');let z=10;
$$('.note').forEach(n=>{let sx,sy,ox=0,oy=0,dx=0,dy=0,vx=0,lx=0;
  n.addEventListener('pointerdown',e=>{n.setPointerCapture(e.pointerId);n.style.transition='box-shadow .3s';n.style.zIndex=++z;sx=e.clientX;sy=e.clientY;ox=dx;oy=dy;lx=e.clientX});
  n.addEventListener('pointermove',e=>{if(!n.hasPointerCapture(e.pointerId))return;dx=ox+e.clientX-sx;dy=oy+e.clientY-sy;vx=e.clientX-lx;lx=e.clientX;n.style.transform=`translate(${dx}px,${dy}px) rotate(calc(var(--r) + ${clamp(vx*1.4,-14,14)}deg)) scale(1.06)`});
  n.addEventListener('pointerup',()=>{n.style.transition='';n.style.transform=`translate(${dx}px,${dy}px) rotate(var(--r))`})});

/* ===== nav ===== */
const nav=$('#nav');$('#burger').onclick=()=>nav.classList.toggle('open');
const secs=['work','how','about','notes'].map(id=>$('#'+id));let lastY=0;

/* ===== copy email ===== */
const copy=e=>{e.preventDefault();navigator.clipboard?.writeText(EMAIL).catch(()=>{});const t=$('#toast');t.classList.add('on');setTimeout(()=>t.classList.remove('on'),1600)};
$('#mail').addEventListener('click',copy);$('#mail2').addEventListener('click',copy);

/* ===== main loop ===== */
const work=$('#work'),foot=$('.bigname');let beltX=0,vel=0,prevY=scrollY;
function loop(now){requestAnimationFrame(loop);lenis&&lenis.raf(now);const y=scrollY;vel=lerp(vel,y-prevY,.12);prevY=y;
  cx=lerp(cx,tx,.22);cy=lerp(cy,ty,.22);cur.style.transform=`translate(${cx}px,${cy}px)`;
  nav.classList.toggle('solid',y>40);if(Math.abs(y-lastY)>6){nav.classList.toggle('hide',y>lastY&&y>500&&!nav.classList.contains('open'));lastY=y}
  let on=-1;secs.forEach((s,i)=>{if(s.getBoundingClientRect().top<innerHeight*.45)on=i});$$('.links a').forEach((a,i)=>a.classList.toggle('on',i===on));
  if(!RM){beltX-=.5+Math.abs(vel)*.3;const half=rowA.scrollWidth/2;if(-beltX>half)beltX+=half;rowA.style.transform=`translate3d(${beltX}px,0,0)`}
  /* pinned horizontal work scroll */
  if(innerWidth>960){const r=work.getBoundingClientRect(),span=r.height-innerHeight,p=clamp(-r.top/span,0,1),max=track.scrollWidth-innerWidth;track.style.transform=`translate3d(${-p*max}px,0,0)`}
  /* footer name rises into view */
  const fr=foot.getBoundingClientRect();foot.style.setProperty('--fy',`${clamp((fr.top-innerHeight*.55)/innerHeight*60,0,30)}%`);
}
requestAnimationFrame(loop);

/* ===== latest notes on the homepage (from posts/posts.json; drafts only with ?drafts) ===== */
(async()=>{const box=$('#homeNotes');if(!box)return;const D=location.search.includes('drafts');
  try{const all=await (await fetch('posts/posts.json',{cache:'no-cache'})).json();const ps=all.filter(p=>D||!p.draft).sort((a,b)=>b.date.localeCompare(a.date)).slice(0,3);
    box.innerHTML=ps.length?ps.map(p=>`<a class="nrow in" href="post.html?p=${p.slug}${D?'&drafts':''}"><span class="mono">${p.date.slice(0,4)}</span><span class="nt">${p.title}</span><span class="arrow">→</span></a>`).join(''):
      `<div class="soon"><p class="hand-note">First notes are on their way ✍️</p><p>I'm writing about workflows, access automation and building with AI. <a href="blog.html">Peek at the notes page →</a></p></div>`}catch(e){box.innerHTML=''}})();
