// ==UserScript==
// @name MAL Enhance People Pages
// @description Formats how full name appears on the profile and adds few additional links.
// @author svaax@MAL
// @namespace https://greasyfork.org/users/4672
// @version 1.3.2
// @license GPL v3
// @include https://myanimelist.net/people*
// @grant none
// ==/UserScript==

var htmlcodecache = $('table td[style="border-width: 0 1px 0 0;"]')[0],
	given_name,	family_name,
	search = $('<div style="padding-bottom: 3px;"><span class="dark_text">Search author on:</span><br>&nbsp;</div>')[0],
	full_name = document.getElementsByTagName('h1')[0].innerHTML.replace(',', '').replace(/ /g, '+'),
	formatPeopleName = 1, /* format name to one line */
	removeComma = 0, /* remove colon from the header */
	alternatveName = htmlcodecache.innerHTML.indexOf("Alternate name") != -1 ? 1 : 0;
	
	$('table td[style="border-width: 0 1px 0 0;"] span:contains(Website)').next().attr("target", "_blank");

// manga updates search
var a = $('<a href="https://www.mangaupdates.com/authors.html?search=' + full_name + '" target="_blank" style="font-size: 90%; font-style: italic;">MU</a>')[0];
search.appendChild(a)

// anidb
var anidb = $('<a href="http://anidb.net/perl-bin/animedb.pl?adb.search=' + full_name + '&show=creatorlist&do.search=search" target="_blank" style="font-size: 90%; font-style: italic;">AniDB</a>')[0];
document.createElement('a');
search.appendChild(document.createTextNode(', '));
search.appendChild(anidb);
	
// wikipedia.jp search link
var wiki = $('<a href="https://ja.wikipedia.org/w/index.php?title=%E7%89%B9%E5%88%A5%3A%E6%A4%9C%E7%B4%A2&search=' + full_name + '&go=%E8%A1%A8%E7%A4%BA" target="_blank" style="font-size: 90%; font-style: italic;">Wikipedia.jp</a>')[0];
search.appendChild(document.createTextNode(', '));
search.appendChild(wiki);

if (htmlcodecache.children[4].innerHTML.indexOf("Given name") != -1)
{
	htmlcodecache.insertBefore(search, htmlcodecache.children[10]);
	
	given_name = htmlcodecache.children[4].childNodes[1].nodeValue.trim();
	family_name = htmlcodecache.children[5].nextSibling.nodeValue.trim();
	
	if ((given_name.length + family_name.length) > 0)
	{
		// format name to one line
		if (formatPeopleName == 1)
		{
			htmlcodecache.removeChild(htmlcodecache.children[5].nextSibling);
			htmlcodecache.removeChild(htmlcodecache.children[5]);
			htmlcodecache.removeChild(htmlcodecache.children[4]);
			
			var div = $('<div class="spaceit_pad" style="font-size: 22px; text-align: center; padding-top: 22px">' + family_name + '</div>')[0];
			var span = $('<span style="margin-left: 6px">' + given_name + '</span>')[0];
			div.appendChild(span);
			
			htmlcodecache.insertBefore(div, htmlcodecache.children[3]);
		}
		wiki.href = 'https://ja.wikipedia.org/w/index.php?title=%E7%89%B9%E5%88%A5%3A%E6%A4%9C%E7%B4%A2&search=' + family_name + given_name +'&go=%E8%A1%A8%E7%A4%BA';
		anidb.href = 'http://anidb.net/perl-bin/animedb.pl?adb.search=' + family_name + given_name + '&show=creatorlist&do.search=search';
	}
}

else
{
	htmlcodecache.insertBefore(search, htmlcodecache.children[8]);
}

// create twitter/facebook/pixiv /yfrog/ tumblr etc. link
htmlcodecache.innerHTML = htmlcodecache.innerHTML
	.replace(/Twitter: @([^<\s]+)/ig, 'Twitter: @<a href="https://twitter.com/$1" target="_blank">$1</a>')
	.replace(/Facebook: @([^\s<]+)/i, 'Facebook: @<a href="https://www.facebook.com/$1" target="_blank">$1</a>')
	.replace(/Facebook: #([0-9]+)/i, 'Facebook: #<a href="https://www.facebook.com/profile.php?id=$1" target="_blank">$1</a>')
	.replace(/(?:pixiv([0-9])|pixiv id|pixiv): (?:#|)([0-9^\s]+)/ig,'pixiv$1: #<a href="http://www.pixiv.net/member.php?id=$2" target="_blank">$2</a>')
	.replace(/Yfrog: (?:[@^\s]*)([^<\s]+)/ig, 'Yfrog: @<a href="http://twitter.yfrog.com/user/$1/profile" target="_blank">$1</a>')
	.replace(/tumblr: (?:[@^\s]*)([^<\s]+)/ig, 'tumblr: @<a href="http://$1.tumblr.com/" target="_blank">$1</a>')
	.replace(/Youtube: (?:[@^\s]*)([^<\s]+)/i, 'Youtube: @<a href="https://www.youtube.com/user/$1" target="_blank">$1</a>')
	.replace(/Nicovideo: mylist\/([[0-9^\s]+)/i, 'Nicovideo: <a href="http://www.nicovideo.jp/mylist/$1" target="_blank">mylist/$1</a>')
	.replace(/Deviantart: (?:[@^\s]*)([^<\s]+)/i, 'Deviantart: @<a href="http://$1.deviantart.com/" target="_blank">$1</a>');

// remove colon that's in person name
if (removeComma == 1) $('#contentWrapper h1')[0].innerHTML = $('#contentWrapper h1')[0].innerHTML.replace(',','');