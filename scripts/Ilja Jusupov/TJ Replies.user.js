// ==UserScript==
// @name         TJ Replies
// @icon         http://tjournal.ru/static/main/img/icons/apple-touch-icon-180x180-precomposed.png
// @namespace    x4_tjr
// @version      0.2
// @description  Popup comments
// @author       x4fab
// @match        http://tjournal.ru/*
// @grant        none
// @license      CC0
// @run-at       document-body
// ==/UserScript==

!function (lt, op){
    document.body.addEventListener('mouseover', function (e){
        if (e.target.classList.contains('timeago')){
            clearTimeout(lt);
            if (op != e.target){
                setTimeout(function (){
                    var parent = document.querySelector('.comment.parent:not(._mod_hovered)');
                    if (parent){
                        op = e.target;
                        
                        var rect = parent.getBoundingClientRect();
                        if (rect.bottom < 30){
                            var clone = document.body.appendChild(parent.cloneNode(true));
                            clone.classList.add('_mod_hovered');
                            
                            with(clone.style){
                                position = 'absolute';
                                top = (e.pageY - document.body.scrollTop > rect.height - 25 ? e.pageY - rect.height - 25 : e.pageY + 25) + 'px';
                                left = rect.left + 'px';
                                width = rect.width + 'px';
                                zIndex = 2e3;
                                boxShadow = '0 1px 1px rgba(0,0,0,.3)' 
                            }
                        }
                    } 
                }, 100);
            }
        }
    }, false);
    
    document.body.addEventListener('mouseout', function (){
        clearTimeout(lt);
        lt = setTimeout(function (){
            op = null;
            var t = document.querySelectorAll('._mod_hovered:not(:hover)');
            for (var i = 0; i < t.length; i++){
                document.body.removeChild(t[i]);
            }
        }, 200);
    }, false);
}()
