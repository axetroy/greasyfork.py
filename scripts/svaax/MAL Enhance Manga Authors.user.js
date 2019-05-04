// ==UserScript==
// @name MAL Enhance Manga Authors
// @description Function to add published manga manually by ID instead of searching title first.
// @author svaax@MAL
// @namespace https://greasyfork.org/users/4672
// @version 1.1
// @license GPL v3
// @include https://myanimelist.net/dbchanges.php?go=voiceactor&do=publishedmanga&id=*
// ==/UserScript==

document.getElementById("publishedManga").outerHTML += '<br /><div id="publishedManga2"><a id="addManualBox" href="javascript:void(0);">Add manually by id (+1)</a> </div><small style="padding-left:10px">*Don\'t ever leave empty fields! It won\'t be submitted properly.</small><br />';

var counter = 1,
	publishedMangaDiv = document.getElementById("publishedManga2");

document.getElementById('addManualBox').addEventListener('click', function()
{
	var newDiv1 = document.createElement('div');
		newDiv1.className = 'spaceit';
		newDiv1.id = 'mm' + counter;
	newDiv1.innerHTML = '<input type="text" size="10" class="inputtext" name="manga_id[]">&nbsp;<select name="jtype[]" class="inputtext"><option value="sa" selected="selected">Story and Art</option><option value="s">Story</option><option value="a">Art</option></select>  <a onclick="removeDiv(\'m'+counter+'\')" href="javascript:void(0);">Remove</a>';

	publishedMangaDiv.appendChild(newDiv1);
	counter++;
	delete newDiv1;
}, false);

//document.getElementById('addManualBox').click();
