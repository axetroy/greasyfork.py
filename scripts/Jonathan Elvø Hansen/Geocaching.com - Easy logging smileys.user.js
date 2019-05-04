// ==UserScript==
// @name          Geocaching.com - Easy logging smileys
// @namespace     JonathanEH
// @description	  The script makes it much easier to add smileys to your logs on geocaching.com
// @include       http://geocaching.com/seek/log*
// @include       http://www.geocaching.com/seek/log*
// @include       https://geocaching.com/seek/log*
// @include       https://www.geocaching.com/seek/log*
// @grant         none
// @require       https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @version       2015.2.16
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$(function() {

	// CSS (jQuery) selector
	var textarea_element = $('.PostLogList #ctl00_ContentBody_LogBookPanel1_uxLogInfo');

	$(textarea_element).after('<div id="easy_logging_smileys">\
	\
	<span><img alt="[:)]" src="https://www.geocaching.com/images/icons/icon_smile.gif"> smile</span>\
	<span><img alt="[:(]" src="https://www.geocaching.com/images/icons/icon_smile_sad.gif"> frown</span>\
	<span><img alt="[:D]" src="https://www.geocaching.com/images/icons/icon_smile_big.gif"> big smile</span>\
	<span><img alt="[8)]" src="https://www.geocaching.com/images/icons/icon_smile_shy.gif"> shy</span>\
	<span><img alt="[8D]" src="https://www.geocaching.com/images/icons/icon_smile_cool.gif"> cool</span>\
	<span><img alt="[:O]" src="https://www.geocaching.com/images/icons/icon_smile_shock.gif"> shocked</span>\
	<span><img alt="[:I]" src="https://www.geocaching.com/images/icons/icon_smile_blush.gif"> blush</span>\
	<span><img alt="[:(!]" src="https://www.geocaching.com/images/icons/icon_smile_angry.gif"> angry</span>\
	<span><img alt="[:P]" src="https://www.geocaching.com/images/icons/icon_smile_tongue.gif"> tongue</span>\
	<span><img alt="[xx(]" src="https://www.geocaching.com/images/icons/icon_smile_dead.gif"> dead</span>\
	<span><img alt="[}:)]" src="https://www.geocaching.com/images/icons/icon_smile_evil.gif"> evil</span>\
	<span><img alt="[|)]" src="https://www.geocaching.com/images/icons/icon_smile_sleepy.gif"> sleepy</span>\
	<span><img alt="[;)]" src="https://www.geocaching.com/images/icons/icon_smile_wink.gif"> wink</span>\
	<span><img alt="[:X]" src="https://www.geocaching.com/images/icons/icon_smile_kisses.gif"> kisses</span>\
	<span><img alt="[:o)]" src="https://www.geocaching.com/images/icons/icon_smile_clown.gif"> clown</span>\
	<span><img alt="[^]" src="https://www.geocaching.com/images/icons/icon_smile_approve.gif"> approve</span>\
	<span><img alt="[B)]" src="https://www.geocaching.com/images/icons/icon_smile_blackeye.gif"> black eye</span>\
	<span><img alt="[V]" src="https://www.geocaching.com/images/icons/icon_smile_dissapprove.gif"> disapprove</span>\
	<span><img alt="[8]" src="https://www.geocaching.com/images/icons/icon_smile_8ball.gif"> eightball</span>\
	<span><img alt="[?]" src="https://www.geocaching.com/images/icons/icon_smile_question.gif"> question</span>\
	\
	</div>');
	
	// Thanks to RichOnRails
	// Source: http://richonrails.com/articles/text-area-manipulation-with-jquery
	jQuery.fn.extend({
		insertAtCursor: function(myValue) {
			return this.each(function(i) {
				if (document.selection) {
					//For browsers like Internet Explorer
					this.focus();
					sel = document.selection.createRange();
					sel.text = myValue;
					this.focus();
				}
				else if (this.selectionStart || this.selectionStart == '0') {
					//For browsers like Firefox and Webkit based
					var startPos = this.selectionStart;
					var endPos = this.selectionEnd;
					var scrollTop = this.scrollTop;
					this.value = this.value.substring(0, startPos) + myValue + 
						this.value.substring(endPos,this.value.length);
					this.focus();
					this.selectionStart = startPos + myValue.length;
					this.selectionEnd = startPos + myValue.length;
					this.scrollTop = scrollTop;
				} else {
					this.value += myValue;
					this.focus();
				}
			})
		}
	});

	$('#easy_logging_smileys span').css({
		'display'  : 'inline-block',
		'overflow' : 'hidden',
		'width'    : '100px',
		'height'   : '18px',
		'cursor'   : 'pointer'
	}).click(function() {
		$(textarea_element).insertAtCursor( $(this).children('img').attr('alt') );
		$(textarea_element).focus();
		$(this).fadeOut(0);
		$(this).fadeIn(2000);
	});
	
	// Add code to label
	$('#easy_logging_smileys img').each(function( index ) {
      $( this ).after( " " + $( this ).attr('alt') );
  });

	// Hide the old "Insert smilie" link
	$('.PostLogList dt small.NoBolding a').hide();

})();
