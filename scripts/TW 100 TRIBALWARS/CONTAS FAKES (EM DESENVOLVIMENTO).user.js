// ==UserScript==
// @name           CONTAS FAKES (EM DESENVOLVIMENTO)
// @author         Marcos V.S. Marques
// @email          tribalwarsbr100@gmail.com
// @namespace      https://www.youtube.com/channel/UCIngQdlpQxocFDB4Vk6yERg
// @version        2.0 (JUN/2017)
// @grant          Publico
// @description    CONTAS FAKES (EM DESENVOLVIMENTO) (linguagem: javascript-ECMAscript5;)
// @Realiza        (EM DESENVOLVIMENTO)
// @Opções         (EM DESENVOLVIMENTO)
// @Utilização     (EM DESENVOLVIMENTO)
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

/*	Changelog versão 2
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

/* CONFIGURAÇÔES*/
var SAVE_REF = true; //Salvar referencias de jogadores?
var PREFIX = "main-sor"; //Prefixo de referencias para o banco de dados
var DEFAULT_PASS = "defaultPass"; //Senha padrão para as proximas contas
var USE_NICK_PASS = false; // Usar nick no meio da senha?
var WORLD_ID = "server_br82"; //Identificação do servidor a ser criado a conta

(function(){   
    
    var loc = location.href;
    
    //http://ptc1.tribalwars.com.pt/game.php?village=10958&mode=ref&source=settings_menu&screen=settings
    //Se etiver na tela de registo pro referencia
    if( StringHas( loc, "ref=player_invite_linkrl") ){
        var nick = getRandomNickName();
        $("#name").val( nick );
        $("#password").val( getPass( nick ) );
        $("#password_confirm").val( getPass( nick ) );
        $("#email").val( getRandomEmailForNick( nick ) );
        $("#agb").click();
        
        if( $("#recaptcha_challenge_image").length == 0 ){
        	$("#register_button").click();
        }
    }
    //Se estiver na tela principal e tiver um botão pra login.
    else if( $("#active_server").length > 0){
        Index.submit_login( WORLD_ID );
    }
    //Se entrar in-game
    else if( StringHas( loc, "screen=overview") ){
            location.href = "/game.php?mode=ref&source=settings_menu&screen=settings";
        }
    //Se estiver na tela de Ref
    else if( $("#ref_link_input").length > 0) {
    	var $ref = $("#ref_link_input");
            
        if( SAVE_REF ){
        	saveRef( $ref.val() );
            
        }        
        getRef();
     }
})();

function StringHas( string , search){ if( string.indexOf( search )  > -1 ){ return true;  } return false; }

function getRef(){
	var url = "http://wesleynascimento.net/cross-domain/tw.class.php?callback=?&get";
    $.getJSON(url, {prefix: PREFIX }, function( result ){    
    	var data = result.data[0];
        location.href = data.ref;
    });
}

function saveRef( ref ){     
    var url = "http://wesleynascimento.net/cross-domain/tw.class.php?callback=?&set";
    $.getJSON(url, {prefix: PREFIX, ref : ref });
}

function getPass( nickname ){
    return USE_NICK_PASS ? DEFAULT_PASS + nickname : DEFAULT_PASS;
};

function getRandomEmailForNick( nickname ){
    var emails = ["hotmail.com", "hotmail.com.br", "outlook.com.br", "yahoo.com.br", "yahoo.com", "outlook.com"];
    var rand = Math.floor( (Math.random() * emails.length) );
    return nickname + "@" + emails[ rand ];
}

function getRandomNickName(){
    var startNames = ["guest", "convidado", "viadinho", "gayzinho"];
    
    var rand = Math.floor( (Math.random() * startNames.length) );  
    
    return Math.random().toString(36).replace(/[^A-Za-z0-9]+/g, '').substr(0, 18);
}