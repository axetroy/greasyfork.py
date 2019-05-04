// ==UserScript==
// @name MAL Report Abuse Stock Msg's
// @author svaax@MAL
// @version 1.1.1
// @license GPL v3
// @description Adds list of stock reasons on 'report abuse' page.
// @include https://myanimelist.net/modules.php?go=report&type=forummessage*
// @include https://myanimelist.net/modules.php?go=report
// @namespace https://greasyfork.org/users/4672
// ==/UserScript==

var textbox = document.getElementsByName("report")[0],
// textarea size | Defaults: 94 and 12
box_width = 94,
box_height = 12,

reasons = [ // stock msg's
	"Please delete this post. Thanks.",
	"Please clean this thread. Thanks.",
	"Signature is too large.",
	"Anime entry was denied.",
	"Manga entry was denied."
];

textbox.cols = box_width;
textbox.rows = box_height;

var reasonElem= document.createElement("div");
reasonElem.id = 'reasons';
reasonElem.style = 'padding: 5px 0px 0px 5px;';

var h2 = document.createElement("h2");
h2.appendChild(document.createTextNode("Stock Report Reasons:"));
reasonElem.appendChild(h2);

var reasonText = '';
function pastethis(k)
{
	textbox.value = k.text;
	window.scrollTo(0, textbox.offsetTop);
	textbox.focus();
	textbox.selectionStart = textbox.selectionEnd = textbox.value.length + k.text.length;
}

for (var r = 0; r < reasons.length; r++)
{
	var newAnchor = document.createElement("a");
	newAnchor.innerHTML = reasons[r];
	newAnchor.href = '#';
	newAnchor.onclick = function () { pastethis(this); return false; };
	
	reasonElem.appendChild(document.createTextNode( (((r+1).toString().length==1)?'*'+(r+1):(r+1)) + '. ' ));
	reasonElem.appendChild(newAnchor);
	reasonElem.appendChild(document.createElement("br"));
}

textbox.parentElement.appendChild(reasonElem);