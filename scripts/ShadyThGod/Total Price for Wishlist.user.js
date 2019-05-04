// ==UserScript==
// @name         Total Price for Wishlist
// @namespace    ShadyThGod
// @version      1.0
// @description  Adds a total price under wishlists
// @author       ShadyThGod
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @include      https://www.thriftbooks.com/list/view/*
// @grant        none
// ==/UserScript==
$(document).ready(function(){
    var prices = $('.WishList-ItemPrice');
    console.log(prices);
    var totalPrice = parseFloat("0");
    $.each(prices, function(){
        totalPrice += parseFloat(this.innerText.split('$')[1]);
    });
    totalPrice = "$" + totalPrice;
    console.log(totalPrice);
    $('.WishList-List').append('<div class="tb-BreadCrumbs" style="text-align: right; font-size: 1.14rem"><b>Total Price:</b></div><div class="WishList-ItemPrice" style="text-align: right; font-size: 2rem">'+totalPrice+'</div>');
});