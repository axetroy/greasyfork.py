// ==UserScript==
// @name MAL Enhance Character Pages
// @description Adds report button on the main image and back to character profile/gallery link upon submitting new image.
// @author svaax@MAL
// @version 1.3
// @license GPL v3
// @namespace https://greasyfork.org/users/4672
// @include https://myanimelist.net/character/*
// @include https://myanimelist.net/character.php?id=*
// @include https://myanimelist.net/dbchanges.php?cid=*&t=addpicture
// ==/UserScript==

var url = document.URL,
	htmlcodecache,
	matchcode, node,
	addReportButton = true,
	optionsAlignment = 'center'; // default: center

// report main character pic
if (url.match('/character') && addReportButton == true)
{
	htmlcodecache = document.getElementsByTagName('table')[0].getElementsByTagName('div')[0];
	matchcode = htmlcodecache.innerHTML.match(/characters\/[0-9]+\/([0-9]+)\.jpg/)[1];

	node = $('#profileRows');
	if (!node.find('a[href*="report&type=charpic"]').length)
	{
		node.append('<a style="text-align: ' + optionsAlignment + ';" href="https://myanimelist.net/modules.php?go=report&amp;type=charpic&amp;id='+matchcode+'">Report Main Picture</a>');
	}
}

//character picture submission
else if (url.match('t=addpicture'))
{
	htmlcodecache = document.getElementsByClassName('goodresult')[0];
	if (htmlcodecache != undefined)
	{
		var firstlink = htmlcodecache.getElementsByTagName('a')[0];
		firstlink.innerHTML = "Back to Profile";
		var newlink = '<br /><br />' + firstlink.outerHTML + ' - <a href="' + firstlink + '/pictures">Back to Pictures</a>';
		htmlcodecache.innerHTML = htmlcodecache.innerHTML.replace(firstlink.outerHTML, newlink);
	}
}