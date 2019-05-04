// ==UserScript==
// @name         نظرسنجی برنامه 90
// @namespace    http://varzesh3.com/
// @version      1.6.1
// @description  نظرسنجی برنامه 90 برای وب سایت ورزش3
// @date         2017-06-04
// @author       Arashi
// @match        http://www.varzesh3.com
// @include      http://www.varzesh3.com/news/*
// @include      http://varzesh3.com/
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @connect      bootstrapcdn.com
// @connect      adpdigital.com
// @require-d    http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js
// @icon         http://90tv.ir/favicon.png
// @grant        GM_getResourceText
// ==/UserScript==



(function() {

    // AdBlock -= Start
try{

    // TopHeader
    $('header > div.page-header--middle-row > div > div.pull-left.ads-block').remove();
    $('div.page-content > div > div.page-content-column.pull-right > div > div.col-xs-12.col-sm-8.pull-right.home-column.main-first-column > div.row.no-margin-side > div.col-xs-12.col-sm-6.pull-right.no-padding-right.home-column.first-column .ad-container').remove();
    $('div.page-content > div > div.page-content-column.pull-right > div > div.col-xs-12.col-sm-8.pull-right.home-column.main-first-column > div.row.no-margin-side > div.col-xs-12.col-sm-6.pull-right.no-padding-left.home-column.second-column .ad-container').remove();
    $('div.page-content > div > div.page-content-column.pull-right > div > div.col-xs-12.col-sm-4.pull-right.home-column.third-column .ad-container').remove();
    $('div.page-content > div > div.page-content-ads').remove();
    $('div.sidebar.right-border #ads-B1').remove();
    $('#ads-E1 .ad-container .ad').remove();
    $('div.page-content > div.center-container').removeClass('center-container').addClass("container");
    $('div.page-content > div.container > div.page-content-column.pull-right').removeClass('page-content-column pull-right');
    $('div.page-content > div > div > div > div.col-xs-12.col-sm-8.pull-right.home-column.main-first-column > div.row-fluid.home-column.wide-content-wrapper > div > div.news-slider--carousel.widget-slider.owl-carousel.owl-rtl.owl-loaded.owl-drag > div.owl-nav').remove();
}

    catch(err){
    }




    // AdBlock -= End







    // 90tv Survey -= Start
    var mainDiv = $('.widget#widget24');
    var myDiv = $(document.createElement('div')).addClass("widget survey-90").prependTo(mainDiv);
    var whead = $(document.createElement('div')).addClass("widget-header").append($(document.createElement('h1')).html("نتایح نظرسنجی گذشته برنامه 90")).appendTo(myDiv);
    var wcontent = $(document.createElement('div')).addClass("widget-content").css("padding","10px").appendTo(myDiv);
    
    var surstyle = "";
    surstyle += ".survey-90 {font-family: Yekan, YekanNumbers !important;}\n";
    surstyle += ".survey-90 .survey .no {font-size:10pt;margin-left:10px}\n";
    surstyle += ".survey-90 .survey .count {font-size:12pt}\n";
    surstyle += ".survey-90 .survey .perc {float:left;font-weight:bold;font-size:10pt}\n";
    surstyle += ".survey-90 .survey.selected {background:#eee;border-radius:10px;}\n";
    surstyle += ".survey-90 .corridor {display:table;width:100%;margin: 10px 0;}";
    surstyle += ".survey-90 .corridor > div {display:table-cell}";
    surstyle += ".survey-90 .corridor > .left {text-align:left}";
    surstyle += ".survey-90 .corridor > .right {text-align:right}";
    surstyle += ".survey-90 .ques {margin: 0;text-align:justify;font-size:10pt;}";
    GM_addStyle(surstyle);
    
    var surProgress = "@-webkit-keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}@keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}.progress{overflow:hidden;height:20px;margin-bottom:20px;background-color:#f5f5f5;border-radius:4px;-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,.1);box-shadow:inset 0 1px 2px rgba(0,0,0,.1)}.progress-bar{float:left;width:0;height:100%;font-size:12px;line-height:20px;color:#fff;text-align:center;background-color:#337ab7;-webkit-box-shadow:inset 0 -1px 0 rgba(0,0,0,.15);box-shadow:inset 0 -1px 0 rgba(0,0,0,.15);-webkit-transition:width .6s ease;-o-transition:width .6s ease;transition:width .6s ease}.progress-bar-striped,.progress-striped .progress-bar{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-size:40px 40px}.progress-bar.active,.progress.active .progress-bar{-webkit-animation:progress-bar-stripes 2s linear infinite;-o-animation:progress-bar-stripes 2s linear infinite;animation:progress-bar-stripes 2s linear infinite}.progress-bar-success{background-color:#5cb85c}.progress-striped .progress-bar-success{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)}.progress-bar-info{background-color:#5bc0de}.progress-striped .progress-bar-info{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)}.progress-bar-warning{background-color:#f0ad4e}.progress-striped .progress-bar-warning{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)}.progress-bar-danger{background-color:#d9534f}.progress-striped .progress-bar-danger{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)}.progress{position:relative}.progress .progress-bar{position:absolute;overflow:hidden;line-height:20px}.progress .progressbar-back-text{position:absolute;width:100%;height:100%;font-size:12px;line-height:20px;text-align:center}.progress .progressbar-front-text{display:block;width:100%;font-size:12px;line-height:20px;text-align:center}.progress.right .progress-bar{right:0}.progress.right .progressbar-front-text{position:absolute;right:0}.progress.vertical{width:20px;height:100%;float:left;margin-right:20px}.progress.vertical.bottom{position:relative}.progress.vertical.bottom .progressbar-front-text{position:absolute;bottom:0}.progress.vertical .progress-bar{width:100%;height:0;-webkit-transition:height .6s ease;-o-transition:height .6s ease;transition:height .6s ease}.progress.vertical.bottom .progress-bar{position:absolute;bottom:0}";
    GM_addStyle(surProgress);

        $('.news-page--news-text, .news-page--news-text p, .news-page--news-lead').addClass('survey-90');
    $('.news-page--news-text p strong').addClass('survey-90');


    GM_xmlhttpRequest({
        method: 'GET',
        url:'http://navad.adpdigital.com:8978/v2/mobileStats?sender=09364091209',
        headers: {  
            "Content-Type": "application/json"
        },
        onload: function(xhr) {
            var str = JSON.parse(xhr.response);
            var hVote = $(document.createElement('span')).addClass('ques').html(str.desc).appendTo(wcontent);
            var program = $(document.createElement('div')).addClass('corridor').appendTo(wcontent);
            var surList = $(document.createElement('div')).addClass('survey-list');
            var cnt = 0;
            var done = false;
            while (!done) {
                try{
                    var counter = str.items[cnt];
                    var check = counter.label;
                    cnt++;
                    done = false;
                }
                catch (err) {
                    done = true;
                }
            }   
            var arr = new Array(cnt);
            var tl = 0;
            for (var i = 0; i < cnt;i++){
                var totally = str.items[i];
                tl = tl + parseInt(totally.count);
                arr[i] = parseInt(totally.count);
            }
            arr.sort(function(a,b){return b-a;});

            var programnum = $(document.createElement('div')).addClass("right").html("برنامه " + str.id).appendTo(program);
            var programdate = $(document.createElement('div')).addClass("left").html("تاریخ " + str.pdate).appendTo(program);

            
            var items = new Array(cnt);
            for (var x = 0; x < cnt;x++){
                var votin = str.items[x];
                var label = votin.label;
                var color = votin.color;
                var index = votin.index;
                var count = parseInt(votin.count);
                var perc = Math.round((count * 100) / tl);
                var countFormatted = count.toLocaleString('en');

                // This item Elements
                // -----------------------------------
                var thisNo = $(document.createElement('div')).addClass("survey").attr("data-sort",count).css("padding","5px");
                try{
                    var sVote = parseInt(str.vote);
                    if (sVote === x){
                        $(thisNo).addClass("selected");
                    }
                }
                catch(err){}

                var spanNo = $(document.createElement('span')).addClass('no').html(index + ") ").appendTo(thisNo);
                var bColor = $(document.createElement('b')).html(label + " : ").appendTo(thisNo);
                var bCount = $(document.createElement('b')).addClass('perc').html(countFormatted + " رای").appendTo(thisNo);
                var prog = $(document.createElement('div')).addClass('progress').css({"margin-bottom":"10px"});
                var progData = $(document.createElement('div')).addClass('progress-bar progress-bar-striped active').attr('role','progressbar').attr('data-valuenow',perc).attr('aria-valuemin',0).attr('aria-valuemax',100).css({'width':perc + "%",'background-color':color}).html(perc + "%").appendTo(prog);
                
                $(thisNo).append(prog);
                $(surList).append(thisNo); 
            }
            
            // Sort by Value
            // --------------------------------------------------------
            // $(surList).find('.survey').sort(function (a,b){
            // return $(b).attr('data-sort') - $(a).attr('data-sort'); 
            // }).appendTo(surList);
            
            $(wcontent).append(surList);
        }
    });
    // 90tv Survey -= End



})();
