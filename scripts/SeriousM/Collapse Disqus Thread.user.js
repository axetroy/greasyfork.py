// ==UserScript==
// @name       Collapse Disqus Thread
// @namespace  https://greasyfork.org/users/4390-seriousm
// @version    0.19
// @description  This script collapses disqus thread
// @match      http://*/*
// @copyright  2013+, SeriousM
// ==/UserScript==

if (typeof jQuery == 'undefined' || !jQuery) return;

var disqusThreads = jQuery('#disqus_thread');

if (!disqusThreads) return;

var length = disqusThreads.length,
    disqusThread = null,
    i;

for (i = 0; i < length; i++) {
    disqusThread = jQuery(disqusThreads[i]);
    
    var toggleLink = jQuery('<b>&gt;&gt; Toggle Disqus Thread &lt;&lt;</b>').css('cursor', 'pointer').css(':hover', 'color:red');
    var linkWrap = toggleLink.wrap("<div>").parent();
    linkWrap.css("text-align", "center").css("margin-bottom", "10px");
    
    var threadLoaded = false;
    
    toggleLink.click(function(){
        if (!threadLoaded){
            DISQUS.reset({reload: true});
            threadLoaded = true;
        }
        disqusThread.toggle();
    });
    
    disqusThread.before(linkWrap);
    
    disqusThread.toggle();
    disqusThread.empty();
}