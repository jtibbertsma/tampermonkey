// ==UserScript==
// @name         Nyt Bypass Paywall
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Attempt to bypass the Nyt paywall automatically
// @author       Joseph Tibbertsma <josephtibbertsma@gmail.com>
// @match        https://www.nytimes.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function loadJsCookie() {
        return new Promise(resolve => {
            const body = document.getElementsByTagName('body')[0];
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/js-cookie@rc/dist/js.cookie.min.js';
            script.onload = resolve;
            body.appendChild(script);
        });
    }

    // Clear all the cookies from the .nytimes.com domain
    function clearSiteCookies() {
        const Cookie = window.Cookies; // from js-cookie
        // Get the names of the cookies to remove
        const names = document.cookie.split(';').map(cookieString => cookieString.split('=')[0].trim());
        names.forEach(name => {
            Cookie.remove(name, { domain: '.nytimes.com' });
        });
    }

    loadJsCookie().then(() => {
        // Check for the paywall twice per second
        const paywallInterval = window.setInterval(() => {
            // The paywall is present if the div with id 'gateway-content' is present
            if (document.getElementById('gateway-content')) {
                window.clearInterval(paywallInterval);
                clearSiteCookies();
                // Reload the page
                window.location.href = window.location.href;
            }
        }, 500);
    });
})();
