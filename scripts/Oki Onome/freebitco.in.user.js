// ==UserScript==
// @name        freebitco.in
// @description k!
// @include     https://freebitco.in/*
// @copyright   2017+, OkiOnome
// @version     4.1
// @namespace https://greasyfork.org/users/144604
// ==/UserScript==
// version 4.1
console.clear();
var begingbal = $('#balance').text();
var startbalance = 0;
var autorounds = 200;         // play 500 rounds only
var handbrake  = 0.00000008;  // pause when stake reaches 1024 Satoshis
//var stopAt= '?';
var round = 0;
var gameLost=0;
var gameWin=0;
var higherbet=0;
startbalance = $('#balance').text();
var startValue = '0.00000001', // Don't lower the decimal point more than 4x of current balance
        stopPercentage = 0.004, // In %. I wouldn't recommend going past 0.08
        maxWait = 1000, // In milliseconds
        stopped = false,
        stopBefore = 1; // In minutes default 3
var oldbet= 0.00000001;    

var rewardpoints = document.getElementsByClassName("reward_table_box br_0_0_5_5 user_reward_points font_bold")[0].innerHTML;

s = document.getElementById("user_lottery_tickets").innerHTML;
s = s.replace(/(^\s*)|(\s*$)/gi,"");
s = s.replace(/[ ]{2,}/gi," ");
s = s.replace(/\n /,"\n");
document.getElementById("user_lottery_tickets").innerHTML = s;




document.getElementById("free_play_link_li").innerHTML = '<a href="#" onclick="startGame()" class="free_play_link">START BOT</a>';
var $loButton = $('#double_your_btc_bet_lo_button'),
                $hiButton = $('#double_your_btc_bet_hi_button');

function higherBet(){
console.log('Highest bet: '+higherbet);
} 
function beginingBal(){
console.log('BTC Starting Balance: '+begingbal);
} 
function rewardsBal(){
console.log('%cReward Points Balance: ' +'%c'+rewardpoints+' points', 'color: #00000;', 'color: #ff9a36; font-weight: bold;');
}
function lotteryBal(){
console.log('%cLottery Tickets Balance: ' +'%c'+ s+' tickets', 'color: #00000;', 'color: #005bb6; font-weight: bold;');
}

function changeBet(bet){
startValue=bet;
}

function timeRemaining(){
timeR = $('title').text();
replText = timeR.replace("- FreeBitco.in - Win free bitcoins every hour!", "");
console.log('%cTime until free roll: ' +'%c'+replText, 'color: #00000; font-weight:bold;', 'color: #007a5c;font-weight:bold;');
}

function realtime(time) {
    var sec_num =parseInt(time, 10) ; // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours!=0) {hours   = hours+' Hours ';}      else{hours   = '';}

    if (minutes!=0) {minutes = minutes+' Minutes ';}
else{minutes   = '';}


    if (seconds < 10) {seconds = seconds;}
    var time    = 'Time played = '+hours+minutes+seconds+' Seconds';
    return time;
}

function roundnumb(){
console.clear();
    if( round == autorounds)
    {
    stopGame()
    }
    else
    {
    round = round + 1;
      timeRemaining();
      beginingBal();
      rewardsBal();
      lotteryBal();
        console.log('Round #' + round + ' / ' + autorounds);
    }
    
    var newbalance= $('#balance').text()
    var profit = (Number(newbalance) - Number(startbalance)).toFixed(8) ;
    console.log('Profit:' + profit + ' Bitcoin')
}


function multiply(){
                var current = $('#double_your_btc_stake').val();
                var multiply = (current * 2).toFixed(8);
                $('#double_your_btc_stake').val(multiply);
                console.log('Bet = ' + multiply);    
                    if( higherbet < multiply ){ higherbet=multiply; }
}
function getRandomWait(){
        var wait = Math.floor(Math.random() * maxWait ) + 100; //(Math.floor(Math.random() * 800) + 300)  ; // avant 100
        console.log('Waiting for ' + wait + 'ms before next bet.');
        return wait ;
}
function startGame(limit){
document.getElementById("free_play_link_li").innerHTML = '<a href="#" onclick="stopGame()" class="free_play_link">STOP BOT</a>';
starttime=(new Date()).getTime();
startValue = prompt("Number of satoshi you want to bet?", '0.00000001');
MaximumValue = prompt("Auto Restart BOT when bet reaches? ", '0.00000008');
oldbet=startValue;
handbrake=MaximumValue;
    round = 0;
    gameLost=0;
    gameWin=0;
        console.log('Game started!');
        reset();
        $loButton.trigger('click');
        if(limit !== null) {
        autorounds=limit;
        }
        else
        {
        autorounds=-1;
        }
}
function startGame2(limit){
document.getElementById("free_play_link_li").innerHTML = '<a href="#" onclick="stopGame()" class="free_play_link">STOP BOT</a>';
starttime=(new Date()).getTime();
stopped = false;
oldbet=startValue;
handbrake=MaximumValue;
    round = 0;
    gameLost=0;
    gameWin=0;
        console.log('Game started!');
        reset();
        $loButton.trigger('click');
        if(limit !== null) {
        autorounds=limit;
        }
        else
        {
        autorounds=-1;
        }
}
function stopGame(){
document.getElementById("free_play_link_li").innerHTML = '<a href="#" onclick="startGame()" class="free_play_link">START BOT</a>';
        console.log('Game will stop soon! Let me finish.');
        stopped = true;
startValue=oldbet;
handbrake=MaximumValue;
}
var sound = document.createElement('audio');
sound.id = 'handbrakealert';
sound.src = 'https://www.mediacollege.com/downloads/sound-effects/star-trek/tos/tos-computer-05.wav';
sound.preload = 'auto';
document.getElementsByTagName('body')[0].appendChild(sound);

function reset(){
    if( round % 100 === 0 && round !=0)
    {
    startValue=(startValue * 1.000).toFixed(8); //New bet after 100 round
    console.log('Round ' + round + ': bet change for ' + startValue);
    }
        $('#double_your_btc_stake').val(startValue);
}
// quick and dirty hack if you have very little bitcoins like 0.0000001
function deexponentize(number){
        return number * 1000000;
}
function iHaveEnoughMoni(){
        var balance = deexponentize(parseFloat($('#balance').text()));
        var current = deexponentize($('#double_your_btc_stake').val());
        return ((balance *2)/ 100) * (current*2) > stopPercentage/100;
}
function stopBeforeRedirect(){
        var minutes = parseInt($('title').text());
        if( minutes < stopBefore )
        {
                console.log('Approaching redirect! Stop the game so we don\'t get redirected while loosing.');
                stopGame();
                return true;
        }
        return false;
}

function stopMaxStake(){
        var maxstake1 = $('#double_your_btc_stake').val();
        if( maxstake1 == handbrake )
        {
                stopped = true;
                document.getElementById('handbrakealert').play();
                  console.log('Handbrake triggered! Please Wait');
              
                  var counter = 5;
                  var resBOTCountdown = setInterval(function(){
                  console.log('Highest Stake at '+ handbrake +' reached');
                  console.log(counter);
                  counter--
                    if (counter === -1) {
                    clearInterval(resBOTCountdown);
                    console.clear();
                    console.log("Restarting BOT");
                    console.log("Wait 5 more seconds so it wont double start");
                    }
                    }, 1000);        
                    
                setTimeout(startGame2, 6000);
                return true;
        }
        return false;
}
// Unbind old shit
$('#double_your_btc_bet_lose').unbind();
$('#double_your_btc_bet_win').unbind();

// Loser
$('#double_your_btc_bet_lose').bind("DOMSubtreeModified",function(event){

        
        if( $(event.currentTarget).is(':contains("lose")') )
        {
            
                        gameLost = gameLost + 1;
                        roundnumb();
                        console.log('%cWin: ' + gameWin + ' %cLost: ' + gameLost, 'color: #007a5c', 'color: #FF0000');
                                endtime=(new Date()).getTime();
                                var time=Math.floor((endtime-starttime )/1000);
                if( stopBeforeRedirect() )
                {
                        return;
                }
            if( stopMaxStake() )
                {
                        return;
               }
            else 
            
                                higherBet();
                                console.log(realtime(time));
                                console.log('You LOST!');
                                multiply();
                                setTimeout(function(){
                                        $loButton.trigger('click');
                                }, getRandomWait());
                                //$loButton.trigger('click');
        
            
        }
        
}
);
// Winner
$('#double_your_btc_bet_win').bind("DOMSubtreeModified",function(event){
        if( $(event.currentTarget).is(':contains("win")') )
        {
        
        gameWin = gameWin + 1;
        roundnumb();
        console.log('%cWin: ' + gameWin + ' %cLost: ' + gameLost, 'color: #007a5c', 'color: #FF0000');
                endtime=(new Date()).getTime();
                var time=Math.floor((endtime-starttime )/1000);
        console.log(realtime(time));
                higherBet();            
            
            if( iHaveEnoughMoni() )
            {

                        console.log('You WON!');
                        reset();
            if( stopped )
            {
                                stopped = false;
                                return false;
            }
         }
                else
                {
                        console.log('You WON! ');
                }
                setTimeout(function(){
                        $loButton.trigger('click');
                }, getRandomWait());
        }
}
);// JavaScript Document 