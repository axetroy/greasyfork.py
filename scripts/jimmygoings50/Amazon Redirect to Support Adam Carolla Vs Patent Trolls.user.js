// ==UserScript==
// @name       Amazon Redirect to Support Adam Carolla Vs Patent Trolls
// @namespace  jg50
// @version    1.1.1
// @description  Redirects Amazon.com to Adam Carolla's Amazon Revenue Link
// @include http://www.amazon.com/*
// @include https://www.amazon.com/*
// @exclude http://www.amazon.com//ref=*
// @copyright  2014+
// ==/UserScript==

window.location.replace("http://www.amazon.com//ref=as_sl_pd_tf_lc?&tag=adamcarolla09-20&camp=15345&creative=331665&linkCode=ur1&adid=08J5N62MYPDM106CXGNH&&ref-refURL=http%3A%2F%2Fadamcarolla.com%2Fsponsors%2F" + window.location.pathname);
