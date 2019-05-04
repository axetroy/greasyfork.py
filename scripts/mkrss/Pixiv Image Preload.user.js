// ==UserScript==
// @name        Pixiv Image Preload
// @namespace   https://greasyfork.org/en/users/37676
// @description Preload pixiv images
// @match       *://*.pixiv.net/member_illust.php?*mode=manga*
// @match       *://*.pixiv.net/member_illust.php?*mode=medium*
// @run-at      document-end
// @version     1.0.2
// @grant       none
// @license     Creative Commons Attribution 4.0 International Public License; http://creativecommons.org/licenses/by/4.0/
// ==/UserScript==

var pageObserver = null;

if (typeof pixiv !== 'undefined')
{
	if (pixiv.context.images.length)
	loadImage(0, pixiv.context.images);
}

else
{
	if (!pageObserver)
	{
		pageObserver = new MutationObserver(function(mutations) {
			var illustElement = document.querySelectorAll('a[class*="gtm-expand-full-size-illust"]');
			
			if (illustElement.length > 0)
			{
				var imageElement = illustElement[0].querySelector('img');
				
				if (imageElement)
				{
					if (imageElement.src)
					{
						var firstURL = imageElement.src;
						
						if (firstURL.indexOf('img-master') > 0)
						{
							pageObserver.disconnect();
							
							var arrayImage = [];
							
							for (var i=1; i < illustElement.length; i++)
							arrayImage.push(firstURL.replace('p0', 'p'+i));
							
							loadImage(0, arrayImage);
						}
					}
				}
			}
		});
		
		pageObserver.observe(document.querySelector('#root'), { 
			childList: true,
			subtree: true
		});
	}
}

function loadImage(index, arrayImage)
{
	if (index < arrayImage.length)
	{
		var image = new Image();
		image.onload = function() {
			loadImage(index+1, arrayImage);
		};
		image.src = arrayImage[index];
	}
}
