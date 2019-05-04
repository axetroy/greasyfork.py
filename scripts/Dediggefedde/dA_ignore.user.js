// ==UserScript==
// @name        dA_ignore
// @namespace   dA_ignore
// @author   Dediggefedde
// @description ignores people on dA
// @match     http://*.deviantart.com/*
// @match     https://*.deviantart.com/*
// @require    	http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js
// @require  		https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// @version     1.3.16
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM.setValue
// @grant       GM.getValue
// ==/UserScript==

/*
Hide Tags/Description:

DiFi.pushPost("DeviationView","getExtrasHTML",["501848540","",{},{"is_referred":0,"origin":"dynamic_nav_click","is_new_tab":1}],function(success, data){
   console.log(data.response.content.html_col1.split("http://www.deviantart.com/tag/").length);
   //tag-count
});
DiFi.send();
*/

var ignorenames = [];
var settings = {
    hidecomments: false,
    hidemessages: true,
    deletemessages: true,
    hideprofile: true,
    hidedeivations: true
};
function pruf() {
    //dynamic browsing, check all 1s.
    setTimeout(pruf, 500);
    var foundindex=-1;
	if (settings.hidedeivations){
		var thumbs=$("div.tt-a.tt-fh:not(notignore)").filter(function(){
				for (var i = 0; i < ignorenames.length; i++){
					   if ($(this).attr("username").toLowerCase() == ignorenames[i].toLowerCase().trim()){
					   foundindex=i;
					   return true;
				   }
				}
				return false;
			}).attr("notignore","");
		thumbs.remove();
	}

    var bnam = $('a.u:not(notignore),div.tt-a:not(notignore),img.avatar:not(notignore)').filter(function(){
        for (var i = 0; i < ignorenames.length; i++){
			if(ignorenames[i]=="")continue;
			// console.log(ignorenames[i],$(this).html().toLowerCase());
			if ($(this).html().toLowerCase() == ignorenames[i].toLowerCase().trim()||($(this).attr("username")!=null&&$(this).attr("username").toLowerCase()==ignorenames[i].toLowerCase())||($(this).attr("title")!=null&&$(this).attr("title").toLowerCase()==ignorenames[i].toLowerCase())){
				if($(this).parents("div.stacklink-cover").length>0)return false;
				//console.log(ignorenames[i],$(this).html().toLowerCase());
			   foundindex=i;
			   return true;
			}
        }
        return false;
    }) .attr('notignore', '');
 	if(settings.hidedeivations){
		bnam.parents("span.thumb").remove();
	}
    if (bnam.length == 0) return ;

    if (settings.deletemessages && bnam.parents('div.mcbox') .length > 0){
		function parpas(bnam){
			bnam.parents('div.ch-ctrl').find('span.mcx').get(0).click();
		}
		setTimeout(function(){parpas(bnam);},1000); //1s delay for removing
	}else
	if (bnam.filter("img.avatar").closest("div.grf-deviants").length>0){bnam.filter("img.avatar").closest("span.f").remove();}else
	if (bnam.filter("img.avatar").closest('a').length>0){bnam.filter("img.avatar").closest("a").remove();}else
    // if (bnam.parents('.f').length>0){bnam.closest('.f').remove();console.log(".f");}else
	if (settings.hidemessages && bnam.parents('div.mcbox').length > 0){bnam.parents('div.mcbox').first().remove();}else
	if (settings.hidecomments && bnam.parents('div.ccomment').length > 0){
    bnam.parents('div.ccomment').first().remove();
  }else if (settings.hidecomments && bnam.parents('div.deviation-full-minipage').length > 0){
		bnam.parents('div.deviation-full-minipage').prev("div.deviation-full-container").remove();
		bnam.parents('div.deviation-full-minipage').remove();
	}else
	// bnam.parents('div.ccomment').first().remove();
    if (settings.hideprofile && bnam.parents('div.catbar').length > 0 && $("#da_unignore_but").length==0) {
        $('#gmi-GPage').html('<div align=center><img src="http://fc01.deviantart.net/fs46/f/2009/196/d/4/d49e01f2265f3024db7194a3622a415f.png" alt="user blocked" /><h1>You blocked this user!</h1></div>');
		$("#da_ignore_but").remove();

		if ($("div.gmbutton2town.moarbuttons").length==0) {
			$("div.catbar").append($('<div class="gmbutton2town moarbuttons">'));
		}
		var al=$("div.gmbutton2town.moarbuttons");
        al.prepend($('<a id="da_unignore_but" class="devwatch gmbutton2 gmbutton2qn2r" title="remove from your ignore-list" href="#"><i class="icon i27"></i><span>UnIgnore</span><b></b></a>').click(function(){
			ignorenames.splice(foundindex,1);
			setTimeout(()=> {
			   GM.setValue('blocklist',ignorenames.join("\n") );
			   location.reload();
			  }, 0);
		}));
    }

}

if ($("div.catbar").length>0) {
	if($("#da_ignore_but").length==0){
		if ($("div.gmbutton2town.moarbuttons").length==0) {
			$("div.catbar").append($('<div class="gmbutton2town moarbuttons">'));
		}
		var al=$("div.gmbutton2town.moarbuttons");
		al.prepend($('<a id="da_ignore_but" class="devwatch gmbutton2 gmbutton2qn2r" title="Add to your ignore-list" href="#"><i class="icon i27"></i><span>Ignore</span><b></b></a>').click(function(){
			ignorenames.push($("#deviant a.u").html());
			setTimeout(()=> {
			   GM.setValue('blocklist',ignorenames.join("\n") );
			  }, 0);
		}));
	}
}
if (location.href.indexOf('https://www.deviantart.com/settings') == 0) {
    var ignoremenu = $('<li><a href="#">Ignore User</a></li>');
    $('#settings_public') .parent() .after(ignoremenu);
    ignoremenu.find('a') .click(function () {
        $('a.active') .removeClass('active');
        $(this) .addClass('active');
        $('div.settings_form') .html('' +
        '<div class="fooview ch">' +
        '<div class="fooview-inner">' +
        '<h3>Ignore Users</h3>' +
        '<span>Separate usernames by linebreaks!</span>' +
        '<fieldset style="border:none;padding:0;">' +
        '<textarea cols="70" rows="4" class="itext_uplifted" id="da_ignore_textarea">' + ignorenames.join('\n') + '</textarea>' +
        '</fieldset>' +
        '<div class=" buttons ch hh " id="submit">' +
        '<div style="text-align:right" class="rr">' +
        '<a class="smbutton smbutton-green" href="javascript:void(0)"><span id="da_ignore_saveblocklist">Save</span></a>' +
        '</div></div></div></div>' +
        '' +
        '<div class="fooview ch">' +
        '<div class="fooview-inner">' +
        '<h3>Behavior</h3>' +
        '<div class="altaltview altaltview-wider">' +
        '<div class="row">' +
        '<input ' + (settings.hidecomments?'checked="checked"':'') + ' type="checkbox" value="1" id="da_ignore_hidecomments" class="icheckbox">' +
        '<label for="da_ignore_hidecomments" class="l">Hide Comments</label>' +
        '<br><small>This will automatically <strong>hide</strong> comments and replies made by a ignored user. This affects all Submissions. Other People can still see comments hidden like this.</small>' +
        '</div>' +
        '<div class="browse-sitback row">' +
        '<input ' + (settings.hidemessages ? 'checked="checked"' : '') + ' type="radio" value="1" id="da_ignore_hidemessages" name="da_ignore_message" class="icheckbox">' +
        '<label for="da_ignore_hidemessages" class="l">Hide Messages</label>' +
        '<br><small>This will automatically <strong>hide</strong> Replies and Comments given to you by ignored users. Hidden Comments are still existent and won\'t get removed.</small>' +
        '</div>' +
        '<div class="browse-sitback row">' +
        '<input ' + (settings.deletemessages ? 'checked="checked"' : '') + ' type="radio" value="1" id="da_ignore_deletemessages" name="da_ignore_message" class="icheckbox">' +
        '<label for="da_ignore_deletemessages" class="l">Delete Messages</label>' +
        '<br><small>This will automatically <strong>delete</strong> Replies and Comments given to you by ignored users.</small>' +
        '</div>' +
        '<div class="browse-sitback row">' +
        '<input ' + (settings.hideprofile ? 'checked="checked"' : '') + ' type="checkbox" value="1" id="da_ignore_hideprofile" class="icheckbox">' +
        '<label for="da_ignore_hideprofile" class="l">Hide Profile</label>' +
        '<br><small>This will automatically hide ignored user\'s profile-page. You can still visit them, but instead of their profile-content, there will be a notification.</small>' +
        '</div>' +
        '<div class="browse-sitback row">' +
        '<input ' + (settings.hidedeivations ? 'checked="checked"' : '') + ' type="checkbox" value="1" id="da_ignore_hidedeivations" class="icheckbox">' +
        '<label for="da_ignore_hidedeivations" class="l">Hide Deviations</label>' +
        '<br><small>Hide all submissions from a user that are displayed on deviantart\'s front-pages.</small>' +
        '</div>' +
        '<div class=" buttons ch hh " id="submit">' +
        '<div style="text-align:right" class="rr">' +
        '<a class="smbutton smbutton-green" href="javascript:void(0)"><span id="da_ignore_savesettings">Save</span></a>' +
        '</div></div></div></div></div>');
        $('#da_ignore_saveblocklist') .click(()=> {
            ignorenames = $('#da_ignore_textarea') .val() .split('\n');
            setTimeout(()=> {
                GM.setValue('blocklist', $('#da_ignore_textarea') .val());
            }, 0);
            alert('List saved!');
        });
        $('#da_ignore_savesettings') .click(()=> {
            settings.hidecomments = $('#da_ignore_hidecomments') .prop('checked');
            settings.hidemessages = $('#da_ignore_hidemessages') .prop('checked');
            settings.deletemessages = $('#da_ignore_deletemessages') .prop('checked');
            settings.hideprofile = $('#da_ignore_hideprofile') .prop('checked');
            settings.hidedeivations = $('#da_ignore_hidedeivations') .prop('checked');
            setTimeout(()=>{
                GM.setValue('settings', JSON.stringify(settings));
            }, 0);
            alert('List saved!');
        });
    });
}
async function loadsettings() {
  var Zignorenames = await GM.getValue('blocklist',null);
  if(Zignorenames!=null)ignorenames=Zignorenames.split('\n');
  var Zsettings = await GM.getValue('settings',null);
  if(Zsettings!=null)settings=$.parseJSON(Zsettings);

	if(settings.hidecomments==null)settings.hidecomments = true;
	if(settings.hidemessages==null)settings.hidemessages = false;
	if(settings.deletemessages==null)settings.deletemessages = true;
	if(settings.hideprofile==null)settings.hideprofile = true;
	if(settings.hidedeivations==null)settings.hidedeivations = true;
}

var prom=loadsettings();
prom.then(pruf);
