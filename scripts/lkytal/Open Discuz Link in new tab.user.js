// ==UserScript==
// @name					Open Discuz Link in new tab
// @description				Discuz论坛链接默认新链接打开,支持autopager和Super_preloader等
// @include					http://*/forum-*-*
// @include					http://*/forum-*-*.html
// @include					http://*/showforum-*.html
// @include					http://*/forum.php?mod=forumdisplay*
// @include					http://*/forum/viewforum.php?f=*
// @include					http://*/forum/search.php?*
// @include					https://*/forum-*-*
// @include					https://*/forum-*-*.html
// @include					https://*/showforum-*.html
// @include					https://*/forum.php?mod=forumdisplay*
// @include					https://*/forum/viewforum.php?f=*
// @include					https://*/forum/search.php?*
// @namespace				Lkytal
// @author					lkytal
// @homepage				http://coldfire.qiniudn.com/
// @version					1.3.2
// @icon					http://lkytal.qiniudn.com/ic.ico
// @grant					unsafeWindow
// @run-at					document-end
// @homepageURL				https://git.oschina.net/coldfire/GM
// ==/UserScript==

var x = document.getElementById("atarget");

if (x)
{
	//x.click();
	unsafeWindow.setatarget(1);
}
else
{
	var AFile = document.querySelectorAll('#threadlist tbody a');

	for (var i = AFile.length - 1; i > -1; i--)
	{
		AFile[i].setAttribute("target", "_blank");
	}

	/*document.addEventListener('DOMNodeInserted',function()
		{
			LinkNew();
		}
	);*/
}
