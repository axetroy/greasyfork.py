// ==UserScript==
// @name        Show Artist Pixiv ID
// @namespace   https://greasyfork.org/en/users/37676
// @description Show Pixiv ID of the artist under nickname
// @match       *://*.pixiv.net/member.php*
// @match       *://*.pixiv.net/member_illust.php*
// @match       *://*.pixiv.net/bookmark.php*
// @match       *://*.pixiv.net/mypixiv_all.php*
// @match       *://*.pixiv.net/stacc/*
// @run-at      document-end
// @version     1.0.6.1
// @grant       none
// @license     Creative Commons Attribution 4.0 International Public License; http://creativecommons.org/licenses/by/4.0/
// ==/UserScript==

var pageObserver = null;
var userAccountName = null;
var userID = null;

var tesObserver = null;

var elementUserProfile = document.querySelector('._user-profile-card');

if (elementUserProfile)
{
	var elementNickname = elementUserProfile.querySelector('.user-name');
	
	if (elementNickname)
	{
		var columnHeader = document.querySelector('.column-header');
		
		if (columnHeader)
		{
			var stacc = columnHeader.querySelector('a[href*="stacc"]');
			
			if (stacc.href)
			{
				var arraySplit = stacc.href.split('/');
				elementNickname.innerHTML += '<br />'+arraySplit[arraySplit.length-1];
			}
		}
	}
}

else
{
	var illustObj =  globalInitData.preload.illust;

	if (illustObj)
	{
		for (var obj in illustObj)
		{
			if (illustObj[obj])
			{
				userAccountName = illustObj[obj].userAccount;
				userID = parseInt(illustObj[obj].userId);
				
				if (userAccountName && userID)
				break;
			}
		}
	}
	
    if (userAccountName && userID)
    {
        if (!pageObserver)
        {
            pageObserver = new MutationObserver(function(mutations) {
                var profileElement = document.querySelectorAll('a[href*="member.php?id='+userID+'"]:not([style*="background-image"])');
				
                if (profileElement.length > 0)
                {
					profileElement = profileElement[profileElement.length-1];
					
                    //pageObserver.disconnect();
                    //profileElement.innerHTML += '<br />'+userAccountName;
					
					if (profileElement.innerHTML.indexOf(userAccountName) < 0)
					profileElement.innerHTML += userAccountName;
                }
            });

            pageObserver.observe(document.querySelector('#root'), { 
                childList: true,
                subtree: true
            });
        }
    }
}
