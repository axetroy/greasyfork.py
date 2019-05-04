// ==UserScript==
// @name       Przewalacz
// @namespace  http://mongla.net
// @version    2.0.2
// @description dfdsfgdsgfser
// @include    http://www.ufs.pt/forum/forumdisplay.php?*
// @include    http://www.ufs.pt/forum/search.php?searchid*
// @include    http://www.ufs.pt/forum/inlinemod.php*
// @exclude    http://www.ufs.pt/forum/inlinemod.php?forumid*
// @require   http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// ==/UserScript==

(function() {
  var css = "@import url(https://fonts.googleapis.com/css?family=Roboto:300,500&subset=latin-ext);@import url(https://fonts.googleapis.com/icon?family=Material+Icons);.ufs-mod{position:fixed;top:0;right:0;width:40px;height:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:all ease-out 0.1s}.width{width:390px;transition:all ease-in 0.1s}.ufs-mod_desc{position:relative;width:360px;height:100%;background:#1b1b1b;margin:0 0 0 30px;padding:0;box-shadow:0 14px 28px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.22);overflow-y:auto;transition:all ease-in 0.2s}.ufs-mod_container{box-sizing:border-box;display:flex;flex-flow:row wrap;justify-content:center;align-content:center;align-items:center;font-family:'Roboto';margin:30px auto;text-align:center}.ufs-mod_flex_wrap-first,.ufs-mod_flex_wrap{display:flex;width:90%;justify-content:center;background:#222}.ufs-mod_button{display:inline-block;position:relative;flex:1 auto;height:36px;width:auto;border-radius:2px;font-size:14px;font-weight:500;line-height:36px;text-align:center;text-decoration:none;text-transform:uppercase;overflow:hidden;vertical-align:middle;cursor:pointer;box-sizing:border-box;-webkit-appearance:none;background:#222;color:rgba(255,255,255,.47);transition:all ease-in-out .2s}.ufs-mod_button:hover{color:rgba(254,128,3,.57);transition:all ease-in-out 0.2s}.ufs-mod_dropdown_title{display:flex;justify-content:flex-end;align-content:flex-end;position:relative;color:rgba(254,128,3,.57);font-family:'Impact',sans-serif;font-size:18px;letter-spacing:3px;font-weight:400;text-transform:uppercase;line-height:36px;width:90%;overflow:hidden;cursor:pointer;transition:all ease-in-out .2s}.ufs-mod_dropdown_title:hover{color:rgba(255,255,255,.57);transition:all ease-in-out 0.2s}.ufs-mod_button-circle{position:absolute;bottom:20%;left:0;width:50px;height:50px;cursor:pointer;font-size:48px;color:rgba(255,255,255,.57);z-index:10}.material-ripple{position:relative;overflow:hidden;cursor:pointer;user-select:none}.material-ripple>span{position:relative;display:block;padding:15px 25px}.material-ink{position:absolute;background:#bdc3c7;border-radius:50%;transform:scale(0);opacity:.4}.material-ink.animate{animation:ripple ease-in 375ms}@keyframes ripple{100%{transform:scale(3,3);opacity:0}}";
  if (typeof GM_addStyle != "undefined") {
    GM_addStyle(css);
  } else if (typeof PRO_addStyle != "undefined") {
    PRO_addStyle(css);
  } else if (typeof addStyle != "undefined") {
    addStyle(css);
  } else {
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
      var node = document.createElement("style");
      node.type = "text/css";
      node.appendChild(document.createTextNode(css));
      heads[0].appendChild(node); 
    }
  }
})();


$(document).ready(function ()
   {
    $('<aside class="ufs-mod" id="ufs-mod"><div class="ufs-mod_button-circle ufs-mod_material_ripple material-icons">reply_all</div><section class="ufs-mod_desc"><div class="ufs-mod_container"><div class="ufs-mod_flex_wrap-first"><div class="ufs-mod_button ufs-mod_material_ripple" id="teleport">Przenieś</div></div></div></section></aside>').appendTo('body'); 
                 
$(".ufs-mod_material_ripple").click(function(event) {
	var surface = $(this);
	if (surface.find(".material-ink").length === 0) {
		surface.prepend("<div class='material-ink'></div>");
	}
	var ink = surface.find(".material-ink");
	ink.removeClass("animate");
	if (!ink.height() && !ink.width()) {
		var diameter = Math.max(surface.outerWidth(), surface.outerHeight());
		ink.css({ height: diameter, width: diameter });
	}
	var xPos = event.pageX - surface.offset().left - ink.width() / 2;
	var yPos = event.pageY - surface.offset().top - ink.height() / 2;
	var rippleColor = surface.css("color");
	ink
		.css({
			top: yPos + "px",
			left: xPos + "px",
			background: rippleColor
		})
		.addClass("animate");
});
$(".ufs-mod_dropdown_title").click(function() {
	$(this).nextUntil(".ufs-mod_dropdown_title").slideToggle();
});

	$(".ufs-mod_flex_wrap").hide();
$(".ufs-mod_button-circle").click(function() {
	$(".ufs-mod").toggleClass("width");
});
 
  $('#teleport').click(function() {
    teleport();
  });
  
 function teleport(){
  $("a[class='popupctrl']").first().click();
  $("input[value='movethread']").first().click();
  $("input[value='Dalej']").first().click();
}

});