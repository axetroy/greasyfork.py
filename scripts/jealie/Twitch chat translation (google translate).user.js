// ==UserScript==
// @name            Twitch chat translation (google translate)
// @description     Perform on the fly translation with a drosophila interpreter hovering to the left of each chat message. This script loves https://www.twitch.tv/marlouck_harp
// @namespace       the_fly_translator
// @homepage        https://greasyfork.org/en/scripts/371319-twitch-chat-translation-google-translate
// @version         1.41
// @icon            http://translate.google.com/favicon.ico
// @include         http://*.twitch.tv/*
// @include         https://*.twitch.tv/*
// @grant           GM_getValue
// @grant           GM_xmlhttpRequest
// @require         https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// @grant           GM.xmlHttpRequest
// @grant           GM_log
// @grant           GM_deleteValue
// @grant           GM_addStyle
// @grant           GM_openInTab
// @grant           GM_registerMenuCommand
// @grant           GM_setValue
// ==/UserScript==

// This script is heavily inspired (read: ripped) from https://greasyfork.org/scripts/16204/
// Thanks to them for the routines handling google translate queries!

var UA = navigator.userAgent;
var googleDomain = "translate.google.com";
var dictURL= "https://" + googleDomain + "/translate_a/single?client=t";
var ttsURL= "http://" + googleDomain + "/translate_tts?client=t";

const HREF_NO = 'javascript:void(0)';
initCrossBrowserSupportForGmFunctions();


function init_google_value_tk() {
    var url = "https://" + googleDomain;
    var timeout = setTimeout( function(){ this.abort(); }, 2000);
    GM.xmlHttpRequest({
        method: "GET",
        url: url,
        onreadystatechange: function(resp) {
            if (resp.readyState == 4) {
                clearTimeout(timeout);
                if (resp.status == 200) {
                    init_google_value_tk_parse(resp.responseText);
                }
            }
        }
    });
}

function init_google_value_tk_parse(responseText) {
    // New google token (sometimes already evaluated)
    var res_raw = /;TKK=\'([0-9.]*)\'/i.exec(responseText);
    //console.log(res_raw);
    if (res_raw != null) {
        //console.log('Set raw token '+res_raw[1]);
        GM_setValue('google_value_tk', Number(res_raw[1]));
    } else {
       var res = /;TKK=(.*?\'\));/i.exec(responseText);
        if (res != null) {
            var res2 = /var a=(.*?);.*?var b=(.*?);.*?return (\d+)/i.exec(res[1].replace(/\\x3d/g, '='));
            if (res2 != null) {
                //console.log('Set comp token based on '+res2);
                var tkk = Number(res2[3]) + '.' + (Number(res2[1]) + Number(res2[2]));
                GM_setValue('google_value_tk', tkk);
            }
        }
    };
}

// return token for the new API
function googleTK(text) {
    // view-source:https://translate.google.com/translate/releases/twsfe_w_20151214_RC03/r/js/desktop_module_main.js && TKK from HTML
    var uM = GM_getValue('google_value_tk');
    if (uM == 'undefined' || uM == null) {
        init_google_value_tk();
        uM = GM_getValue('google_value_tk');
    };
    var cb="&";
    var k="";
    var Gf="=";
    var Vb="+-a^+6";
    var t="a";
    var Yb="+";
    var Zb="+-3^+b+-f";
    var jd=".";
    var sM=function(a){return function(){return a}}
    var tM=function(a,b){for(var c=0;c<b.length-2;c+=3){var d=b.charAt(c+2),d=d>=t?d.charCodeAt(0)-87:Number(d),d=b.charAt(c+1)==Yb?a>>>d:a<<d;a=b.charAt(c)==Yb?a+d&4294967295:a^d}return a};
    var vM=function(a){
        var b;
        if(null!==uM) {
            b=uM;
        }else{
            b=sM(String.fromCharCode(84));var c=sM(String.fromCharCode(75));b=[b(),b()];
            b[1]=c();
            b=(uM=window[b.join(c())]||k)||k
        }
        var d=sM(String.fromCharCode(116)),c=sM(String.fromCharCode(107)),d=[d(),d()];
        d[1]=c();
        c=cb+d.join(k)+Gf;
        d=String(b).split(jd); ///// modified here to ensure b is a string
        b=Number(d[0])||0;

        for(var e=[],f=0,g=0;g<a.length;g++){
            var m=a.charCodeAt(g);
            128>m?e[f++]=m:(2048>m?e[f++]=m>>6|192:(55296==(m&64512)&&g+1<a.length&&56320==(a.charCodeAt(g+1)&64512)?(m=65536+((m&1023)<<10)+(a.charCodeAt(++g)&1023),e[f++]=m>>18|240,e[f++]=m>>12&63|128):e[f++]=m>>12|224,e[f++]=m>>6&63|128),e[f++]=m&63|128)
        }
        a=b||0;
        for(f=0;f<e.length;f++) { a+=e[f],a=tM(a,Vb)};
        a=tM(a,Zb);
        a^=Number(d[1])||0;
        0>a&&(a=(a&2147483647)+2147483648);
        a%=1E6;
        return a.toString()+jd+(a^b);
    };
    return vM(text);
}



if (typeof GM_deleteValue == 'undefined') {
    GM_addStyle = function (css) {
        var style = document.createElement('style');
        style.textContent = css;
        document.getElementsByTagName('head')[0].appendChild(style);
    }
    GM_deleteValue = function (name) {
        localStorage.removeItem(name);
    }
    GM_getValue = function (name, defaultValue) {
        var value = localStorage.getItem(name);
        if (!value)
            return defaultValue;
        var type = value[0];
        value = value.substring(1);
        switch (type) {
        case 'b':
            return value == 'true';
        case 'n':
            return Number(value);
        default:
            return value;
        }
    }
    GM_log = function (message) {
        console.log(message);
    }
    GM_openInTab = function (url) {
        return window.open(url, "_blank");
    }
    GM_registerMenuCommand = function (name, funk) {
        //todo
    }
    GM_setValue = function (name, value) {
        value = (typeof value)[0] + value;
        localStorage.setItem(name, value);
    }
}
/*
 * Cross browser support for GM functions
 * http://userscripts.org/topics/41177
 */
function initCrossBrowserSupportForGmFunctions() {
    if (typeof GM_deleteValue == 'undefined') {
        GM_addStyle = function (css) {
            var style = document.createElement('style');
            style.textContent = css;
            document.getElementsByTagName('head')[0].appendChild(style);
        }
        GM_deleteValue = function (name) {
            localStorage.removeItem(name);
        }
        GM_getValue = function (name, defaultValue) {
            var value = localStorage.getItem(name);
            if (!value)
                return defaultValue;
            var type = value[0];
            value = value.substring(1);
            switch (type) {
            case 'b':
                return value == 'true';
            case 'n':
                return Number(value);
            default:
                return value;
            }
        }
        GM_log = function (message) {
            console.log(message);
        }
        GM_openInTab = function (url) {
            return window.open(url, "_blank");
        }
        GM_registerMenuCommand = function (name, funk) {
            //todo
        }
        GM_setValue = function (name, value) {
            value = (typeof value)[0] + value;
            localStorage.setItem(name, value);
        }
    }
}

function getFromGT(gTradStringArray, NodeToChange, translate_div) {
    var arr = eval(gTradStringArray); // eval is used to transform the string to an array. I alse made a custom parsing function, but it doesn't handle antislashed characters, so I prefer using eval()
    /*
    Content of the gTrad array :
    0 / 0:Translation 1:Source text
    1 / i:Grammar / 0:Types (word, verb, ...) 1: Other translations
    5 / Array of other translations
     */
    var translation = '';
    // 0 - Full translation
    for (var i = 0; i < arr[0].length; i++) { if (typeof arr[0][i][0] != 'undefined' && arr[0][i][0] != null) translation += arr[0][i][0]; }

    translate_div.style.backgroundPosition = "0px 0px"; // stick the fly
    translate_div.onclick=function () {}; // disable further function calls
    if (arr.length > 3 && typeof arr[2] != 'undefined' && arr[2] != null) {
      translate_div.title = "Translated from: "+arr[2];
    } else {
      translate_div.title = "Could not tell the original language";
    }

    NodeToChange.innerHTML = translation;
}

function GTRequest (txt, sl, tl, parse, NodeToChange, translate_div) {
    txt = txt.replace(/[&\/\\#+$~%'"*<>{}]/g,'_'); // Sanitize string
    var tk=googleTK(txt);
    var Url = dictURL +
        "&hl=auto" +
        "&sl=" + sl + "&tl=" + tl +
        "&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&dt=at&ie=UTF-8&oe=UTF-8&otf=2&trs=1&inputm=1&ssel=0&tsel=0&source=btn&kc=3"+
        "&tk=" + tk +
        "&q="+ encodeURI(txt);
    var method='POST';
    var Data='';
    var Hdr= {
        "User-Agent": UA,
        "Accept":  "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Encoding":  "gzip, deflate"
    }
    var Q=Url.split('&q=');
    Url=Q[0];
    Data='&q='+Q[1];
    Hdr["Content-Length"]=Data.length+'';
    Hdr["Content-Type"]="application/x-www-form-urlencoded; charset=UTF-8";
    GM.xmlHttpRequest({
        method: method,
        url: Url,
        data: Data,
        headers: Hdr,
        onload: function(resp) {
            try{
                parse(resp.responseText, NodeToChange, translate_div)
            }catch(e){
                GM_log(e);
          }
        }
    });
}

function translate_fragments(node, translate_div) {
   for (var ii = 0; ii < node.childNodes.length; ii++) {
   if (node.childNodes[ii].className == "text-fragment") {
     // base Twitch chat markup
     GTRequest(node.childNodes[ii].innerHTML, 'auto', 'auto', getFromGT, node.childNodes[ii], translate_div);
   } else if (node.childNodes[ii].className == "message") {
     // compatibility with FrankerFaceZ rewrite
     for (var jj = 0; jj < node.childNodes[ii].childNodes.length; jj++) {
       GTRequest(node.childNodes[ii].childNodes[jj].innerHTML, 'auto', 'auto', getFromGT, node.childNodes[ii].childNodes[jj], translate_div);
     }
   }
   }
}


GM_addStyle ( `
    .translate_div {
        background-image: url('data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAFg0lEQVRIx32UfWyV9RXHP+c8z3Of23vb25YW6Iu8CAWpyJyyiDIMOsh0m4rZxkaic5kjM5oZ4t5ihouLiyPRv1xm/INgINl0i0ENYpaMvQk00mGDkNluRUoLbe17S29ve9+e39kfva1rY3aSX57z+z2/8z0v3/M7AqCqEovFJJ/PL3XOrRORUEScmSEiamYmIgBmZgKIiETOuT7goud5XhRFEf8rvu9vAvpU1VTVRMRExOb2i89K37yqHgBkDudTReSEql4fRdEeYMj3fd/MXMmxeJ5nZibOOQATEV9EfmVm9wOfM7OuBRGKSEZEtqZSKR/Yp6r3lM6Xi8jPAGpqagR4QkSaq6urpfTfVPUOFouITInIVuAmVS2KyBUgUNV3S6neA2wq6cNzdqX0vzhfusXAnuf1OOd+o6r/iaKoYGbPA/1m9r6qFs3sJRE5ZWb8XxGRf4nIqyJSEQSBhmGoquoDSWApkACSqpr0PC8JxFV1j4g4YNNnAe4qhT+sqn8ClgFNqjqgqsOq2i0iV0SkR0R6VPVyqX6vB0HgL2BZVdXN0rdDVe81s68CNwJvAl83s0OqOj1nVOrFOHDezH5b6lW3IEDf9/1kMilBEKiIVIjIblUtAnlVvTkIAgFoWrNWYrGY5/u+V1tTo4sz9UtEAEgul/NK+2IQcHRmpuiLyHMGUSIeb9i8/e7vBYHfnclMvJNO55ds2Xbn9sxUZns2m2s/03LyYBiGtXP1m/cUjwdz+ufB/w7QAPCTp/dPn+sdt/cuDdvmLbf3nD53IX3y0pCd6Jqwv3UP2nd/+NMzQDD3UoL7v9T0YM65HZXl3puXrmb3Prtv3e51K33ePzfF/hc7Otr6x5o7+vNYsUB361+4/b5dDI/nyUWOUISJsZ7oia9sv8UHeHzPxjd+/NSKXalIaPlo5LEbmqqprxAsgm/uqKK+srL5ZNsA9Q01TOfSNKxvZni8QDxQ+iZyrKgK8QPPa7y+KaWrGhvWPvl4487q6YjyMkfHJZ/GlEIEIlDM5Nh570bOvv0CfuhjUQELyoCIdLaIIKgvTI5Ppds/aO3VOzenEs6RNIHg4YhCTQxTARGKVzMUH/oCUc5j7OMTDPT3gvio+qgoIFSUeVRUB7zw1A/enikWevR3x4ZGxsZmxoMqj+J7IeXXMpg5XGR4q5J4fzhDPhogMbKT9qcPIGVF4qFH1gk94xGxmMfLv3jm8oW2fz4C4MHMVOuHU11LKgq7VTrp6AqprR2kbvkqyAnxJTmefznNz6u+xraaWl48+VfqVi6jreMs5187zPGjByePHzt4221b7073Xu7+dB6mytY/+vqOJw/ddV0Fb/R1wpbfs7Iu5ExrkgfyD9McD5mOjFf6L9A2NsBza7eyckkN4/ki3z515N1T7a33LRiwj9yy860jdz30IAgoTOYcM+kclXGPMOExYwXSY1k6LUNTVTn1QRU4w8Rx+OJ5Hj3+0g1A53xDV5cF66E0khykAmV5bZx4eYDgUXQRycoEMQczLgIzEBBRtjWsBtgAMA/YN3WtB4vmRs/scjJ7JSrw0UiaMldgRiJSGix4v0mJl/goAa5ZXR9QlCOjLgvOGJwYJTM5SdoKjIyNcHp0kjtW1hGJT8tQP7Wx5KxDnV0fTPQCtMyjjk9MufbRq4O3Ltvw/Zsa6xIx8YlCwSiQiJezpjIBWcfRT7rY1/LKM8sTK24N/Sjel5nkz70f8+yH7xwYHR85toCUknzr8AP7/viN1TdS7peBztZ0Jpfl70NX2PuPQ7/+ZHBgf+11S18buTY8SI5sWJGMauOVbX19/W99FiAkyjY+dvPeHxW8gS9Xh3Ud6eJI7OJgx3RnPvvLvq5/n61IVWjoh7ENNRtypy+edovN/wuGH0eUpjYR/AAAAABJRU5ErkJggg==');
        width: 20px;
        height: 26px;
        display: block;
        position: relative;
        left: -20px;
        top: 22px;
        margin-top: -26px;
        background-repeat: no-repeat;
        background-position: -20px 0px;
}
    .translate_div:hover { background-position: 0px 0px }
` );


var MutationObserver = window.MutationObserver;
var chatObserver     = new MutationObserver (mutationHandler);
var obsConfig        = {
    childList: true, attributes: true,
    subtree: true,   attributeFilter: ['class']
};

chatObserver.observe (document, obsConfig);

function mutationHandler (mutationRecords) {

    mutationRecords.forEach ( function (mutation) {

        if (    mutation.type               == "childList"
            &&  typeof mutation.addedNodes  == "object"
            &&  mutation.addedNodes.length
        ) {
            for (var J = 0, L = mutation.addedNodes.length;  J < L;  ++J) {
                checkForCSS_Class (mutation.addedNodes[J], "chat-line__message");
            }
        }
        else if (mutation.type == "attributes") {
            checkForCSS_Class (mutation.target, "chat-line__message");
        }
    } );
}

function checkForCSS_Class (node, className) {
    //-- Only process element nodes
    if (node.nodeType === 1) {
        if (node.classList.contains (className) ) {
            var translate_div = document.createElement("div");
            translate_div.className = 'translate_div';
            translate_div.onclick=function () {console.log('translation starting...'); translate_fragments(node, translate_div); console.log('work done, can I haz thankyou?')};
            node.prepend(translate_div);
        }
    }
}

GM_setValue('google_value_tk', null);
init_google_value_tk()


