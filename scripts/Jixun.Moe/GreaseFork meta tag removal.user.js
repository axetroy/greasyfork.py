// ==UserScript==
// @name         GreaseFork meta tag removal
// @version      1
// @description  Remove hyperlink such as @require.
/////////////////

/////////////////
// @grant        none
// @namespace    Jixun.Org
// @run-at       document-start
// @include      *://greasyfork.org/forum/discussion/*
// ==/UserScript==


addEventListener('DOMContentLoaded', function () {
	for (var q = document.querySelectorAll('a[href^="/forum/profile/"]'),
		metaList = [ 'description', 'downloadurl', 'exclude', 'grant', 'icon',
					 'run-at', 'run', 'include', 'match', 'name', 'namespace', 
					 'require', 'required', 'resource', 'unwrap', 'updateurl', 'version' ],
		style = document.createElement ('style'),
		i = 0; i < q.length; function (e) {
			// Ckeck if the link was in the meta list. If so, replace with <code>
			var d = e.href.match(/.+\/(.+)$/)[1];
			if (-1 != metaList.indexOf (d)) {
				var c = document.createElement ('span');
				c.className = 'meta-data';
				c.textContent = '@' + d;
				e.parentNode.insertBefore (c, e);
				e.parentNode.removeChild (e);
			}
		}
	(q[i++]));

	// Style code took from Github^TM;
	style.innerHTML = '.meta-data{margin:0;border:1px solid #DDD;background:#F8F8F8;border-radius:3px;display:inline-block;vertical-align: middle;line-height:1.3;padding:0 .3em}';
	document.body.appendChild (style);
}, false);