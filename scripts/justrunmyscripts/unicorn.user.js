// ==UserScript==
// @name         unicorn
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  there's jquery everywhere ¯\_(ツ)_/¯
// @author       justrunmyscripts
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @match        */*
// @grant        none
// @run-at       document-end
// @noframes
// ==/UserScript==
(function($) {
    'use strict';

    console.log('unicorn is running! (tampermonkey script!)');
    $('h1,h2,h3,h4,h5,h6,p,i,b,a,ul,li,blockquote,hr,div,ins,strong,em,span,' +
      'abbr,address,area,article,aside,base,big,button,canvas,caption,cite,code,' +
      'col,colgroup,command,dd,del,details,dir,dl,dt,embed,fieldset,figcaption,figure,' +
      'font,footer,form,frame,head,hr,html,body,i,iframe,input,ins,label,legend,link,map,' +
      'mark,menu,meta,meter,nav,noframes,noscript,object,ol,option,q,s,rp,rt,ruby,samp,section,' +
      'select,source,strike,style,sub,summary,sup,table,tbody,td,textarea,th,thead,time,' +
      'title,tr,track,tt,u,ul,var').not(':has(*)').each((index, element )=>{
        var thestring = $(element).html();
        try {
            $(element).html(thestring.replace(/unicode/gi, 'unicorn'));
            $(element).html(thestring.replace(/(\S+?)men(\S+)/gi, '$1men$2 but also the $1women$2 and the $1children$2'));
        }
        catch (err) {
            console.log('ERROR: ', err);
        }
    });

}).bind(this)(jQuery);