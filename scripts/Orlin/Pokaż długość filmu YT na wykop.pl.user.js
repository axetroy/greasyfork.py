// ==UserScript==
// @name        Pokaż długość filmu YT na wykop.pl
// @description Wyświetla czas trwania filmu w tytule znaleziska
// @namespace   Wykop scripts
// @include     *://www.wykop.pl/link/*
// @version     1.41
// @license     MIT License
// @grant       none
// ==/UserScript==

function getYTDuration()
{
   var timeWithLetters = false; // false -> [3:13:37]; true -> [3h13m37s]

   //if(document.getElementsByClassName("youtube-player vtop").length > 0)
   if(document.getElementsByClassName("screen")[0].getElementsByTagName('iframe').length > 0)
   {

      var yw, yh, yId, yIframe;

//      yIframe = document.getElementsByClassName("youtube-player vtop")[0];
      yIframe = document.getElementsByClassName("screen")[0].getElementsByTagName('iframe')[0];
      //yClone = yIframe.cloneNode(true);

      yw = yIframe.width;
      yh = yIframe.height;
      yId = yIframe.src.match(/https?\:\/\/www\.youtube\.com\/embed\/(.+?)\?.*/i)[1];

      yDiv = document.createElement('div');
      yDiv.id = 'playerYT';
      yDiv.style.display = 'none';
     
//      yIframe.parentNode.insertBefore(yDiv, yIframe);
     yIframe.parentNode.appendChild(yDiv);

       var taggg = document.createElement('script');

         taggg.src = "https://www.youtube.com/iframe_api";
         var firstScriptTag = document.getElementsByTagName('script')[0];
         firstScriptTag.parentNode.insertBefore(taggg, firstScriptTag);

         var playerYT;
         function onYouTubeIframeAPIReady()
         {
           playerYT  = new YT.Player('playerYT', {
             height: yh,
             width: yw,
             videoId: yId,
             events: {
               'onReady': onPlayerReady
             }
           });
         }

         function onPlayerReady(event)
         {
           var dur, dh, dm, ds;
           event.target.playVideo();
           event.target.pauseVideo();
           dur = parseInt(event.target.getDuration())-1;
           ds = ('0' + (dur % 60)).slice(-2);
           dur = Math.floor(dur/60);
           dm = ('0' + (dur % 60)).slice(-2);
           dur = Math.floor(dur/60);
           dh = dur;
           if(timeWithLetters)
             document.getElementsByTagName('h2')[0].innerHTML = ('[' + dh + 'h' + dm + 'm' + ds +'s] ') + document.getElementsByTagName('h2')[0].innerHTML;
           else
             document.getElementsByTagName('h2')[0].innerHTML = ('[' + dh + ':' + dm + ':' + ds +'] ') + document.getElementsByTagName('h2')[0].innerHTML;
           event.target.stopVideo();
           var py = document.getElementById('playerYT');
           py.parentNode.removeChild(py);
      
//alert(event.target.getDuration());
         }

   }
}

function addJS_Node (funcToRun) {
    var D                                   = document;
    var scriptNode                          = D.createElement ('script');
   
    scriptNode.type                         = "text/javascript";
    scriptNode.textContent  =  funcToRun.toString().replace(/^function .*?\(\)[\s\S]\{/i, '').replace(/\}$/,'');
    var targ = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    targ.appendChild (scriptNode);
}

if(document.getElementsByClassName('screen').length > 0)
{
  setTimeout(function(){ addJS_Node(getYTDuration);}, 1000);
}




/*************************************************************
 * Ugly dailymotion bonus, to enable: 
 * 1. change in script header:
// @grant       none
 * to:
// @grant       GM_xmlhttpRequest
 * uncomment code below:
 *************************************************************/
/*
if(document.getElementsByClassName("videoWrapper") && document.getElementsByClassName("videoWrapper")[0].getElementsByTagName('iframe').length>0
   && document.getElementsByClassName("videoWrapper")[0].getElementsByTagName('iframe')[0].src.indexOf('dailymotion.com')>0)
{
  var dmUrl = document.getElementsByClassName("videoWrapper")[0].getElementsByTagName('iframe')[0].src;
  var dmId = dmUrl.match(/\/([^/]*?)$/)[0];
  
  GM_xmlhttpRequest({
  method: "GET",
  url: "https://api.dailymotion.com/video/" + dmId + "?fields=duration",
  onload: function(response) {
    // sorry JSON :-)
    if(response.responseText.indexOf('duration')>0);
    {
      var timeWithLetters = false; // false -> [3:13:37]; true -> [3h13m37s]
      var dur, dh, dm, ds;
      dur = parseInt(response.responseText.match(/\d+/))-1;
      ds = ('0' + (dur % 60)).slice(-2);
      dur = Math.floor(dur/60);
      dm = ('0' + (dur % 60)).slice(-2);
      dur = Math.floor(dur/60);
      dh = dur;
      if(timeWithLetters)
        document.getElementsByTagName('h2')[0].innerHTML = ('[' + dh + 'h' + dm + 'm' + ds +'s] ') + document.getElementsByTagName('h2')[0].innerHTML;
      else
        document.getElementsByTagName('h2')[0].innerHTML = ('[' + dh + ':' + dm + ':' + ds +'] ') + document.getElementsByTagName('h2')[0].innerHTML;
    }
   }
  });
  
}

// Ugly dailymotion bonus
*************************************************************/
