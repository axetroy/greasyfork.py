// ==UserScript==

// @name Freebitco.in AutoBot

// @github https://github.com/Topherick

// @version 1.0.1

// @description feel free to donate: 1P7EX7yddNhUVzXZ8FqHVpGqv2CtoKcUxm

// @author Topherick

// @match https://freebitco.in/*

// @require http://code.jquery.com/jquery-latest.js

// @namespace https://greasyfork.org/users/212296
// ==/UserScript==


$(document).ready(function(){

    document.getElementById("free_play_link_li").innerHTML = '<a href="#" onclick="setvars()" class="free_play_link">CONFIGURE BOT</a>';

    var elmConfig = document.getElementById('free_play_link_li');

    elmConfig.addEventListener("click", setvars, true);

    document.getElementById("bet_hi_button").innerHTML = '<button id="double_your_btc_bet_hi_button" onclick="start()" class="bet_hi_button_remove">Start!</a>';

    var elmStart = document.getElementById('bet_hi_button');

    elmStart.addEventListener("click", start, true);

    document.getElementById("bet_lo_button").innerHTML = '<button id="double_your_btc_bet_lo_button" onclick="stop()" class="bet_lo_button_remove">Stop!</a>';

    var elmStop = document.getElementById('bet_lo_button');

    elmStop.addEventListener("click", stop, true);

});


var stopped,

    min,

    speed,

    max,

    before,

    after,

    betafter,

    betbefore,

    base,

    counter = 0,

    randhilo,

    multiplier,

    seedint,

    betval,

    multiply,

    interval,

    lastbet;



function setvars() {

    min = prompt('Min bet', 1);

    min = deexpo(min);

    max = prompt('Max bet', 10000);

    max = deexpo(max);

    betafter = prompt('Number of bets at min bet before base bet', 7);

    betbefore = prompt('Number of bets and back to min bet so you dont lose money', 10);

    base = prompt('Base bet amount', 25);

    base = deexpo(base);

    speed = prompt('Wait between each bet', '20');

    multiplier = prompt('Bet multiplier', 2);

    $('#double_your_btc_payout_multiplier').val(multiplier);

    multiply = prompt('On lose multiply by ', 1.9);

    randhilo = prompt('Bet hi, bet lo, or rand', 'rand');

}

function deexpo(num)

{

    return num*0.00000001;

}

function changeSeed(){

    $('#next_client_seed').val(getNewSeed());

}

function getNewSeed(){

    var result = '';

    var length = 16;

    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';

    for (var i = length; i > 0; --i) {

        result += chars[Math.floor(Math.random() * chars.length)];

        }

    return result;

}

seedint = setInterval(changeSeed, 30000);


function hilo() {

    counter++;

    console.log(counter);

    if(randhilo =='hi')

        {

    DoubleYourBTC('hi');

lastbet = 'hi';

        }

        else if (randhilo == 'lo')

            {

                DoubleYourBTC('lo');

                lastbet = 'lo';

            }

            else

                {

                  randbet();

                }


}

function randbet()

{

    var i = random();

    if(i >= 50)

        {

            DoubleYourBTC('hi');

lastbet = 'hi';


        }

    else if(i <= 49)

        {

            DoubleYourBTC('lo');

lastbet = 'lo';


        }

}


function double()

{

  if (counter == betafter)

    {

       $('#double_your_btc_stake').val(base);

       betval = $('#double_your_btc_stake').val();

     hilo();

    }

    else if((counter > betafter) && (betval*2 <max) || (counter > betbefore))

        {

            $('#double_your_btc_stake').val(betval*multiply);

          betval= $('#double_your_btc_stake').val();


            hilo();

        }

else{

    $('#double_your_btc_stake').val(min);

    betval =$('#double_your_btc_stake').val();


    hilo();

}

}


function winlose()

{

    if ($('#double_your_btc_bet_win').html() !== '')

        {

            counter = 0;

            double();

        }

    else if ($('#double_your_btc_bet_lose').html() !== '')

        {


        double();

    }


}

function random() {

    return Math.random()*100;

}


function start() {

    stopped = false;

    hilo();

    var randspeed = (Math.random() * speed) + 500;

   interval = setInterval(winlose, randspeed);

}


function bet() {

    if (stopped !== true) {

        double();

    }

    else {

        stop();

    }

}


function stop() {

    stopped = true;

    clearInterval(interval);

    clearInterval(seedint);

}

