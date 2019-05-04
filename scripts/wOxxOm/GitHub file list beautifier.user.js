// ==UserScript==
// @name        GitHub file list beautifier
// @description Adds colors to files by type, displays small images in place of file-type icons in a repository source tree
// @author      wOxxOm
// @namespace   wOxxOm.scripts
// @license     MIT License
// @match       https://github.com/*
// @version     3.0.6
// @icon        https://octodex.github.com/images/murakamicat.png
// @run-at      document-start
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

/* jshint lastsemic:true, multistr:true, laxbreak:true, -W030, -W041, -W084 */

// Your changes will be remembered in script database even after a forced update of the script
var config = userConfig({
	iconSize: 24,
	colorSeed1: 13,
	colorSeed2: 1299721,
	colorSeed3: 179426453,
});

Object.assign((document.head || document.documentElement).appendChild(document.createElement('style')), {
  id: 'wOxxOm-GHB',
  textContent:
      '.wOxxOm-image-icon {\
          max-width:' + config.iconSize + 'px; max-height:' + config.iconSize + 'px;\
          width:auto; height:auto; margin:auto;\
          position:absolute; left:0; top:0; right:0; bottom:0 }\
      .wOxxOm-image-td {\
          position:relative; padding:0; min-width:' + (config.iconSize+4) + 'px; line-height:inherit }\
      a[file-type=":folder"] { font-weight: bold }',
});

var filetypes = {};
var styledom = document.getElementById('wOxxOm-GHB');

var filesdom = document.getElementsByTagName('table');
var ob = new MutationObserver(GHBsentry);

document.addEventListener('DOMContentLoaded', function() { beautify(filesdom[0]) });
beautify(filesdom[0]);
lazyObserve();

function GHBsentry(mutations) {
	if (!/^\/[^\/]+\/[^\/]+(\/tree\/.*)?$/.test(location.pathname)) {
		ob.disconnect();
		lazyObserve();
		return;
	}
	if (mutations.length == 1 && !mutations[0].addedNodes.length || !filesdom[0])
		return;
	//console.log([].concat.apply([], mutations.map(m => [].slice.call(m.addedNodes))));
	for (var i=0, ml=mutations.length, m; i<ml && (m=mutations[i]); i++) {
		for (var j=0, added=m.addedNodes, nl=added.length, n; j<nl && (n=added[j]); j++) {
			if (n.nodeType != 3) {
				if (n.localName == 'a' && /\/(tree|blob)\//.test(n.href) && !n.hasAttribute('file-type')
				||  n.localName == 'div' && n.matches('.file-wrap, .new-discussion-timeline, .repo-file-upload-tree-target')
				) {
					var table = n.closest('table') || n.querySelector('table');
					if (table) {
						beautify(table);
						ob.disconnect();
						lazyObserve();
						break;
					}
				}
			}
		}
	}
}

function lazyObserve() {
	// postpone observing until the parser can breathe after the initial burst of activity during page load
	setTimeout(function() {
		beautify(filesdom[0]);
		ob.observe(document, {subtree:true, childList:true});
	}, 0);
}

function beautify(container, links) {
	if (!container && !links)
		return;
	if (!links) {
		var table = container.localName == 'table' ? container : container.querySelector('table');
		if (!table)
			return;
		links = table.getElementsByClassName('js-navigation-open');
	}

    var didSomeWork = false;

	for (var a, i=0, len=links.length; i<len && (a=links[i++]); ) {
		if (!a.href)
			continue;
		var tr = a.closest('tr');
		if (tr && tr.querySelector('.octicon-file-directory')) {
			a.setAttribute('file-type', ':folder');
			continue;
		}

        didSomeWork = true;

		var ext = a.href.match(/\.(\w+)$/);
		ext = ext && ext[1] || ':empty';
		a.setAttribute('file-type', ext);
		if (!filetypes[ext])
			addFileTypeStyle(ext);

		if (/^(png|jpe?g|bmp|gif|cur|ico)$/.test(ext)) {
			var m = a.href.match(/github\.com\/(.+?\/)blob\/(.*)$/);
			if (!m)
				continue;
			var iconCell = a.closest('.js-navigation-item').querySelector('.icon');
			var icon = iconCell.querySelector('.octicon-file-text');

			if (icon.style.display == 'none')
				continue;
			icon.style.display = 'none';
			icon.insertAdjacentHTML('afterend',
									'<img class="wOxxOm-image-icon" src="https://raw.githubusercontent.com/' + m[1] + m[2] + '">');
			iconCell.classList.add('wOxxOm-image-td');
		}
	}

  if (didSomeWork && styledom !== document.documentElement.lastElementChild) {
      document.documentElement.appendChild(styledom);
  }
}

function addFileTypeStyle(type) {
	filetypes[type] = true;
	for (var hash=0, i=0, len=type.length; i<len; i++)
		hash = ((hash << 5) - hash) + type.charCodeAt(i);
	hash = Math.abs(hash*config.colorSeed1 |0);
	var color = 'a[file-type="' + type + '"] { color: hsl(' +
		(hash%360) + ',' +
		(hash*config.colorSeed2%50 + 50 |0) + '%,' +
		(hash*config.colorSeed3%15 + 25 |0) + '%) !important }';
	styledom.appendChild(document.createTextNode(color));
}

function userConfig(params) {
	var def = {
		iconSize: 24,
		colorSeed1: 13,
		colorSeed2: 1299721,
		colorSeed3: 179426453,
	};
	Object.keys(params).forEach(function(k) {
		var saved = GM_getValue(k, def[k]);
		if (saved && saved != def[k])
			params[k] = saved;
	});
	return params;
}
