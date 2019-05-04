// ==UserScript==
// @name         CS host groups
// @namespace    http://ya.ru
// @version      1.2
// @description  Allows to divide CS hosts into groups: cool, maybe, ignore.
// @author       Milosh Petrov
// @match        https://www.couchsurfing.com/members/hosts*
// @match        https://www.couchsurfing.com/users/*
// @match        https://www.couchsurfing.com/people/*
// @match        https://www.couchsurfing.com/dashboard*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @grant        unsafeWindow
// @run-at       document-idle
// ==/UserScript==

(function() {
    var COOL = 'cool';
    var MAYBE = 'maybe';
    var IGNORE = 'ignore';
    
    var doc = unsafeWindow.document;
    var url = doc.URL;
    var listMode = url.includes('/members/');
    var onDashboard = url.includes('/dashboard');
    
    function getUserIdFromUrl(userUrl) {
        if (!userUrl) return '';
        var start = 0;
        var pplIdx = userUrl.indexOf('/people/');
        var usrIdx = userUrl.indexOf('/users/');
        if (pplIdx > 0) {
            start = pplIdx + 8;
        } else if (usrIdx > 0) {
            start = usrIdx + 7;
        }
        if (!start) return '';
        var userId = userUrl.substring(start);
        
        for (var i = 0; i < 3; i++) {
            var sym = i == 0 ? '/' : i == 1 ? '#' : '?';
            var idx = userId.indexOf(sym);
            if (idx > 0) userId = userId.substring(0, idx);
        }
        return userId;
    }
    
    function clearValues(reload) {
        var list = GM_listValues();
        for (var i = 0; i < list.length; i++) {
            GM_deleteValue(list[i]);
        }
        if (reload) doc.location.reload();
    }
    
    if (listMode) {
        initOnList();
    } else if (onDashboard) {
		enchanceDashboard();
    } else {
        enchanceProfile();
	}
    
    
    //=================================================================================
    function initOnList() {
        var css = '' + 
            '.verification-card-link {display: none}' +
            //'.mp-error {background-color: #F2F5A9}' +
            '.mp-' + IGNORE + ' {background-color: #5A5A5A}' +
            '.mp-' + MAYBE + ' {background-color: #EAEFA8}' +
            '.mp-' + COOL + ' {background-color: #C2DCE4}';
        GM_addStyle(css);
        GM_registerMenuCommand('Clear CS groups', function () { clearValues(true); });

        enchanceList();
        var container = doc.getElementsByClassName('container')[0];
        if (!container) return;
        var observer = new MutationObserver(function(mutations) {
            enchanceList();
        });
        observer.observe(container, {childList: true, subtree: true});
    }
    
    function enchanceList() {
        var cards = doc.getElementsByClassName('card');
        for (var i = 0, card = cards[0]; i < cards.length; card = cards[++i]) {
            processListCard(card);
        }
    }
    
    function processListCard(card) {
        var titleH2 = card.getElementsByClassName('card__title')[0];
        if (!titleH2) return;
        var link = titleH2.getElementsByTagName('a')[0];
        if (!link) return;
        var userId = getUserIdFromUrl(link.href);
        if (!userId) {
            card.className += ' mp-error';
            return; 
        }
        var userGroup = GM_getValue(userId, '');
        if (!userGroup) return;
        if (userGroup === COOL || userGroup === MAYBE || userGroup === IGNORE) {
            card.className += ' mp-' + userGroup;
            return;
        }
        card.className += ' mp-error';
    }
    
    
    //===============================================================================
    function enchanceProfile() {
        var userId = getUserIdFromUrl(url);
        if (!userId) return; 
        var currGroup = GM_getValue(userId);
        if (!currGroup) {
            currGroup = 'ignore';
            GM_setValue(userId, currGroup);
        }
        var pHeader = doc.getElementsByClassName('box-header')[2];
        if (!pHeader) return;
        var linksDiv = doc.createElement('div');
        appendLink(userId, linksDiv, COOL, 'Contacted');
        appendLink(userId, linksDiv, MAYBE, 'Doubtful');
        appendLink(userId, linksDiv, IGNORE, 'Ignore');
        pHeader.insertBefore(linksDiv, pHeader.children[1]);
        updateLinks(linksDiv, currGroup);
    }
    
    function appendLink(userId, div, group, groupName) {
        var a = doc.createElement('a');
        a.appendChild(doc.createTextNode(groupName));
        a.style['margin-right'] = '10px';
        a.href = '#';
        a.className = 'mp-link-' + group;
        a.onclick = function() {
            GM_setValue(userId, group);
            updateLinks(div, group);
            return false;
        }
        div.appendChild(a);
    }
    
    function updateLinks(div, currGroup) {
        var links = div.getElementsByTagName('a');
        for (var i = 0, a = links[0]; i < links.length; a = links[++i]) {
            var isCurr = a.className === 'mp-link-' + currGroup;
            a.style['font-weight'] = isCurr ? 'bold' : '';
            //a.style['font-style'] = isCurr ? 'italic' : '';
            a.style['font-size'] = isCurr ? '130%' : '';
            a.style['pointer-events'] = isCurr ? 'none' : '';
            a.style['cursor'] = isCurr ? 'ponter' : '';
            //a.style['color'] = isCurr ? 'black' : '';
        }
    }
	
	//===============================================================================
    function enchanceDashboard() {
        var wh = doc.getElementsByClassName('box');
        if (!wh || !wh.length) return;
        var prevEl = wh[0];
        if (!prevEl) return;
        var div = doc.createElement('section');
        div.className = 'box';
        prevEl.parentNode.insertBefore(div, prevEl.nextSibling);
        var header = doc.createElement('header');
        header.className = 'box-header';
        div.appendChild(header);
        var headerH = doc.createElement('h1');
        headerH.className = 'box-header-title';
        header.appendChild(headerH);
        headerH.appendChild(doc.createTextNode('Host Groups Plugin'));
        var contentDiv = doc.createElement('div');
        contentDiv.className = 'box-content';
        div.appendChild(contentDiv);
        var textArea = doc.createElement('textarea');
        contentDiv.appendChild(textArea);
        var userData = readUsers();
        textArea.value = userData.serialized;
        textArea.rows = 10;
        var applyLink = doc.createElement('a');
        contentDiv.appendChild(applyLink);
        applyLink.appendChild(doc.createTextNode('Apply'));
        applyLink.href = '#';
        applyLink.onclick = createApplyVals(textArea);
        
        var maybeLinkDiv = doc.createElement('div');
        contentDiv.appendChild(maybeLinkDiv);
        maybeLinkDiv.style['margin-top'] = '10px';
        maybeLinkDiv.appendChild(doc.createTextNode('Maybe: '));
        for (var i = 0; i < userData.maybeUsers.length; i++) {
            var userId = userData.maybeUsers[i];
            var maybeLink = doc.createElement('a');
            maybeLinkDiv.appendChild(maybeLink);
            maybeLinkDiv.appendChild(doc.createElement('br'));
            maybeLink.appendChild(doc.createTextNode(userId));
            var hrefPref = isNaN(userId) ? '/people/' : '/users/';
            maybeLink.href = hrefPref + userId;
            maybeLink.target = '_blank';
            maybeLink.style['margin-right'] = '10px';
        }
    }
    
    function readUsers() {
        var coolList = COOL + ':';
        var maybeList = MAYBE + ':';
        var ignoreList = IGNORE + ':';
        var maybeUsersEh = [];
        var list = GM_listValues();
        for (var i = 0; i < list.length; i++) {
            var userId = list[i];
            var group = GM_getValue(userId);
            if (group === COOL) coolList += userId + ',';
            if (group === MAYBE){
                maybeList += userId + ',';
                maybeUsersEh.push(userId);
            }
            if (group === IGNORE) ignoreList += userId + ',';
        }
        var serialized = coolList + '\n' + maybeList + '\n' + ignoreList + '\n';
        return {serialized: serialized, maybeUsers: maybeUsersEh};
    }
    
    function createApplyVals(textArea) {
        function parse(o, group) {
            var prefix = group + ':';
            if (!o.val.startsWith(prefix)) {
                o.err = true;
                return;
            }
            var lineEnd = o.val.indexOf('\n');
            var str = o.val.substring(prefix.length, lineEnd);
            userIds = str.split(',');
            for (var i = 0; i < userIds.length; i++) {
                var userId = userIds[i];
                if (!userId) continue;
                o[group].push(userId);
            }
            o.val = o.val.substr(lineEnd + 1);
        }
        
        function write(o, group) {
            userIds = o[group];
            for (var i = 0; i < userIds.length; i++) {
                var userId = userIds[i];
                GM_setValue(userId, group);
            }
        }
        
        return function() {
            if (!confirm('This will rewrite your records, continue?')) return false;
            if (!textArea) return;
            var o = {val: textArea.value};
            o[COOL] = [];
            o[MAYBE] = [];
            o[IGNORE] = [];
            parse(o, COOL);
            parse(o, MAYBE);
            parse(o, IGNORE);
            if (o.err) {
                alert('Input contains errors');
                return false;
            }
            clearValues(false);
            write(o, COOL);
            write(o, MAYBE);
            write(o, IGNORE);
            doc.location.reload();
            return false;
        }
    }
}())