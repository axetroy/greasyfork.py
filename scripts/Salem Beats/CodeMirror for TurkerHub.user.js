// ==UserScript==
// @name         CodeMirror for TurkerHub
// @namespace    salembeats
// @version      4.2
// @description  @ChrisTurk the code blocks suck. Let's get some real syntax highlighting up in here. Latest update: Removed CodeMirror @requires that are no longer needed.
// @author       Cuyler Stuwe (salembeats)
// @include      https://turkerhub.com/threads/*/*
// @grant        none
// ==/UserScript==

function convertAllTheCode() {
    Array.from( document.querySelectorAll("div.code") )
        .forEach( codeBlock => {

        var newIframe = document.createElement("IFRAME");
        newIframe.style = "width: 1920px; height: 800px;";
        var newFrameHTML = `

<html>
<head>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.32.0/codemirror.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.32.0/mode/javascript/javascript.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.32.0/addon/fold/foldcode.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.32.0/addon/fold/foldgutter.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.32.0/addon/fold/brace-fold.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.32.0/addon/fold/comment-fold.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.32.0/codemirror.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.32.0/theme/monokai.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.32.0/addon/fold/foldgutter.css">
<style>
.CodeMirror {
border: 1px solid #eee;
height: auto;
}
</style>
</head>
<body>
<script>
window.addEventListener("message", function(event) {
if(event.data) {
if(event.data.code) {
CodeMirror(document.body, {
value: event.data.code,
mode: "javascript",
theme: "monokai",
viewportMargin: Infinity,
lineNumbers: true,
foldGutter: true,
gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]});
}
}
});
</script>
</body>
</html>

`;

        newIframe.src = URL.createObjectURL(new Blob([newFrameHTML], {type: "text/html"}));
        codeBlock.parentElement.insertAdjacentElement("afterend", newIframe);
        setTimeout(() => newIframe.contentWindow.postMessage({code: codeBlock.innerText.trim()}, "*"), 1500);
        codeBlock.remove();
    });
}

convertAllTheCode();

var imInUrSiteWatchinUrUpdates = new MutationObserver(function lolISeeU(mutations) {
    for(let mutation of mutations) {
        if(mutation.target.id === "messageList" && mutation.addedNodes.length > 0) {
            convertAllTheCode();
        }
    }
});

imInUrSiteWatchinUrUpdates.observe(document.body, {childList: true, subtree: true});