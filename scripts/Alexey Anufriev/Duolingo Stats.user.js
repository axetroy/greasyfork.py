// ==UserScript==
// @name         Duolingo Stats
// @namespace    alexeyanufriev.pro
// @version      0.8
// @description  Display additional information about your language level in language menu
// @author       ICE
// @match        https://www.duolingo.com/*
// @grant        none
// ==/UserScript==

var calendarIcon = "<img width='20' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAFFUlEQVR42pVWDWxTVRQ+573Xt3Zr69pRGThhJSAKbCIhMdHotjJgakyILoyfuoyBEjCEaIQM2Bgw5iZBE6JCIGAigmGGSDDidH+CiQlERMgWTVyyThHHWNaOtR17fX3vet597YabQ7ht2tN37znfOd/5uUW4xzpQMNm7xGsvcVpFn4A4DxE8xnPGoE9nrCOiaG0tgUjDm229gYls4H89PFKYmf3iTGe9RRaKUUQBBQEBkdFp4zyjF0dhuo5MY5oa00+3BMIVZd/1dP8vwBW/1z81XT4kWgQ7SgKAIPBTYw+y5IeuA4vroKl6pHcwtuHJ44ETEwL8tmbG1gyHpR4tIqCY8No4RJLhcPJ7RDn52/jQKBpVYwMRteKxT7r2jQP4adV0/7QM63FBNowbLiMmHU2cY3d9w5jnBmUGXUyPadAzoJTO/6z7xAjAR/me7FfnpLeLVtFOnidsm8ux9jCEj63nspxbBCjbQLl8ZtyeicEjAW1YizR2DuaUN/d2c0t/rJtxypYmLSdqOC3y3EUgzykwUspScpaA0t7EPRU9XkRBYvHeTm6Q9pD2OGnq7z+icq3RpEvVcDgab5h2tGsF1j3j9q6Z7+4UU4h0etNZ5trWBJEvKsm8zhyr90P45DscQJ7rQ7RYmXL1GzOC1fuR9phBhH1lPYZqF5l0UT40RdMaOgZm4ZWVWRVZGdY6NLhPUJO+rRkG6habXj5dDMql01wWp8wGkGTQrreP27tbh1NFuegbULbhn+XTm6xplkJekomkuXa0QKi28IGS7NrROhoBPafSZcNRtQX/Wjv9bznVkgki7yJOkbuyFUJ7F3HZsYoqTothuKGSOZbXIBBF4ZNbwP5KFQiOSTj46WZulHQwuNcE4HaoomJD6k28sXaaakmlwhfuAqhqg1CNj8tpL71NACpGv/2QpS7dhCjJLHrufUgtXA+Y5sLo2XoToKoNgzW+UQCaJeoQZftGuQEgSTQQRuJ27fweQnsKuGxbvJG6NQ53Wo+Azfc65cACd5oOgjWvDITUh2Co8cA4HZ4HnYE6FI/j9bJHiSIpkzeX0ZuUInf1eQjuLuCys/xjGgVE0fG3mOO1DxBlKxs8tpGqpg4EpwcHD68zI6g+j8Hd+SzZ49QPRFH8Jgb8jzTZ7JbFgiiMoLt3EcCufLO5niri8yZ2rYkajapElCD2SyPI83yAKamg/Pz1OB1j6dRwwxG1GS8um1yR7bG+a1QRlSkanZKx+wIEq/O57N7eSBEoGNq3jLm2nKEIbCxYWwTpmz8H0T0V+6tNr0mH5LzE2DCrqCeobMfqBU7vG7lOajSJxrI5fzL2XID+nXkPVKakg6TDEvxTo8W1E7+GZ/HMdpZMOWW3W0rMKOhwzQ/QX/U8PMhK6jCj9Gh8R6Nqw8xTPSs4QN1CZ7b/CUe7JUW0U7kyZ+l7ID/+LPKWvM8I1MBVvH10EwOjehQt+mVnJGfzxdvdI7XZ9oLHP9uTYo5rHDOK72dcg3k3GOO6q18pfe5c3+i4Tq5LLz+8Ncsl1wuUDhDgX2P7XosHqhvtQom9HatYePbW+AsnuVqLJvlnuVMOSTJdmQK/h8G82uhGMapslDZT39ggWuIxPRoIxTbkNfZNfGUmV+0CZ3ax11afZpWKBaPHjVBwDEWMe456nGlRRTv9VfdQxZbLg91jbd2Tg8pcu3dplrUkM03ySSLOIyT+t4XGTF9cYx23hrS25hvDDbuuhif82/IPxjVyIwSgwoIAAAAASUVORK5CYII='/>";
var scoreIcon = "<img width='20' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADS0lEQVR42qVWW0hUURTd585Y6jCZjo8ZMtEYFSXToo8ekJFfGpQIgfon9lNRhNRAUPawj7DAQKqvDKLAHpj20PwxTIM+zEfvHFFEZ3R8pDnOjI7OnPYe5g7XeVsXNmfffe/Z66y19zn3MghynWzuTcehFO0QWjZavPvRDNp3tA60xrvFu/SBcrAAibWMsVp0j3DOBfQ97+E9p3txxJAD3Zfo6u4c3TkUEuBUS18FTqjHCQppwiAAYsyK7mkEeRAQAFd+EYdr8H9XNUp23QcAk1fgKu5TzM/qwmEg9StFJkzUHId+f7L8IwDJlUc1EQGacCgWkxRlqqFt0EQvh9RDsUEOabEKsNpXYHjOKn3UjFKVMGpFRPwh7Zbawu1c1/Y1LAb7UlRQlpvMe4YN7F73T4jarJJ2VxbDrrlEhZUmWg9AYUYS7EiI5v0jRvaoqx82KmO4MkGNTwR6t5oYvMN5+VJuN4ty4Hzrl5DyaJSRoDuQATXPO+CXcdoTj4iKhpikZGAyWScxMGEsMRwGkXIBlladVBgK8LP7tUw/ZoSGjh6fggvyCIhRJ08RA4f3fvDHICtxE1TuTgXDgg2efB4HrUoBBWlxcO5hK1iXV/wyFAQZJwYEIARjsDdFxY7lbIHH7/tAE6vkBTlaRtul7nUX6x0xBmtrZ0iJDmeqeX6qit1+8wEGRidcCbYlxbEMTTxvH9AH2gciwDQBUJEPegNcePuNledthfTYSH6juZONTs+vZ6OJAJ1UA2rTq941uNWlh7LsRKh71Q0zZkvIjvJ3Ic4VdqKpJ12QyXw2WvugidltFrBbLdyrCcR77nA6mXuz84k5MxMldOdxUm+4JqJMTRgvFgH2aBRcbrcxaUJEx65gawAkwHxsZp591I9JAV48rSovcZ9Fn/CwY/3oRovLtP35DZbZqbDOIz/S2HDIRYChoMe13boICyYD5yiFR58QRXYzO47JG8BLW5LK9cGhVYsTVu3LfGFynDlW7OEAUPLLmLzGw8abHjHBoV4qFzIA85QBli2LwWShs/qMuPKAAGJN8DRZ89EnVlQTrA2HtV896pYWNB1p7gMcrFjUwkwQSjGP57dlyTwP5unJWdTF9duCaI3PqsoHA+X4C8ulQJmmtbf4AAAAAElFTkSuQmCC'/>";
var levelUpIcon = "<img width='20' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADf0lEQVR42q1WaWxMURT+zkyXYUjaWgYlltTSii0NQwwa2lQkBLVNE22K+GULUoLaWj80fpT+0YSWiJDaSbSxpqqYNhQJqproD8pQJjRVM6Zznfvaqb6Z9yqWm5w7591z53znO/ecdx+hq+GwDed5GctMljiW3u2WRpbnLLdYTsN695WeC9JxHAOiXNbmQQgD67/2CSGUZ/8v0Mr6ZdYzMam87vcAldMy+A/5/AezyqE+gH/tG2trGaRIH8Bh28HzXvzb2MkpywkGcNgyOIqjylpwdIo+xTwa8Alxv+W57p52faWfCXXkHHismZZ2fYRpEByxBQqAtWoV1YY2dAUg0zVenokf4DzP8/U49zSa8SDuMN643inPA7tbMPneSjT18uqViRwXOVULSSlFoheqaukUEYHEuZhsGhsyDNaryxWrY84Jeup6JVIqt5CIDgOMpMVGVlcscdVkKQerk9OsAeliiyWVppZm4ImrVrGNixpJFclFYv+zY5Rdc4QpmQTCjVrp2ikZ3GZ1hhbHuZE2XIjJQWr5NhTXX1PZlg5JxknbPiwo24QrDXeAASbAbAx0USYZOFnpG8hgZLfB9CD2MApqzoqt1Yc0+2B//HpaPTwFk0vSxcuv9QQLpysitLOfD5JBa2A/yEN1xBUgEmZkPjyI+uYGlDsfqUKbbonHYHN/5Mavh8vTBGtJGpp+NAORoRxuWEc4koEEMHRmMLXHGHFu6F5+IIQbwsT3Vjf1O5ukYvB+0XVhMoaT2+eRSyKlbDNVfHzSZu8RQkrKDPDppggtbHvbAvug2SJv4maynElUATgX3xAbqg7QqfpSzb7hyIBo0wcJIA85QXOTxwd7aILIG7vxzwHkMMpDdthkme7R6xZ7ryTkRa+BpXiWat255CYYAKdel+h2GgPtJtznRjPqN5o9KlEwwN8w8LHEti1WTjvPhvn/GeAC0qoXql92QPfgFCXi+NDtqP5co1qfEDUK6RVZnKJSrdS08DyOAep++7ruExIhVoQkkcHbsVXIPT7hE4V1l+ij2xV4KUn7KnZeiMAG41S1XTi8X0XZy/3y5jvg9nV1o1G7813sPLuDTBA9yQTID0qXPLK3DNLs1asYeQes80euD+A/E61LXzJ77xb44qWAarnEkilzHoSLroYsYQN/thD9+myRII2eRnz68QLKZ4s4jbTHtXoufgIaqfpSzc7SGQAAAABJRU5ErkJggg=='/>";

// add stats on page load
$(document).ready(function() {
    addStats();
});

// add stats on language change
$(document).ajaxComplete(function(event, request, settings){
    if (settings.url.indexOf("switch_language") > -1) {
        addStats();
    }
});

// add stats on URL change
$(window.location).bind("change", function( objEvent, objData ){
    addStats();   
});

function addStats() {
    $.get("https://www.duolingo.com/users/" + _rollbarConfig.payload.person.username, function(data) {
        var languages = data.languages;
        
        $("span[type='extra-info']").remove();
        languages.forEach(function(lang) {
            var menuItem = $(document.body).find('li[data-value="' + lang.language + '"].language-choice').find('a');
            
            var infoBlock = $("<span type='extra-info'></span>");
            infoBlock.append("<br /><span style='position:absolute;top:38px;left:20px;'>" + calendarIcon + "</span>Streak: <span class='gray'>" + lang.streak + " day(s)</span><br />");
            infoBlock.append("<span style='position:absolute;top:68px;left:20px;'>" + scoreIcon + "</span>Points: <span class='gray'>" + lang.points + " pts</span><br />");
            infoBlock.append("<span style='position:absolute;top:98px;left:20px;'>" + levelUpIcon + "</span>To Next Level: <span class='gray'>" + lang.to_next_level + " pts</span><br />");
            
            menuItem.append(infoBlock);
        });
    });
    
    var goldenItems = $('.skill-icon.small.gold').length;
    var lockedItems = $('.skill-icon.small.locked').length;
    var totalItems = $('.skill-icon.small').length;
    
    var goldenPercent = goldenItems * 100 / totalItems;
    goldenPercent = goldenPercent.toFixed(2);
    
    var completedItems = totalItems - lockedItems;
    var completedPercent = completedItems * 100 / totalItems;
    completedPercent = completedPercent.toFixed(2);
    
    $("span[type='language-progress']").remove();
    var progressBlock = $("<span type='language-progress'></span>");
    progressBlock.append('<br />Golden: ' + goldenItems + ' of ' + totalItems + ' (' + goldenPercent + '%)');
    progressBlock.append('<br />Unlocked: ' + completedItems + ' of ' + totalItems + ' (' + completedPercent + '%)');
    
    var completed = 0;
    var nonCompleted = 0;
    $("span.lessons-left").each(function(index) {
        var value = $(this).text();
        if (value) {
            var values = value.split("/");
            completed += parseInt(values[0]);
            nonCompleted += parseInt(values[1]);
        }
    });
    progressBlock.append('<br />Lessons left: ' + (nonCompleted - completed) + '</span>');
    
    progressBlock.appendTo($('.level-text'));
}

// custom URL change handler
(function($){
	var strLocation = window.location.href;
	var strPrevLocation = "";
	var intervalTime = 100;

	var pollLocation = function(){
		if (strLocation != window.location.href){

			strPrevLocation = strLocation;
			strLocation = window.location.href;

			$(window.location).trigger("change", {
				currentHref: strLocation,
				previousHref: strPrevLocation
			});
		}
	};

	setInterval(pollLocation, intervalTime);
})(jQuery);