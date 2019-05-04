// ==UserScript==
// @name           DuckDuckGo Favicon Changer
// @namespace      *
// @description    Replace DuckDuckGo favicon with Google favicon.
// @include        https://duckduckgo.com/*
// @include        http://duckduckgo.com/*
// @grant          none
// @version 0.0.1.20140628062307
// ==/UserScript==


var head = document.getElementsByTagName('head')[0];
var icon = document.createElement('link');

icon.setAttribute('type', 'image/x-icon');
icon.setAttribute('rel', 'icon');

icon.setAttribute('href', 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAArdJREFUOI1Nks1rHWUUxn/nvDPjvR1iEj+wmEgs1k3RglFaFSnxqyLoUumqIAouClX8B1yZtbvixoXURSWKH1BwIVrIosVWrS6CYqk1Vmul1Zh7M/fOzPs+Lua29SwP5/mdw/Mce/19vX3mAs/1fLQQk0wpBjMjc9iqhYDcoY7gBkUeYnDTKPUuPLjAZ7ZvWeu5hvOyEJXaYGZIoqrhzlnDDYZjmCmNUS3+3hIhZJEUQ2PlxaxgOJ9uiBWTLA9w4JGcuhV77gns3Zlx/LuGE2stV7eQUhtEiAWDOY+y1DVQ5thgJA49XXDXrcbR1YY3PxyzfiWxrYATa5GbApaEUAxRIbkhl4SDNVHMls7++zN+WE/MlEYb4YNTDc/szpm7xanbhJsZCBTd+V8ZECUyNx66O3B1KOpWDCpx/nJiMBLBO48kw8xwADMjSQSHagzvfFnz7AMZBx/L2T7tPHpv4MgXNaNG+ARg1i29DjAz2gT9Aj4+3fDG0YrpvnHs8DbOric+/77ltiln3Cbcu3kQLmlyfoe8Ftvqj5FPvmkoMnh+MWPH7c5mJXI3UhJIneqJtwa6DjGoW9i/O2PnHc6lf0S/gAMP51QNvPZexZ8bIg8Q1XnmnSFdc7OCl5dyXtybc+xkw6dnGt79qubgkYrg8MpSQVWLEGxywQTg7sQE/UK8sKfg+LctZ3+J9Atj+4yz9ntk5VTTxZrAENdcdCykCURNhNPnIy8t5Ty+K6Nqugh3zTuLOwIffd2QOQgTEpgne2p5oCiLTgpNMt3cw159suC+eefXK+LyvwkHTv4cWf0pUvZMbSvzEKKTgu1b1m+5hnMyj6YUYhJbNcyWxlSvi+qvTTFqYKpnxCTMQzSl0Fh50RcXWKmtPBfclcxjcGO2NMatuLSR+GOj+8zp/g1xcFdt5bnFBVb+A5/wdpTKPeYpAAAAAElFTkSuQmCC');

head.appendChild(icon);