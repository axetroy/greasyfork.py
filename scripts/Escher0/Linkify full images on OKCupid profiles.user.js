// ==UserScript==
// @name			Linkify full images on OKCupid profiles
// @description		Makes profile photos clickable to see full size images
// @include			http*://www.okcupid.com/profile/*photos*
// @include			http*://www.okcupid.com/profile/*pictures*
// @namespace		pilnick.com
// @version			1.21
// ==/UserScript==

var img;
var src, newSrc;
var split;
var link;

window.setInterval(linkify,1000);

function linkify()
{
	img = document.getElementsByClassName('img');
	for(var n=0; n<img.length; n++){
		src=img[n].firstElementChild.src;
		if(src == null || src.indexOf("okccdn")<0){ continue; }
		split=src.split("/");
		newSrc="http://ak1.okccdn.com/php/load_okc_image.php/images/"+split[split.length-1];
		link = document.createElement('a');
		link.setAttribute("href",newSrc);
		link.setAttribute("target","_blank");
		link.innerHTML="<img src='"+src+"'>";
		img[n].replaceChild(link,img[n].firstElementChild);
	}
}