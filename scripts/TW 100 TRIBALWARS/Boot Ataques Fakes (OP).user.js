// ==UserScript==
// @name           Boot Ataques Fakes (OP)
// @author         Marcos V.S. Marques
// @email          tribalwarsbr100@gmail.com
// @namespace      https://www.youtube.com/channel/UCIngQdlpQxocFDB4Vk6yERg
// @site           https://tribalwarsbr100.wixsite.com/tw100
// @instagram      https://www.instagram.com/tribalwarsbr/
// @version        2.1 (JUN/2017)
// @grant          Publico
// @description    Boot Ataques Fakes (OP)  (linguagem: javascript-ECMAscript5;)
// @Realiza        Ataques Fakes Ou Ataques Reais em coordenadas desejada
// @Opções         Avisso em tela de que todos Ataques já foram enviados, se apertar ok, os ataques continuarão a ser mandados, se apertar cancelar, será cancelado os ataques. 
// @Utilização     PRAÇA DE REUNIÃO
// @Necessario     Adicionar Todas Coordenadas Dentro Do Boot Logo Abaixo (Recomendamos Utilizar boot, coletor coordenadas no mapa, ferramenta gratuita, sem necessidade de nenhuma função premium para utilização, para obter basta ver o video Boot coletor coordenadas) 
// @include        https*://*.die-staemme.de/*
// @include        https*://*.staemme.ch/* 
// @include        https*://*.tribalwars.net/* 
// @include        https*://*.tribalwars.nl/* 
// @include        https*://*.plemiona.pl/* 
// @include        https*://*.tribalwars.se/* 
// @include        https*://*.tribalwars.com.br/* 
// @include        https*://*.tribalwars.com.pt/* 
// @include        https*://*.divokekmeny.cz/* 
// @include        https*://*.triburile.ro/* 
// @include        https*://*.voyna-plemyon.ru/* 
// @include        https*://*.fyletikesmaxes.gr/* 
// @include        https*://*.tribalwars.com/* 
// @include        https*://*.divoke-kmene.sk/* 
// @include        https*://*.klanhaboru.hu/* 
// @include        https*://*.tribalwars.dk/* 
// @include        https*://*.tribals.it/* 
// @include        https*://*.klanlar.org/* 
// @include        https*://*.guerretribale.fr/*
// @include        https*://*.guerrastribales.es/* 
// @include        https*://*.tribalwars.ae/* 
// @include        https*://*.tribalwars.co.uk/* 
// @include        https*://*.vojnaplemen.si/* 
// @include        https*://*.plemena.com/* 
// @include        https*://*.tribalwars.asia/* 
// @include        https*://*.tribalwars.works/* 
// @include        https*://*.tribalwars.us/*
// @icon           https://media.innogamescdn.com/com_DS_FR/Quickbar/oldaxe.png
// ==/UserScript==

/*TW100*/ /* LOGO IREMOS CRIAR NOSSA PLAYLIST NO YOUTUBE SOMENTE COM SCRIPT TAMPERMONKEY*/

// BOOT SAQUEADOR == PARA UTILIZAR PREECHA OS CAMPOS ABAIXO ↓ //

var todas_as_tropas = false;
//Lança,Espada,Barb,Arquei,Spy,Cl,Arque Cav,Cp,Arie,Cata,Palad,Nobre
var tropas =[0,0,3,0,0,0,0,0,0,0,0,0];//←Para escolher as tropas que irão realizar os ataques siga a sequência: 1°Lanceiro,2°Espadachin,3°Barbaro,4°Arqueiro,5°Explorador,6°Cavalaria Leve,7°Arqueiro a Cavalo,8°Cavalaria Pesada,9°Ariete,10°Catapulta,11°Paladino,12°Nobre - Adicione a quantidade de tropa desejada no campo corresponde a sequencia de tropa do qual ira utilizar.
var coords_ataque = '500|500 400|400 300|300';//← Adicione aqui as Coordenadas, a Coletagem pode ser manual, ou pode utilizar boot coletor coordenadas
var acao = "ataque"; //← Selecione aqui opção (ataque ou apoio) para indicar o comando a ser realizado.

/* SettingsAPI: ＣＡＮＡＬ ＤＯ ＹＯＵＴＵＢＥ ＴＷ 100
		-------------------------------------------------------------------------------------
		╔═══╗╔═══╗╔═╗─╔╗╔═══╗╔╗───     ╔═══╗╔═══╗     ╔╗──╔╗╔═══╗╔╗─╔╗╔════╗╔╗─╔╗╔══╗─╔═══╗     ╔════╗──────     ─╔╗─╔═══╗╔═══╗
║╔═╗║║╔═╗║║║╚╗║║║╔═╗║║║───     ╚╗╔╗║║╔═╗║     ║╚╗╔╝║║╔═╗║║║─║║║╔╗╔╗║║║─║║║╔╗║─║╔══╝     ║╔╗╔╗║──────     ╔╝║─║╔═╗║║╔═╗║
║║─╚╝║║─║║║╔╗╚╝║║║─║║║║───     ─║║║║║║─║║     ╚╗╚╝╔╝║║─║║║║─║║╚╝║║╚╝║║─║║║╚╝╚╗║╚══╗     ╚╝║║╚╝╔╗╔╗╔╗     ╚╗║─║║║║║║║║║║
║║─╔╗║╚═╝║║║╚╗║║║╚═╝║║║─╔╗     ─║║║║║║─║║     ─╚╗╔╝─║║─║║║║─║║──║║──║║─║║║╔═╗║║╔══╝     ──║║──║╚╝╚╝║     ─║║─║║║║║║║║║║
║╚═╝║║╔═╗║║║─║║║║╔═╗║║╚═╝║     ╔╝╚╝║║╚═╝║     ──║║──║╚═╝║║╚═╝║──║║──║╚═╝║║╚═╝║║╚══╗     ──║║──╚╗╔╗╔╝     ╔╝╚╗║╚═╝║║╚═╝║
╚═══╝╚╝─╚╝╚╝─╚═╝╚╝─╚╝╚═══╝     ╚═══╝╚═══╝     ──╚╝──╚═══╝╚═══╝──╚╝──╚═══╝╚═══╝╚═══╝     ──╚╝───╚╝╚╝─     ╚══╝╚═══╝╚═══╝
╔════╗──────     ─╔╗─╔═══╗╔═══╗     
║╔╗╔╗║──────     ╔╝║─║╔═╗║║╔═╗║     
╚╝║║╚╝╔╗╔╗╔╗     ╚╗║─║║║║║║║║║║     
──║║──║╚╝╚╝║     ─║║─║║║║║║║║║║     
──║║──╚╗╔╗╔╝     ╔╝╚╗║╚═╝║║╚═╝║     
──╚╝───╚╝╚╝─     ╚══╝╚═══╝╚═══╝     
███۞███████ ]▄▄▄▄▄▄▄▄▄▄▄▄▃
▂▄▅█████████▅▄▃▂
I███████████████████].
◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤...


/*	Changelog versão 2.3
*        Equipe do Canal Youtube TW 100 Foi Realizado a Mais Recente Atualização Para Implatação da universalização do conteudo do canal, assim tornando nosso conteudo cada vez mais usual e presente em todos servidores de tribalwars.
*        Equipe do Canal Youtube TW 100 Solicita humildemente a colaboração dos usuarios dos conteudos abragidos no canal com likes, curtidas, comentarios nos videos, e com compartilhamento dos videos, isso era proporcionar um crescimen to do canal, e com isso cada vez  mais iremos trazer mais conteudo.
*        Equipe do Canal Youtube TW 100 se reserva ao direito de possuir a posse do codigo-fonte  do script, quaisquer modificação deve ser solicitado via email, segundos regras da Licença Pública Geral GNU 
*        Equipe do Canal Youtube TW 100 não se responsabiliza por eventuais danos causados pela utilização do script
*		 Equipe do Canal Youtube TW 100 no dia 25/06/2017 v2.0i primeira versão para atualização TW 8.89
*        Equipe do Canal Youtube TW 100 Script em desenvolvimento, ao longo do tempo, de acordo com o tempo disponivel iremos adicionar mais funções
*        Equipe do Canal Youtube TW 100 promove a canpanha "Software livre não e virus nem boot" abraça e se solidariza com os scripts de tampermonkey voltados para o game tribal wars, do qual as equipes inesperientes de suporte, sem conhecimento, e sem saber a historia dos primordios do game, impõe um pensamento de que os script de tampermonkey são proibidos. Muitas das melhorias no game, que se deu atraves de scrips de tampermonkey, feitos de players para players, Alem do qual esse pensamento foi uma forma da da grande empresa tutora do game promover seus ganhos com recursos pagos, e assim prejudicando os jogadores que não utiliza de dinheiro para jogar, *EQUIPE TW 100 DEIXA CLARO, QUE NÃO E PRECISO TER FUNÇÕES PAGAS PARA USUFLUIR DO GAME, TEMOS A MISSÃO DE TRAZER UMA INGUALAÇÃO DO QUAL OS PLAYERS QUE NÃO USUFLEM DE RECURSOS PREMIUNS TENHA A SUA DIPONIBILIDADE OS MESMO RECURSOS DOS QUE TEM*/if(game_data.screen!='place'){UI.InfoMessage('Script deve ser usado na praça de reunião.',3000,true);end()}if(typeof cookie_atk==='undefined')var cookie_atk="tw_br_attack";if(typeof aviso==='undefined')var aviso=true;if(typeof acao==='undefined')var acao="ataque";if(typeof todas_as_tropas==='undefined')var todas_as_tropas=false;if(document.URL.search(/try=confirm/)===-1){if(typeof coords_ataque!=='undefined'){function i(o,v){$("input[name="+o+"]").attr("value",v)}if($("input[name=support]").length>0){coords_ataque=coords_ataque.split(" ");n=$.cookie(cookie_atk);n==null?n=0:n=parseInt(n);if(n>=coords_ataque.length)n=aviso?(confirm('último ataque já foi enviado, continuar?')?0:-1):0;if(n>=0){coords_ataque=coords_ataque[n].split("|");i("x",coords_ataque[0]);i("y",coords_ataque[1]);$.cookie(cookie_atk,n+1,{expires:10})}}}var i;var nomes=['spear','sword','axe','archer','spy','light','marcher','heavy','ram','catapult','knight','snob'];if(todas_as_tropas==false){for(i=0;i<tropas.length;i++){if(tropas[i]>0){var e=$('input#unit_input_'+nomes[i]);if(e[0]){insertUnit(document.forms[0][nomes[i]],tropas[i])}}}}else{document.getElementById('selectAllUnits').click()}if(acao=="ataque")document.forms[0].attack.click();if(acao=="apoio")document.forms[0].support.click()}void(0);

