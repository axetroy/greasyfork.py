// ==UserScript==
// @name       Mousehunt Football Player
// @author     GTDevsSuck (edited by: black.carrot)
// @version    3.01
// @description  The original work of GTDevsSuck is now tweaked for the last time for Mousehunt players with dozens of footballs left. This Mousehunt Fifa World Cup 2014 event script, plays the soccer game for you, works only on July 16 2014 (last day).
// @match      *www.mousehuntgame.com/football.php*
// @namespace  http://userscripts.org:8080/users/527134
// ==/UserScript==

window.setInterval(function() {

    
    var name = document.getElementsByClassName('title')[0].innerHTML;
    
    if (name === "Ghost Mouse") { document.getElementsByClassName('actionButton')[0].click();}
    else if (name === "Mystic Bishop Mouse") { document.getElementsByClassName('actionButton')[2].click(); }
    else if (name === "PRIZE ZONE") { document.getElementsByClassName('actionButton small')[0].click(); }
    else if (name === "Football Superstar") { document.getElementsByClassName('actionButton')[0].click(); }
        
    else if (name === "Flying Mouse") { document.getElementsByClassName('actionButton')[2].click(); }
    else if (name === "Hot Head Mouse") { document.getElementsByClassName('actionButton')[1].click(); }
    else if (name === "Field Mouse") { document.getElementsByClassName('actionButton')[2].click(); }
    else if (name === "Snooty Mouse") { document.getElementsByClassName('actionButton')[0].click(); }
    else if (name === "Itty-Bitty Burroughs Mouse") { document.getElementsByClassName('actionButton')[2].click(); }
    else if (name === "Tiny Mouse") { document.getElementsByClassName('actionButton')[0].click(); }
    
    

       if (document.body.innerHTML.match(/Costs 1 Football/i) && document.body.innerHTML.match(/Congratulations!/i))
    {clearInterval();
     document.getElementsByClassName('entryBlock invis fadeIn')[0].click();
     clearInterval();
     //alert("Congratulations!\nYou got a Gold Footlocker!\n\nStarting another game.");
     //clearInterval();
     window.location.href = "http://www.mousehuntgame.com/football.php";
     clearInterval();}
    
        else if (document.body.innerHTML.match(/Costs 1 Football/i) && document.body.innerHTML.match(/This mouse has no weakness/i))
    {clearInterval();
     document.getElementsByClassName('entryBlock')[0].click();
     clearInterval();
     //alert("Lost a ball to the Challenger :(\n\nStarting a new game.");
     //clearInterval();
     window.location.href = "http://www.mousehuntgame.com/football.php";
     clearInterval();}
           
        else if (document.body.innerHTML.match(/Costs 1 Football/i) && document.body.innerHTML.match(/Challenge the mice of Gnawnia to a game of football!/i))
    {clearInterval();
     document.getElementsByClassName('entryBlock')[0].click();
     clearInterval();
     //alert("Starting a game from the beginning.");
     //clearInterval();
     window.location.href = "http://www.mousehuntgame.com/football.php";
     clearInterval();}
    
            
            else if (document.body.innerHTML.match(/Costs 1 Football/i))
    {clearInterval();
     document.getElementsByClassName('entryBlock invis fadeIn')[0].click();
     clearInterval();
     //alert("Oh no, hit the post?\n\nStarting a new game!");
     //clearInterval();
     window.location.href = "http://www.mousehuntgame.com/football.php";
     clearInterval();}
            
            
        
        
        document.getElementsByClassName('target')[2].click();
    
    /**
    if (document.body.innerHTML.match(/Costs 1 Football/i) && document.body.innerHTML.match(/Congratulations!/i))
    {document.getElementsByClassName('entryBlock invis fadeIn')[0].click();}
        else if (document.body.innerHTML.match(/Costs 1 Football/i) && document.body.innerHTML.match(/This mouse has no weakness/i))
    {document.getElementsByClassName('entryBlock')[0].click();
    alert("second");}
        else if (document.body.innerHTML.match(/Costs 1 Football/i) && document.body.innerHTML.match(/Challenge the mice of Gnawnia to a game of football!/i))
    {document.getElementsByClassName('entryBlock')[0].click();
    alert("third");}
        
        
            
    if (document.getElementsByClassName('target')[2])
    {  document.getElementsByClassName('target')[2].click();
    alert("shoot");}
    
    */
     
    
    
    }, 1500);