// ==UserScript==
// @id             to-whatimg
// @name           To WhatIMG (Mac Version)
// @version        1.7
// @description    Send any image to WhatIMG by holding down ALT + Shift and then clicking on it.
// @namespace      hateradio)))
// @author         hateradio
// @homepage       https://userscripts.org/scripts/show/118005
// @icon           data:image/png;base64,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8AHQIz5iyxD5t25cd13fC/bvf/RzmzdNqSOLt1n8sENHb6TnbyJSE2TBNLa8GQkrOEGJoDRGuVJlolplenyUmbESnxkfsdvHAj43qZgd05RHy9WRkUJ88OAbJ6anp+NWq7XugCgAF+tYbNJG6O7aNTc2MV7Rtdt1HOuCN4HVARRnwPFxlSI/Nk3RhaJOmSznmakGbCy7bBh1mCo5jBcU5bymGChEhF63Fx8/fuIK8J9l+AkGRCHakrXq2Kh4/O13zn/p8YW9a7cH1XLg4OfHCAoF7tu2hfsqOSb9mId2bmQ8NLhph4nRHKMFl5wr+J6D4yiUUiIiVkRoNpuxKKWefvrLC6urK9WXXnqpWy6P3nFA1stQGZRvyTr95eW1ZWttUsjnmNuU50CwkeqIx/5HKmycKBD1+2ydLdFu97h1O8L3NVpblFL26vUbgzAIdLPZ6C0uLv77/N69U6+//sNDmzdvyqamJitLSx8VSqXyJxwYVkSMFYsuaZLVXqlUMPVG19l5/xYGUcIeLDnfY2Zjidu1ttUKOp2BnL/wm04UZ1rIolPvvbc0v3fPxA9+8PL7pXK5p5WkP3rjjeP7Fj6vzv3q7K/q9ds3QXwwa3fKcHgvf2m4xbDxBtJGSO+cwqodf/bsn//RH//hN57Mh54N86GcP3+x1elGqlZrxO+88875hYXfmfrhwTcXHcfrFAtecujQoVPTG2b8W2u1lSTurSFkOMUa6aBNblMPdybBYhDf4LuWtTfXHWgchZHftaCa4ObxNpYxcbBz5/aRfz39i1s//vE/fbCwsG/qJz859EGWpcul4oj/3qn3f3H4yD+7zdagmcWNJVAWd0NveSWNcSZiQjdFOSlIRuCmSGiRVA/X9NTc2aB/fDAJ94HywMZTmM4MWXd83yNzD3U6neq5sx+e137OZiZbJW0vQZDDr6RYZVDuAKSH0ga0ASdDxAwvbSCziBgQi9EWZS1CDMZQP/FfTkbhAiTXHHRhIzBG0tNYDLnSAJwUUTHiZIijEa2wYoEWiEUELBYrFmUNimFQsRaswboWay1iDUoSMJba2//N2VAFDv6WPLpYQFwXEQFl1w3LEBkATaykYB0MgsICBoNFMMMWZy1kIBnYHFjUcHejMizQO/I/HE6LjwPWBdz15TrDSoKyKVhonuD/Ov4D8tqkTJP7nUoAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTAtMDUtMjRUMDc6NDI6MjQtMDY6MDDI+TR9AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEwLTA1LTI0VDA3OjQyOjI0LTA2OjAwuaSMwQAAADV0RVh0TGljZW5zZQBodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9MR1BMLzIuMS87wbQYAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAA90RVh0U291cmNlAG51b3ZlWFQy6iA23AAAACJ0RVh0U291cmNlX1VSTABodHRwOi8vbnVvdmV4dC5wd3NwLm5ldJGJxy0AAAAASUVORK5CYII=
// @icon64         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAA3WAAAN1gGQb3mcAAAACXZwQWcAAABAAAAAQADq8/hgAAAeH0lEQVR42u2bebAlV33fP79zer37u++9ecus0mySpQEJATJmx7JjGxCUE5Yqg102uMp2VGAFV5wipmyQnQS7HGMHTAoM2MHYJA6rAGETUGxhAR4E0iBmkWbTbG/e/t5d+3b3OSd/9L3znqSRNBKO/UfSVV093fe87vP7/n6/7285Z+D/8UP+uSfwTI93v/u3qjfccMOPx3G87eLFi0fe9ra3f31tba0PuKfzHv3PLciTHArAOYfneY1f+7V3vPHWW1+95/DhI2cXFxfzn/3ZN7/kec977oe2b9/+r8IwPHD06LF7T5w4sQKYp/MR759Twr/7u3v4lV/5ZT05OendfffdGWDvuOOO5vOe99yf6ff7+R13/PZficjqRz7ykRfs37//9/I8S9/xjn/z/lardfKaa/a/qVarTWmtJUkGzX6/vxM4AaQ8DSv4JwXg53/+50sioj/60Y92AfvlL3+p+Yd/+L7bsizTIvKhr33tawvbtm198d69e95trbO//uv/dm+v13vkuut+6NZardpUSsmP//iP/aYxNo3jqOx5nszPLyQf/vCf/O0993x9nWfg0v/oADjnePOb3yT79u2vd7s9+Yu/+ETr7Nmz5p3vfOfkT/7kT7w7z3O9srL8e5/97OfO7du37xVXXbXrdqWUvv32t+9461vfcvzaa695Va1WayileMlLXvw2a63xfd/XuvDWUqkUAMHoe+vra/3777//GLgFnqb24QfkAOcc8/Pz6o1vfOPEC17wguri4mJ622232de//vXTt9xyy3/Zs2f3rUtLy0cPHTrU/8VffOsrn/WsA/9ucnLipt279+x+7WtvPXD99Qd+cXy8uT2KomB6evrZO3fufNnY2Nh2pVQxOa3F8zytlMI550TkcRqO49gfHx8f+H5w+NSpU+fyPM/+r1iAc463vOUX9I033jidplnp4x//+FkRSX7nd357+kUveuF/dc5Fa2urd7RarYevvvrqV23dOvtK3/fjX/7lX5p+05t+5uFdu3a+rFKpVEWEAweuf7Ux5tW+7zOUyfm+LwxN+HLCbr53DkZ3pVJJv/KV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
// @include        *://*
// @grant          GM_openInTab
// ==/UserScript==

(function () {
	'use strict';

	var whatimg = {
		url : 'https://whatimg.com/index.php?url=1#',
		init : function () {
			if (document.URL.indexOf(this.url) !== -1) {
				this.send();
			} else {
				var i = document.getElementsByTagName('img'), b = i.length;
				while (b--) {
					i[b].addEventListener('click', whatimg.go, false);
				}
			}
		},
		go : function (e) {
			if (e.altKey && e.shiftKey) {
				e.preventDefault();
				this.removeEventListener('click', whatimg.go, false);
				whatimg.open(whatimg.url + this.src);
			}
		},
		send : function () {
			var i = document.querySelector('.input_field');
			if (i) {
				i.value = document.location.hash.substring(1);
				document.querySelector('form').submit();
			}
		},
		open : (function () {
			try {
				return GM_openInTab;
			} catch (e) {
				return function (url) { window.open(url); window.focus(); };
			}
		}())
	};
	whatimg.init();

}());
