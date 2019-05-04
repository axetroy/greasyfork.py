// ==UserScript==
// @name        CzTorrent Reloaded
// @namespace   cztorrent_reloaded
// @include     https://tracker.cztorrent.net*
// @version     0.991103rc
// @author	    Nidecker
// @grant       unsafeWindow
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/js-cookie/latest/js.cookie.min.js
// @description Add new features
// ==/UserScript==


// SECTION 1

var aplikace = '<a href="/torrents?c22=1&s=&t=0"></a>';
var filmy = '<a href="/torrents?c1=1&s=&t=0>"</a>';
var filmy3d = '<a href="/torrents?c36=1&s=&t=0"></a>';
var filmyanime = '<a href="/torrents?c35=1&s=&t=0"></a>';
var filmybluray = '<a href="/torrents?c37=1&s=&t=0"></a>';
var filmydoku = '<a href="/torrents?c33=1&s=&t=0"></a>';
var filmydvd = '<a href="/torrents?c11=1&s=&t=0"></a>';
var filmydvdfull = '<a href="/torrents?c30=1&s=&t=0"></a>';
var filmykres = '<a href="/torrents?c5=1&s=&t=0>"</a>';
var hd = '<a href="/torrents?c31=1&s=&t=0"></a>';
var hdlq = '<a href="/torrents?c38=1&s=&t=0"></a>';
var hry = '<a href="/torrents?c3=1&s=&t=0>"</a>';
var hudba = '<a href="/torrents?c2=1&s=&t=0>"</a>';
var hudbadvd = '<a href="/torrents?c34=1&s=&t=0"></a>';
var knihy = '<a href="/torrents?c6=1&s=&t=0>"</a>';
var konzole = '<a href="/torrents?c13=1&s=&t=0"></a>';
var mluvene = '<a href="/torrents?c32=1&s=&t=0"></a>';
var mobil = '<a href="/torrents?c16=1&s=&t=0"></a>';
var ostatni = '<a href="/torrents?c4=1&s=&t=0>"</a>';
var serialy = '<a href="/torrents?c25=1&s=&t=0"></a>';
var soundtrack = '<a href="/torrents?c29=1&s=&t=0"></a>';
var videoklipy = '<a href="/torrents?c19=1&s=&t=0"></a>';
var xxx = '<a href="/torrents?c24=1&s=&t=0"></a>';
var category = jQuery("td.categorie");
var style = jQuery("<style id=darkMode type='text/css'> " +
    "body{ background-color:#202020;background-image:none;color:#d2d2d2} " +
    "#footer_shadow{ display:none;} " +
    "div.block,#shoutbox_new_smiles{ background-color:#3c3b36 !important;border:1px #232323 solid !important;} " +
    "#torrenty tr.torr_hover:hover,#image_upload #list .image:hover,#image_upload ul.categories li,#image_upload ul.categories li:hover{ background-color:#363636 !important;} " +
    "a{ color:#64b3d6;} " +
    "a:hover{ color:#7ec8e9;} " +
    "#torrenty td.detaily a{ color:#d2d2d2;} " +
    "td.detadily > a:visited{ color:#f0f0f0;} " +
    "#torrenty tr:hover td.detaily span{ color:#b7b7b7;} " +
    ".user_menu_top{ background:#232323;border-right: none;} " +
    "#users_stats #user_panel,#user_forum .panel{ background:#232323;} " +
    "#user_forum .panel{ border:1px #5c5952 solid;} " +
    "#users_stats #tracker_stats th:nth-child(2n){ background-image:none;background: #292929;} " +
    "#users_stats #tracker_stats td:nth-child(2n){ background-image:none;background: #292929;} " +
    "#users_stats #tracker_stats,ul.top_menu ul.kask_menu li a{ background-image:none;} " +
    "#users_stats #user_panel dl dd a{ color:#64b3d6;} " +
    "#users_stats{ background:#232323;} " +
    "#content{ background:#232323;} " +
    ".user_menu_top{ border-bottom: none;} " +
    ".user_menu_top div:last-child{ background:none;} " +
    "#torrenty tr.popisy a,div.code,#seedbonus table.inf tr.head td{ color: #999999;} " +
    "p.pager a{ color:#d2d2d2;background: #3c3b36;border:1px #5c5952 solid} " +
    "p.pager a.on{ border:1px #5c5952 solid;background: #44423d;} " +
    "p.pager a:hover{ background: #44423d;} " +
    "input, select, textarea{ color: #e3e3e3;background: #363636;} " +
    "select, textarea{ background: #363636 !important;} " +
    "#torrenty td.categorie, #torrenty td.download, #torrenty td.detaily, #torrenty td.shortdesc, #torrenty td.coment, #torrenty td.peers, #torrenty td.edit{ border-bottom: 1px #44423d solid;} " +
    ".overdiv{ background: #3c3b36;border: 1px #5c5952 solid !important;}" +
    "#bottom_menu,#footer{ background: #2d5365;}" +
    "#conteiner{ background: #2d5365;border: none;width: 872px;} " +
    ".n_button,.n_button:hover{ -moz-box-shadow: inset 0px -3px 7px 0px #29bbff; " +
    "-webkit-box-shadow: inset 0px -3px 7px 0px #29bbff; " +
    "box-shadow: inset 0px -3px 7px 0px #29bbff; " +
    "background: -webkit-gradient(linear, left top, left bottom, color-stop(0.05, #58a9d1), color-stop(1, #4486a4)); " +
    "background: -moz-linear-gradient(top, #58a9d1 5%, #4486a4 100%); " +
    "background: -webkit-linear-gradient(top, #58a9d1 5%, #4486a4 100%); " +
    "background: -o-linear-gradient(top, #58a9d1 5%, #4486a4 100%); " +
    "background: -ms-linear-gradient(top, #58a9d1 5%, #4486a4 100%); " +
    "background: linear-gradient(to bottom, #58a9d1 5%, #4486a4 100%); " +
    "background-color: rgba(0, 0, 0, 0); " +
    "filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#58a9d1', endColorstr='#4486a4',GradientType=0); " +
    "background-color: #4486a4; " +
    "-moz-border-radius: 3px; " +
    "-webkit-border-radius: 3px; " +
    "border-radius: 3px; " +
    "border: none; " +
    "color: #fff; " +
    "text-decoration: none; " +
    "text-shadow: 0px 1px 0px #263666;} " +
    ".n_button:hover{ -webkit-box-shadow: inset 0px -2px 7px 0px #29bbff;box-shadow: inset 0px -2px 7px 0px #29bbff;} " +
    "#shoutbox_new .box{ background-color: #3c3b36 !important;border: 1px #656565 solid !important;} " +
    "#shoutbox_new .post{ border-bottom: 1px #44423d solid !important;} " +
    "#shoutbox_new input.msg{ border: 1px #656565 solid !important;} " +
    "#shoutbox_new .new_post {background-color:#363636;}" +
    "div.headline{ background: none;} " +
    ".hp_favorite .fav{ background: #474641;border: 1px #393939 solid;} " +
    ".hp_favorite .fav:hover{ background: #41403c} " +
    "#forum table.blocks tr.topic_2{ background-color: #232323;} " +
    "#forum table.blocks tr.topic_1{ background-color: #292929;} " +
    "#forum table.blocks tr.topic_1:hover,#forum table.blocks tr.topic_2:hover{ background-color: #363636;} " +
    ".fce_panel{ background-color: #232323;} " +
    "#forum tr.topic_1 span.new,#forum tr.topic_2 span.new,#forum tr.thread_1 span.new,#forum tr.thread_2 span.new{ background-image: url('data:image/png;base64,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');} " +
    "#forum span.seen{ margin: 0;} " +
    ".fce_panel_top,#forum table.blocks tr.main_topic td{ border-bottom: none;} " +
    "#forum table.blocks tr.main_topic td,#forum table.blocks td.name a{ color: #d2d2d2;} " +
    ".torrent_descr_block,.editor,.editor .funkce #fce_text,.input_text,#posta .incoming .subject," +
    "#posta .new #write_pm .for,#comments table .watch .right,#comments table .watch .left," +
    "#comments table .main_line .right,#comments table .post .right,#comments table .watch .left," +
    "#comments table .post .left,#comments table .main_line .left,#comments table .pager .right,#comments table .pager .left,#posta .zaplneni_archivu{ background: #3c3b36 !important;} " +
    "table.editor_subject .input_text{ border-color: #44423d;} " +
    ".editor textarea{ background: #363636;border: 1px #44423d solid;} " +
    "input.button,input.initComments{ -moz-box-shadow: inset 0px -3px 7px 0px #29bbff;\n" +
    "-webkit-box-shadow: inset 0px -3px 7px 0px #29bbff;\n" +
    "box-shadow: inset 0px -3px 7px 0px #29bbff;\n" +
    "background: -webkit-gradient(linear, left top, left bottom, color-stop(0.05, #58a9d1), color-stop(1, #4486a4));\n" +
    "background: -moz-linear-gradient(top, #58a9d1 5%, #4486a4 100%);\n" +
    "background: -webkit-linear-gradient(top, #58a9d1 5%, #4486a4 100%);\n" +
    "background: -o-linear-gradient(top, #58a9d1 5%, #4486a4 100%);\n" +
    "background: -ms-linear-gradient(top, #58a9d1 5%, #4486a4 100%);\n" +
    "background: linear-gradient(to bottom, #58a9d1 5%, #4486a4 100%);\n" +
    "background-color: rgba(0, 0, 0, 0);\n" +
    "background-color: rgba(0, 0, 0, 0);\n" +
    "filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#58a9d1', endColorstr='#4486a4',GradientType=0);\n" +
    "background-color: #4486a4;\n" +
    "-moz-border-radius: 3px;\n" +
    "-webkit-border-radius: 3px;\n" +
    "border-radius: 3px;\n" +
    "border: none;\n" +
    "color: #fff;\n" +
    "text-decoration: none;\n" +
    "text-shadow: 0px 1px 0px #263666;} " +
    ".editor .nahled,.editor .odeslat{ text-align: center;font-size: 9pt} " +
    "#torrent_descr > div,#shoutbox_new .settings{ background-color: #3c3b36!important;} " +
    "#torrent_details dl dd a{ color: #fff;} " +
    "a.stahnout,a.reseed,input.nahled,input.odeslat{ -moz-box-shadow: inset 0px -3px 7px 0px #29bbff;\n" +
    "-webkit-box-shadow: inset 0px -3px 7px 0px #29bbff;\n" +
    "box-shadow: inset 0px -3px 7px 0px #29bbff;\n" +
    "background: -webkit-gradient(linear, left top, left bottom, color-stop(0.05, #58a9d1), color-stop(1, #4486a4));\n" +
    "background: -moz-linear-gradient(top, #58a9d1 5%, #4486a4 100%);\n" +
    "background: -webkit-linear-gradient(top, #58a9d1 5%, #4486a4 100%);\n" +
    "background: -o-linear-gradient(top, #58a9d1 5%, #4486a4 100%);\n" +
    "background: -ms-linear-gradient(top, #58a9d1 5%, #4486a4 100%);\n" +
    "background: linear-gradient(to bottom, #58a9d1 5%, #4486a4 100%);\n" +
    "background-color: rgba(0, 0, 0, 0);\n" +
    "filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#58a9d1', endColorstr='#4486a4',GradientType=0);\n" +
    "background-color: #4486a4;\n" +
    "background-image: none !important;\n" +
    "-moz-border-radius: 3px;\n" +
    "-webkit-border-radius: 3px;\n" +
    "border-radius: 3px;\n" +
    "border: none;\n" +
    "color: #fff;\n" +
    "padding: 2px 0;\n" +
    "height: unset;\n" +
    "text-decoration: none;\n" +
    "text-shadow: 0px 1px 0px #263666;} " +
    "#forum table.threads tr.thread_name td,#forum table.threads a,#forum table td.post div.upraveno,#forum table.threads a.date{ color: #999999;} " +
    "#forum table.post_1,#posta ul,#posta .incoming,#posta .incoming table tr.detaily,.progrs a,table.form td.left," +
    ".gray_menu div,.gray_menu .empty,.gray_menu,.blue_menu .empty,.blue_menu div,.blue_menu,table.table td," +
    "#stats .graph_table .scale_lines,#stats .graph_table,#stats .graph_name,#support .round_top,#support .round_bottom," +
    "#support .option,#support table td,.editor .funkce_font,.editor .funkce_size,.editor .funkce_field,.editor .funkce_fontcolor,.editor .funkce_symbs,.editor .funkce_smile,.editor .funkce_bgcolor{ background-color: #3c3b36;} " +
    "#forum table.post_2,.progrs a.act,.progrs a:hover,.progrs a.act:hover{ background-color: #353430;} " +
    "#posta ul li a.aktiv,#posta ul li a:hover,#posta .incoming table tr.old:hover,.gray_menu div a:hover," +
    ".blue_menu div a:hover,#users_list table tr.uzivatel:hover,#support .option:hover,#support table tr.head_lines td," +
    "#support table tr.head_lines td:hover,#support table tr:hover td,#posta .incoming table tr.new,#posta .incoming table tr.new:hover,.editor .funkce_symbs div:hover{ background-color: #363636;} " +
    "#forum table.threads tr.thread_1{ background-color: #232323;} " +
    "#forum table.threads tr.thread_2{ background-color: #292929;} " +
    "#forum table.threads span,#posta ul li a,.progrs a,.progrs a:hover,.gray_menu div a,.blue_menu div a{ color: #d2d2d2;} " +
    "div.quote,div.code{ background-color: #4a4944 !important;border: 1px #353431 solid !important} " +
    "div.quote{ background-image: url(\"https://cdn.cztorrent.net/image/original/QgN0rbkA7TFjedzj\") !important;background-size: 25px;} " +
    "div.code{ background-image: url(\"https://cdn.cztorrent.net/image/original/vJFSDBI9ErcdL8UL\") !important;background-size: 40px;} " +
    "#posta ul li a.aktiv,#posta ul li a,#comments table .post .left{ border: none;} " +
    "#posta .incoming,.n_select,.progrs a,.progrs a.act,#posta .new #write_pm .for .input_text,#posta .new,#image_upload ul.categories li{ border: 1px #44423d solid;} " +
    "#posta .incoming table tr.detaily td,#posta .incoming table tr.old td,table.form td{ border-bottom: 1px #44423d solid;} " +
    "#forum table td.post div.podpis{ border-top: 1px #44423d solid;} " +
    "#forum table td.user div{ border-right: 1px #44423d solid;} " +
    "#forum table td.post div.time,#forum table.threads tr.thread_name td,#forum table.threads{ border-bottom: 1px #44423d solid;} " +
    "#forum table.post_1,#forum table.post_2,.gray_menu,.blue_menu,#support .round_top,#support .round_bottom,#support .option{ border: none;} " +
    "table.table tr.borders td{ border-left: 1px #44423d solid;border-right: 1px #44423d solid;} " +
    "table.table tr.header_borders td{ background-color: #363636;border: 1px #44423d solid;} " +
    "#support .round_top,#support .round_bottom,#support table tr.head_lines td,#support table tr.head_lines td:hover,#bottom_menu,#footer{ background-image: none;} " +
    "#support table tr.head_lines td,#support table td,#support table tr:hover td,#support table tr:hover td.ops{ border-bottom: 1px #44423d solid;} " +
    ".forum_last_topics a.ellipsis strong{ color: #7dcaec;} " +
    ".forum_last_topics a.ellipsis strong:hover{ color: #64b3d6;} " +
    "#comments table .watch .right,#comments table .watch .left{ border-bottom: 6px #3c3b36 solid} " +
    "#comments table .main_line .right,#comments table .main_line .left,#comments table .post .right,#comments table .pager .left,#comments table .pager .right,ul.top_menu ul.kask_menu li a{ border: none} " +
    "#comments table .watch .left{ border-right: 1px #3c3b36 solid;} " +
    "#comments table .pager .left{ border-right: none} " +
    "#caution p.red{ border-top: 5px #b00c00 solid;background-color: #2d5365;} " +
    "#image_upload #list .image{ color: #d2d2d2;border: 1px #44423d solid;background-color: #3c3b36;} " +
    "#image_upload #detail .info table .fo td{ color: #82C1DD;} " +
    "#image_upload .addCategory input.text,#image_upload .listCategories div input.text{ border: 1px solid #999999;} " +
    "div.header_cz{ background-image: url(\"https://cdn.cztorrent.net/image/original/Ea1Wr4nYFtAYaXXH\");border-top-right-radius: 65px;border-top-left-radius: 65px;} " +
    "#header a.domu_cz,#header a.torrenty_cz,#header a.upload_cz,#header a.statistika_cz,#header a.uzivatele_cz,#header a.forum_cz{ background-image: none;} " +
    "#header a.domu_cz:hover,#header a.torrenty_cz:hover,#header a.upload_cz:hover,#header a.statistika_cz:hover,#header a.uzivatele_cz:hover,#header a.forum_cz:hover{ background: rgba(45, 83, 101,.5);border-top-left-radius: 10px;border-top-right-radius: 10px;} " +
    "ul.top_menu li.right,ul.top_menu li.left,ul.top_menu{ background: none;} " +
    "ul.top_menu{ border: 1px solid #527483} " +
    "ul.top_menu li a:hover,ul.top_menu ul.kask_menu li a{ background: #1f475e;} " +
    "ul.top_menu ul.kask_menu li a:hover{ background: #305565;} " +
    "#caution{ width: 870px;border: 1px #82c1dd solid;background-color: #b00c00;} " +
    "#posta .incoming table tr.new td{ border-bottom: 1px #44423d solid;} " +
    "#seedbonus .limit,#seedbonus .limitt,#seedbonus .limittt,#torrent_details #zdravi #health,#posta .zaplneni_archivu .backgr{ background-image: url(\"https://cdn.cztorrent.net/image/original/yB90Hkv4QTfbrTFM\");} " +
    "#torrent_seed table td[style=\"color:black\"],#torrenty td.peers{ color:#999999 !important;} " +
    "#user_forum .path{ background-color: #202020;border-top: 1px #5c5952 solid;border-bottom: 1px #5c5952 solid;} " +
    "#user_forum .post{ background-color: #3c3b36;border-bottom: 1px #5c5952 solid;} " +
    "#peers tr.b{ background-color: #32312d;} " +
    "#peers tr.my{ background-color: #1e1e1e;} " +
    "#torrenty span.peers_1{ color: #e90d0d;} " +
    "#torrenty span.peers_2{ color: #dd902d;} " +
    "#torrenty span.peers_3{ color: #c6c400;} " +
    "#torrenty span.peers_4{ color: #389500;} " +
    "#torrenty span.peers_5{ color: #4cc800;} " +
    "#torrenty span.peers_6{ color: #5ef800;} " +
    "a.button{background-image:none;background:linear-gradient(to bottom, #58a9d1 5%, #4486a4 100%)}" +
    "a.button:hover{background:linear-gradient(to bottom, #64accf 5%, #5f98b1 100%)}" +
    "a.button span{background-image:none;color:#fff;text-shadow: 0px 1px 0px #263666;}" +
    "#shoutbox_new .post strong:hover{background-color: #555 !important;}" +
    "#rating{background-image: url('https://cdn.cztorrent.net/image/original/nqn84ZJoxA0HXyrA');}" +
    "</style>");

var darkMode = Cookies.get('darkMode');
var ch = '';
if(darkMode > 0) {
    style.appendTo('head');
    ch = 'checked=checked';
} else
    jQuery('#darkMode').remove();


    jQuery("<style type='text/css'>.switch{position:absolute;top:10px;right:10px;display:inline-block;width:60px;height:34px}.switch input{display:none}.slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc;-webkit-transition:.4s;transition:.4s}.slider:before{position:absolute;content:\"\";height:26px;width:26px;left:4px;bottom:4px;background-color:#fff;-webkit-transition:.4s;transition:.4s}input:checked+.slider{background-color:#2D5365}input:focus+.slider{box-shadow:0 0 1px #2196F3}input:checked+.slider:before{-webkit-transform:translateX(26px);-ms-transform:translateX(26px);transform:translateX(26px)}.slider.round{border-radius:34px}.slider.round:before{border-radius:50%}td.detaily > a:visited{ color: #999999 !important;}#zoomIn:hover,#zoomOut:hover{cursor:pointer;border:1px solid #999 !important}</style>" +
    "<label class=\"switch\">" +
    "<input "+ch+" type=\"checkbox\">" +
    "<span class=\"slider round\"></span>" +
    "</label>").appendTo("body");


jQuery(document).ready(function() {
    if(darkMode > 0) {
        jQuery('a.stahnout').text('Stáhnout');
        jQuery('a.reseed').text('Reseed');
        jQuery('input.nahled').val('Náhled');
        jQuery('input.odeslat').val('Odeslat');
        jQuery('.shortdesc img').attr('src', 'https://cdn.cztorrent.net/image/original/DHZQxWEafx2mm13g');
    }
     jQuery('body').on('click', '.switch .slider', function () {
         if(jQuery('#darkMode').length > 0) {
             Cookies.set('darkMode', 0, { expires: 365 });
             jQuery('#darkMode').remove();
         } else {
             Cookies.set('darkMode', 1, { expires: 365 });
             style.appendTo('head');
         }

     });
     category.filter(function() {return this.innerText === "Aplikace";}).wrapInner(aplikace);
	 category.filter(function() {return this.innerText === "Filmy";}).wrapInner(filmy);
	 category.filter(function() {return this.innerText === "Filmy - 3D";}).wrapInner(filmy3d);
	 category.filter(function() {return this.innerText === "Filmy - anime";}).wrapInner(filmyanime);
	 category.filter(function() {return this.innerText === "Filmy - Blu-ray";}).wrapInner(filmybluray);
	 category.filter(function() {return this.innerText === "Filmy - dokument";}).wrapInner(filmydoku);
	 category.filter(function() {return this.innerText === "Filmy - DVD";}).wrapInner(filmydvd);
	 category.filter(function() {return this.innerText === "Filmy - DVD full";}).wrapInner(filmydvdfull);
	 category.filter(function() {return this.innerText === "Filmy - kreslené";}).wrapInner(filmykres);
	 category.filter(function() {return this.innerText === "HD";}).wrapInner(hd);
	 category.filter(function() {return this.innerText === "HD-LQ";}).wrapInner(hdlq);
	 category.filter(function() {return this.innerText === "Hry";}).wrapInner(hry);
	 category.filter(function() {return this.innerText === "Hudba";}).wrapInner(hudba);
	 category.filter(function() {return this.innerText === "Hudba DVD/HD";}).wrapInner(hudbadvd);
	 category.filter(function() {return this.innerText === "Knihy";}).wrapInner(knihy);
	 category.filter(function() {return this.innerText === "Konzole";}).wrapInner(konzole);
	 category.filter(function() {return this.innerText === "Mluvené slovo";}).wrapInner(mluvene);
	 category.filter(function() {return this.innerText === "Mobil, PDA";}).wrapInner(mobil);
	 category.filter(function() {return this.innerText === "Ostatní";}).wrapInner(ostatni);
	 category.filter(function() {return this.innerText === "Seriály";}).wrapInner(serialy);
	 category.filter(function() {return this.innerText === "Soundtrack";}).wrapInner(soundtrack);
	 category.filter(function() {return this.innerText === "Videoklipy";}).wrapInner(videoklipy);
	 category.filter(function() {return this.innerText === "xXx";}).wrapInner(xxx);

// SECTION 2

	/*1. Check if torrent is new since last visit,
	* if yes, change background color
	*/

	var lastVisitSpan = document.querySelectorAll('td.detaily>span:last-child');
    var lastvisit = Cookies.get('lastVisit');
    for (var k=0; k < lastVisitSpan.length; k++) {
    var a = lastVisitSpan[k].innerText;
    var c = a.split(' | ')[1];
    var d = c.split(".").join("/");
    var e = d.split('/');
    var f = e[1]+'/'+e[0]+'/'+e[2];
    var g = new Date(f);
    var date = g.getTime();
    var color = 'rgb(205, 206, 210)';
    if(document.getElementById('darkMode'))
        color = 'rgb(67, 67, 67)';
    if ( lastvisit < date ) {
        lastVisitSpan[k].closest('tr.torr_hover').setAttribute('style', 'background-color:'+color);
    }
}

// SECTION 3

/* START - Simple Lightbox */
    var overlay = jQuery("<div id='overlay' style='background: rgba(0, 0, 0, .7); width: 100%; height: 100%; position: fixed; top: 0; left: 0; z-index: 999; text-align: center; overflow-y: auto;'>" +
        "<div id='img-res' style='text-align:center;margin:2% auto 10px;color: white;font-size: 1.3em;'>X x X</div><div id='zoomIn' style='position: absolute;left: calc(50% - 40px);padding: 5px 8px;" +
        "border: 1px solid white;border-radius: 5px;'>+</div><div id='zoomOut' style='position: absolute;left: calc(50% + 20px);padding: 5px 8px;border: 1px solid white;border-radius: 5px;'>-</div>" +
        "<div id='img' style='margin-top: 40px;'></div></div>");
	overlay.appendTo('body').hide();

	jQuery('a.image_overview').on('click', function(e) {
		e.preventDefault();
		var src = jQuery(this).attr('href');
		var dim = '';
        var image = new Image();
        image.addEventListener("load", function(){
            dim =  this.naturalWidth +' x '+ this.naturalHeight;
        });
        image.src = src;
        image.style.border = "5px solid #fff";
        image.style.borderRadius = "10px";
        image.style.height = "auto";
        image.style.maxHeight = "50%";
        image.style.width = "auto";
        image.style.maxWidth = "50%";
        jQuery('#img', overlay).html(image);
		overlay.fadeIn('400');
        setTimeout( function(){
            jQuery('#img-res', overlay).text(dim);
        }  , 500 );
	});

	overlay.on('click', function() {
		overlay.fadeOut('400');
	});
    jQuery('#zoomIn').on('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        jQuery('#img img').css({maxHeight:"",maxWidth:""});
    });
    jQuery('#zoomOut').on('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        jQuery('#img img').css({maxHeight:"50%",maxWidth:"50%"});
    });

	jQuery(document).on('keyup', function(e) {
		if ( e.which === 27 ) overlay.fadeOut('400');
	});

/* END - Simple Lightbox */


	/*
	*
	* AJAX PART START
	*
	* Check if cookie "currentUser" exists,
	* if not, parse forum link to get czt_id,
	* validate, then ajax will work,
	* otherwise, go fuck yourself
	*/

// SECTION 4

	/* START - Get current user ID, get current user czt_id, validate */
	var ids = Cookies.get('uid');
	var getuservalid = Cookies.get('currentUser');
	if(typeof getuservalid == 'undefined') {
		jQuery.ajax({
		url: "https://tracker.cztorrent.net/forum/newtopic/117",
        type: "GET",
        success: function(d) {
            var czt_id = jQuery(d).find("form").attr("action").split('/')[4];
			var ident = ids + "/" + czt_id;
			Cookies.set('currentUser', ident, { expires: 365 });
			var getuservalid = Cookies.get('currentUser');
	       	}
	   	});

	}

   	var czt_id = getuservalid.split('/')[1];
	var uservalid = getuservalid.split('/')[0];
	setTimeout( function(){
		if ( uservalid === ids ) {
	    } else {
			jQuery.ajax({
			url: "https://tracker.cztorrent.net/forum/newtopic/117",
        	type: "GET",
        	success: function(d) {
            var czt_id = jQuery(d).find("form").attr("action").split('/')[4];
			var ident = ids + "/" + czt_id;
			Cookies.set('currentUser', ident, { expires: 365 });
			var getuservalid = Cookies.get('currentUser');
        	}
		});
	}}  , 3000 );
	/* END - Get current user ID, get current user czt_id, validate */

// SECTION 5

	/* START - Create quickreply form in forum, insert action attr correctly, reload if done */
	// not available
	/* END - Create quickreply form in forum, insert action attr correctly, reload if done */

// SECTION 6

	/* START - Thanks for torrent with ajax without reloading - hide form */
	jQuery("#torrent_podekovat > form").on('click', '.button', function(e) {
		e.preventDefault();
		var req = jQuery.ajax({
			url: jQuery("#torrent_podekovat > form").attr('action'),
			type: 'POST',
			data: jQuery("#torrent_podekovat > form").serialize()
		});
		req.done(function(data) {
			jQuery("#torrent_podekovat > form").hide('slow');
		});
	});
	/* END - Thanks for torrent with ajax without reloading - hide form */

// SECTION 7

	/* START - Comment torrent with ajax without redirect to success page */
	/* not available */
	/* END - Comment torrent with ajax without redirect to success page */


// SECTION 8

	/* START - Thanks for torrent in "seeding" list */
	var seedpage = "https://tracker.cztorrent.net/profile/"+ Cookies.get('uid') +"/seeding";
	if (location.href == seedpage){
	    var thanktd = jQuery("table.table > tbody > tr.borders");

	    jQuery(thanktd).each(function() {
	    	var a = jQuery( this ).find('td.torrent_seed').next().text();
	    	if (a == "NE") {
	    		var tid = jQuery( this ).find('td.cross > a').attr('href').split('/')[3];
	    		var thankform = "<form class=\"thanksbutton\" method=\"post\" action=\"\/thanks\/"+ tid +"\/"+ czt_id +"\">\r   <div style=\"display:none;\">\r    <input class=\"checkbox\" name=\"send_gift\" value=\"1\" checked=\"checked\" type=\"checkbox\"><input class=\"input_text\" name=\"gift\" value=\"100\" size=\"3\" maxlength=\"3\" type=\"text\"><br>\r    <input name=\"anonymous\" value=\"1\" type=\"checkbox\"><\/div>\r   <input class=\"button\" value=\"Poděkovat (100)\" type=\"submit\">\r  <\/form>";
	    		jQuery( this ).find('td.torrent_seed').next().html(thankform);
	    	}
	    });
        jQuery(".thanksbutton").on('click', '.button', function(e) {
            e.preventDefault();
            var form = jQuery(this).closest(".thanksbutton");
            var req = jQuery.ajax({
                url: form.attr('action'),
                type: 'POST',
                data: form.serialize(),
                success: function (data) {
                    form.parent().html("<span style=\"color:green;\">ANO (100)</span>");
                }
            });
        });
  }
	/* END - Thanks for torrent in "seeding" list */

	/*
	*
	* AJAX PART END
	*
	*/
});


// SECTION x1

function getMeta(url){
    var img = new Image();
    img.addEventListener("load", function(){
        alert( this.naturalWidth +' '+ this.naturalHeight );
    });
    img.src = url;
}


// SECTION x2 - part of SECTION 2

setTimeout( function(){
    var timenow = Date.now();
    Cookies.set('lastVisit', timenow, { expires: 365, path: 'tracker.cztorrent.net/torrents'  });
  }  , 8000 );
