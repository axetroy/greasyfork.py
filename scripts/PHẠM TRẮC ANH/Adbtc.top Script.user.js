// ==UserScript==
// @icon         https://adbtc.top/favicon.ico
// @name         Adbtc.top Script
// @namespace    anhpham
// @description  Register https://ref.adbtc.top/45112 - Login and start to earn bitcoins
// @version      1.4.1
// @author       MoneyBot
// @match        https://adbtc.top/surf/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// ==/UserScript==

(function() {
    if ((document.documentElement.textContent || document.documentElement.innerText).indexOf('Please solve the mathematical expression') == -1)
    {
        setTimeout( function(){
            $('.valign-wrapper.btn')[0].click();
            console.log('open');
        }, 1000);

        setInterval( function(){
            var title = $(document).find("title").text();
            if(title.startsWith(" You earned"))

            {
                location.href = location.href;
            }
        }, 1000);
    }
    else
    {
        load();
        alert('Solve the mathematical expression');
        $('#captcha').focus();
    }
    
})();
function load() {
    $('.col.s12.m9').prepend('<p><a href="//moneybot24.com/" target="_blank""><img src="//goo.gl/ZsHNQs" width="60%" height="60%"/></a></p>');
}
