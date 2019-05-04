// ==UserScript==
// @name			  Firepatrol
// @version			3.2.1
// @namespace		hugsmile.eu
// @description	Mark changes as patrolled on MediaWiki wikis.
// @icon        data:image/png;base64,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
// @include     *&diff=*
// @include     *?diff=*
// @include     *action=markpatrolled*
// @grant       window.close
// ==/UserScript==

// Firepatrol marks unreviewed (unpatrolled) changes as reviewed (patrolled).
// It uses the shortcut M. When the change has already been patrolled,
// you are taken to the next page.

language = 0; // 0 is Dutch, 1 is English
mKeyEnabled = false;
closeTab = true; // dom.allow_scripts_to_close_windows needs to be true

(function(){
	
document.addEventListener('keydown', function(e) {
  // pressed m
	patrolled = ["Gemarkeerd!", "Patrolled!"];
	tryagain = ["Probeer opnieuw", "Try again"];
	marking = ["Markeren als gecontroleerd...", "Marking as patrolled..."];

	var userLang = navigator.language || navigator.userLanguage;
	if(userLang.indexOf("nl-") === 0 || userLang == "nl"){
		language = 0;
	}

	function httpGetAsync(theUrl, nextLink)
	{
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
				done(xmlHttp.responseText, xmlHttp.statusText);
			}
		};
		xmlHttp.open("GET", theUrl, true); // true for asynchronous
		xmlHttp.send(null);
	}

	function done(responseText,statusText){
		if(statusText.indexOf("200") > -1 || statusText.indexOf("OK") > -1){
			document.getElementsByClassName("patrollink")[0].innerHTML = patrolled[language];
		}else{
			document.getElementsByClassName("patrollink")[0].innerHTML = tryagain[language];
		}

		try{
			location.href = document.getElementById("differences-nextlink").getAttribute("href");
		}catch(e){
			ifCloseTab();
		}
	}

	function ifCloseTab(){
		// there is no next link
		if(closeTab){
			setTimeout(function(){
				window.close();
			}, 500);
		}
	}

	function doNextAction(nextLink){
		if(nextLink === null){
		 	ifCloseTab();
		}else{
			window.location.href = nextLink;
		}
	}
	
  if ((e.keyCode == 120 || mKeyEnabled && e.keyCode == 77) && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
		
			var interval = setInterval(function(){
				  //document.title = "Markeren..";
				try{  
				  document.getElementsByClassName("patrollink")[0].getElementsByTagName("a")[0].textContent = marking[language];
				}catch(ex){
					// mark as patrolled does not exist, is this page already marked as patrolled?
				}
				
					if(document.readyState == "complete"){
				     doMark();
						clearInterval(interval);
					}
			}, 100);

  }
	
	function doMark(){
		var nextLink = document.getElementById("differences-nextlink");
			
			var patrolLink = document.getElementsByClassName("patrollink")[0];
		  if(patrolLink == undefined){
				doNextAction(nextLink);
				return;
			}
			patrolLink.getElementsByTagName("a")[0].click();
			setTimeout(function(){
					doNextAction(nextLink);
			}, 500);
	}
}, false);
})();