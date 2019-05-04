// ==UserScript==
// @name         Better VNDB List
// @namespace    https://qwq.moe/
// @version      0.4
// @description  show cover and original title on the VNDB list
// @author       Arhceb
// @match        https://vndb.org/g*
// @match        https://vndb.org/v/*
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(' tbody {     display: flex;     flex-direction: row;     justify-content: center;    flex-wrap: wrap; } thead{display:flex} tbody tr {     display: flex;     flex-direction: column;     margin: 10px;  }  tbody td.tc1,tbody td.tc_t {     padding-left: 0!important;     height: 300px;     background-size: cover;     display: flex;     padding: 0;     flex-direction: column-reverse;     width: 210px; } tbody td.tc_s {display:none} tbody td.tc1 a,tbody td.tc_t a {     padding: 5px;     font-size: 16px;     background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7));     color: white; } tbody td.tc1 a:hover{border:none!important}');
(function() {
        var v1=document.querySelectorAll('div.mainbox.browse tbody>tr')
    v1.forEach(function(v2){
        fetch(v2.querySelector('a').href).then(function(data){
            return data.text()
        }).then(function(data){
            var v3 = document.createElement("div");
            v3.innerHTML=data;
            v4=v3.querySelector('div.vnimg img')
            v5=v2.querySelector('td.tc1');
            if(!v5){v5=v2.querySelector('td.tc_t');}
            v5.style.backgroundImage='url(' + v4.src + ')';
v5.querySelector('a').innerText=v5.querySelector('a').title;
        });
    })
})();