// ==UserScript==
// @name     VK.com Force Retina
// @description Скрипт заставляет vk.com считать что у вас Retina дисплей. Увеличивает разрешение стикеров и предпросмотров фотографий, лечит мыло если у вас HiDPI дисплей.
// @version  1
// @grant    none
// @include https://vk.com/*
// @run-at      document-start
// @namespace https://greasyfork.org/users/165678
// ==/UserScript==
unsafeWindow.devicePixelRatio=2;