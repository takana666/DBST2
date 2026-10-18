(()=>{'use strict';
const decode=window.createDBST2PairData;
window.createDBST2PairData=function(compact){
 if(compact.__formalDecoded)return compact.__formalDecoded;
 const d=decode(compact),T=window.DBST2_TABLE_V2,formal=window.DBST2_FORMAL_ALL_PAIRS;
 if(!T||!formal)return d;
 const pairs=new Map([...d.candidatePairs,...d.nonCandidatePairs].map(p=>[p.a+'\0'+p.b,p]));
 for(const k of window.DBST2_FORMAL_SUPERSEDED_KEYS||[])pairs.delete(k);
 for(const [a,b,ok,ng,status,ids,reason] of formal){
  const evidence=ids.map(i=>T.matings[i]);
  const unique=k=>[...new Set(evidence.map(m=>m[k]))];
  const k=a+'\0'+b,old=pairs.get(k);
  pairs.set(k,{...old,a,b,ok,ng,ids,reason,mares:unique(1),sires:unique(0),dams:unique(1),ap:old?.ap||[],bp:old?.bp||[],same:a===b,reverse:!!old?.reverse});
 }
 d.candidatePairs=[];d.nonCandidatePairs=[];
 for(const p of pairs.values())(p.ng>0?d.nonCandidatePairs:d.candidatePairs).push(p);
 d.meta={...d.meta,generated:'2026-10-18',candidatePairs:d.candidatePairs.length,nonCandidatePairs:d.nonCandidatePairs.length,empiricalSource:'20261018-2.pptx'};
 Object.defineProperty(compact,'__formalDecoded',{value:d});return d;
};
})();
