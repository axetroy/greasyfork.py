// ==UserScript==
// @name         Absolute concise of PhotoBucket
// @name:zh-TW   PhotoBucket絕對簡潔
// @namespace    http://WWW.NTRSN.CN/
// @version      0.2
// @description  Auto remove all of photobucket's advertisement popup
// @description:zh-TW 自動删除所有PhotoBucket廣告彈窗
// @author       WWW.NTRSN.CN
// @supportURL   873248164@qq.com
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=873248164@qq.com&item_name=Greasy+Fork+donation
// @include      *photobucket.com*
// @name         Auto close photobucket's popup自动关闭photobucket广告弹窗
// ==/UserScript==
(function() {
    'use strict';
    var container=document.getElementsByClassName('navbar-inner')[0];container.style.backgroundColor='#FFFFFF';
    var siteNav=getByClass('nav','siteNav')[0];siteNav.style.backgroundColor='#000000';
    var profile=getByClass('profile','nav')[0];profile.style.backgroundColor='#000000';
    var bannerAd=getByClass('ad','bannerAd')[0];bannerAd.style.backgroundColor='#FFFFFF';
    var href=window.location.href;
    if(href.indexOf('photobucket.com/browse')!==-1)
    {
        var pull_right=getByClass('pull-right','sidebar')[0];
        pull_right.parentNode.removeChild(pull_right);

    }
    if(href.indexOf('library')!==-1)
    {
        var promoAd=getByClass('ad','promoAd')[0];
        promoAd.parentNode.removeChild(promoAd);
        for(var i=1;i<3;i++){
            var ad=getByClass('ad','mrec')[0];
            ad.parentNode.removeChild(ad);
        }
        do{
            CheckExist('footer',1);
            CheckExist('bannerAd',1);
            CheckExist('printPromoPushdown',1);
            CheckExist('tynt-sidebar-content',2);
            CheckExist('tynt-interstitial-body',2);
            CheckExist('slider-left-300x250',1);
            CheckExist('slider-left-160x600-frame',1);
            CheckExist('ii1525599797.e7cd7f8e-5111-11e8-946c-000acd2b1a6e.IM.118578',1);
            for(var i2=1;i2<3;i2++){
                CheckExist('_cm-css-reset',1);
            }
            CheckExist('00:00__cm-css-reset',1);
            CheckExist('pull_right_sidebar',1);
            CheckExist('inBtIcon',1);
            CheckExist('logo-container-clickOverlay',1);
            CheckExist('taw0',1);
            CheckExist('myModal',1);
            CheckExist('ac_148699_modal-container',1);

        }
        while(
            CheckExist('footer',1)==true||
            CheckExist('bannerAd',1)==true||
            CheckExist('printPromoPushdown',1)==true||
            CheckExist('tynt-sidebar-content',2)==true||
            CheckExist('tynt-interstitial-body',2)==true||
            CheckExist('pull_right_sidebar',1)==true||
            CheckExist('slider-left-300x250',1)==true||
            CheckExist('slider-left-160x600-frame',1)==true||
            CheckExist('ii1525599797.e7cd7f8e-5111-11e8-946c-000acd2b1a6e.IM.118578',1)==true||
            CheckExist('_cm-css-reset',1)==true||
            CheckExist('00:00__cm-css-reset',1)==true||
            CheckExist('pull_right_sidebar',1)==true||
            CheckExist('inBtIcon',1)==true||
            CheckExist('logo-container-clickOverlay',1)==true||
            CheckExist('taw0',1) ==true||
            CheckExist('myModal',1)==true||
            CheckExist('ac_148699_modal-container',1) ==true
        );
    }
    function CheckExist(IdOrClassName,type){
        var ISExist;
        switch(type)
        {
            case 1:
                if(typeof(document.getElementById(IdOrClassName))!=="undefined")
                {
                    Remove(IdOrClassName,1);
                    ISExist=true;
                }
                else
                {
                    ISExist=false;
                }
                break;
            case 1:
                if(typeof(document.getElementsByClassName(IdOrClassName)[0])!=="undefined")
                {
                    Remove(IdOrClassName,2);
                    ISExist=true;
                }
                else
                {
                    ISExist=false;
                }
                break;
        }
        return ISExist;
    }
    function getByClass(classNameA,classNameB){
        var oParent=document.getElementsByClassName(classNameA);
        if(typeof(oParent)!=='undefined'){
            var result=[];
            for(var i=0;i<oParent.length;i++){
                var arr=oParent[i];//.getElementsByClassName(classNameB);
                if(arr.classList.contains(classNameB)==true)
                {
                    result.push(arr);

                    /*  for(var i1=0;i1<arr.classList.length;i1++)
                        {
                            if(arr.classList.item(i1)==classNameB)
                            {
                                result.push(arr.classList.item(i1));
                            }
                        }*/
                }
            }
            return result;
        }
    }
    function Remove(IdOrClassName,type)
    {
        var remove;
        switch (type){
            case 1:
                remove = document.getElementById(IdOrClassName);
                break;
            case 2:
                remove = document.getElementsByClassName(IdOrClassName)[0];
                break;
        }
        remove.parentNode.removeChild(remove);
    }

})();