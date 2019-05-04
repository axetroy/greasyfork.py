// ==UserScript==
// @name Multiply Freebitco.in
// @namespace    JJ.Trainer
// @version      1.0.0
// @description  Please use my Referal-Link https://freebitco.in
// @author       unknown
// @match        https://freebitco.in/*
// ==/UserScript==

var bversion = 4.25;
var begingbal = $('#balance').text();
var startbalance = 0;
var autorounds = 20;         // 
var handbrake  = 0.0000001;  // 
var maxroundsz = 200;
var resetroundsz = 60;
//var stopAt= '?';
var round = 0;
var gameLost=0;
var gameWin=0;
var higherbet=0;
startbalance = $('#balance').text();
var startValue = '0.00000001', // Não diminua o ponto decimal mais de 4x do saldo atual
        stopPercentage = 0.0005, // Em %. Eu não recomendaria passar de 0.0005
        maxWait = 777, // Em millisegundos
        stopped = false,
        stopBefore = 1; // O padrão em minutos é 3
var oldbet= 0.00000001;    

var rewardpoints = document.getElementsByClassName("reward_table_box br_0_0_5_5 user_reward_points font_bold")[0].innerHTML;

s = document.getElementById("user_lottery_tickets").innerHTML;
s = s.replace(/(^\s*)|(\s*$)/gi,"");
s = s.replace(/[ ]{2,}/gi," ");
s = s.replace(/\n /,"\n");
document.getElementById("user_lottery_tickets").innerHTML = s;


document.getElementById("free_play_link_li").innerHTML = '<a href="#" onclick="startGame()" class="free_play_link">INICIAR</a>';
var $loButton = $('#double_your_btc_bet_lo_button'),
                $hiButton = $('#double_your_btc_bet_hi_button');
var $loBetbutton = $('#double_your_btc_min');
function higherBet(){
console.log('Aposta mais alta: '+higherbet);
} 
function beginingBal(){
console.log('Saldo de inicio: '+begingbal);
} 
function rewardsBal(){
console.log('%cPontos Rewards: ' +'%c'+rewardpoints+' Pontos', 'color: #00000;', 'color: #ff9a36; font-weight: bold;');
}
function lotteryBal(){
console.log('%cBilhetes de loteria: ' +'%c'+ s+' Cartões', 'color: #00000;', 'color: #005bb6; font-weight: bold;');
}
function donationBTC(){
console.log('%cMinha Carteira para Doações: ' +'%c'+'1KJ6Mx4toQoh6BwnHEUMmKeXbzGqg32iKW', 'color: #000000;', 'color: #000000; font-weight: bold;');
}
function botNAME(){
console.log('%cVersão do BOT Freebitcoin: ' +'%c'+bversion, 'color: #000000;', 'color: #ff9a36; font-weight: bold;');
}
function changeBet(bet){
startValue=bet;
}

function forceStop(){
var resetroundsyz = resetroundsz * 40700;
stopGame();                  
 setTimeout(startGame2, resetroundsyz);    
}

function timeRemaining(){
timeR = $('title').text();
replText = timeR.replace("- FreeBitco.in - Ganhe bitcoins grátis a cada hora", "");
console.log('%cTempo para o próximo ROLL: ' +'%c'+replText, 'color: #00000; font-weight:bold;', 'color: #007a5c;font-weight:bold;');
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
    var time    = 'Tempo de Jogo = '+hours+minutes+seconds+' Segundos';
    return time;
}
function roundnumb(){

console.clear();
var called = false;
var maxroundx = maxroundsz * 20;
var resetroundsx = resetroundsz * 20;
var resetroundsy = resetroundsz * 40700;
var newbalance= $('#balance').text()
round = round + 1;
var roundf = (maxroundx - round);
var profit = (Number(newbalance) - Number(startbalance)).toFixed(8) ;


if (roundf > 0) {
          
      botNAME();
      donationBTC();
      timeRemaining();
      beginingBal();
      rewardsBal();
      lotteryBal();  
        console.log('Jogada #' + round + ' / ' +(maxroundsz * 20)+ ' faltam '+maxroundsz+' minutos');
    }
    


if (roundf == 0)
    { 
    var counter = (resetroundsx);
                  var resBOTCountdown = setInterval(function(){
                  console.clear();
                  
      botNAME();
      donationBTC();
      timeRemaining();
      beginingBal();
      rewardsBal();
      lotteryBal();  
        console.log('Jogada #' + round + ' / ' +(maxroundsz * 20)+ ' próximas de '+maxroundsz+' minuto');
        console.log('Total de Lucro: ' + profit + ' Satoshis');
                  console.log(' ');
                  console.log(counter+' ... Reiniciando o BOT');
                  counter--
                    if (counter === -1) {
                    clearInterval(resBOTCountdown);
                    
                    console.log("Reiniciando BOT - Aguarde alguns segundos...");
                    donationBTC();
                    }
                    }, 1000); 
             forceStop();
            return true;


}
console.log('Lucro:' + profit + ' Satoshis');
return false;
    
    
}


function multiply(){
                var current = $('#double_your_btc_stake').val();
                var multiply = (current * 2).toFixed(8);
                $('#double_your_btc_stake').val(multiply);
                console.log('Aposta = ' + multiply);    
                    if( higherbet < multiply ){ higherbet=multiply; }
}
function getRandomWait(){
        var wait = Math.floor(Math.random() * maxWait ) + 300; //(Math.floor(Math.random() * 600) + 300)  ; // avant 100
        console.log('Aguardando ' + wait + 'ms Antes da próxima aposta.');
        return wait ;
}
function startGame(limit){
document.getElementById("free_play_link_li").innerHTML = '<a href="#" onclick="stopGame()" class="free_play_link">PARAR</a>';
starttime=(new Date()).getTime();
startValue = prompt("Número de satoshi que você quer apostar?", '0.00000100');
MaximumValue = prompt("Valor para dobrar quando perder uma aposta? ", '0.00000004')
MaximumTimer = prompt("valor máximo em minutos para usar o BOT? ", '1');
ResetTimer = prompt("Reiniciar automaticamente BOT depois de parar em minutos? ", '1');
oldbet=startValue;
handbrake=(MaximumValue / 2);
maxroundsz=MaximumTimer;
resetroundsz=ResetTimer;
    round = 0;
    gameLost=0;
    gameWin=0;
        console.log('O jogo começou!');
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
document.getElementById("free_play_link_li").innerHTML = '<a href="#" onclick="stopGame()" class="free_play_link">PARAR</a>';
starttime=(new Date()).getTime();
stopped = false;
oldbet=startValue;
handbrake=(MaximumValue / 2);
maxroundsz=MaximumTimer;
resetroundsz=ResetTimer;
    round = 0;
    gameLost=0;
    gameWin=0;
        console.log('O jogo começou!');
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
document.getElementById("free_play_link_li").innerHTML = '<a href="#" onclick="startGame()" class="free_play_link">INICIAR</a>';
        botNAME();
        donationBTC();
        console.log('O jogo vai parar em breve! Finalizando apostas!');
        stopped = true;
startValue=oldbet;
handbrake=(MaximumValue / 2);
maxroundsz=MaximumTimer;
resetroundsz=ResetTimer;
}

function reset(){
    if( round % 100 === 0 && round !=0)
    {
    startValue=(startValue * 1.000).toFixed(8); //New bet after 100 round
    console.log('Rodada ' + round + ': mudando aposta para ' + startValue);
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
                console.log('A página será atualizada, encerrando apostas!');
                stopGame();
                return true;
        }
        return false;
}

function stopMaxStake(){
var calleds = false;
        var maxstake1 = $('#double_your_btc_stake').val();
       if( maxstake1 == handbrake )
       {
              if(!calleds){
                                console.log('Mão Livre! ativando mínimo de apostas para que não possamos perder mais BTC');
                                setTimeout(function(){
                                        $loBetbutton.trigger('click');
                                }, 1000);                           
                                    
                    calleds = true;
                  }
      else calleds = false;
}
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
                        console.log('%cGanhou: ' + gameWin + ' %cPerdeu: ' + gameLost, 'color: #007a5c', 'color: #FF0000');
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
                                console.log('você PERDEU!');
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
        console.log('%cGanhou: ' + gameWin + ' %cPerdeu: ' + gameLost, 'color: #007a5c', 'color: #FF0000');
                endtime=(new Date()).getTime();
                var time=Math.floor((endtime-starttime )/1000);
        console.log(realtime(time));
                higherBet();            
            
            if( iHaveEnoughMoni() )
            {

                        console.log('você GANHOU!');
                        reset();
            if( stopped )
            {
                                stopped = false;
                                return false;
            }
         }
                else
                {
                        console.log('você GANHOU!');
                }
                setTimeout(function(){
                        $loButton.trigger('click');
                }, getRandomWait());
        }
}
);// JavaScript Document 