// ==UserScript==
// @name            The West - Numeracja sektorów
// @description     Dodaje opcje pokazania numeracji sektorów podczas bitwy o fort
// @namespace       Esperiano / Przełożył Wojcieszy
// @author	        Esperiano / Przełożył Wojcieszy
// @include         http*://*.the-west.*/game.php*
// @version         0.0.1
// @exclude         http*://www.the-west.*
// @exclude         http*://forum.the-west.*
// @grant none
// ==/UserScript==
TWNS_inject = function(){

    if (document.getElementById('TWNS_js'))
    { alert("Script già installato"); return; }
    var TWNSjs = document.createElement('script');
    TWNSjs.setAttribute('type', 'text/javascript');
    TWNSjs.setAttribute('language', 'javascript');
    TWNSjs.setAttribute('id', 'TWNS_js');
    TWNSjs.innerHTML = "("+(function(){
        /*inizio corpo script*/

        var TWNS_api = TheWestApi.register('tw-namesector', 'TW - Name Sectors', '2.7', Game.version.toString(), 'Esperiano [aka Neper]');
        TWNS_api.setGui('Nome dos setores aí rapaziada (aparecem sobre os setores durante a batalha de forte - pra desativar é só clicar no botão em forma de olho, à esquerda da contagem de tempo). Arrumei os mapas pro modelo que a gente tá usando xD créditos da parte difícil é pro autor aí embaixo, claro. Valeu, ~lomexicano');
        var datafort= {};


        $('#windows').on('DOMNodeInserted', function(e) {
            var element = e.target;

            if($(element).is("div[class*='fortbattle-']")) {
                var NSfortID, NSfortType, NSman;
                NSfortID = $.grep(element.className.split(" "), function(v, i){
                    return v.indexOf('fortbattle-') === 0;
                }).join();
                NSman=NSfortID=NSfortID.split("-")[1];
                if (NSfortID.startsWith("m")) {NSfortID=NSfortID.substr(1);}   //manovra
                if (!datafort[NSfortID]){
                    Ajax.remoteCallMode('fort', 'display', {
                        fortid: NSfortID,
                    }, function (data) {
                        var fD = data.data;
                        datafort[NSfortID] = fD.type;
                    });}else{NSfortType=datafort[NSfortID];}

                setTimeout(function(){
                    var NSurl;
                    var NSlang = Game.locale.substr(0, 2);
                    switch (datafort[NSfortID]) {
                        case 0: //PEQUENO
						    if(NSlang=='pl') NSurl='https://i.imgur.com/pibDbhH.png';
                            else if(NSlang=='it') NSurl='https://media.innogamescdn.com/com_WEST_IT/ImmaginiScriptEsterni/piccolo.png';
                            else NSurl='https://media.innogamescdn.com/com_WEST_IT/ImmaginiScriptEsterni/small.png';
                            break;
                        case 2: //GRANDE
						    if(NSlang=='pl') NSurl='https://i.imgur.com/Jww2I4G.png';
                            else if(NSlang=='it') NSurl='https://media.innogamescdn.com/com_WEST_IT/ImmaginiScriptEsterni/medio.png';
                            else NSurl='https://media.innogamescdn.com/com_WEST_IT/ImmaginiScriptEsterni/big.png';
                            break;
                        default: //MEDIO
						    if(NSlang=='pl') NSurl='https://i.imgur.com/dxLWoGr.png';
                            else if(NSlang=='it') NSurl='https://media.innogamescdn.com/com_WEST_IT/ImmaginiScriptEsterni/grande.png';
                            else NSurl='https://media.innogamescdn.com/com_WEST_IT/ImmaginiScriptEsterni/medium.png';
                    }
                    if((!$('#NSectors'+NSman).length)&&($('.fortbattle-'+NSman+' .fort_battle_buttons').length)) $('.fortbattle-'+NSman+' .tw2gui_window_content_pane').append('<div id="NSectors'+NSman+'" class="fort_battle_battleground" style="background-image: url(&quot;'+NSurl+'&quot;); z-index: 1;pointer-events: none"></div>');
                    if(!$('.fortbattle-'+NSman+' .fort_NS').length) $('.fortbattle-'+NSman+' .fort_battle_buttons').append('<div class="fort_battle_button fort_NS" style="left: 105px;" onclick="javascript:$(\'#NSectors'+NSman+'\').toggle();"></div>');

                }, 2000);
            }
        });
        /*fine corpo script*/
    }
                           ).toString()+")();";
    document.body.appendChild(TWNSjs);
};

if (location.href.indexOf(".the-west.") != -1 && location.href.indexOf("game.php") != -1)
    setTimeout(TWNS_inject, 2000, false);