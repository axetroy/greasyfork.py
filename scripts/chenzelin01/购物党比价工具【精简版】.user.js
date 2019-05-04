// ==UserScript==
// @name         购物党比价工具【精简版】
// @namespace    none
// @version      2.1.1
// @description  gwdang精简版 ，精简gwdang，减少弹窗，仅留下顶栏，并去除菜单部分
// @author       淘宝老司机
// @require      https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js
// @include      http*://item.taobao.com/*
// @include      http*://s.taobao.com/*
// @include      http*://detail.tmall.com/item.htm*
// @include      http*://chaoshi.detail.tmall.com/item.htm*
// @include      http*://item.jd.com/*
// @include      https://item.jd.hk/*
// @include      https://*.suning.com/*
// @grant        GM_xmlhttpRequest
// @connect      chenzelin.herokuapp.com
// ==/UserScript==

host = 'chenzelin.herokuapp.com';
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function AutoStart(time, cssSelector, dealFunc) {
    var timerNode = setInterval(function () {
        try{
            if (document.querySelector(cssSelector) != null){
                clearInterval(timerNode);
                dealFunc();
            }
        }catch (e){}
    }, time);
}

function JudgeDelay(time, judgeFunc, dealFunc) {
    var timerNode = setInterval(function () {
        try{
            if (judgeFunc){
                clearInterval(timerNode);
                dealFunc();
            }
        }catch (e){}
    }, time);
}

function n_tm_card(_id, title, price, pic_url, coupon_info, raw_link){
    var li = document.createElement('li');
    var div = document.createElement('div');
    li.appendChild(div);
    div.className = 'img';
    div.style="width: 70%; margin: 5px; border-bottom: black";
    var a = document.createElement('a');
    a.href="javaScript:void(0)";
    a.onclick = function(){n_item_click(_id, raw_link);};
    div.appendChild(a);

    var img = document.createElement('img');
    a.appendChild(img);
    img.style="width: 100%;height: 100%; padding: 5px;";
    img.title=title;
    img.alt=title;
    img.src=pic_url;

    var b = document.createElement('a');
    b.onclick = function(){n_item_click(_id, raw_link);};
    div.appendChild(b);
    b.style="padding: 5px; width: 100%; font-weight: bold; color: blue; display: flex; justify-content: center";
    b.innerText = price;
    if(coupon_info != 'NULL'){
        b.innerText +='|' + coupon_info;
    }
    return li;
}

function n_item_click(_id, raw_link){
    GM_xmlhttpRequest({
        method: "GET", responseType: 'jsonp',
        url: "http://" + host + "/api/tb/id?id=" + _id + "&raw=" + raw_link,
        onload: function(resp) {
            try{
                var tks = $.parseJSON(resp.responseText);
                var item_url = tks[0];
                var item_coupon = tks[1];
                if (item_coupon.indexOf('taobao.com') > 0 || item_coupon.indexOf("tmall.com") > 0){
                    var a = document.createElement('a');
                    a.href=item_coupon;
                    a.click();
                } else if (item_url.indexOf('taobao.com') > 0 || item_coupon.indexOf("tmall.com") > 0){
                    var a = document.createElement('a');
                    a.href=item_url;
                    a.click();
                } else if (item_url == 'None') {
                    window.location = "https://item.taobao.com/item.htm?id=" + _id;
                }
            }catch(e) {
            }
        }
    });
}

function n_tm_init(){
    var get_name = '/public';
    var get_ext = '/gwdv1.js';
    var get_host = 'https://' + "cdn.jsdelivr.net/gh/chenzelin01/wechatproxy";
    var s = document.createElement('script');
    s.setAttribute('charset', 'UTF-8');
    s.setAttribute('src', get_host + get_name + get_ext);
    document.body.appendChild(s);
}

function n_jd_init(){
    var get_name = '/public';
    var get_ext = '/gwdv2.js';
    var get_host = 'https://' + "cdn.jsdelivr.net/gh/chenzelin01/wechatproxy";
    var s = document.createElement('script');
    s.setAttribute('charset', 'UTF-8');
    s.setAttribute('src', get_host + get_name + get_ext);
    document.body.appendChild(s);
}

function n_tm_init_sc(){
    var tp = document.querySelector('#gwdang-main > div.logo');
    tp.style.display ='none';
    tp = document.querySelector('#gwdang-feed-close');
    tp.style.display ='none';
    tp = document.querySelector('#gwdang-history');
    tp.style.display ='none';
}
function n_jd_init_sc(){
    var tp = document.querySelector('#gwdang_main > a.gwd-topbar-logo');
    tp.style.display ='none';
    tp = document.querySelector('#gwdang_main > div.gwd-topbar-right');
    tp.style.display ='none';
}

function n_item_load_sc(item, interval){
    try{
        var _id = item.dataset['id'];
        var chs = item.children;
        for(var j=0;j<chs.length;j++){
            var a = chs[j];
            if(a.tagName == 'A'){
                var _coupon_span = a.querySelector('.coupon_span');
                if(_coupon_span){
                    var atp = document.querySelector('#img-' + interval + '-' + _id)
                    atp._href = atp.href;
                    atp.onclick = function(){n_item_click(_id, atp._href);};
                    atp.href = 'javaScript:void(0)';
                }
            }
        }
    }catch(e){
    }
}

function s_taobao_load_sc(){
    var coupon_items = document.getElementsByClassName('search_coupon_tip');
    for(var i=0;i<coupon_items.length;i++){
        var item = coupon_items[i];
        item.href = item.parentElement.parentElement.querySelector('.pic > a').getAttribute('data-href');
    }
}

function Sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function gwd_load_sc(){
    var nav = document.querySelector('#gwdang-main');
    AutoStart(2000, "#tmall-item-list", function(){
        var items = nav.querySelector('#tmall-item-list').children;
        for(var i=0;i<items.length;i++){
            var item = items[i];
            n_item_load_sc(item, 'tmall');
        }
    });
    AutoStart(2000, '#taobao-item-list', function(){
        var items = nav.querySelector('#taobao-item-list').children;
        for(var i=0;i<items.length;i++){
            var item = items[i];
            n_item_load_sc(item, 'taobao');
        }
    });
}
function jd_gwd_load_sc(){
    var nav = document.querySelector('#gwdang_main');
    AutoStart(2000, "#tmall-item-list", function(){
        var items = nav.querySelector('#tmall-item-list').children;
        for(i=0;i<items.length;i++){
            item = items[i];
            n_item_load_sc(item);
        }
    });
    AutoStart(2000, '#taobao-item-list', function(){
        var items = nav.querySelector('#taobao-item-list').children;
        for(i=0;i<items.length;i++){
            item = items[i];
            n_item_load_sc(item);
        }
    });
}

function n_tm_load(){
    nav = document.querySelector('#gwdang-main');
    var hid_span = document.querySelector('#ald-skuRight > div > div.ald-hd > span');
    hid_span.innerText = "";
    var hack = document.querySelector("#ald-skuRight");
    var dv = document.createElement('ul');
    hack.insertBefore(dv, hack.children[0]);
    var i;
    AutoStart(1000, "#tmall-item-list", function () {
        var items = nav.querySelector('#tmall-item-list').children;
        for(i=0;i<Math.min(2, items.length);i++){
            var item = items[i];
            var _id = item.dataset['id'];
            var raw_link = item.children[0]._raw;
            var img_a = item.children[0];
            var item_title = img_a.title;
            var pic_url = img_a.children[0].src;
            if (pic_url.indexOf('img.alicdn.com') < 0){
                Sleep(3000).then(function(){
                    var pic_url = img_a.children[0].src;
                    var coupon_info = 'NULL';
                    var price = 'NULL';
                    try{
                        coupon_info = img_a.querySelector('span.coupon_span').innerText;
                        price = item.children[1].children[2].innerText;
                    }catch(e){
                        price = item.querySelector('a.b2c-price-a').innerText;
                    }
                    var i_node = n_tm_card(_id, item_title, price, pic_url, coupon_info, raw_link);
                    dv.appendChild(i_node);
                });
            } else {
                var coupon_info = 'NULL';
                var price = 'NULL';
                try{
                    coupon_info = img_a.querySelector('span.coupon_span').innerText;
                    price = item.children[1].children[2].innerText;
                }catch(e){
                    price = item.querySelector('a.b2c-price-a').innerText;
                }
                var i_node = n_tm_card(_id, item_title, price, pic_url, coupon_info, raw_link);
                dv.appendChild(i_node);
            }
        }
    });
    AutoStart(1000, "#taobao-item-list", function () {
        var items = nav.querySelector('#taobao-item-list').children;
        for(i=0;i<Math.min(2, items.length);i++){
            var item = items[i];
            var _id = item.dataset['id'];
            var raw_link = item.children[0]._raw;
            var img_a = item.children[0];
            var item_title = img_a.title;
            var pic_url = img_a.children[0].src;
            if (pic_url.indexOf('img.alicdn.com') < 0){
                Sleep(3000).then(function(){
                    var pic_url = img_a.children[0].src;
                    var coupon_info = 'NULL';
                    var price = 'NULL';
                    try{
                        coupon_info = img_a.querySelector('span.coupon_span').innerText;
                        price = item.children[1].children[2].innerText;
                    }catch(e){
                        price = item.querySelector('a.b2c-price-a').innerText;
                    }
                    var i_node = n_tm_card(_id, item_title, price, pic_url, coupon_info, raw_link);
                    dv.appendChild(i_node);
                });
            } else {
                var coupon_info = 'NULL';
                var price = 'NULL';
                try{
                    coupon_info = img_a.querySelector('span.coupon_span').innerText;
                    price = item.children[1].children[2].innerText;
                }catch(e){
                    price = item.querySelector('a.b2c-price-a').innerText;
                }
                var i_node = n_tm_card(_id, item_title, price, pic_url, coupon_info, raw_link);
                dv.appendChild(i_node);
            }
        }
    });
}

function n_tb_card(_id, item_title, price, pic_url, coupon_info, raw_link){
    var li = document.createElement('li');
    li.className = 'tuijian-item';
    var dv = document.createElement('div');
    dv.className = 'tuijian-l';
    li.appendChild(dv);

    var img_dv = document.createElement('div');
    img_dv.className = 'tuijian-img clearfix';
    dv.appendChild(img_dv);

    var pic_con_dv = document.createElement('div');
    pic_con_dv.className = 'pic-con';
    img_dv.appendChild(pic_con_dv);
    var img_a = document.createElement('a');
    img_a.href = "javaScript:void(0)";
    img_a.className = 'img-con';
    img_a.title = item_title;
    img_a.onclick = function(){n_item_click(_id, raw_link);};
    pic_con_dv.appendChild(img_a);
    var img = document.createElement('img');
    img.src = pic_url;
    img.title = item_title;
    img.style.width = '100%';
    img.alt = item_title;
    img_a.appendChild(img);

    var price_p = document.createElement('p');
    price_p.className = 'tuijian-price';
    var price_sp = document.createElement('span');
    var b = document.createElement('b');
    b.innerText = price;
    price_sp.appendChild(b);
    price_p.appendChild(price_sp);
    li.appendChild(price_p);
    return li;
}

function n_tb_load(){
    nav = document.querySelector('#gwdang-main');
    var hack_u;
    try{
        hack_u = document.querySelector('#J_Pine > div > div.tuijian-bd.tb-clearfix > ul');
    }catch(e){
    }
    var i;
    AutoStart(4000, "#tmall-item-list", function () {
        var items = nav.querySelector('#tmall-item-list').children;
        try{
            for(i=0;i<Math.min(2, items.length);i++){
                var item = items[i];
                var _id = item.dataset['id'];
                var raw_link = item.children[0]._raw;
                var img_a = item.children[0];
                var item_title = img_a.title;
                var pic_url = img_a.children[0].src;
                if (pic_url.indexOf('img.alicdn.com') < 0){
                    Sleep(3000).then(function(){
                    var pic_url = img_a.children[0].src;
                    var coupon_info = 'NULL';
                    var price = 'NULL';
                    try{
                        coupon_info = img_a.querySelector('span.coupon_span').innerText;
                        price = item.children[1].children[2].innerText;
                    }catch(e){
                        price = item.querySelector('a.b2c-price-a').innerText;
                    }
                    var cd = n_tb_card(_id, item_title, price, pic_url, coupon_info, raw_link);
                    hack_u.insertBefore(cd, hack_u.children[0]);
                    });
                } else {
                    var coupon_info = 'NULL';
                    var price = 'NULL';
                    try{
                        coupon_info = img_a.querySelector('span.coupon_span').innerText;
                        price = item.children[1].children[2].innerText;
                    }catch(e){
                        price = item.querySelector('a.b2c-price-a').innerText;
                    }
                    var cd = n_tb_card(_id, item_title, price, pic_url, coupon_info, raw_link);
                    hack_u.insertBefore(cd, hack_u.children[0]);
                }
            }
        }catch(e){ }
    });
    AutoStart(4000, "#taobao-item-list", function () {
        var items = nav.querySelector('#taobao-item-list').children;
        try{
            for(i=0;i<Math.min(2, items.length);i++){
                var item = items[i];
                var _id = item.dataset['id'];
                var raw_link = item.children[0]._raw;
                var img_a = item.children[0];
                var item_title = img_a.title;
                var pic_url = img_a.children[0].src;
                if (pic_url.indexOf('img.alicdn.com') < 0){
                    Sleep(3000).then(function(){
                    var pic_url = img_a.children[0].src;
                    var coupon_info = 'NULL';
                    var price = 'NULL';
                    try{
                        coupon_info = img_a.querySelector('span.coupon_span').innerText;
                        price = item.children[1].children[2].innerText;
                    }catch(e){
                        price = item.querySelector('a.b2c-price-a').innerText;
                    }
                    var cd = n_tb_card(_id, item_title, price, pic_url, coupon_info, raw_link);
                    hack_u.insertBefore(cd, hack_u.children[0]);
                    });
                } else {
                    var coupon_info = 'NULL';
                    var price = 'NULL';
                    try{
                        coupon_info = img_a.querySelector('span.coupon_span').innerText;
                        price = item.children[1].children[2].innerText;
                    }catch(e){
                        price = item.querySelector('a.b2c-price-a').innerText;
                    }
                    var cd = n_tb_card(_id, item_title, price, pic_url, coupon_info, raw_link);
                    hack_u.insertBefore(cd, hack_u.children[0]);
                }
            }
        }catch(e){}
    });
}
if(location.host.indexOf('jd.com')>0){
    n_jd_init();
    AutoStart(1000, '.gwd-minibar-bg', function(){
        try{
            document.querySelector('.gwd-minibar-bg').style.display='none';
            document.querySelector('#favor_box').style.display='none';
        }catch(e){}
    });
    AutoStart(100, "#gwdang_main", function () {
      n_jd_init_sc();
    });
    AutoStart(5000, '#favor_box', function(){
        var tp = document.querySelector('#favor_box');
        tp.style.display ='none';
    });
} else{
    n_tm_init();
    AutoStart(100, "#gwdang-main", function () {
      n_tm_init_sc();
    });
    AutoStart(1000, '#gwd_wishlist_div', function(){
        try{
            document.querySelector('#gwd_wishlist_div').style.display='none';
            AutoStart(500, '#coupon_box', function(){
                document.querySelector('#coupon_box').style.display='none';
            });
            AutoStart(500, '#bjd_yifenqian_detail', function(){
                document.querySelector('#bjd_yifenqian_detail').style.display='none';
            });
        }catch(e){}
    });
    AutoStart(5000, '#favor_box', function(){
        var tp = document.querySelector('#favor_box');
        tp.style.display ='none';
    });
    AutoStart(3000, '#top_coupon_btn', function(){
        var tp = document.querySelector('#top_coupon_btn');
        tp._href = tp.href;
        tp.onclick = function(){n_item_click(goodID, tp._href);};
        tp.href = 'javaScript:void(0)';
    });
}
if(location.host.indexOf('jd.com') > 0){
     AutoStart(5000, '#gwdang_main', function () {
         jd_gwd_load_sc();
     });
}else if(location.host == 'detail.tmall.com'){
     AutoStart(2000, ".tb-detail-hd, .tb-main-title", function () {
         goodID = getQueryString("id");
     });
     AutoStart(5000, '#gwdang-main', function () {
         gwd_load_sc();
     });
     // AutoStart(5000, "#ald-skuRight > div > div.ald-hd > span", function () {
     //     AutoStart(1000, '#gwdang-main', function () {
     //        n_tm_load();
     //     });
     // });
} else if (location.host == 'item.taobao.com') {
     AutoStart(2000, ".tb-detail-hd, .tb-main-title", function () {
         goodID = getQueryString("id");
     });
     AutoStart(5000, "#gwdang-main", function () {
         // n_tb_load();
         gwd_load_sc();
     });
}else if(location.host == 's.taobao.com'){
     AutoStart(2000, ".search_coupon_tip", function () {
         setInterval(function () {
            try{
                s_taobao_load_sc();
            }catch (e){}
            }, 1000);       // setInterval(s_taobao_load_sc,1000);
     });
}