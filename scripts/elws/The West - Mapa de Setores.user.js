// ==UserScript==
// @name            The West - Mapa de Setores
// @name:it         The West - Mapa de Setores
// @description     Show name of the sectors during fort battle
// @description:it  Visualiza nomes dos setores na batalha
// @namespace       Esperiano
// @author	        Esperiano
// @include         https://*.the-west.*.*/game.php*
// @include         http*://*.the-west.*/game.php*
// @version         0.0.7
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
        TWNS_api.setGui('Nome settori in battaglia');
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
                        case 0: //PICCOLO
						    if(NSlang=='pt') NSurl='https://i.imgur.com/6byIlnU.png';
                            else if(NSlang=='it') NSurl='https://media.innogamescdn.com/com_WEST_IT/ImmaginiScriptEsterni/piccolo.png';
                            else NSurl='https://media.innogamescdn.com/com_WEST_IT/ImmaginiScriptEsterni/small.png';
                            break;
                        case 2: //GRANDE
						    if(NSlang=='pt') NSurl='https://i.imgur.com/5ptWsxJ.png';
                            else if(NSlang=='it') NSurl='https://media.innogamescdn.com/com_WEST_IT/ImmaginiScriptEsterni/medio.png';
                            else NSurl='https://media.innogamescdn.com/com_WEST_IT/ImmaginiScriptEsterni/big.png';
                            break;
                        default: //MEDIO
						    if(NSlang=='pt') NSurl='https://i.imgur.com/bLFtZER.png';
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