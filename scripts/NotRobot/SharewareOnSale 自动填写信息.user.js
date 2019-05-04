// ==UserScript==
// @name         SharewareOnSale 自动填写信息
// @namespace    undefined
// @version      2018.02.25
// @description  Shareware On Sale 网站自动填写信息
// @description  使用前，请自行修改邮箱及其他选项
// @author       NotRobot
// @match        https://sharewareonsale.com/checkout
// @grant        none
// ==/UserScript==
(function() {
    var email = 'username@example.com';
    document.getElementById('billing_email').value = email;
    document.getElementById('billing_email-2').value = email;
    document.getElementById('windows8_os').checked="checked";
    document.getElementById('gender').value="1";
    document.getElementById('joblevel').value="4";
})();