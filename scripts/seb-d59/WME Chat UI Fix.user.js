// ==UserScript==
// @name             WME Chat UI Fix
// @namespace        seb-d59
// @description      Let you edit the Chat size.
// @include          https://www.waze.com/editor*
// @include          https://www.waze.com/*/editor*
// @include          https://beta.waze.com/editor*
// @include          https://beta.waze.com/*/editor*
// @exclude          https://www.waze.com/user*
// @exclude          https://www.waze.com/*/user*
// @copyright        seb-d59
// @version          1.1
// @grant            none
// ==/UserScript==


var debug=true;
var WMECUIF_version=GM_info.script.version;
  
var settingIcon="iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gwVCQYVcoHlsQAABL9JREFUOMt1lH1Q03Ucx9+/3574gXOwMXBbAeK6dPiQKGpSpohngQjEmZ0WSN4BJ5ZoneVDgnfyT4qnnBhmpOwyPRbFg0yUC8EuE3m6AQNswli6RB2DscWe9+0POisb7z8/n+/3de/7vj/fDwb6+1dqtdovy0rPhANAaWkp/Km4uBjT/dM8dYP6vc6OzsF+rdbc2dFxsbWlNQgAcnJyQGn7+mIkUmlX2507I91dna8uWRhrTk5Lxky62dysJD7yPovNwr17v1XJpNKi5JRNAwBg1OtBAUD73fY8cWjosaGhofL1GxIPzwT7TnlJnpSSpOvu6obdYf/TMDKyUigS0Var9TDL58vMzs110gAQtyKuvLqqapXX49mhrq0/DwDKCxf+B1QsjkkUBAdjgUIBhmGCGIZpCgkRtgUFBgqyc3OdAKYdKgD0A2ABsmuN17ucDse5lLTUI88DdTpdiUQi2dfS0gqGCQCHzcHExPhjmmDdprTUgcLCwn8O7929GwCwbcs7L95obHysrqv/GgCqr6jAX1cB040POW2/3tbU19aRXbl5pOT4CdKv1ZKW5pt7AKCm6ns8c+hH0uvqa+0et7siOXXzEQCQZaj2boujS9YvCaL0+mFvfHz8fTab/QdFUe3fqlSfFRcWEr/Agrx8nCovQ+4HO+emv53R6vbhxrlLD+zzrL/vVkemItqnN2WvcWW6PL5bmVlZUwAIIQQURc04GVAoFAAAvlgeob5c43p4/ASplUeSfVuP+RCnfgsAPsrP93uX9ld0LT0KAHhtw8FPxE2NHFdvD+bHr8UbQ7XOA+1JtwHAUVbmF8jyVzT3qrCi4KdPjfrRQ6JbleBZxyBevRq+4SE21+tNf5PHu15kt5sBoBBA60xAaYYS1oEfsfNMx8mBntHP9ZN8eBK2gG15pJtqqhJFLlsOcXh46PjoaNYGhglsmJq6qVy7FlEWCxodDv8prz/QvMdknDyl6R2HYs0r4NAek8akWPTVtYhEAZdXGZueTtsMBvR1dMDm8TQ6QbYXmMbMlXw+sqzWaYfipIuY0tVgQY76kHXC/YVWOw7Zkvngsb0Y0ure9dQs7+JO2XtfYJilZr1+vjwxEaFCIUwjI3ICbEzicq8EREQ4Fz95AhQZCAAgOvPq5ugdTR4sOEtEW38mqw5qSHCSaj8AiPN/AABkcbnBFRLJ+OWwMGI4epRo0tKIMjycfBMWVvcs5aJICuLUK2s4gYJqQ4+RxZe/jLlRAgx032uY0Nw9+dL+djxtsOBwaCgqXa4Jo8uVQQICPL+cPw/BokVYlpAADkWnXJJKygGAEm1WiULEc3pZvEBbIJeKcoPiGO8PD45fzVgIwPvv9901axbO2mw4JBTmLeTzTxGHg7dy+3ZYBwfRp9F4xHx+LE05JmVjjyaFQVLhx14O1zQ6/PCpxWjc+DwMAM7abNPL1mwuH7ZaE+00bWlTqcBIpVidnu6NiIlxU7Q0a/bsebH10sWxr1uMxrEnXdWZwZN1fT7WLA4AmhDyH+jfX8xnpSh3vNMp2cTjKWNkMpm8oKBMnp19kOIANIKiRCRk1RyWrcfOpwxuQgdwCSGsmQYfgJeiKK8LcMvdbjpBIOCUPHgwChbL9hcyvghIwPZAdgAAAABJRU5ErkJggg==";
var icon_submit="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";
var icon_cancel="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";

var WMEFUdetected = false;
var WMEFUmoveChatDetected = false;
var WMECUIF = {
  //"bodyFontSize" : 12,
  "autoScroll": false,
  "hideUserList": false,
  "chat": {
    "overlay": {"width": 538, "height": 353, "left": 0},
    "width": 538,
    "height": 353,
    "header": { "backgroundColor": "#ddd"},
    "body": {"width": 538, "height": "auto"},
    "messages": {"width": 366, "height": 303,
      "messageList": { "width": 366, "height": 270, "minHeight": 270,
        "message": { "marginBottom": 4,
          "normalMessage": {"maxWidth": 316, "padding": 4,"from": {"fontSize": 13},"body": {"fontSize": 12}}}},
      "newMessage": {"width": 366, "input": {"width": 100, "height": 30}},
      "unreadMessagesNotification": {"width": 366, "bottom": 30}},
    "users":{"visibility": "visible", "width": 172, "maxHeight": 303},
    "username": {"lineHeight": 17, "fontSize": 11}
   }};
         

// *********************
// ** HELPER FUNCTION **
// *********************

function log(msg, obj)
{
    if (obj==null)
        console.log(GM_info.script.name + " v" + GM_info.script.version + " - " + msg);
    else if (debug) 
        console.debug(GM_info.script.name + " v" + GM_info.script.version + " - " + msg + " " ,obj);
}

function getId(node) {
    return document.getElementById(node);
}
function getElementsByClassName(classname, node) {
    node || (node = document.getElementsByTagName("body")[0]);
    for (var a = [], re = new RegExp("\\b" + classname + "\\b"), els = node.getElementsByTagName("*"), i = 0, j = els.length;i < j;i++) {
        re.test(els[i].className) && a.push(els[i]);
    }
    return a;
}
function getFunctionWithArgs(func, args) {
  return function() {
    var json_args = JSON.stringify(args);
    return function() {
      var args = JSON.parse(json_args);
      func.apply(this, args);
    };
  }();
}
function getChatHelper() {
    divChat = getId("chat-overlay");
    var chatHelper = { header:null, headerHeight:null};
    if (divChat) {
      if (divChat.className.indexOf("open") != -1) {
        chatHelper.open = true;
      }
      var chatHeaders = getElementsByClassName("header", divChat);
      if (chatHeaders.length >= 1) {
        chatHelper.header = chatHeaders[0];
        var chatHeadersHeight = window.getComputedStyle(chatHelper.header, null).getPropertyValue("height").slice(0,-2);
        if (chatHeadersHeight.length !== null) {
          chatHelper.headerHeight = chatHeadersHeight;
        }
      }
      
    }
    return chatHelper;
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function saveOption(){
  localStorage.setItem('WMEChatUIFix', JSON.stringify(WMECUIF));
}

// *************
// **  INIT   **
// *************
function WMEBUiF_bootstrap() {
    if (typeof unsafeWindow === "undefined") {
        unsafeWindow    = ( function () {
            var dummyElem = document.createElement('p');
            dummyElem.setAttribute('onclick', 'return window;');
            return dummyElem.onclick();
        }) ();
    }

    /* begin running the code! */
    log("starting");
    initializeWazeObjects();
}
function initializeWazeObjects() {
    var objectToCheck = [
    	"W",
    	"W.model",
    	"W.Config",
    	"W.map",
    	"W.model.chat",
    	"W.selectionManager",
    	"W.loginManager",
    	"W.loginManager.user",
    	"W.loginManager.user.userName",
    	"localStorage"
   	];
    for (var i = 0; i < objectToCheck.length; i++) {
      if (objectToCheck[i].indexOf("/") != -1) {
        var varName = objectToCheck[i].replace(/\//g, "");
        wazeRequires[varName] = require(objectToCheck[i]);
      } else {
        var path = objectToCheck[i].split(".");
        var object = window;
        for (var j = 0; j < path.length; j++) {
          object = object[path[j]];
          if (typeof object == "undefined" || object == null) {
            window.setTimeout(initializeWazeObjects, 1000);
            return;
          }
        }
      }
    }
    initElements();
}
function initElements(){
    //    Waze GUI needed
    WMEBUiF_UserInfo = getId("user-info");
    if(typeof(WMEBUiF_UserInfo) == 'undefined'){
        if (debug) { log("WMEBUiF_UserInfo : NOK"); }
        setTimeout(initElements, 500);
        return;
    }
    WMEBUiF_NavTabs = getElementsByClassName("nav-tabs", WMEBUiF_UserInfo)[0];
    if(typeof(WMEBUiF_NavTabs) === 'undefined'){
        if (debug) { log("WMEBUiF_NavTabs : NOK"); }
        setTimeout(initElements, 500);
        return;
    }
    
    //chat-overlay
    WMEBUiF_chatOverlay = getId('chat-overlay');
    if(typeof(WMEBUiF_chatOverlay) === 'undefined'){
        if (debug) { log("WMEBUiF_chatOverlay : NOK"); }
        setTimeout(initElements, 500);
        return;
    }
    
    WMEBUiF_chat = getId('chat');
    if(typeof(WMEBUiF_chat) === 'undefined'){
        if (debug) { log("WMEBUiF_chat : NOK"); }
        setTimeout(initElements, 500);
        return;
    }
    
    WMEBUiF_chatBody = getElementsByClassName("chat-body", WMEBUiF_chat)[0];
    if(typeof(WMEBUiF_chatBody) === 'undefined'){
        if (debug) { log("WMEBUiF_chatBody : NOK"); }
        setTimeout(initElements, 500);
        return;
    }
    
    WMEBUiF_messages = getElementsByClassName("messages", WMEBUiF_chat)[0];
    if(typeof(WMEBUiF_messages) === 'undefined'){
        if (debug) { log("WMEBUiF_messages : NOK"); }
        setTimeout(initElements, 500);
        return;
    }
    WMEBUiF_messageList = getElementsByClassName("message-list", WMEBUiF_chat)[0];
    if(typeof(WMEBUiF_messageList) === 'undefined'){
        if (debug) { log("WMEBUiF_messageList : NOK"); }
        setTimeout(initElements, 500);
        return;
    }
    
    WMEBUiF_users = getElementsByClassName("users", WMEBUiF_chat)[0];
    if(typeof(WMEBUiF_users) === 'undefined'){
        if (debug) { log("WMEBUiF_users : NOK"); }
        setTimeout(initElements, 500);
        return;
    }
    /*WMEBUiF_username = getElementsByClassName("username", WMEBUiF_chat)[0];
    if(typeof(WMEBUiF_username) === 'undefined'){
        if (debug) { log("WMEBUiF_username : NOK"); }
        setTimeout(initElements, 500);
        return;
    }*/
    WMEBUiF_messageList = getElementsByClassName("message-list", WMEBUiF_chat)[0];
    if(typeof(WMEBUiF_messageList) === 'undefined'){
        if (debug) { log("WMEBUiF_messageList : NOK"); }
        setTimeout(initElements, 500);
        return;
    }
    
    if (typeof(localStorage.WMEChatUIFix) !== "undefined" && IsJsonString(localStorage.getItem('WMEChatUIFix'))) {
        WMECUIF = JSON.parse(localStorage.WMEChatUIFix);
        if (WMECUIF.bodyFontSize !== undefined) delete WMECUIF.bodyFontSize;
        if (WMECUIF.chat.messages.messageList.message.normalMessage.body === undefined) WMECUIF.chat.messages.messageList.message.normalMessage.body = {"fontSize": 12};
        if (WMECUIF.chat.messages.messageList.message.normalMessage.maxWidth === undefined) WMECUIF.chat.messages.messageList.message.normalMessage.maxWidth = WMECUIF.chat.messages.width-50;
        if (WMECUIF.autoScroll === undefined) WMECUIF.autoScroll = false;
        if (WMECUIF.hideUserList === undefined) WMECUIF.hideUserList = false;
        log("init ok");
        log("WMECUIF",WMECUIF);
    }else {
        localStorage.setItem('WMEChatUIFix', JSON.stringify(WMECUIF));
        setTimeout(initElements, 500);
        return;
    }
    
    if (getId("zoomIndicator")!== null){
      fixZoomBar();
      W.map.events.register("zoomend", null, fixSlider);
      setTimeout(fixSlider,1000);
    }
    
    if (getId("sidepanel-FixUI")!== null){
      log("WMEFU detected");
      getId("_cbMoveChatIcon").checked ? WMEFUmoveChatDetected = true : WMEFUmoveChatDetected = false;
      getId("_cbMoveChatIcon").addEventListener("click", function(){
        log("WMEFU _cbMoveChatIcon.checked = " + getId("_cbMoveChatIcon").checked);
        getId("_cbMoveChatIcon").checked ? WMEFUmoveChatDetected = true : WMEFUmoveChatDetected = false;
        fixChat();
      });
    }

    var Scss = document.createElement("style");
    Scss.type = "text/css";
    Scss.id="WMEfixChatCSS";
    Scss.innerHTML = "";
    document.head.appendChild(Scss);

    initUI();
    fixChat();
    
    window.addEventListener("beforeunload", saveOption, false);    
    
    WMECUIF_TestVersion();
    
}

function WMECUIF_TestVersion() {
  
  if (WMECUIF_version != WMECUIF.version) {
	  
	  var majPanel = document.createElement('div');
    majPanel.id = 'WMEfixChat-maj';
    majPanel.setAttribute("style", " color:#59899e; border: 2px solid #BEDCE5; background-color: rgba(255, 255, 255, 1); padding: 10px; position: absolute; z-index: 9999; border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px; display: block;");
    
    var content = "<center style='font-weight: bold; font-size: 130%;'>What's new in "+GM_info.script.name + " v" + WMECUIF_version+"</center>";
    content += "<div style='clear:both; padding-top:5px;'></div>";
    content += "<div style='width: 100%;'>";
    content += "<span style='font-size: 110%;'>- Mise à jours compatibilité.</span><br>";
    content += "<div style='clear:both; padding-top:5px;'></div>";
    //content += "<span style='font-size: 120%; text-decoration:underline;'>v0.9:</span><br>";
    //content += "<span style='float:left;'>&nbsp;&nbsp;&nbsp;&nbsp;- Correction de la taille de la zone de saisie lorsque la SV est affichée.</span><br>";
    //content += "<span style='font-size: 120%; text-decoration:underline;'>v0.8.02:</span><br>";
    //content += "<span style='float:left;'>&nbsp;&nbsp;&nbsp;&nbsp;- Modification du lien vers le forum.</span><br>";
    //content += "<span style='font-size: 120%; text-decoration:underline;'>v0.8:</span><br>";
    //content += "<span style='font-size: 110%; text-decoration:underline;'>Auto hide users list:</span><br>";
    //content += "<span style='float:left;'>&nbsp;&nbsp;&nbsp;&nbsp;Maintenant la 'UsersList' peut être réglé en \"auto hide\", </span><br>";
    //content += "<span style='float:left;'>&nbsp;&nbsp;&nbsp;&nbsp;Ensuite vous n'aurez qu'a passer le mulot sur cette icône: <i class='fa fa-user-circle-o' style='color:#59899e;' width='10px' height='10px' ></i> pour afficher la liste.</span><br>";
    //content += "<span style='font-size: 110%; text-decoration:underline;'>Auto Scroll:</span><br>";
    //content += "<span style='float:left;'>&nbsp;&nbsp;&nbsp;&nbsp;Active l'auto scroll permanent sur les messages.</span><br>";
    //content += "<span style='float:left;'>&nbsp;&nbsp;&nbsp;&nbsp;Perso, je ne l'utilise pas, je l'ai implémenté pour éviter que l'on me la demande <img src='https://www.waze.com/forum/images/smilies/icon_e_wink.gif' /></span><br>";
    //content += "<span style='float:left;'>&nbsp;&nbsp;&nbsp;&nbsp;cela m’énerve qu'un message ce sauve quand, j’essaie de le lire <img src='https://www.waze.com/forum/images/smilies/icon_mrgreen.gif' />.</span><br>";
    content += "</div>";
    content += "<div style='clear:both; padding-top:5px;'></div>";
    
    content += "<div style='width:40px; float:right; text-align:center;'><a href='#'><img id='WMEfixChat-ok' style='width:20px;' src='data:image/png;base64,"+ icon_submit +"' /></a></div>";
    majPanel.innerHTML = content;
    getId("map").appendChild(majPanel);
    
    var majPanelwidth = (window.getComputedStyle(getId("WMEfixChat-maj"), null).getPropertyValue("width")).slice(0,-2);
    var majPanelheight = (window.getComputedStyle(getId("WMEfixChat-maj"), null).getPropertyValue("height")).slice(0,-2);
      
    majPanel.style.top = (screen.availHeight / 2 - majPanelheight / 2) + "px";
    majPanel.style.left = (screen.availWidth / 2 - majPanelwidth / 2) + "px";

    WMECUIF.version = WMECUIF_version;
    
    getId('WMEfixChat-ok').onclick=(function(){
      getId('WMEfixChat-maj').style.display="none";
    });
  
	
  }
}


function fixZoomBar(){
    var Scss = document.createElement("style");
    Scss.type = "text/css";
    Scss.id="WMEfixZoomBarCSS";
    var WMEfixZoomBarStyle = ".street-view-control-container {bottom: 130px;}";
	  WMEfixZoomBarStyle += ".geolocation-control-container {bottom: 95px;}";
	  WMEfixZoomBarStyle += ".zoom-plus-button {top: 2px;}";
	  WMEfixZoomBarStyle += ".olControlPanZoomBar {height: 80px;}";
	  WMEfixZoomBarStyle += ".zoom-minus-button {top: 16px;}";
	  WMEfixZoomBarStyle += ".slider {position: relative;height: 15px;top: 15px;}";
	  Scss.innerHTML = WMEfixZoomBarStyle;
    document.head.appendChild(Scss);

}

function fixSlider(){
	
	  var sliders = getElementsByClassName("slider", getId("map"));
	  for (var c=0; c < sliders.length; c++){
		  if (sliders[c].classList == "slider"){
			  sliders[c].style.position = "relative";
			  sliders[c].style.height = "15px";
			  sliders[c].style.top = "15px";
			  log("sliders[c]",sliders[c]);
	    }
	  }
	  var minusBtn = getElementsByClassName("zoom-minus-button", getId("map"));
	  //log("minusBtn",minusBtn);
	  minusBtn[0].style.top = "16px";
}

function fixChat(){
    
    // Text general
    var WMEfixChatStyle ="";
    //var WMEfixChatStyle += ".body {font-size: "+WMECUIF.bodyFontSize+"px;}";
    //chat-overlay
    WMEfixChatStyle += "#chat-overlay {width: "+WMECUIF.chat.overlay.width+"px; height: "+WMECUIF.chat.overlay.height+"px;"+ (WMEFUmoveChatDetected==false ? " left: "+WMECUIF.chat.overlay.left+"px;}" : "}");
    
    //chat
    WMEfixChatStyle += "#chat {width: "+WMECUIF.chat.width+"px; height: "+WMECUIF.chat.height+"px;}";
    WMEfixChatStyle += "#chat .header { background-color: "+WMECUIF.chat.header.backgroundColor+";}";
    //chat-body
    WMEfixChatStyle += ".chat-body {width: "+WMECUIF.chat.body.width+"px; height: "+WMECUIF.chat.body.height+"px;}";
    //messages
    WMEfixChatStyle += "#chat .messages {width: "+WMECUIF.chat.messages.width+"px ; height: "+WMECUIF.chat.messages.height+"px;}";
    WMEfixChatStyle += "#map.street-view-mode #chat .messages {width: "+WMECUIF.chat.messages.width+"px ;}";
    //message-list
    WMEfixChatStyle += "#chat .messages .message-list {width: "+WMECUIF.chat.messages.messageList.width+"px; height: "+WMECUIF.chat.messages.messageList.height+"px; min-height: "+WMECUIF.chat.messages.messageList.minHeight+"px;}";
    WMEfixChatStyle += "#chat .messages .message-list .message { margin-bottom: "+WMECUIF.chat.messages.messageList.message.marginBottom+"px;}";
    WMEfixChatStyle += "#chat .messages .message-list .message.normal-message {max-width: "+WMECUIF.chat.messages.messageList.message.normalMessage.maxWidth+"px; padding: "+WMECUIF.chat.messages.messageList.message.normalMessage.padding+"px;}";
    WMEfixChatStyle += "#chat .messages .message-list .message.normal-message .from {font-size: "+WMECUIF.chat.messages.messageList.message.normalMessage.from.fontSize+"px;}";
    WMEfixChatStyle += "#chat .messages .message-list .message.normal-message .body {font-size: "+WMECUIF.chat.messages.messageList.message.normalMessage.body.fontSize+"px;}";
    //show users
    WMEfixChatStyle += "#chat .users {visibility: "+WMECUIF.chat.users.visibility+"; width: "+WMECUIF.chat.users.width+"px; max-height: "+WMECUIF.chat.users.maxHeight+"px;}";
    WMEfixChatStyle += "#chat ul.user-list a.user .username {text-decoration: none; line-height: "+WMECUIF.chat.username.lineHeight+"px; font-size: "+WMECUIF.chat.username.fontSize+"px;}";
    //new-message
    WMEfixChatStyle += "#chat .messages .new-message {width: "+WMECUIF.chat.messages.newMessage.width+"px;}";
    WMEfixChatStyle += "#map.street-view-mode #chat .messages .new-message {width: "+WMECUIF.chat.messages.newMessage.width+"px;}";
    //message-input
    WMEfixChatStyle += "#chat .messages .new-message input {width: "+WMECUIF.chat.messages.newMessage.input.width+"%; height: "+WMECUIF.chat.messages.newMessage.input.height+"px;}";
    //unread-messages-notification
    WMEfixChatStyle += "#chat .messages .unread-messages-notification {width: "+WMECUIF.chat.messages.unreadMessagesNotification.width+"px; bottom: "+WMECUIF.chat.messages.unreadMessagesNotification.bottom+"px;}";
    
    getId("WMEfixChatCSS").innerHTML = WMEfixChatStyle;

    
}

function ShowHideUserList(){
  var usersList = getElementsByClassName("users", getId("chat"))[0];
  if (WMECUIF.hideUserList === true) {
    if (getId("ico_ShowHideUserList") === null ){
      insertIconeShowHideUserList();
      log("addEventListener");
      usersList.addEventListener("mouseleave", hideUserList);
    }
    hideUserList();
    
  } else {
    if (getId("ico_ShowHideUserList") !== null ){
      deletetIconeShowHideUserList();
      log("removeEventListener");
      usersList.removeEventListener("mouseleave", hideUserList);
    }
    showUserList();
  }
}  

function insertIconeShowHideUserList(){
  elt = document.createElement("div");
  elt.id="ico_ShowHideUserList";
  elt.setAttribute("style", style="position: absolute; width: 14px; height: 14px; top: 50px; right: 17px;");
  elm = '<i class="fa fa-user-circle-o" style="color:#59899e;" width="10px" height="10px" ></i>'; 
  elt.innerHTML = elm;
  
  var messageList = getElementsByClassName("message-list", getId("chat"))[0];
  messageList.appendChild(elt);
  
  getId("ico_ShowHideUserList").addEventListener("mouseover", showUserList);
  
}

function deletetIconeShowHideUserList(){
  var messageList = getElementsByClassName("message-list", getId("chat"))[0];
  messageList.removeChild(getId("ico_ShowHideUserList"));
 
}

function showUserList(){
  WMECUIF.chat.users.visibility = 'visible';
  WMECUIF.chat.messages.width=WMECUIF.chat.overlay.width-WMECUIF.chat.users.width;
  WMECUIF.chat.messages.messageList.width=WMECUIF.chat.messages.width;
  WMECUIF.chat.messages.newMessage.width=WMECUIF.chat.messages.width;
  WMECUIF.chat.messages.unreadMessagesNotification.width=WMECUIF.chat.messages.width;
  WMECUIF.chat.messages.messageList.message.normalMessage.maxWidth=WMECUIF.chat.messages.width-50;
  fixChat();
  
}
function hideUserList(){
  WMECUIF.chat.users.visibility = 'hidden';
  WMECUIF.chat.messages.width=WMECUIF.chat.overlay.width;
  WMECUIF.chat.messages.messageList.width=WMECUIF.chat.messages.width;
  WMECUIF.chat.messages.newMessage.width=WMECUIF.chat.messages.width;
  WMECUIF.chat.messages.unreadMessagesNotification.width=WMECUIF.chat.messages.width;
  WMECUIF.chat.messages.messageList.message.normalMessage.maxWidth=WMECUIF.chat.messages.width-50;
  fixChat();
}

function initUI(){
//******************************************************
    
    var settingsPanel = document.createElement('div');
    settingsPanel.id = 'WMEfixChat-settingsPanel';
    settingsPanel.setAttribute("style", " color:#59899e; border: 1px solid #BEDCE5; background-color: rgba(255, 255, 255, 1); padding: 10px; position: absolute; top: 30px; left: 15px; width: 300px; z-index: 9999; border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px; display: none;");
    

    var content = "<center style='font-weight: bold; font-size: larger;'>Chat UI Fix Setting</center><br/>";
    
    content += "<label style='width: 100%; height: 20px;'>";
    content += "<label for='valWidth' style='float:left; vertical-align: middle;font-weight:bold;'>Width:&nbsp;</label><span style='float:right;'><input type='number' id='valWidth' style='text-align:right; width:50px; height: 20px; border-radius: 5px;' min='10' max='800' value='"+WMECUIF.chat.overlay.width+"' pattern='[0-9]{3}'>&nbsp;px</span>";
    content += "</label>";
    content += "<label style='width: 100%; height: 20px;'>";
    content += "<label for='valHeight' style='float:left; font-weight:bold;'>Height:&nbsp;</label><span style='float:right;'><input type='number' id='valHeight' style='text-align:right; width:50px; height: 20px; border-radius: 5px;' min='10' max='800' value='"+WMECUIF.chat.overlay.height+"' pattern='[0-9]{3}'>&nbsp;px</span>";
    content += "</label>";
    content += "<label style='width: 100%; height: 20px;'>";
    content += "<label for='valMessageFromFontSize' style='float:left; font-weight:bold;'>\"From\" username font size:&nbsp;</label><span style='float:right;'><input type='number' id='valMessageFromFontSize' style='text-align:right; width:50px; height: 20px; border-radius: 5px;' min='2' max='30' value='"+WMECUIF.chat.messages.messageList.message.normalMessage.from.fontSize+"' pattern='[0-9]{2}'>&nbsp;px</span>";
    content += "</label>";
    content += "<label style='width: 100%; height: 20px;'>";
    content += "<label for='valMessageFontSize' style='float:left; font-weight:bold;'>Message font size:&nbsp;</label><span style='float:right;'><input type='number' id='valMessageFontSize' style='text-align:right; width:50px; height: 20px; border-radius: 5px;' min='2' max='30' value='"+WMECUIF.chat.messages.messageList.message.normalMessage.body.fontSize+"' pattern='[0-9]{2}'>&nbsp;px</span>";
    content += "</label>";
    content += "<label style='width: 100%; height: 20px;'>";
    content += "<label for='valHideUserList' style='float:left; font-weight:bold;'>Auto Hide Users List:&nbsp;</label><span style='float:right;'><input type='checkbox' id='valHideUserList' style='width:10px; height: 10px; border-radius: 1px;' "+(WMECUIF.hideUserList == true ? "checked ></span>" : "></span>");
    content += "</label>";
    content += "<label style='width: 100%; height: 20px;'>";
    content += "<label for='valAutoScroll' style='float:left; font-weight:bold;'>Auto Scroll:&nbsp;</label><span style='float:right;'><input type='checkbox' id='valAutoScroll' style='width:10px; height: 10px; border-radius: 1px;' " +(WMECUIF.autoScroll == true ? "checked ></span>" : "></span>");
    content += "</label>";
    
    content += "<div style='clear:both; padding-top:5px;'></div>";
    
    content += "<div style='width:40px; float:right; text-align:center;'><a href='#'><img id='WMEfixChat-cancel' style='width:20px;' title='Close' src='data:image/png;base64,"+ icon_cancel +"' /></a></div>";
    content += "<div style='width:40px; float:right; text-align:center;'><a href='#'><img id='WMEfixChat-submit' style='width:20px;' title='Apply' src='data:image/png;base64,"+ icon_submit +"' /></a></div>";
    content += "<div style='clear:both; padding-top:5px;'></div>";
    content += "<label style='width: 100%; height: 25px; padding-top: 5px; margin-bottom: 5px;'>\© seb-d59:&nbsp;<span style='float:right;'><a target='_blank' href='https://www.waze.com/forum/viewtopic.php?f=1316&t=243133' style='color:#59899e;'>link to the forum...</a></span>";
    content += "</label>";
    settingsPanel.innerHTML = content;
    getId("map").appendChild(settingsPanel);
    
        
    
//******************************************************
    
    var elt = document.createElement("div");
    elt.style.cssFloat = "left";
    //var elm = '&nbsp;<a href="#" style="color: black;" id="WMEfixChat-setting" title="setting"><img style="vertical-align: middle; margin: 3px;" width="14px" height="14px" src="data:image/png;base64,' + settingIcon + '" /></a>';
    var elm = '&nbsp;<a href="#" style="color:#59899e;" id="WMEfixChat-setting" title="Setting Chat UI Fix"><i class="fa fa-wrench" style="vertical-align: middle; margin: 3px; color:#59899e;" width="14px" height="14px"></i></a>';
    elm += "&nbsp;";
    elt.innerHTML = elm;
    var chatHelper = getChatHelper();
    chatHelper.header.appendChild(elt);
    //log("chatHelper.header",chatHelper.header);
    
    setTimeout(function(){
      log("timeout init");
      WMECUIF.chat.messages.messageList.minHeight= (window.getComputedStyle(getElementsByClassName("new-message", getId("chat-overlay"))[0], null).getPropertyValue("display")) == "none" ?
         WMECUIF.chat.messages.height :
         WMECUIF.chat.messages.height - window.getComputedStyle(getElementsByClassName("new-message", getId("chat-overlay"))[0], null).getPropertyValue("height").slice(0,-2);
      WMECUIF.chat.messages.messageList.height = WMECUIF.chat.messages.messageList.minHeight;
      
      ShowHideUserList();
      
    },1000);
    
    
    
    getId("WMEfixChat-setting").onclick = function(e) {
      getId('WMEfixChat-settingsPanel').style.display="block";
    };
    
    getId('WMEfixChat-cancel').onclick=(function(){
      getId('WMEfixChat-settingsPanel').style.display="none";
    });
  
    getId('WMEfixChat-submit').onclick=(function(){
      WMECUIF.autoScroll=getId("valAutoScroll").checked;
      WMECUIF.hideUserList=getId("valHideUserList").checked;
      //WMECUIF.bodyFontSize=getId("valBodyFontSize").value;
      WMECUIF.chat.messages.messageList.message.normalMessage.from.fontSize=getId("valMessageFromFontSize").value;
      WMECUIF.chat.messages.messageList.message.normalMessage.body.fontSize=getId("valMessageFontSize").value;
      WMECUIF.chat.overlay.width=getId("valWidth").value;
      WMECUIF.chat.overlay.height=getId("valHeight").value;
      WMECUIF.chat.width=getId("valWidth").value;
      WMECUIF.chat.height=getId("valHeight").value;
      WMECUIF.chat.body.width=getId("valWidth").value;
      var chatHelper = getChatHelper();
      WMECUIF.chat.body.height=getId("valHeight").value-chatHelper.headerHeight;
      WMECUIF.chat.messages.height=WMECUIF.chat.body.height;
      WMECUIF.chat.users.maxHeight=WMECUIF.chat.body.height;
      WMECUIF.chat.messages.messageList.minHeight= (window.getComputedStyle(getElementsByClassName("new-message", getId("chat-overlay"))[0], null).getPropertyValue("display")) == "none" ?
        WMECUIF.chat.body.height :
        WMECUIF.chat.body.height - window.getComputedStyle(getElementsByClassName("new-message", getId("chat-overlay"))[0], null).getPropertyValue("height").slice(0,-2);
      WMECUIF.chat.messages.messageList.height = WMECUIF.chat.messages.messageList.minHeight;
      
      ShowHideUserList();
      
    });
    
    W.model.chat.on("change:visible", function() {
      WMECUIF.chat.messages.messageList.minHeight= (window.getComputedStyle(getElementsByClassName("new-message", getId("chat-overlay"))[0], null).getPropertyValue("display")) == "none" ?
        WMECUIF.chat.messages.height :
        WMECUIF.chat.messages.height - window.getComputedStyle(getElementsByClassName("new-message", getId("chat-overlay"))[0], null).getPropertyValue("height").slice(0,-2);
      WMECUIF.chat.messages.messageList.height = WMECUIF.chat.messages.messageList.minHeight;
      fixChat();
    });
    
    W.model.chat.messages.on("messageUpdated", function() {
      fixChat();
    });
    W.model.chat.messages.on("add", function() {
      fixChat();
      if (WMECUIF.autoScroll == true){
        var messageList = getElementsByClassName("message-list", getId("chat"))[0];
        messageList.scrollTop = messageList.scrollHeight;
      }
    });
    
}

WMEBUiF_bootstrap();




