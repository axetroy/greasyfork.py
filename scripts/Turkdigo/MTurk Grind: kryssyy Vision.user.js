// ==UserScript==
// @name         MTurk Grind: kryssyy Vision
// @author       Turkdigo
// @icon         http://www.mturkgrind.com/data/avatars/l/5/5824.jpg
// @version      1.01
// @description  See what kryssyy sees.
// @require      http://code.jquery.com/jquery-latest.min.js
// @match        http://www.mturkgrind.com/*
// @namespace https://greasyfork.org/users/9008
// ==/UserScript==

$(document).ready(function(){

    var randomFill = Math.ceil(Math.random()*100);
    
    function randomNumber(){
        randomFill = Math.ceil(Math.random()*100);
    }
    
    $("a.username.avatar > img").each(function(i) {
        
        randomNumber();
    
        if (randomFill >= 0 && randomFill <= 10) { 
            $(this).attr("src", "http://publish.illinois.edu/dancing/files/2014/11/donald-s-pizza-dance-o.gif");
        } else if (randomFill > 10 && randomFill <= 20) {
            $(this).attr("src", "https://pbs.twimg.com/profile_images/3356422133/e5e9271c7b7ac02abc6c6de59c8d85e3.png");
        } else if (randomFill > 20 && randomFill <= 30) {
            $(this).attr("src", "http://cdn.shopify.com/s/files/1/0066/5282/files/pizzacat_2.jpg?1805");
        } else if (randomFill > 30 && randomFill <= 40) {
            $(this).attr("src", "https://s-media-cache-ak0.pinimg.com/originals/60/cd/20/60cd200955c90b607efe0c7ff2f46975.gif");
        } else if (randomFill > 40 && randomFill <= 50) {
            $(this).attr("src", "https://tribwdcw.files.wordpress.com/2014/09/oh-yes-we-did-pepperoni-pizza-cake_01.jpg?w=770");
        } else if (randomFill > 50 && randomFill <= 60) {
            $(this).attr("src", "http://globalgeeknews.com/wp-content/uploads/2012/07/Angry-Birds-Pizza.jpg");
        } else if (randomFill > 60 && randomFill <= 70) {
            $(this).attr("src", "https://iarethefoodsnob.files.wordpress.com/2010/04/dsc06858.jpg");
        } else if (randomFill > 70 && randomFill <= 80) {
            $(this).attr("src", "http://cdn.firstwefeast.com/assets/2014/09/face.jpg");
        } else if (randomFill > 80 && randomFill <= 90) {
            $(this).attr("src", "http://s3.amazonaws.com/overlayer/photo/imgs/1361914304-pizza-face-jacquelinesotoespinoza20130226-19-1ofjp0v.jpg");
        } else if (randomFill > 90 && randomFill <= 100) {
            $(this).attr("src", "https://bettercookies.files.wordpress.com/2014/04/easter-bunny-pizza-biscuit.jpg");
        }
    });
    

    
    $("img.bbCodeImage.LbImage[src*='.gif']").each(function(i) {
        
        randomNumber();
    
        if (randomFill >= 0 && randomFill <= 10) { 
            $(this).attr("src", "http://publish.illinois.edu/dancing/files/2014/11/donald-s-pizza-dance-o.gif");
        } else if (randomFill > 10 && randomFill <= 20) {
            $(this).attr("src", "https://38.media.tumblr.com/73de5f5be453bae47bee29f72c535a0f/tumblr_nvie2l838i1qklhrmo1_400.gif");
        } else if (randomFill > 20 && randomFill <= 30) {
            $(this).attr("src", "http://media3.giphy.com/media/sTUWqCKtxd01W/giphy.gif");
        } else if (randomFill > 30 && randomFill <= 40) {
            $(this).attr("src", "https://s-media-cache-ak0.pinimg.com/originals/60/cd/20/60cd200955c90b607efe0c7ff2f46975.gif");
        } else if (randomFill > 40 && randomFill <= 50) {
            $(this).attr("src", "http://media.giphy.com/media/VmhozsNNSsuwE/giphy.gif");
        } else if (randomFill > 50 && randomFill <= 60) {
            $(this).attr("src", "http://media1.giphy.com/media/2LqQkIPKNevkc/giphy.gif");
        } else if (randomFill > 60 && randomFill <= 70) {
            $(this).attr("src", "http://media3.giphy.com/media/eLLagHAuibOMg/giphy.gif");
        } else if (randomFill > 70 && randomFill <= 80) {
            $(this).attr("src", "http://www.quirkycookery.com/wp-content/uploads/2013/08/tumblr_m7rd9g76mK1roba31o1_250.gif");
        } else if (randomFill > 80 && randomFill <= 90) {
            $(this).attr("src", "http://data.whicdn.com/images/171390320/large.gif");
        } else if (randomFill > 90 && randomFill <= 100) {
            $(this).attr("src", "http://media.giphy.com/media/dlE9ehUI4Vrl6/giphy.gif");
        }
    });

    //$("a.username > span").each(function(i) {
    //    randomNumber();
    //    $(this).html("Pizza" + randomFill * 17);
    //});
    
    $("em.userTitle").html("Tastes like pizza..?");
    $("li.ribbon1").html("Pepperoni");
    $("li.ribbon2").html("Olives");
    $("li.ribbon3").html("Banana Peppers");
    $("li.ribbon4").html("Green Peppers");
    $("li.ribbon5").html("Sardines");
    $("li.ribbon6").html("Red Onions");
    $("li.ribbon7").html("Pineapple");
    $("li.ribbon8").html("Ham");
    $("li.ribbon9").html("Bacon");
    $("li.ribbon10").html("Canadian Bacon");
    $("li.ribbon11").html("Extra Cheese");
    $("li.ribbon12").html("Cheese");
    $("li.ribbon13").html("Light Sauce");
    $("li.ribbon14").html("Extra Sauce");
    $("li.ribbon15").html("Mushrooms");
    $("li.ribbon16").html("Beef");
    $("li.ribbon17").html("Italian Sausage");
    $("li.ribbon18").html("Sausage");
    $("li.ribbon19").html("Parmesan");
    $("li.ribbon20").html("Meatball");
    
    $("h2.uix_textLogo").html("Mturk<span>PIZZA</span>");
    
});