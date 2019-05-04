// ==UserScript==
// @name           AwfulPeople
// @namespace      AwfulPeople
// @description    Tagging users on the Something Awful forums
// @oujs:author    Hargrimm
// @version        1.1
// @icon	   http://i.imgur.com/umzk8d9.png
// @include        http://forums.somethingawful.com/showthread.php*
// @include        https://forums.somethingawful.com/showthread.php*
// @grant          GM_addStyle
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

(function(){	
	$('.bbc-block blockquote').css('color','black'); 
})();

GM_addStyle('span.apLabel {color: green; background: black;}');
GM_addStyle('.apBtn {cursor: pointer; width: 12px;}')

//Dummy labels to populate localstorage on first run
if(localStorage.getItem('apFirstRun') != '1') {
	names = ["MonsterDunk","Jefferoo",];
	labels = ["Jeff Gerstmann","Habitual shitposter. User loses posting privileges for 1 week."];
	
	localStorage.setItem('names',JSON.stringify(names));
	localStorage.setItem('labels',JSON.stringify(labels));
	localStorage.setItem('apFirstRun','1');
}

if(localStorage.getItem('apFirstRun') == '1') {
	names = JSON.parse(localStorage.getItem('names'));
	labels = JSON.parse(localStorage.getItem('labels'));
}

$(window).load(function(){
	//Counter for which user's post each button is attached to
	var u = 0;

	var usrBtns = $('.postdate');

	$('.author ').each(function(){
		var poster = $(this).text();
		var labelBtn = document.createElement("img");
		
		genBtn();
		
		$(labelBtn).appendTo(usrBtns[u]);
		u = u + 1;
		
		for (var i in names) {
			if (names[i] == poster){
				$('<span class="apLabel">' + labels[i] + '</span>').insertAfter(this);
			}
		}
		
		function genBtn() {
			labelBtn.setAttribute('src', 'http://i.imgur.com/umzk8d9.png');
			labelBtn.setAttribute('class','apBtn');
			labelBtn.setAttribute('title', 'Add user label');
			labelBtn.setAttribute('id','ap' + u);
			labelBtn.addEventListener('click', addLabel, false);
		}
		
		function addLabel() {
			//Get user that you're labeling (this is probably terrible)
			var user = $('.author').eq($(this).attr('id').slice(2));
			var userName = user.text();
			var newLabel = prompt("Enter label for " + userName + ": (OK with no text to delete existing)");
			
			if(newLabel !== null) {
				replaceLabel(userName);
			
				//Add new name/label pair and update localstorage
				if(newLabel !== "") {
					names.push(userName);
					labels.push(newLabel);
				}
				localStorage.setItem('names',JSON.stringify(names));
				localStorage.setItem('labels',JSON.stringify(labels));
				
				//Remove any old label and add new
				$(user).siblings('.apLabel').remove();
				$('<span class="apLabel">' + newLabel + '</span>').insertAfter(user);
			}
			else {
				alert("No label added!");
			}
		}
		
		function replaceLabel(poster) {
			for (i = 0; i < names.length; i++) {
				if (names[i] == poster) {
					names.splice(i,1);
					labels.splice(i,1);
				}
			}
		}
	});
});