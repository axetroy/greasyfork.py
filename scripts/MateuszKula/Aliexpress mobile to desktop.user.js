// ==UserScript==
//@match *://m.aliexpress.com/*
//@match *://m.ru.aliexpress.com/*
//@match *://m.pt.aliexpress.com/*
//@match *://m.es.aliexpress.com/*
//@match *://m.de.aliexpress.com/*
//@match *://m.ar.aliexpress.com/*
//@match *://m.ko.aliexpress.com/*
//@match *://m.pt.aliexpress.com/*
//@match *://m.ja.aliexpress.com/*
//@match *://m.th.aliexpress.com/*
//@match *://m.tr.aliexpress.com/*
//@match *://m.it.aliexpress.com/*
//@match *://m.vi.aliexpress.com/*
//@match *://m.fr.aliexpress.com/*
// @name         Aliexpress mobile to desktop
// @description automatically redirects from mobile version to desktop version
// @run-at document-start
// @version      0.2.4
// @author     http://kulam.pl
// @homepage http://kulam.pl
//@downloadURL https://greasyfork.org/scripts/22721-aliexpress-mobile-to-desktop/code/Aliexpress%20mobile%20to%20desktop.user.js

// @namespace https://greasyfork.org/users/62973
// ==/UserScript==

var targethost = "aliexpress.com"; //mozesz zmienic na "pl.aliexpress.com"
var pa=window.location.pathname;





if(pa.slice(0,7)=="/store/")
{
    if(pa.slice(7,20)!="storeHome.htm")
    {
     var locationPathname = location.pathname.split('/');
    window.location.replace(window.location.protocol+'//'+targethost+pa+window.location.search+window.location.hash);
}
}


if (pa.indexOf('storeNo=') > -2) //storeHome
{
if((location.search.split('storeNo=')[1]) >1)
{
    var numersklepu= location.search.split('storeNo=')[1];
    if(numersklepu>0)
    {
    var locationPathname = location.pathname.split('/');
    window.location.replace(window.location.protocol+'//'+targethost+'/store/'+numersklepu+"/"+window.location.search+window.location.hash);
    }
}
}

//przedmiot
if((location.search.split('storeNo=')[1]) >1)
{console.log("");}
else
{
    if((pa[1])=="i")
    {
        //if (pa.indexOf('/') > -1) 
        {
            var locationPathname = location.pathname.split('/');
            window.location.replace(window.location.protocol+'//'+targethost+locationPathname[locationPathname.length-1]+window.location.search+window.location.hash);
        }

        //if (pa.indexOf('item') > -1) 
        {
            var locationPathname = location.pathname.split('/');
            window.location.replace(window.location.protocol+'//'+targethost+'/item/seo-url/'+locationPathname[locationPathname.length-1]+window.location.search+window.location.hash);
        }
    }
}



//sprzedawca sellerAdminSeq<->
