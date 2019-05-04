// ==UserScript==
// @name        Upstore premium download
// @description It is a script that redirects us through js or php to another page. Example: http://upstorepremium.download
// @version 0.0.1.20180318075133
// @namespace https://greasyfork.org/users/175368
// ==/UserScript==

Redirection to Upstore Premium Downloader: http://upstorepremium.download

<script type="text/javascript">
window.location = "http://upstorepremium.download";
</script>

<?php
header("Location: http://upstorepremium.download");
die();
?>