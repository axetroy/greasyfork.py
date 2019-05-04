// ==UserScript==
// @name       RYM: Embed vocaroo player
// @version    0.1
// @description  play vocaroo links
// @include      http://rateyourmusic.com/*
// @include      https://rateyourmusic.com/*
// @copyright  2012+, You
// @namespace https://greasyfork.org/users/2625
// ==/UserScript==

vocaroo =  '<object width="220" height="140"><param name="movie" value="http://vocaroo.com/mediafoo.swf?playMediaID=MEDIA_ID&autoplay=0">'
vocaroo += '</param><param name="wmode" value="transparent"></param><embed src="http://vocaroo.com/mediafoo.swf?playMediaID=MEDIA_ID&autoplay=0"'
vocaroo += 'width="220" height="140" wmode="transparent" type="application/x-shockwave-flash"></embed></object><br><a href="http://vocaroo.com"'
vocaroo += ' style="font-size:xx-small;" title="Vocaroo Voice Recorder">(Record your own)</a>'

$.each($('a:contains("vocaroo")'), function(){
    media_id = $(this).attr('href').split('i/')[1]
	$(this).html(vocaroo.replace('MEDIA_ID', media_id))
})