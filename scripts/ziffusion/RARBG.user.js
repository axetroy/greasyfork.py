// ==UserScript==
// @name         RARBG
// @namespace    http://www.ziffusion.com/
// @description  RARBG highlight visited links
// @author       Ziffusion
// @match        https://rarbg.to/torrents.php*
// @grant        none
// @version      14.4
// ==/UserScript==

function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}
addGlobalStyle("a:visited { color: red; }");

var remove = [];
var nodes = document.getElementsByClassName("lista2");
for (var index = 0; index < nodes.length; ++index) {
  var node = nodes[index];
  var error = false;
  var msg = "";
  do {
    var torrent;
    var title;
    var link;
    if (!(torrent = node.children[1]) || !(link = torrent.children[0]) || !(title = link.innerHTML)) {
      error = "bad torrent";
      break;
    }
    var imdb;
    if (!(imdb = torrent.children[1])) {
      error = "no imdb";
      break;
    }
    var match = /.*imdb=(.*)/.exec(imdb.href);
    var imdb_id;
    if (!match || !(imdb_id = match[1])) {
      error = "no imdb link";
      break;
    }
    var child;
    if (!(((child = torrent.children[3]) && child.tagName == "SPAN") ||
          ((child = torrent.children[4]) && child.tagName == "SPAN"))) {
      error = "bad data";
      break;
    }
    var text = child.innerHTML;
    var match = /.*IMDB.*?([0-9.]+)\/[0-9]+.*/.exec(text);
    var rating;
    if (!match || !(rating = match[1])) {
      error = "no rating";
      break;
    }
    msg = rating + " --- " + text + " --- " + title;
    if((rating = parseFloat(rating)) < 7.5) {
      error = msg;
    } else {
      imdb.href = "http://www.imdb.com/title/" + imdb_id + "/";
      imdb.target = "_blank";
      imdb.innerHTML = "<font size=5>" + rating + "</font>";
      imdb.parentNode.removeChild(imdb);
      imdb.onmouseover = link.onmouseover;
      imdb.onmouseout = link.onmouseout;
      link.innerHTML = "<font size=2>" + link.innerHTML + "</font>";
      link.target = "_blank";
      child.parentNode.replaceChild(imdb, child);
    }
  } while (0);
  if (error) {
    msg = "remove: " + error;
    remove.push(node);
  } else {
    msg = "  keep: " + msg;
  }
  console.log(msg, node);
}

function find(path, context=document) {
  return document.evaluate(path, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

// context
var context = find("//table[@class='lista-rounded']");

// move search form to the end
var div0 = find("tbody//form[@id='searchTorrent']", context).parentNode;
var div1 = find("tbody/tr[3]/td[1]/div[1]", context);
div1.insertAdjacentElement("afterend", div0);

// cleanup
var elem = find("tbody/tr[1]", context);
remove.push(elem);

var elem = find("tbody/tr[2]/td[1]", context);
for (var idx = 0, child; idx < elem.children.length; idx++) {
  if ((child = elem.children[idx]).tagName.toLowerCase() != "table") {
    remove.push(child);
  } else {
    break;
  }
}

// remove elements
for (var index = 0; index < remove.length; ++index) {
  remove[index].parentNode.removeChild(remove[index]);
}