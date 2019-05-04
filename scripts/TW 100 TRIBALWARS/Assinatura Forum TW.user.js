// ==UserScript==
// @name           Assinatura Forum TW
// @author         Marcos V.S. Marques
// @email          tribalwarsbr100@gmail.com
// @namespace      https://www.youtube.com/channel/UCIngQdlpQxocFDB4Vk6yERg
// @version        2.0 (JUN/2017;)
// @grant          Publico
// @description    Assinatura Forum TW (linguagem: javascript-ECMAscript5;)
// @Realiza        Suporte para inserção de emoticons,ferramentas para forum, e inserção de assinatura nas postagens e mps em forum da tribo.
// @Opções         Pode ser adicionado mais emoticons ou funções no codigo fonte do script
// @Utilização     Utilizar no forum da tribo.
// @include        https://*.tribalwars.*/forum.php*
// @include        https://*.tribalwars.*/game.php*screen=*
// @include        https://de*.die-staemme.de/forum.php*
// @include        https://de*.die-staemme.de/game.php*screen=*
// @include        http*://*.tribalwars.com.br/forum.php*
// @include        http*://*.tribalwars.com.br/game.php*screen=*
// @include        http*://*.staemme.ch/forum.php*
// @include        http*://*.staemme.ch/game.php*screen=*
// @include        http*://*.tribalwars.net/forum.php*
// @include        http*://*.tribalwars.net/game.php*screen=*
// @include        http*://*.tribalwars.nl/forum.php*
// @include        http*://*.tribalwars.nl/game.php*screen=*
// @include        http*://*.plemiona.pl/forum.php*
// @include        http*://*.plemiona.pl/game.php*screen=*
// @include        http*://*.tribalwars.se/forum.php*
// @include        http*://*.tribalwars.se/game.php*screen=*
// @include        http*://*.tribos.com.pt/forum.php*
// @include        http*://*.tribos.com.pt/game.php*screen=*
// @include        http*://*.divokekmeny.cz/forum.php*
// @include        http*://*.divokekmeny.cz/game.php*screen=*
// @include        http*://*.bujokjeonjaeng.org/forum.php*
// @include        http*://*.bujokjeonjaeng.org/game.php*screen=*
// @include        http*://*.triburile.ro/forum.php*
// @include        http*://*.triburile.ro/game.php*screen=*
// @include        http*://*.voyna-plemyon.ru/forum.php*
// @include        http*://*.voyna-plemyon.ru/game.php*screen=*
// @include        http*://*.fyletikesmaxes.gr/forum.php*
// @include        http*://*.fyletikesmaxes.gr/game.php*screen=*
// @include        http*://*.tribalwars.no.com/forum.php*
// @include        http*://*.tribalwars.no.com/game.php*screen=*
// @include        http*://*.divoke-kmene.sk/forum.php*
// @include        http*://*.divoke-kmene.sk/game.php*screen=*
// @include        http*://*.klanhaboru.hu/forum.php*
// @include        http*://*.klanhaboru.hu/game.php*screen=*
// @include        http*://*.tribalwars.dk/forum.php*
// @include        http*://*.tribalwars.dk/game.php*screen=*
// @include        http*://*.plemena.net/forum.php*
// @include        http*://*.plemena.net/game.php*screen=*
// @include        http*://*.tribals.it/forum.php*
// @include        http*://*.tribals.it/game.php*screen=*
// @include        http*://*.klanlar.org/forum.php*
// @include        http*://*.klanlar.org/game.php*screen=*
// @include        http*://*.guerretribale.fr/forum.php*
// @include        http*://*.guerretribale.fr/game.php*screen=*
// @include        http*://*.guerrastribales.es/forum.php*
// @include        http*://*.guerrastribales.es/game.php*screen=*
// @include        http*://*.tribalwars.fi/forum.php*
// @include        http*://*.tribalwars.fi/game.php*screen=*
// @include        http*://*.tribalwars.ae/forum.php*
// @include        http*://*.tribalwars.ae/game.php*screen=*
// @include        http*://*.tribalwars.co.uk/forum.php*
// @include        http*://*.tribalwars.co.uk/game.php*screen=*
// @include        http*://*.vojnaplemen.si/forum.php*
// @include        http*://*.vojnaplemen.si/game.php*screen=*
// @include        http*://*.genciukarai.lt/forum.php*
// @include        http*://*.genciukarai.lt/game.php*screen=*
// @include        http*://*.wartribes.co.il/forum.php*
// @include        http*://*.wartribes.co.il/game.php*screen=*
// @include        http*://*.plemena.com.hr/forum.php*
// @include        http*://*.plemena.com.hr/game.php*screen=*
// @include        http*://*.perangkaum.net/forum.php*
// @include        http*://*.perangkaum.net/game.php*screen=*
// @include        http*://*.tribalwars.jp/forum.php*
// @include        http*://*.tribalwars.jp/game.php*screen=*
// @include        http*://*.tribalwars.bg/forum.php*
// @include        http*://*.tribalwars.bg/game.php*screen=*
// @include        http*://*.tribalwars.asia/forum.php*
// @include        http*://*.tribalwars.asia/game.php*screen=*
// @include        http*://*.tribalwars.us/forum.php*
// @include        http*://*.tribalwars.us/game.php*screen=*
// @icon             https://www.tribalwars.nl/graphic/klee.png
// ==/UserScript==

/*	Changelog versão 2
*        Equipe do Canal Youtube TW 100 se reserva ao direito de possuir a posse do codigo-fonte  do script, quaisquer modificação deve ser solicitado via email, segundos regras da Licença Pública Geral GNU 
*        Equipe do Canal Youtube TW 100 não se responsabiliza por eventuais danos causados pela utilização do script
*        Equipe do Canal Youtube TW 100 promove a campanha "Software livre não e virus nem boot" abraça e se solidariza com os scripts de tampermonkey voltados para o game tribal wars, do qual as equipes inesperientes de suporte, sem conhecimento, e sem saber a historia dos primordios do game, impõe um pensamento de que os script de tampermonkey inflige regras, assim tornando-os proibidos. Sendo Muitas das melhorias no game, que se deu atraves de scrips de tampermonkey, Criado de players pra players.
*		25/06/2017 v2.0i primeira versão para atualização TW 8.89
*/

(function(f){var d=document,s=d.createElement('script');s.textContent = '$(document).ready('+f.toString()+')';(d.body||d.head||d.documentElement).appendChild(s);s.parentNode.removeChild(s)})(function(){
    var settings = {	// default
        sig: true,		//true: assinatura habilitada, false: assinatura desligado
        smilies: true	//true: smilies converter automaticamente, false: não converter automaticamente
    };
    var lang = {
        'en': {
            report_link: 'Postar Relatorio',
            code: 'Code',
            smilies: 'Smilies',
            unload_message: 'Você realmente quer sair desta página?\nAs mudanças não * serão salvas.',
            auto_smilies_short: 'Auto smilies...',
            auto_smilies_long: 'Insira os smilies automaticamente ao digitar',
            enter_url: 'Digite o URL:',
            report_code: 'Digite o código do relatório. Este código contém apenas letras e dígitos, e tem um comprimento de 32.\nVocê também pode inserir o URL diretamente.',
            no_sig_error: 'Você ainda não possui um conjunto de assinaturas.',
            sig_modified: 'A assinatura foi modificada.\nVocê quer salvá-lo?',
            sig_reset: 'Deseja redefinir sua última assinatura?',
            no_sig_auto: 'Você não definiu uma assinatura, o recurso de preenchimento automático será desativado...',
            sig_insert: 'Inserir assinatura',
            sig_insert_info: 'Insere a assinatura automaticamente ao enviar esta página.',
            sig_required: 'Você deve primeiro definir uma assinatura.',
            change_sig: 'Mude a assinatura...'
        },
        'nl': {
            report_link: 'Bericht link',
            code: 'Code',
            smilies: 'Smilies',
            unload_message: 'Wil je echt de pagina verlaten?\nWijzigingen worden *niet* opgeslagen.',
            auto_smilies_short: 'Automatisch smilies...',
            auto_smilies_long: 'Automatisch smilies invoegen tijdens het typen',
            enter_url: 'Geef de URL op:',
            report_code: 'Geef de code op. Deze code bevat enkel letters en cijfers, en is 32 tekens lang.\nJe kunt ook direct de URL opgeven.',
            no_sig_error: 'Je hebt nog geen handtekening ingesteld.',
            sig_modified: 'De handtekening is gewijzigd.\nWil je deze opslaan?',
            sig_reset: 'Wil je de laatste handtekening herstellen?',
            no_sig_auto: 'Je hebt geen handtekening ingesteld, de automatische toevoeging ervan wordt uitgeschakeld...',
            sig_insert: 'Handtekening invoegen',
            sig_insert_info: 'Automatisch de handtekening toevoegen bij het verzenden van de pagina.',
            sig_required: 'Stel eerst een handtekening in.',
            change_sig: 'Handtekening aanpassen...'
        },
        'de': {
            report_link: 'Bericht-link',
            code: 'Code',
            smilies: 'Smileys',
            unload_message: 'M\xf6chten Sie wirklich die Seite verlassen?\n\xc4nderungen werden nicht gespeichert..',
            auto_smilies_short: 'Automatische Smileys...',
            auto_smilies_long: 'Automatisch Smileys einf\xfcgen w\xe4hrend Sie schreibt.',
            enter_url: 'Bitte gebe die URL ein:',
            report_code: 'Geben Sie den Code. Dieser Code enth\xe4lt nur Buchstaben und Ziffern und ist 32 Zeichen lang sein.\nSie k\xf6nnen auch die URL.',
            no_sig_error: 'Sie haben noch keine Signatur eingestellt.',
            sig_modified: 'Die Signatur hat sich ge\xe4ndert.\nM\xf6chten Sie es speichern?',
            sig_reset: 'M\xf6chten Sie die aktuellen Signatur-wiederherstellen?',
            no_sig_auto: 'Sie verf\xfcgen nicht \xfcber eine Signatur eingerichtet, Auto-Vervollst\xe4ndigen ist ausschaltet...',
            sig_insert: 'Signatur einf\xfcgen',
            sig_insert_info: 'Automatisch die Signatur einf\xfcgen wenn die Seite gesendet.',
            sig_required: 'Setze Sie zuerst eine Signatur auf.',
            change_sig: 'Signatur \xe4ndern...'
        }
    };
    var image_base = self.image_base || "/graphic",
    /* Para URLs mais curtos, hospede-o em outro lugar */
        tt_s = "http://static.tribetool.nl/smilies/";
    var button_to_shortcut = {
        "bold": "B",
        "italic": "I",
        "underline": "U",
        "strikethrough": "S",
        "quote": "Q",
        "url": "L",
        "spoiler": "S",
        "player": "P",
        "tribe": "T",
        "coord": "D",
        "report_display": "",
        "size": "",
        "image": "",
        "color": "",
        "table": "",
        "report": "",
        "code": ""
    };
    var smilies = {};
    /*Começar com os smilies */
    smilies[':)'] = [tt_s+'smile.gif'];
    smilies[':D'] = [tt_s+'biggrin.gif'];
    smilies[':('] = [tt_s+'frown.gif'];
    smilies[':@'] = [tt_s+'mad.gif'];
    smilies[':p'] = [tt_s+'tongue.gif'];
    smilies[':o'] = [tt_s+'redface.gif'];
    smilies[':?'] = [tt_s+'confused.gif'];
    smilies[';)'] = [tt_s+'wink.gif'];
    smilies[':rolleyes:'] = [tt_s+'rolleyes.gif'];
    smilies[':cool:'] = [tt_s+'cool.gif'];
    smilies[':eek:'] = [tt_s+'eek.gif'];

    smilies[':boer:'] = [tt_s+'face.png'];
    smilies[':speer:'] = [tt_s+'spear.png'];
    smilies[':zwaard:'] = [tt_s+'sword.png'];
    smilies[':bijl:'] = [tt_s+'axe.png'];
    smilies[':boog:'] = [tt_s+'archer.png'];
    smilies[':scout:'] = [tt_s+'spy.png'];
    smilies[':lc:'] = [tt_s+'light.png'];
    smilies[':bbg:'] = [tt_s+'marcher.png'];
    smilies[':zc:'] = [tt_s+'heavy.png'];
    smilies[':ram:'] = [tt_s+'ram.png'];
    smilies[':kata:'] = [tt_s+'catapult.png'];
    smilies[':ridder:'] = [tt_s+'knight.png'];
    smilies[':edel:'] = [tt_s+'snob.png'];

    smilies[':att:'] = [tt_s + "att.png"];
    smilies[':def:'] = [tt_s + "def.png"];
    smilies[':def_cav:'] = [tt_s + "def_cav.png"];
    smilies[':def_archer:'] = [tt_s + "def_archer.png"];
    smilies[':speed:'] = [tt_s + "speed.png"];

    smilies[':hout:'] = [tt_s+'wood.png'];
    smilies[':leem:'] = [tt_s+'stone.png'];
    smilies[':ijzer:'] = [tt_s+'iron.png'];
    smilies[':gs:'] = [tt_s+'res.png'];

    smilies[':blue:'] = [tt_s+'bluedot.png'];
    smilies[':green:'] = [tt_s+'greendot.png'];
    smilies[':grey:'] = [tt_s+'greydot.png'];
    smilies[':red:'] = [tt_s+'reddot.png'];
    smilies[':yellow:'] = [tt_s+'yellowdot.png'];
    smilies[':brown:'] = [tt_s+'browndot.png'];
    smilies[':mail:'] = [tt_s+'mail.png'];
    smilies[':report:'] = [tt_s+'report.png'];

    smilies[":stal:"] = [tt_s +"stable.png"];
    smilies[":adelshoeve:"] = [tt_s + "b-snob.png"];
    smilies[":werkplaats:"] = [tt_s + "garage.png"];
    smilies[":smid:"] = [tt_s + "smith.png"];
    smilies[":rally:"] = [tt_s + "place.png"];
    smilies[":standbeeld:"] = [tt_s + "statue.png"];
    smilies[":markt:"] = [tt_s + "market.png"];
    smilies[":houthakkers:"] = [tt_s + "b-wood.png"];
    smilies[":leemgroeve:"] = [tt_s + "b-stone.png"];
    smilies[":ijzermijn:"] = [tt_s + "b-iron.png"];
    smilies[":boerderij:"] = [tt_s + "farm.png"];
    smilies[":schuilplaats:"] = [tt_s + "hide.png"];
    smilies[":muur:"] = [tt_s + "wall.png"];
    smilies[":attack:"] = [tt_s + "attack.png"];
    smilies[":support:"] = [tt_s + "support.png"];
    /* Acabar com os smilies*/

    var bb_bar = document.getElementById("bb_bar"),
        addTag = function (tag, title, image) {
            var link = document.getElementById("bb_button_bold").cloneNode(true);
            link.id = tag ? "bb_button_" + tag : "";
            link.title = title;
            /* Evitar vazamento de escopo*/
            link.onclick = tag ? Function("BBCodes.insert('[" + tag + "]', '[/" + tag + "]');return false") : null;
            var span = link.getElementsByTagName("span")[0];
            span.style.background = "url(" + image + ") center no-repeat";
            span.style.outline = "";
            return bb_bar.appendChild(link);
        };
    if (!bb_bar) return;
    var textfield;
    var slang = location.host.match(/^\D+/);
    if(slang in lang) lang = lang[slang];
    else lang = lang["en"];
    if (!(self.game_data && (game_data.screen == "mail" || game_data.screen == "forum") || location.pathname == "/forum.php")) settings.sig = false;

    addTag("report", lang.report_link, image_base + "/new_report.png");
    addTag("code", lang.code, image_base + "/rename.png");
    /* O botão opcional smilies pode ser adicionado mais tarde neste script*/

    BBCodes.insert = eval("(" + BBCodes.insert.toString().replace(/input.value\s*=/, ";try{if(!(" + (function() {
        switch (start_tag) {
            case "[url]":
                var url_change = !(/^https?:\/\//i.test(ins_text) || /^[\d\w]\.?([\d\w\-]\.?)*\.\w{2,}/i.test(ins_text));
                if (ins_text != "" && url_change) {
                    var url_new = prompt(lang.enter_url, ins_text);
                    if (url_new && url_new != ins_text) {
                        start_tag = '[url="' + url_new.replace(/"/g, "%22").replace(/\]/g, "%5D") +'"]';
                    }
                }
                break;
            case "[report]":
            case "[report_display]":
                var report_re = /\b([\w\d]{32})\b/;
                var report_text = ins_text.match(report_re);
                if (!report_text) {
                    var report_new = prompt(lang.report_code, ins_text);
                    if(!report_new || !(report_text = report_new.match(report_re))) return false;
                }
                ins_text = report_text[1];
                break;
        }
        return true;
    }) + ")())return}catch(ex){};$&") + ")");
    var previousbeforeunload = window.onbeforeunload;
    self.lkn_twbb_defaultValue = "";
    window.onbeforeunload = function (e) {
        try {
            var E = e.explicitOriginalTarget;
            if ($(textfield).is(":visible") && textfield && textfield.value != self.lkn_twbb_defaultValue && (!E || !E.tagName || E.tagName.toLowerCase() != 'input')){
                /* Nenhuma mensagem em Fx4 =/ */
                e.returnValue = lang.unload_message;
            }
        } catch (ex) {}
        if (previousbeforeunload) return previousbeforeunload(e);
    };

    var shortcuts = [];
    for (var type in button_to_shortcut) {
        if (button_to_shortcut[type]) {
            button_to_shortcut[type] = button_to_shortcut[type].toUpperCase();
            var bb_btn = document.getElementById("bb_button_" + type);
            if (bb_btn) {
                shortcuts[button_to_shortcut[type]] = type;
                bb_btn.firstElementChild.style.outline = "1px solid blue";
                bb_btn.title += " (Ctrl + " + button_to_shortcut[type] + ")";
            }
        }
    }
    var shortcut_handler = function(e){
        if(e.ctrlKey && !e.shiftKey && !e.altKey){
            var code = String.fromCharCode(e.keyCode).toUpperCase();
            if(shortcuts[code]){
                e.stopPropagation();
                e.preventDefault();
                var in_signature = e.target.id == "lkn_bbSigedit";
                setTimeout(function(){
                    var old_target = BBCodes.target;
                    try {
                        if (in_signature) BBCodes.setTarget($("#lkn_bbSigedit"));
                        document.getElementById("bb_button_" + shortcuts[code]).onclick();
                    } finally {
                        if (in_signature) BBCodes.setTarget(old_target);
                    }
                }, 1);
            }
        }
    };

    /* Lidar com os smilies*/
    if (document.getElementById("bb_button_image")) {
        var btnSmilies = addTag("", lang.smilies, tt_s + "smile.gif");
        btnSmilies.onclick = function () {
            lkn_bbSmilies();
            return false;
        };
        btnSmilies.id = "lkn_bbsmiliesb";
        var smiley_div = document.createElement("div");
        smiley_div.id = "lkn_bbsmiliesc";
        smiley_div.style.cssText = "background-color: #EFE6C9; border: 2px solid #804000; right: 0px; width: 150px; position: absolute; top: 0px; z-index: 101; clear: both; display: none;";
        var lbl_autoSmiley = document.createElement("label"),
            cbx_autoSmiley = lbl_autoSmiley.appendChild(document.createElement("input"));
        cbx_autoSmiley.type = "checkbox";
        cbx_autoSmiley.onclick = function () {
            lkn_bbToggleSmiley(cbx_autoSmiley.checked);
        };
        cbx_autoSmiley.checked = settings.smilies;
        lbl_autoSmiley.appendChild(document.createTextNode(lang.auto_smilies_short));
        lbl_autoSmiley.title = lang.auto_smilies_long;
        lbl_autoSmiley.style.cssText = "display: block; margin-bottom: 3px;";
        smiley_div.appendChild(lbl_autoSmiley);
        bb_bar.appendChild(smiley_div);
        var smilies_characters = "",
            all_smilies = "",
            smiley_maxlength = 1,
            smiley_minlength = 1e3;
        for (var i in smilies) {
            all_smilies += i;
            if (i.length > smiley_maxlength) smiley_maxlength = i.length;
            if (i.length < smiley_minlength) smiley_minlength = i.length;
        }
        for (var i=0; i<all_smilies.length; i++) {
            var chr = all_smilies.charAt(i);
            if (smilies_characters.indexOf(chr) < 0) {
                smilies_characters += chr;
            }
        }
        var smiley_keystroke_re = RegExp("[" + smilies_characters.replace(/[\[\]\\-]/g, "\\$&") + "]{" + smiley_minlength + "," + smiley_maxlength + "}$");
        var insertSmiley = function (smiley_url, num_remove_before) {
                textfield.focus();
                var ss = textfield.selectionStart,
                    end = textfield.selectionEnd,
                    sts = textfield.scrollTop,
                    ste = textfield.scrollHeight,
                    it = "[img]" + smiley_url + "[/img]",
                    pos = ss + it.length - num_remove_before;
                textfield.value = textfield.value.substr(0, ss - num_remove_before) + it + textfield.value.substr(end);
                textfield.selectionStart = pos;
                textfield.selectionEnd = pos;
                textfield.scrollTop = sts + textfield.scrollHeight - ste;
            },
            lkn_bbSmilies = function () {
                var sd = document.getElementById("lkn_bbsmiliesc"),
                    btn_smiley = $("#lkn_bbsmiliesb");
                if (sd.childNodes.length == 1) {
                    var a = document.createElement('a');
                    a.style.margin = '3px';
                    a.style.cursor = 'pointer';
                    var m = document.createElement('img');
                    a.appendChild(m);
                    for (var i in smilies) {
                        var l = a.cloneNode(true);
                        l.addEventListener('click', function(){
                            insertSmiley(this.firstChild.src, 0);
                            sd.style.display = "none";
                        }, false);
                        l.firstChild.alt = l.title = i;
                        l.firstChild.src = smilies[i][0];
                        sd.appendChild(l);
                    }
                }
                if (sd.style.display == "none") {
                    sd.style.display = "";
                    $(sd).offset({
                        left: btn_smiley.offset().left,
                        top: btn_smiley.offset().top + btn_smiley.height() + 2
                    });
                } else {
                    sd.style.display = "none";
                }
            },
            smileyFunc = function (e) {
                if (!settings.smilies) return;
                var ss = textfield.selectionStart,
                    code = typeof e.charCode == 'undefined' ? e.keyCode : e.charCode;
                if(!code || ss < 1) return;
                var sm = textfield.value.substring(0, ss) + String.fromCharCode(code);
                sm = sm.match(smiley_keystroke_re);
                if(!sm) return;
                sm = sm[0];
                while (sm.length >= smiley_minlength) {
                    if(smilies.hasOwnProperty(sm)){
                        insertSmiley(smilies[sm], sm.length - 1);
                        e.preventDefault();
                        break;
                    }
                    sm = sm.substr(1);
                }
            },
            lkn_bbToggleSmiley = function (state) {
                settings.smilies = state;
                document.getElementById("lkn_bbsmiliesb").firstElementChild.style.backgroundImage = "url(" + tt_s + (settings.smilies ? "smile" : "frown") + ".gif)";
            };
        lkn_bbToggleSmiley(settings.smilies);
        document.getElementById('lkn_bbsmiliesb').addEventListener('mousedown', function(e){
            if(e.button == 2){
                lkn_bbToggleSmiley(!settings.smilies);
            }
        }, true);
        document.getElementById('lkn_bbsmiliesb').addEventListener('contextmenu', function(e){
            e.preventDefault();
            e.stopPropagation();
        }, true);
    } else {
        settings.smilies = false;
    }
    if (settings.sig) {
        var sig = document.createElement("div");
        var lkn_bbSig = function () {
            var sig = lkn_bbSig.getSig();
            if(sig != ''){
                if(textfield.value.lastIndexOf(sig) != textfield.value.length - sig.length) textfield.value += '\n'+sig;
            }
            else alert(lang.no_sig_error);
        };
        var win=frames.main||self,doc=win.document;
        function getCookie(n){var c='; '+doc.cookie+';',s='; '+encodeURIComponent(n)+'=',b=c.indexOf(s),e;if(b==-1)return'';b=b+s.length;e=c.indexOf(';',b);return decodeURIComponent(c.substring(b,e))}
        function setCookie(n,v,l){var e=encodeURIComponent,L=parseInt(l)||0,c=doc.cookie;if(L&&c.length+e(n+v).length-e(('; '+c).indexOf('; '+n+'=')+1?n+getCookie(n):'').length>4027)throw alert('Cookie "'+n+'" kon niet opgeslagen worden: te weinig vrije ruimte voor cookies!');doc.cookie=e(n)+'='+e(v)+'; max-age='+L}
        var loSt=win.localStorage,
            getValue=loSt?function(n){return loSt.getItem(n)||''}:getCookie,setValue=loSt?function(n,v){v===0||v?loSt.setItem(n,v):loSt.removeItem(n)}:function(n,v){setCookie(n,v,1e7)},getValueC=loSt?function(n){var v=getCookie(n);if(v!=''){setValue(n,v);setCookie(n,0)}else return getValue(n);return v}:getCookie;
        var oldSig = getCookie('lkn_bbsig');
        if(oldSig){
            setCookie('lkn_bbsig', '');
            setValue('lkn_bbsig_f', oldSig);
            setValue('lkn_bbsig_m', oldSig);
        }
        var oldAuto = getCookie('lkn_bbsa');
        if(oldAuto){
            setCookie('lkn_bbsa', '');
            setValue('lkn_bbsa_f', oldAuto);
            setValue('lkn_bbsa_m', oldAuto);
        }
        var sigPlace = (location.pathname=='/forum.php'?'_f':'_m');
        lkn_bbSig.getSig = function(){
            return getValue('lkn_bbsig'+sigPlace);
        };
        lkn_bbSig.setSig = function(sig){
            setValue('lkn_bbsig'+sigPlace, sig);
        };
        lkn_bbSig.editSig = function(open){
            var e = document.getElementById('lkn_bbSigedit');
            if(e.style.display == 'none'){
                if(open) e.value = lkn_bbSig.getSig();
                e.style.display = 'block';
            }
            else{
                if(lkn_bbSig.getSig() != e.value){
                    if(confirm(lang.sig_modified)){
                        lkn_bbSig.setSig(e.value);
                        e.style.display = 'none';
                    }
                    else if(confirm(lang.sig_reset)){
                        e.value = lkn_bbSig.getSig();
                        e.style.display = 'none';
                    }
                }
                else e.style.display = 'none';
            }
        };
        lkn_bbSig.auto = function(nw){
            if(typeof nw == 'boolean'){
                setValue('lkn_bbsa'+sigPlace, nw?1:0);
            }
            return getValue('lkn_bbsa'+sigPlace) == 1;
        }
        lkn_bbSig.form_handler = function () {
            if(lkn_bbSig.auto()) lkn_bbSig();
        };
        if(lkn_bbSig.auto() && lkn_bbSig.getSig() == ''){
            lkn_bbSig.auto(false);
            alert(lang.no_sig_auto);
        }
        var btn_insertSig = sig.appendChild(document.createElement("input"));
        btn_insertSig.type = "button";
        btn_insertSig.onclick = lkn_bbSig;
        btn_insertSig.value = lang.sig_insert;
        btn_insertSig.tabIndex = -1;
        var lbl_autoSig = sig.appendChild(document.createElement("label"));
        lbl_autoSig.title = lang.sig_insert_info;
        var cbx_autoSig = lbl_autoSig.appendChild(document.createElement("input"));
        cbx_autoSig.type = "checkbox";
        if (lkn_bbSig.auto()) cbx_autoSig.checked = true;
        cbx_autoSig.addEventListener("click", function (ev) {
            if (lkn_bbSig.getSig() == "" && this.checked) {
                alert(lang.sig_required);
                ev.preventDefault();
            } else {
                lkn_bbSig.auto(this.checked);
            }
            return true;
        }, false);
        cbx_autoSig.tabIndex = -1;
        lbl_autoSig.appendChild(document.createTextNode(" Auto..."));
        var btn_changeSig = sig.appendChild(document.createElement("input"));
        btn_changeSig.type = "button";
        btn_changeSig.value = lang.change_sig;
        btn_changeSig.addEventListener("click", function () {
            lkn_bbSig.editSig(true);
        }, false);
        btn_changeSig.tabIndex = -1;
        var txt_sig = sig.appendChild(document.createElement("textarea"));
        txt_sig.rows = 5;
        txt_sig.cols = 55;
        txt_sig.addEventListener("blur", function () {
            lkn_bbSig.editSig();
        }, false);
        txt_sig.style.display = "none";
        txt_sig.id = "lkn_bbSigedit";
        txt_sig.tabIndex = -1;
        sig.addEventListener(typeof opera == "undefined" ? "keydown" : "keypress", shortcut_handler, true);
    }
    function initTextfield() {
        try {
            if (textfield) {
                textfield.removeEventListener(typeof opera == "undefined" ? "keydown" : "keypress", shortcut_handler, true);
                if (settings.smilies) textfield.removeEventListener("keypress", smileyFunc, true);
                if (settings.sig) textfield.form.removeEventListener("submit", lkn_bbSig.form_handler, false);
            }
            if(!(textfield = BBCodes.target[0])) return;
            self.lkn_twbb_defaultValue = textfield.defaultValue;
            textfield.addEventListener(typeof opera == "undefined" ? "keydown" : "keypress", shortcut_handler, true);
            if (settings.smilies) {
                textfield.addEventListener("keypress", smileyFunc, true);
            }
            if (settings.sig) {
                if (textfield.nextSibling) textfield.parentNode.insertBefore(sig, textfield.nextSibling);
                else textfield.parentNode.appendChild(sig);
                textfield.form.addEventListener("submit", lkn_bbSig.form_handler, false);
            }
        } catch (ex) {
            /* Desculpe, eu quero comentários para erros*/
            alert("Assinatura Forum TW : Ocorreu um erro ao inicializar os campos de texto, por favor denuncie-o para tribalwarsbr100@gmail.com Detalhes: \n" + (ex.message || ex.description || ex) + "\nUA: " + navigator.userAgent);
        }
    }
    initTextfield(BBCodes.target[0]);
    self.lkn_twbb_initTextfield = initTextfield;
    var appendFunc = function (obj, method, code) {
        obj[method] = eval("(" + obj[method].toString().replace(/}$/, ";try{" + code + "}catch(ex){alert('TW BB Code++ caught an error while processing " + obj + "." + method + ", please report to tribalwarsbr100@gmail.com with details:\\nUA: '+navigator.userAgent+'\\n'+(ex.message||ex.description||ex))}}") + ")");
    };
    appendFunc(BBCodes, "setTarget", "self.lkn_twbb_initTextfield();");
    if (typeof VillageInfo != "undefined") {
        appendFunc(VillageInfo, "editNote", "self.lkn_twbb_defaultValue=note;");
    }
});
