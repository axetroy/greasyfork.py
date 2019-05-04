// ==UserScript==
// @name        hobby search
// @author      vinsai
// @namespace   'vinsai'
// @include     http://www.1999.co.jp/*
// @include     http://www.amiami.jp/*
// @include     http://www.hobbystock.jp/*
// @version     1.0
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @description test
// ==/UserScript==

(function()
{
	if (location.href.match('http://www.1999.co.jp/')) {
		var imgbox = $('.right .item_attention');
		if (imgbox.length > 0) {
			var imgs = $('.right table .imgbox img');			
		}
		else {
			imgbox = $('center');
			var imgs = $('.imgbox2 img');			
		}

		
		$(imgs).each(function(index, element) {
			var src = $(this).attr('src').replace('_s.', '.');
						console.log(src);
			$(imgbox).append("<img src=" + src + " />");
		});
		

	}
	else if (location.href.match('http://www.amiami.jp')) {
		var urls = $('#gallery a');
		var box = $('div.product_img_area').next().next();
		$(urls).each(function(index, element) {
			var src = $(this).attr('href');
			box.before("<img src=" + src + " />");
		});
	}
	else if (location.href.match('www.hobbystock.jp')) {
		var urls = $('#item_detail .cpModal');
		var box = 	$('#item_detail .center').next();
		$(urls).each(function(index, element) {
			var src = $(this).attr('href');
			box.before("<img src=" + src + " />");
		});
	}
})();

//===============================================================================
//			- Weekly Auto-Update Check -
//===============================================================================
// CheckForUpdate() will verify if the time has come to look if an update is available.
// CheckVersion() will verify if this script version is the latest available.
//===============================================================================
var script_title = "178 Photos Download";
var source_location = "http://userscripts.org/scripts/source/137129.user.js";
var current_version = "1.0";
var latest_version = " ";
var gm_updateparam = "178PhotosDownload_lastupdatecheck";
var lastupdatecheck = GM_getValue(gm_updateparam, "never");

// a google document is used to store the latest version number (If the version in that file does not match the current_version variable, an update will be triggered)
var version_holder = "http://dl.dropbox.com/u/4978696/userscripts/178.txt";

//Add a command to the menu in case someone wants to manually check for an update.
GM_registerMenuCommand("Better Good Smile->Manually Update", CheckVersion);

//Initiate the download of the new script version.
function GetNewVersion() {
        var today = new Date();
        GM_setValue(gm_updateparam, String(today));
        window.location = source_location;
}

//Verify if it's time to update
function CheckForUpdate()
{	
	var today = new Date();
	var one_day = 24 * 60 * 60 * 1000; //One day in milliseconds

	if(lastupdatecheck != "never")
	{
		today = today.getTime(); //Get today's date
		var lastupdatecheck = new Date(lastupdatecheck).getTime();
		var interval = (today - lastupdatecheck) / one_day; //Find out how much days have passed		

		//If a week has passed since the last update check, check if a new version is available
		if(interval >= 7)			
			CheckVersion();
	}
	else
		CheckVersion();
}

//Make sure we don't have the latest version
function CheckVersion()
{
	GM_xmlhttpRequest({
		    method: 'GET',
		    url: version_holder,
		    headers: {'Content-type':'application/x-www-form-urlencoded'},		    
		    onload: function(responseDetails)
			{
				var line = String(responseDetails.responseText.match(/version=[0-9].[0-9]?[0-9].[0-9]?[0-9]/));				
				
				if(line != null)
				{
					var strSplit = new Array();
					strSplit = line.split('=');					
					latest_version = strSplit[1];

					if(current_version != latest_version && latest_version != "undefined")
					{
						if(confirm("A more recent version of " + script_title + " (" + latest_version + ") has been found.\r\nWould you like to get it now?"))
							GetNewVersion();
						else
							AskForReminder();
					} 
					else if(current_version == latest_version)
						alert("You have the latest version of " + script_title + ".");
				}
				else
				{
					alert("Could not locate the version holder file.\r\nThis should be reported to the script author.\r\nThank you!");
					SkipWeeklyUpdateCheck();
				}
					
		    }
		});
}

//Ask the user to be reminded in 24 hours or only next week.
function AskForReminder()
{
	if(confirm("Would you like to be reminded in 24 hours ?\r\n(Cancel to be reminded next week only)"))
	{
		var today = new Date();
		today = today.getTime();		
		var sixdays_ms = 6 * 24 * 60 * 60 * 1000;
		var sda_ms = today - sixdays_ms;		
		var sixdaysago = new Date(sda_ms)

		//Since we check for updates after 7 days, just make it seem like the last check was 6 days ago.
		GM_setValue(gm_updateparam, String(sixdaysago));
	}
	else
		SkipWeeklyUpdateCheck();
}

//Set the next update check in seven days
function SkipWeeklyUpdateCheck()
{
	var today = new Date();
	//As if we've just updated the script, the next check will only be next week.
	GM_setValue(gm_updateparam, String(today));
}
//===============================================================================
//			- Weekly Auto-Update Check -
//===============================================================================