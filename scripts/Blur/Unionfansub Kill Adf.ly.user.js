// ==UserScript==
// @name        Unionfansub Kill Adf.ly
// @author		Blur
// @description Kill Unionfansub ADF.LY, facebook api and google plus.
// @icon         data:image/png;base64,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
// @include     http://*unionfansub.com/*
// @homepageURL https://greasyfork.org/en/scripts/12169-unionfansub-kill-adf-ly
// @license     CC BY-SA 4.0
// @version     0.8.8
// @grant       none
// @namespace Unionfansub Kill Adf.ly
// ==/UserScript==

/*
-License : CC BY-SA 4.0 = Creative Commons Attribution-ShareAlike 4.0 International License (https://creativecommons.org/licenses/by-sa/4.0/)
-Icon : 아악 (https://www.pixiv.net/member.php?id=22601389 - Image : https://www.pixiv.net/member_illust.php?mode=medium&illust_id=67397974) - License: x
-Last Change log
v0.8.8 : Clean Code and fix Links
v0.8.7 : -- script version for test in Violentmonkey
add/fix ->
		fix rolyads
		add cut-urls
		add uii.io
New -> Icon
*/

window.addEventListener('load', function() {
var links = document.links;
var link;
for (var i = links.length - 1; i >= 0; i--) {
	link = links[i];
	/* BASE */
	link.href = link.href.replace('adf.ly/3096066/int/', '');
	link.href = link.href.replace('apis.google.com/js/plusone.js', '');
	link.href = link.href.replace('cdn.adf.ly/static/js/entry_scriptV1.2.js', '');
	link.href = link.href.replace('cut-urls.com/st?api=c6bccde8bf2c8fb4eadd14b33b2cd296e40aa487&url=', '');
	link.href = link.href.replace('foro.unionfansub.com/plusone.php?url=', '');
	link.href = link.href.replace('http://adf.ly/3096066/int/', '');
	link.href = link.href.replace('http://apis.google.com/js/plusone.js', '');
	link.href = link.href.replace('http://cdn.adf.ly/static/js/entry_scriptV1.2.js', '');
	link.href = link.href.replace('http://foro.unionfansub.com/plusone.php?url=', '');
	link.href = link.href.replace('http://out.unionfansub.com/3096066/', '');
	link.href = link.href.replace('http://out.unionfansub.com/js/entry.js', '');
	link.href = link.href.replace('http://out.unionfansub.com/static/js/entry_scriptV1.2.js', '');
	link.href = link.href.replace('http://sh.st/st/22e035111b405ce11eb74e9a5c84527b/', '');
	link.href = link.href.replace('https://cut-urls.com/st?api=c6bccde8bf2c8fb4eadd14b33b2cd296e40aa487&url=', '');
	link.href = link.href.replace('https://rolyads.com/st?api=655a530fd76deeba7d2e42d26302286a70a7ae0a&url=', '');
	link.href = link.href.replace('https://uii.io/st?api=bca47e086f7467ddd7d6fff4af420a11613ebe21&url=', '');
	link.href = link.href.replace('mega.co.nz', 'mega.nz');
	link.href = link.href.replace('mega:///', 'http://mega.nz/');
	link.href = link.href.replace('out.unionfansub.com/3096066/', '');
	link.href = link.href.replace('out.unionfansub.com/js/entry.js', '');
	link.href = link.href.replace('out.unionfansub.com/static/js/entry_scriptV1.2.js', '');
	link.href = link.href.replace('rolyads.com/st?api=655a530fd76deeba7d2e42d26302286a70a7ae0a&url=', '');
	link.href = link.href.replace('sh.st/st/22e035111b405ce11eb74e9a5c84527b/', '');
	link.href = link.href.replace('sh.st/st/22e035111b405ce11eb74e9a5c84527b/out.unionfansub.com/3096066/', '');
	link.href = link.href.replace('uii.io/st?api=bca47e086f7467ddd7d6fff4af420a11613ebe21&url=', '');
	link.href = link.href.replace('www.facebook.com/plugins/like.php', '');
	link.href = link.href.replace('~~4dfl7SUCKS~~', '#');
	/* FIX LINKS */
	link.href = link.href.replace('foro.unionfansub.com/1fichier.com/', '1fichier.com/');
	link.href = link.href.replace('foro.unionfansub.com/antshare.net/', 'antshare.net/');
	link.href = link.href.replace('foro.unionfansub.com/dix3.com/', 'dix3.com/');
	link.href = link.href.replace('foro.unionfansub.com/dl.dropboxusercontent.com/', 'dl.dropboxusercontent.com/');
	link.href = link.href.replace('foro.unionfansub.com/drive.google.com/', 'drive.google.com/');
	link.href = link.href.replace('foro.unionfansub.com/filetrip.net/', 'filetrip.net/');
	link.href = link.href.replace('foro.unionfansub.com/mega.nz/#', 'mega.nz/#');
	link.href = link.href.replace('foro.unionfansub.com/rapidgator.net/', 'rapidgator.net/');
	link.href = link.href.replace('foro.unionfansub.com/uplea.com/', 'uplea.com/');
	link.href = link.href.replace('foro.unionfansub.com/uptobox.com/', 'uptobox.com/');
	link.href = link.href.replace('foro.unionfansub.com/usersfiles.com/', 'usersfiles.com/');
	link.href = link.href.replace('foro.unionfansub.com/wipfiles.net/', 'wipfiles.net/');
	link.href = link.href.replace('foro.unionfansub.com/www.4shared.com/', 'www.4shared.com/');
	link.href = link.href.replace('foro.unionfansub.com/www.fileflyer.com/', 'www.fileflyer.com/');
	link.href = link.href.replace('foro.unionfansub.com/www.gigasize.com/', 'www.gigasize.com/');
	link.href = link.href.replace('foro.unionfansub.com/www.mediafire.com/', 'www.mediafire.com/');
	link.href = link.href.replace('foro.unionfansub.com/www.solidfiles.com/', 'www.solidfiles.com/');
	link.href = link.href.replace('foro.unionfansub.com/www.ulozto.net/', 'www.ulozto.net/');
	link.href = link.href.replace('foro.unionfansub.com/www.uploadman.com/', 'www.uploadman.com/');
	link.href = link.href.replace('foro.unionfansub.com/www.uploads.ws/', 'www.uploads.ws/');
	link.href = link.href.replace('foro.unionfansub.com/www.wizupload.com/', 'www.wizupload.com/');
	link.href = link.href.replace('foro.unionfansub.com/www.xdisk.cz/', 'www.xdisk.cz/');
	link.href = link.href.replace('foro.unionfansub.com/www.xup.in/', 'www.xup.in/');
	link.href = link.href.replace('foro.unionfansub.com/www.ziddu.com/', 'www.ziddu.com/');
	link.href = link.href.replace('foro.unionfansub.com/www107.zippyshare.com/', 'www107.zippyshare.com/');
	link.href = link.href.replace('foro.unionfansub.com/xshare.cz/', 'xshare.cz/');
	link.href = link.href.replace('http://foro.unionfansub.com/1fichier.com/', '1fichier.com/');
	link.href = link.href.replace('http://foro.unionfansub.com/antshare.net/', 'antshare.net/');
	link.href = link.href.replace('http://foro.unionfansub.com/dix3.com/', 'dix3.com/');
	link.href = link.href.replace('http://foro.unionfansub.com/dl.dropboxusercontent.com/', 'dl.dropboxusercontent.com/');
	link.href = link.href.replace('http://foro.unionfansub.com/drive.google.com/', 'drive.google.com/');
	link.href = link.href.replace('http://foro.unionfansub.com/filetrip.net/', 'filetrip.net/');
	link.href = link.href.replace('http://foro.unionfansub.com/mega.nz/#', 'mega.nz/#');
	link.href = link.href.replace('http://foro.unionfansub.com/rapidgator.net/', 'rapidgator.net/');
	link.href = link.href.replace('http://foro.unionfansub.com/uplea.com/', 'uplea.com/');
	link.href = link.href.replace('http://foro.unionfansub.com/uptobox.com/', 'uptobox.com/');
	link.href = link.href.replace('http://foro.unionfansub.com/usersfiles.com/', 'usersfiles.com/');
	link.href = link.href.replace('http://foro.unionfansub.com/wipfiles.net/', 'wipfiles.net/');
	link.href = link.href.replace('http://foro.unionfansub.com/www.4shared.com/', 'www.4shared.com/');
	link.href = link.href.replace('http://foro.unionfansub.com/www.fileflyer.com/', 'www.fileflyer.com/');
	link.href = link.href.replace('http://foro.unionfansub.com/www.gigasize.com/', 'www.gigasize.com/');
	link.href = link.href.replace('http://foro.unionfansub.com/www.mediafire.com/', 'www.mediafire.com/');
	link.href = link.href.replace('http://foro.unionfansub.com/www.solidfiles.com/', 'www.solidfiles.com/');
	link.href = link.href.replace('http://foro.unionfansub.com/www.ulozto.net/', 'www.ulozto.net/');
	link.href = link.href.replace('http://foro.unionfansub.com/www.uploadman.com/', 'www.uploadman.com/');
	link.href = link.href.replace('http://foro.unionfansub.com/www.uploads.ws/', 'www.uploads.ws/');
	link.href = link.href.replace('http://foro.unionfansub.com/www.wizupload.com/', 'www.wizupload.com/');
	link.href = link.href.replace('http://foro.unionfansub.com/www.xdisk.cz/', 'www.xdisk.cz/');
	link.href = link.href.replace('http://foro.unionfansub.com/www.xup.in/', 'www.xup.in/');
	link.href = link.href.replace('http://foro.unionfansub.com/www.ziddu.com/', 'www.ziddu.com/');
	link.href = link.href.replace('http://foro.unionfansub.com/www107.zippyshare.com/', 'www107.zippyshare.com/');
	link.href = link.href.replace('http://foro.unionfansub.com/xshare.cz/', 'xshare.cz/');
}

function injectFunction(f) {
	var script = document.createElement("script");
	script.appendChild(document.createTextNode("(" + f.toString() + ")();"));
	document.documentElement.appendChild(script);
}

var myFunc = function () {
	String.prototype.realSubstring = String.prototype.substring;
	String.prototype.substring = function () {
		return "exit.html";
	};
};

injectFunction(myFunc);
var links, thisLink;
links = document.evaluate("//a[contains(@href, 'descarga.php?parche=')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
for (var i = 0; i < links.snapshotLength; i++) {
	var thisLink = links.snapshotItem(i);
	thisLink.href += '&format=zip';
}

window.legacyAlert = window.alert;
window.alert = function(msg, title, type, params) {
    var title = (title == null) ? 'Aviso' : title;
    var type = (type == null) ? 'warning' : type;
    swal($.extend({
            title: title,
            text: msg,
            type: type
        }, params || {})
    );
};

window.legacyConfirm = window.confirm;
window.confirm = function(msg, title, type, func_if_yes, func_if_cancel, params) {
    var title = (title == null) ? 'Confirmação' : title;
    var type = (type == null) ? 'warning' : type;
    swal($.extend({
                    title: title,
                    text: msg,
                    type: type,
                    showCancelButton: true,
                    cancelButtonText: "Cancelar",
                    confirmButtonText: "Ok",
                    allowEscapeKey: false,
                    allowOutsideClick: false
                }, params || {})
    ).then(function(isConfirm) {
        if (isConfirm && func_if_yes instanceof Function){
            func_if_yes();
        }
    }, function(dismiss) {
        if (dismiss === 'cancel' && func_if_cancel instanceof Function) {
            func_if_cancel()
        }
    })
};

(function ($) {
    "use strict";

    var $elemTimeout = $('*[role="alert"][data-alert-timeout]');

    $.each($elemTimeout, function (index, elem) {
        var elemTimeout = parseInt($(elem).data('elemTimeout'));
        $(elem).delay(elemTimeout).fadeOut(
            function () {
                $(elem).remove();
            }
        );
    });
})(jQuery);
}, false);