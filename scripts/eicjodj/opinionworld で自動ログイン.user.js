// ==UserScript==
// @name        opinionworld で自動ログイン
// @namespace   opinionworld-autologin
// @include     https://www.opinionworld.jp/ja-jp
// @description 使用する前にメールアドレスとパスワードを設定してください
// @version     1
// @grant       none
// ==/UserScript==
window.onload = function() {
document.getElementById("JanRainSocialBtn").click();
document.getElementById("apsusername").value = "ここにメールアドレスを入力";
document.getElementById("apspassword").value = "ここにパスワードを入力";
setTimeout(function(){document.getElementById("apslogin").click()}, 800);
}