(function(global){'use strict';
  const normalize=s=>(s||'').normalize('NFKC').toLowerCase().replace(/[\s.・'’`´\-‐‑‒–—―]/g,'');
  // 配合作成ツールの currentCrosses と同じ、父母両側かつ異なる直下馬の判定。
  function calculate(nodes){
    const byPath=new Map(nodes.filter(n=>n.name).map(n=>[n.path,n]));
    const groups=new Map();
    for(const n of byPath.values()){
      const key=normalize(n.name),parent=n.path.length===1?n.path:normalize(byPath.get(n.path.slice(0,-1))?.name);
      if(!groups.has(key))groups.set(key,{name:n.name,occurrences:[]});
      groups.get(key).occurrences.push({path:n.path,generation:n.path.length,side:n.path[0],child:parent});
    }
    return [...groups.values()].filter(x=>new Set(x.occurrences.map(o=>o.side)).size>1&&new Set(x.occurrences.map(o=>o.child).filter(Boolean)).size>1)
      .map(x=>({...x,generations:x.occurrences.map(o=>o.generation).sort((a,b)=>a-b),blood:x.occurrences.reduce((sum,o)=>sum+100/(2**o.generation),0)}))
      .sort((a,b)=>b.blood-a.blood||a.name.localeCompare(b.name,'ja'));
  }
  global.DBST2_MATING_CROSS={calculate,normalize};
  if(typeof module!=='undefined')module.exports={calculate,normalize};
})(typeof window!=='undefined'?window:globalThis);
