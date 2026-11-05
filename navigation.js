/* Navigation commune : atelier, outils et exploration des métiers. */
(() => {
  const page = document.body.dataset.dfPage;
  const isWorkshop = page === 'part1' || page === 'part2';
  const steps = [
    ['Impression 3D', 'index.html', ['Le déclic','Les usages métiers','De l’idée à l’objet','Choisir un objet pratique','On lance et on observe','Tes choix comptent','Une idée à tester','L’objet en main','Le bilan 3D']],
    ['Laser & impression UV', 'partie2.html', ['Les usages métiers','Deux machines, deux gestes','Le laser, pas à pas','L’UV, pas à pas','Quelle matière ?','À toi de créer','Le bilan']]
  ];
  const returnKey = 'df-workshop-return';
  function remember() {
    if (!isWorkshop) return;
    const file = page === 'part1' ? 'index.html' : 'partie2.html';
    const hash = /^#etape-\d+$/.test(location.hash) ? location.hash : '#intro';
    try { sessionStorage.setItem(returnKey, file + hash); } catch {}
  }
  function returnPath() {
    try { const path = sessionStorage.getItem(returnKey); if (/^(index|partie2)\.html#(intro|etape-\d+)$/.test(path || '')) return path; } catch {}
    return 'index.html#intro';
  }
  document.addEventListener('click', e => { if(e.target.closest('a[href^="machines.html"]')) remember(); });
  window.addEventListener('pagehide', remember);
  if (page === 'metiers') document.querySelectorAll('[data-return-workshop]').forEach(a => a.href = returnPath());
  const dock = document.createElement('a');
  dock.className = 'df-metiers-dock';
  dock.setAttribute('aria-label',page === 'metiers' ? 'Reprendre l’atelier' : 'Les métiers');
  dock.href = page === 'metiers' ? returnPath() : 'machines.html#metiers';
  dock.innerHTML = '<span class="dock-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V4h8v3M3 12a22 22 0 0 0 18 0M10 13h4"/></svg></span><span class="dock-copy"><small>'+(page==='metiers'?'REPRENDRE':'EXPLORER')+'</small><strong>'+(page==='metiers'?'L’atelier':'Les métiers')+'</strong></span><span class="dock-arrow" aria-hidden="true">'+(page==='metiers'?'←':'↗')+'</span>';
  document.body.append(dock);
  const dialog = document.createElement('dialog');
  dialog.id = 'journey-dialog'; dialog.className = 'journey-dialog'; dialog.setAttribute('aria-labelledby','journey-title');
  dialog.innerHTML = '<div class="journey-head"><div><p class="journey-label">DE L’IDÉE À L’OBJET</p><h2 id="journey-title">Ton parcours.</h2></div><button class="journey-close" aria-label="Fermer le parcours">×</button></div><p class="journey-intro">Deux parties qui se complètent. Rejoins une étape à tout moment.</p><div class="journey-columns">'+steps.map(([title,file,list],i)=>'<section><h3><span>0'+(i+1)+'</span>'+title+'</h3><ol>'+list.map((label,n)=>'<li><a href="'+file+'#etape-'+(n+1)+'"><span>'+String(n+1).padStart(2,'0')+'</span>'+label+'<b aria-hidden="true">→</b></a></li>').join('')+'</ol></section>').join('')+'</div><div class="journey-resources"><a href="machines.html#metiers">Les métiers ↗</a><a href="studio-carte.html">Studio carte →</a><a href="qr-code.html">Créer un QR code →</a></div>';
  document.body.append(dialog);
  if(isWorkshop){const guide=document.createElement('button');guide.className='route-menu';guide.textContent='Guide animateur';guide.addEventListener('click',()=>{dialog.close();document.querySelector('#guide').click();});dialog.querySelector('.journey-resources').append(guide);}
  let opener;
  function close(){dialog.close();opener?.focus();}
  document.querySelectorAll('[data-open-journey]').forEach(b=>b.addEventListener('click',()=>{
    opener=b;
    const file = page==='part1'?'index.html':'partie2.html';
    dialog.querySelectorAll('a').forEach(a=>{a.removeAttribute('aria-current');if(a.getAttribute('href')===file+location.hash)a.setAttribute('aria-current','step');});
    dialog.showModal();dialog.querySelector('.journey-close').focus();
  }));
  dialog.querySelector('.journey-close').addEventListener('click',close);
  dialog.addEventListener('click',e=>{
    const a=e.target.closest('a');
    if(a){ const href=a.getAttribute('href'); const file=page==='part1'?'index.html':'partie2.html';
      if(isWorkshop&&href.startsWith(file+'#')){e.preventDefault();close();location.hash=href.split('#')[1];}
      else remember();
    }
    if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}
  });
})();
