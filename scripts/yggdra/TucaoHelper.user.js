// ==UserScript==
// @name         TucaoHelper
// @namespace    https://www.biliplus.com/tucao/
// @version      1.0
// @description  吐槽-404-自动跳转
// @author       yggdra
// @match        http://www.tucao.tv/play/h*
// @grant        none
// ==/UserScript==
(
    function ()
    {
        function jump()
        {
            location.replace(
        location.href.replace(/\:\/\/www\.tucao\.tv\/play/, '://www.biliplus.com/play'));
        }
        function find()
        {
            var isExit=document.getElementById("part_lists");
            if(isExit===null)
            {
                jump();
            }
        }
        find();
    }
)();