// ==UserScript==
// @name        Money Tree Grabber
// @namespace   Synesthesia Labs
// @include     http://www.neopets.com/donations.phtml
// @version     1.1
// @grant       none
// @description Grabs stuff from money tree.
// ==/UserScript==
searches = ["morphing potion","paint brush", "transmogrification", "generous","codestone","bottled"," np","map"];







  

   

function clicklink(element)
{
    var event = document.createEvent("MouseEvents");
    event.initMouseEvent("click", true, true, document.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    element.dispatchEvent(event);
    return;
};
document.body.innerHTML = document.getElementById('mt-content').innerHTML;

       if ( ! new RegExp(searches.join("|")).test(document.body.innerHTML.toLowerCase())) {
        setTimeout("location.reload()",800);
       
}
else{
    
    var items = document.getElementsByClassName('donated');
for (index = 0; index < items.length; ++index) {
    
    
  if (new RegExp(searches.join("|")).test(items[index].innerHTML.toLowerCase())) {    
 
     
        match = items[index].getElementsByTagName('a')[0];
        
    }

}
    clicklink(match);
    
}
