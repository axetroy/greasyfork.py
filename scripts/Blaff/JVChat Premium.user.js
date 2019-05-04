// ==UserScript==
// @name           JVChat Premium
// @description    Outil de discussion instantanée pour les forums de Jeuxvideo.com
// @author         Blaff
// @namespace      JVChatPremium
// @version        0.1.37
// @match          http://*.jeuxvideo.com/forums/42-*
// @match          https://*.jeuxvideo.com/forums/42-*
// @match          http://*.jeuxvideo.com/forums/1-*
// @match          https://*.jeuxvideo.com/forums/1-*
// @grant          none
// ==/UserScript==

/*
ROADMAP:
- Smooth transition on append messages (slide-in plutôt que jump)
- Détection captcha
- Bouton actualiser les messages (+ afficher le delai courrant d'actualisation)
- Bouton désactiver JVChat
- Bouton retour liste des sujets
- Notification avec @pseudo
- Blacklist
- Pouvoir voir les anciens messages
- La leftbar ne se rétrécie pas si le titre du topic n'a pas d'espaces
*/

let CSS = `<style type="text/css" id="jvchat-css">
#forum-right-col,
#jv-footer,
#middle,
#zone-sponso,
#header-top,
#full-site,
header.jv-header-menu,
.titre-head-bloc,
.bloc-pre-pagi-forum,
.bloc-message-forum,
.bloc-message-forum-anchor,
.bloc-pagi-default,
.bloc-outils-top,
.bloc-outils-bottom,
.option-previsu,
.bloc-sondage,
.nu-context-menu,
.message-lock-topic,
.form-post-message > .row > div:nth-child(2),
.conteneur-messages-pagi > a:last-of-type,
#bloc-meta-titre-jeu,
#page-messages-forum > .container-content > .row:nth-child(1),
.gameHeaderBanner,
.gameHeaderSubNav
{
    display: none!important;
}

html,
body,
#content,
#content-context,
#page-messages-forum,
#page-messages-forum > .container-content,
#jvchat-main,
#content-forum,
#forum-main-col,
#forum-main-col > .conteneur-messages-pagi
{
    height: 100%;
    width: 100%;
}

.jvchat-hide {
    display: none!important;
}

.jvchat-hide-visibility {
    visibility: hidden;
}

body {
    overflow-y: unset;
}

.jvchat-disabled-form {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
}

#bloc-formulaire-forum > .form-post-message > .row {
    margin: 0;
}

.jv-editor > .conteneur-editor > .text-editor {
    border: 0;
    background: none;
    display: flex!important;
}

#jvchat-alerts {
    position: absolute;
    z-index: 3;
    right: 1rem;
    left: 0;
    overflow-y: hidden;
}

#jvchat-alerts .alert {
    margin: 1rem 2rem;
    border-radius: 0.5rem;
}

#content-context {
    display: flex;
}

#jvchat-leftbar {
    max-width: 15rem;
    flex-grow: 100;
    flex-shrink: 100;
    position: relative;
}

#jvchat-leftbar-button {
    position: absolute;
    right: 0;
    top: 0;
}

#jvchat-leftbar-button span {
    font-size: 1.2rem;
    color: white;
    padding: 0 1rem 0 5rem;
    max-width: 100%;
    cursor: pointer;
    opacity: 0.3;
}

#jvchat-leftbar-button span:hover {
    opacity: 1;
}

#page-messages-forum {
    flex-basis: 50rem;
    flex-grow: 1;
    overflow-x: auto;
    position: relative;
}

#forum-main-col > .conteneur-messages-pagi {
    display: flex;
    flex-direction: column;
}

#page-messages-forum > .container-content {
    padding: 0;
    max-width: unset;
    min-width: unset;
    min-height: unset;
    max-height: unset;
}

.form-post-message {
    margin: 0;
}

#message_topic {
    resize: none;
    min-width: unset;
}

.jvchat-edition-textarea {
    resize: none;
    width: 100%;
    max-height: 6.5rem;
    min-height: 3.5rem;
}

.jvchat-reduced #message_topic {
    padding: 0.3rem;
    height: 1.7rem;
    max-height: 6.5rem;
    overflow: auto;
}

.jvchat-reduced .jv-editor .conteneur-editor > * {
    display: none;
}

#jvchat-buttons-main button {
    padding: 0;
    width: 2rem;
}

#jvchat-buttons-main button::before {
    font-size: 1.4rem;
}

#jvchat-buttons-main button.icon-reply::before {
    font-size: 1rem;
}

.jvchat-buttons {
    display: flex;
    flex-direction: column;
}

.jvchat-buttons button {
    border: 0.0625rem solid #BEBECC;
    border-left-width: 0;
    height: 100%;
    background: white;
    color: gray;
}

.jvchat-buttons .jvchat-button-solo {
    border-radius: 0 0.3rem 0.3rem 0;
}

.jvchat-buttons .jvchat-button-top {
    border-radius: 0 0.3rem 0 0;
}

.jvchat-buttons .jvchat-button-bottom {
    border-radius: 0 0 0.3rem 0;
    border-top: 0!important;
}

.jvchat-textarea {
    border-radius: 0.3rem 0 0 0.3rem!important;
    border: 0.0625rem solid #BEBECC!important;
    border-right-width: 0!important;
}

.jvchat-buttons button:hover {
    background: lightgray;
    color: black;
}

.jvchat-buttons button:focus {
    border: dotted 1px!important;
    color: black;
    border: blue;
}

#content {
    background-image: none;
    margin-top: 0;
}

#content-forum {
    margin: 0;
}

#forum-main-col {
    display: block;
    padding: 0;
    max-width: unset;
}

#jvchat-leftbar > .panel {
    margin: 0;
    padding: 0 0.5rem;
}

#jvchat-leftbar #jvchat-profil .titre-info-fofo {
    margin-top: 0.5rem;
}

#jvchat-leftbar .titre-info-fofo {
    margin-top: 1rem;
}

.jvchat-message {
    display: flex;
    margin-bottom: 0.35rem;
}

.jvchat-bloc-message {
    animation-duration:0.5s;
    animation-name: slidein;
}

@keyframes slidein {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.jvchat-toolbar {
    margin: 0 0 .3rem 0;
}

.jvchat-author {
    margin: 0;
    display: inline-block;
}

.jvchat-tooltip {
    display: flex;
    float: right;
    color: gray;
}

.jvchat-picto {
    margin-right: 0.3rem;
    visibility: hidden;
}

.jvchat-bloc-message:hover .jvchat-picto {
    visibility: visible;
    cursor: pointer;
    opacity: 0.25;
}

.jvchat-picto:hover {
    opacity: 1!important;
}

.jvchat-edition {
    display: flex;
}

.jvchat-edition-check {
    color: darkgreen!important;
}

.jvchat-edition-cancel {
    color: darkred!important;
}

.jvchat-edition-textarea {
    width: 100%;
}

hr.jvchat-ruler:first-of-type {
    margin-top: auto;
}

.jvchat-ruler {
    margin: 0rem 0rem .35rem 0rem;
    border-style: solid inset inset inset;
    border-width: 0.0625rem;
    border-block-end-color: #ddd;
}

#jvchat-ruler-new {
    border-bottom: 1px outset gray;
}

.jvchat-bloc-author-content {
    overflow: hidden;
    width: 100%;
    margin-left: .875rem;
}

.jvchat-content > .txt-msg > p:last-of-type {
    margin-bottom: 0;
}

.jvchat-content > .txt-msg p {
    margin-bottom: 0.2rem;
}

.jvchat-content > .txt-msg .blockquote-jv {
    margin: 0.2rem 0;
    padding: 0rem 0.3rem 0 0.3rem;
}

.jvchat-content > .txt-msg > .blockquote-jv > .blockquote-jv:not([data-visible="1"]) {
    padding: 0.7rem 0;
}

.jvchat-rounded {
    overflow: hidden;
    border-radius: 50%;
    background-size:     cover;
    background-repeat:   no-repeat;
    background-position: center center;
}

.jvchat-bloc-avatar {
    min-width: 40px;
    min-height: 40px;
    width: 40px;
    height: 40px;
    box-shadow: -3px 3px 7px grey;
}

#jvchat-user-avatar-link {
    width: 60%;
    min-width: 3rem;
    min-height: 3rem;
    margin: auto;
}

.jvchat-user-avatar {
    width: 100%;
    padding-top: 100%;
}

.jvchat-content .img-shack {
    height: 39px;
    width: 52px;
    display: inline-block;
    vertical-align: bottom;
    margin-bottom:0.27rem;
    overflow: hidden;
}

.jvchat-content .img-stickers {
    max-height: 39px;
    min-height: 39px;
    width: auto;
    display: inline-block;
    vertical-align: bottom;
    margin-bottom:0.1rem;
}

#jvchat-main .bloc-spoil-jv .open-spoil {
    position: unset;
    display: none;
}

#jvchat-user-mp {
    font-size: 1.3rem;
    margin: auto;
}

.new-stickers {
    background-color: unset;
}

#jvchat-user-notif {
    font-size: 1.7rem;
    margin: auto;
}

#jvchat-user-pseudo {
    margin: 0.5rem;
    text-align: center;
    overflow-x: hidden;
}

#jvchat-user-info {
    display: flex;
}

#jvchat-user-info .jv-header-menu {
    position: unset;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: auto;
}

#jvchat-topic-link {
    color: white;
}

#jvchat-topic-info {
    display: flex;
    flex-direction: column;
}

#jvchat-topic-nb-connected {
    color: lightgray;
}

#jvchat-topic-nb-messages {
    color: lightgray;
}

#bloc-formulaire-forum .jv-editor > .conteneur-editor {
    margin: 0;
    border: 0;
    padding: 0.5rem;
    line-height: normal;
}

#jvchat-main {
    overflow-y: auto;
    padding: 0.35rem 0.875rem;
    display: flex;
    flex-direction: column;
    min-width: 13rem;
}

#jvchat-leftbar > .panel-jv-forum {
    height: 100%;
    overflow-y: auto;
}

#jvchat-leftbar.jvchat-leftbar-reduced {
    flex-grow: 0;
}

#jvchat-leftbar.jvchat-leftbar-reduced > .panel > .panel-body {
    display: none;
}

#jvchat-leftbar.jvchat-leftbar-reduced #jvchat-leftbar-button {
    position: relative;
}

#jvchat-leftbar.jvchat-leftbar-reduced span {
    padding: 0;
}

#jvchat-leftbar > .panel {
    position: relative;
}

.disabled-content {
    opacity: 0.3;
    cursor: not-allowed;
    pointer-events: none;
}

#jvchat-turbo {
    display: inline-block;
    cursor: pointer;
    margin-top: 0.3rem;
    -webkit-tap-highlight-color: transparent;
    position: relative;
}

#jvchat-turbo i {
    position: relative;
    display: inline-block;
    margin-right: .5rem;
    width: 46px;
    height: 26px;
    background-color: #e6e6e6;
    border-radius: 23px;
    vertical-align: text-bottom;
    transition: all 0.3s linear;
}

#jvchat-turbo i::before {
    content: "";
    position: absolute;
    left: 0;
    width: 42px;
    height: 22px;
    background-color: #fff;
    border-radius: 11px;
    transform: translate3d(2px, 2px, 0) scale3d(1, 1, 1);
    transition: all 0.25s linear;
}

#jvchat-turbo i::after {
    content: "";
    position: absolute;
    left: 0;
    width: 22px;
    height: 22px;
    background-color: #fff;
    border-radius: 11px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.24);
    transform: translate3d(2px, 2px, 0);
    transition: all 0.2s ease-in-out;
}

#jvchat-turbo:active i::after {
    width: 28px;
    transform: translate3d(2px, 2px, 0);
}

#jvchat-turbo:active input:checked + i::after {
    transform: translate3d(16px, 2px, 0);
}

#jvchat-turbo input {
    display: none;
}

#jvchat-turbo input:checked + i {
    background-color: #4BD763;
}

#jvchat-turbo input:checked + i::before {
    transform: translate3d(18px, 2px, 0) scale3d(0, 0, 0);
}

#jvchat-turbo input:checked + i::after {
    transform: translate3d(22px, 2px, 0);
}

#jvchat-turbo-span {
    position: absolute;
    margin-top: 4px;
}
</style>`;

let PANEL = `
<div id='jvchat-leftbar'>
    <div class='panel panel-jv-forum'>
        <div id="jvchat-leftbar-button">
            <span id="jvchat-leftbar-reduce" class="icon-arrow-left" title="Masquer la sidebar"></span>
            <span id="jvchat-leftbar-extend" class="icon-arrow-right jvchat-hide" title="Afficher la sidebar"></span>
        </div>
        <div class='panel-body'>
            <div id='jvchat-profil' class='jvchat-hide'>
                <h4 class='titre-info-fofo'>Profil</h4>
                <h4 id='jvchat-user-pseudo'></h4>
                <div id='jvchat-user-info'>
                    <a title="Ouvrir le profil" id="jvchat-user-avatar-link" target="_blank"><div id='jvchat-user-avatar' class='jvchat-rounded jvchat-user-avatar'></div></a>
                    <div class='jv-header-menu'>
                        <a target="_blank" href="http://www.jeuxvideo.com/messages-prives/boite-reception.php" title="Ouvrir la boîte de réception" id="jvchat-user-mp-link"><span id="jvchat-user-mp" class="jv-account-number-mp" data-val="0"></span></a>
                        <a target="_blank" title="Ouvrir les notifications" href="http://www.jeuxvideo.com/messages-prives/boite-reception.php" id="jvchat-user-notif-link"><span id="jvchat-user-notif" class="jv-account-number-notif" data-val="0"></span></a>
                    </div>
                </div>
            </div>
            <div id='jvchat-topic'>
                <h4 class='titre-info-fofo'>Topic</h4>
                <div id="jvchat-topic-info">
                    <div><strong><a title="Ouvrir le topic" id="jvchat-topic-title"></a></strong></div>
                    <span id="jvchat-topic-nb-connected"></span>
                    <span id="jvchat-topic-nb-messages"></span>
                    <label id="jvchat-turbo" title="Actualise la liste des messages plus rapidement">
                        <input id="jvchat-turbo-checkbox" type="checkbox">
                        <i></i>
                        <span id="jvchat-turbo-span">Mode Turbo</span>
                    </label>
                </div>
            </div>
            <div id='jvchat-forum'>
                <h4 class='titre-info-fofo'>Forum</h4>
                <div id="jvchat-forum-info">
                    <div><strong><a title="Ouvrir le forum" id="jvchat-forum-title"></a></strong></div>
                </div>
            </div>
        </div>
    </div>
</div>
`;

function getForm(doc) {
    return doc.getElementsByClassName('form-post-message')[0];
}

function getHash(doc) {
    let hash = doc.querySelector("#ajax_hash_liste_messages")
    if (!hash) {
        return undefined;
    }
    return hash.getAttribute("value");
}

let freshHash = getHash(document);
let freshForm = getForm(document);
let firstMessageId = undefined;
let allMessagesId = {};
let userConnected = undefined;
let updateIntervals = [2, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 10, 10, 10, 10, 10, 10, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 30, 30, 30, 30, 30, 30, 30, 30, 60];
let transisitions   = [0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,  3,  3,  3,  3,  3,  3, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 19, 19, 19, 19, 19, 19, 19, 19, 31];
let updateIntervalIdx = 0;
let updateIntervalMax = updateIntervals.length - 1;
let isLocked = false;
let isError = false;
let isReduced = true;
let storageKey = "jvchat-premium-default-reduced";
let nbNewMessage = 0;
let favicon = makeFavicon();
let currentUser = {notif: undefined, mp: undefined, author: undefined, avatar: undefined};
let currentTopicTitle = undefined;
let turboActivated = false;
let currentLastPage = 1;
let shouldCheckEdited = false;
let checkEditInterval = 30000;
let postingMessage = false;

function getTopicLocked(elem) {
    let lock = elem.getElementsByClassName("message-lock-topic")[0];
    if (lock === undefined) {
        return lock;
    }
    let reason = lock.getElementsByTagName("span")[0].textContent.trim();
    return `Le topic a été vérouillé pour la raison suivante : "${reason}"`;
}

function getTopicError(elem) {
    let error = elem.getElementsByClassName("img-erreur")[0];
    if (error === undefined) {
        return error;
    }
    return `Le topic présente une erreur: ${error.getAttribute("alt")}`;
}

function tryCatch(func) {
    function wrapped(optArg) {
        try {
            func(optArg);
        } catch(err) {
            let message = `Une erreur est survenue dans JVChat Premium: '${err.message}' (line ${err.lineNumber})`;
            console.error(message);
            try {
                addAlertbox("danger", message);
            } catch(e) {
                alert(message);
            }
        }
    }
    return wrapped;
}

function toggleTextarea() {
    isReduced = !isReduced;
    localStorage.setItem(storageKey, isReduced);

    let isDown = isScrollDown();
    document.getElementById("bloc-formulaire-forum").getElementsByClassName("jv-editor-toolbar")[0].classList.toggle("jvchat-hide");
    document.getElementById("jvchat-enlarge").classList.toggle("jvchat-hide");
    document.getElementById("jvchat-reduce").classList.toggle("jvchat-hide");
    document.getElementById("jvchat-post").classList.toggle("jvchat-hide");
    document.getElementById("bloc-formulaire-forum").classList.toggle("jvchat-reduced");

    setTextareaHeight();

    if (isDown) {
        setScrollDown();
    }
}

function parseURL(url) {
    let regex = /^(.*?)(\/\d+-\d+-\d+-)(\d+)(-\d+-\d+-\d+-)(.*?)(\.htm)(.*)$/i;
    let [_, domain, ids, page, nums, title, htm, anchor] = url.match(regex);
    return {domain: domain, ids: ids, page: page, nums: nums, title: title, htm: htm, anchor: anchor};
}

function buildURL(dict) {
    return `${dict.domain}${dict.ids}${dict.page}${dict.nums}${dict.title}${dict.htm}${dict.anchor}`;
}

function getForum(document) {
    let ariane = document.getElementsByClassName("bloc-fil-ariane-crumb-forum")[0];
    let links = ariane.getElementsByTagName("a");
    let title = "";
    let forumLink = "";

    for (let i = links.length - 1; i >= 0; i--) {
        forumLink = links[i];
        title = forumLink.innerHTML.trim();
        if (title.startsWith("Forum ")) {
            break;
        }
    }

    return {href: forumLink.getAttribute("href"), title: title.replace("Forum ", "")};
}

function getLastPage(document) {
    let blocPages = document.getElementsByClassName("bloc-liste-num-page")[0];
    let spans = blocPages.getElementsByTagName("span");
    let lastPage = 1;
    for (let span of spans) {
        let page = parseInt(span.textContent.trim());
        if (!isNaN(page) && page > lastPage) {
            lastPage = page;
        }
    }
    return lastPage;
}

function parseMessage(elem) {
    let conteneurs = elem.getElementsByClassName("conteneur-message");
    let conteneur = conteneurs[conteneurs.length - 1];
    let blacklisted = conteneurs[0].classList.contains("conteneur-message-blacklist");
    let author = conteneur.getElementsByClassName("bloc-pseudo-msg")[0].textContent.trim();
    let avatar = conteneur.getElementsByClassName("user-avatar-msg")[0];
    if (avatar !== undefined) {
        avatar = avatar.getAttribute("data-srcset");
    }
    let date = conteneur.getElementsByClassName("bloc-date-msg")[0].textContent.trim();
    let content = conteneur.getElementsByClassName("text-enrichi-forum")[0];
    fixMessage(content);
    improveImages(content);
    let id = parseInt(elem.getAttribute("data-id"));
    let edited = elem.getElementsByClassName("info-edition-msg")[0];
    if (edited !== undefined) {
        let msgEdited = edited.textContent.trim();
        edited = msgEdited.match(/Message édité le .*? à (.*?) par/i)[1];
    }
    return {author: author, date: date, avatar: avatar, edited: edited,
            id: id, content: content, blacklisted: blacklisted};
}

function parseUserInfo(elem) {
    let mpBox = elem.getElementsByClassName("jv-account-number-mp")[0];
    if (mpBox === undefined) {
        return {author: undefined, avatar: undefined, mp: undefined, notif: undefined};
    }
    let notifBox = elem.getElementsByClassName("jv-account-number-notif")[0];
    let avatarBox = elem.getElementsByClassName("account-avatar-box")[0];
    let authorBox = elem.getElementsByClassName("account-pseudo")[0];
    let mp = parseInt(mpBox.getAttribute("data-val"));
    let notif = parseInt(notifBox.getAttribute("data-val"));
    let avatar = avatarBox.style["background-image"].slice(5, -2).replace("/avatar-md/", "/avatar/");
    let author = authorBox.textContent.trim();
    return {author: author, avatar: avatar, mp: mp, notif: notif};
}

function parseTopicInfo(elem) {
    let title = elem.querySelector("#bloc-title-forum").textContent.trim();
    let connected = parseInt(elem.getElementsByClassName("nb-connect-fofo")[0].textContent.trim());
    let lastPage = getLastPage(elem);
    let pageActive = elem.getElementsByClassName("page-active")[0];
    let page = 1;
    if (pageActive !== undefined) {
        page = parseInt(pageActive.textContent.trim());
    }
    return {title: title, connected: connected, lastPage: lastPage, page: page};
}

function fixMessage(elem) {
    let jvcares = Array.from(elem.getElementsByClassName("JvCare"));
    for (let jvcare of jvcares) {
        let a = document.createElement("a");
        a.setAttribute("target", "_blank");
        a.setAttribute("href", jvCake(jvcare.getAttribute("class")));
        a.innerHTML = jvcare.innerHTML;
        jvcare.outerHTML = a.outerHTML;
    }
}

function jvCake(cls) {
  let base16 = '0A12B34C56D78E9F', lien = '', s = cls.split(' ')[1];
  for (let i = 0; i < s.length; i += 2) {
    lien += String.fromCharCode(base16.indexOf(s.charAt(i)) * 16 + base16.indexOf(s.charAt(i + 1)));
  }
  return lien;
}

function improveImages(elem) {
    let imagesShack = elem.getElementsByClassName("img-shack");
    for (let image of imagesShack) {
        let src = image.src;
        let parent = image.parentNode;
        let extension = parent.href.split(".").pop();
        let direct = src.replace(/(.*?)\/minis\/(.*)\.\w+/i, "$1/fichiers/$2." + extension);
        parent.href = direct;
        if (extension.toUpperCase() === "GIF") {
            image.src = direct;
        }
        src = image.src;
        image.setAttribute("jvchat-retry", 3);
        image.addEventListener("error", tryCatch(function(e) {
            e.preventDefault();
            let retry = parseInt(image.getAttribute("jvchat-retry"));
            let target = e.target.src;
            if (retry === 0) {
                return;
            }
            image.setAttribute("jvchat-retry", retry - 1);
            setTimeout(tryCatch(function() {
                image.setAttribute("src", src + "#" + new Date().getTime())
            }), 10000)
        }));
    }
}

function clearPage(document) {
    let buttons = `
        <div id="jvchat-buttons-main" class='jvchat-buttons'>
            <button id='jvchat-post' tabindex="4" type="button" class='jvchat-hide jvchat-button-top icon-reply' title="Envoyer le message"></button>
            <button id='jvchat-reduce' tabindex="5" type="button" class='jvchat-hide jvchat-button-bottom icon-arrow-down-entypo' title="Réduire la zone de texte"></button>
            <button id='jvchat-enlarge' tabindex="4" type="button" class='jvchat-button-solo icon-arrow-up-entypo' title="Agrandir la zone de texte"></button>
        <div>`;

    document.head.insertAdjacentHTML("beforeend", CSS);

    let previsu = document.getElementById("bloc-formulaire-forum").getElementsByClassName("previsu-editor")[0];
    if (previsu) {
        previsu.parentElement.removeChild(previsu);
    }

    let messageTopic = document.getElementById("message_topic");
    if (messageTopic) {
        messageTopic.classList.add("jvchat-textarea");
        messageTopic.setAttribute("placeholder", "Hop hop hop, le message ne va pas s'écrire tout seul !");
        messageTopic.insertAdjacentHTML("afterend", buttons);
        messageTopic.addEventListener("keydown", tryCatch(postMessageIfEnter));
        document.getElementById("jvchat-post").addEventListener("click", tryCatch(postMessage));
        document.getElementById("jvchat-enlarge").addEventListener("click", tryCatch(toggleTextarea));
        document.getElementById("jvchat-reduce").addEventListener("click", tryCatch(toggleTextarea));
    }
    document.getElementsByClassName("conteneur-messages-pagi")[0].insertAdjacentHTML("afterbegin", "<div id='jvchat-main'><hr class='jvchat-ruler'></div>");
    document.getElementById("page-messages-forum").insertAdjacentHTML("afterbegin", "<div id='jvchat-alerts'><div id='jvchat-fixed-alert' class='jvchat-hide'><div class='alert-row'></div></div></div>");

    document.getElementById("content-context").insertAdjacentHTML("afterbegin", PANEL);

    document.getElementById("bloc-formulaire-forum").classList.add("jvchat-reduced");
    document.getElementById("bloc-formulaire-forum").classList.add("jvchat-hide");

    let toolbar =  document.getElementById("bloc-formulaire-forum").getElementsByClassName("jv-editor-toolbar")[0];
    if (toolbar) {
        toolbar.classList.add("jvchat-hide");
    }

    document.getElementById("jvchat-main").addEventListener("click", tryCatch(dontScrollOnExpand));

    document.getElementById("jvchat-alerts").addEventListener("click", tryCatch(closeAlert));

    document.getElementById("jvchat-leftbar-reduce").addEventListener("click", tryCatch(toggleSidebar));
    document.getElementById("jvchat-leftbar-extend").addEventListener("click", tryCatch(toggleSidebar));

    document.getElementById("jvchat-turbo-checkbox").addEventListener("change", tryCatch(toggleTurbo));

    let favs = Array.from(document.querySelectorAll("link[rel='icon'], link[rel='shortcut icon']"));
    for (let fav of favs) {
        fav.parentElement.removeChild(fav);
    }
    setFavicon("");

    document.addEventListener("visibilitychange", function() {
        let hidden = document.hidden;
        if (hidden) {
            let newHr = document.getElementById("jvchat-ruler-new");
            if (newHr) {
                newHr.removeAttribute("id");
            }
            nbNewMessage = 0;
        } else if (!isError && !isLocked) {
            setFavicon("");
        }
      });
}

function toggleSidebar(event) {
    let isDown = isScrollDown();
    document.getElementById("jvchat-leftbar-extend").classList.toggle("jvchat-hide");
    document.getElementById("jvchat-leftbar-reduce").classList.toggle("jvchat-hide");
    document.getElementById("jvchat-leftbar").classList.toggle("jvchat-leftbar-reduced");
    if (isDown) {
        setScrollDown();
    }
}

function toggleTurbo(event) {
    let checked = document.getElementById("jvchat-turbo-checkbox").checked;
    updateIntervalIdx = 0;
    if (!checked) {
        turboActivated = false;
    } else {
        turboActivated = true;
    }
}

function closeAlert(event) {
    let target = event.target;
    if (!target) {
        return;
    }
    if (target.classList.contains("jvchat-alert-close")) {
        let parent = target.parentElement;
        parent.parentElement.removeChild(parent);
    }
}

function postMessage() {
    if (freshForm === undefined) {
        addAlertbox("danger", "Impossible de poster le message, aucun formulaire trouvé");
        return;
    }

    let textarea = document.getElementById("message_topic");

    let formData = serializeForm(freshForm);
    formData["message_topic"] = textarea.value;
    let formulaire = document.getElementById("bloc-formulaire-forum");

    formulaire.classList.add("jvchat-disabled-form");
    textarea.setAttribute("disabled", "true");

    function onSuccess(res) {
        formulaire.classList.remove("jvchat-disabled-form");
        textarea.removeAttribute("disabled");
        let alert = parsePage(res).alert;
        if (!alert) {
            textarea.value = "";
        }
        setTextareaHeight();
        setScrollDown();
        postingMessage = false;
    }

    function onError(err) {
        addAlertbox("danger", err);
        formulaire.classList.remove("jvchat-disabled-form");
        textarea.removeAttribute("disabled");
        postingMessage = false;
    }

    function onTimeout(err) {
        addAlertbox("warning", err);
        formulaire.classList.remove("jvchat-disabled-form");
        textarea.removeAttribute("disabled");
        postingMessage = false;
    }

    let timeout = 20000;
    if (turboActivated) {
        timeout = 5000;
    }

    postingMessage = true;
    request("POST", document.URL, onSuccess, onError, onTimeout, makeFormData(formData), false, timeout);
}

function editMessage(bloc) {
    let textarea = bloc.getElementsByClassName("jvchat-edition-textarea")[0];
    let form = bloc.getElementsByTagName("form")[0];

    let blocEdition = bloc.getElementsByClassName("jvchat-edition")[0];
    let formData = JSON.parse(blocEdition.getAttribute("data-form"));
    formData["message_topic"] = textarea.value;
    formData["id_message"] = bloc.getAttribute("jvchat-id");
    formData["ajax_hash"] = freshHash;
    formData["action"] = "post";
    let edition = bloc.getElementsByClassName("jvchat-edition")[0];

    edition.classList.add("jvchat-disabled-form");
    textarea.setAttribute("disabled", "true");

    function onSuccess(res) {
        edition.classList.remove("jvchat-disabled-form");
        if (res['reset_form']) {
            let reset = document.createElement("html");
            reset.innerHTML = res["hidden_reset"];
            let resetData = serializeForm(reset);
            for (let key in resetData) {
                formData[key] = resetData[key];
            }
            blocEdition.setAttribute("data-form", JSON.stringify(formData));
        }

        textarea.removeAttribute("disabled");
        if (res.erreur.length > 0) {
            for (let err of res.erreur) {
                addAlertbox("danger", err);
            }
            return;
        }
        let dom = document.createElement("html");
        dom.innerHTML = res["html"];
        let message = getMessages(dom)[0];
        addMessages([message], true);
    }

    function onError(err) {
        addAlertbox("danger", err);
        edition.classList.remove("jvchat-disabled-form");
        textarea.removeAttribute("disabled");
    }

    function onTimeout(err) {
        addAlertbox("warning", err);
        edition.classList.remove("jvchat-disabled-form");
        textarea.removeAttribute("disabled");
    }

    let url = "http://www.jeuxvideo.com/forums/ajax_edit_message.php";

    request("POST", url, onSuccess, onError, onTimeout, makeFormData(formData), true, 20000);
}

function requestEdit(bloc) {
    if (!bloc.getElementsByClassName("jvchat-edition")[0].classList.contains("jvchat-hide")) {
        return;
    }

    let contentClasses = bloc.getElementsByClassName("jvchat-content")[0].classList;
    contentClasses.add("disabled-content");

    function onSuccess(res) {
        contentClasses.remove("disabled-content");
        if (res.erreur.length > 0) {
            for (let err of res.erreur) {
                addAlertbox("danger", err);
            }
            return;
        }
        let dom = document.createElement("html");
        dom.innerHTML = res["html"];
        let textarea = dom.getElementsByTagName("textarea")[0]
        let txt = textarea.value;
        textarea.parentElement.removeChild(textarea);
        let form = dom.getElementsByTagName("form")[0];
        let formData = serializeForm(form);
        let editionBloc = bloc.getElementsByClassName("jvchat-edition")[0];
        editionBloc.setAttribute("data-form", JSON.stringify(formData));
        let height = computeHeight(countLines(txt));
        let isDown = isScrollDown();
        bloc.getElementsByClassName("jvchat-edition-textarea")[0].value = txt;
        bloc.getElementsByClassName("jvchat-edition-textarea")[0].style["height"] = `${height}rem`;
        bloc.getElementsByClassName("jvchat-content")[0].classList.add("jvchat-hide");
        editionBloc.classList.remove("jvchat-hide");
        if (isDown) {
            setScrollDown();
        }
    }

    function onError(err) {
        addAlertbox("danger", err);
        contentClasses.remove("disabled-content");
    }

    function onTimeout(err) {
        addAlertbox("warning", err);
        contentClasses.remove("disabled-content");
    }

    let id = bloc.getAttribute("jvchat-id");
    let url = `http://www.jeuxvideo.com/forums/ajax_edit_message.php?id_message=${id}&ajax_hash=${freshHash}&action=get`;
    request("GET", url, onSuccess, onError, onTimeout, undefined, true, 5000);
}

function countLines(text) {
    return text.split(/\r|\r\n|\n/).length;
}

function computeHeight(lines) {
    return 1 * lines + 0.6;
}

function setTextareaHeight(plusOne) {
    let textarea = document.getElementById("message_topic");
    if (!isReduced) {
        textarea.style["height"] = "";
        return;
    }
    plusOne = !!plusOne;
    let lines = countLines(textarea.value);

    if (!plusOne && lines === 1) {
        textarea.style["height"] = "";
        return;
    }

    if (plusOne) {
        lines += 1;
    }

    let height = computeHeight(lines);
    textarea.style["height"] = `${height}rem`;
}

function postMessageIfEnter(event) {
    if (isReduced && (event.which == 13 || event.keyCode == 13)) {
        if (event.shiftKey) {
            let isDown = isScrollDown();
            setTextareaHeight(true);
            if (isDown) {
                setScrollDown();
            }
        } else {
            event.preventDefault();
            postMessage();
        }
    }
}

function serializeForm(form) {
    // Useless actually, just use new FormData(form)
    let dict = {};

    for (let select of form.getElementsByTagName("select")) {
        dict[select.name] = select.querySelector("option[selected]").value;
    }

    for (let input of form.getElementsByTagName("input")) {
        dict[input.name] = input.value;
    }

    for (let textarea of form.getElementsByTagName("textarea")) {
        dict[textarea.name] = textarea.value;
    }

    return dict;
}

function makeFormData(dict) {
    var formData = new FormData();
    for (let key in dict) {
        formData.append(key, dict[key]);
    }
    return formData;
}

function getMessages(document) {
    let blocMessages = document.getElementsByClassName("bloc-message-forum");
    let messages = [];
    for (let bloc of blocMessages) {
        messages.push(parseMessage(bloc));
    }
    return messages;
}

function makeMessage(message) {
    let id = message.id;
    let avatar = message.avatar;
    let date = message.date;
    let toQuoteDate = date;
    let titleDate = date;
    let textDate = date.slice(-8);
    if (message.edited !== undefined) {
        textDate += "*";
        titleDate += ` (édité à ${message.edited})`;
    }
    let exists = avatar !== undefined;
    let author = exists ? message.author : `<i>${message.author}</i>`;
    let authorHref = exists ? `href="http://www.jeuxvideo.com/profil/${author.toLowerCase()}?mode=infos"` : "";
    let authorTitle = exists ? `title="Ouvrir le profil de ${author}"` : "";
    let authorAvatarHidden = exists ? "": "class='jvchat-hide-visibility'";
    let editionSpan = '<span class="jvchat-edit jvchat-picto picto-msg-crayon" title="Modifier"></span>';
    let edition = (currentUser.author === undefined) || (message.author.toLowerCase() !== currentUser.author.toLowerCase()) ? "" : editionSpan;
    let html =
        `<div class="jvchat-bloc-message">
            <div class="jvchat-message" jvchat-id=${id}>
                <div>
                    <a ${authorAvatarHidden} ${authorHref} target="_blank" ${authorTitle}>
                        <div class="jvchat-bloc-avatar jvchat-rounded" style="background-image: url(${avatar})"></div>
                    </a>
                </div>
                <div class="jvchat-bloc-author-content">
                    <div class="jvchat-toolbar">
                        <h5 class="jvchat-author">${author}</h5>
                        <div class="jvchat-tooltip">
                            ${edition}
                            <span class="jvchat-picto jvchat-quote picto-msg-quote" title="Citer"></span>
                            <small class="jvchat-date" to-quote="${toQuoteDate}" title="${titleDate}">${textDate}</small>
                        </div>
                    </div>
                    <div class="jvchat-content">${message.content.outerHTML}</div>
                    <div class="jvchat-edition jvchat-hide">
                        <textarea class="jvchat-edition-textarea jvchat-textarea"></textarea>
                        <div class="jvchat-buttons">
                            <button tabindex="0" type="button" class='jvchat-edition-check icon-check-jv jvchat-button-top' title="Valider la modification"></button>
                            <button tabindex="0" type="button" class='jvchat-edition-cancel icon-cancel-circle jvchat-button-bottom' title="Annuler la modification"></button>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="jvchat-ruler">
        </div>`;
    return html;
}

function parseDate(string) {
    let eng = string.toLowerCase()
        .replace("janvier", "january")
        .replace("février", "february")
        .replace("mars", "march")
        .replace("avril", "april")
        .replace("mai", "may")
        .replace("juin", "june")
        .replace("juillet", "july")
        .replace("août", "august")
        .replace("septembre", "september")
        .replace("octobre", "october")
        .replace("novembre", "november")
        .replace("décembre", "december")
        .replace(" à ", " ");
    return new Date(eng);
}

function addMessages(messages, editing) {
    editing = !!editing;
    let main = document.getElementById("jvchat-main");
    let hasNewMessages = false;
    let init = true;
    let toInsert = "";
    for (let message of messages) {
        if (init === true && !editing) {
            init = false;
            let date = parseDate(message.date);
            let now = new Date();
            let delta = now - date;
            if (delta > 5 * 60 * 1000 + checkEditInterval) {
                shouldCheckEdited = false;
            } else {
                shouldCheckEdited = true;
            }
        }

        if (message.blacklisted) {
            continue;
        }
        let id = message.id;
        if (firstMessageId === undefined) {
            firstMessageId = id;
        }
        let referenced = allMessagesId.hasOwnProperty(id);
        let edited = message.edited;
        if (id < firstMessageId || (referenced && allMessagesId[id] === edited)) {
            continue;
        }

        let newBloc = makeMessage(message);
        allMessagesId[id] = edited;

        if (referenced) {
            let selector = `.jvchat-message[jvchat-id="${id}"]`;
            let oldBloc = main.querySelector(selector).closest(".jvchat-bloc-message");
            let isDown = isScrollDown();
            oldBloc.outerHTML = newBloc;
            if (isDown) {
                setScrollDown();
            }
            continue;
        }

        hasNewMessages = true;
        if (nbNewMessage === 0 && document.hidden) {
            let hrs = document.getElementsByClassName("jvchat-ruler");
            let lastHr = hrs[hrs.length - 1];
            lastHr.setAttribute("id", "jvchat-ruler-new");
        }

        toInsert += newBloc;
        nbNewMessage++;
    }

    if (toInsert !== "") {
        let isDown = isScrollDown();
        main.insertAdjacentHTML("beforeend", toInsert);
        if (isDown) {
            setScrollDown();
        }
    }

    if (editing) {
        return;
    }

    if (isScrollDown()) {
        let blocMessages = main.getElementsByClassName("jvchat-bloc-message");
        let nb = blocMessages.length;
        if (nb > 100) {
            for (let i = 0; i < nb - 100; i++) {
                main.removeChild(blocMessages[0]);
            }
            setScrollDown();
        }
    }

    if (hasNewMessages) {
        if (!turboActivated) {
            decreaseUpdateInterval();
        }
        if (document.hidden) {
            setFavicon(nbNewMessage > 99 ? 99 : nbNewMessage);
        }
    } else {
        if (!turboActivated) {
            increaseUpdateInterval();
        }
    }
}

function setUser(document, user) {
    let isConnected = (user.author !== undefined);

    if (isConnected) {
        if (user.author !== currentUser.author) {
            let pseudo = document.getElementById("jvchat-user-pseudo");
            pseudo.innerHTML = user.author;
            let avatarLink = document.getElementById("jvchat-user-avatar-link");
            let notifLink = document.getElementById("jvchat-user-notif-link");
            avatarLink.setAttribute("href", `http://www.jeuxvideo.com/profil/${user.author.toLowerCase()}?mode=infos`);
            notifLink.setAttribute("href", `http://www.jeuxvideo.com/profil/${user.author.toLowerCase()}?mode=abonnements`);
        }

        if (user.avatar !== currentUser.avatar) {
            let avatar = document.getElementById("jvchat-user-avatar");
            avatar.style["background-image"] = `url("${user.avatar}")`;
        }

        if (user.mp !== currentUser.mp) {
            let mp = document.getElementById("jvchat-user-mp");
            mp.setAttribute("data-val", user.mp);
            if (user.mp > 0) {
                mp.classList.add("has-notif");
            } else {
                mp.classList.remove("has-notif");
            }
        }

        if (user.notif !== currentUser.notif) {
            let notif = document.getElementById("jvchat-user-notif");
            notif.setAttribute("data-val", user.notif);
            if (user.notif > 0) {
                notif.classList.add("has-notif");
            } else {
                notif.classList.remove("has-notif");
            }
        }
    }

    if ((userConnected === undefined && isConnected) || (userConnected !== undefined && isConnected !== userConnected)) {
        document.getElementById("jvchat-profil").classList.toggle("jvchat-hide");
        let isDown = isScrollDown();
        document.getElementById("bloc-formulaire-forum").classList.toggle("jvchat-hide");
        if (isDown) {
            setScrollDown();
        }
    }

    if (userConnected !== undefined) {
        if (isConnected && !userConnected) {
            addAlertbox("success", "Vous êtes désormais connecté");
        } else if (!isConnected && userConnected) {
            addAlertbox("warning", "Vous avez été déconnecté");
        }
    }

    userConnected = isConnected;
    currentUser = user;
}

function setTopicTitle(document, topicTitle) {
    if (topicTitle !== currentTopicTitle) {
        currentTopicTitle = topicTitle;
        document.getElementById("jvchat-topic-title").innerHTML = topicTitle;
    }
}

function setTopicNbConnected(document, nbConnected) {
    let txt = `${nbConnected} connectés`;
    if (!(nbConnected > 1)) {
        if (nbConnected === undefined) {
            txt = "? connectés";
        } else {
            txt = txt.slice(0, -1);
        }
    }
    document.getElementById("jvchat-topic-nb-connected").innerHTML = txt;
}

function setTopicNbMessages(document, nbMessages) {
    let txt = `${nbMessages} messages`;
    if (!(nbMessages > 1)) {
        if (nbMessages === undefined) {
            txt = "? messages";
        } else {
            txt = txt.slice(0, -1);
        }
    }
    document.getElementById("jvchat-topic-nb-messages").innerHTML = txt;
}

function triggerJVChat() {
    let topicUrl = document.URL;
    let topic = parseTopicInfo(document);
    let user = parseUserInfo(document);
    let url = parseURL(topicUrl);
    let urlEdited = parseURL(topicUrl);

    clearPage(document);

    setUser(document, user);
    setTopicTitle(document, topic.title);
    setTopicNbMessages(document, undefined);
    setTopicNbConnected(document, topic.connected);

    url.page = 1;
    url.anchor = "";
    document.getElementById("jvchat-topic-title").setAttribute("href", buildURL(url));

    let forum = getForum(document);
    let forumSide = document.getElementById("jvchat-forum-title");
    forumSide.setAttribute("href", forum.href);
    forumSide.innerHTML = forum.title;

    let defaultReduced = localStorage.getItem(storageKey);
    let messageTopic = document.getElementById("message_topic");

    if (defaultReduced === "false" || (messageTopic && messageTopic.value !== "")) {
        toggleTextarea();
    }

    updateMessages(url, topic.lastPage, true);
    setInterval(function() { checkEdited(urlEdited); }, checkEditInterval);
}


function updateMessages(url, page, goToLast) {
    if (postingMessage && turboActivated) {
        setTimeout(tryCatch(function() { updateMessages(url, page, goToLast); }), 100);
        return;
    }

    url.page = page;
    let urlLastPage = buildURL(url);

    function scheduleNextUpdate(interval, p, goLast) {
        setTimeout(tryCatch(function() { updateMessages(url, p, goLast); }), interval);
    };

    function onSuccess(res) {
        let parsed = parsePage(res);
        let lastPage = parsed.lastPage;
        let currPage = parsed.page;
        let int = turboActivated ? 750 : updateIntervals[updateIntervalIdx] * 1000;

        if (page < lastPage && goToLast) {
            updateMessages(url, page + 1, true);
        } else if (currPage < page || parsed.nbMessagesPage === 0) {  // Bug des messages supprimés
            scheduleNextUpdate(int, page - 1, false);
        } else if (page > lastPage) {
            updateMessages(url, lastPage, true);
        } else {
            scheduleNextUpdate(int, page, true);
            currentLastPage = page;
        }
    }

    function onError(err) {
        if (!isError) {
            isError = true;
            setFixedAlert("danger", err);
        }
        scheduleNextUpdate(turboActivated ? 0 : 60000, page, true);
    }

    function onTimeout(err) {
        addAlertbox("warning", err);
        scheduleNextUpdate(turboActivated ? 0 : 20000, page, true);
    }

    let timeout = 20000;
    if (turboActivated) {
        timeout = 5000;
    }

    request("GET", urlLastPage, onSuccess, onError, onTimeout, undefined, false, timeout);
}

function checkEdited(url) {
    if (!shouldCheckEdited || currentLastPage === 1 || isError) {
        return;
    }

    url.page = currentLastPage - 1;
    let urlPrevLastPage = buildURL(url);

    function onSuccess(res) {
        let newMessages = [];
        let edited = res.getElementsByClassName("info-edition-msg");
        for (let msg of edited) {
            let bloc = msg.closest(".bloc-message-forum");
            newMessages.push(parseMessage(bloc));
        }
        addMessages(newMessages, true);
    }

    function onError() {}

    function onTimeout() {}

    request("GET", urlPrevLastPage, onSuccess, onError, onTimeout, undefined, false, 20000);
}

function parseAlerts(res) {
    let alerts = [];
    let alertsDiv = res.getElementsByClassName("alert");
    for (let a of alertsDiv) {
        let type = "danger";
        if (a.classList.contains("alert-warning")) {
            type = "warning";
        } else if (a.classList.contains("alert-success")) {
            type = "success";
        }
        let message = a.getElementsByClassName("alert-row")[0].textContent.trim();
        alerts.push({type: type, message: message});
    }
    return alerts;
}

function increaseUpdateInterval() {
    if (updateIntervalIdx < updateIntervalMax) {
        updateIntervalIdx++;
    }
}

function decreaseUpdateInterval() {
    updateIntervalIdx = transisitions[updateIntervalIdx];
}

function parsePage(res) {
    let error = getTopicError(res);
    if (error !== undefined) {
        if (!isError) {
            updateIntervalIdx = updateIntervalMax;
            isError = true;
            setFixedAlert("danger", error);
        }
        return {lastPage: undefined, page: undefined, alert: true, nbMessagesPage: 0}
    }

    if (isError) {
        isError = false;
        updateIntervalIdx = 0;
        removeFixedAlert("Le topic ne retourne plus d'erreur");
    }

    let form = getForm(res);
    if (form !== undefined) {
        freshForm = form;
    }

    let hash = getHash(res);
    if (hash !== undefined) {
        freshHash = hash;
    }

    let messages = getMessages(res);
    addMessages(messages);
    let user = parseUserInfo(res);
    setUser(document, user);
    let topic = parseTopicInfo(res);
    let nbMessages = (topic.lastPage - 1) * 20;
    if (topic.page == topic.lastPage) {
        nbMessages += messages.length;
    }
    setTopicNbMessages(document, nbMessages);
    setTopicNbConnected(document, topic.connected);
    let alerts = parseAlerts(res);
    for (let alert of alerts) {
        addAlertbox(alert.type, alert.message);
    }
    let locked = getTopicLocked(res);
    let isLocked_ = (locked !== undefined);

    if (isLocked_ && !isLocked) {
        updateInterval = updateIntervalMax;
        setFixedAlert("warning", locked);
    } else if (!isLocked_ && isLocked) {
        updateInterval = 0;
        removeFixedAlert("Le topic a été dévérouillé");
    }
    isLocked = isLocked_;
    return {page: topic.page, lastPage: topic.lastPage,
            nbMessagesPage: messages.length, alert: isLocked_ || (alerts.length > 0)};
}

function addAlertbox(type, message) {
    // type: success / warning / danger
    let alert = `<div class="alert alert-${type}">
        <button class="close jvchat-alert-close" aria-hidden="true" data-dismiss="alert" type="button">×</button>
        <div class="alert-row">${message}</div>
        </div>`;
    document.getElementById("jvchat-fixed-alert").insertAdjacentHTML("afterend", alert);
}

function setFixedAlert(type, message) {
    setFavicon("⨯");
    document.getElementById("jvchat-fixed-alert").getElementsByClassName("alert-row")[0].innerHTML = message;
    document.getElementById("jvchat-fixed-alert").setAttribute("class", `alert alert-${type}`);
}

function removeFixedAlert(message) {
    document.getElementById("jvchat-fixed-alert").classList.add("jvchat-hide");
    if (message !== undefined) {
        addAlertbox("success", message);
    }
    if (document.hidden && nbNewMessage > 0) {
        setFavicon(nbNewMessage > 99 ? 99 : nbNewMessage);
    } else {
        setFavicon("");
    }
}

function makeJVChatButton() {
    let cls = 'btn-jvchat';
    let text = 'JVChat';
    let btn = `<button class="btn btn-actu-new-list-forum ${cls}">${text}</button>`;
    return btn;
}

function addJVChatButton(document) {
    let css = `<style type="text/css">
    #forum-main-col .bloc-pre-pagi-forum {
        display: flex;
    }

    #forum-main-col .bloc-pre-pagi-forum .bloc-pre-right {
        position: relative;
        right: unset;
        left: unset;
        top: unset;
        bottom: unset;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        margin-top: auto;
        flex: 1;
    }

    #forum-main-col .bloc-pre-pagi-forum .bloc-pre-right button {
        float: right;
        min-width: 5.25rem;
        margin-left: 0.3125rem;
    }
    </style>`
    document.head.insertAdjacentHTML("beforeend", css);
    let blocPreRight = document.getElementsByClassName("bloc-pre-right");
    let jvchatButton = makeJVChatButton();
    for (let bloc of blocPreRight) {
        bloc.insertAdjacentHTML('afterbegin', jvchatButton);
    }
}

function bindJVChatButton(document) {
    let buttons = document.getElementsByClassName('btn-jvchat');
    for (let btn of buttons) {
        btn.addEventListener('click', tryCatch(triggerJVChat));
    }
}

function request(mode, url, callbackSuccess, callbackError, callbackTimeout, data, json, timeout) {
    json = !!json;
    let xhr = new XMLHttpRequest();
    xhr.timeout = timeout;

    xhr.ontimeout = tryCatch(function() {
        callbackTimeout(`La délai d'attente de la requête a expiré`);
    });

    xhr.onerror = tryCatch(function() {
        callbackError(`La requête a échoué (${xhr.status}): ${xhr.statusText}`);
    });

    xhr.onload = tryCatch(function() {
        if (xhr.status !== 200) {
            callbackError(`La requête a retourné une erreur (${xhr.status}): ${xhr.statusText}`);
            return;
        }
        let response;
        if (json) {
            response = JSON.parse(xhr.responseText);
        } else {
            response = document.createElement("html");
            response.innerHTML = xhr.responseText;
        }

        callbackSuccess(response);
    });

    if (data === undefined) {
        data = null;
    }

    xhr.open(mode, url, true);
    xhr.send(data);
};

// On copie/colle le code de TopicLive et on se sent développeur :)
function makeFavicon() {
  let canvas = document.createElement("canvas");
  canvas.width = 16;
  canvas.height = 16;
  let context = canvas.getContext('2d');
  let image = new Image();
  image.src = 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABMLAAATCwAAAAAAAAAAAABkRgT/ZEYE/2RGBP9kRgT/ZEYE/2RGBf9lRgD/YEcV/zJW7v8tV///Llf+/y5X//8uV///Llf//y5X//8uV///ZEYE/2RGBP9kRgT/ZEYE/2RGBP9kRgX/ZUYA/2BHFf8yVu7/LVf//y5X/v8uV///Llf//y5X//8uV///Llf//2RGBP9kRgT/ZEYE/2VHBf9lRwX/ZEYF/2VGAP9gRxX/Mlbu/y1X//8uV/7/Llf//y5X//8uV///Llf//y5X//9kRgT/ZEcF/2ZIB/9iQwH/YkMB/2ZJCP9lRgD/YEcV/zJW7v8tV///L1f+/y1W//8tVv//L1j//y5X//8uV///ZUcE/2NFBP9ZOQD/bE8R/2xPEf9ZOQD/ZEQA/2FIFv8xVu7/Llj//yxV/v8uV///Llf//ytV//8vWP//Llf//2NFA/9kRgj/xLif/+7r5P/u6+T/w7if/2VGBP9fRhT/M1fv/yxW//8uV/7/1d3//9Xd//8uV///LVb//y9Y//9ZOQD/wLOZ/9/Yy/91WiD/dVog/97Yy//CtZj/VzsF/zFW8f8tV///L1f+/9Lb///S2///L1f//y5X//8rVf//bFAR/+nk2v91Wib/WzsA/1s7AP90Wif/7OfZ/2dQIv8wU+v/1d7//9Pb/v8tVv//LVb//9Pc///S2///Llf//2xQEf/p5Nr/dVom/1s7AP9bOwD/dFon/+zn2f9nUCL/MFPr/9Xe///T2/7/LVb//y1W///T3P//0tv//y5X//9ZOQD/wLOZ/9/Yy/91WiD/dVog/97Yy//CtZj/VzsF/zFW8f8tV///L1f+/9Lb///S2///L1f//y5X//8rVf//Y0UD/2RGCP/EuJ//7uvk/+7r5P/DuJ//ZUYE/19GFP8zV+//LFb//y5X/v/V3f//1d3//y5X//8tVv//L1j//2VHBP9jRQT/WTkA/2xPEf9sTxH/WTkA/2REAP9hSBb/MVbu/y5Y//8sVf7/Llf//y5X//8rVf//L1j//y5X//9kRgT/ZEcF/2ZIB/9iQwH/YkMB/2ZJCP9lRgD/YEcV/zJW7v8tV///L1f+/y1W//8tVv//L1j//y5X//8uV///ZEYE/2RGBP9kRgT/ZUcF/2VHBf9kRgX/ZUYA/2BHFf8yVu7/LVf//y5X/v8uV///Llf//y5X//8uV///Llf//2RGBP9kRgT/ZEYE/2RGBP9kRgT/ZEYF/2VGAP9gRxX/Mlbu/y1X//8uV/7/Llf//y5X//8uV///Llf//y5X//9kRgT/ZEYE/2RGBP9kRgT/ZEYE/2RGBf9lRgD/YEcV/zJW7v8tV///Llf+/y5X//8uV///Llf//y5X//8uV///AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==';
  return {canvas: canvas, context: context, image: image};
};

function clearFavicon() {
  favicon.context.clearRect(0, 0, favicon.canvas.width, favicon.canvas.height);
  favicon.context.drawImage(favicon.image, 0, 0);
};

function fillFavicon(txt) {
  clearFavicon();

  if (txt !== '') {
    let context = favicon.context;
    context.fillStyle = 'DodgerBlue';
    context.fillRect(0, 0, context.measureText(txt).width + 3, 11);
    context.fillStyle = 'white';
    context.font = 'bold 10px Verdana';
    context.textBaseline = 'bottom';
    context.fillText(txt, 1, 11);
  }
};

function setFavicon(txt) {
    let fav = document.getElementById("jvchat-favicon");
    if (fav) {
        fav.parentElement.removeChild(fav);
    }
    fillFavicon(txt);
    let url = favicon.canvas.toDataURL('image/png');
    let icon = `<link id="jvchat-favicon" rel="shortcut icon" type="image/png" href="${url}">`;
    document.head.insertAdjacentHTML("beforeend", icon);
}

function reverseMessage(blocMessage) {
    let node = blocMessage.getElementsByClassName("txt-msg")[0].cloneNode(true);

    for (let child of Array.from(node.childNodes)) {
        if (!child.insertAdjacentHTML) {
            child.outerHTML = "";
            continue;
        }
        child.outerHTML = `${child.outerHTML}\n\n`;
    }

    for (let br of Array.from(node.getElementsByTagName("br"))) {
        br.outerHTML = "";
    }

    for (let link of Array.from(node.getElementsByTagName("a"))) {
        link.outerHTML = link.getAttribute("href");
    }

    for (let sticker of Array.from(node.getElementsByClassName("img-stickers"))) {
        sticker.outerHTML = sticker.getAttribute("alt");
    }

    for (let img of Array.from(node.getElementsByTagName("img"))) {
        img.outerHTML = img.getAttribute("alt");
    }

    for (let strong of Array.from(node.getElementsByTagName("strong"))) {
        strong.outerHTML = `'''${strong.innerHTML}'''`;
    }

    for (let em of Array.from(node.getElementsByTagName("em"))) {
        em.outerHTML = `''${em.innerHTML}''`;
    }

    for (let u of Array.from(node.getElementsByTagName("u"))) {
        u.outerHTML = `<u>${u.innerHTML}</u>`;
    }

    for (let pre of Array.from(node.getElementsByTagName("pre"))) {
        pre.outerHTML = pre.innerHTML;
    }

    for (let code of Array.from(node.getElementsByClassName("code-jv"))) {
        code.outerHTML = `<code>${code.innerHTML}</code>`;
    }

    let spoils = Array.from(node.getElementsByClassName("bloc-spoil-jv"));
    spoils.reverse();
    for (let spoil of spoils) {
        spoil.outerHTML = `<spoil>${spoil.getElementsByClassName("contenu-spoil")[0].innerHTML}</spoil>`
    }

    let uls = Array.from(node.getElementsByTagName("ul"));
    uls.reverse();
    for (let ul of uls) {
        for (let li of Array.from(ul.getElementsByTagName("li"))) {
            let end = li.textContent.endsWith("\n") ? "" : "\n";
            li.outerHTML = `* ${li.innerHTML}${end}`;
        }
        ul.outerHTML = ul.innerHTML
    }

    let ols = Array.from(node.getElementsByTagName("ol"));
    ols.reverse();
    for (let ol of ols) {
        for (let li of Array.from(ol.getElementsByTagName("li"))) {
            let end = li.textContent.endsWith("\n") ? "" : "\n";
            li.outerHTML = `# ${li.innerHTML}${end}`;
        }
        ol.outerHTML = ol.innerHTML;
    }

    let quotes = Array.from(node.getElementsByClassName("blockquote-jv"));
    quotes.reverse();
    for (let quote of quotes) {
        let content = "";
        for (let child of Array.from(quote.childNodes)) {
            content += child.innerHTML + '\n\n';
        }
        let quoted = '> ' + content.split(/\n/).join('\n> ');
        quote.outerHTML = `<p>${quoted}</p>`;
    }

    let ps = Array.from(node.getElementsByTagName("p"));
    ps.reverse();
    for (let p of ps) {
        p.outerHTML = p.innerHTML;
    }

    let txt = node.innerHTML.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&').trim();

    return txt;
}

function reverseQuote(blocMessage) {
    let author = blocMessage.getElementsByClassName("jvchat-author")[0].textContent.trim();
    let date = blocMessage.getElementsByClassName("jvchat-date")[0].getAttribute("to-quote");
    let header = `> Le ${date} ${author} a écrit :\n`;
    let txt = reverseMessage(blocMessage);
    let quoted = '> ' + txt.split(/\n/).join('\n> ');
    return header + quoted + '\n\n';
}

function insertAtCursor(input, textToInsert) {
  const value = input.value;
  const start = input.selectionStart;
  const end = input.selectionEnd;
  input.value = value.slice(0, start) + textToInsert + value.slice(end);
  input.selectionStart = input.selectionEnd = start + textToInsert.length;
}

function dontScrollOnExpand(event) {
    let target = event.target;
    if (!target) {
        return;
    }

    let classes = target.classList;

    if (classes.contains("blockquote-jv")) {
        let isDown = isScrollDown();
        target.setAttribute('data-visible', '1');
        if (isDown) {
            setScrollDown();
        }
    } else if (classes.contains("txt-spoil") || classes.contains("aff-spoil") || classes.contains("masq-spoil")) {
        event.preventDefault();
        let check = target.closest(".bloc-spoil-jv").getElementsByClassName("open-spoil")[0];
        let isDown = isScrollDown();
        check.checked = !check.checked;
        if (isDown) {
            setScrollDown();
        }
    } else if (classes.contains("jvchat-quote")) {
        let bloc = target.closest(".jvchat-message");
        let quote = reverseQuote(bloc);
        let textarea = document.getElementById("message_topic");
        if (isReduced) {
            toggleTextarea();
        }
        insertAtCursor(textarea, quote);
        textarea.focus();
    } else if (classes.contains("jvchat-edit")) {
        let bloc = target.closest(".jvchat-message");
        requestEdit(bloc);
    } else if (classes.contains("jvchat-edition-check")) {
        let bloc = target.closest(".jvchat-message");
        editMessage(bloc);
    } else if (classes.contains("jvchat-edition-cancel")) {
        let bloc = target.closest(".jvchat-message");
        let isDown = isScrollDown();
        bloc.getElementsByClassName("jvchat-content")[0].classList.remove("jvchat-hide");
        bloc.getElementsByClassName("jvchat-edition")[0].classList.add("jvchat-hide");
        if (isDown) {
            setScrollDown();
        }
    }
}

function isScrollDown() {
    let element = document.getElementById("jvchat-main");
    return element.clientHeight + Math.floor(element.scrollTop) >= element.scrollHeight - 1;
}

function setScrollDown() {
    let element = document.getElementById("jvchat-main");
    element.scrollTop = element.scrollHeight + 10000;
}

function main() {
    addJVChatButton(document);
    bindJVChatButton(document);
}

main();
