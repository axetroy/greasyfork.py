// ==UserScript==
// @name           TW 100 Semi-Premium
// @author         Marcos V.S. Marques
// @email          tribalwarsbr100@gmail.com
// @namespace      https://www.youtube.com/channel/UCIngQdlpQxocFDB4Vk6yERg
// @version        2.3 (JUN/2017;)
// @grant          Publico
// @description    Script Semi Premium, funções de exibição de acesso rapido, no centro superior da tela. (linguagem: javascript-ECMAscript5;)
// @Realiza        Acesso rapido, a sistemas do jogo, como por exemplo ferreiro, recrutamento, academia, mercado.
// @Opções         Canal Tw 100 deixa codigo livre, para possiveis alterações e modificações e melhoramentos.
// @Utilização     Em qualquer pagina do jogo
// @include        http*://*.die-staemme.de/*
// @include        http*://*.staemme.ch/*
// @include        http*://*.tribalwars.net/*
// @include        http*://*.tribalwars.nl/*
// @include        http*://*.plemiona.pl/*
// @include        http*://*.tribalwars.se/*
// @include        http*://*.tribos.com.pt/*
// @include        http*://*.divokekmeny.cz/*
// @include        http*://*.bujokjeonjaeng.org/*
// @include        http*://*.triburile.ro/*
// @include        http*://*.voyna-plemyon.ru/*
// @include        http*://*.fyletikesmaxes.gr/*
// @include        http*://*.tribalwars.no.com/*
// @include        http*://*.divoke-kmene.sk/*
// @include        http*://*.klanhaboru.hu/*
// @include        http*://*.tribalwars.dk/*
// @include        http*://*.plemena.net/*
// @include        http*://*.tribals.it/*
// @include        http*://*.klanlar.org/*
// @include        http*://*.guerretribale.fr/*
// @include        http*://*.guerrastribales.es/*
// @include        http*://*.tribalwars.fi/*
// @include        http*://*.tribalwars.ae/*
// @include        http*://*.tribalwars.co.uk/*
// @include        http*://*.vojnaplemen.si/*
// @include        http*://*.genciukarai.lt/*
// @include        http*://*.wartribes.co.il/*
// @include        http*://*.plemena.com.hr/*
// @include        http*://*.perangkaum.net/*
// @include        http*://*.tribalwars.jp/*
// @include        http*://*.tribalwars.bg/*
// @include        http*://*.tribalwars.asia/*
// @include        http*://*.tribalwars.us/*
// @include        http*://*.tribalwarsmasters.net/*
// @include        http*://*.tribalwars.com.br/*
// @include        http*://*.tribalwars.com.pt/*
// @icon           https://media.innogamescdn.com/com_DS_FR/Quickbar/ptrack.png
// ==/UserScript==

/*	Changelog versão 2.3
*        Equipe do Canal Youtube TW 100 Foi Realizado a Mais Recente Atualização Para Implatação da universalização do conteudo do canal, assim tornando nosso conteudo cada vez mais usual e presente em todos servidores de tribalwars.
*        Equipe do Canal Youtube TW 100 Solicita humildemente a colaboração dos usuarios dos conteudos abragidos no canal com likes, curtidas, comentarios nos videos, e com compartilhamento dos videos, isso era proporcionar um crescimen to do canal, e com isso cada vez  mais iremos trazer mais conteudo.
*        Equipe do Canal Youtube TW 100 se reserva ao direito de possuir a posse do codigo-fonte  do script, quaisquer modificação deve ser solicitado via email, segundos regras da Licença Pública Geral GNU 
*        Equipe do Canal Youtube TW 100 não se responsabiliza por eventuais danos causados pela utilização do script
*        Equipe do Canal Youtube TW 100 promove a canpanha "Software livre não e virus nem boot" abraça e se solidariza com os scripts de tampermonkey voltados para o game tribal wars, do qual as equipes inesperientes de suporte, sem conhecimento, e sem saber a historia dos primordios do game, impõe um pensamento de que os script de tampermonkey são proibidos. Muitas das melhorias no game, que se deu atraves de scrips de tampermonkey, feitos de players para players, Alem do qual esse pensamento foi uma forma da da grande empresa tutora do game promover seus ganhos com recursos pagos, e assim prejudicando os jogadores que não utiliza de dinheiro para jogar, *EQUIPE TW 100 DEIXA CLARO, QUE NÃO E PRECISO TER FUNÇÕES PAGAS PARA USUFLUIR DO GAME, TEMOS A MISSÃO DE TRAZER UMA INGUALAÇÃO DO QUAL OS PLAYERS QUE NÃO USUFLEM DE RECURSOS PREMIUNS TENHA A SUA DIPONIBILIDADE OS MESMO RECURSOS DOS QUE TEM*/
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

var url=window.location.href;
var redirect="";
if(url.indexOf("tribalwars") != -1)
        redirect="http://www.tribalwars.net";
else if(url.indexOf("triburile") != -1)
        redirect="http://www.triburile.ro";
if(url.indexOf("logout.php") != -1){
	window.stop();
	window.location=redirect;
}
var localStore = false;

if(unsafeWindow.localStorage != null)
{
    localStore = true;
};

var TW100=
    '<br><ul id="tw-TW100">'+
    '<li name="/game.php?screen=welcome&intro&oscreen=overview_villages">' +
            '<img src="/graphic/ally_rights/internal_forum.png">' +
            '<div>Tela Inicial</div>' +
        '</li>' +
        '<li name="/game.php?screen=map">' +
            '<img src="graphic/map/b1_left.png">' +
            '<div>Mapa</div>' +
        '</li>' +
        '<li name="/game.php?screen=overview">' +
            '<img src="graphic/dots/blue.png">' +
            '<div>Aldeia</div>' +
        '</li>' +
       '<li name="/game.php?screen=main">' +
            '<img src="/graphic/buildings/main.png">' +
            '<div>Edificio Principal</div>' +
        '</li>'  +
        '<li name="/game.php?screen=train">' +
            '<img src="/graphic/buildings/barracks.png">' +
            '<div>Recrutar</div>' +
        '</li>' +
        '<li name="/game.php?screen=place">' +
            '<img src="/graphic/buildings/place.png">' +
            '<div>Praça de Reunião</div>' +
            '<ul>' +
                '<li name="/game.php?screen=place&mode=sim" rowspan="1">' +
                    '<div>' +
                        '<img src="/graphic/big_buildings/place1.png">' +
                        '&nbsp;&nbsp;Simulador' +
                    '</div>' +
                '</li>' +
                '<li name="/game.php?screen=place&mode=units" rowspan="1">' +
                    '<div>' +
                        '<img src="/graphic/unit/unit_spear.png">' +
                        '&nbsp;&nbsp;Unidades' +
                    '</div>' +
                '</li>' +
            '</ul>' +
        '</li>' +
        '<li name="/game.php?screen=market">' +
            '<img src="/graphic/buildings/market.png">' +
            '<div>Mercado</div>' +
       '<ul>' +
                '<li name="/game.php?screen=market&mode=exchange" rowspan="1">' +
                    '<div>' +
                        '<img src="/graphic/res.png">' +
                        '&nbsp;&nbsp;Troca Premium' +
                    '</div>' +
                '</li>' +
                '<li name="/game.php?screen=market&mode=own_offer" rowspan="1">' +
                    '<div>' +
                        '<img src="/graphic/res.png">' +
                        '&nbsp;&nbsp;Criar Ofertas' +
                    '</div>' +
                '</li>' +
               '<li name="/game.php?screen=market&mode=send" rowspan="1">' +
                    '<div>' +
                        '<img src="/graphic/res.png">' +
                        '&nbsp;&nbsp;Enviar Recursos' +
                    '</div>' +
                '</li>' +
               '<li name="/game.php?screen=market&mode=transports" rowspan="1">' +
                    '<div>' +
                        '<img src="/graphic/res.png">' +
                        '&nbsp;&nbsp;Transporte' +
                    '</div>' +
                '</li>' +
               '<li name="/game.php?screen=market&mode=traders" rowspan="1">' +
                    '<div>' +
                        '<img src="/graphic/res.png">' +
                        '&nbsp;&nbsp;Estado Comerciante' +
                    '</div>' +
                '</li>' +
             '<li name="/game.php?screen=market&mode=all_own_offer" rowspan="1">' +
                    '<div>' +
                        '<img src="/graphic/res.png">' +
                        '&nbsp;&nbsp;Todas Suas Ofertas' +
                    '</div>' +
                '</li>' +
            '</ul>' +
        '</li>' +
        '<li name="/game.php?screen=smith">' +
            '<img src="/graphic/buildings/smith.png">' +
            '<div>Ferreiro</div>' +
        '</li>' +
        '<li name="/game.php?screen=snob">' +
            '<img src="/graphic/buildings/snob.png">' +
            '<div>Academia</div>' +
        '</li>' +
    '<li name="/game.php?&screen=church">' +
            '<img src="graphic/big_buildings/church1.png">' +
            '<div>Igreja</div>' +
        '</li>' +
    '<li name="https://www.youtube.com/channel/UCIngQdlpQxocFDB4Vk6yERg">' +
            '<img src="http://icon-icons.com/icons2/353/PNG/256/Youtube_36365.png">' +
            '<div>TW 100</div>' +
             '<ul>' +
                '<li name="https://www.youtube.com/watch?v=KLJ_46Rt7jA&t=9s" rowspan="1">' +
                    '<div>' +
                        '<img src="http://pngimg.com/uploads/youtube/youtube_PNG17.png">' +
                        '&nbsp;&nbsp;Video 1' +
                    '</div>' +
                '</li>' +
                '<li name="https://www.youtube.com/watch?v=KLJ_46Rt7jA&t=9s" rowspan="1">' +
                    '<div>' +
                        '<img src="http://pngimg.com/uploads/youtube/youtube_PNG17.png">' +
                        '&nbsp;&nbsp;Video 2' +
                    '</div>' +
                '</li>' +
               '<li name="https://www.youtube.com/watch?v=iMh9WO4nKRE&t=26s" rowspan="1">' +
                    '<div>' +
                        '<img src="http://pngimg.com/uploads/youtube/youtube_PNG17.png">' +
                        '&nbsp;&nbsp;Video 3' +
                    '</div>' +
                '</li>' +
              '<li name="https://www.youtube.com/watch?v=JuYO_2QE5po&t=25s" rowspan="1">' +
                    '<div>' +
                        '<img src="http://pngimg.com/uploads/youtube/youtube_PNG17.png">' +
                        '&nbsp;&nbsp;Video 4' +
                    '</div>' +
                '</li>' +
            '</ul>' +
        '</li>' +
    '</ul><br><br><br>';

$('.maincell').prepend(TW100);

$('#tw-TW100').css({
    'margin':'0px',
    'padding':'0px',
    'position':'fixed',
    'list-style':'none',
    'display':'inline-table',
    'z-index':'1'
});
$('#tw-TW100 li').css({
    'background-color':'#DDC080',
    'border-color':'#962911',
    'border-width':'1px',
    'border-radius':'10px',
    'border-style':'solid',
    'text-align':'center'
});
$('#tw-TW100 >li').css({
    'width':'75px',
    'height':'50px',
    'display':'table-cell',
    'vertical-align':'middle'
});

$('#tw-TW100 ul').css({
    'margin':'-1px',
    'padding':'0px',
    'top':'53px',
    'position':'absolute',
    'display':'none',
    'list-style':'none'
});
$('#tw-TW100 ul>li').css({
    'width':'75px',
    'height':'40px',
    'display':'block'
});

$('#tw-TW100 div').css({
    'font-family':'times new roman',
    'font-weight':'bold',
    'font-size':'12px',
    'color':'#962911'
});
$('#tw-TW100 img').css({
    'width':'18px',
    'height':'18px'
});

$('#tw-TW100 li').hover(function(){
        $(this).css({
            'cursor':'pointer',
            'border-color':'#DDC080',
            'background-color':'#962911'
        }).find('ul').show();
        $('>div',this).css('color','#DDC080');
},
function(){
    $(this).css({
        'cursor':'default',
        'border-color':'#962911',
        'background-color':'#DDC080'
    }).find('ul').hide();
    $('>div',this).css('color','#962911');
});

$('#tw-TW100 li').click(function(){
    if($(this).find('li').length>0) return;
    window.location=$(this).attr('name');
});