// ==UserScript==
// @name        MFP Liker
// @namespace   dumptyd
// @author      sadEmoji
// @description Likes every post, because why not?
// @include     *://*.myfitnesspal.com/
// @version     2.3
// @grant       GM_log
// @require     https://code.jquery.com/jquery-2.1.4.min.js
// ==/UserScript==
window.addEventListener('load', function(){
vscript=document.createElement('script');
vscript.src='https://code.jquery.com/jquery-2.1.4.min.js';
vscript.type='text/javascript';
vscript.id='fuck';
document.getElementsByTagName('head')[0].appendChild(vscript);
//likeLink=$('<a>').attr({'href':'#','class':'ember-view','id':'likeLink'});
//likeLink.html('Like all posts');
likeLink='<li><a href=javascript:; class="nav_button ember-view" id=likeLink>Like all posts</a></li>';
$('#nav-bg > ul').append(likeLink);
$('#ember1401 > ul').append(likeLink);
//$('#likeLink').wrap('<li></li>');
 $('#likeLink').on('click',function(){likeEverything();});
function likeEverything()
{
  $('#likeLink').html('Liking...');
  $('.like').not('.liked').each(function(){
		var clickEvent  = document.createEvent ('MouseEvents');
		clickEvent.initEvent ('click', true, true);
		this.dispatchEvent (clickEvent);
	});
  $('#likeLink').html('Liked');
}

},false);

