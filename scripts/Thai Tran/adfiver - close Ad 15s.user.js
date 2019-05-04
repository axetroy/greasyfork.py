// ==UserScript==
// @name         adfiver - close Ad 15s
// @namespace    http://your.homepage/
// @version      0.0
// @description adfiver - subpage - autoclose after 20 sec

// @author       You
// @match        http://www.adfiver.com/view.php?*
// @grant        none
// ==/UserScript==

function closeW(){
    self.close();
}

function doText() {

  var inputs = document.getElementsByTagName('span');
  var m='';
  for (var i = 0; i < inputs.length; i++)
  {
      m = m+'inputs[i].textContent+', ';
      if (inputs[i].textContent.indexOf('someone already')>0
         || inputs[i].textContent.indexOf('validated ')>0
         ) window.close();
      
    
  
  }
    alert(m);
}
var myInterval = setInterval(doText, 2000);

window.setTimeout('closeW', 15000);