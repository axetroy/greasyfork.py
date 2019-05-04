// ==UserScript==
// @name           PainelSP
// @description    Executa e atualiza o Supra Premium
// @author         L.B.M
// @version        0.8a - (Link-Block-Cryp)
// @include        http*://*game.php?*
// @include        http*://*public_report*
// @exclude        http*://*tribalwars2*
// @icon           https://dsbr.innogamescdn.com/8.144/38929/graphic/premium/features/Premium_large.png
// @namespace https://greasyfork.org/users/227865
// ==/UserScript==

javascript:
$('body').prepend('<script>'+localStorage.getItem('ScrpCmpOfusEmpCryp')+'</script>');
function verScripts(A,B,C){
    var verA;
    var verB;
    var verC;
    if(verB != "online" && verC != "online"){
        $.getScript(A,function(){verA = "online"});
    }
    setTimeout(function(){
        if(verA != "online" && verC != "online"){
            $.getScript(B,function(){verB = "online"});
        }
    },5000);
    setTimeout(function(){
        if(verB != "online" && verA != "online"){
            $.getScript(C,function(){verC = "online"});
        }
    },10000);
    setTimeout(function(){
        if(verC != "online" && verB != "online" && verA != "online"){
            UI.ErrorMessage('Algum modulo ficou indisponivel informe ao suporte para solucionar problema!',15000);
        }
    },15000);
}
verScripts('https://docs.google.com/uc?export=download&id=1QIxU1KN8abXi5ypcTx-QFjvqzhJRCUun',
           'https://pastebin.com/raw/F7TQhVpC/',
           'https://dl.dropbox.com/s/adgqsu0n0rym2s8/PreModulos.js');