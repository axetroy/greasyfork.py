// ==UserScript==
// @name         Google Inbox Calendar Link
// @locale       English
// @version      0.3
// @description  Adds calendar link to Google Inbox
// @author       Aviem Zur
// @match        https://inbox.google.com*
// @match        https://inbox.google.com/*
// @namespace https://greasyfork.org/users/14514
// ==/UserScript==

window.CALENDAR_MENU_ITEM_ID = 'calendarMenuItem';

window.getByXPath = function(xpath) {
    return document.evaluate(xpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
};

/*
<li jsaction="global.click_gmail_menu_item" jsan="t-DLSN7eYCq78,22.jsaction" jstcache="1109">
  <a class="oin9Fc cQ ig xOMVzc" href="https://mail.google.com/mail/?ibxr=0" tabindex="-1" jstcache="1131">
    <img class="gN" src="//ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/1x/ic_gmail_g60_24dp_r2.png" srcset="//ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/ic_gmail_g60_24dp_r2_2x.png 2x" alt="" aria-hidden="true" jstcache="0">
      <span class="op" jstcache="0">
        <span title="Gmail" jstcache="1132">
          Gmail
        </span>
      </span>
    <img class="gg" src="//www.gstatic.com/images/icons/material/system/1x/open_in_new_grey600_18dp.png" srcset="//www.gstatic.com/images/icons/material/system/2x/open_in_new_grey600_18dp.png 2x" alt="" aria-hidden="true" jstcache="1133">
  </a>
</li>
*/
window.addCalendarMenuItem = function() {
    var calendarMenuItem = document.createElement('li');
    calendarMenuItem.id = CALENDAR_MENU_ITEM_ID;
    calendarMenuItem.jstcache = '1109';
    calendarMenuItem.jsan = 't-DLSN7eYCq78,22.jsaction';

    var calendarAnchor = document.createElement('a');
    calendarAnchor.href = 'https://calendar.google.com/';
    calendarAnchor.target = '_blank';
    calendarAnchor.classList.add('oin9Fc');
    calendarAnchor.classList.add('cQ');
    calendarAnchor.classList.add('ig');
    calendarAnchor.classList.add('xOMVzc');

    var calendarImg = document.createElement('img');
    calendarImg.src = 'https://image.ibb.co/cLPQj7/google_calendar.png';
    calendarImg.classList.add('gN');

    var calendarSpan = document.createElement('span');
    calendarSpan.classList.add('op');

    var calendarInnerSpan = document.createElement('span');
    calendarInnerSpan.innerText = 'Calendar';

    var calendarOpenInNewImg = document.createElement('img');
    calendarOpenInNewImg.classList.add('gg');
    calendarOpenInNewImg.src = '//www.gstatic.com/images/icons/material/system/1x/open_in_new_grey600_18dp.png';
    calendarOpenInNewImg.srcset = '//www.gstatic.com/images/icons/material/system/2x/open_in_new_grey600_18dp.png 2x';
    calendarOpenInNewImg.ariaHidden = 'true';
    calendarOpenInNewImg.jstcache = '1133';

    calendarMenuItem.appendChild(calendarAnchor);
    calendarAnchor.appendChild(calendarImg);
    calendarAnchor.appendChild(calendarSpan);
    calendarSpan.appendChild(calendarInnerSpan);
    calendarAnchor.appendChild(calendarOpenInNewImg);

    var gmailMenuItem = getByXPath('//li[@jsaction="global.click_gmail_menu_item"]').snapshotItem(0);
    gmailMenuItem.parentNode.insertBefore(calendarMenuItem, gmailMenuItem);
};

window.alreadyAddedCalendarMenuItem = function() { return document.getElementById(CALENDAR_MENU_ITEM_ID) != null; };

var observer = new MutationObserver(function(mutations, observer) {
    if (!alreadyAddedCalendarMenuItem()) {
        addCalendarMenuItem();
    }
});

observer.observe(document, {
  subtree: true,
  attributes: true
});