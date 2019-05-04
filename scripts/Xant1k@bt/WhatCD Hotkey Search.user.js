// ==UserScript==
// @name          WhatCD Hotkey Search
// @namespace	  https://greasyfork.org/ru/users/19952-xant1k-bt
// @description   Search selected text from everywhere at What.cd
// @version       1.0
// @author        Алексей Рузанов aka LEX1
// If admin change searching result add after +encodeURIComponent(txt) fix .replace(/-/g, '')
// ==/UserScript==

document.addEventListener('keydown', function (e){ 
     var getSel = function (w) { 
         var s, d = w.document; 
         if (d.selection) { 
             var r = d.selection.createRange(); 
             s = r ? r.text : '' 
         } else { 
             s = d.getSelection().toString(); 
             if (!s) { 
                 var e, t = d.getElementsByTagName('textarea'), u = d.getElementsByTagName('input'), i = t.length; 
                 while(e = (i > 0) ? t[--i] : u[-i--])try{ 
                     if (e.offsetHeight > 0 && (s = e.value.substring(e.selectionStart, e.selectionEnd))) break 
                 }catch(x){} 
             } 
         }; 
         if (!s) for (var j = 0, f; f = w.frames[j]; j++) { 
             try { 
                 if (s = getSel(f)) break 
             } catch(x) {} 
         }; 
         return s 
     };
	 
     if(e.shiftKey && !e.ctrlKey && !e.altKey && e.keyCode == 81){ 
         var txt = getSel(window); 
         if(txt)window.open('https://what.cd/torrents.php?searchstr='+encodeURIComponent(txt)).blur();
     } 
  
 }, false);