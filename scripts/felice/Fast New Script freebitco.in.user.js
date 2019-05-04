    // ==UserScript==
    // @name         Fast New Script freebitco.in
    // @namespace    https://goo.gl/9yC4Lu
    // @version      0.1.0
    // @description  Script 2018 freebitco.in
    // @author       Felice
    // @match        https://freebitco.in/?op=home
    // @match        https://freebitco.in/
    // @grant        none
    // ==/UserScript==
var startValue = '0.00000001' // Don't lower the decimal point more than 4x of current balance
    stopPercentage = 0.001, // In %. I wouldn't recommend going past 0.08
    maxWait = 200, // In milliseconds
    stopped = false,
    stopBefore = 3, // In minutes
    originalBalance = 0,
    gameStartTime=Date.now(),
    satoshisWagered = 0,
    btcsgd = 11000;

var betNo = 0;
    wins  = 0;
    loss  = 0;

var $loButton = $('#double_your_btc_bet_lo_button'),
    $hiButton = $('#double_your_btc_bet_hi_button'),
    $stake    = $('#double_your_btc_stake'),
    $payout   = $('#double_your_btc_payout_multiplier'),
    $lose     = $('#double_your_btc_bet_lose'),
    $win      = $('#double_your_btc_bet_win'),
    $err      = $('#double_your_btc_error'),
    $bal      = $('#balance'),
    $baBal    = $('#bonus_account_balance'),
    $btn      = $loButton;

var lastBetWin = false,
    side = 'lo';

function getBalance() {
    let mainBal = parseFloat($bal.text());
    let baBal  = parseFloat($baBal.text());
    return mainBal + baBal;
}

function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function getRandomString(){
    charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < 16; i++) {
	var randomPoz = randomIntFromInterval(0, charSet.length - 1);
	randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
}

function reseed() {
    var str = getRandomString();
    $('#next_client_seed').val(str);
}

function multiply(){
    var current = $stake.val();
    var x = current * 2;
    var multiply = x;
    $stake.val(multiply.toFixed(8));
}
function getRandomWait(){
    var wait = randomIntFromInterval(50, maxWait);
    return wait;
}

function reset(){
    $stake.val(startValue);
}
function resetStartValues(){
    originalBalance = getBalance();
    satoshisWagered = 0;
    gameStartTime = Date.now();
}
function startGame(){
    console.log('Game started!');
    originalBalance = getBalance();
    reset();
    $btn.trigger('click');
}
function stopGame(){
    console.log('Game will stop soon! Let me finish.');
    stopped = true;
}
// quick and dirty hack if you have very little bitcoins like 0.0000001
function deexponentize(number){
    return number * 1000000;
}
function iHaveEnoughMoni(){
    var balance = deexponentize(getBalance());
    var current = deexponentize($stake.val());
    return ((balance*2)/100) * (current*2) > stopPercentage/100;
}
function stopBeforeRedirect(){
    var minutes = parseInt($('title').text());
    if( minutes < stopBefore )
    {
	console.log('Approaching redirect! Stop the game so we don\'t get redirected while losing.');
	stopGame();
	return true;
    }
    return false;
}

function nextClick() {
    if (lastBetWin) {
	side = side === 'lo' ? 'hi' : 'lo';
	$btn = $('#double_your_btc_bet_'+side+'_button');
    }
    setTimeout(function(){
	if (betNo % 3 === 0) {
		betNo = 0;
		reseed();
        }
	$btn.trigger('click');
    }, getRandomWait());
}

function formatTime(seconds) {
  var sign = '';
    if (seconds < 0) {
      sign = '-';
    }
    quotient  = Math.floor(seconds);
    _seconds  = quotient % 60;
    quotient -= _seconds;
    quotient /= 60;
    _minutes  = quotient % 60;
    quotient -= _minutes;
    quotient /= 60;
    _hours    = quotient % 24;
    quotient -= _hours;
    quotient /= 24;
    _days     = quotient;

    _str =  sign + (_days > 0 ? _days + 'd ' : '');
    _str += _hours < 10 ? '0' + _hours : _hours;
    _str += ':';
    _str += _minutes < 10 ? '0' + _minutes : _minutes;
    _str += ':';
    _str += _seconds < 10 ? '0' + _seconds : _seconds;
    return _str;
}

function getProfit() {
    return getBalance() - originalBalance;
}

function printStats() {

    // document.title = "BTC " + getBalance().toFixed(8);

    css = 'background-color: black; color: #0f0; font-size: 11pt';
    elapsedTime = Date.now()-gameStartTime;
    elapsedSeconds = Math.floor(elapsedTime / 1000);

    sgdBalance = getBalance() * btcsgd;
    sgdProfit = (getBalance() - originalBalance) * btcsgd;
    perSecondSgdProfit = sgdProfit/elapsedSeconds;
    perMinuteSgdProfit = perSecondSgdProfit * 60;
    perHourSgdProfit = perMinuteSgdProfit * 60;
    perDaySgdProfit = perHourSgdProfit * 24;

    str = 'Balance:\t\tS$ ' + sgdBalance.toFixed(4) + '\t| ';
    str += 'Profit since start:\tS$ ' + sgdProfit.toFixed(4) + '\t| ';
    str += 'Rate of earnings: S$ ' + perDaySgdProfit.toFixed(4) + '/day';

    str += '\n'

    targetValue = 2000;

    str += 'Time before $' + targetValue + ':\t';
    str += formatTime((targetValue - sgdBalance) / perSecondSgdProfit) + '\t| ';
    str += 'Total Wagered:\tBTC ' + satoshisWagered.toFixed(8) + '\t| ';
    str += 'Time since start:\t' + formatTime(elapsedSeconds);

    str = '%c' + str
    console.log(str, css);
}

// Unbind old shit
$lose.unbind();
$win.unbind();
$err.unbind();

// Loser
$lose.bind("DOMSubtreeModified",function(event){
    betNo++;
    if( $(event.currentTarget).is(':contains("lose")') )
    {
	satoshisWagered += $stake.val() * 1;
	lastBetWin = false;
	multiply();
	nextClick();
    }
});
// Winner
$win.bind("DOMSubtreeModified",function(event){
    betNo++;
    if( $(event.currentTarget).is(':contains("win")') )
    {
	lastBetWin = true;
	satoshisWagered += $stake.val() * 1;
	// printStats();
	if( stopBeforeRedirect() )
	{
	    return;
	}
	if( iHaveEnoughMoni() )
	{
	    // console.log('You WON! But don\'t be greedy. Restarting!');
	    reset();
	    if( stopped )
	    {
		stopped = false;
		return false;
	    }
	}
	nextClick();
    }
});

$err.bind("DOMSubtreeModified", function(event){
    if( $(event.currentTarget).is(':contains("timed out")') )
    {
	console.log("Request timed out! :( But we're betting again!")
	nextClick();
    }
});

startGame();

statPrinter = setInterval(printStats, 30000);