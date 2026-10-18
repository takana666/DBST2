(function (global) {
  "use strict";

  function createDBST2PairData(compact) {
    if (!compact || compact.v !== 1) {
      throw new Error("Unsupported DBST2 pair data format");
    }

    const strings = compact.s;
    const lists = compact.l;
    const horses = compact.h;

    const decodeList = (index) => lists[index].map((id) => strings[id]);
    const horseName = (index) => strings[horses[index][0]];
    const pedigree = (index) => decodeList(horses[index][1]);

    function decodePair(row) {
      return {
        a: horseName(row[0]),
        b: horseName(row[1]),
        ok: row[2],
        ng: row[3],
        mares: decodeList(row[4]),
        sires: decodeList(row[5]),
        dams: decodeList(row[6]),
        ap: decodeList(row[7]),
        bp: decodeList(row[8]),
        same: Boolean(row[9] & 1),
        reverse: Boolean(row[9] & 2),
        reason: strings[row[10]],
      };
    }

    const pedigreeByName = new Map();
    horses.forEach((_, index) => pedigreeByName.set(horseName(index), pedigree(index)));

    return {
      meta: compact.meta,
      candidatePairs: compact.p.c.map(decodePair),
      nonCandidatePairs: compact.p.n.map(decodePair),
      pedigreeByName,
      getPedigree(name) {
        return pedigreeByName.get(name) || null;
      },
    };
  }

  global.createDBST2PairData = createDBST2PairData;
})(window);
