// ==UserScript==
// @name        https_anywhere
// @namespace   https://v0cyc1pp.com/
// @include     http://*
// @exclude     http://www.aterm.jp*
// @author      greg10
// @run-at      document-start
// @license     GPL 3.0
// @version     0.6
// @grant       GM_xmlhttpRequest
// @connect     *
// @description https://をサポートしていたらそちらのページを開きます。スクリプトインストールして一度目はTamperMonkeyの警告画面がでるので、「Allways allow all domains」を選択して全ＯＫにしてください。
// ==/UserScript==

console.log("https_anywhere start");



//http://testamentlegions.com/
//http://celestrak.com/
//http://radiko.jp/
//http://www.ntt.co.jp
function main() {
    var origurl = window.location + "";
    console.log("origurl=" + origurl);
    var newurl = origurl.replace(/^http:/, "https:");
    //console.log("newurl=" + newurl);


    GM_xmlhttpRequest({
        method: "HEAD",
        url: newurl,
        timeout: 1300,
        onload: function(response) {
            //alert(response.responseText);
            //alert(response.finalUrl);
            //alert(response.status);

            console.log("response.status=" + response.status);
            if (response.status != 200 &&
                response.status != 301 &&
                response.status != 302) return;

            var ind = response.finalUrl.indexOf("https:");
            if (ind != 0) return;

            if (response.responseText != undefined) {
                ind = response.responseText.indexOf("Refresh");
                if (ind != -1) return;
            }

            console.log("https_anywhere: redirect to " + newurl);
            window.location.replace(newurl);
        }
    });

}

main();