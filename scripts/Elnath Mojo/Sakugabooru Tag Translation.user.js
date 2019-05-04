// ==UserScript==
// @name         Sakugabooru Tag Translation
// @namespace    https://sakugabot.pw/
// @version      0.2.1
// @description  Translate tags on sakugabooru.com
// @author       ElnathMojo
// @include      /^https?://(www\.sakugabooru\.com|sakuga\.yshi\.org)/post(/|\?)?.*/
// ==/UserScript==

(function () {
    function setTranslation(name, translation) {
        if (!translation) return
        jQuery(`#tag-sidebar > li[data-name='${name.replace(/'/g, "\\'")}'] > a:eq(1)`).text(
            function () {
                return `${name.replace(/_/g, ' ')}(${translation})`
            })
    }

    var localStorage = window.localStorage, localPrefix = 'Sakugabot_'
    var tags = []
    jQuery('#tag-sidebar > li').each(
        function () {
            let tag = jQuery(this).attr("data-name")
            tags.push(tag)
            setTranslation(tag, localStorage[localPrefix + tag])
        })
    if (tags) {
        jQuery.ajax({
            url: 'https://sakugabot.pw/api/tags/?name=' + tags.join(),
            type: 'GET',
            dataType: 'json',
            success: function (result) {
                for (var i = 0; i < result.results.length; i++) {
                    localStorage[localPrefix + result.results[i].name] = result.results[i].main_name
                    setTranslation(result.results[i].name, result.results[i].main_name)
                }
            }
        })
    }
})()