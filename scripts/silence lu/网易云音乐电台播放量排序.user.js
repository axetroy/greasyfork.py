// ==UserScript==
// @name         网易云音乐电台播放量排序
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  增加一个电台页面按播放量排序的按钮
// @author       leere
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @match        *://music.163.com/*
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */

    // Your code here...
    $('.u-sort').append('<a data-action="order" class="desc" title="按播放量排序"></a>')

var s = $('.u-sort').find('[title="按播放量排序"]')
s.click(()=>sort())

function sort() {
    var m = $("table.m-table-program tbody tr"),
        n = 0,
        l_array = [],
        r_array = []
    m.filter('.even').map(function() { $(this).removeClass('even') })
    m.remove()
    $('.u-sort').find('.z-sel').removeClass('z-sel').attr('onclick','window.location.reload()')
    s.addClass('z-sel')
    for (i of m) {
        if (/万/.test($(i).find('.col3').text()) == true) {
            l_array.push(i) //以万计
        } else {
            r_array.push(i)
        }
    }
    var totle = sort2(l_array).concat(sort2(r_array))

    for (j of totle) {
        $('tbody').append(j)
        if (n % 2 == 1) {
            $(j).addClass('even')
        }
        $(j).find('.num').html(n + 1)
        n++
    }

    function sort2(array) {
        return array.sort(function(a, b) {
            return $(b).find('.col3').text().match(/\d+/) - $(a).find('.col3').text().match(/\d+/)
        })
    }
}
/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */