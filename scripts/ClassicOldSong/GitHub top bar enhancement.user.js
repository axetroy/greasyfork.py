// ==UserScript==
// @name         GitHub top bar enhancement
// @namespace    https://ccoooss.com/
// @version      0.1.20
// @description  Fix and Auto Hide GitHub Top Bar w/ Ocototree caused headerbar displacement fix
// @author       Yukino Song
// @match        https://github.com
// @match        https://github.com/*/*
// @match        https://gist.github.com/*
// @grant        none
// ==/UserScript==

const getStyle = height => `
body {
	padding-top: ${height}px;
}

.js-header-wrapper {
	z-index: 120;
}

header {
	position: fixed !important;
	width: 100%;
	min-width: 1020px;
	top: 0;
	left: 0;
	z-index: 50;
	transform: translate3d(0, 0, 0);
	transition: transform .3s;
}

header.hidden {
	transform: translate3d(0, -${height}px, 0);
}

summary.HeaderNavlink.name.mt-1::before {
	height: 100vh;
}

@media screen and (max-width: 1480px) {
    .octotree-show .Header {
        min-width: 1246px;
    	padding-left: 226px;
    }

    .octotree-show .Header .container-lg {
        margin-left: 0;
    }
}
`;

const getScrollHeight = () => {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
};

// Use native smooth scrolling method (Chrome >= 61, Firefox >= 36)
const smoothScrollTop = () => window.scroll({
    top: 0,
    behavior: 'smooth'
});

(function() {
    'use strict';
    // Your code here...
    // Inject style
    const header = document.querySelector('header');
    if (!header) return;

    const headerHeight = parseInt(window.getComputedStyle(header).height, 10);
    document.querySelector('head').insertAdjacentHTML('beforeend', `<style>${getStyle(headerHeight)}</style>`);

    let previousHeight = getScrollHeight();

    const updateScroll = () => {
        const prev = previousHeight;
        const height = getScrollHeight();
        previousHeight = height;

        // Always show on top
        if (height < headerHeight) {
            header.classList.remove('hidden');
            return;
        }

        if (height > prev) header.classList.add('hidden');
        else header.classList.remove('hidden');
    };

    window.addEventListener('scroll', updateScroll);
    header.addEventListener('dblclick', smoothScrollTop);
})();