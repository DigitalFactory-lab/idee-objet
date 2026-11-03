/* Téléchargement robuste pour tablettes et navigateurs intégrés (iPad/Safari, applis de messagerie…).
   1. Tente le téléchargement classique.
   2. Affiche toujours une barre avec « Ouvrir le fichier » (nouvel onglet) et, si l’appareil le permet,
      « Enregistrer / partager » (feuille de partage : Fichiers, Drive, AirDrop…).
   Rien n’est envoyé sur Internet : le fichier reste sur l’appareil. */
(function(){
  'use strict';
  var bar=null,lastUrl=null,lastFile=null,timer=null;
  function css(){
    if(document.getElementById('df-dl-css'))return;
    var s=document.createElement('style');s.id='df-dl-css';
    s.textContent='.df-dl{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:1000;width:min(640px,calc(100% - 24px));background:#2f3a48;color:#fff;border-radius:8px;padding:14px 16px;box-shadow:0 14px 40px #0004;font:14px/1.45 Poppins,Arial,sans-serif;display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center}'+
      '.df-dl p{margin:0;flex:1 1 260px}.df-dl strong{display:block;font-weight:700}.df-dl small{display:block;opacity:.8;font-size:12px;margin-top:2px}'+
      '.df-dl a,.df-dl button{display:inline-flex;align-items:center;min-height:44px;padding:10px 14px;border-radius:4px;font:inherit;font-weight:700;text-decoration:none;cursor:pointer;border:1px solid #ffffff66;background:transparent;color:#fff}'+
      '.df-dl .main{background:#11c6f4;border-color:#11c6f4;color:#2f3a48}.df-dl .close{min-width:44px;justify-content:center;border:0;font-size:20px;padding:0}'+
      '.df-dl a:focus-visible,.df-dl button:focus-visible{outline:3px solid #fff;outline-offset:2px}';
    document.head.appendChild(s);
  }
  function hide(){if(bar){bar.remove();bar=null;}}
  function canShareFile(f){try{return !!(navigator.canShare&&navigator.share&&navigator.canShare({files:[f]}));}catch(e){return false;}}
  function show(url,file){
    css();hide();
    bar=document.createElement('div');bar.className='df-dl';bar.setAttribute('role','status');
    var p=document.createElement('p');
    var sh=canShareFile(file);
    p.innerHTML='<strong></strong><small>'+(sh?'Le téléchargement ne démarre pas ? Touche « Enregistrer / partager » puis « Enregistrer dans Fichiers ».':'Le téléchargement ne démarre pas ? Ouvre le fichier, puis enregistre-le depuis le menu du navigateur.')+'</small>';
    p.firstChild.textContent='Fichier prêt : '+file.name;
    bar.appendChild(p);
    var open=document.createElement('a');open.href=url;open.target='_blank';open.rel='noopener';open.textContent='Ouvrir le fichier';
    bar.appendChild(open);
    if(sh){
      var share=document.createElement('button');share.type='button';share.className='main';share.textContent='Enregistrer / partager';
      share.onclick=function(){navigator.share({files:[file],title:file.name}).catch(function(){});};
      bar.appendChild(share);
    }else{open.className='main';}
    var close=document.createElement('button');close.type='button';close.className='close';close.setAttribute('aria-label','Fermer');close.textContent='×';close.onclick=hide;
    bar.appendChild(close);
    document.body.appendChild(bar);
    clearTimeout(timer);timer=setTimeout(hide,60000);
  }
  window.dfDownload=function(blob,name){
    var file;try{file=new File([blob],name,{type:blob.type||'application/octet-stream'});}catch(e){file=blob;file.name=name;}
    if(lastUrl){var old=lastUrl;setTimeout(function(){URL.revokeObjectURL(old);},120000);}
    var url=URL.createObjectURL(blob);lastUrl=url;lastFile=file;
    try{var a=document.createElement('a');a.href=url;a.download=name;a.rel='noopener';a.style.display='none';document.body.appendChild(a);a.click();a.remove();}catch(e){}
    show(url,file);
  };
})();
