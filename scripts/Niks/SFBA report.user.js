// ==UserScript==
// @name         SFBA report
// @namespace    https://trade.aliexpress.com/
// @include      https://trade.aliexpress.com/orderList.htm*
// @include      https://trade.aliexpress.com/order_list.htm*
// @include      https://my.aliexpress.com/wishlist/*
// @include      https://www.banggood.com/index.php?*ordersList*
// @include      https://www.amazon.*/gp/your-account/order-history*
// @include      https://www.amazon.*/gp/css/order-history*
// @include      https://www.amazon.*/gp/your-account/order-details*
// @include      https://user.gearbest.com/my-orders.htm*
// @include      https://forum.hardware.fr/*
// @version      0.83
// @description  Copie les dernières commandes des sites SFBA dans le presse papier et met en forme en bbcode
// @grant        GM_setClipboard
// @grant        GM_registerMenuCommand
// ==/UserScript==


// Reécriture des liens aliexpress s'ils pointent sur le fr
if(window.location.href.indexOf("hardware") > -1)
{
    var urls = document.getElementsByTagName("a");
    
    for (var i = 0; i < urls.length; i++)
    {
        if (urls[i].href.startsWith("https://fr.aliexpress.com"))
        {
            var newUrl = urls[i].href.replace("https://fr.aliexpress.com", "https://aliexpress.com");
            urls[i].setAttribute("href", newUrl);
            
        }
    }
}
else
{
    GM_registerMenuCommand('Copier les produits', checkCurrentSite);
}

var postEntete = "[:deejayboulette:5]\n#SFBAreport\n";


function checkCurrentSite()
{
   if(window.location.href.indexOf("banggood") > -1)
   {
       getBGOrders();
   }
   else if(window.location.href.indexOf("aliexpress") > -1)
   {
       if (window.location.href.indexOf("wishlist") > -1)
       {
           getAEWishes();
       }
       else
       {
           getAEOrders();
       }
   }
   else if (window.location.href.indexOf("amazon") > -1)
   {
       getAZOrders();
   }
   else if (window.location.href.indexOf("gearbest") > -1)
   {
       getGBOrders();
   }
}

function getGBOrders()
{
    var post = "[b]Gearbest[/b]\n\n";
    var tags = document.getElementsByTagName('dl');
    for (var i = 0; i < tags.length; i++)
    {
        if (tags[i].className == "clearfix")
        {
            var title = [];
            var link = [];
            var img = [];
            var price;
            
            title.push(tags[i].children[0].children[1].children[0].children[0].innerText);
            link.push(tags[i].children[0].children[0].children[0].href);
            img.push(convertToLargePicture("GB", tags[i].children[0].children[0].children[0].children[0].src));
            price = tags[i].children[0].children[3].children[0].children[0].children[1].innerText;
            
            post += formatPost(title, link, img, price);
        }
    }
    GM_setClipboard(postEntete+post); 
}

function getBGOrders()
{
    var priceList = [];
    var post = "[b]Banggood[/b]\n\n";
      
    
    var tags = document.getElementsByTagName('table');
    for (var i = 0; i < tags.length; i++)
    {
        if (tags[i].className == "detail_sub")
        {
            for (var j = 0; j < (tags[i].children[0].children.length); j++)
            {
                var title = [];
                var link = [];
                var img = [];
                var price;
                
                title.push(tags[i].children[0].children[j].children[1].children[0].innerText);
                link.push(tags[i].children[0].children[j].children[1].children[0].href);
                img.push(convertToLargePicture("BG", tags[i].children[0].children[j].children[0].children[0].children[0].src));
                price = tags[i].children[0].children[j].children[1].children[1].innerText;
            
                post += formatPost(title, link, img, price);
            }
        }   
    }
    GM_setClipboard(postEntete+post);
}

function getAZOrders()
{
    var post = "[b]Amazon[/b]\n\n";
    var priceList = [];
    var priceTags = document.getElementsByTagName('span');
    for (var j = 0; j < priceTags.length; j++)
    {
        if (priceTags[j].className == "a-size-small a-color-price")
        {
            priceList.push(priceTags[j].innerText);
        }
    }
    
    var tags = document.getElementsByTagName('div');
    var id = 0;
    for (var i = 0; i < tags.length; i++)
    {
        if (tags[i].className == "item-view-left-col-inner")
        {
            var title = [];
            var link = [];
            var img = [];
            var price;
            
            img.push(convertToLargePicture("AZ", tags[i].children[0].children[0].src));
            link.push(tags[i].children[0].href);
            title.push(tags[i].parentElement.parentElement.children[1].children[0].children[0].innerText);
            price = priceList[id];
            
            post += formatPost(title, link, img, price);
            
            id++;
        }
    }
    GM_setClipboard(postEntete+post);
}

function getAEWishes()
{
    var post = "Wish list [b]Aliexpress[/b]\n\n";
    var tags = document.getElementsByTagName('li');
    
    for (var i = 0; i < tags.length; i++)
    {
        if (tags[i].className.indexOf("product") > -1)
        {
            var title = [];
            var link = [];
            var img = [];
            var price;
            
            img.push(convertToLargePicture("AE", tags[i].children[0].children[1].src));
            link.push(tags[i].children[0].href);
            title.push(tags[i].children[1].children[0].innerText);
            price = tags[i].children[1].children[1].children[0].innerText;
                
            post += formatPost(title, link, img, price);
        }
    }
    GM_setClipboard(postEntete+post);
}

function getAEOrders()
{
    var post = "[b]Aliexpress[/b]\n\n";
    var tags = document.getElementsByTagName('td');
    for (var i = 0; i < tags.length; i++)
    {
        if (tags[i].hasAttribute("class"))
        {
            if (tags[i].className == "product-sets")
            {
                var title = [];
                var link = [];
                var img = [];
                var price;
                
                img.push(convertToLargePicture("AE", tags[i].children[0].children[0].children[0].src));
                link.push(tags[i].children[1].children[0].children[0].href);
                title.push(tags[i].children[1].children[0].children[0].title);
                price = tags[i].children[1].children[2].innerText;
                
                post += formatPost(title, link, img, price);
            }
        }
    }
    GM_setClipboard(postEntete+post);
}

function convertToLargePicture(site, picture)
{
    var resized = picture;
    
    switch(site)
    {
        case "AE":
            // Picture url format is https://ae01.alicdn.com/kf/blablabla.jpg_50x50.jpg   
            resized = picture.replace("50x50", "120x120");
            /* Remplace l'image en https par sa version en http */
            resized = resized.replace("https", "http");
            break;
            
        case "AZ":
            resized = picture.replace("SY90", "SY120");
            resized = resized.replace("SX90", "SX120");
            break;
        
        case "BG":
            resized = picture.replace("other_items", "grid");
            /* Remplace l'image en https par sa version en http */
            resized = resized.replace("https", "http");
            break;
            
        case "GB":
            //resized = picture.replace("thumb-img", "goods-img");
            //resized = resized.replace("thumb-", "");
            /* Remplace l'image en https par sa version en http */
            resized = resized.replace("https", "http");
            break;
            
        default:
            break;

    }

    return resized;  
    
}

function truncate(str, n)
{
    var isTooLong = str.length > n,
    s_ = isTooLong ? str.substr(0,n-1) : str;
    s_ = isTooLong ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
    return  isTooLong ? s_ + '...' : s_;
}

function formatPost(title, link, img, price)
{
    var post = "";
    
    for(var i=0; i<img.length; i++)
    {
         post += "[img]" + img[i] + "[/img]";
    }
    post += "\n";
    for (i=0; i<link.length; i++)
    {
        post += "[b][url=" + link[i] + "]" + truncate(title[i],80) + "[/url][/b]\n";
    }
     
    post += price + "\n";
    post += "Mon avis: \n\n";
    
    return post;
}