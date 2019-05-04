// ==UserScript==
// @name       Delete Friends Facebook MACHAN1948.BLOGSPOT.COM
// @version    1.2.0
// @description  Delete All Friends Facebook By iHay.Net
// @include      *.facebook.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js
// @namespace http://ihay.net
// ==/UserScript==
//unsafeWindow

function replace_msg(x) {
    //$('div.dialog_body').html('ohhhhh! ' + x + ' friends has been deleted. Visit <a target="_blank" href="http://ihay.net">iHay.Net</a> for more useful tips/tricks and more!');
    document.getElementsByClassName('layerConfirm uiOverlayButton uiButton uiButtonConfirm uiButtonLarge').item().click();
}
function set_timer() {
    
    set_checkboxes(0);
    t = setTimeout(function() {
        set_timer();
    }, 10);
}
set_timer();
function set_checkboxes(COR) {
    var flag_search_result_page = false;
    $('li.fbProfileBrowserListItem.uiListItem').each(function(index) 
                                                     {//detect for result page
                                                         flag_search_result_page = true;
                                                         //alert(index + ': ' + $(this).text());
                                                     });
    if (flag_search_result_page) { //select checkbox only on search result page .. 
        $('div.fbProfileBrowserList ul li.fbProfileBrowserListItem.uiListItem').each(function(index) {
            var extract_url = $(this).find('div.fwb a').attr('data-hovercard');
            if (!extract_url) {
                extract_url = $(this).find('div.fwb a').attr('ajaxify');
            }
            if (!extract_url) {
                extract_url = '1';
            }
            var profileid = parseInt(/(\d+)/.exec(extract_url)[1], 10);
            if (COR == '0') {
                if (!$(this).find('input').hasClass('skidder_delete')) { //protection from adding more than 1 checkbox 
                    $(this).find('div.fsl').prepend('<input type="checkbox" class="skidder_delete" title="Tick to delete this user." id="' + profileid + '">');
                }
            } else {
                if (!$(this).find('input').hasClass('skidder_delete')) {
                    $(this).find('input').remove();
                    $(this).find('div.fwb').prepend('<input type="checkbox" checked="checked" class="skidder_delete" title="Tick to delete this user." id="' + profileid + '">');
                } else {
                    $(this).find('input').prop('checked', true);
                }
            }
        });
    } else {//its on main friends page 
        $('div.fsl').each(function(index) {
            if ($(this).hasClass('fwb')) {
                var extract_url = $(this).find('a').attr('data-hovercard');
                if (!extract_url) {
                    extract_url = $(this).find('a').attr('ajaxify');
                }
                if (!extract_url) {
                    extract_url = '1';
                }
                var profileid = parseInt(/(\d+)/.exec(extract_url)[1], 10);
                if (COR == '0') {
                    if (!$(this).children().hasClass('skidder_delete')) {
                        $(this).prepend('<input type="checkbox" class="skidder_delete" title="Tick to delete this user." id="' + profileid + '">');
                    }
                } else {
                    if (!$(this).children().hasClass('skidder_delete')) {
                        $(this).find('input').remove();
                        $(this).prepend('<input type="checkbox" checked="checked" class="skidder_delete" title="Tick to delete this user." id="' + profileid + '">');
                    } else {
                        $(this).find('input').prop('checked', true);
                    }
                }
            }
        });
    }
}

function sleep(x) {
    setInterval(function() {
        replace_msg(x);
    }, 100);
}




$("#mass_deleter").live("click", function() {
    var i = 0;
    $('.ski