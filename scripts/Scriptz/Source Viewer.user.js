// ==UserScript==
// @name	Source Viewer
// @name:de Seitenquelltext anzeiger
// @namespace	http://scriptz.de.to/
// @description	View Page Source of any Website.
// @description:de	Schauen Sie sich den Seitenquelltext von jeder belieben Website an.
// @include	*://*
// @version	6.7.0.6
// @icon	http://file1.npage.de/007324/77/bilder/favicon.ico
// @author	Scriptz
// @grant   GM_addStyle
// @grant unsafeWindow
// @supportURL mailto:scriptz@mail1a.de?subject=Source Viewer
// @copyright	2013+ , Scriptz
// @license Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License; http://creativecommons.org/licenses/by-nc-nd/3.0/
// ==/UserScript==

GM_addStyle("#viewthesource{border: solid 1px black;position: fixed;right: 0;left: 0;bottom: 0px;background-color: #9E9E9E;z-index: 9999;height: 33px;width: 130px;margin: auto;}");

// ==Source==
	unsafeWindow.viewthesource = function(){
    window.location="view-source:"+window.location;
};
// ==============

// ==Body==
body = document.body;
if(body !== null) {
	div2 = document.createElement("div");
	div2.setAttribute('id','viewthesource');
	div2.innerHTML = "<center><img alt='Hide' src='http://fs2.directupload.net/images/150909/sxcclyoz.png' onclick='javascript:hide()'></center>\n<a href='javascript:viewthesource()' onclick='javascript:viewthesource()'>Click to view source!</a>";
	body.appendChild(div2);
}
// ==============

// ==Hide==
	unsafeWindow.hide = function(){
	var a = new Date();
	a = new Date(a.getTime() +1000*60*60*24*365);
	document.cookie = 'sourcefunction=hide; path=/; expires='+a.toGMTString()+';';
        console.info('Set "sourcefunction=hide" cookie for '+window.location);
        GM_addStyle("#viewthesource{border: solid 1px black;position: fixed;right: 0;left: 0;bottom: 0px;background-color: #9E9E9E;z-index: 9999;height: 15px;width: 45px;margin: auto;}");
        document.getElementById("viewthesource").innerHTML = "<center><img alt='Show' src='http://fs2.directupload.net/images/150909/7tae9l8k.png' onclick='javascript:show()'></center>";
};
	if (document.cookie.indexOf("sourcefunction=hide") >= 0) {
    GM_addStyle("#viewthesource{border: solid 1px black;position: fixed;right: 0;left: 0;bottom: 0px;background-color: #9E9E9E;z-index: 9999;height: 15px;width: 45px;margin: auto;}");
    document.getElementById("viewthesource").innerHTML = "<center><img alt='Show' src='http://fs2.directupload.net/images/150909/7tae9l8k.png' onclick='javascript:show()'></center>";
}
// ==Show==
	unsafeWindow.show = function(){
    document.cookie = 'sourcefunction=hide; path=/; expires=Thu, 01-Jan-70 00:00:01 GMT;';
        console.warn('Delete "sourcefunction=hide" cookie for '+window.location);
        GM_addStyle("#viewthesource{border: solid 1px black;position: fixed;right: 0;left: 0;bottom: 0px;background-color: #9E9E9E;z-index: 9999;height: 33px;width: 130px;margin: auto;}");
        document.getElementById("viewthesource").innerHTML = "<center><img alt='Hide' src='http://fs2.directupload.net/images/150909/sxcclyoz.png' onclick='javascript:hide()'></center>\n<a href='javascript:viewthesource()' onclick='javascript:viewthesource()'>Click to view source!</a>";
};
// ==============