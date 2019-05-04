// ==UserScript==
// @name        Imgur Upload Automation Helper
// @namespace   ImgurUploadAutomationHelper
// @description A script to help automating image upload by URL to Imgur. e.g. via bookmarklet. The image URL will be automatically uploaded if the browser is pointed to this URL: https://imgur.com/upload?url={image_url}
// @version     1.0.1
// @author      jcunews
// @include     *://imgur.com/upload?url=*
// @grant       none
// @run-at      document-start
// ==/UserScript==

var url = decodeURIComponent(location.search.match(/(?:url=)(http[^&]+)/)[1]);
var form = new FormData();
form.append("url", url);

var xhr = new XMLHttpRequest();
xhr.onerror = function() {
  alert("Failed to upload image.\nHTTP code " + xhr.status + ".");
};
xhr.onload = function() {
  location.href = location.protocol + "//imgur.com/" + xhr.response.data.hash;
};
xhr.open("POST", location.protocol + "//imgur.com/upload", true);
xhr.responseType = "json";

//workaround for GreaseMonkey addon bug
(function check() {
  if (document.body) {
    xhr.send(form);
  } else setTimeout(check, 50);
})();
