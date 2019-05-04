// ==UserScript==
// @name         WK Do You Even Kana?
// @namespace    WKDYEK
// @version      0.8
// @description  check that the okurigana matches the answer.
// @author       Ethan
// @include      http*://www.wanikani.com/review/session*
// @include      http*://www.wanikani.com/lesson/session*
// @grant        none
// @license      MIT
// ==/UserScript==

var alertText = "Bro, Do you even Kana?";

// Hook into App Store
try { $('.app-store-menu-item').remove(); $('<li class="app-store-menu-item"><a href="https://community.wanikani.com/t/there-are-so-many-user-scripts-now-that-discovering-them-is-hard/20709">App Store</a></li>').insertBefore($('.navbar .dropdown-menu .nav-header:contains("Account")')); window.appStoreRegistry = window.appStoreRegistry || {}; window.appStoreRegistry[GM_info.script.uuid] = GM_info; localStorage.appStoreRegistry = JSON.stringify(appStoreRegistry); } catch (e) {}

//Create regex profiles (katakana matches need hiragana counterparts included)

function pairKatakana(char){
    if (/^[\u3040-\u309fー]$/.test(char)){//is char hiragana or "ー"?
        return char;
    }else{
        //set up pairs
        var offset = -6*16; //katakana block: 30a0-30ff
        var katakana = String.fromCharCode(char.charCodeAt(0) + offset);
        return "["+char+katakana+"]";
    }
}

function isKana(char){
    return /^[\u3040-\u30ff]$/.test(char);
}

function makeRegex(cV){
    var r = "^"; //start the regex string
    for (var c = 0; c < cV.length; c++){
        if (isKana(cV[c])){
            r += pairKatakana(cV[c]);
        }else{//we have a string of one or more non-kana character
            if (cV[c] !== "〜"){ //I doubt WK will be adding Kana suffixes but just covering all the bases to be safe.
                r += ".+";
                while ((c < cV.length)&&!isKana(cV[c+1])){
                    c++;//skip non-kana characters
                }
            }
        }            
    }
    r += "$";
    return new RegExp(r);
}


//Boy, I do love to wrap this function don't I?
var oldEvaluate = answerChecker.evaluate;
answerChecker.evaluate = function(e,t){
    var isLesson = /^http.*:\/\/www\.wanikani\.com\/lesson/.test(location.href);
    var cI = isLesson?$.jStorage.get("l/currentQuizItem"):$.jStorage.get("currentItem");
    if ((typeof cI.voc !== 'undefined')&&(isLesson?$.jStorage.get("l/questionType"):$.jStorage.get("questionType")) === "reading"&&!makeRegex(cI.voc).test(t)){//If it's a reading and it doesn't pass regex
        logMutations();
        return {exception: true};
    }else{
        return oldEvaluate(e,t);
    }
}


//If you've looked at the code for But No Cigar, you've seen this before

function logMutations(){

    var observer = new MutationObserver(function (mutations) {
        // iterate over mutations..
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length>0){
                if(mutation.addedNodes.item(0).classList){
                    if(mutation.addedNodes.item(0).classList.contains("answer-exception-form")){
                        mutation.addedNodes.item(0).innerHTML=mutation.addedNodes.item(0).innerHTML.replace(/WaniKani is looking for the [a-zA-Z']+ reading/, alertText);
                        observer.disconnect();

                    }}
            }



        });

        var highLanders = document.querySelectorAll("#answer-exception");
        if (highLanders.length > 1){ // There can be only one!!!
            for (hL=1; hL<highLanders.length; hL++){
                highLanders[hL].parentNode.removeChild(highLanders[hL]);
            }
        }


    });

    var settings = { 
        childList: true, subtree: true, attributes: false, characterData: false 
    }

    observer.observe(document.body, settings);
}



