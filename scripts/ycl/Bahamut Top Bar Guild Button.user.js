// ==UserScript==
// @name              Bahamut Top Bar Guild Button
// @name:zh-TW        全站天公會入口按鈕
// @description       Restore Top Bar Guild button on gamer.com.tw
// @description:zh-TW 把全站天公會入口按鈕帶回來
// @namespace         https://greasyfork.org/users/43801
// @author            ycl <https://greasyfork.org/users/43801>
// @version           1
// @grant             none
// @match             *://*.gamer.com.tw/*
// @run-at            document-end
// ==/UserScript==

window.addEventListener('load', function() {
var topbar = document.getElementById('BH-top-data')
var top_my = document.getElementsByClassName('TOP-my')[0]
var unorderedList = top_my.getElementsByTagName('ul')[0]
var guildButton = document.createElement('li')
var guildLink = document.createElement('a')
guildLink.id = 'topBar_guild'
if(window.location.host=="www.gamer.com.tw"){
  guildLink.classList.add('topbtn3')
}
var hrefAtt = document.createAttribute('href');
hrefAtt.value = "javascript:TOPBAR_show('guild', '')"
if(window.location.host=="www.gamer.com.tw"){
  hrefAtt.value = "javascript:TOPBAR_show('guild', 'topbtn3', 'topbtn3now')"
}
guildLink.attributes.setNamedItem(hrefAtt)
var guildIcon = document.createElement('img')
var srcAtt = document.createAttribute('src')
srcAtt.value = 'https://i2.bahamut.com.tw/top_icon1.png'
guildIcon.attributes.setNamedItem(srcAtt)
guildLink.appendChild(guildIcon)
guildButton.appendChild(guildLink)
unorderedList.insertBefore(guildButton, unorderedList.childNodes[0])
console.log('Done adding guild button')

})