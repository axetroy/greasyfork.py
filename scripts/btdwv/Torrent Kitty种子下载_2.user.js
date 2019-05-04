// ==UserScript==
// @name        Torrent Kitty种子下载_2
// @namespace   http://userscripts.org/users/useridnumber
// @description 在Torrent Kitty详细信息页面直接下载种子
// @include     http://www.torrentkitty.org/information/*
// @version     1.0.1
// @grant       none
// ==/UserScript==


var url = location.href.substring(40);
var tag = document.getElementsByClassName("ta-header");

var down_link = document.createElement("a");
down_link.setAttribute('href',"http://torrage.com/torrent/"+url+".torrent") 
down_link.appendChild(document.createTextNode('下载种子'));
tag[0].appendChild(down_link);