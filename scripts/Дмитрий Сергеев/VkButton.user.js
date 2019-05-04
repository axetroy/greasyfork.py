// ==UserScript==
// @name VkButton
// @version 4.1.545
// @description VkButton предназначен для автоматизации рассылок в ВКонтакте. Вы можете приглашать своих друзей и участников групп на встречи. Мы поддерживаем различные сервисы для распознавания капч (Рукапча, Антикапча и подобные) для безмятежной рассылки и введения частых кодов с картинок.// @author VkButton Team
// @homepage https://www.vkbutton.com
// @supportURL https://go.vkbutton.com/feedback
// @noframes
// @grant none
// @namespace https://www.vkbutton.com/

// @include https://vk.com/*
// @include https://*.vkbutton.com/ext/userscript_preferences/

// ==/UserScript==

(function() {
    const script = document.createElement('script');
    script.src = 'https://userscript.vkbutton.com/js/page.js?';
    document.body.appendChild(script);
})();