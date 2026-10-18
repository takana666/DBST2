'use strict';
// Compatibility bridge: all apps read the same split rule files.
(function(){
 const d=window.DABISTA2_DATA;
 if(!d||!Array.isArray(window.DABISTA2_ELABORATE_PAIRS)||!Array.isArray(window.DABISTA2_NICKS))throw new Error('共通データを読み込めません。dataフォルダと読み込み順を確認してください。');
 d.elaboratePairs=window.DABISTA2_ELABORATE_PAIRS;
 d.nicks=window.DABISTA2_NICKS;
})();
