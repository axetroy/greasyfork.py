// ==UserScript==
// @name           Back to Top figuccio
// @author         figuccio
// @namespace https://greasyfork.org/users/237458
// @description    Add button to return top of each page.
// @version        0.5
// @include        *
// ==/UserScript==
// Create black to top.
	var a = document.createElement('span');
	a.innerHTML = "🡹";
	var c = "position:fixed;text-align:right;right:170px;bottom:2px;z-index:50000;";
	c+='color:red!important;background-color:green;border:2px solid blue;padding:6px 15px;font-size:11pt;cursor:pointer;font-weight:bold;text-decoration:none;border-top-right-radius:12px;border-top-left-radius:12px;box-shadow:0 0 6px rgba(0,0,0,.5);';
	a.style.cssText = c;
	a.addEventListener('click', function(){ window.scrollTo(0,0); }, false);
document.body.appendChild(a);
//pulsante in basso
var newHeight = document.body.scrollHeight;
var b = document.createElement('span');
b.addEventListener('click', function(){ window.scrollTo(0,newHeight); }, false);
document.body.appendChild(b);
var lastScrollY=0;
(function gotop(){
	var diffY;
        diffY = document.documentElement.scrollTop+document.body.scrollTop;
	percent=.1*(diffY-lastScrollY);
	if(percent>0)percent=Math.ceil(percent);
	else percent=Math.floor(percent);
	lastScrollY=lastScrollY+percent;
	if(lastScrollY>500){
	a.style.display="block";b.style.display="block";
	} else {
    b.style.display="block";a.style.display="none";
	}
        setTimeout(gotop,1);
})();
