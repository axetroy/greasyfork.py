// ==UserScript==
// @name         Reddit Multi Column
// @namespace    https://gist.github.com/c6p/463892bb243f611f2a3cfa4268c6435e
// @version      0.1.12
// @description  Multi column layout for reddit redesign
// @author       Can Altıparmak
// @homepageURL  https://gist.github.com/c6p/463892bb243f611f2a3cfa4268c6435e
// @match        https://www.reddit.com/*
// @grant        none
// ==/UserScript==
/* jshint esversion: 6 */

(function() {
    'use strict';
    const MIN_WIDTH = 400;
    const COLUMNS = 4;
    let columns = COLUMNS;
    let cleanup = false;

    // https://codepen.io/jpkempf/pen/MbePGB
    function debounce(fn, wait) {
        var timeout;
        return function() {
            var context = this;
            var args = arguments;
    
            clearTimeout(timeout);
        
            timeout = setTimeout(function() {
                fn.apply(context, args);
            }, wait);
        };
    }
  
    const OUTER = ['#SHORTCUT_FOCUSABLE_DIV > div > div > div > div > div:nth-child(2) > div:nth-child(4)']
    const cardButton = () => document.querySelector('#layoutSwitch--card');

    const indexOfSmallest = function (a) {
        let lowest = 0;
        for (let i = 1; i<a.length; i++) {
            if (a[i] < a[lowest]) lowest = i;
        }
        return lowest;
    };

    const select = function() {
        let outer = null;
        for (let o of OUTER) {
            outer = document.querySelector(o);
            if (outer !== null) break;
        }
        //console.warn(outer)
        let inner = outer !== null ? outer.firstChild.lastChild.previousSibling : null;
        try {
          // fix for OC
          if (outer.firstChild.firstChild.firstChild.lastChild.textContent === "Best")
            inner = outer.firstChild.firstChild.lastChild.previousSibling
        }
        catch(err) {}
        finally {
          //console.warn(outer, inner)
        }
        return { outer, inner };
    }

    const makeLayout = debounce(function(changes=[]) {
        // TODO if changes not empty, update only changed
        const { outer, inner } = select();
        if (inner === null) return;

        const c = cleanup;
        if (c) {
            outer.style = 'max-width: 100%'
            outer.firstChild.removeAttribute("style");
            inner.removeAttribute("style");
        } else {
            outer.style = 'width: 100%; max-width: 100%';
            outer.firstChild.style = 'width: 100%; max-width: 100%';
            inner.setAttribute("style", "width: 100%; position: relative;");
        }

        const cols = Math.floor(inner.offsetWidth / MIN_WIDTH);
        //if (changes.length === 0 && cols === columns) return;
      
        columns = cols;
        const WIDTH = Math.floor((100-columns)/columns);

        let posts = inner.children;
        let heights = Array(columns).fill(0);
        for (let i=0; i<posts.length; i++) {
            const post = posts[i];
            const col = indexOfSmallest(heights);
            let s = post.style
            s.position = c ? "" : "absolute";
            s.width = c ? "" : `${WIDTH}%`;
            s.left = c ? "" : `${col*(WIDTH+1)}%`;
            s.top = c ? "" : `${heights[col]}px`;
            s.zIndex = "10";
            heights[col] += post.offsetHeight;
        }
        inner.style.height = c ? "" : `${Math.max(...heights)}px`;
    }, 100);

    const setLayout = function(changes, observer) {
        const button = cardButton();
        const c = button.getAttribute("aria-pressed") === "false";
        if (c !== cleanup) {
            cleanup = c;
            window.requestAnimationFrame(makeLayout);
        }
    };

    const pageChange = new MutationObserver(makeLayout);
    window.addEventListener('resize', () => makeLayout());
    const layoutSwitch = new MutationObserver(setLayout);

    const watch = function(changes, observer) {
        const { inner } = select();
        if (inner === null) return;
        layoutSwitch.observe(cardButton(), {attributes: true});
        pageChange.observe(inner, {childList: true});
    };

    const apply = new MutationObserver(watch);
    const page = document.querySelector('#SHORTCUT_FOCUSABLE_DIV');
    apply.observe(page, {childList: true, subtree: true});

    watch();
    setLayout();
    window.requestAnimationFrame(makeLayout);
})();