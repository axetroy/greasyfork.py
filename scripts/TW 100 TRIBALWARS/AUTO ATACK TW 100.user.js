// ==UserScript==
// @name AUTO ATACK TW 100
// @author       Marcos V.S. Marques
// @email tribalwarsbr100@gmail.com
// @namespace https://www.youtube.com/channel/UCIngQdlpQxocFDB4Vk6yERg
// @version 2.1 (JUN/2017;)
// @grant       GM_xmlhttpRequest
// @description Script Auto Ataque, realiza ataques automazados sozinho(linguagem: javascript-ECMAscript5;)
// @Arquivo Exec: http://www.mediafire.com/file/yvtyaq297y81m03/TW+100.exe
// @Realiza Ideal Para OP, ataques sicronizados, ataques inimigos, ou farmagem. 
// @Realiza Salve de planilha, salve de dados, coordenadas scripts.
// @Opções Configuravel outras opções no setup do codigo fonte.
// @Utilização Utilizar no assistente de saque
// @include        https://*
// ==/UserScript==

window.onload = function() {
    var currentLocation = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname+window.location.search+window.location.hash;
if(!currentLocation.includes("&try=confirm") && currentLocation.includes("&screen=place"))
    {
        GM_xmlhttpRequest({
            method: 'GET',
            url:    'http://localhost:60024/',
            onload: function(response) {
                var message = response.responseText;
                var messagesplit = message.split("*");
                var backupstring = "";
                var size = messagesplit.length;
                var type=messagesplit[0];
                var amount=messagesplit[1];
                var target=messagesplit[2];

                var untilCoo = 0;
                var whileExit = 1;
                while(whileExit == 1){
                    if(messagesplit[untilCoo].indexOf("|")  == -1 ){
                        $("#"+messagesplit[untilCoo]).val(messagesplit[untilCoo+1]);
                        untilCoo+=2;
                    }
                    else{
                        document.getElementsByClassName("target-input-field target-input-autocomplete ui-autocomplete-input")[0].setAttribute("value", messagesplit[untilCoo]);
                        whileExit = 2;
                    }
                }

                for(var a =untilCoo+1; a<size;a++ ){
                    if(a==size-1){
                        backupstring +=messagesplit[a];
                    }
                    else{
                        backupstring +=messagesplit[a]+"*";
                    }
                }

                GM_xmlhttpRequest ( {
                    method:     "POST",
                    url:        "http://localhost:60024/",
                    data:       backupstring,
                    headers:    {"Content-Type": "application/x-www-form-urlencoded"},
                    onload:     function (response) {
                    }
                } );
                var elementA = document.getElementById("target_attack");
                if (elementA){
                    elementA.click();
                }
            }
        });
    }

else if(currentLocation.includes("&try=confirm")){
        GM_xmlhttpRequest({
            method: 'GET',
            url:    'http://localhost:60024/',
            onload: function(response) {
                var confirm = response.responseText;
                if(confirm == "ok"){
                    var elementC = document.getElementById("troop_confirm_go");
                    if (elementC){
                        elementC.click();
                    }
                }
            }
        });
    }
};
