// ==UserScript==
// @name All-in-One Standalone - Left-Aligned links to PMs and Subscription and yellow notification bubbles
// @description See "Author's Description" to see what this gives you.
// @namespace none
// @include http://www.overclock.net/*
// @version Version 1.0
// @grant none
// @require http://code.jquery.com/jquery-1.6.4.js
// ==/UserScript==

(function () {

/*-----ONE-CLICK LOG-IN-----*/
  if ($('.profile a') .attr('href') == '/join') {
    var loginForm = $('<form/>', {
      method: 'POST',
      action: '/login'
    });
    var lastLoc = localStorage.getItem('ocnlastlocation');
    lastLoc = lastLoc === null ? 'http://overclock.net' : lastLoc.indexOf('overclock.net' > - 1) ? lastLoc : 'http://overclock.net';
    var oldUrlInput = $('<input/>', {
      type: 'hidden',
      name: 'oldurl',
      value: lastLoc
    });
    var usernameInput = $('<input/>', {
      type: 'text',
      name: 'username',
      placeholder: 'Username or Email',
      css: {
        'display': 'inline-bloc',
        'width': '114px',
        'padding': '3px',
        'font-size': '8pt',
      }
    });
    var passwordInput = $('<input/>', {
      type: 'password',
      name: 'password',
      placeholder: 'Password',
      css: {
        'display': 'inline-bloc',
        'width': '114px',
        'padding': '3px',
        'margin-left': '4px',
        'font-size': '8pt',
      }
    });
    var rememberMeInput = $('<input/>', {
      type: 'checkbox',
      id: 'rememberme',
      name: 'rememberme',
      checked: 'checked',
      css: {
        'display': 'block',
        'margin-left': '285px',
        'margin-top': '4px'
      }
    });
    var rememberMeLabel = $('<label/>', {
      text: 'Remember Me',
      css: {
        'color': '#A7A7A7',
        'display': 'block',
        'margin-top': '-15px',
        'margin-left': '186px',
        'font-size': '8pt',
      }
    });
    rememberMeLabel.attr('for', 'rememberme');
    var submitButton = $('<button/>', {
      type: 'submit',
      name: 'Login',
      text: "Log In",
      css: {
        'margin-left': '4px',
        'font-size': '11px',
      }
    });
    var loginContainer = $('<div/>');
    loginForm.append(usernameInput);
    loginForm.append(passwordInput);
    loginForm.append(oldUrlInput);
    loginForm.append(submitButton);
    loginForm.append(rememberMeInput);
    loginForm.append(rememberMeLabel);
    loginContainer.append(loginForm);
    loginContainer.append($('<a/>', {
      href: '/users/lost_password',
      text: 'Forgot Password?',
      css: {
        'display': 'block',
        'margin-top': '-15px',
        'width': '120px',
        'font-size': '8pt',
      }
    }));
    $('#sidebar') .prepend(loginContainer);
  } else {
    localStorage.setItem('ocnlastlocation', window.location);
  }

  /*----PUT "View All Drafts" ON YOUR PROFILE MENU-----*/
  $('<li/>') .append($('<a/>', {
    text: 'View All Drafts',
    href: 'http://www.overclock.net/draft'
  })) .insertBefore($('.profile .menu .prefs'));

  
   /*-----PUT "Edit Signature" ON YOUR PROFILE MENU-----*/
  var userData = $('.profile .user-avatar a') .attr('href') .split('/');
  var userId = userData[2];
  var userName = userData[3];
  var plText = '';
  var plUrl = '';
  plText = 'Edit Signature'.replace('{{username}}', userName) .replace('{{userid}}', userId);
  plUrl = 'http://www.overclock.net/users/signature/edit_signature/user_id/{{userid}}'.replace('{{username}}', userName) .replace('{{userid}}', userId);
  $('<li/>') .append($('<a/>', {
    text: plText,
    href: plUrl,
    target: '_self'
  })) .insertAfter($('.profile .menu .threads-started'));
  
  /*-----HIGH-RESOLUTION AVATAR ON THE NAVBAR-----*/
  var highres = $('.ui-header-fixed li.profile .user-avatar img') .attr('src') .replace('32x32px-LL', '120x120px-LS');
  $('.ui-header-fixed li.profile .user-avatar img') .attr('src', highres);

  
  /*-----CORRECT THE CAPITALIZATION OF YOUR USERNAME ON YOUR PROFILE MENU-----*/
  $('.profile .menu .username a') .text($('#loggedin-username') .text());
  
  
  /*-----CHANGE "Logout" ON PROFILE MENU TO "Log Out"-----*/
  $('.profile .menu .logout a') .text('Log Out');


   /*-----PUT "Private Messages" AND "Subscriptions" ON THE NAVBAR-----*/
$("<style type='text/css'>.jlink { font-size: 12px; display: block !important; height: 18px !important; color: #FFFFFF !important; text-align: left !important; } .jncontainer { position: absolute; right: 48px; display: inline-block; top: 27px; width: 124px; } .jcounter { background-color: #FFFF00; color: #000000; font-weight: bold;  display: inline-block; height: 15px; min-width: 18px; text-align: center; font-size: 10px; line-height: 14px; border-radius: 2px; margin-right: 5px; font-family: Verdana; .jpadder { display: inline-block; height: 15px; min-width: 18px; text-align: center; font-size: 10px; line-height: 14px; border-radius: 2px; margin-right: 5px; background-color: transparent; font-family: Verdana; } .jpadder, .jcounter { float: right !important; margin-top: 0px; margin-left: 3px; text-indent: -1px; } .fixed-scroll-breakpoint .jncontainer { top: 8px; } .ui-header-fixed li.profile .user-avatar .notification-counter, .ui-header-fixed ul#main-nav li.messages, .ui-header-fixed ul#main-nav li.subscriptions { display:none; } .search-bar-outer, .ui-header-fixed ul#main-nav .search > a { right:165px !important; } </style>").appendTo("head");
  
  var privateMessagesCount = $('.messages .notification-counter') .first() .text() .replace(/s+/, '');
  var subscriptionsCount = $('.subscriptions .notification-counter') .first() .text() .replace(/s+/, '');
  var notificationModule = $('<li/>', {
    class: 'jncontainer',
  });
  var msgText = privateMessagesCount == 1 ? 'New Message ' : privateMessagesCount < 1 ? 'Private Messages ' : 'New Messages ';
  var messagesContainer = $('<a/>', {
    href: 'http://www.overclock.net/messages',
    text: msgText,
    class: 'jlink',
  });
  var messagesCounter = $('<span/>', {
    text: privateMessagesCount,
    class: 'jcounter'
  });
  var subsContainer = $('<a/>', {
    href: 'http://www.overclock.net/users/subscriptions/',
    text: 'Subscriptions',
    class: 'jlink',
  });
  var subsCounter = $('<span/>', {
    text: subscriptionsCount,
    class: 'jcounter'
  });
  if (privateMessagesCount > 0) messagesContainer.append(messagesCounter);
   else messagesContainer.append($('<span/>', {
    class: 'jpadder',
    text: ''
  }));
  if (subscriptionsCount > 0) subsContainer.append(subsCounter);
   else subsContainer.append($('<span/>', {
    class: 'jpadder',
    text: ''
  }));
  notificationModule.append(messagesContainer);
  notificationModule.append(subsContainer);
  notificationModule.insertBefore($('#main-nav .profile'));
})();