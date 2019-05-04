// ==UserScript==
// @name        Youtube to Invidious
// @namespace   Krul & Brood
// @description Scan page for youtube embeds and urls and replace with Invidious.
// @include     *
// @exclude     http*://youtube.*
// @exclude     http*://invidio.us*
// @exclude     http*://www.youtube.*
// @exclude     http*://www.invidio.us*
// @version     3.2
// ==/UserScript==

var instance="invidio.us"; //set you favorite invidious instance! (https://github.com/omarroth/invidious/wiki/Invidious-Instances)

var a=0; //set to 1 to autoplay embedded videos present on initial page load (0 recommended)
var b=0; //set to 1 to autoplay embedded videos & replace youtube hyperlinks that appear on page interaction
var c=1; //set to 1 to replace all youtube hyperlinks to invidious

var observer=new MutationObserver(function(mutations){
  mutations.forEach(function(mutation){
    embed(b);
    link();
  });
});
observer.observe(document.body,{childList:true,subtree:true,});
embed(a);
link();

function embed(auto){
  var filter=Array.filter||Benchmark.filter;  
  var frames=filter(document.getElementsByTagName('iframe'),youtube); 
  for(var i=0;i<frames.length;i++){
    var src=frames[i].getAttribute('src')
                     .replace('-nocookie','')
                     .replace('youtube.com/',instance+'/')
                     .replace('youtu.be/',instance+'/')
                     .replace('autoplay=','');
    if(src.indexOf('?')===-1){
      src+='?autoplay='+auto;
    }else{
      src+='&autoplay='+auto;
    }
    frames[i].setAttribute('src',src);
  }
}

function link(){
  if(c==1){
    var filter=Array.filter||Benchmark.filter;  
    var urls=filter(document.getElementsByTagName('a'),youtube); 
    for(var i=0;i<urls.length;i++){
      var href=urls[i].getAttribute('href')
                      .replace('-nocookie','')
                      .replace('youtube.com/',instance+'/')
                      .replace('youtu.be/',instance+'/')
      urls[i].setAttribute('href',href);
    }
  }
}

function youtube(el){
  if(el.hasAttribute('src')){
    return el.getAttribute('src')
             .indexOf('youtu')!==-1;
  }else if(el.hasAttribute('href')){
    return el.getAttribute('href')
             .indexOf('youtu')!==-1;
  }
  return false;
}