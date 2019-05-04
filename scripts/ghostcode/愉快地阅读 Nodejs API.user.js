// ==UserScript==
// @name         愉快地阅读 Nodejs API
// @namespace    
// @version      1.0
// @description  View the Nodejs API more comfortably
// @author       You
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @match        https://nodejs.org/dist/latest*
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */
(()=>{
    const apiContainer = document.querySelector('#toc')

    if (!isInPage(apiContainer)){
        return;
    }

    const apiTree = apiContainer.querySelector('ul')

    if(!isInPage(apiTree)){
        return;
    }

    const handShank = document.createElement('div')
    const arrowRight = document.createTextNode('>>')

    let status = true // true:open; false:close
    let apiContainerWidth = 0
    let handShankWidth = 32

    let apiContainerStyle = `
    position:fixed;
    z-index:10;
    right:-18px;
    top:0;
    height:100%;
    background-color:#89A39A;
    padding-bottom:60px;
`

    let apiTreeStyle = `
    height:100%;
    overflow-y:scroll;
`

    let handShankStyle = `
    position:absolute;
    top:50%;
    left:0;
    margin-top:-150px;
    width:2rem;
    height:300px;
    line-height:300px;
    text-align:center;
    cursor:pointer;
    background-color:#333;
    -webkit-font-smoothing: antialiased;
    border-radius:0 10px 10px 0
`

    handShank.style.cssText = handShankStyle
    apiContainer.style.cssText = apiContainerStyle
    apiTree.style.cssText = apiTreeStyle

    handShank.appendChild(arrowRight)
    apiContainer.appendChild(handShank)

    // after position:fixed get the real width
    apiContainerWidth = apiContainer.clientWidth

    handShank.addEventListener('click', function (params) {
        if (status) {
            apiContainer.style.cssText = `${apiContainerStyle};right:-${apiContainerWidth - handShankWidth}px`
            status = false
        } else {
            apiContainer.style.cssText = apiContainerStyle
            status = true
        }
    }, true)

})()

// check node is exist
function isInPage(node){
    return document.body.contains(node)
}

/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */