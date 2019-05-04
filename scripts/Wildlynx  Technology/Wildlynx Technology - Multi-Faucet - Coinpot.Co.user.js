// ==UserScript==
// @name         Wildlynx Technology - Multi-Faucet - Coinpot.Co
// @namespace    https://wildlynxtechnology.wordpress.com/
// @namespace    https://wildbitsio.blogspot.com/
// @version      1.0.1
// @description  Powerful Tool for miners. Automate your mining capability. Save TIME!!
// @author       Ronald DC
// @match        http://coinpot.win/*
// @match        https://coinpot.win/*
// ==/UserScript==

load();

(function() {
    var i = setInterval( function() {

        var bitcore = true;
        var b3coin = false;
        var dogecoin = true;
        var dashcoin = true;
        var blackcoin = true;
        var primecoin = true;
        var litecoin = true;
        var ethereum = true;
        var peercoin = true; var potcoin = true;

        var faucets = $("td:contains('Ready to claim')");

        if(!bitcore || !b3coin || !dogecoin || !dashcoin || !blackcoin || !primecoin || !litecoin || !ethereum || !peercoin || !potcoin)
        {
            faucets = faucets.parent();

            if(!bitcore)
            {
                faucets.not("[onclick*=bitcore]");
            }
            if(!b3coin)
            {
                faucets = faucets.not("[onclick*=b3coin]");
            }
            if(!dogecoin)
            {
                faucets = faucets.not("[onclick*=doge]");
            }
            if(!dashcoin)
            {
                faucets = faucets.not("[onclick*=dash]");
            }
            if(!blackcoin)
            {
                faucets = faucets.not("[onclick*=black]");
            }
            if(!primecoin)
            {
                faucets = faucets.not("[onclick*=prime]");
            }
            if(!litecoin)
            {
                faucets = faucets.not("[onclick*=lite]");
            }
            if(!peercoin)
            {
                faucets = faucets.not("[onclick*=peer]");
            }
            if(!potcoin)
            {
                faucets = faucets.not("[onclick*=pot]");
            }
            if(!ethereum)
            {
                faucets = faucets.not("[onclick*=ethereum]");
            }
        }

        if(faucets.length !== 0)
        {
            faucets[0].click();
        }
    }, 1000);
    setInterval( function(){
        var el =  $('#adcopy_response');
        var a =  $('.alert').length;
        if(a > 0)
        {
                if(document.location.href.indexOf('withdraw') > -1)
                    location.href = "http://coinpot.win/settings/withdraw/";
                if(document.location.href.indexOf('faucet') > -1)
                    location.href = "http://coinpot.win/faucet/";
        }
        else  if(el.length > -1)
        {
            setTimeout( function() {
                $('#adcopy_response').focus();
                $('#adcopy_response').attr('autocomplete', 'on');

            }, 2000);
        }
    }, 1000);
})();

function load() {
    $('.row.m-t-25.p-0 ').prepend('<p><a href="//linkshrink.net/7mvEwp" target="_blank" rel="noopener"><img style="display: block; margin-left: auto; margin-right: auto;" src="//https://wildlynxtechnology.files.wordpress.com/2018/03/dabots.gif?w=1100" /></a></p>');}