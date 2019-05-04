// ==UserScript==
// @name            Easy YouTube mp3
// @description     The Easy YouTube mp3 Add-on includes a Button on any YouTube Page and allows you to convert the YouTube Video to a mp3 with just one click.
// @icon            https://www.easy-youtube-mp3.com/addon/icon.png
//
// @author          Theveloper
// @namespace       https://www.easy-youtube-mp3.com/
//
// @license         GPL-3.0-or-later
// @copyright       2018, Theveloper
//
// @include         http://www.youtube.com/*
// @include         https://www.youtube.com/*
//
// @version         2.2
//
// @run-at          document-end
// @unwrap
// ==/UserScript==

function sel(sel, el) {    return (el || document).querySelector(sel); }

mytmp3_btn_onclick = function (){
  var inp = document.getElementById('mytmp3_location')
  
  inp.value = window.location;
  inp.form.submit()
};

getSpan = function(text, className) {
    var _tn = document.createTextNode(text);
    var span = document.createElement("span");
    span.className = className;
    span.appendChild(_tn);
    return span;
};

var myAppInterface = {
  init:function(){
    this.insertGlobalCSS()
    this.insertForm()
  },
  addGlobalStyle: function(doc, css) {
    if(document.querySelector('.easy-youtube-mp3-css'))return;
    var head = doc.getElementsByTagName('head')[0];
    if (!head) {return; }
    var style = doc.createElement('style');
    style.id = 'easy-youtube-mp3-css';
    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css; 
    } else {
      style.appendChild(document.createTextNode(css)); 
    }
    head.appendChild(style); 
  },
  insertGlobalCSS: function(){
    var css = function (){
/*start
#easyMp3.ytd-watch{padding-top:10px;overflow: auto;border-bottom: 1px solid #eee;padding-bottom: 10px;}
#easyMp3 .mytmp3_btn{background-color: #FF0000;border: #FF0000;border-radius: 2px;color: #FFF;padding: 10px 16px; font-size: 1.4em;cursor:pointer;display:inline-block}
#easyMp3 .mytmp3_btn:hover{background-color: #a22a2a}
@media (min-width: 657px){ytd-watch[theater] #easyMp3.ytd-watch{margin-right:24px}}
end*/
    }.toString().replace("/*start",'').replace("end*/",'').slice(14,-1);   
    this.addGlobalStyle(document, css);
  },
  
  insertForm: function(){
    var frm = document.createElement('form'); 
    frm.id = 'mytmp3_form'
    frm.action = 'https://www.easy-youtube-mp3.com/download.php'
    frm.method = 'POST'
    frm.target = '_blank'
    frm.setAttribute('style', 'display:none')
    
    var inp = document.createElement('input')
    inp.type = 'hidden'
    inp.name = 'v'
    inp.id = 'mytmp3_location'
    
    frm.appendChild(inp)
    document.body.appendChild(frm)
  },
  
  createButton: function(){
    var obj = document.querySelector('#primary-inner>#info');
    var easyMp3 = document.createElement("div");
    easyMp3.id  = "easyMp3";
    easyMp3.className  = "style-scope ytd-watch";

    var mytmp3_btn = document.createElement("div");
    mytmp3_btn.className  = "style-scope mytmp3_btn";

    mytmp3_btn.appendChild(getSpan("Easy YouTube mp3 - DOWNLOAD", ""))
    
    mytmp3_btn.onclick = mytmp3_btn_onclick;

    obj.parentNode.insertBefore(easyMp3, obj);
    easyMp3.appendChild(mytmp3_btn);
  },
  
  checkBtn: function(){
    var obj = document.querySelector('#primary-inner>#info');
    if(obj != null){
      // check if the button has already been created
      var btnRow = document.getElementById('easyMp3');
      if(btnRow == null){
          myAppInterface.createButton()
      }
    }
  }
  
}


// yt does make use of some bogus AJAX functionality which breaks pagemod
// we have to check in intervals if the document has been replaced by yt to
// recreate the button if needed.
var intervalCheck = setInterval(myAppInterface.checkBtn, 250);

myAppInterface.init()

/*

<div id="messages" class="style-scope ytd-watch" style="width: var(--flex640-mode-player-width);">
  <div class="mytmp3_btn"><span class="mytmp3_bcode_a">MP3</span><span class="mytmp3_bcode_b"> &amp; </span><span class="">MP4</span><span class=""> - DOWNLOAD</span></div>
</div>
*/