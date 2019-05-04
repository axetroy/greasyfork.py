// ==UserScript==
// @name         返回顶部按钮
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  给页面添加返回顶部按钮
// @author       李登科
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var a = document.createElement('a');
    if(!a)return;
    a.href="javascript:;";
    a.text="TOP";
    a.style.position="fixed";
    a.style.right="5%";
    a.style.bottom="25%";
    a.style.fontSize="20px";
    a.style.textDecoration="none";
    a.style.zIndex=9999;
    a.style.display="none";
    document.querySelector("body").appendChild(a);

    var enterRightBottom = 0;
    var leaveTop = 0;

    function showHide() {
        if (leaveTop && enterRightBottom) {
            a.style.display = "block";
        } else {
            a.style.display = "none";
        }
    }

    function animate({
		timing,
		draw,
		duration
	}) {
		let start = performance.now();

		requestAnimationFrame(function animate(time) {
			// timeFraction goes from 0 to 1
			let timeFraction = (time - start) / duration;
			if (timeFraction > 1) timeFraction = 1;

			// calculate the current animation state
			let progress = timing(timeFraction)

			draw(progress); // draw it

			if (timeFraction < 1) {
				requestAnimationFrame(animate);
			}

		});
	}

    window.addEventListener("mousemove", function(e) {
        enterRightBottom = e.clientX > window.innerWidth / 4 * 3 && e.clientY > window.innerHeight / 3 * 2;
        showHide();
    });

    window.addEventListener("scroll", function(){
        leaveTop = (+(document.body.scrollTop || document.documentElement.scrollTop) > 100);
        showHide();
    });

    a.addEventListener("click", function(){
        var height = window.scrollY;
		if (height === 0) return;
        animate({
			timing: function (timeFraction) {
				return 0.5 - Math.cos(timeFraction * Math.PI) / 2;
			},
			draw: function (progress) {
				window.scroll(0, height * (1 - progress));
			},
			duration: 200
		});
    });

})();