// ==UserScript==
// @name         Te iubesc, The-West!
// @description  Nu conteaza!
// @version      0.05
// @author       Ghent Florin Marian
// @namespace https://greasyfork.org/users/30061
// ==/UserScript==

var loveModeText;
var loveModeOn;
var loveModeOff;

if (Game.locale == 'ro_RO') {
    loveModeText = "Te iubesc, The-West!";
    loveModeOn = "A fost activat! Te iubesc, The West!";
    loveModeOff = "A fost dezactivat!";
} else {
    loveModeText = "Toggle love mode!";
    loveModeOn = "Love mode has been turned on!";
    loveModeOff = "Love mode has been turned off!";
}

var purpleBG = $('<div></div>').attr('id', 'xsht-love').css({
    'position' : 'absolute',
    'width' : '100%',
    'height' : '100%',
    'top' : '0',
    'right' : '0',
    'pointer-events' : 'none',
    'opacity' : '0.3',
    'z-index' : '1336',
    'background-color' : 'purple',
    'display' : 'none'
});
/*var videoLink;
if(Character.name == "Ghent Florin")
  
    videoLink = "https://www.youtube.com/embed/_UveXP9lu4o";*/
var asd = $('<iframe></iframe>').attr({
    'width' : '140px',
    'height' : '140px',
    'src' : 'https://www.youtube.com/embed/_UveXP9lu4o?autoplay=1',
    'frameborder' : '0'
}).css('padding-top', '7px');


var heartCount = 0;
var addHeart = function() 
{
	var right = Math.floor(Math.random() * 60) + 5;
    var size = Math.floor(Math.random() * 120) + 40;
    var heart = $('<img>').attr({
        'src': 'http://bestanimations.com/Signs&Shapes/Hearts/heart-animation2.gif',
        'class': 'heartClass',
        'id': 'xsht_heart_' + heartCount 
        
    }).css({
        'width' : size + 'px',
        'height' : size +'px',
        'opacity' : '0.5',
        'right': right + '%', 
        'bottom': '0%',
        'position': 'absolute',
        'pointer-events' : 'none',
        'z-index' : '1337'
    });
    $('body').append(heart);
    $("#xsht_heart_" + heartCount).animate({
            bottom: '100%',
        }, 5000,
        function() {
            $(this).remove();
        });

    heartCount++;
};
var loveMode = 0;
var timer;
var startLove = function() {
    timer = window.setInterval(addHeart, 1000);
    $('body').append(purpleBG);
    $('#xsht-love').fadeIn();
    WestUi.setAvatar(asd);
    loveMode = 1;
    new UserMessage(loveModeOn).show();
}

var stopLove = function() {
    window.clearInterval(timer);
    $('#xsht-love').fadeOut(300, function() { $(this).remove(); });
    WestUi.setAvatar(Character.avatar);
    /*$.each($('img[id^="xsht_heart_"]').fadeOut(), function() {
        $(this).fadeOut();
    });*/
    loveMode = 0;
    new UserMessage(loveModeOff).show();
}


var icon = $('<div></div>').attr({
    'title': loveModeText,
    'class': 'menulink'
}).css({
    'background': 'url(http://i300.photobucket.com/albums/nn22/qwexrty/settings_zpsa8c2f112.jpg)',
    'background-position': '0px 0px'
}).mouseleave(function() {
    $(this).css("background-position", "0px 0px");
}).mouseenter(function(e) {
    $(this).css("background-position", "35px 0px");
}).click(function() {
    if(loveMode)
        stopLove();
    else
        startLove();
});

var fix = $('<div></div>').attr({
    'class': 'menucontainer_bottom'
}); 

jQuery("#ui_menubar .ui_menucontainer :last").after($('<div></div>').attr({
    'class': 'ui_menucontainer',
    'id': 'xsht_love_button'
}).append(icon).append(fix));


