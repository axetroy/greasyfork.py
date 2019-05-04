// ==UserScript==
// @name         PTC Quick Registration Tool
// @namespace    http://all1tool.wordpress.com
// @version      1.0
// @description  Install it for quick registration, Set your data in the script. Enjoy!!
// @author       Ronald DC
// @match        *://*/*
// ==/UserScript==

(function() {

    var username = "CHANGEUSERNAME";           //set username
    var fullname = "JUAN DELA CRUZ";          // set full name
    var mail = "YOUREMAIL@EMAIL.COM";              // set mail
    var password = "CHANGEPASSWORD";          // set password


    if(window.location.href.indexOf('register') > -1)
    {
        $('*[name*="username"]').val(username);
        $('*[name*="fullname"]').val(fullname);
        $('*[name*="mail"]').val(mail);
        $('*[name*="password"]').val(password);
        $('*[type*="checkbox"]').attr('checked','checked');
        if($('*[name*="ref"]').val() === "" && $('*[name*="ref"]').length === 1)
        {
            $('*[name*="ref"]').val('wildlynx09');
        }
        if( $('*[name*="captcha"]').length > 0)
        {
            setTimeout( function() {
                $('*[name*="captcha"]').focus();
            }, 2000);}
        else if( $('#adcopy_response').length > 0)
        {
            setTimeout( function() {
                $('#adcopy_response').select();
                $('#adcopy_response').focus();
                $('#adcopy_response').attr('autocomplete', 'on');
            }, 3000);
        }
        else
        {
            $('*[type*="submit"]').click();
        }
    }
})();