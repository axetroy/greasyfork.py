// ==UserScript==
// @name         Freebitco.in Multiply Player
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Play at freebitco.in multiply by best Strategy
// @author       Android Phoneix
// @match        https://freebitco.in/?op=home
// @match        https://freebitco.in/?op=home#
// @match        https://freebitco.in/
// @grant        none
// ==/UserScript==

bconfig = {
maxBet: 0.00000256,
wait: 800,
toggleHilo:false
};

hilo = 'lo';
multiplier = 1;
rollDice = function() {

if ($('#double_your_btc_bet_lose').html() !== '') {
$('#double_your_btc_2x').click();
multiplier++;
if(bconfig.toggleHilo)toggleHiLo();
} else {
$('#double_your_btc_min').click();
multiplier = 1;
}

if (parseFloat($('#balance').html()) < (parseFloat($('#double_your_btc_stake').val()) * 2) ||
parseFloat($('#double_your_btc_stake').val()) > bconfig.maxBet) {
$('#double_your_btc_min').click();
}

$('#double_your_btc_bet_' + hilo + '_button').click();

setTimeout(rollDice, (multiplier * bconfig.wait) + Math.round(Math.random() * 100));
};

toggleHiLo = function() {
if (hilo === 'lo') {
hilo = 'lo';
} else {
hilo = 'lo';
}
};

rollDice();