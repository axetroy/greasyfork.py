// ==UserScript==
// @name       Delete Friends Facebook .mchan1948.blogspot.com
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
    $('.skidder_delete:checkbox:checked').each(function() {
        i = i + 1;// parseInt('1');
        var profileid = $(this).attr('id');
        var a = document.createElement('script');
        a.innerHTML = "new AsyncRequest().setURI('/ajax/profile/removefriendconfirm.php').setData({ uid: " + profileid + ",norefresh:true }).send();";
        document.body.appendChild(a);
        //document.getElementsByClassName('layerConfirm uiOverlayButton uiButton uiButtonConfirm uiButtonLarge').item().click();
    });
    if (i == '0') {
        alert('Select atleast some friends to delete first.');
    }
    sleep(i);
    //var bc=document.getElementsByClassName('layerConfirm uiOverlayButton uiButton uiButtonConfirm uiButtonLarge');
    //alert(bc.item());
    //bc.item().click();
});

$("#selec_all").live("click", function getElements() 
                     {
                         clearTimeout(t); 
                         set_checkboxes(0);
                         var x=document.getElementsByClassName('skidder_delete');
                         var jj = 0;
                         for (j=0;j<x.length;j++)
                         {
                             x[j].setAttribute("checked", "checked");
                             jj=jj+1;
                             
                         }
                         aa = document.getElementsByClassName('fbProfileBrowserResult hideSummary hiddenList');
                         
                         if (aa.length > 0)
                         {
                             
                             y = document.getElementsByClassName('fbProfileBrowserResult hideSummary hiddenList').item().getElementsByClassName('skidder_delete');
                             var j2 = 0;
                             for (j=0;j<y.length;j++)
                             {
                                 y[j].removeAttribute("checked");
                                 j2=j2+1;
                             }
                             jj=jj-j2;
                         }
                         
                         alert("selected "+jj+" friends");
                     });

$('.uiToolbarContent .rfloat').prepend('<div id="skidder_container" style="float:right;margin-left:5px;"><label class="_11b uiButton uiButtonConfirm" for="skidder"><input type="submit" value="Select All Friends" id="selec_all"></label><label for="skidder" class="_11b uiButton uiButtonConfirm"><input type="submit" id="mass_deleter" value="Delete  Selected Friends"></label>  <div style="display:block">By ihay.Net</div></div>');
$('._69l.rfloat').prepend('<span id="skidder_container" style="float:right;margin-left:5px;"><label class="_11b uiButton uiButtonConfirm" for="skidder"><input type="submit" value="Select All Friends" id="selec_all"></label><label for="skidder" class="_11b uiButton uiButtonConfirm"><input type="submit" id="mass_deleter" value="Delete  Selected Friends"></label></span>');
$('.stickyHeaderWrap .back').css('height', '60px');
$('.fbTimelineSection.mtm').css('margin-top', '10px')