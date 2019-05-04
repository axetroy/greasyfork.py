// ==UserScript==
// @name        Eza's Pixiv Fixiv
// @namespace   https://inkbunny.net/ezalias
// @description Loads all manga pages at once in a simplified vertical layout
// @license     MIT
// @license     Public domain / No rights reserved
// @include     https://www.pixiv.net/member_illust.php?mode=medium&illust_id=*
// @include     https://www.pixiv.net/member_illust.php?mode=medium&illust_id=*&manga
// @exclude    *&dnr*
// @version     2.7
// ==/UserScript==



// On manga pages, load all images without having to manually scroll to each one. 
// Pixiv is terribly designed. Maybe it's a cultural Japanese thing, where they expect single-page click-and-wait browsing like it's still 1998. The site is just openly hostile to users' time and enjoyment. 
// To wit, I recommend Eza's Image Glutton, which directs from the "medium" landing pages to either the full-size single image or the manga page. Tedium is for robots. 



// Should Pixiv Fixiv load real thumbnails? Pixiv provides them. It's not like Tumblr Scrape where you want to save the small images; they only exist to provide an overview. 
	// Using full-size images indicates when they're done loading. 
// Finally wrapped my head around CSS classes being hierarchical in <style>, i.e. <div class=foo><img class=bar></div> goes ".foo img .bar{}" - but can't figure out "force fit."
	// Aha! width: 100vw; object-fit: contain; max-height: 100vh; basically gets it. Whitespace on sides of image is still treated as part of the image. 
	// Whitespace bug needs to be worked around because it's inconsistent with other scaling modes' behavior. Whitespace isn't generally clickable. 
	// Bless you, Shih-Min Lee on http://stackoverflow.com/questions/3029422/image-auto-resize-to-fit-div-container - nobody else understands "best fit." 
// Also, file extension misses need to either keep rotating or stop producing onError events. A slow connection or a dodgy browser produces a page of .gifs that never load. 
// Ahhh, feels good to get that squared away. Now if only I could clean up the onError code, or guaranteeably have the correct file extension for max-res images. 
// "Fit if wider" would be nice for comics, and "Fit if taller" is probably useful to someone. This is distinct from "Fit width," which should really bit "Fill width." 
// Width is slightly off? E.g. https://www.pixiv.net/member_illust.php?mode=medium&illust_id=74276621 - horizontal scrollbar, no margins. 
	// Changing 99vw to 98vw fixed it, but I'm interested in the underlying problem. Is it a lingering stylesheet from only replacing innerHTML? 
// Might want to use URL shenanigans to force different image sizes. It's not especially reliable as-is. You can't stop loading gigantic images and also load small images. 

// https://i.pximg.net/img-master/img/2017/03/08/06/42/48/61802872_p0_master1200.jpg - problems in pixiv.context.images
// https://i.pximg.net/img-original/img/2017/03/08/06/42/48/61802872_p0.png - failed
// https://i.pximg.net/img-original/img/2017/03/08/06/42/48/61802872_p0.png - worked
// Might've just been load issues 
// Maybe display the default size (straight from pixiv.context.images) and link the huge version? Fuck, but then there's no way to test original file extension. 

// Maybe display default size, but have a button to switch to / load the big ones? Same on_error code. Still beats base Pixiv. 
	// Cons: breaks existing functionality (automatic highest resolution). 
// Having implemented real thumbnails, maybe add a text button to change them to resized large images. That's convenient for saving. 

// Accounted for pximg CDN, fixing a softlock.
// Changed onerror function to drive thumbnails from main images. 
// Added HTTPS. 
// Changed 100vw to 99vw, for the sake of an image toolbar driven by onMouseover instead of onHover. 
// Added the ability to swap maximum-resolution files for the default "1200" size.
// Changed thumbnails to use actual 128x128 thumbnail files. 
// Adapted to Pixiv's spring 2019 redesign. 
// Changed 99vw to 98vw because the redesign was somehow slightly wider. CSS is witchcraft. 
// Recreated original behavior by adding &manga to URL. Redirect happens here instead of in Image Glutton because the new URL is pointless without this script. 
// Adjusted &dnr exclusion for Tampermonkey. 



var thumbnail_html = ""; 		// Clickable thumbnails that scroll down to each image
var options_html = "Scale images: "; 		// Fit-to-window buttons for oversized images  
var images_html = "<div id='gallery_div' class='fit_if_larger'><center>"; 		// Bare high-res images, absent any delayed loading, with links below each one
var style_html = "<style> "; 		// Style block for controlling image scale via the div's class names 

	// Extract page count from metadata.
pixiv_illust = globalInitData.preload.illust[ Object.keys( globalInitData.preload.illust )[0] ]; 		// Pixiv's own code parses this complex object for necessary metadata. 
page_count = parseInt( pixiv_illust.pageCount ); 
if( page_count == 1 ) { return; } 		// "return" used as the equivalent of Perl's "die". Script execution ends. Single-page submissions are not manga. 

if( window.location.href.indexOf( '&dnr' ) >= 0 ) { return; } 		// Tampermonkey has inconsistent @exclude behavior. 

	// Recreate separate URL behavior, so "back" button returns to default page. 
if( window.location.href.indexOf( '&manga' ) < 0 ) { 
	var redirect_url = window.location.href + "&manga"; 		// Has to go before adding &dnr to current history state.
	history.replaceState( {foo:'bar'}, 'Do-not-redirect version', window.location.href + "&dnr" );	// Modify URL without redirecting. {foo:'bar'} is a meaningless state object. 
	window.location.href = redirect_url; 
	return; 		// Just in case. 
}

//original_image = pixiv_illust.urls.original;		// https://i.pximg.net/img-original/img/2019/04/18/21/51/53/74262786_p0.jpg
//regular_image = pixiv_illust.urls.regular;			// https://i.pximg.net/img-master/img/2019/04/18/21/51/53/74262786_p0_master1200.jpg
//small_image = pixiv_illust.urls.small; 			// https://i.pximg.net/c/540x540_70/img-master/img/2019/04/18/21/51/53/74262786_p0_master1200.jpg
//thumb_image = pixiv_illust.urls.thumb; 			// https://i.pximg.net/c/250x250_80_a2/img-master/img/2019/04/18/21/51/53/74262786_p0_square1200.jpg
//mini_image = pixiv_illust.urls.mini; 				// https://i.pximg.net/c/48x48/img-master/img/2019/04/18/21/51/53/74262786_p0_square1200.jpg

	// Build a simplified version of the manga page, using high-res images. Clicking an image jumps to the next one. (Keyboard controls not implemented.) 
for( var page_number = 0; page_number < page_count; page_number++ ) { 
	var base_size = pixiv_illust.urls.regular.replace( '_p0', '_p' + page_number ); 		// https://i.pximg.net/img-master/img/2019/04/19/05/07/10/74268722_p0_master1200.jpg 

	var thumb_size = base_size.replace( 'c/1200x1200/', '' ); 		// Avoiding conditionals: remove c/1200 stuff if present, then proceed like it isn't. 
	thumb_size = thumb_size.replace( 'img-master', 'c/128x128/img-master' );   

	var max_size = base_size.replace( 'c/1200x1200/', '' ); 		// Avoiding conditionals: attempt replacement, and if nothing changes, that's fine. 
	max_size = max_size.replace( 'img-master', 'img-original' ); 
	max_size = max_size.replace( '_master1200', '' ); 
	max_size = max_size.replace( '.png', '.jpg' ); 		// Change PNG to JPG - so we only have to do JPG->PNG in our onError function. 
	max_size = max_size.replace( '.gif', '.jpg' ); 			// Same deal, change GIF to JPG. onError cycles from JPG -> PNG -> GIF. 

	var default_size = max_size; 		// Default display size - only here so large / small options still work when large is not the default. 

		// onError function rotates incorrect file extensions, since the right one can't be sussed out beforehand.
		// Each image's onError additionally changes the associated thumbnail and link.
	var image_onerror = 'this.src=this.src.replace(".png",".gif"); this.src=this.src.replace(".jpg",".png");'
	image_onerror += 'getElementById("' + page_number + 'link").href=this.src;'

	// Uncomment this line to use default resolution by default, instead of maximum resolution:
//	default_size = base_size; 		// At present, this breaks some "image links." 

	// Uncomment these lines to get the old thumbnail behavior (high resolution, small height): 
//	thumb_size = max_size; 		
//	image_onerror += 'getElementById("' + page_number + 'thumb").src=this.src;'

		// Display thumbnails for an overview of this manga's contents (and easy links to each page) 
	thumbnail_html += "<a href='#" + page_number + "'>";		// link thumbnail to the relevant page anchor 
	thumbnail_html += "<img alt='X' class='display' id='" + page_number + "thumb' src='" + thumb_size + "' height='100' width='auto'></a> ";

		// Display pages centered, each linked to the next, kind of like Pixiv does
	images_html += "<a id='" + page_number + "'>"; 		// Anchor, to be linked to by top thumbnails and the previous page 
	images_html += "<a href='#" + (1.0+page_number) + "'>"; 		// Link this image to the next image's anchor
	images_html += "<img alt='X' class='display large' data-src1='" + max_size + "' data-src2='" + base_size + "' src='" + default_size + "' onerror='" + image_onerror + "'>";  
	images_html += "</a></br><a id='" + page_number + "link' href='" + max_size + "'>Image link</a><br><br>"; 		// Link to the image, to easily open any page in tabs 

}

images_html += "<br><br><br><a id = '" + page_count + "'></a></div></center>";		// One last anchor, so the last image goes to the end of the page  

	// Create controls for image size, since full-size images can be extremely large.
options_html += "<button class='auto' onclick=\"document.getElementById('gallery_div').className='fit_if_larger'\">Fit if larger</button> ";
options_html += "<button class='auto' onclick=\"document.getElementById('gallery_div').className='force_fit'\">Force fit</button> ";
options_html += "<button class='auto' onclick=\"document.getElementById('gallery_div').className='fit_height'\">Fit height</button> ";
options_html += "<button class='auto' onclick=\"document.getElementById('gallery_div').className='fit_width'\">Fit width</button> ";
options_html += "<button class='auto' onclick=\"document.getElementById('gallery_div').className=''\">Original sizes</button> ";
	// New feature: swap between base resolution and highest possible resolution... also since full-size images can be extremely large.
	// Each button gets an onclick function, because inline <script> didn't behave well. For each class=large image, src=src1 or src=src2. 
options_html += "Choose files: "; 
options_html += "<a onclick=\"Array.from( document.getElementsByClassName( 'large' ) ).forEach( img => { img.src = img.getAttribute('data-src1'); } )\">Large</a>, "; 
options_html += "<a onclick=\"Array.from( document.getElementsByClassName( 'large' ) ).forEach( img => { img.src = img.getAttribute('data-src2'); } )\">Small</a> ";

	// Define CSS to scale images in various ways.
style_html += "<style> "; 		// I accidentally open <style> twice in the style_html string... but the script fails without both. What the fuck. 
style_html += "img{ height:auto; width:auto; } "; 
style_html += "img.thumbnail { height: 100px; width: auto; } "; 
style_html += ".fit_if_larger img.display { max-height: 100vh; max-width: 98vw; } "; 
style_html += ".force_fit img.display { width: 98vw; object-fit: contain; max-height: 100vh; } ";
style_html += ".fit_height img.display { height: 100vh; } "; 
style_html += ".fit_width img.display { width: 98vw; } "; 
style_html += "</style>"; 

	// Replace HTML body with our custom HTML. 
document.body.innerHTML = thumbnail_html + "<br>" + options_html + "<br><br>" + images_html + style_html; 		// Thumbnails, then options, then centered images




























//*/
