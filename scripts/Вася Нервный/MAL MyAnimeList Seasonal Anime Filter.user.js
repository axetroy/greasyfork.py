// ==UserScript==
// @name         MAL MyAnimeList Seasonal Anime Filter
// @namespace    https://greasyfork.org/ru/users/8679
// @version      0.2
// @description  Filter for MyAnimeList Seasonal Anime List. Can hide anime that arlready in you list. You must be logged in for it to work. Show only anime with 1000+ members.
// @author       You
// @match        http://myanimelist.net/anime/season*
// @grant        none
// @run-at document-end
// ==/UserScript==

(function filterAnimeList(){
    var MINMEMBERS = 1000;
    var hideListState = false;

    var filterList = [];
    init();

    function init(){
        makeFilterList();
        if(isLogged()){
            addFilterPanel();            
        }
        applyFilters(filterList);
    }

    function makeFilterList(){
        function minMembersFilter(animeBlock){
            var member = animeBlock.querySelector('.member');
            if(!member){
                return false;
            }

            var num = member.textContent.trim();        
            if(!num){
                return false;
            }
            num =  num.replace(',','');
            num = parseInt(num);

            if(num < MINMEMBERS){
                return true;
            }
            return false;    
        }
        filterList.push(minMembersFilter);

        function inListFilter(animeBlock){
            if(!hideListState){
                return false;
            }     
            var addBtn = $(animeBlock).find('.button_add').first();
            if(addBtn.length ){
            }
            else{         
                return true;
            }
            return false;       
        }
        filterList.push(inListFilter);
    }

    function addFilterPanel(){
        var navPane = $('.horiznav-nav-seasonal');
        if(!navPane.length){
            return;
        }

        var toggler = $('<span></span>').text('Hide items i have');
        toggler.addClass('fl-r');
        var hBtn = navPane.find('.js-btn-show-r18').after(toggler);
        toggler.css('color','#787878');
        toggler.css('padding-right','14px');
        toggler.css('cursor', 'pointer');
        toggler.css('cursor', 'pointer');

        toggler.on( "click", function() {
            console.log( "click" );
            if(!hideListState){
                toggler.text('Show items i have');
                hideListState = true;
            }
            else{
                toggler.text('Hide items i have');
                hideListState = false;
            }
            applyFilters(filterList);

        });
        toggler.hover(function(){
            toggler.css('color','blue');
        }, function(){
            toggler.css('color','#787878');
        });
    }

    function applyFilters(filterList){
        var animeList = document.querySelectorAll('.seasonal-anime');
        if(!!animeList){
            var animeBlock = null;
            var count = 0;
            for (var t = 0; t < animeList.length; ++t)
            {
                animeBlock = animeList[t];
                if(!animeBlock){
                    continue;
                }
                var isFiltered = false;
                for(var loop = 0; loop<filterList.length;++loop){
                    var filter = filterList[loop];            
                    if(!!filter){
                        if(filter(animeBlock)){
                            isFiltered = true;                           
                            count++;
                            break;
                        }
                    }          
                }

                if(isFiltered){
                    $(animeBlock).fadeOut(200);
                }
                else{
                    $(animeBlock).fadeIn(200);
                }
            }
            console.log('Filtered ' + count + ' entries');
        }        
    }    

    function isLogged(){
        var prof = $('#header-menu-profile-container')[0];
        return !!prof;

    }   

})();