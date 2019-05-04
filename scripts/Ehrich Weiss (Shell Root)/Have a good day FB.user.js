// ==UserScript==
// @name        Have a good day FB
// @namespace   haveagooddayfb
// @description Hide Facebook ads/sponsored posts/right column and photos, for desktop and mobile. It requires jQuery [automatically done by the addon].
// @author      d4rk3rnigh7
// @include     *://*.facebook.com/*
// @require     https://code.jquery.com/jquery-3.2.1.min.js
// @version     1.2
// @license     CC
// @grant       none
// ==/UserScript==

$(document).ready(function(){
    if($('#findFriendsNav').text().indexOf('Encontrar amigos') !== -1){
        var byebye = [
            'Oferta Sugerida',
            'Vídeo Sugerida',
            'Postagem Sugerida',
            'Página Sugerida',
            'Eventos Sugerida',
            'Grupos Sugerida',
            'Destaque Para Você',
            'Um Vídeo que Você Pode Gostar',
            'Mais de Páginas Relacionadas',
            'Recomendado Para Você',
            'Pessoas que Você Talvez Conheça',
            'Relacionados',
            'Facebook',
            'Vídeo ao Vivo Popular',
            'Patrocinadas',
            'Uma História da página que você pode gostar',
            'Histórias de Páginas que Você Pode Gostar',
            'n00bz u m4y kn0w'
        ];
    }
    else{
        var byebye = [
            'Suggested Offer',
            'Suggested Post',
            'Suggested Video',
            'Suggested Page',
            'Suggested Events',
            'Suggested Groups',
            'Featured For You',
            'A Video You May Like',
            'More From Related Pages',
            'Recommended for you',
            'People you may know',
            'Related',
            'Connect With Facebook',
            'Popular Live Video',
            'Sponsored',
            'A Page story you may like',
            'Page Stories You May Like',
            'Popular Across Facebook',
            'n00bz u m4y kn0w'
       ];
    }
    
    // Hide 'More From Related Pages'
    if($('div[data-ownerid^="hyperfeed_story_id"]').is(':visible')){
        $(this).hide();
        // console.log('Got another one | data-ownerid');
    }
    
    // Hide 'Suggested Groups' photo footer on mouse over
    $(document).on('mouseover', function(){
        if($('div[class="_5ciw rhcFooter"]').is(':visible')){
            $('div[class="_5ciw rhcFooter"]').hide();
            // console.log('Got another one | photo footer');
        }
    });
  
    // Hide sponsored posts
    $(document).on('scroll', function(){
        
        // Hide right column ads: 'Suggested Groups, Suggested Pages, Suggested Page & Buy and Sell Groups'
        if($('#pagelet_ego_pane').is(':visible')){
            $('#pagelet_ego_pane').hide();
            // console.log('Got another one | pagelet_ego_pane');
        }

        // For Desktop
        if(window.location.href.indexOf('www.facebook') !== -1){
            $tag = $('div[id^="hyperfeed_story_id"]');
        }
        // For Mobile using FF addon 'usi'
        else{
            $tag = $('article');
        }
        $($tag).each(function(){
            $this = $(this);
            byebye.forEach(function(bye){
                if($($this).is(':visible')){
                    if($($this).text().indexOf(bye) !== -1){
                        $($this).hide();
                        // console.log('Got another one' + ' | ' + bye);
                    }
                }
            });
        });
    });
});
