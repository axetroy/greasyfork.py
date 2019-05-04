// ==UserScript==
// @name         Tools
// @namespace    https://realitygaming.fr/
// @namespace    https://realitygaming.fr/*
// @version      1.1
// @description  ToolsIP
// @author       Weyzen
// @match        https://realitygaming.fr/
// @match        https://realitygaming.fr/*
// @grant        none
// ==/UserScript==

<a href="#" data-toggle="tooltip" title="Hooray!">Hover over me</a>
</div>

<script>
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});
</script>