// ==UserScript==
// @name        ScnSrcBetterer
// @namespace   org.buck.scnsrc.v001
// @include     http://www.scnsrc.me/*
// @include     http://www.scnsrc.me/#*
// @include     https://www.scnsrc.me/*
// @include     https://www.scnsrc.me/#*
// @description Makes ScnSrc Better
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min.js
// @version     1.5.1
// @grant   GM_getValue
// @grant   GM_setValue
// @grant   GM_setClipboard

// the jquery popup embedded.
!function(t){var e,o,i=t(window),n={},a=[],s=[],p=null,l="_open",d="_close",r=[],c=null,u=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),f={_init:function(e){var o=t(e),i=o.data("popupoptions");s[e.id]=!1,a[e.id]=0,o.data("popup-initialized")||(o.attr("data-popup-initialized","true"),f._initonce(e)),i.autoopen&&setTimeout(function(){f.show(e,0)},0)},_initonce:function(o){var i,n,a=t(o),s=t("body"),d=a.data("popupoptions");if(p=parseInt(s.css("margin-right"),10),c=void 0!==document.body.style.webkitTransition||void 0!==document.body.style.MozTransition||void 0!==document.body.style.msTransition||void 0!==document.body.style.OTransition||void 0!==document.body.style.transition,"tooltip"==d.type&&(d.background=!1,d.scrolllock=!1),d.backgroundactive&&(d.background=!1,d.blur=!1,d.scrolllock=!1),d.scrolllock){var r,h;"undefined"==typeof e&&(r=t('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),h=r.children(),e=h.innerWidth()-h.height(99).innerWidth(),r.remove())}if(a.attr("id")||a.attr("id","j-popup-"+parseInt(1e8*Math.random(),10)),a.addClass("popup_content"),s.prepend(o),a.wrap('<div id="'+o.id+'_wrapper" class="popup_wrapper" />'),i=t("#"+o.id+"_wrapper"),i.css({opacity:0,visibility:"hidden",position:"absolute"}),u&&i.css("cursor","pointer"),"overlay"==d.type&&i.css("overflow","auto"),a.css({opacity:0,visibility:"hidden",display:"inline-block"}),d.setzindex&&!d.autozindex&&i.css("z-index","100001"),d.outline||a.css("outline","none"),d.transition&&(a.css("transition",d.transition),i.css("transition",d.transition)),a.attr("aria-hidden",!0),d.background&&!t("#"+o.id+"_background").length){s.prepend('<div id="'+o.id+'_background" class="popup_background"></div>');var v=t("#"+o.id+"_background");v.css({opacity:0,visibility:"hidden",backgroundColor:d.color,position:"fixed",top:0,right:0,bottom:0,left:0}),d.setzindex&&!d.autozindex&&v.css("z-index","100000"),d.transition&&v.css("transition",d.transition)}"overlay"==d.type&&(a.css({textAlign:"left",position:"relative",verticalAlign:"middle"}),n={position:"fixed",width:"100%",height:"100%",top:0,left:0,textAlign:"center"},d.backgroundactive&&(n.position="relative",n.height="0",n.overflow="visible"),i.css(n),i.append('<div class="popup_align" />'),t(".popup_align").css({display:"inline-block",verticalAlign:"middle",height:"100%"})),a.attr("role","dialog");var g=d.openelement?d.openelement:"."+o.id+l;t(g).each(function(e,o){t(o).attr("data-popup-ordinal",e),o.id||t(o).attr("id","open_"+parseInt(1e8*Math.random(),10))}),a.attr("aria-labelledby")||a.attr("aria-label")||a.attr("aria-labelledby",t(g).attr("id")),"hover"==d.action?(d.keepfocus=!1,t(g).on("mouseenter",function(){f.show(o,t(this).data("popup-ordinal"))}),t(g).on("mouseleave",function(){f.hide(o)})):t(document).on("click",g,function(e){e.preventDefault();var i=t(this).data("popup-ordinal");setTimeout(function(){f.show(o,i)},0)}),d.closebutton&&f.addclosebutton(o),d.detach?a.hide().detach():i.hide()},show:function(n,l){var u=t(n);if(!u.data("popup-visible")){u.data("popup-initialized")||f._init(n),u.attr("data-popup-initialized","true");var v=t("body"),g=u.data("popupoptions"),b=t("#"+n.id+"_wrapper"),m=t("#"+n.id+"_background");if(h(n,l,g.beforeopen),s[n.id]=l,setTimeout(function(){r.push(n.id)},0),g.autozindex){for(var y=document.getElementsByTagName("*"),_=y.length,k=0,w=0;_>w;w++){var z=t(y[w]).css("z-index");"auto"!==z&&(z=parseInt(z,10),z>k&&(k=z))}a[n.id]=k,g.background&&a[n.id]>0&&t("#"+n.id+"_background").css({zIndex:a[n.id]+1}),a[n.id]>0&&b.css({zIndex:a[n.id]+2})}g.detach?(b.prepend(n),u.show()):b.show(),o=setTimeout(function(){b.css({visibility:"visible",opacity:1}),t("html").addClass("popup_visible").addClass("popup_visible_"+n.id),b.addClass("popup_wrapper_visible")},20),g.scrolllock&&(v.css("overflow","hidden"),v.height()>i.height()&&v.css("margin-right",p+e)),g.backgroundactive&&u.css({top:(i.height()-(u.get(0).offsetHeight+parseInt(u.css("margin-top"),10)+parseInt(u.css("margin-bottom"),10)))/2+"px"}),u.css({visibility:"visible",opacity:1}),g.background&&(m.css({visibility:"visible",opacity:g.opacity}),setTimeout(function(){m.css({opacity:g.opacity})},0)),u.data("popup-visible",!0),f.reposition(n,l),u.data("focusedelementbeforepopup",document.activeElement),g.keepfocus&&(u.attr("tabindex",-1),setTimeout(function(){"closebutton"===g.focuselement?t("#"+n.id+" ."+n.id+d+":first").focus():g.focuselement?t(g.focuselement).focus():u.focus()},g.focusdelay)),t(g.pagecontainer).attr("aria-hidden",!0),u.attr("aria-hidden",!1),h(n,l,g.onopen),c?b.one("transitionend",function(){h(n,l,g.opentransitionend)}):h(n,l,g.opentransitionend)}},hide:function(e){o&&clearTimeout(o);var i=t("body"),n=t(e),a=n.data("popupoptions"),l=t("#"+e.id+"_wrapper"),d=t("#"+e.id+"_background");n.data("popup-visible",!1),1===r.length?t("html").removeClass("popup_visible").removeClass("popup_visible_"+e.id):t("html").hasClass("popup_visible_"+e.id)&&t("html").removeClass("popup_visible_"+e.id),r.pop(),l.hasClass("popup_wrapper_visible")&&l.removeClass("popup_wrapper_visible"),a.keepfocus&&setTimeout(function(){t(n.data("focusedelementbeforepopup")).is(":visible")&&n.data("focusedelementbeforepopup").focus()},0),l.css({visibility:"hidden",opacity:0}),n.css({visibility:"hidden",opacity:0}),a.background&&d.css({visibility:"hidden",opacity:0}),t(a.pagecontainer).attr("aria-hidden",!1),n.attr("aria-hidden",!0),h(e,s[e.id],a.onclose),c&&"0s"!==n.css("transition-duration")?n.one("transitionend",function(){n.data("popup-visible")||(a.detach?n.hide().detach():l.hide()),a.scrolllock&&setTimeout(function(){i.css({overflow:"visible","margin-right":p})},10),h(e,s[e.id],a.closetransitionend)}):(a.detach?n.hide().detach():l.hide(),a.scrolllock&&setTimeout(function(){i.css({overflow:"visible","margin-right":p})},10),h(e,s[e.id],a.closetransitionend))},toggle:function(e,o){t(e).data("popup-visible")?f.hide(e):setTimeout(function(){f.show(e,o)},0)},reposition:function(e,o){{var n=t(e),a=n.data("popupoptions"),s=t("#"+e.id+"_wrapper");t("#"+e.id+"_background")}if(o=o||0,"tooltip"==a.type){s.css({position:"absolute"});var p;p=a.tooltipanchor?t(a.tooltipanchor):a.openelement?t(a.openelement).filter('[data-popup-ordinal="'+o+'"]'):t("."+e.id+l+'[data-popup-ordinal="'+o+'"]');var d=p.offset();"right"==a.horizontal?s.css("left",d.left+p.outerWidth()+a.offsetleft):"leftedge"==a.horizontal?s.css("left",d.left+p.outerWidth()-p.outerWidth()+a.offsetleft):"left"==a.horizontal?s.css("right",i.width()-d.left-a.offsetleft):"rightedge"==a.horizontal?s.css("right",i.width()-d.left-p.outerWidth()-a.offsetleft):s.css("left",d.left+p.outerWidth()/2-n.outerWidth()/2-parseFloat(n.css("marginLeft"))+a.offsetleft),"bottom"==a.vertical?s.css("top",d.top+p.outerHeight()+a.offsettop):"bottomedge"==a.vertical?s.css("top",d.top+p.outerHeight()-n.outerHeight()+a.offsettop):"top"==a.vertical?s.css("bottom",i.height()-d.top-a.offsettop):"topedge"==a.vertical?s.css("bottom",i.height()-d.top-n.outerHeight()-a.offsettop):s.css("top",d.top+p.outerHeight()/2-n.outerHeight()/2-parseFloat(n.css("marginTop"))+a.offsettop)}else"overlay"==a.type&&(a.horizontal?s.css("text-align",a.horizontal):s.css("text-align","center"),a.vertical?n.css("vertical-align",a.vertical):n.css("vertical-align","middle"))},addclosebutton:function(e){var o;o=t(e).data("popupoptions").closebuttonmarkup?t(n.closebuttonmarkup).addClass(e.id+"_close"):'<button class="popup_close '+e.id+'_close" title="Close" aria-label="Close"><span aria-hidden="true">×</span></button>',$el.data("popup-initialized")&&$el.append(o)}},h=function(e,o,i){var n=t(e).data("popupoptions"),a=n.openelement?n.openelement:"."+e.id+l,s=t(a+'[data-popup-ordinal="'+o+'"]');"function"==typeof i&&i.call(t(e),e,s)};t(document).on("keydown",function(e){if(r.length){var o=r[r.length-1],i=document.getElementById(o);t(i).data("popupoptions").escape&&27==e.keyCode&&f.hide(i)}}),t(document).on("click",function(e){if(r.length){var o=r[r.length-1],i=document.getElementById(o),n=t(i).data("popupoptions").closeelement?t(i).data("popupoptions").closeelement:"."+i.id+d;t(e.target).closest(n).length&&(e.preventDefault(),f.hide(i)),t(i).data("popupoptions").blur&&!t(e.target).closest("#"+o).length&&2!==e.which&&t(e.target).is(":visible")&&(f.hide(i),"overlay"===t(i).data("popupoptions").type&&e.preventDefault())}}),t(document).on("focusin",function(e){if(r.length){var o=r[r.length-1],i=document.getElementById(o);t(i).data("popupoptions").keepfocus&&(i.contains(e.target)||(e.stopPropagation(),i.focus()))}}),t.fn.popup=function(e){return this.each(function(){if($el=t(this),"object"==typeof e){var o=t.extend({},t.fn.popup.defaults,e);$el.data("popupoptions",o),n=$el.data("popupoptions"),f._init(this)}else"string"==typeof e?($el.data("popupoptions")||($el.data("popupoptions",t.fn.popup.defaults),n=$el.data("popupoptions")),f[e].call(this,this)):($el.data("popupoptions")||($el.data("popupoptions",t.fn.popup.defaults),n=$el.data("popupoptions")),f._init(this))})},t.fn.popup.defaults={type:"overlay",autoopen:!1,background:!0,backgroundactive:!1,color:"black",opacity:"0.5",horizontal:"center",vertical:"middle",offsettop:0,offsetleft:0,escape:!0,blur:!0,setzindex:!0,autozindex:!1,scrolllock:!1,closebutton:!1,closebuttonmarkup:null,keepfocus:!0,focuselement:null,focusdelay:50,outline:!1,pagecontainer:null,detach:!1,openelement:null,closeelement:null,transition:null,tooltipanchor:null,beforeopen:null,onclose:null,onopen:null,opentransitionend:null,closetransitionend:null}}(jQuery);

var _OPTION_HIDESHOWS_ = true;
var hiddenshows = GM_getValue("hiddenshows", []);

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

$("body").prepend($("<div>", {
      id:    'popupthing'
}).css({
    backgroundColor:  '#4e4e4e'
  , borderRadius:     '10px'
  , border:           '2px solid #2e2e2e'
  , position:         'fixed'
  , right:            '50px'
  , width:            '500px'
  , height:           '90%'
  , padding:          '10px'
  , overflow:         'scroll'
}));

var popuparea = $("#popupthing");
function updateBlockListPopup() {
    popuparea.empty().text('Blocked shows:');
    hiddenshows.reverse().forEach(function(link){
        var item = $('<div>');

        item.append($('<a>', {
            html:  'x&nbsp;'
          , href:  'javascript:;'
          , click: function() {
                arrRemove(hiddenshows, link);
                GM_setValue("hiddenshows", hiddenshows);
                item.remove();
            }
        }))
        .append($('<span>', {
            text: link
        }));

        popuparea.append(item);
    });
};
updateBlockListPopup();

$('#popupthing').popup({
    focusdelay: 400
  , horizontal: 'right'
  , transition: '0.3s'
});

function arrRemove(list, item) {
    var i = list.indexOf(item);
    if (i != -1)
        list.splice(i, 1);
}

addGlobalStyle(
    '.ullink {'
        +'background-image: url(\'http://uploaded.net/favicon.ico\');'
        +'background-repeat: no-repeat;'
        +'padding-left: 20px;'
    +'}\n'
    + '.mxlink {'
        +'background-image: url(\'http://www.mexashare.com/favicon.ico\');'
        +'background-repeat: no-repeat;'
        +'padding-left: 20px;'
    +'}'
);

function hideObnoxiousAd() {
    $("a[href='http://goo.gl/LhFHDJ']").eq(0).parent().parent().parent().parent().hide();
    $("a[href='https://goo.gl/LhFHDJ']").eq(0).parent().parent().parent().parent().hide();
}

function hideScreens() {
    $("div.post img").each(function(){
        if (this.height > 200 && this.width > 650) {
            this.remove();
        }
    });
}


timer = 0;
$(window).scroll(function() {
  clearTimeout(timer);
  timer = setTimeout(function() {

    checkInView();

  }, 300);
});

function test($el) {
   var docViewTop = $(window).scrollTop(),
       docViewBottom = docViewTop + $(window).height(),
       elemTop = $el.offset().top,
       elemBottom = elemTop + $el.height();

   return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom)
             && (elemBottom <= docViewBottom) &&  (elemTop >= docViewTop) );
}

var readyToLoad = true;
function checkInView() {
  var loader = $("a.more.trigger");
  if(test(loader)) {
    if (readyToLoad) {
      scrollLoad();
    }
  }
}

var contentcontainer = $("div#content");
$("a.more.trigger").before($('<div style="text-align:center;"><img id="scrollerloader" style="margin-bottom: 25px; display:none;" src="http://i.imgur.com/YesVh0v.gif"></img></div>'));

var nextPageURL = $("a.nextpostslink").attr("href");

function scrollLoad() {
    if (!(nextPageURL === undefined)) {
        readyToLoad = false;
        $("#scrollerloader").show();

        $.get(nextPageURL, function (data) {

            var relevantData = $(data).find('div#content div.wrap');

            nextPageURL = $(data).find("a.nextpostslink").attr("href");
            relevantData.appendTo(contentcontainer);
            thoroughHideScreens();
            hideSomeShows();

            $("#scrollerloader").hide();


            // mark the load as finished (in 200ms)
            setTimeout(function() {
                readyToLoad = true;
                checkInView();
            }, 200);

        });
    }
}

var ul_links = [];
var mx_links = [];

$("div#comments h3").append('<button type="button" style="margin-left: 50px;" id="copyULbutton">Copy all UL links</button>               <button type="button" style="margin-left: 50px;" id="copyMXbutton">Copy all MX links</button>');
$("button#copyULbutton").click(function(){
    alert('Copying all UL links to clipboard');
    GM_setClipboard(ul_links.join("\n\n"), 'text');
});
$("button#copyMXbutton").click(function(){
    alert('Copying all MX links to clipboard');
    GM_setClipboard(mx_links.join("\n\n"), 'text');
});

$("div.comment a").each(function() {
    // log uploaded links
    if (  $(this).text().indexOf('uploaded.net')>=0
       || $(this).text().indexOf('ul.to/')>=0
       ){
        $(this).addClass('ullink');
        ul_links[ul_links.length] = $(this).text();

        if ($(this).text().indexOf('720p')>=0) {
            $(this).css('color', '#A0CC4B');
        };
        if ($(this).text().indexOf('1080p')>=0) {
            $(this).css('color', '#CC4BA0');
        };
    };

    // log mexashare links
    if (  $(this).text().indexOf('mexashare.com')>=0
       ){
        $(this).addClass('mxlink');
        mx_links[mx_links.length] = $(this).text();

        if ($(this).text().indexOf('720p')>=0) {
            $(this).css('color', '#A0CC4B');
        };
        if ($(this).text().indexOf('1080p')>=0) {
            $(this).css('color', '#CC4BA0');
        };
    };
});

function hideSomeShows() {
  if (_OPTION_HIDESHOWS_) {
    hiddenshows.forEach(function(showurl) {
        $('div.tvshow_info:has(a.info_link[href=\''+showurl+'\'])').parent().parent().remove();
    });

    $('div.tvshow_info').each(function(){
        var me = $(this);
        if (me.attr('data-processed') == undefined) {
            me.attr('data-processed', 'yes');
            var mydiv = this;
            var hideButton = $('<a>', {
                href:  'javascript:;'
              , text:  '[Hide]'
              , click: function() {
                    var url = me.find('a.info_link').first().attr('href');
                    hideShow(url);
                }
            })
            $(this).find('a.info_link').first().parent().append(', ').append(hideButton);
        }
    });
  }
}

function thoroughHideScreens() {
    hideScreens();
    setTimeout(hideScreens,100);
    setTimeout(hideScreens,1000);
    setTimeout(hideScreens,2000);
    setTimeout(hideScreens,3000);
    setTimeout(hideScreens,4000);
    setTimeout(hideScreens,5000);
    setTimeout(hideScreens,10000);
    setTimeout(hideScreens,20000);
}

hideSomeShows();
thoroughHideScreens();
hideObnoxiousAd();


$("span.more_auto")
    .empty()
    // .html('<span class="addShows">ADD</span>&nbsp;<span class="removeShows"><img width="10px" src="http://i.imgur.com/kh3qXxR.png"/></span>')
    .html('<span class="removeShows"><img width="15px" src="http://i.imgur.com/kh3qXxR.png"/></span>')
    .css({
        padding: '1px'
    });

function hideShow(newURL) {
    hiddenshows[hiddenshows.length] = newURL;
    GM_setValue("hiddenshows", hiddenshows);
    updateBlockListPopup();
    hideSomeShows();
}

// no longer used
$("span.addShows").click(function() {
    var newURL = prompt("Enter the TV.com URL for the show you want to block", "");
    if (newURL != null) {
        hideShow(newURL);
    }
});

$("span.removeShows").click(function() {
    $('#popupthing').popup('show');
});



// ==/UserScript==