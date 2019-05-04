// ==UserScript==
// @name            Snapzu visited link remover (SVLR)
// @version         0.3.6
// @namespace       sxxe@gmx.de
// @description     hides or shrinks visited links on snapzu and offers keyboard navigation

// @include         /snapzu\.com/
// @exclude         /snapzu\.com/.*tribepost.*/
// @exclude         /snapzu\.com/\w{2,}/\w{2,}/
// @exclude         /snapzu\.com/\w+$/
// @exclude         /snapzu\.com/t/\w+/manage/\w+/?/
// @exclude         /snapzu\.com/t/\w+/referral/


// @require         https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js

// ==/UserScript==

// Keyboard Shortcuts:
// 
// - h: Open / close popup view and load the first unread link
// - j: Mark next unread post as read (+minimize) (open site in popup if opened)
// - k: Mark previous unread post as read (+minimize) (open site in popup if opened)
// - g: Toggle pop width (default 50% - 100% browser window width)
//
// - l: Open comments of current post
// - u: up vote current post
// - m: down vote current post
// 

/*
09/1/2015: 0.3.6
    Fixed link detection
    Fixed shrinked links again

08/14/2015: 0.3.5
    Fixed shrinked links after snapzu update

08/05/2015: 0.3.4
    Added manage and referral pages to excluded urls 

08/04/2015: 0.3.3
    Keyboard shortcuts are not executed anymore when cursor is in input fields or textareas 

08/02/2015: 0.3.2
	Changed popup theme 

08/01/2015: 0.3.1 
    Initial upload (Port from reddit user script)
    Also a lot of adjustments to fit it better with snapzu
*/

var cached_links_time = 60*60*24*2; // Two days - how long should visited links be saved
var cached_links_count = 1000; // Only save this amount of links (due to performance reasons)
var fade_time = 1000; // time it takes until the visited link is completely invisible
var show_footer = true; // show how many links are currently cached at the buttom of reddit.com
var toggle_links_button = true; // show button to show / hide links (hide_links has to be true)
var hide_links = false; // removes links completely (after the next page reload)
var add_manual_hide_link = true; // adds a link to the frontpage to manually hide posts 

var popup_width_min = $(window).width() / 2; // Half browser window size
var popup_width_max = $(window).width(); // Full browser window size

// ----------------------------------------------------------

// Add config style
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle('#gmOverlayDialog { padding: 1px; }');

$("head").append (
    '<link href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/black-tie/jquery-ui.min.css" rel="stylesheet" type="text/css">'
);




//--- Add our custom dialog using jQuery.
$("body").append ('<div id="gmOverlayDialog"></div>');

$(".footerContainer").prepend ('<div style="padding-bottom: 20px; color: #A0A0A0;" id="button_info"></div>');

if (toggle_links_button && hide_links) {
    $("#button_info").append ('<div id="show_links" class="show_links"><button>Toggle links</button></div>');
}

if (add_manual_hide_link) {
    $('div.details').prepend('<a class="manHideLink comments" href="#">mark as read</a>');
}

var stateMachine;
window.addEventListener ("load", function () {

        stateMachine = new GM_LinkTrack();

        if (show_footer) {
            var numLinks    = stateMachine.GetVisitedLinkCount();
            $("#button_info").append ('<span>' + numLinks + ' links cached. (max '+ cached_links_count + ')</span>');
        }

    },
    false
);

var activeElement;
var popupSizeToggle = 0;
var popupWidth = popup_width_min;
document.addEventListener("keypress", function(e) {
    
    if(!e) e=window.event;

    var isShift = e.shiftKey;
    var key = e.which;
    var tag = e.target.tagName.toLowerCase();

    if ( (tag == 'input') || (tag == 'textarea') )
        return; 

    // http://www.w3schools.com/jsref/event_key_which.asp

    if (key == 106) { // j key
        // shrink next unshrinked link
        var element = getCorrectElement();

        if ( typeof element === "undefined" ) {  
            nextPage();
        } else if ( typeof element[0] === "undefined" ) {  
            nextPage();
        }

        stateMachine.LinkIsNewPub(element);
        setActiveElement(element);
        centerView(element);

        if ($("#gmOverlayDialog").dialog( "isOpen" )) {
            openLinkPopup(element);
        }

    } else if (key == 104) { // h key        
        if (!$("#gmOverlayDialog").dialog( "instance" )) {
            // open popup and open next unshrinked link
            var element = getCorrectElement();
            stateMachine.LinkIsNewPub(element);
            openLinkPopup(element);
            setActiveElement(element);
            centerView(element);
        } else {
            // close popup
            $("#gmOverlayDialog").html('<div id="gmOverlayDialog"></div>');
            $("#gmOverlayDialog").dialog( "destroy" );
        }

    } else if (key == 107) { // k key
        // open previous link in popup
        
        var element = getElementBeforeActive();
        stateMachine.LinkIsNewPub(element);
        setActiveElement(element);
        centerView(element);

        if ($("#gmOverlayDialog").dialog("isOpen")) {    
            openLinkPopup(element);
        }
        
    } else if (key == 103) { // g key
        // toggle popup size
        if ($("#gmOverlayDialog").dialog("isOpen")) {
            if (popupSizeToggle == 0) {
                popupWidth = popup_width_max;
                popupSizeToggle = 1;
            } else {
                popupWidth = popup_width_min;
                popupSizeToggle = 0;
            }
            $("#gmOverlayDialog").dialog ({
                 width:      popupWidth        
            });
        }
    }else if (key == 117) { // u key
        upVote(getActiveElement());
    } else if (key == 109) { // m key
        downVote(getActiveElement());
    }  else if (key == 108) { // l key
        openLinkComments(getActiveElement());
    }

}, true);

function setActiveElement(elm) {
   
    resetActiveElement();
    activeElement = elm;
    elm.addClass('rvlr_active');
    elm.closest('li:visible').find(".orderNum").css('color', '#FF4500');
    elm.closest('li:visible').prepend("<span class='rvlr_elem_a' style='position: absolute; left: -30px; color: #FF4500;'>O</span>");
}

function resetActiveElement() {
    if (activeElement) {
        activeElement.removeClass('rvlr_active');
        activeElement.closest('li:visible').find(".orderNum").css('color', 'inherit');
        activeElement.closest('li:visible').find(".rvlr_elem_a").remove();
    };
}

function getActiveElement() {
    return activeElement;
}

function isActiveElement(elm) {
    if (elm.hasClass('rvlr_active')) {
        return true;
    }
    return false;
}

function getCorrectElement() {
    var element;

    var aElement = getActiveElement();

    if (typeof aElement !== "undefined") {
        element = getElementAfterActive();
    }

    if (typeof element === "undefined") {
        element = getFirstUnreadLink();
    }

    return element;   
}


function nextPage() {

	var link = $('li.navBtn > a').eq(1)[0];
	if ( typeof link === "undefined" ) {
		// We are on page one
		$('li.navBtn > a').eq(0)[0].click();
	} else {
		link.click();
	}
    
}

function getFirstUnreadLink() {
    var currentElement;
    $('h4 > a').each(function() {
        if ( ($(this).closest('li').hasClass('shrinked') === false) && ($(this).closest('li').is(":hidden") === false) )  {
            currentElement = $(this);
            return false;
        }
    });
    return currentElement;
}

function getLastShrinkedLink() {
    var element;
    $('#siteTable a.title').each(function() {
        if ( ($(this).closest('div.thing').hasClass('shrinked') === true) && ($(this).closest('div.thing').is(":hidden") === false) )  {
            element = $(this);
        }
    });
    return element;
}

function getElementBeforeActive() {
    var element;

    element = $('.rvlr_active').closest('li').prevAll('li:visible').eq(0).find('h4 > a');

    return element;
}

function getElementAfterActive() {
    var element;

    element = $('.rvlr_active').closest('li').nextAll('li:visible').eq(0).find('h4 > a');

    return element;
}

function centerView(elm) {

    var offsetTop = $(elm).offset().top;
    var newTopPos = offsetTop - $(window).scrollTop();
    var elemLimitPos = $(window).height() / 2;

    //console.log("offsetTop: " + offsetTop);
    //console.log("newTopPos: " + newTopPos);        
    //console.log("elemLimitPos: " + elemLimitPos);

    if ( (newTopPos > elemLimitPos) || (newTopPos < 150) ) {
        $('html,body').animate({
            scrollTop: offsetTop - 200
        }, 800);
    }
}

function openLink(elm) {
    var href = elm.attr('href');
    window.open(href, '_blank');
}

function openLinkPopup(elm) {

    var href = elm.attr('href');
    var title = elm.text();

    var html = '<iframe style="border: 0px;" src="'+href+'" width="100%" height="100%"></iframe>';

    // check url to convert them if necessary
/*    var ytId = getYoutubeId(href); // Youtube

    if (ytId) {
        var palyerWidthh = ( $(window).width() / 2 ) * 0.75;
        html = '<iframe width="100%" height="'+palyerWidthh+'" src="//www.youtube.com/embed/' + ytId + '?autoplay=1" frameborder="0" allowfullscreen></iframe>';
    }*/

    $("#gmOverlayDialog").html(html);

    if (!$("#gmOverlayDialog").dialog( "instance" )) {
        $("#gmOverlayDialog").dialog ({
            autoOpen:   false,
            modal:      false,
            position:   {
               my: "right top",
               at: "right top",
               of: window, 
               collision: "none"
            },
            minWidth:   400,
            minHeight:  200,
            zIndex:     3666,
            show: {
                effect: "fade",
                duration: 500
            },
            hide: {
                effect: "fade",
                duration: 200
            }
        }).dialog ("widget").draggable ("option", "containment", "none");
    }

    $("#gmOverlayDialog").dialog ({
        title:      title,
        height:     $(window).height(),
        width:      popupWidth
    })

    $("#gmOverlayDialog").dialog('open');
}

$( window ).resize(function() {
    if ($("#gmOverlayDialog").dialog( "instance" )) {
        if ($("#gmOverlayDialog").dialog( "isOpen" )) {
            $("#gmOverlayDialog").dialog ({
                height:     $(window).height(),
                width:      popupWidth,
                position:   {
                   my: "right top",
                   at: "right top",
                   of: window
                },
            })
        }
    }
});

$( window ).scroll(function() {
    if ($("#gmOverlayDialog").dialog( "instance" )) {
        if ($("#gmOverlayDialog").dialog( "isOpen" )) {
            $("#gmOverlayDialog").dialog ({
                position:   {
                   my: "right top",
                   at: "right top",
                   of: window
                },
            })
        }
    }
});

function getYoutubeId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 0;
    }
}

function openLinkComments(elm) {
    var href = elm.closest('li').find(".comments").attr('href');
    window.open(href, '_blank');
}

function upVote(elm) {
    elm.closest('li').find(".voteUp ").click();
}

function downVote(elm) {
    elm.closest('li').find(".voteDown").click();
}

function GM_LinkTrack () {
    var visitedLinkArry = [];
    var numVisitedLinks = 0;
    var link_count = 0;
    var current_timestamp = new Date().getTime();

    var sortedLocalStorage = SortLocalStorage();

    // Get visited link-list from storage.
    for (var J = sortedLocalStorage.length - 1;  J >= 0;  --J) {

        var item = sortedLocalStorage[J];

        var four_weeks = cached_links_time*1000;

        // Get saved links
        if (/^Visited_\d+.*/i.test (item) ) {

            var regex = /^Visited_(\d+).*/;
            var old_timestamp = regex.exec(item)[1];

            var regex2 = /^Visited_\d+_(.*)/;
            var value = regex2.exec(item)[1];

            var regex3 = /^(Visited_\d+)_.*/;
            var itemName = regex3.exec(item)[1];

            //console.log(numVisitedLinks + " " + item+ " t: " + old_timestamp + " v: " + value + " n: " + itemName);

            if ( (value == '#') || (value == 'javascript:void(0)') ) {
                localStorage.removeItem (itemName);
                break;
            }

            if (link_count >= cached_links_count) {
                localStorage.removeItem (itemName);
                //console.log(numVisitedLinks + " " + value + "t: " + timeConverter(old_timestamp));
                link_count--;
            }
            link_count++;

            // check link age
            if ( (current_timestamp - old_timestamp) < four_weeks ) {
                visitedLinkArry.push (value);
                numVisitedLinks++;

                //console.log(numVisitedLinks + " " + localStorage[itemName] + " t: " +old_timestamp[1]);

                if (hide_links) {
                    $('a[href*="' + value + '"]').closest('li').fadeOut(fade_time);
                } else {
                    //$('a[href="' + localStorage[itemName] + '"]').closest('div').fadeOut(fade_time);
                    shrinkLinks($('a[href*="' + value + '"]'));
                }

            } else {
                // too old, remove from storage 
                localStorage.removeItem (itemName);
            }
        }
    }

    function SortLocalStorage() {

        var localStorageArray = [];

        if(localStorage.length > 0) {
            for (i=0; i<localStorage.length; i++){
                localStorageArray[i] = localStorage.key(i)+ "_" +localStorage.getItem(localStorage.key(i));
            }
        }

        return localStorageArray.sort();
    }

    function timeConverter(UNIX_timestamp) {
     var a = new Date(UNIX_timestamp*1000);
     var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
         var year = a.getFullYear();
         var month = months[a.getMonth()];
         var date = a.getDate();
         var hour = a.getHours();
         var min = a.getMinutes();
         var sec = a.getSeconds();
         var time = date+','+month+' '+year+' '+hour+':'+min+':'+sec ;
         return time;
    }

    function ShowLinks () {
        for (var J = localStorage.length - 1;  J >= 0;  --J) {
            var itemName    = localStorage.key (J);

            // Get saved links
            if (/^Visited_\d+$/i.test (itemName) ) {
                $('a[href="' + localStorage[itemName] + '"]').closest('li').fadeToggle(fade_time);
            }
        }
    }

    this.LinkIsNewPub = function (linkObj) {
        LinkIsNew(linkObj);
    };

    function LinkIsNew (linkObj) {
        var href = linkObj.attr('href');

        href = href.replace(/^(http|https)\:\/\//g, '');       

        if (visitedLinkArry.indexOf (href) == -1) {
            visitedLinkArry.push (href);
        
            var timestamp = new Date().getTime();

            var itemName    = 'Visited_' + timestamp;
            localStorage.setItem (itemName, href);
            numVisitedLinks++;
            
            // Hide links imideately after klicked. Makes it impossible to see commenst afterward.
            //$('a[href="' + href + '"]').closest('div').fadeOut(fade_time);
        }
        shrinkLinks(linkObj);
        setActiveElement(linkObj);

        return true;
    }

    function shrinkLinks (linkObj) {

        // Alter the look of clicked links imideately
        var mainLinkElement = linkObj.closest('li');

        // Remove elements that are nor needed in the smll view
        mainLinkElement.find('.itemImage').hide(fade_time, function () {
            $(this).remove();
        });
        mainLinkElement.find('p').hide(fade_time, function () {
            $(this).remove();
        });
        mainLinkElement.find('.extrasOnRight').remove();

        mainLinkElement.find('.details').contents().filter(function () {
		    return this.nodeType === 3; // remove text only
		}).remove();
		mainLinkElement.find('.manHideLink').remove();
		mainLinkElement.find('.tribes').remove();
		mainLinkElement.find('.manHideLink').remove();
		mainLinkElement.find('.linkDomain').remove();

		mainLinkElement.find('.details').css({'float':'right', 'margin':'0px'});
        mainLinkElement.find('.voting').css({'float': 'left', 'margin':'0px'});
        mainLinkElement.find('.count').css({'vertical-align': 'top'});        
        mainLinkElement.find('h4').css({'padding-left':'10px','float':'left','margin': '0px 0px 0px 20px'});
        mainLinkElement.find('.orderNum').css({'top': '4px'});

        mainLinkElement.css({'padding-top': '4px','padding-bottom': '28px','opacity': '0.2','min-height': '34px'});
        mainLinkElement.addClass('shrinked');

        return true;
    }

    function findLink (linkObj) {

        var link = linkObj.closest('li').find('h4 > a');

        if (link == 'javascript:void(0)') {
            link = linkObj.closest('li').find('h4 > a:nth-child(2)');
        }

        return link;
    }

    this.GetVisitedLinkCount = function () {
        return numVisitedLinks;
    };

    $('h4 a:not(.btn)').click(function() {
        LinkIsNew($(this));
    });
 
    if (toggle_links_button && hide_links) {
        $('#show_links button').click (function() {
            ShowLinks();
        });
    }

    if (add_manual_hide_link) {
        $('a.manHideLink').click (function(event) {
            event.preventDefault();
            var $titleLink = $(this).closest('li').find('h4 a:not(.btn)');

            LinkIsNew($titleLink);
        });
    }
}
