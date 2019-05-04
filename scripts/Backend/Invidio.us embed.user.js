// ==UserScript==
// @name        Invidio.us embed
// @namespace   Backend
// @description Replace YouTube embeds with Invidio.us embeds.
// @include     *
// @exclude https://www.youtube.com/*
// @version     2.4
// ==/UserScript==
 
var a = 0; //set to 1 to autoplay embedded videos present on initial page load (not recommended)
var b = 0; //set to 1 to autoplay embedded videos that appear on page interaction

var observer = new MutationObserver(mutate);
observer.observe(document,{childList:true,attributes:true,subtree:true});

function mutate(){
  go(b);
}
 
function go(auto){
  var filter = Array.filter || Benchmark.filter;  
  var frames = document.getElementsByTagName("iframe");
  frames = filter(frames, youtubeiFrame);
 
  for(var i=0; i<frames.length; i++){
    var frame = frames[i];
    var src = frame.getAttribute('src');
    var invid = src.
      replace('www.youtube.com', 'invidio.us').
      replace('youtu.be/', 'invidio.us/watch?v=')
      .replace('-nocookie','')
      .replace('autoplay=','');

    if(invid.indexOf('?') === -1){
      invid += '?autoplay=' + auto;
    }else{
      invid += '&autoplay=' + auto;
    }
    frame.setAttribute('src', invid);
  }
}
 
function youtubeiFrame(el) {
  if(el.hasAttribute('src')){
    return el.getAttribute('src').indexOf('youtube') !== -1;
  }
  return false;
}
 
go(a);
