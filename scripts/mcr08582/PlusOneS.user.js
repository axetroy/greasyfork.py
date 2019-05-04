// ==UserScript==
// @name         PlusOneS
// @version      1926.8.17
// @description  _PlusOneS_
// @author       PlusOneS
// @include      *
// @grant        none
// @namespace https://greasyfork.org/users/193647
// ==/UserScript==

(function() {
    var coreSocialistValues = ["+1s"],
    index = Math.floor(Math.random() * coreSocialistValues.length);
    document.body.addEventListener('click',
    function(e) {
        if (e.target.tagName == 'A') {
            return;
        }
        var x = e.pageX,
        y = e.pageY,
        span = document.createElement('span');
        span.textContent = coreSocialistValues[index];
        index = (index + 1) % coreSocialistValues.length;
        span.style.cssText = ['z-index: 9999999; position: absolute; font-weight: bold; color: #ff6651; top: ', y - 20, 'px; left: ', x, 'px;'].join('');
        document.body.appendChild(span);
        animate(span);
    });
    function animate(el) {
        var i = 0,
        top = parseInt(el.style.top),
        id = setInterval(frame, 16.7);
        function frame() {
            if (i > 180) {
                clearInterval(id);
                el.parentNode.removeChild(el);
            } else {
                i += 2;
                el.style.top = top - i + 'px';
                el.style.opacity = (180 - i) / 180;
            }
        }
    }
} ());
+1s