(function(global){'use strict';
  const jp=p=>[...p].map(c=>c==='F'?'父':'母').join('');
  const plain=s=>(s||'').replace(/系$/,'').normalize('NFKC').trim();
  function distance(a,b){const row=[...Array(b.length+1).keys()];for(let i=1;i<=a.length;i++){let prev=row[0];row[0]=i;for(let j=1;j<=b.length;j++){const old=row[j];row[j]=Math.min(row[j]+1,row[j-1]+1,prev+(a[i-1]===b[j-1]?0:1));prev=old}}return row[b.length]}
  function evaluate(nodes,m,G){
    const map=new Map(nodes.map(n=>[n.path,n]));const code=p=>map.get(jp(p))?.lineageCode||'';
    const funnyCodes=['FFFF','FFMF','FMFF','FMMF','MFFF','MFMF','MMFF','MMMF'].map(code);
    const funny=funnyCodes.every(Boolean)&&new Set(funnyCodes).size>=7;
    const sirePerfect=['FFFMF','FFMMF','FMFMF','FMMMF'].map(code),damFunny=['MFFF','MFMF','MMFF','MMMF'].map(code),sorted=a=>[...a].sort().join('|');
    const splendid=sirePerfect.every(Boolean)&&damFunny.every(Boolean)&&new Set(damFunny).size>=3&&sorted(sirePerfect)===sorted(damFunny);
    const canon=[...new Set((G.nicks||[]).flatMap(([a,b])=>[plain(a),plain(b)]))];
    const canonical=s=>{const raw=plain(s);if(!raw||canon.includes(raw))return raw;let best='',d=Infinity;for(const n of canon){const x=distance(raw,n);if(x<d){best=n;d=x}}return d<=Math.max(1,Math.floor(best.length*.2))?best:raw};
    const nickMap=new Map((G.nicks||[]).map(([a,b,n])=>[canonical(a)+'\t'+canonical(b),n]));
    const nick=nickMap.get(canonical(map.get('父')?.sublineage)+'\t'+canonical(map.get('母')?.sublineage))||0;
    return {funny,splendid,perfect:funny&&splendid,elaborate:m[2]==='成立',danger:m[3]==='あり',nick};
  }
  global.DBST2_MATING_THEORIES={evaluate};if(typeof module!=='undefined')module.exports={evaluate};
})(typeof window!=='undefined'?window:globalThis);
