// ==UserScript==
// @name        Automated Omegle Script
// @namespace   lazi3b0y
// @include     http://*.omegle.com/*
// @version     2.6.1
// @grant       GM_addStyle
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @description Script for omegle with automated features.
// @allow pasting
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);

GM_addStyle(
  "td.chatmsgcell { width: 50%; }" +
  "#omegle-greetings-text-in-chat { width: 100%; background: #FFF none repeat scroll 0% 0%; font-family: sans-serif; border: 0px none; padding: 0px; margin: 0px; height: 4.5em; font-size: 1em; overflow: auto; border-radius: 0px; resize: none; }" +
  "#omegle-greetings-text-start { position: absolute; top: 88px; left: 5px; width: 10%; height: 475px; resize: none; border-radius: 5px; border: solid 1px #cccccc; padding: 4px 8px; font-family: sans-serif; font-size: 0.8em; }" +
  ".greetingsmsgcell { width: 50%; }" +
  ".greetingsmsgwrapper { background: #FFF none repeat scroll 0% 0%; border: 1px solid #CCC; height: 4.5em; padding: 0.25em; }" +
  ".script-checkbox-wrapper { position: absolute; line-height: 12px; padding: 2px 0px;  }" +
  ".auto-disconnect-checkbox-wrapper { position: absolute; line-height: 12px; padding: 2px 0px; }" +
  ".activate-script-label { position: absolute; display: inline-block; font-size: 11px; }" +
  ".activate-auto-disconnect-label { position: absolute; display: inline-block; font-size: 11px; }" +
  ".auto-disconnect-timer { position: absolute; display: inline-block; font-size: 11px; top: 74px; right: 25px; }" +
  ".hide { display: none; }"
);

var aborts=[
  'You have disconnected',
  'Stranger has disconnected',
  'Technical error: Server was unreachable for too long and your connection was lost.',
];

var timeout = 300; // Timeout value * 100 milliseconds. 600 = 1 minute.
var disconnectTimeout = 50;
var autoTextSent = false;
var customIntroDisplayed = false;

/***************************************************************************************
         Variables that will be updated every cycle (100ms interval)
***************************************************************************************/
var introId;
var chatbox3Div;
var scriptCheckBox;
var autoDisconnectCheckBox;
var autoDisconnectTimerDiv;
var introAutoTextBox;
var chatAutoTextBox;
var scriptCheckBox;
var autoDisconnectCheckBox;
var timeUntilDisconnect;
var autoText;
var temp = 0;
var chatMessages = 0;
var disconnectTimer = 0;
var reconnectTimer = 0;

$('body').append('<textarea id="omegle-greetings-text-start" placeholder="Automated Hi goes here..." />');
$('body').append('<div class="auto-disconnect-timer hide"></div>');
$('body').append('<div class="script-checkbox-wrapper">' +
                    '<input id="auto-omegle-enabled" type="checkbox" checked />' +
                 '</div>');

$('body').append('<div class="activate-script-label">' +
                    'Activate auto script' +
                 '</div>');

$('body').append('<div class="auto-disconnect-checkbox-wrapper">' +
                    '<input id="reconnect-omegle-enabled" type="checkbox" checked />' +
                 '</div>');

$('body').append('<div class="activate-auto-disconnect-label">' +
                    'Activate auto disconnect' +
                 '</div>');

function disconnect() {
  autoTextSent = false;
  chatMessages = 0;
  temp = 0;
  disconnectTimer = 0;
  reconnectTimer = 0;
   
  $('button.disconnectbtn').click();
  if ($( "body:containsIN('You're now chatting with a random stranger.')" ).text()) {
    $('button.disconnectbtn').click();
  }
}

function displayCustomIntro() {
  var scriptCheckBoxWrapper = $('.script-checkbox-wrapper');
  var scriptCheckBoxLabel = $('.activate-script-label');
  var autoDisconnectCheckBoxWrapper = $('.auto-disconnect-checkbox-wrapper');
  var autoDisconnectCheckBoxLabel = $('.activate-auto-disconnect-label');
  var autoDisconnectTimerDiv = $('.auto-disconnect-timer');
  var introAutoTextBox = $('#omegle-greetings-text-start');
  var chatAutoTextBox = $('td.chatmsgcell');
  
  introAutoTextBox.removeClass('hide');
  chatAutoTextBox.remove();
  
  scriptCheckBoxWrapper.css({ 'top': '575px', 'left': '1px' });
  scriptCheckBoxLabel.css({ 'top': '580px', 'left': '25px' });
  autoDisconnectCheckBoxWrapper.css({ 'top': '590px', 'left': '1px' });
  autoDisconnectCheckBoxLabel.css({ 'top': '595px', 'left': '25px' });
  $('#omegle-greetings-text-start').val(autoText);
  autoDisconnectTimerDiv.addClass('hide');
  customIntroDisplayed = true;  
}

function displayCustomChat() {
  var scriptCheckBox = $('#auto-omegle-enabled');
  var scriptCheckBoxWrapper = $('.script-checkbox-wrapper');
  var scriptCheckBoxLabel = $('.activate-script-label');
  var autoDisconnectCheckBoxWrapper = $('.auto-disconnect-checkbox-wrapper');
  var autoDisconnectCheckBoxLabel = $('.activate-auto-disconnect-label');
  var autoDisconnectTimerDiv = $('.auto-disconnect-timer');
  var introAutoTextBox = $('#omegle-greetings-text-start');
  var chatAutoTextBox = $('td.chatmsgcell');
  
  if (!$('#omegle-greetings-text-in-chat').length) {
    introAutoTextBox.addClass('hide');
    chatAutoTextBox.after('<td class="greetingsmsgcell">' + 
                             '<div class="greetingsmsgwrapper">' +
                                '<textarea id="omegle-greetings-text-in-chat" placeholder="Automated Hi goes here..." />' +
                             '</div>' +
                          '</td>');  

    scriptCheckBoxWrapper.css({ 'top': '69px', 'left': '10px' });
    scriptCheckBoxLabel.css({ 'top': '74px', 'left': '32px' });
    autoDisconnectCheckBoxWrapper.css({ 'top': '69px', 'left': '153px' });
    autoDisconnectCheckBoxLabel.css({ 'top': '74px', 'left': '175px' });
    $('#omegle-greetings-text-in-chat').val(autoText);
    autoDisconnectTimerDiv.removeClass('hide');
    customIntroDisplayed = false;
  }

  autoDisconnectTimerDiv.text(function() {
    if (autoDisconnectCheckBox[0].checked && scriptCheckBox[0].checked) {
      return 'Auto disconnecting from Stranger in ' + timeUntilDisconnect + 's';
    } else {
      return 'Auto disconnect is disabled';
    }
  });
  
  if ($('.logitem > .statuslog > .newchatbtnwrapper').length) {
    if (!$('#custom-logitem').length) {
      $('.logbox > div').append('<div class="logitem">' + 
                                   '<p id="custom-logitem" class="statuslog">' +
                                      'Reconnecting to new stranger in ' + timeUntilReconnect + 's' +
                                   '</p>' + 
                                '</div>');
    }
    
    $('#custom-logitem').text('Reconnecting to new stranger in ' + timeUntilReconnect + 's');
  }
}

$.extend($.expr[":"], {
  "containsIN": function(elem, i, match, array) {
    return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
  }
});

setInterval(function() {
  introId = $('#intro');
  chatbox3Div = $('.chatbox3');
  scriptCheckBox = $('#auto-omegle-enabled');
  autoDisconnectCheckBox = $('#reconnect-omegle-enabled');
  autoDisconnectTimerDiv = $('.auto-disconnect-timer');
  introAutoTextBox = $('#omegle-greetings-text-start');
  chatAutoTextBox = $('#omegle-greetings-text-in-chat');
  scriptCheckBox = $('#auto-omegle-enabled');
  autoDisconnectCheckBox = $('#reconnect-omegle-enabled');
  timeUntilDisconnect = Math.round((timeout - disconnectTimer) / 10);
  timeUntilReconnect = Math.round((disconnectTimeout - reconnectTimer) / 10);
  
  /**************************************************************** 
         Depending on what is present inside the body
         (either the id 'intro' or the div 'chatbox3') either 
         the custom ui for the startpage, or the ui for
         when chatting and looking for strangers, is
         displayed.
  ****************************************************************/    
  if (introId.length && !customIntroDisplayed) {
    displayCustomIntro(); return;
  } else if (chatbox3Div.length){
    displayCustomChat();
  }
  
  /**************************************************************** 
         Save whatever has been typed into either the
         textarea on the intro page or the one when
         chatting, so that it can be used later.
  ****************************************************************/
  if (introAutoTextBox.length) {
    autoText = introAutoTextBox.val();
  } else if (chatAutoTextBox.length) {
    autoText = chatAutoTextBox.val();
  }
  
  /**************************************************************** 
         If the checkbox for automated functions is
         unticked, connecting to the server, looking
         for a new stranger or on the startpage then
         return.
         Else if the timer has counted down too 0 then
         disconnect from the current stranger and then
         return.
  ****************************************************************/
  if (!scriptCheckBox[0].checked || 
      $( 'body:containsIN("Connecting to server...")' ).text() || 
      $( 'body:containsIN("Looking for someone you can chat with...")' ).text() || 
      introId.length) {
    return;
  } else if (disconnectTimer == timeout && autoDisconnectCheckBox[0].checked) {
    disconnect();
    return;
  }
  
  /**************************************************************** 
         If the automated Hi-message hasn't been sent
         yet and a new stranger has been found then
         send the automated Hi-message.
  ****************************************************************/  
  if (autoTextSent === false && $( "body:containsIN('You're now chatting with a random stranger. Say hi!')" ).text() ) {
    $('textarea.chatmsg').val(autoText);
    $('button.sendbtn').click();
    autoTextSent = true;
  }
  
  /**************************************************************** 
         If a new message has been added to the current
         conversation the timer will be reset.
         Otherwise it will continue to count down.
  ****************************************************************/
  temp = $('.logbox > div > .logitem > .strangermsg').length + $('.logbox > div > .logitem > .youmsg').length;
  if (!$('.disconnectbtnwrapper.newbtn').length && !$( 'body:containsIN("stranger is typing")' ).length) {
     if ((chatMessages != temp || !autoDisconnectCheckBox[0].checked || !scriptCheckBox[0].checked) && !$('.logitem > .statuslog > .newchatbtnwrapper').length) {
      chatMessages = temp;
      disconnectTimer = 0;
    } else if (autoDisconnectCheckBox[0].checked) {
      disconnectTimer += 1;
    } 
  }
  
  /****************************************************************
         TODO: Add description.
  ****************************************************************/
  if ($('.logitem > .statuslog > .newchatbtnwrapper').length && reconnectTimer < disconnectTimeout) {
    reconnectTimer += 1;
  } else {
    $(aborts).each(function() {
      if ($( 'body:containsIN("' + this + '")' ).text()){
        disconnect();
        disconnectTimer = 0;
      }
    });
  }
}, 100); //Execute this function every 100ms