/* Blog engine: posts live in posts/*.md, listed in posts/posts.json.
   Drafts ("draft": true) are hidden unless the URL contains ?drafts */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const SHOW_DRAFTS=location.search.includes('drafts');
const fmt=d=>new Date(d+'T00:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
const mins=t=>Math.max(1,Math.round(t.split(/\s+/).length/220));
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
async function getPosts(){const r=await fetch('posts/posts.json',{cache:'no-cache'});const all=await r.json();return all.filter(p=>SHOW_DRAFTS||!p.draft).sort((a,b)=>b.date.localeCompare(a.date))}
const q=s=>SHOW_DRAFTS?`${s}${s.includes('?')?'&':'?'}drafts`:s;
const yr=$('#yr');if(yr)yr.textContent=new Date().getFullYear();
const nav=$('#nav'),bg=$('#burger');if(bg)bg.onclick=()=>nav.classList.toggle('open');
/* cursor */
const cur=$('#cursor');if(cur&&matchMedia('(hover:hover) and (pointer:fine)').matches){let x=-99,y=-99,tx=-99,ty=-99;addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY});document.addEventListener('pointerover',e=>cur.classList.toggle('big',!!e.target.closest('a,button,input')));(function f(){x+=(tx-x)*.22;y+=(ty-y)*.22;cur.style.transform=`translate(${x}px,${y}px)`;requestAnimationFrame(f)})()}

/* ---------- list page ---------- */
async function listPage(){const posts=await getPosts(),list=$('#list'),tagbar=$('#tagbar'),qi=$('#q');let tag='all';
  const tags=['all',...new Set(posts.flatMap(p=>p.tags))];tagbar.innerHTML=tags.map(t=>`<button data-t="${t}" class="${t==='all'?'on':''}">${t}</button>`).join('');
  const draw=()=>{const s=qi.value.toLowerCase().trim();const f=posts.filter(p=>(tag==='all'||p.tags.includes(tag))&&(!s||(p.title+p.summary+p.tags.join(' ')).toLowerCase().includes(s)));
    list.innerHTML=f.length?f.map((p,i)=>`<a class="bcard" href="${q('post.html?p='+p.slug)}" style="--d:${i*70}ms"><span class="mono bdate">${fmt(p.date)}${p.draft?' <em class="draft">draft</em>':''}</span><h2>${esc(p.title)}</h2><p>${esc(p.summary)}</p><span class="btags">${p.tags.map(t=>`<i>${t}</i>`).join('')}</span><span class="arrow">→</span></a>`).join(''):
      `<div class="empty"><p class="hand-note">First notes are on their way ✍️</p><p>Check back soon${posts.length?' or clear the search':''}.</p></div>`};
  tagbar.onclick=e=>{const b=e.target.closest('button');if(!b)return;tag=b.dataset.t;$$('button',tagbar).forEach(x=>x.classList.toggle('on',x===b));draw()};qi.oninput=draw;draw()}

/* ---------- post page ---------- */
async function postPage(){const slug=new URLSearchParams(location.search).get('p'),posts=await getPosts(),i=posts.findIndex(p=>p.slug===slug),p=posts[i];
  if(!p){$('#ptitle').textContent='Note not found';$('#prose').innerHTML='<p>This note does not exist (or is still a draft). <a href="blog.html">See all notes →</a></p>';return}
  const md=await (await fetch(`posts/${p.slug}.md`,{cache:'no-cache'})).text();
  document.title=`${p.title} — Umme Zaiba`;$('#ptitle').textContent=p.title;$('#psum').textContent=p.summary;
  $('#meta').innerHTML=`${fmt(p.date)} · ${mins(md)} min read · ${p.tags.join(' / ')}${p.draft?' · <em class="draft">draft</em>':''}`;
  const prose=$('#prose');prose.innerHTML=marked.parse(md);
  const hs=$$('h2,h3',prose);hs.forEach((h,k)=>h.id='s'+k);
  $('#toc').innerHTML=hs.length?`<p class="mono">On this page</p>`+hs.map(h=>`<a href="#${h.id}" class="${h.tagName==='H3'?'sub':''}">${esc(h.textContent)}</a>`).join(''):'';
  const prev=posts[i+1],next=posts[i-1];
  $('#pnav').innerHTML=(prev?`<a href="${q('post.html?p='+prev.slug)}"><span class="mono">← older</span>${esc(prev.title)}</a>`:'<span></span>')+(next?`<a class="r" href="${q('post.html?p='+next.slug)}"><span class="mono">newer →</span>${esc(next.title)}</a>`:'');
  const bar=$('#readbar'),links=$$('#toc a');addEventListener('scroll',()=>{const r=prose.getBoundingClientRect(),p=Math.min(1,Math.max(0,-r.top/(r.height-innerHeight*.6)));bar.style.transform=`scaleX(${p})`;
    let on=0;hs.forEach((h,k)=>{if(h.getBoundingClientRect().top<innerHeight*.3)on=k});links.forEach((a,k)=>a.classList.toggle('on',k===on))},{passive:true})}

if($('#list'))listPage().catch(e=>{$('#list').innerHTML='<p>Could not load notes.</p>';console.error(e)});
if($('#prose'))postPage().catch(e=>{$('#prose').innerHTML='<p>Could not load this note.</p>';console.error(e)});
