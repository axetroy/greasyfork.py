// ==UserScript==
// @name         Faucethunt Auto
// @namespace    whatsup9942918024
// @version      1.2
// @description  Go to: https://www.faucethunt.win/?ref=6265 - Nhập ví Faucethub BTC, ấn Enter để bắt đầu tự động kiếm sts.
// @author       KS Phạm Trắc Anh
// @match        https://www.faucethunt.win/*
// @match        https://www.faucethunt.com/*
// @match        https://faucethunt.win/*
// @match        https://faucethunt.com/*
// ==/UserScript==

(function() {
    setInterval( function(){
        if($('#timer').text() === "")
        {
            claimSatoshis();
        }
    },1000);
})();