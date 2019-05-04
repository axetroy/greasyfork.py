// ==UserScript==
// @author      Setcher
// @name        Edna.cz Subtitle Downloader
// @name:cs        Edna.cz Stahovač Titulků
// @namespace   https://greasyfork.org/users/30331-setcher
// @description Přidává možnost stáhnout titulky nebo přejít na původní YT video
// @description:cs Gives you the opportunity to download the subtitles or go directly to the original YT video
// @include     http*://*edna.cz/*
// @version     0.9.3
// @grant       GM_addStyle
// ==/UserScript==

function saveFile(url) {
    // Get file name from url.
    var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function() {
        var a = document.createElement('a');
        a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
        a.download = filename; // Set the file name.
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        delete a;
    };
    xhr.open('GET', url);
    xhr.send();
}

var jwplayers = document.getElementsByClassName('video-box');
if (jwplayers.length > 0) {
    for (i = 0; i < jwplayers.length; i++){
        if (jwplayers[i].childNodes[0].wholeText.length <= 1) {
            var ytRegexp = /video_id:\s"([^"]+)/gi;
            var yt = ytRegexp.exec(jwplayers[i].innerHTML);
            var youtube = yt[1].replace(/\\/g, "");

            var srtRegexp = /subtitles:\s*?"([^"]+)/gi;
            var srt = srtRegexp.exec(jwplayers[i].innerHTML);
            var result = srt[1].replace(/\\/g, "");

        } else {
            var dataSource = jwplayers[i].childNodes[0];
            var result = dataSource.getAttribute('data-subtitles');
            result = result.split("/").pop().replace(/\..+$/, '.srt')
            result = 'http://www.edna.cz/runtime/userfiles/'+result;
            var youtube = dataSource.getAttribute('data-video');
        }

        var zNode       = document.createElement ('span');
        zNode.setAttribute ('style', 'display: block; margin: 20px 0; text-align: center;');
        zNode.setAttribute ('id', 'downloadBlock');

        var srt = document.createElement ('a');
        if (result) {
            srt.innerHTML = 'Stáhnout titulky';
            var filename = result.substring(result.lastIndexOf("/") + 1).split("?")[0];
            srt.setAttribute ('download', filename);
            srt.setAttribute ('id', 'downloadSRTButton');
            srt.setAttribute ('href', result);
            //srt.setAttribute ('href', 'javascript:saveFile('+result+')');
        } else {
            srt.innerHTML = 'Titulky nenalezeny';
            srt.setAttribute ('id', 'failedButton');
        }
        zNode.innerHTML += srt.outerHTML;

        var yt       = document.createElement ('a');
        if (youtube) {
            yt.innerHTML = 'Přejít na YouTube';
            yt.setAttribute ('id', 'downloadSRTButton');
            yt.setAttribute ('href', youtube);
        } else {
            yt.innerHTML = 'YT link nenalezen';
            yt.setAttribute ('id', 'failedButton');
        }
        zNode.innerHTML += yt.outerHTML;
        /*
        if (jwplayers[i].nextSibling == null || !jwplayers[i].nextSibling.getAttribute('id') == 'downloadBlock')
        {
            jwplayers[i].parentNode.insertBefore(zNode, jwplayers[i].nextSibling);
        }
        */
        jwplayers[i].parentNode.insertBefore(zNode, jwplayers[i].nextSibling);
    }
} else {
    // regex way

}

//--- Style our newly added elements using CSS.
GM_addStyle ( multilineStr ( function () {/*!
    #downloadSRTButton {
        font-weight:            bold;
        letter-spacing:         1px;
        margin:                 5px;
        opacity:                0.9;
        z-index:                222;
        width:                  150px;
        padding:                5px 20px;
    }
    #failedButton {
        font-size:              12px;
        font-weight:            bold;
        color:                  black;
        letter-spacing:         1px;
        background:             orange;
        border:                 3px outset black;
        margin:                 5px;
        opacity:                0.9;
        z-index:                222;
        width:                  150px;
        padding:                5px 20px;
    }
*/} ) );

function multilineStr (dummyFunc) {
    var str = dummyFunc.toString ();
    str     = str.replace (/^[^\/]+\/\*!?/, '') // Strip function () { /*!
        .replace (/\s*\*\/\s*\}\s*$/, '')   // Strip */ }
        .replace (/\/\/.+$/gm, '') // Double-slash comments wreck CSS. Strip them.
    ;
    return str;
}
