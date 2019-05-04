// ==UserScript==
// @name        Lekhini.org-Customization
// @namespace   https://github.com/VenkataRaju/GreaseMonkeyScripts/raw/master/Lekhini.org/Lekhini.org-Customization
// @description Reduces text area height and moves radio buttons to down. Selects telugu text on Tab key.
// @match       http://lekhini.org/
// @version     2
// @grant       none
// ==/UserScript==

/** Version History
   2  : Selects telugu text on Tab key.
*/

(function()
{
  function $(id) document.getElementById(id);
  var txtInput = $("txtInput"), txtOutput = $("txtOutput"), outputArea = $("outputarea");
  txtInput.rows = 6;
  txtOutput.rows = 6;
  outputArea.insertBefore(txtOutput, outputArea.firstChild); 
  txtOutput.style.marginBottom = "10px";
  txtOutput.addEventListener("focus", function() txtOutput.select());
})();