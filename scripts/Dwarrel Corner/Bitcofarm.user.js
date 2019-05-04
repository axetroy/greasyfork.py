// ==UserScript==
// @name         Bitcofarm
// @namespace    http://dwarrel.com/
// @version      1.0
// @description  Sign up: https://goo.gl/A3Q2ND - Login, click on view ads and the bot starts automatically
// @author       Dwarrel
// @match        http://bitcofarm.com/*
// ==/UserScript==

(function() {
    if(window.location.href.indexOf("/ads") > -1){
        setInterval( function() {
            if (document.hasFocus())
            {
                var o =   $('.hap').not('.disabled_pbx').parent().first();
                o.children().addClass('disabled_pbx');
                console.log(o.attr('href'));
                var win = window.open(o.attr('href'));
                if(!win)
                {
                    //Broswer blocks the Popups
                    alert('Please allow popups for this site and refresh the page');
                    setTimeout( function() {
                    }, 10000);
                }
                else
                {
                    win.focus();
                }
            }}, 1000);
    }
    else if(window.location.href.indexOf("/modules/adview.php") > -1)
    {
        $('#bitmedad').prepend('<a href="//goo.gl/GzdRVj/" target="_blank""><img src="//goo.gl/GEPQgG" height="100%"/></a>');
        setInterval( function(){
            if($('#desc').text() === 'Completed!' || $('#desc').text() === 'Already Clicked!')
            {
                window.close();
            }
            else if($('#desc').text().trim() === 'You already clicked to this ad!' || $('#desc').text().trim() === '¡Ya has hecho clic en este anuncio!')
            {
                window.close();
            }
        }, 1000);
    }
})();