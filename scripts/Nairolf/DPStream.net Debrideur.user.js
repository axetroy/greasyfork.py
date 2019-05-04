// ==UserScript==
// @name        DPStream.net Debrideur
// @namespace   Nairolf
// @description Permet de débrider en un clic tous les liens Purevid
// @include     http://www.dpstream.net/film-*
// @include     http://www.dpstream.net/serie-*
// @include     http://www.dpstream.net/manga-*
// @version     1.1
// @grant       none
// ==/UserScript==
(function getVideo() {
  var vi = document.getElementsByTagName('iframe');
  var li = [];
  for (var i = 0; i < vi.length; i++) {
    if (vi[i].src.indexOf('purevid.com') !== -1) {
      a = document.createElement('a');
      a.href = "http://debrideur.org/purevid-"+vi[i].src.split("id=")[1]+".html"; //debrideur.org
      a.href = "http://www.mondebrideur.com/pureapi.php?id="+vi[i].src.split("id=")[1]; //mondebrideur.org
      a.target = "_blank";
      a.innerHTML = "Debrider";
      a.style = " background: #6CB5F3; border:solid 1px #b2dcff; border-radius:5px;  color: #ECEEEF; display: block; font: 30px sans-serif; margin: 7px auto 15px; padding: 5px 0; width: 200px; -webkit-box-shadow: 0px 5px 0px #39688f; -moz-box-shadow: 0px 5px 0px #39688f; box-shadow: 0px 5px 0px #39688f;";
      vi[i].parentNode.insertBefore(a, vi[i].nextSibling);
      li.push(vi[i]);
    };
  };
  if(li.length === 0) {setTimeout(getVideo, 2000);}
})()
var links = document.getElementById('divliste').getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {links[i].setAttribute("onclick", links[i].getAttribute("onclick").split(";")[0]+";getVideo();return false;");};