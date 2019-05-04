// ==UserScript==
// @author   JimmyJin
// @name     ameblo photo crawler
// @version  1.1
// @include       https://ameblo.jp*
// @description Get The photos on article page and album page on ameblo.
// @namespace https://greasyfork.org/users/241557
// ==/UserScript==

javascript:(function() {	
	var link = document.getElementsByTagName("header")[0];
	if (document.getElementsByTagName("header").length == 0)
		link = document.getElementById("header");

	var btn1 = document.createElement('button');
	var text = document.createTextNode('Open All Photos');
	btn1.id = "btn1";
	btn1.appendChild(text);
	var btn2 = document.createElement('button');
	var text = document.createTextNode('Copy All Photos\' Links');
	btn2.id = "btn2";
	btn2.appendChild(text);
	btn1.style.display = "block";
	btn2.style.display = "block";
	btn1.style.width = "200px";
	btn2.style.width = "200px";
	btn1.style.margin = "auto";
	btn2.style.margin = "auto";

	btn1.addEventListener("click", openAllPhotosOnArticle);
	btn2.addEventListener("click", copyAllPhotosLinksOnArticle);

	window.setInterval(openOnePhotoOnAlbum, 500); 
	window.setInterval(function() {
		link.after(btn1);
		link.after(btn2);
	}, 2000);

	function openOnePhotoOnAlbum(){
	    var d = document.getElementById("d");
	    if (d != null) d.remove();
	    var url = document.getElementsByTagName('img')[0].src;
	    var link = document.getElementById('entryDate');
	    var a =document.createElement('a');
	    var text =document.createTextNode('Open Photo');
	    a.appendChild(text);
	    a.setAttribute('href', url);
	    a.setAttribute('target', '_blank');
	    a.id = 'd';
	    a.style.fontSize = '24px';
	    link.after(a);
    }

	function openAllPhotosOnArticle(){
		var imgs = document.getElementsByTagName("img");
		var list = [];
		for (var i = 0; i < imgs.length; i++) {
			if (imgs[i].src.match("caw=800")) {
				list.push(imgs[i].src.replace("\?caw=800",""));
			}

			var delstr = imgs[i].src.slice(-33, -23);
			if(delstr.indexOf("t") == 0 && delstr.indexOf("_") == 9){
				var str = imgs[i].src.replace(delstr, "o");
				list.push(str);
			}
		}
		for (var i = 0; i < list.length; i++){
			var url = list[i];
			var a = document.createElement('a');
			a.setAttribute("href", url);
			a.setAttribute("target", "_blank");
			document.body.appendChild(a);
			a.click();
		}
	}

	function copyAllPhotosLinksOnArticle(){
		var imgs = document.getElementsByTagName("img");
		var list = [];
		for (var i = 0; i < imgs.length; i++) {
			if (imgs[i].src.match("caw=800")) {
				list.push(imgs[i].src.replace("\?caw=800",""));
			}

			var delstr = imgs[i].src.slice(-33, -23);
			if(delstr.indexOf("t") == 0 && delstr.indexOf("_") == 9){
				var str = imgs[i].src.replace(delstr, "o");
				list.push(str);
			}
		}
		var str = "";
		for (var i = 0; i < list.length; i++) {
			str = str + list[i] + " ";
		}
		
		var a = document.createElement('input');
		a.setAttribute("type", "text");
		a.setAttribute("value", str);
		a.setAttribute("id", "d");
		document.body.appendChild(a);
		
		var copyText = document.getElementById("d");
  		copyText.select();
  		document.execCommand("copy");
  		alert("Copy All Photos' Links DONE")
	}
})()


