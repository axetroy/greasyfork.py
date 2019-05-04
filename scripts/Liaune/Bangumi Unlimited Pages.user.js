// ==UserScript==
// @name         Bangumi Unlimited Pages
// @namespace    https://github.com/bangumi/scripts/liaune
// @version      0.4
// @description  自动加载下页
// @author       Liaune
// @include      /^https?://(bangumi\.tv|bgm\.tv|chii\.in)/.*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    var iframeLoader = false;//If true, load pages inside a hidden iframe instead of with XMLHttpRequest--other bgm scripts might work better with this on.
    var scrollBuffer = 100;//Minimum height remaining to scroll before loading the next page.
    var timeToFailure = 10;//Seconds to wait for a response from the next page before attempting to fetch the page again.


    var mainTable, bottomDoc, nextPage, timeout = 0, pending = false, totalPages = 0, loadAll = 0, Autoload = false, loadAllLink=null;

    mainTable = getMainTable(document);
    bottomDoc = getBottomPager(document);
    nextPage = getNextPage(bottomDoc);

    //Run if this window isn't inside an iframe and we've found the thumbnail container, bottom pager, and next page
    if( window == window.top && mainTable && bottomDoc && nextPage )
    {
        //Move bottom pager out of where additional content will be loaded
        //bottomDoc.parentNode.removeChild(bottomDoc);
        //mainTable.parentNode.appendChild(bottomDoc);

        var resultBadge = document.querySelector(".page_inner a:last-child");
        var resultMatcher;
        totalPages = resultBadge? resultBadge.href.replace(/.*(\?|&)page=([0-9]+).*/,'$2'): null;

        let AutoloadLink = document.createElement("a");
        mainTable.parentNode.appendChild(AutoloadLink);
        AutoloadLink.className = "p";
        AutoloadLink.style = 'float:right';
        AutoloadLink.textContent = "Auto Load Pages";
        AutoloadLink.onclick = function(){
            Autoload = true;
            AutoloadLink.style.display='none';
            testScrollPosition();
        };

        loadAllLink = document.createElement("a");
        mainTable.parentNode.appendChild(loadAllLink);
        loadAllLink.className = "p";
        loadAllLink.style = 'float:right';
        loadAllLink.textContent = "Load All Pages";
        loadAllLink.onclick = function(){
            loadAll = (loadAll==1)? 0 :1;
            loadAllLink.textContent = (loadAll==1) ? "Stop Loading All Pages" : "Load All Pages";
            loadAllLink.setAttribute("style"," position: fixed;top: 500px;left: 50px");
            testScrollPosition();
        };
        //Adjust buffer height
        scrollBuffer += window.innerHeight;

        //Watch scrolling
        window.addEventListener("scroll", testScrollPosition, false);
        testScrollPosition();
    }

    function getMainTable(source){
        var result = null, tableFun =
            [
                //user/mono
                function(src){ src = src.querySelector('ul.coversSmall'); return src ? src : null; },

                //subject/browser
                function(src){ src = src.querySelector('#browserItemList'); return src ? src : null; },

                //subject/collections
                function(src){ src = src.querySelector('ul#memberUserList'); return src ? src : null; },

                ///group/forum
                function(src){ src = src.querySelectorAll('#columnA .topic_list tbody')[1]; return src ? src : null; },

                //blog
                function(src){ src = src.querySelector('#news_list'); return src ? src : null; },

                //timeline
                function(src){ src = src.querySelector('#tmlContent #timeline'); return src ? src : null; },

                //index
                function(src){ src = src.querySelector('#timeline ul'); return src ? src : null; },

                //group/all
                function(src){ src = src.querySelector('#memberGroupList'); return src ? src : null; },

                //tags
                function(src){ src = src.querySelector('#tagList'); return src ? src : null; },

                //subject/reviews
                function(src){ src = src.querySelector('#entry_list'); return src ? src : null; },

                //comments
                function(src){ src = src.querySelector('#comment_box'); return src ? src : null; },
            ];

        for( var i = 0; i < tableFun.length; i++ )
        {
            getMainTable = tableFun[i];
            if( (result = getMainTable(source)) != null )
                return result;
        }

        return null;
    }

    function getBottomPager(source){
        var result = null, pagerFun =
            [

                function(src){ src = src.querySelector(".page_inner"); return src ? src : null; },

            ];

        for( var i = 0; i < pagerFun.length; i++ )
        {
            getBottomPager = pagerFun[i];
            if( (result = getBottomPager(source)) != null )
                return result;
        }

        return null;
    }

    function getNextPage(pager){
        if(!pager) return null;
        let current = pager.querySelector('.p_cur');
        if(current)
            return $(current).next('a.p') ? $(current).next('a.p').attr('href'):null;
        let next = pager.querySelectorAll('a.p')[1] ? pager.querySelectorAll('a.p')[1] : pager.querySelectorAll('a.p')[0];
        if(next)
            return next.href;

    }

    function testScrollPosition(){
        if( !pending &&  (loadAll || (Autoload && window.pageYOffset + scrollBuffer > bottomDoc.offsetTop))  )
        {
            pending = true;
            timeout = setTimeout( function(){ pending = false; testScrollPosition(); }, timeToFailure*1000 );

            //If the page about to be loaded is the last, hide the "Load All Pages" link.
            if( loadAllLink && nextPage.replace(/.*(\?|&)page=([0-9]+).*/,'$2') == totalPages && totalPages>2 )
                loadAllLink.style.display = "none";
            else
            {
                var xhr = new XMLHttpRequest();
                xhr.open( "GET", nextPage );
                xhr.onabort = xhr.onabort = xhr.onerror = function(){ clearTimeout(timeout); pending = false; };
                xhr.onload = function(){ processPage( xhr.responseXML ); };
                xhr.responseType = "document";
                xhr.send();
            }
        }
    }

    function processPage( newDoc ){
        clearTimeout(timeout);

        var newTable = getMainTable(newDoc);

        //Make sure page loaded properly
        if( !newTable )
        {
            pending = false;
            return;
        }

        //Update the visible bottom paginator.
        var bottomPage = getBottomPager( newDoc );
        bottomDoc.innerHTML = bottomPage.innerHTML;

        //Append new page
        //mainTable.innerHTML+= newTable.innerHTML;
        $(mainTable).append(newTable.innerHTML);

        //Check for the next page, and disable the script if there isn't one.
        nextPage = getNextPage(bottomPage);
        if(nextPage)
        {
            pending = false;
            testScrollPosition();
        }
    }
})();