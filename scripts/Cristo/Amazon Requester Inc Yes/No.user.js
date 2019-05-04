// ==UserScript==
// @name       Amazon Requester Inc Yes/No
// @version    0.1
// @description Use keys to select options in the Mturk Hit
// @description  Keys A,S,D to pick and W Key to submit 
// @author     Cristo
// @include    https://www.mturkcontent.com/dynamic*
// @copyright  2012+, You
// @namespace https://greasyfork.org/users/1973
// ==/UserScript==

var cI = 0;
var page = document.getElementById("mturk_form"); 
var table = page.getElementsByClassName("optionsTable");
var radio = table[cI].getElementsByClassName("nodeLeaf");
var sub = document.getElementById("submitBtn");

page.tabIndex = 0;
page.focus();
table[cI].scrollIntoView(false);

function moveGrove(){
	cI++;
    radio = table[cI].getElementsByTagName("input");
    table[cI].scrollIntoView(false);
   
}
document.addEventListener( "keydown", kas, false);
		function kas(i) {
			if (i.keyCode == 65) { //A   
                radio[0].click();
                moveGrove();
			}    
			if (i.keyCode == 83) { //S 
                radio[1].click();
                moveGrove();
			}    
			if (i.keyCode == 68) { //D  
                radio[2].click();
                moveGrove();
			}    
			if (i.keyCode == 87) { //W  
                sub.click();
			} 
        }