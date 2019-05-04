// ==UserScript==
// @author       nht.ctn
// @name         VPN'siz Vikipedi ve Imgur
// @namespace    https://github.com/nhtctn
// @version      1.0
// @description  Sayfadaki Vikipedi/Wikipeia veya Imgur linklerinin başına 0 getirerek o adresi VPN'siz şekilde açabilmenizi sağlar. Bu hizmetin asıl sahibi sunucu sahiplerine teşekkürler.
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuOWwzfk4AAANASURBVGhD7ZntjeJAEEQhCtIgC1IgAzIgBSIgCCIgBEIgBaLAt887tWp6e77MD3tPWHo6H66Z6eruGVvaVel6Pp/DEkjhtF3RBEsihRlf0YAlksJ9vSLhkklhf1+R4C+Qwv8YmI0/Hbz4GJibj4G5+TGw2+2G7XY7wv1+v3/BPj8ej+OYVv3tdhsul0tWL21tXum4V9w/BliECRCs1+uQzWYznE6nUcuY6/U6HA6HF83XwTbCPc8IHO39fh/O5/MYhNfzG8/Q5OYFrS8d/Gqhx+MxGlEQdjDPvB4Ikud2DAtFWha3SSLwSAfMIR0mo/XDPYCQMmkw2LJFYBqdKqB28Ni50eSSAiQGHcmxWbdkNzFltFkla6XFaCub2VzF0PEMbS4oQXVYP1dNyBpgcfpQGQVMRVqhKoioPQiGubQ3crC+Nq32XETWANjeBiaLdEL9jTaqgrKf62cLyWKeXCuKogFlQQaglA3wVbDl18nSkn32CWZrVS8aANrABoShSCeoAgujxbCqgHF+qx0G0KOtGmBxtYWobT5/hlOV1oyCjs9apaBqANQWMlDLjKqAlnGqCMYivYWEoa/tN9FkwLaFYKFIKzApA8D4WuVALVt6wVmaDAABKRioZZNgpcUIBmqmQdlv0UKzAR2BCqolIG+6diTS85gtvbg8zQaAzBCIWqO2kN/MjC+1ESdca6VElwFOEAWDidJGsy1kyVWBCjNny0a3dBkA30a5zab2oS2kB7IcVUH6lo1u6TZAwGRKRC82vYiUTZ1IwO++9VQtdPb3FroNgKpAQNz7F47vZdtOjPF7QXulN/swyQAZVDbBZk4niW8ttYjQc0xitvaJkmOSAS1KoKoCbcMzAonOcbWVkEafDRrfyyQDwGmiKvAvgZBV/h99wxCsP1bRY6R0mtWYbIB+VQVUBbWCz76wxzCoipHhViYbIEjf11D62tQYazxqtx4mGwDf1y0vIf9e8Ju9l7cMkDlahkBoh5ZvfVs5xkw5Oi1vGQAdm7UPNYs2e8+YHG8bIIME0nMMUgXaberRaXnbwNx8Vf/zN7LZSOH/Bwa4IsGSSWG/XpFwiaRw4ysasCRSmG1XNMEcpHCCa7X6BxTCsFZwcxMpAAAAAElFTkSuQmCC

// @include      *

// ==/UserScript==

(function() {
    'use strict';

    var wikiLinks = document.querySelectorAll( '[href*="wikipedia.org/wiki/"]' );
    addZero( wikiLinks, "wikipedia" );

    var imgurLinks = document.querySelectorAll( '[href*="imgur.com/"]' );
    addZero( imgurLinks, "imgur" );


    function addZero( links, site )
    {
        for ( var x = 0; x < links.length; x++ )
        {
            var target = links[x].href;
            var newTarget = target.replace( site, "0" + site );
            links[x].setAttribute( "href", newTarget );
        }
    }

})();