// ==UserScript==
// @name         Replace words
// @namespace    https://greasyfork.org
// @version      1.0
// @description  replace words with new words
// @author       DimaGr
// @include      http://tx3.travian.fr/
// @grant        none
// @directions   replace 'word' 
// ==/UserScript==
<script type="text/javascript">
  $.fn.replaceText = function (e, f, g) {
       return this.each(function () {
           var a = this.firstChild,
               c, b, d = [];
           if (a) {
               do 3 === a.nodeType && (c = a.nodeValue, b = c.replace(e, f), b !== c && (!g && /</.test(b) ? ($(a).before(b), d.push(a)) : a.nodeValue = b));
               while (a = a.nextSibling)
           }
           d.length && $(d).remove()
       })
   };
$(window).load(function () {
$('a').click(function(e){ alert('test') });
var a = ['Bois', 'Argile'];
var b = ['Дерево', 'Глина'];
for( var i = 0; i < a.length; i++ )
$("body *").replaceText(new RegExp( a[i], "g" ), b[i]);
    });

</script>