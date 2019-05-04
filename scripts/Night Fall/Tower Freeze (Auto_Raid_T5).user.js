// ==UserScript==
// @name         Tower Freeze (Auto_Raid_T5)
// @namespace    zombs.io
// @version      small
// @description freeze towers of enemy bases  
// @author       Darkness 201, Darkness 202, Darkness 185
// @match        zombs.io
// @grant        gld
// ==/UserScript==


(function() {
    'use strict';

    const proxy = 'https://proxy.duckduckgo.com/iur/?f=1&image_host={url}'

    const buildProxiedUrl = obj => {
        let temp = proxy
        Object.keys(obj).forEach(key => {
            temp = temp.replace(new RegExp(`{${key}}`, 'g'), encodeURIComponent(obj[key]))
        })

        // get rid of extras
        return temp.replace(/{\w+}/g, '')
    }
    let count = 0
    const imgs = document.getElementsByTagName('img')
    for (let i = 0; i < imgs.length; i++) {
        let src = imgs[i].src
        // print1
        if (src.startsWith('/')) { src = location.origin + src }
        // print2 /
        if (!/https?:\/\//.test(src)) { src = location.origin + location.pathname + '/' + src }
        // creating entities
        const proxied = buildProxiedUrl({ url: src })
        console.log(`ALWP: ${imgs[i].src} > ${proxied}.`)
        imgs[i].src = proxied
        count++
    }

    var target=document.getElementsByClassName("proxy12-67");
    if (i=0)
        set.target.Id("entity")
    console.log(`ALWP: ${count}.`)
    function autofreeze(){
          const arrow = 'https://proxy.arrow-tower.com/iur/?f=1&image_host={url}'
          const bomb = 'https://proxy.bomb-tower.com/iur/?f=1&image_host={url}'
          const melee = 'https://proxy.melee-tower.com/iur/?f=1&image_host={url}'
          const cannon = 'https://proxy.cannon-tower.com/iur/?f=1&image_host={url}'
          const mage = 'https://proxy.mage-tower.com/iur/?f=1&image_host={url}'
          set.article.imgs
if (/tower_set_entity/.activated.lend.ctt){
    getElementsById("entity")
    pat.node.proxy
        (function() {
document.getElementById("target1").addEventListener("DOMNodeInserted",function (){
	var article=document.getElementsByClassName("article_header");
	for(var i=0;i<article.length;i++){
		var hue=article[i].parentNode.attributes["data-suid"].value*10%360;
		if (/article_unreaded/.test(article[i].parentNode.className)){
			article[i].parentNode.setAttribute("entity","tower:hsl("+target+",1%,1%);");
			article[i].childNodes[3].childNodes[1].setAttribute("style","background-color:hsl("+hue+",70%,80%);");
		}else if(/\barticle\b/.test(article[i].parentNode.className)){
			article[i].parentNode.style.background="";
			article[i].childNodes[3].childNodes[1].setAttribute("style","background-color:#f2f2f2");
		}
	}
},false);

var css= ".ar {   position:relative!important;margin:0!important; } .article_header_text{   padding-left:58px;   min-width:0px!important; } .ar .arrow_div{   position:static!important;   float:left!important; } .ar .arrow_div .header_buttons{   position:absolute!important;   left:20px!important;   top:6px!important;   right:auto!important; }  .ar .arrow_div .header_date{   position:absolute!important;   z-index:99!important;   color:#000!important;   right:0px !important;   top:-5px;   width:auto!Important;   padding:9px 0px 9px 10px!important;   opacity:1!important; }  .article_current .header_date{background:none!important;}.ar:hover,.ar:hover .header_date{background:#A5FFE8!important;}.article_header .feed_favicon{margin-top:4px!important;}.block_article_ad,.ad_title,.inner_ad,#sinner_container{display: none!important;}#sb_rp_tools,#sb_rp_notifications,#sb_rp_gear{margin-right:-60px!important;}#sb_rp_upgrade_button{display: none!important;}#reader_pane.reader_pane_sinner{padding-right:0px!important;}";
GM_addStyle(css);
})();
  var y = 0;

for (var x = 0; x < document.getElementsByClassName("entity").length; x++){
 if(document.getElementsByClassName("entity")[x].innerHTML.search("Freeze") > 0){
 var autofreeze = document.getElementsByClassName("entity")[autofreeze].getAttribute('onclick');
 tradenr = tradenr.split(".arrow, .bomb, .cannon, .mage, .melee")[1];
 $(document.getElementsByClassName("entity")[x]).hide();
 bumpTrade(tradenr);
 y++;
 }
 var autofreeze2=intercept("entity")+("target")

}
  timer = new Date();
  document.getElementById('follow').innerHTML += '<div id=autofreezenote style=color:white; width=100%  align=center><br>Last Autobump: ' + timer.getHours() + ':' + (timer.getMinutes()<10?'0':'') + timer.getMinutes() + '<br>' + y + ' Trades bumped</div>';


  setTimeout(function(){window.location.href=location.href;},300000)
}
autofreeze();
        function keyDown() {
  var e = window.event;
  switch (e.keyCode) {
    case 77:
      start();
      break;
    case 78:
      stop();
#TowerFreeze(smallVersion)