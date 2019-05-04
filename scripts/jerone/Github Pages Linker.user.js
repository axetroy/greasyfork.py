// ==UserScript==
// @id          Github_Pages_Linker@https://github.com/jerone/UserScripts
// @name        Github Pages Linker
// @namespace   https://github.com/jerone/UserScripts/
// @description Add a link to Github Pages (gh-pages) when available.
// @author      jerone
// @copyright   2014+, jerone (http://jeroenvanwarmerdam.nl)
// @license     CC-BY-NC-SA-4.0; https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode
// @license     GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// @homepage    https://github.com/jerone/UserScripts/tree/master/Github_Pages_Linker
// @homepageURL https://github.com/jerone/UserScripts/tree/master/Github_Pages_Linker
// @supportURL  https://github.com/jerone/UserScripts/issues
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=VCYMHWQ7ZMBKW
// @icon        https://github.githubassets.com/pinned-octocat.svg
// @version     1.2.3
// @grant       none
// @run-at      document-end
// @include     https://github.com/*
// ==/UserScript==

(function() {

	String.format = function(string) {
		var args = Array.prototype.slice.call(arguments, 1, arguments.length);
		return string.replace(/{(\d+)}/g, function(match, number) {
			return typeof args[number] !== "undefined" ? args[number] : match;
		});
	};

	function addLink() {
		if(document.getElementById("GithubPagesLinker")) {
			return;
		}

		var meta = document.querySelector(".repository-meta");
		if (!meta) {
			return;
		}

		var branch = document.querySelector(".js-navigation-open[data-name='gh-pages']");
		if (!branch) {
			return;
		}

		var tree = branch.getAttribute("href").split("/"); // `/{user}/{repo}/tree/gh-pages`;
		var url = String.format("https://{0}.github.io/{1}/", tree[1], tree[2]);

		var div = document.createElement("div");
		div.id = "GithubPagesLinker";
		div.style.margin = "-10px 0px 10px";
		meta.parentNode.insertBefore(div, meta.nextSibling);

		var img = document.createElement("img");
		img.setAttribute("src", "https://assets-cdn.github.com/images/icons/emoji/octocat.png");
		img.setAttribute("align", "absmiddle");
		img.classList.add("emoji");
		img.style.height = "16px";
		img.style.width = "16px";
		div.appendChild(img);

		div.appendChild(document.createTextNode(" "));

		var a = document.createElement("a");
		a.setAttribute("href", "https://pages.github.com");
		a.setAttribute("title", "More info about gh-pages...");
		a.style.color = "inherit";
		a.appendChild(document.createTextNode("Github Pages"));
		div.appendChild(a);

		div.appendChild(document.createTextNode(": "));

		var aa = document.createElement("a");
		aa.setAttribute("href", url);
		aa.appendChild(document.createTextNode(url));
		div.appendChild(aa);
	}

	// Init;
	addLink();

	// On pjax;
    document.addEventListener('pjax:end', addLink);

})();
