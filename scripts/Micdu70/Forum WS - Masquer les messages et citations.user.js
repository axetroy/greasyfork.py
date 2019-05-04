// ==UserScript==
// @name         Forum WS - Masquer les messages et citations
// @namespace    Forum-WS
// @version      1.5.2
// @description  Masquer les messages et les citations d'un ou de plusieurs utilisateur(s) dans le forum WS
// @author       Micdu70
// @match        https://www.wareziens.net/forum/topic-*
// @match        https://www.wareziens.net/forum/viewtopic.php*
// @match        https://www.wareziens.net/forum/search.php*
// @match        https://wareziens.net/forum/topic-*
// @match        https://wareziens.net/forum/viewtopic.php*
// @match        https://wareziens.net/forum/search.php*
// @match        http://www.wareziens.net/forum/topic-*
// @match        http://www.wareziens.net/forum/viewtopic.php*
// @match        http://www.wareziens.net/forum/search.php*
// @match        http://wareziens.net/forum/topic-*
// @match        http://wareziens.net/forum/viewtopic.php*
// @match        http://wareziens.net/forum/search.php*
// @grant        none
// ==/UserScript==

function INIT() {
    // --- Début Configuration du script ---

    // -- Exemple de configuration pour masquer les messages d'un utilisateur --
    //var utilisateur = "nom-utilisateur";
    // -- Exemple de configuration pour masquer les messages de plusieurs utilisateurs --
    //var utilisateur = ["nom-utilisateur1","nom-utilisateur2","nom-utilisateur3"];

    var utilisateur = "changez-moi"; // Configurer le (ou les) nom(s) ici

    // --- Fin Configuration du script ---

    Cacher_Messages(utilisateur);
    Cacher_Quotes(utilisateur);
}

function Cacher_Messages(x) {
    var message = document.getElementsByClassName('postbody');
    for (var i = 0; i < message.length; i++)
    {
        var user = message[i].getElementsByTagName('dt')[0];
        if (user)
        {
            user = user.textContent;
            if (x.indexOf(user) >= 0)
            {
                var content = message[i].getElementsByClassName('postmsg')[0];
                var save_content = content.innerHTML;
                var m_hidden_id = "m_hidden_" + i;
                var message_id = "message_" + i;
                content.innerHTML = "<div id='" + m_hidden_id + "' style=\"display: inline;\"><ul><li><b>Les messages de cet utilisateur sont masqués</b><i> ( passez la souris pour voir le message )</i></li></ul></div>";
                content.innerHTML = content.innerHTML + "<div id='" + message_id + "' style=\"display: none;\">" + save_content + "</div>";
                Script(content,message_id,m_hidden_id);
            }
        }
    }
}

function Cacher_Quotes(x) {
    var quote = document.getElementsByClassName('quotebox');
    for (var j = 0; j < quote.length; j++)
    {
        var quote_content = quote[j].textContent;
        var correctQuote = quote[j].getElementsByTagName('cite')[0];
        var quote_user;
        var re = /(.+?) (a écrit\s?|wrote):.*/;
        if (correctQuote) {
            quote_user = correctQuote.textContent;
            quote_user = quote_user.replace(re, '$1');
        } else {
            quote_user = quote_content.replace(re, '$1');
        }
        if (x.indexOf(quote_user) >= 0)
        {
            var save_quote_content = quote[j].innerHTML;
            var q_hidden_id = "q_hidden_" + j;
            var quote_id = "quote_" + j;
            quote[j].innerHTML = "<div id='" + q_hidden_id + "' style=\"display: inline;\"><ul><li><b>Les citations de '" + quote_user + "' sont masquées</b><i> ( passez la souris pour voir la citation )</i></li></ul></div>";
            quote[j].innerHTML = quote[j].innerHTML + "<div id='" + quote_id + "' style=\"display: none;\">" + save_quote_content + "</div>";
            Script(quote[j],quote_id,q_hidden_id);
        }
    }
}

function Script(block,hidden,visible) {
    hidden = document.getElementById(hidden);
    visible = document.getElementById(visible);
    block.addEventListener("mouseover", function() {
        visible.style.display = "none";
        hidden.style.display = "inline";
    }, false);
    block.addEventListener("mouseout", function() {
        hidden.style.display = "none";
        visible.style.display = "inline";
    }, false);
}

INIT();