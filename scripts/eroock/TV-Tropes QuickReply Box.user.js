// ==UserScript==
// @name           TV-Tropes QuickReply Box
// @namespace      QuickReply
// @description    Adds a quick reply box to TvTropes forum discussion pages.
// @include        https://tvtropes.org/pmwiki/posts.php?discussion=*
// @version        1.3
// ==/UserScript==

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

var elements = getElementsByClass("button blue");
var button = elements[0];
button.style.display = "none";
var table = button.parentNode;
var URL = window.location.href;
var begin = URL.indexOf("discussion=") + "discussion=".length;
var end = URL.indexOf("&", begin);
if (end == -1)
	{ end = URL.length; }
var code = URL.substring(begin,end);

var click = document.createElement('script');
click.text = "function smileyClicked(evt) {\
        var editor = object('postedit');\
        var e = evt ? evt : window.event ? window.event : null;\
        var smile = e.target ? e.target : e.srcElement ? e.srcElement : null;\
        if(!smile.alt) return;\
        if(typeof editor.selectionStart == 'number')\
            editor.value = editor.value.substring(0, editor.selectionStart) + smile.alt + editor.value.substring(editor.selectionEnd, editor.value.length);\
        else if(document.selection) {\
            editor.focus();\
            var range = document.selection.createRange();\
            if(range.parentElement() != editor) return false;\
            if(typeof range.text == 'string')\
                range.text = smile.alt;\
        }else editor.value += smile.alt;\
        editor.focus();\
    }\
    object('smileyPanel').onclick = smileyClicked;\
    object('postedit').focus();"

var form = document.createElement('form');
form.setAttribute('id','post-form');
form.setAttribute('method','post');
form.setAttribute('action','forumaddpost.php');
form.setAttribute('class','gutter-top');
form.innerHTML = '<div class="column-box text-center">\
		<span class="float-right"></span>\
    Quick Reply<br /><textarea cols="50" rows="4" id="postedit" name="postedit"></textarea>\
    <div id="smileyPanel" title="click on a smiley to add that smiley markup to your post">\
    <img src="https://static.tvtropes.org/pmwiki/pub/smiles/arrow_up.png" alt="[up]" title="[up]" height="16" width="16">\
    <img src="https://static.tvtropes.org/pmwiki/pub/smiles/arrow_down.png" alt="[down]" title="[down]" height="16" width="16">\
    <img src="https://static.tvtropes.org/pmwiki/pub/images/Thumbs_up_emoticon_3268.png" alt="[tup]" title="[thumb up]" height="16" width="16">\
    <img src="https://static.tvtropes.org/pmwiki/pub/images/Thumbs_down_emoticon_3571.png" alt="[tdown]" title="[thumb down]" height="16" width="16">\
    <img src="https://static.tvtropes.org/pmwiki/pub/images/tinfoilsmall.GIF" alt="[wmg]" title="[wmg]" height="17" width="17">\
    <img src="https://static.tvtropes.org/pmwiki/pub/images/minis/award_star_gold_3.png" alt="[awesome]" title="[awesome]" height="16" width="16">\
    <img src="https://static.tvtropes.org/pmwiki/pub/images/bug.gif" alt="[bugs]" title="[bugs]" height="17" width="17">\
    <img src="https://static.tvtropes.org/pmwiki/pub/smiles/emoticon_evilgrin.png" alt="[evilgrin]" title="[evilgrin]" height="16" width="16">\
    <img src="https://static.tvtropes.org/pmwiki/pub/smiles/emoticon_grin.png" alt="[grin]" title="[grin]" height="16" width="16">\
    <img src="https://static.tvtropes.org/pmwiki/pub/smiles/emoticon_smile.png" alt="[smile]" title="[smile]" height="16" width="16">\
    <img src="https://static.tvtropes.org/pmwiki/pub/smiles/emoticon_surprised.png" alt="[surprised]" title="[surprised]" height="16" width="16">\
    <img src="https://static.tvtropes.org/pmwiki/pub/smiles/emoticon_tongue.png" alt="[tongue]" title="[tongue]" height="16" width="16">\
    <img src="https://static.tvtropes.org/pmwiki/pub/smiles/emoticon_unhappy.png" alt="[sad]" title="[sad]" height="16" width="16">\
    <img src="https://static.tvtropes.org/pmwiki/pub/smiles/emoticon_waii.png" alt="[waii]" title="[waii]" height="16" width="16">\
    <img src="https://static.tvtropes.org/pmwiki/pub/smiles/emoticon_wink.png" alt="[wink]" title="[wink]" height="16" width="16">\
    <img src="https://static.tvtropes.org/pmwiki/pub/smiles/lightbulb.png" alt="[idea]" title="[idea]" height="16" width="16">\
    <img src="https://static.tvtropes.org/pmwiki/pub/smiles/cool.png" alt="[cool]" title="[cool]" height="16" width="16">\
    <img src="https://static.tvtropes.org/pmwiki/pub/images/lol2v12_4863.png" alt="[lol]" title="[lol]" height="16" width="16">\
    <img style="vertical-align:middle;" src="https://static.tvtropes.org/pmwiki/pub/images/user_ninja_2074.png" alt="[nja]" title="[nja]" height="32" width="32">\
<a href="#" id="ImgUploaderLink" data-modal-target="upload_image"><i class="fa fa-image"></i> Upload Image</a>\
</div>\
<input type="hidden" value="' + code + '" name="discussion">\
<center><input type="submit" value="Send"></center>\
</div>';

table.appendChild(form);
table.appendChild(click);
