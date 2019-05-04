// ==UserScript==
// @name         rarbg 大预览图
// @namespace    
// @version      0.3.2
// @description  预览图替换成更大点的
// @author       You
// @match        https://rarbgprx.org/torrents.php*
// @match        https://rarbg.to/torrents.php*
// @grant        none
// ==/UserScript==

document.onmousemove = function(k) {
    var h = k.pageX + xoffset;
    var j = k.pageY + yoffset;
    el = k.target || k.srcElement

    if (pop.children[0]) {
        var r=document.scrollingElement.scrollTop+document.scrollingElement.clientHeight-pop.children[0].height-10
        if (j>r) {
            j=r
        }
    }
    pop.style.top = j + "px";
    pop.style.left = h + "px"
};

var t=document.querySelectorAll('tr[class="lista2"] > td:nth-child(2) >a:nth-child(1)')
nex: for (var i = 0; i <t.length; i++) {
	var a=t[i].attributes.onmouseover
    if (!a) {continue}
	var b=a.value
    var e=b.split('/')
    //console.log(b)
    //console.log(e)
    switch(e[3])
    {
        case 'static':
            switch(e[4])
            {
                case 'over': //18+
                    a.value=b.replace('static/over','posters2/'+e[5].substr(0,1))
                    continue nex;
                case '20': //TVdb
                    a.value=b.replace('_small','_banner_optimized')
                    continue nex;
            }
            console.log("无法替换rarbg图源:"+b)
            continue nex;
        case 'mimages': //movie
            a.value=b.replace('over_opt','poster_opt')
            continue nex;
    }
    console.log("无法替换rarbg图源:"+b)
}