// ==UserScript==
// @name         faucetHunt
// @version      1.4

// @description  Go to: https://faucethunt.com?ref=3052 - enter your bitcoin adress and start to earn every 5 minute automatically
// @author       Danne0 with MoneyBot24 ver1.1.1 Base
// @match        https://www.faucethunt.win/*
// @match        https://www.faucethunt.com/*
// @match        https://faucethunt.win/*
// @match        https://faucethunt.com/*
// @namespace https://greasyfork.org/users/167641
// ==/UserScript==
(function() {
    var adress = "";       //enter your bitcoin adress here
    var cadena = document.title;

  if(cadena.indexOf('Reached') != -1) {
    location.href ="https://faucethunt.com/";}
  else{
    console.log("la palabra no existe dentro de la cadena "+cadena);

    if($('.form-control').length === 1)
    {
        if(adress === "")
        {
            alert('enter your bitcoin adress here or open the script and enter your btc adress there');
        }
        else
        {
            $('.form-control').val(adress);
            setTimeout( function() {
                $('.btn.btn--primary.type--uppercase').click();
            }, 3000);
        }
        $('.form-control').focus();

    }
    else{
        setInterval( function(){
            if($('#timer').text() === "")
            {
                claimSatoshis();
            }

        },1000);
}
    }
})();