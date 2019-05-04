// ==UserScript==
// @name         Pinterest Slideshow
// @namespace    http://tampermonkey.net/
// @version      1.02
// @description  Start a slideshow on any Pinterest page where there's pins. Clean and minimalist design. 5s interval between slides. Press ctrl+spacebar to start, left/right keys to navigate.
// @author       French Bond
// @match        https://www.pinterest.com/*
// @match        https://www.pinterest.ca/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(function() {
    'use strict';

    var pinList = [];
    var c = 0;
    var slideInterval = 5000;
    var interval;
    var running = 0;

    // Add the slideshow button in the header
    var slideshowButton = '<div><span class="slideshow" style="cursor:pointer; background-color: #C92228; color: #fff; padding: 8px; font-weight: bold; font-size: 14px; border-radius: 4px;">Slideshow</span></div>';
    $('body').append('<div style="position: fixed; bottom: 20px; left: 10px;">' + slideshowButton + '</div>');
    $('.slideshow').click(startSlideshow);

    function startSlideshow() {
        // Hide slideshow button
        $('.slideshow').hide();

        // List the pins
        pinList = [];
        $('img[srcset]').each(function(i) {
            var src = $(this).attr('srcset').match(/([^ ]*) 4x$/)[1];
            pinList[pinList.length] = src;
        });

        // Add the slideshow menu
        $('html').append('<div class="menu-slideshow" style="position: absolute; left:3px; top:3px; font-size:14px;"></div>');
        $('.menu-slideshow')
            .append('<div class="stop-slideshow" style="cursor:pointer; background-color: #C92228; color: #fff; padding: 7px; float:left; font-weight: bold; border-radius: 4px;">Stop</div>')
            //.append('<div class="options-slideshow" style="cursor:pointer; background-color: #666; color: #fff; padding: 7px; float:left; border-radius: 4px; margin-left:3px;">Options</div>')
            .append('<div class="info-slideshow" style="color: #ccc; padding: 7px; float:left;">/</div>');
        $('.stop-slideshow').click(function() {
            $('.menu-slideshow').remove();
            clearInterval(interval);
            running = 0;
            $('.App').css('display', 'block');
            $('body').css('background-color', '#fff');
            $('body').css('background-image', 'none');
            // Show slideshow button
            $('.slideshow').show();
            console.log('Slideshow stopped');
        });

        // Prepare the slideshow canvas
        $('.App').css('display', 'none');
        $('body').css('background-repeat', 'no-repeat');
        $('body').css('background-size', 'contain');
        $('body').css('background-position', 'center');
        $('body').css('background-color', '#333');

        console.log('Starting slideshow');
        console.log('Number of slides: ' + pinList.length);
        console.log('Slide interval: ' + (slideInterval/1000) + 's');

        // Start from first slide
        c = 0;
        clearInterval(interval);
        running = 1;
        showSlide();
        interval = setInterval(nextSlide, slideInterval);
    }

    function showSlide() {
        console.log('Current slide: ' + (c+1));
        $('body').css('background-image', 'url('+pinList[c]+')');
        $('.info-slideshow').html((c+1)+'/'+pinList.length);
    }

    function nextSlide() {
        c++;
        if (c > pinList.length-1) c = 0;
        showSlide();
    }

    function previousSlide() {
        c--;
        if (c < 0) c = pinList.length-1;
        showSlide();
    }

    $("body").keydown(function(e) {
        if (running) {
            if (e.keyCode == 37) { // left
                clearInterval(interval);
                previousSlide();
                interval = setInterval(nextSlide, slideInterval);
            }
            if (e.keyCode == 39) { // right
                clearInterval(interval);
                nextSlide();
                interval = setInterval(nextSlide, slideInterval);
            }
        } else {
            if (e.ctrlKey && e.keyCode == 32) startSlideshow();
        }
    });

});