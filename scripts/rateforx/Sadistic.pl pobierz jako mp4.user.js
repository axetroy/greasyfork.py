// ==UserScript==
// @name        Sadistic.pl pobierz jako mp4
// @namespace   benis
// @include     http://www.sadistic.pl/*
// @version     1.1
// @grant       none
// @author      rateforx
// @icon        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAASdEVYdFNvZnR3YXJlAEdyZWVuc2hvdF5VCAUAAAEpSURBVDhPfZMhjoNAFIYLhFDbA5BUENKa7RUqa7hCsyfBcIAGwQUQkLo6RA3pKjAIBIJUgcUQDBX8uzPtkim83Zd84c33v4EQmMVP4T9UVcVyuYSmabwnZmZixDAMuK6Loihwv99R1zX2+/107m0xsl6vkec5WMVxjOv1yq+Kokxn3xYjvu/j8Xhgu93ytSRJs5kXc8mekiQJ0jSdZQSkRBRFKMsSsiyTuQAp4TgOmqbBarUicwFS4nA4YBgG6LpO5gKk5N+e1W73QeYCpOSw+jweyUyAlJyv2w2Xy4XMBEjJsW0bXdeRmQApOZZl8ddg54DKX5CSk2UZqqoiM4Fnw36Y0+nED4/neWjbFn3fY7PZTDdMeTamaeJ8PiMIAoRhyG/0ew7+ZoFv01FbZOEWXRcAAAAASUVORK5CYII=
// @description Dodaje przycisk [Pobierz] na pasku pod postami z filmikiem pozwalający pobrać go jako plik mp4.
// ==/UserScript==

window.onload = function() {
  vids = $('.player_embed');
  console.log(vids.length + ' sadystycznych filmików na stronie.');

  for (i = 0; i < vids.length; i++) {
    script = $(vids[i]).children('script');
    start  = script[0].text.search("file:'") + 6;
    end    = script[0].text.search("mp4'") + 3;
    
    if ((start != -1) && (end != -1)) {
      link    = script[0].text.slice(start, end);
      article = script.parents('article');
      social  = article.children('.social');
      
      a           = document.createElement('a');
      a.style     = 'position: absolute; left: 510px';
      a.href      = link;
      a.innerHTML = '▼ Pobierz';
      
      social.append(a);
    }
  }
}
