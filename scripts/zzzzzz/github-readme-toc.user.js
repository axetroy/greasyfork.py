// ==UserScript==
// @name         github-readme-toc
// @namespace    https://github.com/turnon/github_readme_toc
// @version      0.0.6
// @description  add table of content for readme in github repo
// @author       block24block@gmail.com
// @match        https://github.com/*/*
// @grant        none
// ==/UserScript==
(function () {
    if (window.location.pathname.match(/\w\/\w/g).length > 1) return

    let style = document.createElement('style'),
        css = '\
#github-readme-toc {\
    position: fixed;\
    top: 186px;\
    left: calc((100% - 978px) / 2 + 1000px);\
    right: 0;\
    padding-right: 15px;\
    list-style-type: none;\
    overflow-y: auto;\
    bottom: 250px;\
    direction: rtl;\
}\
#github-readme-toc::-webkit-scrollbar {\
    width: 2px;\
}\
#github-readme-toc::-webkit-scrollbar-track {\
    background: #d1d5da;\
}\
#github-readme-toc::-webkit-scrollbar-thumb {\
    background: #0366d6;\
}\
#github-readme-toc a {\
    overflow: hidden;\
    white-space: nowrap;\
    text-overflow: ellipsis;\
    display: block;\
    direction: ltr;\
    text-align: left;\
    padding-left: 10px;\
    text-decoration: none;\
}\
#github-readme-toc a:hover {\
    background: #f1f4f7;\
}'

    style.type = 'text/css'
    style.appendChild(document.createTextNode(css))
    document.head.insertAdjacentElement('beforeend', style)

    let fragments = ['<ul id="github-readme-toc">'],
        space = "&nbsp;",
        item_begin = '<li><a href="#',
        item_end = '</a></li>'

    document.querySelector('#readme .Box-body').querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
        fragments.push(item_begin)
        fragments.push(h.querySelector('a').id)
        fragments.push('">')
        fragments.push(space.repeat(parseInt(h.nodeName.replace('H', '') - 1) * 2))
        fragments.push(h.innerText)
        fragments.push(item_end)
    })

    fragments.push('</ul>')

    document.body.insertAdjacentHTML('afterbegin', fragments.join(''))
})()