// ==UserScript==
// @name          Autoload Youtube comments
// @include       https://www.youtube.com/*
// @description   Autoloads all comments on Youtube when the video page is opened
// @version       1.1.4
// @author        wOxxOm
// @namespace     wOxxOm.scripts
// @license       MIT License
// @run-at        document-start
// @require       https://greasyfork.org/scripts/12228/code/setMutationHandler.js
// ==/UserScript==

window.addEventListener('DOMContentLoaded', processPage);
window.addEventListener('spfdone', processPage);

function processPage(e) {
	console.log(e);
	var more = document.querySelector('#watch-description + button');
	var comments = document.querySelector('#watch-discussion');
	if (!more) {
		if (!comments)
			return;
		setStyle(comments, 'relative', '-' + comments.getBoundingClientRect().top + 'px', 'hidden');
		setMutationHandler(comments, '*', function() {
			setStyle(comments, '', '', 'visible');
			this.disconnect();
		});
	}

	setMutationHandler(comments, '.comment-section-renderer-paginator', function(nodes) {
		more = nodes[0];
		more.running = true;

		var stop = document.querySelector('button.all-comments');
		if (!stop) {
			stop = comments.insertBefore(document.createElement('button'), comments.firstElementChild);
			stop.className = 'all-comments';
			stop.textContent = 'Stop autoloading comments';
			stop.style.marginBottom = '1em';
			stop.style.cursor = 'pointer';
			stop.addEventListener('click', function() {
				more.running = !more.running;
				this.textContent = (more.running ? 'Stop' : 'Start') + ' autoloading comments';
			});
		}

		clickMore();
		//return true;
	});

	function setStyle(element, pos, top, vis) {
		element.style.setProperty('position', pos);
		element.style.setProperty('top', top);
		element.style.setProperty('visibility', vis);
	}

	function clickMore() {
		if (!more.running)
			return;
		var viewAll = document.querySelectorAll('.comment-replies-renderer-paginator');
		for (var v, vl = viewAll.length, i = 0; (i < vl) && (v = viewAll[i]); i++) {
			if (!more.running)
				return;
			v.click();
		}
		more.click();
		setMutationHandler(comments, '.comment-entry', function() {
			this.disconnect();
			setTimeout(function() { clickMore() }, 2000);
		});
	}
}
