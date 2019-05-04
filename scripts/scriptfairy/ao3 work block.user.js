// ==UserScript==
// @name         ao3 work block
// @namespace    https://greasyfork.org/en/users/36620
// @version      0.5.3
// @description  permanently hide selected works
// @author       scriptfairy
// @include      http://archiveofourown.org/*works*
// @include      https://archiveofourown.org/*works*
// @exclude      /https?://archiveofourown\.org/works/\d+/
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_deleteValue
// ==/UserScript==

var works = document.querySelectorAll('li.blurb');

// interface

var headerModule, blockLink, blockStyle;
for (i=0;i<works.length;i++) {
    headerModule = works[i].getElementsByClassName('header module')[0];
    blockLink = document.createElement('div');
    blockLink.className = 'workblock';
    blockLink.innerHTML = '<a class="blockThis">block</a>';
    headerModule.parentNode.insertBefore(blockLink, headerModule.nextSibling);
}
blockStyle = document.createElement('style');
blockStyle.innerHTML = 'div.workblock {text-align: right; font-family:monospace; position:relative; top:-40px; right:5px;}';
document.head.appendChild(blockStyle);

var unblock = document.createElement('li');
unblock.innerHTML = '<a>Work Block</a><ul class="menu"><li id="clearLast"><a>Unblock last</a></li><li id="clearAll"><a>Unblock all</a></li></ul>';
unblock.className = 'dropdown workblock';
var search = document.getElementsByClassName('primary navigation actions')[0].getElementsByClassName('search')[0];
search.parentNode.insertBefore(unblock, search);

// block works

function blockThis(work) {
    var id = work.id;
    GM_setValue(id, id);
    GM_setValue('last', id);
}

function blockSelected(works) {
    var blocked = GM_listValues();
    for (j=0; j<works.length; j++) {
        var workId = works[j].id;
        if (blocked.find(function(id){return id == workId;})) {
            document.getElementById(workId).style.display = 'none';
        }
    }
}

// unblock works

function clearAll(){
    var keys = GM_listValues();
    for (k=0;k<keys.length; k++) {
        GM_deleteValue(keys[k]);
    }
    location.reload();
}

function clearLast() {
    var unblockId = GM_getValue('last');
    GM_deleteValue('last');
    GM_deleteValue(unblockId);
    location.reload();
}

// run

blockSelected(works);

document.getElementById('clearLast').onclick = function() {clearLast();};
document.getElementById('clearAll').onclick = function() {clearAll();};

var blockLinks = document.getElementsByClassName('blockThis');
for (k=0; k<blockLinks.length; k++) {
    var blockLink = blockLinks[k];
    blockLink.onclick = function() {
        var work = this.parentNode.parentNode;
        blockThis(work);
        work.style.display = "none";
    };
}