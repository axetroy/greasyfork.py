// ==UserScript==
// @name          ExpandResourceCosts
// @namespace     www.eljercode.com
// @description   Expands shortened costs in buildings, research, and shipyard pages to full amounts
// @include       https://*playstarfleet*.com/buildings*
// @include       https://*stardrifte*.com/buildings*
// @version       1.0
// ==/UserScript==


if(/\.com\/building/i.test(document.location.href)){
 fConvertResourceCosts();
}

function fConvertResourceCosts() {
 var vSpans=document.getElementById('content').getElementsByTagName('span');
 if(vSpans.length>0){
  for(j=0;j<vSpans.length;j++) {
   if(/^[\d,]+$/m.test(vSpans[j].getAttribute('title'))) {
    vSpans[j].innerHTML=vSpans[j].getAttribute('title');
   }
  }
 }
}
