// ==UserScript==
// @name        BvS Banked Hangouts
// @description Modifies the Top Friend Rankings page to show only the allies you need to hang out with for retail
// @namespace   Terrec
// @match       *://*.animecubed.com/billy/bvs/shop-retail.html
// @match       *://*.animecubed.com/billy/bvs/team.html
// @match       *://*.animecubed.com/billy/bvs/friends.html
// @match       *://*.animecubed.com/billy/bvs/oneuseitems.html
// @match       *://*.animecubed.com/billy/bvs/missions/*
// @match       *://*.animecubed.com/billy/bvs/pages/main.html
// @match       *://*.animecubedgaming.com/billy/bvs/shop-retail.html
// @match       *://*.animecubedgaming.com/billy/bvs/team.html
// @match       *://*.animecubedgaming.com/billy/bvs/friends.html
// @match       *://*.animecubedgaming.com/billy/bvs/oneuseitems.html
// @match       *://*.animecubedgaming.com/billy/bvs/missions/*
// @match       *://*.animecubedgaming.com/billy/bvs/pages/main.html
// @version     1.14
// @history     1.14 Bugfix for the sorting algorithm
// @history     1.13 Uses localStorage if GM_ functions are missing
// @history     1.12 Made compatible with new site, made https compatible, and switched from @include to @match. Matches for old site left in for now.
// @history     1.11 The new Hammergirl ad broke the Hide/Show feature
// @history     1.10 Bugfix
// @history     1.9 Overnight friend point hangouts now reset the relevant allies' friend points
// @history     1.8 Bugfix, Bugman Lvl. 2 is considered to need ten million friend points to hang out with
// @history     1.7 Bugfix, Rankings page now sorts unbanked allies by how close they are to the minimum number of FP required to hang out with them
// @history     1.6 Parentheses hate me
// @history     1.5 Realized the messages have identifiers. Much better than timestamps
// @history     1.4 Now notices overnight friendship point hangouts and resets lists upon looping
// @history     1.3 Rankings page now defaults to only showing allies that need hangouts
// @history     1.2 Bugfix, compatibility fix for the Ally Types script, added friend point updater to missions, added the heng to the Rankings page, and changed the current friend points colors from red/black to blue/green
// @history     1.1 Added alt compatibility, added a mark next to the friend points of allies that need hangouts on the team page, and reworked the Rankings page changes
// @history     1.0 Initial release
// @grant       GM_setValue
// @grant       GM_getValue
// ==/UserScript==

try {
    if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
        this.GM_getValue=function (key,def) {
            return localStorage['BvSBankedHangouts.'+key] || def;
        };
        this.GM_setValue=function (key,value) {
            return localStorage['BvSBankedHangouts.'+key]=value;
        };
        this.GM_deleteValue=function (key) {
            return delete localStorage['BvSBankedHangouts.'+key];
        };
    }
} catch (e) {}

var alt = document.getElementsByName('player')[0];
if(alt)
    alt = alt.value;
else alt = GM_getValue('lastAlt');
GM_setValue('lastAlt',alt);
var data = JSON.parse(GM_getValue(alt,'{}'));
if(!data.banked)
    data.banked = [];
if(!data.allies)
    data.allies=[];
if(!data.friendPoints)
    data.friendPoints=[];
var needMoreLove = [];

function marker() {
    var marker = document.createElement('b');
    marker.style.color = 'red';
    marker.textContent = ' ꜧ';
    return marker;
}

if (location.pathname == '/billy/bvs/pages/main.html' && document.body.innerHTML.indexOf('dailyfail.gif') > -1) {
    var dann = document.getElementById('dann');
    if(dann){
        if(data.lastMessage) {
            var b = dann.getElementsByTagName('b');
            for(var i of b) {
                var test = i.textContent.match(/Hanging Out/);
                var ally = i.parentNode.textContent.match(/hanging out with (.*) via Friend Points/);
                if(test) {
                    var message = parseInt(i.previousSibling.name.substr(1));
                    if(message > data.lastMessage){
                        data.banked.push(ally[1]);
                        if(data.allies.indexOf(ally[1]) > -1)
                            data.friendPoints[data.allies.indexOf(ally[1])]='0';
                    }
                }
            }
        }
        var input = dann.getElementsByTagName('input');
        data.lastMessage = parseInt(input[0].name.substr(1));
    }
    
    var season;
    var temp = document.getElementsByTagName('i');
    for(var i of temp) {
        if(/Season \d+!/.exec(i.textContent))
            season = i.textContent;
    }
    if(season && data.season && data.season != season) {
        data.banked = [];
        data.allies = [];
        data.friendPoints = [];
        data.season = season;
    }
    GM_setValue(alt, JSON.stringify(data));
}

if (location.pathname == '/billy/bvs/shop-retail.html') {
    var font = document.getElementsByTagName('font');
    if (document.body.textContent.indexOf('Bonus Shifts given: ')>-1){
        var img = document.querySelectorAll("img[src^='/billy/layout/nin/']");
        for(var i of img) {
            var temp = data.banked.indexOf(i.attributes.src.value.replace(/_/g,' ').replace('/billy/layout/nin/','').replace(/(?: Lvl\. \d)?\.gif/,''));
            if(temp>-1)
                data.banked.splice(temp,1);
        }
        GM_setValue(alt, JSON.stringify(data));
    }
    else for(var i of font) {
        if (i.textContent.indexOf('(Allies who owe you one: ') > -1) {
            data.banked = i.textContent.replace(/ Lvl\. \d/g, '').slice(25, - 1).split(', ');
            GM_setValue(alt, JSON.stringify(data));
            break;
        }
    }
}

if (location.pathname == '/billy/bvs/oneuseitems.html' && document.body.textContent.indexOf('Sneaky Potato Used!') > -1) {
    var pitem = document.getElementById('pitem').getElementsByTagName('i');
    for(var i of pitem){
        var temp = i.textContent.match(/20 \/ 20: (.*) offers a shift for the potato!/);
        if(temp) {
            data.banked.push(temp[1].replace(/ Lvl\. \d/,''));
            GM_setValue(alt, JSON.stringify(data));
        }
    }
}

if (location.pathname == '/billy/bvs/team.html') {
    data.allies=[];
    data.friendPoints=[];
    if (document.body.innerHTML.indexOf("<b>Reorganize Allies</b>") > -1) {
        var allyList = document.getElementById('teamrep').firstElementChild.rows;
        for(var i of allyList) {
            var b = i.getElementsByTagName('b')[0];
            var newAlly = b.textContent.replace(/ Lvl\. ./g, '').replace(/\[.*\]/,"");
            data.allies.push(newAlly);
            var parent = b.parentNode;
            var fpNode;
            for(var j of parent.children)
                if(j.textContent.indexOf('Friend Points: ') > -1)
                    fpNode = j;
            var newAllyFP = fpNode.textContent.match(/\(Friend Points: (.*)\)/)[1]
            data.friendPoints.push(newAllyFP);
            if (data.banked.indexOf(newAlly) == -1) {
                //Mark the ally as needing a hangout
                parent.insertBefore(marker(),fpNode.nextSibling);
            }
        }
        if(document.getElementById('teamrep').textContent.indexOf('Bugman Lvl. 2') > -1)
            data.hologram = true;
        else data.hologram = false;
        GM_setValue(alt, JSON.stringify(data));
    }
}

if (location.pathname.startsWith('/billy/bvs/missions/')) {
    if(document.body.textContent.indexOf('Jutsu XP:') > -1){
        var span = document.getElementsByTagName('span');
        for(var i of span){
            if(i.title.indexOf('Friend Points: ')>-1){
                var ally = i.title.match(/header=\[(.*)\] body/)[1].replace(/ Lvl\. \d/,'');
                var FP = i.title.match(/Friend Points\: (.*)\s\s\] offsetx/)[1];
                if(data.allies.indexOf(ally)>-1)
                    data.friendPoints[data.allies.indexOf(ally)]=FP;
            }
        }
        GM_setValue(alt, JSON.stringify(data));
    }
}

if (location.pathname == '/billy/bvs/friends.html') {
    var table = document.evaluate(".//table[contains(./tbody/tr/td/font,'Top Friend Rankings')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var friendList = table.getElementsByTagName('i');
    for(var i of friendList) {
        var newAlly = i.textContent;

        var td = i.parentNode.parentNode.nextElementSibling.getElementsByTagName('td')[1];
        var targetFP = td.innerHTML.replace(/,/g,'').match(/(\d+)/g);
        if(targetFP.length==10)
            targetFP = targetFP[targetFP.length-1];
        else targetFP = 999;
        if(data.hologram && newAlly=='Bugman')
            targetFP = 10000000;
        var span = document.createElement('span');
        i.parentNode.appendChild(span);
        if(data.allies.indexOf(newAlly)>-1) {
            var allyFP = data.friendPoints[data.allies.indexOf(newAlly)];
            span.innerHTML="<br>"+allyFP;
            if(parseInt(allyFP.replace(/,/g,''))>targetFP)
                span.style.color='green';
            else span.style.color='blue';
            if (data.banked.indexOf(newAlly)==-1) {
                span.parentNode.insertBefore(marker(),span);
                var fpNeeded = targetFP - parseInt(allyFP.replace(/,/g,''));
                needMoreLove.push({td: i.parentNode.parentNode.parentNode.parentNode.parentNode.cloneNode(true), fpNeeded: fpNeeded});
            }
        }
        else span.innerHTML="<br><br>";
    }
    needMoreLove.sort(function(a, b) {
        if(a.fpNeeded == b.fpNeeded)
            return 0;
        if(a.fpNeeded < 0 || b.fpNeeded < 0)
            return a.fpNeeded < b.fpNeeded || -1;
        return a.fpNeeded > b.fpNeeded || -1;
    });
    while(needMoreLove.length>0){
        var tr = table.insertRow(-1);
        tr.style.display = 'none';
        tr.appendChild(needMoreLove.shift().td);
        if(needMoreLove.length>0)
            tr.appendChild(needMoreLove.shift().td);
    }
    var toggle = document.createElement('a');
    toggle.href = 'javascript:void(0);'
    toggle.setAttribute("onclick","var table=this.parentNode.parentNode.parentNode;for( var i=1; i < table.children.length; i++){if(table.children[i].style.display=='')table.children[i].style.display='none'; else table.children[i].style.display='';} if(this.textContent=='Show All Allies') this.textContent='Hide Banked/Unobtained Allies'; else this.textContent='Show All Allies';");
    toggle.textContent = 'Hide Banked/Unobtained Allies';
    table.rows[0].firstChild.appendChild(toggle);
    toggle.click();
}
