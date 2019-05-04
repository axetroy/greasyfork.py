// ==UserScript==
// @name           Grafico Estatistica Evolução Tribal Wars BR
// @author         Marcos V.S. Marques
// @email          tribalwarsbr100@gmail.com
// @namespace      https://www.youtube.com/channel/UCIngQdlpQxocFDB4Vk6yERg
// @site           https://tribalwarsbr100.wixsite.com/tw100
// @instagram      https://www.instagram.com/tribalwarsbr/
// @version        2.2 (JUN/2017)
// @grant          Publico
// @description    Grafico Estatistica Evolução Tribal Wars BR (linguagem: javascript-ECMAscript5;)
// @Realiza        Confecção de Grafico e Estatistica da tribo e do player no game.
// @Opções         Canal Tw 100 deixa codigo livre, para possiveis alterações e modificações e melhoramentos (funcionamento em outros servidores de tribal wars, somente alterando opção "br" e opções de include, para servidor de sua escolha.
// @Utilização     Utilizar no perfil da tribo, ou perfil do jogador
// @include        http*://*.tribalwars.com.br/game.php?*screen=info_player*
// @include        http*://*.tribalwars.com.br/game.php?*screen=info_ally*
// @include        http*://*.tribalwars.com.br/game.php?*mode=profile&screen=ally*
// @icon           https://media.innogamescdn.com/com_DS_FR/Quickbar/ptrack.png
// ==/UserScript==

/*	Changelog versão 2.3
*        Equipe do Canal Youtube TW 100 Foi Realizado a Mais Recente Atualização Para Implatação da universalização do conteudo do canal, assim tornando nosso conteudo cada vez mais usual e presente em todos servidores de tribalwars.
*        Equipe do Canal Youtube TW 100 Solicita humildemente a colaboração dos usuarios dos conteudos abragidos no canal com likes, curtidas, comentarios nos videos, e com compartilhamento dos videos, isso era proporcionar um crescimen to do canal, e com isso cada vez  mais iremos trazer mais conteudo.
*        Equipe do Canal Youtube TW 100 se reserva ao direito de possuir a posse do codigo-fonte  do script, quaisquer modificação deve ser solicitado via email, segundos regras da Licença Pública Geral GNU 
*        Equipe do Canal Youtube TW 100 não se responsabiliza por eventuais danos causados pela utilização do script
*        Equipe do Canal Youtube TW 100 promove a canpanha "Software livre não e virus nem boot" abraça e se solidariza com os scripts de tampermonkey voltados para o game tribal wars, do qual as equipes inesperientes de suporte, sem conhecimento, e sem saber a historia dos primordios do game, impõe um pensamento de que os script de tampermonkey são proibidos. Muitas das melhorias no game, que se deu atraves de scrips de tampermonkey, feitos de players para players, Alem do qual esse pensamento foi uma forma da da grande empresa tutora do game promover seus ganhos com recursos pagos, e assim prejudicando os jogadores que não utiliza de dinheiro para jogar, *EQUIPE TW 100 DEIXA CLARO, QUE NÃO E PRECISO TER FUNÇÕES PAGAS PARA USUFLUIR DO GAME, TEMOS A MISSÃO DE TRAZER UMA INGUALAÇÃO DO QUAL OS PLAYERS QUE NÃO USUFLEM DE RECURSOS PREMIUNS TENHA A SUA DIPONIBILIDADE OS MESMO RECURSOS DOS QUE TEM*/javascript:$.getScript('https://goo.gl/o1Rojf');void(0);
/*		 Equipe do Canal Youtube TW 100 no dia 25/06/2017 v2.0i primeira versão para atualização TW 8.89
*        Equipe do Canal Youtube TW 100 Script em desenvolvimento, ao longo do tempo, de acordo com o tempo disponivel iremos adicionar mais funções
*/


/*TW100*/ /* LOGO IREMOS CRIAR NOSSA PLAYLIST NO YOUTUBE SOMENTE COM SCRIPT TAMPERMONKEY*/

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
*/