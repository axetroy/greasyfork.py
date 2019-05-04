// ==UserScript==
// @name         Job Seeker
// @namespace    https://tampermonkey.net/
// @version      0.1.2
// @description  auto send application to company
// @author       @Amormaid
// @run-at       document-end
// /*@require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js  */
// /*@require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js  */
// @match        http://*/*


// @include     https://www.liepin.com/*
// @include     https://c.liepin.com/*

// @exclude     http://localhost*

// @license     MIT License
// @grant       none
// ==/UserScript==

/* jshint ignore:start */
//var inline_src = (<><![CDATA[
/* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */


/*
if(typeof(jQuery) === 'undefined'){
    var jquery_script = document.createElement('script');
    jquery_script.src = 'https://code.jquery.com/jquery-3.2.1.min.js';
    document.body.append(jquery_script);
}
*/



var  root= document.body;
var links = /\d+\.\d+\.\d+\.\d+/.test(window.location.hostname) ? "ip"  : window.location.hostname;
var remove_div,elem,elem_2, arr,ad_ele,remove_ele;
var content_old,content_new;

var DEBUG = true;


try{

    console.time("allen_web_time_count");



    switch(links){


        case "www.liepin.com":
        case "c.liepin.com":

            if($$(".btn-apply","return_one")){
               $$(".btn-apply","return_one").click();
            }

            setInterval(function(){
               //dlg-actions
               if($$(".dlg-actions","return_one")){
                  $$(".dlg-actions input","return_one").click();
                  setTimeout(function(){
                      window.opener=null;
                      window.open('','_self');
                      window.close();
                  },3000);

                  if(document.querySelectorAll(".job-info")){
                     var info_array = document.querySelectorAll(".job-info");
                     var info_length = info_array.length;
                     for(var i = 0;i<info_length;i++){
                        if(info_array[i].querySelector("p a").innerHTML.match(/深圳-福田/)){
                           info_array[i].querySelector("a").click();
                        }
                     }
                  }

               }
            },300);

            if(document.querySelectorAll(".job-info")){
               var info_array = document.querySelectorAll(".job-info");
               var info_length = info_array.length;
               for(var i = 0;i<info_length;i++){
                  if(info_array[i].querySelector("p a").innerHTML.match(/深圳-福田/)){
                     info_array[i].querySelector("a").click();
                  }
               }
            }
            //change_style();
            break;

        default:
            var a = 2;
    }

    console.timeEnd("allen_web_time_count");

}catch(err){
    //console.log(err.name,' ',err.message);
    console.log(err.stack);
}








function ele_hide(e){
   if(e)e.style.display = "none" ;
}
function ele_hide_all(all){
    Array.prototype.forEach.call(all,function(e){e.style.display = "none";});
}
function ele_remove(e){
   if(e) e.parentNode.removeChild(e);
}
function ele_remove_all(all){
    Array.prototype.forEach.call(all,function(e){e.parentNode.removeChild(e);});
}


function $$(selector,operation_code){
    // operation_code  : return_one return_all remove_one remove_all hide_one hide_all

	switch(operation_code){
        case 'return_one': //return_one
            return  document.querySelector(selector) ;
        case 'return_all':// return_all
            return  document.querySelectorAll(selector);
        case 'remove_one':  //remove_one
            ele_remove(document.querySelector(selector));
            break;
        case 'remove_all': //remove_all
            ele_remove_all(document.querySelectorAll(selector));
            break;
        case 'hide_one': //hide_one
            ele_hide(document.querySelector(selector));
            break;
        case 'hide_all':// hide_all
            ele_hide_all(document.querySelectorAll(selector));
            break;

		default:
            var result = document.querySelectorAll(selector);
            return  result.length >1 ? result : result[0] ;
	}
}




/* jshint ignore:start */
//]]></>).toString();
//var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
//eval(c.code);
/* jshint ignore:end */
