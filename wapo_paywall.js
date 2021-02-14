// ==UserScript==
// @name         Wapo Bypass Paywall
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Attempt to bypass the Wapo paywall automatically
// @author       Joseph Tibbertsma <josephtibbertsma@gmail.com>
// @match        https://www.washingtonpost.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const html = document.getElementsByTagName('html')[0];
    const body = document.getElementsByTagName('body')[0];
    // Save the original href. When wapo puts up the paywall, they switch the current path to '/' so
    // that the user ends up on the front page if they try to refresh.
    const originalHref = window.location.href;

    // Check for the paywall twice per second
    const paywallInterval = window.setInterval(() => {
        // Check if the overflow-y style property is set to hidden on the html element.
        // If so, we've hit the paywall.
        if (html.style['overflow-y'] === 'hidden') {
            window.clearInterval(paywallInterval);
            // We get around the paywall by refetching the page with no cookies, which should return the
            // full text of the article. Then we swap out the contents of body with the article.
            //
            // We can't just programmatically delete all the cookies and refresh the page because the
            // important cookies have the 'httpOnly' flag set.
            fetch(originalHref).then(response => response.text()).then(responseString => {
                // Attempt to parse html using regex
                const match = /<body.*?>(.*)<\/body>/ms.exec(responseString);
                const contents = match[1];
                // Overwrite body. This will break all the js on the page, but you'll be able to see
                // the full article; images won't load properly
                body.innerHTML = contents;
                // Unlock scroll
                const scrollInterval = window.setInterval(() => {
                    body.setAttribute("style", "width: 100%; height: 100%;");
                    html.setAttribute("style", "height: 100%;");
                }, 200);
                window.setTimeout(() => window.clearInterval(scrollInterval), 5000);
                // Reset the page url
                window.history.replaceState({}, '', originalHref);
            });
        }
    }, 500);
})();
