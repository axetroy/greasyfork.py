// ==UserScript==
// @name         is.gd auto pronouncable
// @namespace    https://github.com/Alistair1231/
// @version      0.1
// @description  auto selects 'lowercase pronouncable'
// @author       Alistair1231
// @match        https://is.gd/
// @grant        none
// @license GPL-3.0
// @copyright 2018, Alistair1231 (https://openuserjs.org/users/Alistair1231)
// ==/UserScript==


// ==OpenUserJS==
// @author Alistair1231
// ==/OpenUserJS==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
addJQuery(main);

function main(){
jQ( document ).ready
(
	setTimeout(function()
	{
		jQ('label[onclick*="shorturlon()"]').click();
        jQ('label[for="r3"]').click();
        jQ('input[class="urlbox"]').select();
	},200)
)();}
