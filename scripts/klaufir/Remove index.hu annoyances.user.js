// ==UserScript==
// @name        Remove index.hu annoyances
// @description Removes index.hu nags and user-tracking
// @encoding    utf-8
// @namespace   fix_index_hu
// @include     htt*://www.index.hu/*
// @include     htt*://index.hu/*
// @grant       GM_addStyle
// @run-at document-start
// @version 0.0.1.20181101150956
// ==/UserScript==


// shim for greasemonkey4
// https://stackoverflow.com/questions/19385698/how-to-change-a-class-css-with-a-greasemonkey-tampermonkey-script

GM_addStyle = GM_addStyle || function (cssStr) {
    var D               = document;
    var newNode         = D.createElement ('style');
    newNode.textContent = cssStr;

    var targ    = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    targ.appendChild (newNode);
}

function remove_dex_redirect(a) {
  var oldurl = a.href;
  if (oldurl) {
    var usp = (new URLSearchParams((new URL(oldurl)).search));
    var newurl = usp.get('url') || usp.get('rov');
    if (newurl) {
      a.href = newurl;
      console.log(oldurl + ' -> ' + newurl)
    }
  }
}

var observeDOM = (function(){
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  return function( obj, callback ){
    if( !obj || !obj.nodeType === 1 ) return; // validation

    if( MutationObserver ){
      // define a new observer
      var obs = new MutationObserver(function(mutations, observer){
          callback(mutations);
      })
      // have the observer observe foo for changes in children
      obs.observe( obj, { childList:true, subtree:true });
    }
    
    else if( window.addEventListener ){
      obj.addEventListener('DOMNodeInserted', callback, false);
      obj.addEventListener('DOMNodeRemoved', callback, false);
    }
  }
})();

function map_mutations(f) {
    observeDOM(document.documentElement, function(mutation_records) { 
      mutation_records.map(function(mutation_record) { f(mutation_record.target); }); 
    });
}



(function() {


    // set nag clicked true
    document.cookie = 'sb-closed=true';

    // add style to remove ebeg header
    GM_addStyle('.nm_header { display: none !important; }');

    console.log('1');
    map_mutations(function(target) { 
      Array.from(target.getElementsByTagName('a')).map(remove_dex_redirect); 
    });

    window.addEventListener('load', function() {

        // remove ebegging banner
        var nm_header = document.getElementsByClassName('nm_header');
        if (nm_header && nm_header.length)
          nm_header[0].parentNode.removeChild(nm_header[0]);


        console.log('WHAT!');
        Array.from(document.getElementsByTagName('a')).map(remove_dex_redirect);
        
        setTimeout(function() {
            localStorage.clear();
            sessionStorage.clear();
          
            var smartbanner = document.getElementById('smartbanner');
            if (smartbanner)
                smartbanner.parentNode.removeChild(smartbanner);
        }, 1000);
            
    }, false);
})();
