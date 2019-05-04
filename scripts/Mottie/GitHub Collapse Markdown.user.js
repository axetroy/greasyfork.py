// ==UserScript==
// @name        GitHub Collapse Markdown
// @version     1.2.0
// @description A userscript that collapses markdown headers
// @license     MIT
// @author      Rob Garrison
// @namespace   https://github.com/Mottie
// @include     https://github.com/*
// @include     https://gist.github.com/*
// @include     https://help.github.com/*
// @run-at      document-idle
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_registerMenuCommand
// @require     https://greasyfork.org/scripts/28721-mutations/code/mutations.js?version=666427
// @icon        https://github.githubassets.com/pinned-octocat.svg
// ==/UserScript==
(() => {
	"use strict";

	const defaultColors = [
			// palette generated by http://tools.medialab.sciences-po.fr/iwanthue/
			// (colorblind friendly, soft)
			"#6778d0", "#ac9c3d", "#b94a73", "#56ae6c", "#9750a1", "#ba543d"
		],

		blocks = [
			".markdown-body",
			".markdown-format",
			"" // leave empty string at the end
		],

		headers = "H1 H2 H3 H4 H5 H6".split(" "),
		collapsed = "ghcm-collapsed",
		arrowColors = document.createElement("style");

	let startCollapsed = GM_getValue("ghcm-collapsed", false),
		colors = GM_getValue("ghcm-colors", defaultColors);

	// .markdown-body h1:after, .markdown-format h1:after, ... {}
	GM_addStyle(`
		${blocks.join(" h1,")} ${blocks.join(" h2,")}
		${blocks.join(" h3,")} ${blocks.join(" h4,")}
		${blocks.join(" h5,")} ${blocks.join(" h6,").slice(0, -1)} {
			position:relative;
			padding-right:.8em;
			cursor:pointer;
		}
		${blocks.join(" h1:after,")} ${blocks.join(" h2:after,")}
		${blocks.join(" h3:after,")} ${blocks.join(" h4:after,")}
		${blocks.join(" h5:after,")} ${blocks.join(" h6:after,").slice(0, -1)} {
			display:inline-block;
			position:absolute;
			right:0;
			top:calc(50% - .5em);
			font-size:.8em;
			content:"\u25bc";
		}
		${blocks.join(" ." + collapsed + ":after,").slice(0, -1)} {
			transform: rotate(90deg);
		}
		/* clicking on header link won't pass svg as the event.target */
		.octicon-link, .octicon-link > * {
			pointer-events:none;
		}
		.ghcm-hidden, .ghcm-no-content:after {
			display:none !important;
		}
	`);

	function addColors() {
		let sel,
			styles = "";
		headers.forEach((header, indx) => {
			sel = `${blocks.join(" " + header + ":after,").slice(0, -1)}`;
			styles += `${sel} { color:${colors[indx]} }`;
		});
		arrowColors.textContent = styles;
	}

	function toggle(el, shifted) {
		if (el && !el.classList.contains("ghcm-no-content")) {
			el.classList.toggle(collapsed);
			let els;
			const name = el.nodeName || "",
				// convert H# to #
				level = parseInt(name.replace(/[^\d]/, ""), 10),
				isCollapsed = el.classList.contains(collapsed);
			if (shifted) {
				// collapse all same level anchors
				els = $$(`${blocks.join(" " + name + ",").slice(0, -1)}`);
				for (el of els) {
					nextHeader(el, level, isCollapsed);
				}
			} else {
				nextHeader(el, level, isCollapsed);
			}
			removeSelection();
		}
	}

	function nextHeader(el, level, isCollapsed) {
		el.classList.toggle(collapsed, isCollapsed);
		const selector = headers.slice(0, level).join(","),
			name = [collapsed, "ghcm-hidden"],
			els = [];
		el = el.nextElementSibling;
		while (el && !el.matches(selector)) {
			els[els.length] = el;
			el = el.nextElementSibling;
		}
		if (els.length) {
			if (isCollapsed) {
				els.forEach(el => {
					el.classList.add("ghcm-hidden");
				});
			} else {
				els.forEach(el => {
					el.classList.remove(...name);
				});
			}
		}
	}

	// show siblings of hash target
	function siblings(target) {
		let el = target.nextElementSibling,
			els = [target];
		const level = parseInt((target.nodeName || "").replace(/[^\d]/, ""), 10),
			selector = headers.slice(0, level - 1).join(",");
		while (el && !el.matches(selector)) {
			els[els.length] = el;
			el = el.nextElementSibling;
		}
		el = target.previousElementSibling;
		while (el && !el.matches(selector)) {
			els[els.length] = el;
			el = el.previousElementSibling;
		}
		if (els.length) {
			els = els.filter(el => {
				return el.nodeName === target.nodeName;
			});
			for (el of els) {
				el.classList.remove("glcm-hidden");
			}
		}
		nextHeader(target, level, false);
	}

	function removeSelection() {
		// remove text selection - https://stackoverflow.com/a/3171348/145346
		const sel = window.getSelection ? window.getSelection() : document.selection;
		if (sel) {
			if (sel.removeAllRanges) {
				sel.removeAllRanges();
			} else if (sel.empty) {
				sel.empty();
			}
		}
	}

	function addBinding() {
		document.addEventListener("click", event => {
			let target = event.target;
			const name = (target && (target.nodeName || "")).toLowerCase();
			if (name === "path") {
				target = target.closest("svg");
			}
			if (!target || target.classList.contains("anchor") ||
				name === "a" || name === "img" ||
				// add support for "pointer-events:none" applied to "anchor" in
				// https://github.com/StylishThemes/GitHub-FixedHeader
				target.classList.contains("octicon-link")) {
				return;
			}
			// check if element is inside a header
			target = event.target.closest(headers.join(","));
			if (target && headers.indexOf(target.nodeName || "") > -1) {
				// make sure the header is inside of markdown
				if (target.closest(blocks.slice(0, -1).join(","))) {
					toggle(target, event.shiftKey);
				}
			}
		});
		document.addEventListener("ghmo:container", () => {
			// init after a short delay to allow rendering of file list
			setTimeout(() => {
				ignoreEmptyHeaders();
			}, 200);
		});
	}

	function checkHash() {
		let el, els, md;
		const mds = $$(blocks.slice(0, -1).join(",")),
			id = (window.location.hash || "").replace(/#/, "");
		for (md of mds) {
			els = $$(headers.join(","), md);
			if (els.length > 1) {
				for (el of els) {
					if (el && !el.classList.contains(collapsed)) {
						toggle(el, true);
					}
				}
			}
		}
		if (id) {
			openHash(id);
		}
	}

	// open header matching hash
	function openHash(id) {
		const els = $(`#user-content-${id}`);
		if (els && els.classList.contains("anchor")) {
			let el = els.parentNode;
			if (el.matches(headers.join(","))) {
				siblings(el);
				document.documentElement.scrollTop = el.offsetTop;
				// set scrollTop a second time, in case of browser lag
				setTimeout(() => {
					document.documentElement.scrollTop = el.offsetTop;
				}, 500);
			}
		}
	}

	function checkColors() {
		if (!colors || colors.length !== 6) {
			colors = [].concat(defaultColors);
		}
	}

	function ignoreEmptyHeaders() {
		$$("a.anchor").forEach(el => {
			const parent = el.parentNode;
			if (parent && parent.matches(headers.join(",")) && !parent.nextElementSibling) {
				parent.classList.add("ghcm-no-content");
			}
		});
	}

	function init() {
		document.querySelector("head").appendChild(arrowColors);
		checkColors();
		addColors();
		addBinding();
		ignoreEmptyHeaders();
		if (startCollapsed) {
			checkHash();
		}
	}

	function $(selector, el) {
		return (el || document).querySelector(selector);
	}

	function $$(selectors, el) {
		return [...(el || document).querySelectorAll(selectors)];
	}

	// Add GM options
	GM_registerMenuCommand("Set collapse markdown state", () => {
		const val = prompt(
			"Set initial state to (c)ollapsed or (e)xpanded (first letter necessary):",
			startCollapsed ? "collapsed" : "expanded"
		);
		if (val !== null) {
			startCollapsed = /^c/i.test(val);
			GM_setValue("ghcm-collapsed", startCollapsed);
			console.log(
				`GitHub Collapse Markdown: Headers will ${startCollapsed ? "be" : "not be"} initially collapsed`
			);
		}
	});

	GM_registerMenuCommand("Set collapse markdown colors", () => {
		let val = prompt("Set header arrow colors:", JSON.stringify(colors));
		if (val !== null) {
			// allow pasting in a JSON format
			try {
				val = JSON.parse(val);
				if (val && val.length === 6) {
					colors = val;
					GM_setValue("ghcm-colors", colors);
					console.log("GitHub Collapse Markdown: colors set to", colors);
					addColors();
					return;
				}
				console.error(
					"GitHub Collapse Markdown: invalid color definition (6 colors)",
					val
				);
				// reset colors to default (in case colors variable is corrupted)
				checkColors();
			} catch (err) {
				console.error("GitHub Collapse Markdown: invalid JSON");
			}
		}
	});

	init();

})();
