var SUBJECTS = [], QUESTIONS = [], SIMPLE = {}, NOTES = {};
(function(){
  var n = 0;
  function h(s){ var x = 5381; for (var i = 0; i < s.length; i++) x = ((x << 5) + x + s.charCodeAt(i)) | 0; return (x >>> 0).toString(36); }
  window.P = function(s, c, src, q, o, a, e, notes){ QUESTIONS.push({ id:'P:' + src, s:s, c:c, src:src, prof:true, q:q, o:o, a:a, e:e, notes:notes || null, order:n++ }); };
  window.L = function(s, c, q, items, need, tip, src){ QUESTIONS.push({ id:(src ? 'P:' + src : s + ':L' + h(q)), s:s, c:c, src:src || null, prof:!!src, t:'list', q:q, o:items, need:need, e:tip, order:n++ }); };
  window.O = function(s, c, q, ans, tip){ QUESTIONS.push({ id:s + ':O' + h(q), s:s, c:c, prof:false, t:'open', q:q, o:[ans], e:tip, order:n++ }); };
  window.Q = function(s, c, q, o, e){ QUESTIONS.push({ id:s + ':' + h(q), s:s, c:c, prof:false, q:q, o:o, a:0, e:e, order:n++ }); };
})();
