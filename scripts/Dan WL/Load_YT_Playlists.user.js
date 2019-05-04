// ==UserScript==
// @name        Load_YT_Playlists
// @namespace   DanWL
// @description Fully loads YouTube playlists.
// @include     https://www.youtube.com/playlist?list=*
// @version     1
// @grant       none
// ==/UserScript==
var DoScrolls;

function Scroll()
{
	var a = document.getElementsByTagName('a');
	var aNo = 0;
	var found_last_video = false;

	while (aNo < a.length)
	{
		if (a[aNo].firstElementChild)
		{
			if (a[aNo].firstElementChild.innerHTML == document.getElementById('stats').innerHTML.split('videos')[0].replace(/[^\d]/g, ''))
			{
				//if the index number of a video in a playlist is the same as the number of videos in the playlist, say that the last video has been found
				found_last_video = true;
				//stop the loop - faster performance
				break;
			}
		}
		aNo++;
	}
	if (found_last_video)
	{
		//scroll to the top of the page
		scrollTo(0, 0);
		//then stop auto-scrolling
		clearInterval(DoScrolls);
	}
	else
	{
		//scroll to the bottom of the playlist
		scrollTo(0, document.getElementById('contents').offsetHeight);
	}
}

function CallScroll()
{
	Scroll();
}

//check every 5 seconds to see if there are more videos in the playlist to load
DoScrolls = setInterval(CallScroll, 5000);