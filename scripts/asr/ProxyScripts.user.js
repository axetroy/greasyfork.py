// ==UserScript==
// @name           ProxyScripts
// @namespace      www.facebook.com/anshu.sr
// @grant none
// @description    This script proxifies (www)youtube/embed|watch, collegehumor or force-ssl by google proxy when no rules are set;
// @version 1.31
// ==/UserScript==

(function(){
	a = document.title;
	console.log(a);
	if(a.match(/Proxy(\d)* - Access Denie/gi)) k = confirm("Do you want to proxify this page?");
	flag = 0;
	if(k) {
  
		a = document.location.toString();
		/*
			Add your own rule to the array urlPart and place the replacement url part but in the SAME index in replacewith or things will break

		*/
		urlPart = ["http://www.collegehumor.com","0/99/0","/embed/","appspot.com/watch","https://www.youtube.com","http://youtube.com","http://www.youtube.com"];
		replaceWith = ["http://54.209.142.181","0/7/0","/watch?v=", "appspot.com/www.youtube.com/watch","http://www.youtube.com","http://www.youtube.com","http://proxypro47.appspot.com/www.youtube.com"];
		
		for(i=0;i<urlPart.length;i++){	
			if(a.search(urlPart[i])!=-1) flag = 1;
			a = a.replace(urlPart[i],replaceWith[i]);
			console.log(flag+" "+urlPart[i]);
		}
		b = a ;
		if(flag==0){
			console.log("Last resort used");
			flag=1;
	  		b = a.replace("https://", "https://proxy-mirror.appspot.com/");	
			b = b.replace("http://", "https://proxy-mirror.appspot.com/");	
  		}
		if(flag==1) document.location = b;
	}

})();