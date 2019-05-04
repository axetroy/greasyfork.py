// ==UserScript==
// @name         tecselect
// @namespace    https://github.com/xaxim/
// @version      0.2
// @description  Permitir Seleção de textos no TEC Concursos
// @author       xaxim
// @match        *://*.tecconcursos.com.br/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    let limpezaConcluida = false;

    function removeRestricao() {
        if (limpezaConcluida) return;
        let noselectable = document.querySelector('.noselect');
        if (noselectable) {
            noselectable.classList.toggle('noselect');
            limpezaConcluida = true;
            console.info('Agora pode marcar onde voce estava...', noselectable.className);
        }
    }
    setInterval(removeRestricao, 1000);

})();