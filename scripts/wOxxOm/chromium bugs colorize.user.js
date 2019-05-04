// ==UserScript==//
// @name           chromium bugs colorize
// @description    Colorize bug list based on status
// @match          https://bugs.chromium.org/p/*/list*
// @version        1.0.2
// @author         wOxxOm
// @namespace      wOxxOm.scripts
// @license        MIT License
// @run-at         document-start
// @require        https://greasyfork.org/scripts/12228/code/setMutationHandler.js
// ==/UserScript==

(document.head || document.documentElement).insertAdjacentHTML('beforeend', `
	<style>
		.wOxxOm-Starred { font-weight: bold }
		.wOxxOm-Archived { color: gray }
		.wOxxOm-Assigned { color: #3f71b1 }
		.wOxxOm-Available { color: #92479a }
		.wOxxOm-Duplicate,
		.wOxxOm-Invalid { opacity: 0.3 }
		.wOxxOm-ExternalDependency { color: #ababab }
		.wOxxOm-Fixed { color: #227700 }
		.wOxxOm-Started,
		.wOxxOm-FixPending { color: #06908b }
		.wOxxOm-Unconfirmed,
		.wOxxOm-New { color: black }
		.wOxxOm-Untriaged { color: #947911 }
		.wOxxOm-Verified, .wOxxOm-Accepted { color: #6a846f }
		.wOxxOm-WontFix { color: #d00 }
	</style>
`);

colorize(document.getElementsByTagName('td'));
setMutationHandler(document, 'td', colorize);

function colorize(nodes) {
	for (var i = 0, n; (n = nodes[i++]); ) {
		var text = n.textContent;
		if (!text)
			continue;
		text = text.trim();
		switch (text) {
			case 'Accepted':
			case 'Archived':
			case 'Assigned':
			case 'Available':
			case 'Duplicate':
			case 'ExternalDependency':
			case 'FixPending':
			case 'Fixed':
			case 'Invalid':
			case 'New':
			case 'Started':
			case 'Unconfirmed':
			case 'Untriaged':
			case 'Verified':
			case 'WontFix':
				n.parentNode.classList.add('wOxxOm-' + text);
				break;
			case '★':
				n.parentNode.classList.add('wOxxOm-Starred');
				break;
		}
	}
}
