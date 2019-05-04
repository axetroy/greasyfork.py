// ==UserScript==
// @name 	Ginoa Tools
// @description 右クリックから便利なScriptを呼び出す
// @author 	GinoaAI
// @namespace 	https://greasyfork.org/ja/users/119008-ginoaai
// @version 	2.1
// @match 	*://*
// @match 	*://*/*
// @match 	*://*/*/*
// @include 	http://*
// @include 	https://*
// @include 	http://*/*
// @include 	https://*/*
// @include 	http://*/*/*
// @include 	https://*/*/*
// @icon 	https://pbs.twimg.com/profile_images/1099150852390977536/nvzJU-oD_400x400.png
// @require 	http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js
// @grant	GM_openInTab
// ==/UserScript==

var body = document.body;
var menu = body.appendChild(document.createElement("menus"));
menu.outerHTML = '<menu id="GinoaTools" type="context">\
                    <menu label="Ginoa Tools">\
                    <menuitem id="ArchiveSearch" label="Archive Search"\
                              icon=" data:image/png;base64,\
                              iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAB0UlEQVRIx8WWSyiEURiGh7EguaxIIcUws1DKPashLIQNyrhFFgob\
                              YxRqIkoTZWdFYcNsSFjY2NiLshsrNiiXsiD398+bvo7zM/TLqaepp3f+b+Z85zszNlv4KxJkgxqQAiJsFqxoUAy8YA2cgVfyAkJg\
                              EXQDF7CH89BEUA0mwC64FQ8Nh3OwAQZBKT/kpzUAtizErStSB4IWkqErMvTD7fmOPF2RQjAOAtxXLxkGM3z1CnxgGvgVPwUmQZJZ\
                              8494cpzCjfCTjSnZKvpt5fA8gauvTtgJ31gkXIBuVsk20O8Jl0p3D6LMilwzVCHcHN28ku2kPxDOSWd8m3hdAWOY7hiqFX6JbkXJ\
                              99GHhMsXjdf2JAY8MNAofJBuXckP0p8KVyaKpOmKxIFHBlqEX9c0WB6Ic+Hcokim2bXyxECH8Jt0O0reT38pXKUokvNvReR2tYax\
                              XaP0F8KViyJZZlf7nzfeziEyAvXCL9OtKvl++mPhCkSRZLNhvPliGBeUbBf9oXCu74bxp9dK42+vlX023yGcj5fmqJI1mvys9CqB\
                              t8aZWYF04AHtoFmhQ+OamfUoro3D7NAVabL4R6tXLRBre/+r02Mh9Zy9j5XLGbGaEuPhb5FuBO3PWbDSAAAAAElFTkSuQmC\
                              C"></menuitem>\
\
                    <menuitem id="RFD" label="ReTweet and Favorite Delete"\
                              icon="data:image/png;base64,\
                              iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAABkklEQVRIx2MQrd69UXbRl7+0wuLtp48zgDkLP/2nJR61hD6WGK/6\
                              /D9x77f/Plu+/pcj1RK5RZ/+p+z7hldT97kf/3///Q8HZ1/9+Z+2/9v/pTd//bdd94WwJVZrv/z/++///8ZTP7BakAB0PTYA1PJ/\
                              1e1f/6N3fSNsCcglMLDj4W+wpcjym+//+o8LnHjx57/Wss+ELZEHBtfN94iw+AVkbgdaVnj4+3/XTV/+H3n2G6cl1uu/EBcnhis/\
                              g4Pqx+9//0kBINVGqz4TZ4neis9g15MKPv74R1oSnnX1J8mWbHnwmzRLQMm47/yP/59/Eh9kcXu+kZ4ZDz39/f8fkXaA8gnIYSRb\
                              Yr7m8//Lb/4QtODrr3//nTd+Ib9YASXnxpOouRsZfAe6IXbPN9LLLlBmDNz29X/xke//dz/6Dc792MDDT3//+wPVkVVA6iz//L8T\
                              WDY9+Pj3P7r5IAuvv/37vw7oO5UlVCiFZYDYdPXn/2E7vv5PBAZJ0Pav//WBeUh6tNIaHpaA2kW0tEBq0p0HALXsPROX9mw0AAAA\
                              AElFTkSuQmCC"></menuitem>\
                  </menu>';

body.setAttribute("contextmenu", "GinoaTools");

document.querySelector("#ArchiveSearch").onclick = Script => {
    var url = location.href;
    window.location.href = 'http://web.archive.org/web/*/' + url + '*';
}

document.querySelector("#RFD").onclick = Script => {
    $(".Icon--heartBadge").parent('').parent('').parent('').parent('').remove();
    $(".js-retweet-text").parent('').parent('').parent('').parent('').remove();
    new MutationObserver(function (mr) {
        mr.forEach(function (e) {
            removeRetweet(e.addedNodes);
        });
    }).observe(document.querySelector("#stream-items-id"), {
        childList: true
    });
    removeRetweet(document.querySelector("#stream-items-id").children);

    function removeRetweet(li_nodes) {
        [].forEach.call(li_nodes, function (elem) {
            elem.firstElementChild.dataset.retweetId && elem.remove();
        });
    }
}