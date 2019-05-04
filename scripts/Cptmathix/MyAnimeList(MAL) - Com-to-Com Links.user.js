// ==UserScript==
// @name            MyAnimeList(MAL) - Com-to-Com Links
// @version         1.1.6
// @description	    Add Com-to-Com link between user and comment user for every comment.
// @author          Cpt_mathix & N_Ox
// @include         *://myanimelist.net/profile*
// @include         *://myanimelist.net/comments*
// @exclude         *://myanimelist.net/profile/*/reviews
// @exclude         *://myanimelist.net/profile/*/recommendations
// @exclude         *://myanimelist.net/profile/*/clubs
// @exclude         *://myanimelist.net/profile/*/friends
// @grant           none
// @namespace https://greasyfork.org/users/16080
// ==/UserScript==

if (document.location.href.indexOf('profile') > -1) {
	var element = document.getElementById('lastcomment').getElementsByTagName('a');
	for(var i = 0; i < element.length; i++) {
		if (element[i] && element[i].innerHTML.indexOf("All Comments") > -1) {
			comtocom(element[i].href);
			break;
		}
	}
} else {
	comtocom(document.location.href);
}

function comtocom(url) {
	if (typeof jQuery == 'undefined') $ = unsafeWindow.$;

	url = url.replace(/&*show=\d*/g, "");
	var i = url.indexOf('id=');
	if (i == -1) return;
	url = '/comtocom.php?id1=' + url.substr(i + 3) + '&id2=';

	if (document.location.href.indexOf('profile') == -1) {
		$('div[id^=comBox] > table > tbody > tr').each(function () {
			var avatar = $('.picSurround img', this);
			if (!avatar.length) return;

			var com = $('div[id^=com]:not([id^=comtext])', this);
			if (!com.length) return;
			if (com.children().length == 3) return;

			var id = avatar.attr('src') || avatar.data("src");
			var i = id.indexOf('thumbs/');
			if (i == -1) return;
			id = id.replace(/\D+/g,'');

			com.append(
				$('<div style="margin-top:10px" align="right"/>').append(
					$('<a title="Comment-to-Comment">Conversation</a>').attr('href', url + id)));
		});
	} else {
		$('div[id^=comBox]').each(function () {
			if (this.getElementsByClassName('postActions ar mt4').length !== 0)
				return;

			var avatar = $('img', this);
			if (!avatar.length) return;

			var id = avatar.attr('src') || avatar.data("src");
			var i = id.indexOf('userimages/');
			if (i == -1) return;
			id = id.replace(/\D+/g,'');

			var div = document.createElement('div');
			div.className = 'postActions ar mt4 mr12';
			var link = document.createElement('a');
			link.href = url + id;
			link.innerHTML = "Conversation";

			div.appendChild(link);
			this.appendChild(div);
		});
	}
}
