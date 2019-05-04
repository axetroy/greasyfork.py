// ==UserScript==
// @name           tiss_developer_tweaks
// @namespace      https://greasyfork.org/de/users/157797-lual
// @include        *tiss.tuwien.ac.at*
// @include        http://localhost:3*
// @exclude        /^https?://dev.tiss.tuwien.ac.at.*$/
// @exclude        /^https?://odevmaster.tiss.tuwien.ac.at.*$/
// @exclude        /^https?://account.tiss.tuwien.ac.at.*$/
// @exclude        /^https?://keycloak.devcloud.tiss.tuwien.ac.at.*$/
// @exclude        /^https?://jenkins.devcloud.tiss.tuwien.ac.at.*$/
// @exclude        /^https?://datengrube.tiss.tuwien.ac.at.*$/
// @exclude        /^https?://rocketchat.devcloud.tiss.tuwien.ac.at.*$/
// @exclude        /^https?://secure-sso.devcloud.tiss.tuwien.ac.at.*$/
// @version        0.36
// @author         lual
// @description    for tiss-developers - a better tiss it is.
// @author         fg (csd)
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// ==/UserScript==
// changes:        2017-11-01 publish on greasyfork
//                            https://greasyfork.org/de/scripts/34721-tiss-developer-tweaks
//                 2017-11-03 mark current menu entry
//                            fill unused space - use whole screen width
//                 2017-11-06 production warning border also for chrome
//                 2018-08-03 bugfix - production warning border - for tiss-help-system
//                 2018-08-03 add next.devcloud
//                 2018-09-18 dynamic environment list
//                 2018-09-18 exclude dev.tiss.tuwien.ac.at (redmine)
//                 2018-09-18 fix XML rendering for firefox
//                 2018-09-18 exclude odevmaster.tiss.tuwien.ac.at
//                 2018-09-18 exclude others
//                 2018-09-18 check if this is a tiss site or abort
//                 2018-09-29 decrease score for unused sites
//                 2018-09-29 rightAlign tabs
//                 2018-09-30 add menu entry to remove last environment tab
//                 2018-10-15 bugfix - maxsize
//                 2018-10-23 if corrupt - reset local stored environment list 
//                 2019-03-06 exclude account.tiss + keycloak.devcloud (neues gasTUser Portal)
//                 2019-04-30 change favicon for non-tiss-sites
//                            red    favicon for prod
///////////////////////////////////////////////////////////////////////////////
var Util = {
  log: function () {
    var args = [].slice.call(arguments);
    args.unshift('%c' + SCRIPT_NAME + ':', 'font-weight: bold;color: purple;');
    console.log.apply(console, args);
  },
  storeGet: function(key) {
    if (typeof GM_getValue === "undefined") {
      var value = localStorage.getItem(key);
      if (value === "true" || value === "false") {
        return (value === "true") ? true : false;
      }
      return value;
    }
    return GM_getValue(key);
  },
  storeSet: function(key, value) {
    if (typeof GM_setValue === "undefined") {
      return localStorage.setItem(key, value);
    }
    return GM_setValue(key, value);
  },
  storeDel: function(key) {
    if (typeof GM_deleteValue === "undefined") {
      return localStorage.removeItem(key);
    }
    return GM_deleteValue(key);
  },
  //moves an item in an array - (given arr will be altered!)
  move: function(arr, old_index, new_index) {
      while (old_index < 0) {
          old_index += arr.length;
      }
      while (new_index < 0) {
          new_index += arr.length;
      }
      if (new_index >= arr.length) {
          let k = new_index - arr.length;
          while ((k--) + 1) {
              arr.push(undefined);
          }
      }
       arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
     return arr;
  }
};

var SCRIPT_NAME = 'tiss_developer_tweaks';
var TISS_ENV_LIST_MAXSIZE = 7;

Util.log('started');

///////////////////////////////////////////////////////////////////////////////
// don't modify anything and exit script if document format is not html
// (because maybe the site is XML-format and firefox can't handle that
// https://bugzilla.mozilla.org/show_bug.cgi?id=1401793)
if (!(document.doctype && document.doctype.nodeName ==="html")){
  Util.log('doctype != html -> abort purposely...');
  throw new Error("tiss_developer_tweaks - aborted");
}
///////////////////////////////////////////////////////////////////////////////

var checkMenu = document.getElementsByClassName("clearfix toolNav")[0];
if (checkMenu == null){
  //this is not tiss - (maybe a better_errors-page)
  //change favicon
  var Favicon = document.createElement('link');
  Favicon.setAttribute('rel', 'shortcut icon');
  Favicon.setAttribute('href', '/images/icons/favicontest.ico');
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(Favicon);
  //abort
  Util.log('this is not tiss? -> abort purposely...');
  throw new Error("tiss_developer_tweaks - aborted");
}
///////////////////////////////////////////////////////////////////////////////

let tissEnvListInitial = [
    { "host": 'tiss.tuwien.ac.at',
      "prot": 'https:',
      "text": 'Echtsystem!',
      "protect": true,
      "score": 0,
      "last_use": Date.now()
    }
  ]
let tissEnvList = []
let tissEnvListUnparsed = Util.storeGet('tissEnvList');

try {
    if (tissEnvListUnparsed==null) {
        // fill initial
        tissEnvList = tissEnvListInitial;
    } else {
        //Util.log('tissEnvListUnparsed: ' + tissEnvListUnparsed);
        tissEnvList = JSON.parse(tissEnvListUnparsed);
    }
    // validate tissEnvList - check if each entry has all elements
    tissEnvList.forEach(function(e) {
      if (!('host' in e)) { throw "Parsing tissEnvList not possible!";};
      if (!('prot' in e)) { throw "Parsing tissEnvList not possible!";};
      if (!('text' in e)) { throw "Parsing tissEnvList not possible!";};
      if (!('protect' in e)) { throw "Parsing tissEnvList not possible!";};
      if (!('score' in e)) { throw "Parsing tissEnvList not possible!";};
      if (!('last_use' in e)) { throw "Parsing tissEnvList not possible!";};
    });
}
catch (e) {
    Util.log('Error: ' + e);
    Util.log('Reset tissEnvList!');
    tissEnvList = tissEnvListInitial;
}

//Util.log('tissEnvList: ' + JSON.stringify(tissEnvList, null, "  "));

var i = tissEnvList.findIndex(function (x) { return (x.host === window.location.host && x.prot===window.location.protocol); });
if (i===-1) {
  //aktuelle seite ist noch nicht in liste - in liste aufnehmen
  //vorher noch maxsize prüfen
  if(tissEnvList.length>TISS_ENV_LIST_MAXSIZE){
    Util.log('tissEnvList wird zu lange. Letzter Link fliegt raus:' + tissEnvList[tissEnvList.length-1].text)
    tissEnvList.pop();
  };
  tissEnvList.push({
    "host": window.location.host,
    "prot": window.location.protocol,
    "text": window.location.host.replace('.tiss.tuwien.ac.at','').replace('devcloud','dc').replace('localhost','lh'),
    "protect": false,
    "score":0,
    "last_use": Date.now()
  });
  Util.log('Neu in tissEnvList aufgenommen:' + tissEnvList[tissEnvList.length-1].text)
}
else {
  //aktuelle seite ist bereits in liste
  //score erhöhen
  tissEnvList[i].score = Math.max(1,tissEnvList[i].score + 1 );
  tissEnvList[i].last_use=Date.now();
  if (tissEnvList[i].protect===false && i>0 && tissEnvList[i-1].protect===false && tissEnvList[i].score > tissEnvList[i-1].score) {
    //um einen platz nach vorne sortieren
    Util.move(tissEnvList, i, i-1);
    Util.log(tissEnvList[i].text + 'rutscht mit score ' + tissEnvList[i].score + ' einen platz nach vorne! ')
  }
}

// score aller seiten verringern, die schon länger nicht aufgerufen wurden
for (i = 0; i < tissEnvList.length; ++i) {
  var last_use_in_days_ago = Math.round(( Date.now() - new Date(Number(tissEnvList[i].last_use))) / 86400000 ) //(24 * 1000 * 60 * 60 * 1000[ms])
  //Util.log(tissEnvList[i].text + ' wurde vor ' + last_use_in_days_ago + ' tagen zuletzt aufgerufen.');
  tissEnvList[i].score = Math.max(-10000, Math.min(10,(tissEnvList[i].score - Math.round(last_use_in_days_ago / 5))));
}

//limit list size
tissEnvList.splice(TISS_ENV_LIST_MAXSIZE + 1);
//tissEnvList is now actual - write to local storage
//Util.log('tissEnvList: ' + JSON.stringify(tissEnvList, null, "  "));
Util.storeSet('tissEnvList', JSON.stringify(tissEnvList, null, "  "));

function populateMenu() {
  var menu;
  menu = document.getElementsByClassName("clearfix toolNav")[0];
  if (menu == null){
    return
  }
  var li;
  var newLink;
  var text;
  var newSpan;
  for (var i = tissEnvList.length-1; i >= 0; i-- ) {
    if (tissEnvList[i].score === -10000) { continue; }
    li = document.createElement("li");
    li.classList.add('rightAlign');
    li.setAttribute("id", SCRIPT_NAME + "_tab_"+i);
    newSpan = document.createElement("span");
    if (window.location.host == tissEnvList[i].host)
    {
      text = document.createTextNode(tissEnvList[i].text);
      newSpan.appendChild(text);
      newSpan.setAttribute("style", "color:grey; font-weight: bold;");
      newSpan.setAttribute("style", "color:grey; font-weight: bold; background: #FFFFFF; border-left: 1px solid #CDDAE1; border-right: 1px solid #CDDAE1; border-top: 1px solid #CDDAE1; padding-left:4px; padding-right:4px; background: linear-gradient(to top, #F5FAFD, #FFFFFF);");
    } else {
      newLink = document.createElement("a");
      newLink.setAttribute('href',tissEnvList[i].prot + '//' + tissEnvList[i].host + window.location.pathname + window.location.search + window.location.hash);
      newLink.innerHTML = '&nbsp;' + tissEnvList[i].text + '&nbsp;';
      newSpan.appendChild(newLink);
    }
    li.appendChild(newSpan);
    menu.appendChild(li);
  }
}
populateMenu();

GM_registerMenuCommand(SCRIPT_NAME + ': Remove last Environment Tab!', function() {
    var i = tissEnvList.length-1
    var tab_to_remove = document.getElementById(SCRIPT_NAME + "_tab_"+i);
    if (tab_to_remove != null){
      Util.log('Clear last Tab...');
      tab_to_remove.style.visibility = "hidden";
      //tab_to_remove.parentNode.removeChild(tab_to_remove);
      tissEnvList.pop();
      //tissEnvList  - write to local storage
      Util.storeSet('tissEnvList', JSON.stringify(tissEnvList, null, "  "));
    }
});
////////////////////////////////////////////////////////////////////////////////
//ECHTSYSTEM! - warning-bar
//(kopiert von userstyle tiss-env-border https://userstyles.org/styles/121958/tiss-env-border)
//@-moz-document regexp(".*[^\.]tiss[\.]tuwien[\.]ac[\.]at.*"){ body:before... } funktioniert leider nur im ff
    if (window.location.host == 'tiss.tuwien.ac.at')
    {
      GM_addStyle(`
        body:before {
          content: " ";
          position: fixed;
          background: #FF0000;
          left: 0;
          right: 0;
          height: 11px;
          z-index:100;
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='11px' width='90px'><text x='9' y='9' fill='white' font-size='10' font-weight='bold' font-family='Arial, Helvetica, sans-serif' >ECHTSYSTEM ! </text></svg>");
          top: 0;
        }
        body {
          margin-top:11px;
        }
     `);
      //change prod favicon 
      var FaviconProd = document.createElement('link');
      FaviconProd.setAttribute('rel', 'shortcut icon');
      FaviconProd.setAttribute('href', '/images/icons/faviconrot.ico');
      var header = document.getElementsByTagName('head')[0];
      header.appendChild(FaviconProd);
    }
////////////////////////////////////////////////////////////////////////////////
// mark current menu entry
GM_addStyle(`
  #supNav ul li.currentPageItem > span > a {
    background: #FFFFFF;
    border-bottom: 1px solid #CDDAE1;
    border-top: 1px solid #CDDAE1;
  }
  .organisation #supNav ul li.currentPageItem > span > a {
    background: linear-gradient(to right, #DAC4F3, #F5FAFD, #F5FAFD, #F5FAFD, #F5FAFD, #FFFFFF);
  }
  .lehre #supNav ul li.currentPageItem > span > a {
    background: linear-gradient(to right, #DA923C, #F5FAFD, #F5FAFD, #F5FAFD, #F5FAFD, #FFFFFF);
  }
  .forschung #supNav ul li.currentPageItem > span > a {
    background: linear-gradient(to right, #9FC65A, #F5FAFD, #F5FAFD, #F5FAFD, #F5FAFD, #FFFFFF);
  }
  #shadow_top {
    z-index: 0;}
`);

////////////////////////////////////////////////////////////////////////////////
// fill unused space - use whole screen width
GM_addStyle("body>#wrapper {max-width: 98%!important;}");
////////////////////////////////////////////////////////////////////////////////
Util.log('End');