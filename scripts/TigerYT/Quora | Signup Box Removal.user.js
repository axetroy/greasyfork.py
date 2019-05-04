// ==UserScript==
// @name         Quora | Signup Box Removal
// @namespace    Quora | Signup Box Removal
// @version      1
// @description  Removes the signup box if you're not signed in
// @author       TigerYT
// @match        *://www.quora.com/*
// @require      https://code.jquery.com/jquery-3.3.1.js
// ==/UserScript==

(function() {var maincss = [
  ".modal_signup_background, .modal_signup_dialog, .vertical_alignment_wrapper {",
  "  display: none;",
  "}",
  "",
  ".signup_wall_prevent_scroll .SiteHeader, .signup_wall_prevent_scroll .LoggedOutFooter, .signup_wall_prevent_scroll .ContentWrapper {",
  "  filter: blur(0px);",
  "}", 
  "body {",
  "  overflow: auto!important;",
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
    $(node).text(maincss);
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
        heads[0].appendChild(node);
    } else {
        // no head yet, stick it whereever
        document.documentElement.appendChild(node);
    }
}
})();