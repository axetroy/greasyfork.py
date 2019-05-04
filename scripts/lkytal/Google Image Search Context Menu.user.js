// ==UserScript==
// @name					Google Image Search Context Menu
// @description				Add Search Image context menu
// @author					lkytal
// @namespace				Lkytal
// @version					3.0.6
// @homepage				https://lkytal.github.io/
// @homepageURL				https://lkytal.github.io/GM
// @license					AGPL
// @include					*
// @icon					http://lkytal.qiniudn.com/ic.ico
// @grant					GM_openInTab
// @run-at					document-end
// @charset					UTF-8
// @supportURL				https://github.com/lkytal/GM/issues
// ==/UserScript==

//if (!("contextMenu" in document.documentElement && "HTMLMenuItemElement" in window)) return;

var body = document.body;
body.addEventListener("contextmenu", initMenu, false);

var menu = body.appendChild(document.createElement("menu"));
menu.outerHTML = '<menu id="userscript-search-by-image" type="context">\
					<menuitem id="SearchGoogle" label="Search image via google"\
							  icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK6wAACusBgosNWgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAAElSURBVDiNY/z//z8DJYCRkIKsthv/kRX9Z2BgmFalARdiIcaGKZXqcH5O+01U+ay2G3MYGBiSiXUmmofnsBDSjEUTMkiBe2Eq1JnZ7TcZBHhZGNythBl0lLkZODmYGX7++sdw/sZnhl3H3zF8+voHwwsYFkR5ijNICLMzTF31hOHnr38MHGxMDJlhMgwv3vxkWL7jJYpaJmzu0lTigWtmYGBg+PHrH8P0VU8YtJV5MNRiNYCfmxmuGQZ+/PrHwMmOqRyrAX///WfgYEOV4mBjwjAUpwHHL31iyA6XgRvCwcbEkBUmw3DuxmcMtVgDkYONicHLVoTBSJOXgYONieHHz38Ml+98Ydh88DXDtx//CBtACmBiYGCYS4H+OYyU5kasgUgKAADN8WLFzlj9rgAAAABJRU5ErkJggg==">\
					</menuitem>\
					<menuitem id="SearchBaidu" label="Search image via Baidu"></menuitem>\
				</menu>';

document.querySelector("#SearchGoogle").addEventListener("click", searchImage, false);
document.querySelector("#SearchBaidu").addEventListener("click", search_baidu, false);

function initMenu(aEvent) {
	var node = aEvent.target;
	var item = document.querySelectorAll("#userscript-search-by-image menuitem");

	if (node.localName == "img") {
		body.setAttribute("contextmenu", "userscript-search-by-image");

		for (var i = item.length - 1; i > -1; i--) {
			item[i].setAttribute("imageURL", node.src);
		}
	}
	else {
		body.removeAttribute("contextmenu");
		//item.removeAttribute("imageURL");
	}
}

function addParamsToForm(aForm, aKey, aValue) {
	var hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("name", aKey);
	hiddenField.setAttribute("value", aValue);
	aForm.appendChild(hiddenField);
}

function searchImage(aEvent) {
	// Executed when user click on menuitem
	// aEvent.target is the <menuitem> element
	var imageURL = aEvent.target.getAttribute("imageURL");

	if (imageURL.indexOf("data:") == 0) {
		var base64Offset = imageURL.indexOf(",");
		if (base64Offset != -1) {
			var inlineImage = imageURL.substring(base64Offset + 1).replace(/\+/g, "-").replace(/\//g, "_").replace(/\./g, "=");

			var form = document.createElement("form");
			form.setAttribute("method", "POST");
			form.setAttribute("action", "//www.google.com/searchbyimage/upload");
			form.setAttribute("enctype", "multipart/form-data");
			form.setAttribute("target", "_blank");
			addParamsToForm(form, "image_content", inlineImage);
			addParamsToForm(form, "filename", "");
			addParamsToForm(form, "image_url", "");
			body.appendChild(form);
			form.submit();
		}
	}
	else {
		GM_openInTab("//www.google.com/searchbyimage?image_url=" + encodeURIComponent(imageURL));
	}
}

function search_baidu(aEvent) {
	var imageURL = aEvent.target.getAttribute("imageURL");

	GM_openInTab("//image.baidu.com/n/pc_search?queryImageUrl=" + encodeURIComponent(imageURL) + "&uptype=urlsearch");
}
