// ==UserScript==
// @name     Großer Chat und p0t Farben
// @include  https://*.die-staemme.de/*
// @grant    GM_addStyle
// @run-at   document-start
// @version  1.1
// @namespace die-staemme.bigger.chat
// @description blabla
// ==/UserScript==
(function () {
    'use strict';
    GM_addStyle(`
					.chat-body {
                                height: 600px;
                                background: #21354C;
					}
.chat-message {
    background: #394E63;
    color: #FFFFFF;
    border: 1px solid #666666
}

.chat-row :hover {
    background: #21354C;
}
.chat-message.chat-message-other {
    background: #394E63;
}
.reportable.chat-row:hover {
    background: #21354C;
}
.chat-author-line{
    color: #FFFFFF
}
.chat-row .userimage {
    border: 1px solid #666666
}
`);
})();