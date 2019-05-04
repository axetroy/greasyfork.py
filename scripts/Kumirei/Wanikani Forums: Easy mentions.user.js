// ==UserScript==
// @name         Wanikani Forums: Easy mentions
// @namespace    http://tampermonkey.net/
// @version      0.1.3
// @description  Mention users with the click of a button!
// @author       Kumirei
// @include      *community.wanikani.com*
// @include      *community.bunpro.jp*
// @require      https://greasyfork.org/scripts/5392-waitforkeyelements/code/WaitForKeyElements.js?version=115012
// @grant        none
// ==/UserScript==

(function() {
		waitForKeyElements('.post-controls .actions', function(e){
				var btn = document.createElement('button');
				btn.class = "widget-button btn-flat no-text btn-icon mention-button";
				btn.title = "Click to mention the author of this post";
				btn.style = "float: right";
				btn.innerHTML = '<svg class="fa d-icon d-icon-at svg-icon svg-node" aria-hidden="true"><use xlink:href="#at"></use></svg></button>';
				btn.onclick = function() {
						if (!$('#reply-control .reply-area').length) $('.btn-primary.create').click()
						var interval = setInterval(function(){
								if ($('button.quote').length) {
										$('.d-editor-input')[0].value += '@' + e.closest('article').find('.username a')[0].innerText + ' ';
										$('.d-editor-input').blur();
										$('.d-editor-input').focus();
										clearInterval(interval);
								}
						}, 100);
				}
				var E = e.closest('article');
				var oldBtn = E.find('button[title="Click to mention the author of this post"]');
				if (oldBtn.length) oldBtn.remove()
				e.after(btn);
		});
})();