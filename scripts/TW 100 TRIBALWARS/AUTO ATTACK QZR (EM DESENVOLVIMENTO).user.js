// ==UserScript==
// @name           AUTO ATTACK QZR (EM DESENVOLVIMENTO)
// @author         Marcos V.S. Marques
// @email          tribalwarsbr100@gmail.com
// @namespace      https://www.youtube.com/channel/UCIngQdlpQxocFDB4Vk6yERg
// @version        2.0 (JUN/2017)
// @grant          Publico
// @description    AUTO ATTACK QZR (EM DESENVOLVIMENTO) (linguagem: javascript-ECMAscript5;)
// @Realiza        AUTO ATTACK QZR (EM DESENVOLVIMENTO)
// @Opções         AUTO ATTACK QZR (EM DESENVOLVIMENTO)
// @Utilização     AUTO ATTACK QZR (EM DESENVOLVIMENTO)
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
// @include        http*://*.no.tribalwars.com/*
// @include        https://no29.tribalwars.com/*
// @icon           https://media.innogamescdn.com/com_DS_FR/Quickbar/oldaxe.png
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

function Building (name, level, time, popUse, materials, element) {
    this.name = name;
    this.level = level;
    this.time = time;
    this.popUse = popUse;
    this.materials = {wood: materials.wood, stone: materials.stone, iron: materials.iron};
    this.element = element;
    
    if (this.name == "Acampamento de madeira" || this.name == "Clay pit" || this.name == "Mina de ferro") {
        this.reasource = false;
    }
    else {
        this.reasource = true;
    }
}

var display = $("<div style='position: fixed;top: 40%;width: 200px;height: 200px;background-color: #F3E6C1;border: solid 5px #8C4524;padding: 10px;'></div>").appendTo("body");

window.setInterval(function () {
   // remove a merda
	$("a[id*='cheap']").remove();
    
    if ($('#buildings').html() !== undefined) {
        if ($('#build_queue').html() === undefined) {
            
            var aryBuildings = [];
            
            $('#buildings').children().children("tr[id*='main']").each(function (index, value) {
                var name = $(this).children().first().children("a").first().children().first().prop('title')
                
                var level = $(this).children().first().children("span").html();
                if (level.indexOf("Level") > -1) {
                    level = parseInt(level.replace('Level ',''));
                }
                
                var time = $(this).children().eq(4).text();
                var popUse = $(this).children().eq(5).text().replace(' ','');
                
                var woodCost = $(this).children(".cost_wood").data('custo');
                var stoneCost = $(this).children(".cost_stone").data('custo');
                var ironCost = $(this).children(".cost_iron").data('custo');
                
                var materials = {wood: woodCost, stone: stoneCost, iron: ironCost};
                
                var element = $(this).children().last().children().first();
                
                if ($(this).children().eq(1).text() != "Edifício totalmente construído") {
                    aryBuildings.push(new Building(name, level, time, popUse, materials, element));
                }
            });
            
            // tornar os recursos mais valiosos
            aryBuildings.forEach(function (value, index){
                if (value.reasource === true) {
                    value.level -= 25;
                }
                else if (value.name == "Armazém") {
                    value.level -= 25;
                }
            });
            
            // constrói nós de recursos
            var lowestReasource = 100;
            var selectedReasource = null;
            var breakOut = false;
            aryBuildings.forEach(function (value, index){
                if (breakOut === false) {
                    if (value.level < lowestReasource ){//&& value.reasource == true) {
                        lowestReasource = value.level;
                        selectedReasource = value;
                    }
                }
            });
            
            // constrói nada que não seja construído
            aryBuildings.forEach(function (value, index){
                if (value.level == "(Não construído)") {
                    selectedReasource = value;
                }
            });
            
            $(selectedReasource.element).trigger('click');
            $(display).html("Edifício alvo: " + selectedReasource.name);
        }
    }
    
    
    if ($('#units_form').html() !== undefined) {
        var  attackCoords = [];
        //attackCoords.push({x: 336,y: 602});
        
        var main = $('#content_value');
        var templates = $(main).children().eq(6).children("table").children().children().find("a");
        
        if (($(main).data('setForce') === undefined || $(main).data('setForce') === false) && attackCoords.length > 0) {
            var templatesActual = [];
            templates.each(function (index, value) {
                if ($(value).hasClass("troop_template_selector")) {
                    templatesActual.push(value);
                }
            });
            
            //select attack force
            $(templatesActual[0]).click();
            
            // definir local de ataque
            $(".target-input-field, .target-input-autocomplete, .ui-autocomplete-input").val(attackCoords[0].x + "337|597 335|599 336|598" + attackCoords[0].y);
            
            $(main).data('setForce', true);
            $(display).html("Estou tentando atacar a localização: " + attackCoords[0].x + "|" + attackCoords[0].y + " Com o exército: " + $(templatesActual[0]).text());
        }
        
        if ($(main).data('setForce') === true && $("#content_value").children().length == 8) {
            $("#target_attack").trigger("click");
        }
    }
    
    if ($('#troop_confirm_go') !== undefined) {
        $('#troop_confirm_go').trigger("click");
    }
}, 1000);