// ==UserScript==
// @name         ctnma 辅助
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  表单去掉滚动条
// @author       skipto
// @match        http://www.ctnma.cn/ioop-bcs-web/main.do
// @grant        none
// ==/UserScript==

function UI(){
    var a = document.querySelector("#承办情况");
    var b = document.querySelector('#承办情况 > div > div > div.idea-item-list');
    if (a&&b){
        a.style.height = "";
        b.style.height = '100%';
    }
}

// https://stackoverflow.com/questions/5202296/add-a-hook-to-all-ajax-requests-on-a-page
function addXMLRequestCallback(callback){
    var oldSend, i;
    if( XMLHttpRequest.callbacks ) {
        // we've already overridden send() so just add the callback
        XMLHttpRequest.callbacks.push( callback );
    } else {
        // create a callback queue
        XMLHttpRequest.callbacks = [callback];
        // store the native send()
        oldSend = XMLHttpRequest.prototype.send;
        // override the native send()
        XMLHttpRequest.prototype.send = function(){
            // process the callback queue
            // the xhr instance is passed into each callback but seems pretty useless
            // you can't tell what its destination is or call abort() without an error
            // so only really good for logging that a request has happened
            // I could be wrong, I hope so...
            // EDIT: I suppose you could override the onreadystatechange handler though
            for( i = 0; i < XMLHttpRequest.callbacks.length; i++ ) {
                XMLHttpRequest.callbacks[i]( this );
            }
            // call the native send()
            oldSend.apply(this, arguments);
        }
    }
}

addXMLRequestCallback( function( xhr ) {
    xhr.addEventListener("load", function(){
        if ( xhr.readyState == 4 && xhr.status == 200 ) {
            // console.log( xhr.responseURL );
            if ( xhr.responseURL.includes("archives/archives-info!view.do?") ) {
                console.log("UI!",xhr);
                UI();
            }
        }
    });
});