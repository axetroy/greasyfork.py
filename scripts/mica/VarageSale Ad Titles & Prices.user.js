// ==UserScript==
// @name         VarageSale Ad Titles & Prices
// @description  Displays titles & prices on varagesale.com + hides sold items
// @version      0.2
// @author       mica
// @namespace    greasyfork.org/users/12559
// @match        *://www.varagesale.com/*
// @grant        none
// ==/UserScript==

$('<style>').html(`
.tooltip.fade.top.in {
    display: none !important;
}
a.thumbnail {
    background: #f5f5f5;
    border-top: 1px solid #eee;
    border-right: 1px solid #eee;
    border-bottom: 0;
    border-left: 1px solid #eee;
}
a.title div {
    color: #555;
    padding: 0 5px;
    height: 45px;
    overflow: auto;
    background: #f5f5f5;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    border-left: 1px solid #eee;
}
a.title:hover {
    text-decoration: none;
}
a.title p {
    font-size: 105%;
    font-weight: bold;
    color: #4cb949;
    margin: 0;
}
`).appendTo('head');
var url;
setInterval(function() {
    if (url !== location.href) {
        url = location.href;
        if (url.match(/.*varagesale.com\/.*\/c\/.*/) !== null) {
            setTimeout(function() {
                $('a.sold').parent().remove();
                $('a.title').remove();
                $('a.thumbnail').each(function() {
                    var link = $(this).attr('href');
                    var orig = $(this).attr('data-original-title');
                    if (orig.match(/Asking/) !== null) {
                        var title = orig.replace(/: Asking.*/,'');
                        var price = orig.replace(/^.*Asking (?=\$)/,'').replace('.00','');
                        $('<a class="title">').attr('href', link).html(
                            $('<div>').html('<p>'+price+' </p>'+title)
                        ).appendTo($(this).parent());
                    } else {
                        $('<a class="title">').attr('href', link).html(
                            $('<div>').html('<br>'+orig)
                        ).appendTo($(this).parent());
                    }
                });
            }, 600);
        }
    }
}, 300);
