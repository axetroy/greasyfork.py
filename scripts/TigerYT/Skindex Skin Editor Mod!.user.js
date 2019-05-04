// ==UserScript==
// @name         Skindex Skin Editor Mod!
// @namespace    Skindex Skin Editor Mod!
// @version      1
// @description  The Perfect Skin Editor.
// @author       TigerYT
// @match        *://www.minecraftskins.com/skin-editor/
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

(function() {var css = [
  "[style*=a], .header, .footer, .main, .editor-heading {",
  "  display: none;",
  "}",
  "",
  "#color, #light > div:nth-child(2) {",
  "  display: block;",
  "}",
  "",
  ".avatar-creator .left-toolbar a {",
  "  height: 75px;",
  "  margin-top: 15px;",
  "  margin-bottom: 0px;",
  "}",
  "",
  ".color-picker {",
  "  height: 325px;",
  "  margin-top: 15px;",
  "}",
  "",
  "body {",
  "  overflow: hidden;",
  "}"
].join("\n");
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node);
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();

    function addScore(script){
        var separator=script.querySelector('h2>span.name-description-separator');
        var description=script.querySelector('h2>span.description');
        if(separator){
            var score=document.createElement("strong");
            score.style.color="#e09015";
            score.innerHTML=script.getAttribute("data-script-rating-score");
            separator.parentNode.insertBefore(score,separator);
        }
        if(description)description.innerHTML+="<strong>Ver."+script.getAttribute("data-script-version")+"</strong>";
        var installArea=script.querySelector("#install-area");
    }