// ==UserScript==
// @name         FAForumSFWversion
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Allow you to hide NSFW topics or mark them with a red prefix, you can specify tags to filter in order to take new words in account
// @author       MissNook
// @match        http://forums.furaffinity.net/forums/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var tagsToCheck = localStorage.tagsToCheck ? localStorage.tagsToCheck.split(",") : ["nsfw", "nswf", "not sfw", "fetish", "diaper", "inflation", "vore", "bondage"];
    var content = document.getElementById("content");

    function addNSFWPrefix(){
        var threads = content.getElementsByClassName("discussionListItem");

        var prefixNSFW = document.createElement("a");
        prefixNSFW.className = "prefixLink prefixForNSFW";
        prefixNSFW.innerHTML = "<span class='prefix prefixRed'>NSFW:</span>"

        var len = threads.length,
            i = 0;
        for(; i<len;i++){
            var currThreadTitle = threads[i].getElementsByClassName("title")[0];

            if(matchInArray(currThreadTitle.innerText, tagsToCheck)){
                threads[i].className += " NSFWtagged"
                currThreadTitle.insertBefore(prefixNSFW.cloneNode(true), currThreadTitle.firstChild);
            }
        }
    }
    addNSFWPrefix();

    function addTagInput(){
        var nav = content.getElementsByClassName("PageNav")[0];
        var divTag = document.createElement("div");
        divTag.className = "primaryControls";
        divTag.style = "text-align:right;";
        divTag.innerHTML = "<span>Tags to filter for NSFW : </span><input type='search' id='tagsNSFWInput' class='textCtrl' title='Enter your tags to filter as NSFW'><span class='prefix prefixGreen' id='btnValidateInputNSFW'>Validate tags change</span><span class='prefix prefixRed' id='btnHideNSFW'>Hide NSFW</span>";
        var input = divTag.getElementsByClassName("textCtrl")[0];
        input.value = tagsToCheck.join(";");
        input.style = "width:20em;";
        input.addEventListener("keyup", function(event) {
            event.preventDefault();
            //press enter
            if (event.keyCode === 13) {
                manageNewTags();
            }
        });

        var btnValidInput = divTag.childNodes[2];
        btnValidInput.onclick = manageNewTags;
        btnValidInput.style.cursor = "pointer";
        btnValidInput.style.marginLeft = "10px";

        var hideBtn = divTag.lastChild;
        hideBtn.style.cursor = "pointer";
        hideBtn.style.marginLeft = "10px";
        hideBtn.onclick = showHideNSFW;

        nav.appendChild(divTag);
    }
    addTagInput();

    function showHideNSFW(){
        var nsfwTaggedContents = content.getElementsByClassName("NSFWtagged");
        var toggleBtn = document.getElementById("btnHideNSFW");
        var hide = toggleBtn.innerText == "Hide NSFW";
        toggleBtn.innerText = hide ? "Show NSFW" : "Hide NSFW";

        var len = nsfwTaggedContents.length,
            i = 0;
        for(; i<len;i++){
            nsfwTaggedContents[i].style.display = hide ? "none": "table";
        }
    }


    function fillTagsWithUserTag(){
        var inputNSFW = document.getElementById("tagsNSFWInput");
        var tempTabTags = inputNSFW.value.split(";");
         var len = tempTabTags.length,
            i = 0;
        for(; i<len;i++){
            if(tempTabTags[i] == ""){
                tempTabTags.splice(i,1);
            }
        }
        tagsToCheck = tempTabTags;
        localStorage.tagsToCheck = tagsToCheck;
    }

    function reinitThreads(){
        var threads = content.getElementsByClassName("NSFWtagged");
        var len = threads.length,
            i = 0;
        for(; i<len;i++){
            var thread = threads[0];
            var nsfwPrefix = thread.getElementsByClassName("prefixForNSFW")[0];
            nsfwPrefix.parentNode.removeChild(nsfwPrefix);
            thread.className = thread.className.replace(" NSFWtagged","");
        }
    }

    function manageNewTags(){
        fillTagsWithUserTag();
        reinitThreads();
        addNSFWPrefix();
    }

    function matchInArray(string, expressions) {
        var len = expressions.length,
            i = 0;
        for (; i < len; i++) {
            if (string.match(new RegExp(expressions[i],'gi'))) {
                return true;
            }
        }
        return false;
    };
})();
