// ==UserScript==
// @name        ReleaseBB rlsbb TV Show Tracker
// @description Follow TV Shows on rlsbb.ru and swiftly find new episodes
// @namespace   drdre
// @license     MIT
// @include     /^https?:\/\/(www\.)?rlsbb\.com\/$/
// @include     /^https?:\/\/(www\.)?rlsbb\.com\/page\/\d+\/?(#.*)?$/
// @include     /^https?:\/\/(www\.)?rlsbb\.com\/category\/tv-shows\/(page\/\d+\/?)?$/
// @include     /^https?:\/\/(www\.)?rlsbb\.com\/\?s=.+&submit=Find$/
// @include     /^https?:\/\/(www\.)?rlsbb\.com\/search/.*$/
// @include     /^https?:\/\/(www\.)?rlsbb\.ru\/$/
// @include     /^https?:\/\/(www\.)?rlsbb\.ru\/page\/\d+\/?(#.*)?$/
// @include     /^https?:\/\/(www\.)?rlsbb\.ru\/category\/tv-shows\/(page\/\d+\/?)?$/
// @include     /^https?:\/\/(www\.)?rlsbb\.ru\/\?s=.+&submit=Find$/
// @include     /^https?:\/\/(www\.)?rlsbb\.ru\/search/.*$/
// @exclude     http://www.rlsbb.ru/maintenance.html
// @exclude     http://www.rlsbb.com/maintenance.htm
// @exclude     http://rlsbb.ru/maintenance.html
// @exclude     http:/rlsbb.com/maintenance.htm
// @version     7

// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_xmlhttpRequest
// @grant       GM_openInTab

// @grant       GM.setValue
// @grant       GM.getValue
// @grant       GM.xmlHttpRequest
// @grant       GM.openInTab

// @require     https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// ==/UserScript==
"use strict";


var nukes = ["PROPER","REPACK","RERIP","UPDATE","REAL"];



function pad2(i) { 
  if(i < 10 && i > -10) { 
     return "0"+parseInt(i,10) 
  } 
  return ""+parseInt(i,10); 
}

function int(s) {
  return parseInt(s,10);
}

function float(s) {
  return parseFloat(s);
}

function trim(str) {
  return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  }
  
function parseMonthname(name) {
  var o = {"month": "long"};
  for(var i = 0; i < 12; i++) {
    if((new Date(i*2678400000)).toLocaleDateString("en-US", o) == name) {
      return i;
    }
  }
  return -1;
}

function humanBytes(bytes, precision) {
 bytes = parseInt(bytes,10);
 if(bytes === 0) return '0 Byte';
 var k = 1024;
 var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
 var i = Math.floor(Math.log(bytes) / Math.log(k));
 return parseFloat((bytes / Math.pow(k, i)).toPrecision(2)) + ' ' + sizes[i];
}


function base64BinaryString(s) {
  const base64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  const l = s.length;
  var o = [];
  var char0,char1,char2,char3;
  var byte0,byte1,byte2;
  var t;
  var i = 0;
  while(i < l) {
    byte0 = s.charCodeAt(i++) & 0xff;
    byte1 = i<l?s.charCodeAt(i++) & 0xff:0;
    byte2 = i<l?s.charCodeAt(i++) & 0xff:0;
    char0 = byte0 >> 2;
    char1 = ((byte0 & 0x3) << 4) | (byte1 >> 4);
    char2 = ((byte1 & 0x0f) << 2) | (byte2 >> 6);
    char3 = byte2 & 0x3f;
    t = i - (l - 1);
    if(t == 1) {
      char3 = 64;
    } else if(t == 2) {
      char3 = 64;
      char2 = 64;
    }
    o.push(base64.charAt(char0), base64.charAt(char1), base64.charAt(char2), base64.charAt(char3));
  }
  return o.join("");
}

function loadCrossSiteImage(url,cb) {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  
  var img0 = document.createElement("img"); // To get image dimensions
  img0.addEventListener("load",function(){
    if(img0.height == 0 || img0.width == 0) return;
    canvas.height = img0.height;
    canvas.width = img0.width;
    GM.xmlHttpRequest ({
      method: 'GET',
      overrideMimeType: 'text/plain; charset=x-user-defined',
      url: url, // Load cross site image into canvase
      onload: function (resp) {
        var dataurl = "data:image/jpeg;base64," + base64BinaryString(resp.responseText);
        var img1 = document.createElement("img"); // Image is already data url, but let's compress it a little bit
        img1.addEventListener("load",function(){
          ctx.drawImage(img1, 0, 0);
          cb(url,canvas.toDataURL("image/jpeg",0.2));
        });
        img1.src = dataurl;
      }
    });
  });
  img0.src = url;
}

// #################################


var libversion = false;
var lastlibversion = false;
var records;
var ignoreShows;

var libmaxlifetime = 1000;
var lastlibload = -1;

var mapID2Index = {}; // temporary cache for finding an entry by its ID i.e. unique URL

async function load() {
  if((new Date()).getTime() - lastlibload < libmaxlifetime) {
    return;
  }
  lastlibload = (new Date()).getTime();
  libversion = int(await GM.getValue("libversion",Number.MIN_SAFE_INTEGER));
  if(lastlibversion == libversion) return;
  records = JSON.parse(await GM.getValue("records","[]"));
  ignoreShows = new Set(JSON.parse(await GM.getValue("ignoreShows","[]")));
  lastlibversion = libversion;
  mapID2Index = {};
}
    
async function save() {
  if(libversion === false) {
    throw Error("save() cannot be called before load()");
  }
  libversion++;
  
  if(libversion == Number.MAX_SAFE_INTEGER) {
    libersion = Number.MIN_SAFE_INTEGER;
  }
  await GM.setValue("libversion",libversion);
  records = sortRecordsInPlace(records);
  await GM.setValue("records",JSON.stringify(records));
  await GM.setValue("ignoreShows",JSON.stringify(Array.from(ignoreShows)));
  lastlibversion++;
}
async function saveOnlyRecords() {
  if(libversion === false) {
    throw Error("save() cannot be called before load()");
  }
  libversion++;
  
  if(libversion == Number.MAX_SAFE_INTEGER) {
    libersion = Number.MIN_SAFE_INTEGER;
  }
  await GM.setValue("libversion",libversion);
  records = sortRecordsInPlace(records);
  await GM.setValue("records",JSON.stringify(records));
  lastlibversion++;
}
async function saveOnlyIgnored() {
  if(libversion === false) {
    throw Error("save() cannot be called before load()");
  }
  libversion++;
  
  if(libversion == Number.MAX_SAFE_INTEGER) {
    libersion = Number.MIN_SAFE_INTEGER;
  }
  await GM.setValue("libversion",libversion);
  await GM.setValue("ignoreShows",JSON.stringify(Array.from(ignoreShows)));
  lastlibversion++;
}





function getRecordById(id) {
  if(mapID2Index[id]) {
    return records[mapID2Index[id]];
  }
  for(var i = 0; i < records.length; i++) {
    if(records[i].id == id) {
      mapID2Index[id] = i;
      return records[i];
    }
  }
  return false;
}


async function Episode(episode) {
  await load();
  if(typeof episode == "string") {
    return getRecordById(episode);
  } else if("id" in episode) {
    return getRecordById(episode.id);
  } else {
    throw new Error("Wrong format episode:"+JSON.stringify(episode));
  }
}
  
async function isDownloaded(id) {
  var record = await Episode(id);
  return record.hasOwnProperty("downloaded") && record.downloaded;
}

async function setDownloaded(id) {
  var record = await Episode(id);
  record.downloaded = true;
  await saveOnlyRecords();
}

async function isIgnoredShow(id) {
  var record = await Episode(id);
  if(record.show && ignoreShows.has(record.show))  {
    return true;
  }
  return false;
}
  
  
async function ignoreShow(id) {

  if(await isIgnoredShow(id)) {
    return true;
  } else {
    var record = await Episode(id);
    if(record.show) {
      ignoreShows.add(record.show);
      await saveOnlyIgnored();  
      return true;
    }
  }
  return false;
}

async function unIgnoreShow(id) {
  if(! await isIgnoredShow(id)) {
    return true;
  } else {
    var record = await Episode(id);
    if(record.show) {
      if(!ignoreShows.has(record.show)) {
        return true;
      } else {
        ignoreShows.delete(record.show);
        await saveOnlyIgnored();
        return true;
      }    
    }
  }
  return false;
}

async function toggleIgnoreShow(id) {
  if(await isIgnoredShow(id)) {
    if(await unIgnoreShow(id)) {
      return 1;
    }    
  } else {
    if(await ignoreShow(id)) {
      return -1;
    }  
  }
  return 0;  
}
  
function removeIgnoredShowsFrom(arr) {
  var narr = arr.filter(function(record){
    return record.show && !ignoreShows.has(record.show);
  });
  return narr;
}
  
function sortRecordsInPlace(arr) {
  arr.sort(function(a,b) {
    return b.time - a.time;
  });
  return arr;
}

function sortRecordsByTitle(arr) {
  var narr = arr.slice(0);
  narr.sort(function(a,b) {
    return a.title.localeCompare(b.title);
  });
  return narr;
}

async function getLatestEpisodes() {
  await load();
  var episodes = {};
  for(var i = 0; i < records.length; i++) {
    if(("show" in records[i]) && (!(records[i].show in episodes) || episodes[records[i].show].time <= records[i].time)) {
      episodes[records[i].show] = records[i];
    }
  }
  return Object.keys(episodes).map(function (show) {
    return episodes[show];
  });
}

function readPost(post) {

  var entryContent = post.getElementsByClassName("entry-content")[0];

  var link = post.getElementsByClassName("postTitle")[0].getElementsByTagName("a")[0];
  
  
  var subtitle = post.getElementsByClassName("postSubTitle")[0];
  
  var id = link.href;
  var upperCaseContent = entryContent.innerHTML.toUpperCase();
  var isnuke = false;
  if(getRecordById(id) !== false) {
    if(0 == Array.filter(nukes,function(a) { return -1!=upperCaseContent.indexOf(a)}).length) {
      throw "error_recordexists";
      return;
    } else {
      // It's a nuke
      isnuke = true;
    }
  }
  
  
  var time = subtitle.innerHTML.match(/Posted on (\D+) (\d+)\D\D, (\d{4}) at (\d+):(\d{2}) (am|pm)/); // Posted on August 17th, 2014 at 10:47 pm
  var title = trim(link.innerHTML);
  
  var result = {
    "id": id,
    "title": title,
    "time": (new Date(int(time[3]), parseMonthname(time[1]),int(time[2]), int(time[4])+(time[6] == 'pm'?12:0), int(time[5]), 0, 0)).getTime(),
    "release" : []
  };
  
  var tvshow;
  if((tvshow = title.match(/^(.*)\s(\d+)\xD70*(\d+)\s/)) || (tvshow = title.match(/^(.*)\sS0*(\d+)E0*(\d+)\s/) )) {
    result["show"] = trim(tvshow[1]).toLowerCase();
    result["showWithCase"] = trim(tvshow[1]);
    result["season"] = int(tvshow[2]);
    result["episode"] = int(tvshow[3]);
  }
  
  // Find actual releasenames of movie
  var strong = entryContent.getElementsByTagName("strong");
  for(var i = 0; i < strong.length; i++) {
    if(strong[i].innerHTML.match(/Release Name:/)) {
      result["release"].push(trim(strong[i].nextSibling.textContent));
    } else if(strong[i].innerHTML.match(/Links:/)) {
      var a = strong[i].parentNode.getElementsByTagName("a");
      var m;
      for(var j = 0; j < a.length; j++) {
        if(m = a[j].href.match(/imdb\.com\/title\/(\w+)/)) {
          result["imdb"] = m[1];   
          break;          
        }
      }
      
    }
  }  
  
  // Find actual releasenames of tvshow
  var strong = entryContent.getElementsByTagName("strong");
  for(var i = 0; i < strong.length; i++) {
    var m;
    if((m = strong[i].innerHTML.match(/\.(\d+)\xD70*(\d+)\./)) || (m = strong[i].innerHTML.match(/\.S0*(\d+)E0*(\d+)\./) )) {
      result["release"].push(trim(strong[i].innerHTML));
    }
  }
  
  // Find tvshow image
  var img = false;
  if(entryContent.getElementsByTagName("p").length) {
    if(entryContent.getElementsByTagName("p")[0].getElementsByTagName("img").length) {
      img = entryContent.getElementsByTagName("p")[0].getElementsByTagName("img")[0];
    }
  }
  if("show" in result && img)  {
    result["image"] = img.src;
  }
  
  if("show" in result || "imdb" in result) {  // Only save tvshows or movies
    if(isnuke) { 
      records[mapID2Index[id]] = result; // Overwrite record
    } else {
      records.push(result); // New record
    }
  }
}

async function readPosts() {
  await load();
  var error_recordexists = false;
  var posts = document.getElementsByClassName("entry post");
  for(var i = 0; i < posts.length; i++) {
    try {
      readPost(posts[i]);
    } catch(e) {
      if(e == "error_recordexists") {
        error_recordexists = true;
      } else {
        throw e;
      }
    }
  }
  await saveOnlyRecords();
  if(error_recordexists) {
    throw "error_recordexists";
  }
}

function crawl() {
  if(document.location.href.indexOf("#crawlbackto=") == -1) {
    if(!confirm("Start scanning?\nTo stop the process you'll have to close the tab/window!")) {
      return false;
    }
  }

  var url = document.getElementById("olderEntries").getElementsByTagName("a")[0].href+"#crawlbackto=-1";
  document.location.href = url;
}

var mw;
function getMainWindow() {
  const id = "rlsbbmymainwin";
  if(mw) {
    return mw;
  }
  mw = {};
  mw.main = document.createElement("div");
  mw.main.id = id;
  mw.main.style = "position:fixed; top:0px; left:0px; z-index:999";
  document.body.appendChild(mw.main);
  
  mw.controls = document.createElement("div");
  mw.main.appendChild(mw.controls);
  
  mw.menu = document.createElement("div");
  mw.menu.setAttribute("style","overflow:auto; margin-top:1px; margin-bottom:3px; max-height:"+(window.innerHeight-150)+"px; background: -moz-linear-gradient(center top , #eee, #bbb) repeat scroll 0 0 #ccc;");
  mw.main.appendChild(mw.menu);
  
  mw.lists = document.createElement("div");
  mw.lists.setAttribute("style","");
  mw.main.appendChild(mw.lists);
  return mw;
}

function showButton(title,click) {
  var c = getMainWindow().controls;
  var br = c.getElementsByTagName("br");
  if(br.length) {
    br = br[br.length-1];
  } else {
    br = document.createElement("br");
    br.style = "clear:left";
    c.appendChild(br);
  }
  
  var b = document.createElement("div");
  b.style = "cursor:pointer; border-radius: 5px 5px 0 0; color: black; background: -moz-linear-gradient(center top , #eee, #bbb) repeat scroll 0 0 #ccc; text-shadow: 1px 1px 0 #eee;\
  float: left; padding:2px 4px 1px; margin: 2px; height: 20px; text-align: center;  font-size: 14px;";
  b.addEventListener("click",click);
  b.addEventListener("mouseover",function() {
    this.dataset.oldbgImage = this.style.backgroundImage;
    this.style.backgroundImage = "-moz-linear-gradient(center top , #fff, #bbb)";
  });
  b.addEventListener("mouseout",function() {
   if(this.dataset.oldbgImage)
     this.style.backgroundImage = this.dataset.oldbgImage;
  });
  b.innerHTML = title;
  c.insertBefore(b,br);
  
}

async function showIgnoreMenu() {
  var c = getMainWindow().menu;
  c.innerHTML = "";
  if(c.dataset.menu == "ignore") {
    c.dataset.menu  = "";
    return;
  } else {
    c.dataset.menu  = "ignore";
  }

  var allshows = await getLatestEpisodes();
  allshows = sortRecordsByTitle(allshows);
  
  var ul = document.createElement("ul");
  var li;
  var lis = [];
  
  
  // Search by key
  var search = function(s) {
    for(var i = 0; i < lis.length; i++) {
      if(lis[i].textContent.toLowerCase().startsWith(s)) {
        lis[i].scrollIntoView();
        window.scrollY = 0;
        return;
      }
    }
  };
  
  var search_it = false;
  var search_str = "";
  var keyup = function(ev) {
    search_str += ev.key;
    search(search_str);
    if(search_it !== false) {
      clearTimeout(search_it);
    }
    search_it = setTimeout(function() {
      search_str = "";
    },2000);
  };
  document.body.addEventListener("keyup",keyup,false);

  
  var toggle = async function(ev) {
    var id = this.dataset.id;
    var status = await toggleIgnoreShow(id);
    if(status == 1) {
      this.style.background = "#99CC99";
    } else if(status == -1) {
      this.style.background = "red";
    } else {
      this.style.background = "yellow";
      alert("An error occurred. Try reloading the page.");
    }
  };
  
  var ignoreAll = async function(ev) {
    if(!confirm("Really ignore all shows?")) return;
    
    var allshows = await getLatestEpisodes();
    
    for(var i = 0; i <  allshows.length; i++) {
      await ignoreShow(allshows[i].id);
    }
    document.location.reload();    
  };
  
  var showAll = async function(ev) {
    for(var i = 0; i < lis.length; i++) {
      ul.removeChild(lis[i]);
    }
    lis = [];
  
    for(var i = 0; i <  allshows.length; i++) {
      li = document.createElement("li");
      li.setAttribute("data-id",allshows[i].id);
      li.appendChild(document.createTextNode(allshows[i].showWithCase+" S"+ pad2(allshows[i].season)+"E"+pad2(allshows[i].episode)));
      if(await isIgnoredShow(allshows[i].id)) {
        li.style.background = "red";
      } else {
        li.style.background = "#99CC99";
      }
      li.addEventListener("click",toggle,false);
      ul.appendChild(li);
      lis.push(li);
    }
  };
  
  var b;
  
  b = document.createElement("button");
  b.innerHTML = "Show all";
  b.addEventListener("click",function() {showAll();},false);
  c.appendChild(b);  
  
  b = document.createElement("button");
  b.innerHTML = "Ignore all";
  b.addEventListener("click",function() {ignoreAll();},false);
  c.appendChild(b);  
  

  
  for(var i = 0; i <  allshows.length; i++) {
    if(await isIgnoredShow(allshows[i].id)) {
      continue;
    }
    li = document.createElement("li");
    li.setAttribute("data-id",allshows[i].id);
    li.appendChild(document.createTextNode(allshows[i].showWithCase+" S"+ pad2(allshows[i].season)+"E"+pad2(allshows[i].episode)));
    if(! await isDownloaded(allshows[i])) {
      li.style.background = "white"; // New show
    } else {
      li.style.background = "#99CC99"; // Old show that is not ignored
    }
    li.addEventListener("click",toggle,false);
    ul.appendChild(li);
    lis.push(li);
  }
  c.appendChild(ul);
  
}




async function showCleanMenu(forceshow) {
  // Toggle Clean Menu
  var c = getMainWindow().menu;
  c.innerHTML = "";
  if(c.dataset.menu == "clean" && forceshow !== true) {
    c.dataset.menu  = "";
    return;
  } else {
    c.dataset.menu  = "clean";
  }

  await loadImageCache();
  var allshows = await getLatestEpisodes();

  var ul = document.createElement("ul");

  
  var clearButKeepEpisodes = async function(ev) {
    await load();
    
    records = records.filter(function(record){
      return "show" in record && record.show;
    });
    
    await save();
    showCleanMenu();
  };
  
  var clearButKeepEpisodesDeleteIgnored = async function(ev) {
    await load();
    
    records = records.filter(function(record){
      return "show" in record && record.show && !ignoreShows.has(record.show);
    });
    
    await save();
    showCleanMenu(true);
  };
  
  var clearAllImageCache = async function(ev) {
    await GM.setValue("imageCache","{}");
    
    await loadImageCache();
    showCleanMenu(true);
  };
  
  var clearImageCacheButKeepEpisodes = async function(ev) {
    await loadImageCache();
    var episodes = await getLatestEpisodes();
    episodes = removeIgnoredShowsFrom(episodes);
    var newImageCache = {}
    for(var i = 0; i <  episodes.length; i++) {
      if(episodes[i].image) {
        var url = episodes[i].image;
        if(imageCache[url]) {
          newImageCache[url] = imageCache[url];
        }
      }
    }
    await GM.setValue("imageCache",JSON.stringify(newImageCache));
    await loadImageCache();
    showCleanMenu(true);
  };
  
  
  var b,li;
  
  li = document.createElement("li");
  li.appendChild(document.createTextNode("Cleaning options:"))
  c.appendChild(li); 
  
  li = document.createElement("li");
  b = document.createElement("button");
  b.innerHTML = "Keep TV Shows";
  b.addEventListener("click",function() {clearButKeepEpisodes();},false);
  li.appendChild(b)
  c.appendChild(li); 
  
  li = document.createElement("li");
  b = document.createElement("button");
  b.innerHTML = "Keep TV Shows (delete ignored shows)";
  b.addEventListener("click",function() {clearButKeepEpisodesDeleteIgnored();},false);
  li.appendChild(b)
  c.appendChild(li);

  li = document.createElement("li");
  b = document.createElement("button");
  b.innerHTML = "Clear image cache";
  b.addEventListener("click",function() {clearAllImageCache();},false);
  li.appendChild(b)
  c.appendChild(li)
  
  li = document.createElement("li");
  b = document.createElement("button");
  b.innerHTML = "Clear image cache (keep tracked TV Shows)";
  b.addEventListener("click",function() {clearImageCacheButKeepEpisodes();},false);
  li.appendChild(b)
  c.appendChild(li)

  li = document.createElement("li");
  b = document.createElement("input");
  b.value = allshows.length +" TV shows"; 
  b.disabled = 1;
  li.appendChild(b)
  c.appendChild(li); 
  
  li = document.createElement("li");
  b = document.createElement("input");
  b.value = records.length +" total records"; 
  b.disabled = 1;
  li.appendChild(b)
  c.appendChild(li); 
  
  li = document.createElement("li");
  b = document.createElement("input");
  GM.getValue("imageCache","").then(function(arr) {
      b.value = Object.keys(imageCache).length +" images ("+humanBytes(arr.length)+")";
  });
  b.disabled = 1;
  li.appendChild(b)
  c.appendChild(li); 
  
  
  
  
  
  c.appendChild(ul);
}


var imageCache;
var imageCache_maxlifetimeinmemory = 2000;
var imageCache_lastload = -1;

async function loadImageCache() {
  if((new Date()).getTime() - imageCache_lastload < imageCache_maxlifetimeinmemory) {
    return;
  }
  imageCache_lastload = (new Date()).getTime();
  
  imageCache = JSON.parse(await GM.getValue("imageCache","{}"));
}

function cacheImage(url,dataurl) {
  imageCache[url] = dataurl;
  GM.setValue("imageCache",JSON.stringify(imageCache));
}

async function showTVShows() {
  await loadImageCache();
 
  var c = getMainWindow().lists;
  var div = document.createElement("div");
  div.setAttribute("style","max-height:"+(window.innerHeight-150)+"px; overflow:auto; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px;")
  var openEpisode = async function() { 
    if(this.dataset.episodeid) {
      var record = await Episode(this.dataset.episodeid);
      //window.open("http://www.rlsbb.com/?s=%22"+encodeURIComponent(record.showWithCase)+"%22&submit=Find");
      //window.open("http://rlsbb.com/search/"+encodeURIComponent(record.showWithCase)+"?first");
      GM.openInTab(this.dataset.episodeid);
      await setDownloaded(this.dataset.episodeid);
      
      // Mark grey and remove new tag
      this.style.borderColor = "silver";
      this.style.color = "silver";
      this.removeChild(this.querySelector(".newtag"));
      this.removeChild(this.querySelector(".ignorebutton"));
      
    }
  };
  var div_header = document.createElement("div");
  var bg = "background: -moz-linear-gradient(center top , #eee, #bbb) repeat scroll 0 0 #ccc;";
  div_header.style = bg+"cursor:pointer;";
  div_header.appendChild(document.createTextNode("TVShows"));
  div.appendChild(div_header);
  var div_select = document.createElement("div");
  div_select.style.display = "none";
  div.appendChild(div_select);
  div_header.addEventListener("click",async function(ev) { 
    // Show/Load TV episodes
    if(div_select.style.display == "block") {
      div_select.style.display = "none";
      return;
    }
    div_select.style.display = "block";
    if(div_select.children.length > 1) {
      return;
    }
    var episodes = await getLatestEpisodes();
    episodes = removeIgnoredShowsFrom(episodes);
    episodes = sortRecordsInPlace(episodes);
    
    var onLoadBackgroundImage = async function() {
      var entry = this.parentNode;
      var w = float(entry.clientWidth);
      var img = this;
      if(!img.width || !img.height) {
        entry.removeChild(img);
        return; // Something is wrong with the image!
      }
      
      entry.style.background = "no-repeat url('"+img.src+"') white";
      var h = Math.ceil(w * (float(img.height)/ float(img.width)));
      entry.style.height = h+"px";
      entry.style.backgroundSize = w+"px "+h+"px";
      entry.removeChild(img);
    };
    
    var entries = [];
    for(var i = 0; i <  episodes.length; i++) {
      var entry = document.createElement("div");
      entries.push(entry)
      entry.dataset.episodeid = episodes[i].id;
      if(episodes[i].showWithCase.length < 40) {
        entry.appendChild(document.createTextNode(episodes[i].showWithCase+" S"+ pad2(episodes[i].season)+"E"+pad2(episodes[i].episode)));
      } else {
        let span = document.createElement("span");
        span.setAttribute("title", episodes[i].showWithCase+" S"+ pad2(episodes[i].season)+"E"+pad2(episodes[i].episode));
        span.appendChild(document.createTextNode(episodes[i].showWithCase.substr(0,40)+" S"+ pad2(episodes[i].season)+"E"+pad2(episodes[i].episode)));
        entry.appendChild(span); 
      }
      entry.addEventListener("click",openEpisode);
      div_select.appendChild(entry);
      entry.style = bg+" margin:3px 10px 3px; min-width:200px; min-height:20px; font-weight:bolder; text-shadow:1px -1px 5px white;";
      if(! await isDownloaded(episodes[i])) { // New episode
        entry.style.textShadow = "1px -1px 5px black";
        entry.style.color = "#ff2";
        entry.style.borderStyle = "solid";
        entry.style.borderColor = "rgba(255, 255, 0, 0.4) yellow"
        entry.style.borderWidth = "1px 1px 1px 6px";
        
         // NEW tag
        var div_new = document.createElement("div");
        div_new.setAttribute("class","newtag");
        div_new.style = "display: inline-block; margin-top:20px; -3px -3px 8px white; background: rgba(255, 255, 0, 0.6); border: 2px solid black; color: black; font-family: comic sans ms; font-weight: normal; border-radius:20px 5px 5px 50px; padding:0 2px 0 6px; ";
        if(episodes[i].image) {
           div_new.style.transform = "rotate("+(310+Math.ceil(Math.random()*20))+"deg)";
        }
        div_new.appendChild(document.createTextNode("\u309C NEW")); //&#12444;
        entry.appendChild(div_new);
        
        // Ignore button
        var div_ign = document.createElement("div");
        div_ign.setAttribute("class","ignorebutton");
        div_ign.style = "margin-top: 0px; margin-left:220px; text-shadow:1px -1px 5px white; color:silver; cursor:pointer; ";
        div_ign.appendChild(document.createTextNode("\u2717")); //&cross;
        div_ign.addEventListener("click",async function(ev) { ev.stopPropagation(); if(confirm("Ignore?")) {if(await ignoreShow(this.parentNode.dataset.episodeid)) { this.parentNode.parentNode.removeChild(this.parentNode); } else { alert("An error occured!"); } }  });
        entry.insertBefore(div_ign,entry.firstChild); 
      }
      if(episodes[i].image) {
        var url = episodes[i].image;
        
        if(imageCache[url]) {
          url = imageCache[url]
        } else {

          loadCrossSiteImage(url,cacheImage);
        }      

        var img = document.createElement("img");
        img.addEventListener("load",onLoadBackgroundImage);
        img.src = url; // Preload background image to get size
        img.style = "max-width:180px; display:none";
        entry.appendChild(img);
      } else {
        entry.style.borderStyle = "solid";
        entry.style.borderWidth = "1px";
      }
    }
  });
  c.appendChild(div);
}





async function page_articles() {
  var error_recordexists = false;

  try {
    await readPosts();
  } catch(e) {
    if(e == "error_recordexists") {
      error_recordexists = true;
    } else {
      throw e;
    }
  }

  var crawlback;
  if(crawlback = document.location.hash.match(/crawlbackto=(-?\d+)/)) {
    if(!error_recordexists) {
      var end = int(crawlback[1]);
      if(!document.location.href.match(new RegExp("page\/"+end+"\/"))) {
        document.title = "Crawling...";
        crawl();
        return;
      }
    } else {
      document.title = "Scanning finished!";
      alert("Scanning finished!");
    }
  }

  await showTVShows();
  showButton("Scan",crawl);
  showButton("Ignore",showIgnoreMenu);
  showButton("Clean",showCleanMenu);
      
}

function page_searchresults() {
  var m = document.body.firstChild.textContent.match(/Please try again in (\d+) seconds./);
  if(m) {
    window.setTimeout(function() { document.location.reload() },3000+int(m[1])*1000);
  }
}


(function() {
  if(document.location.href.endsWith("&submit=Find") || document.location.href.indexOf("/search/") != -1) {
    page_searchresults();
  } else {
    page_articles();
  }
})();


