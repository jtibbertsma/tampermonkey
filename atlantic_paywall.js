// ==UserScript==
// @name         Atlantic Bypass Paywall
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Attempt to bypass the atlantic paywall automatically
// @author       Joseph Tibbertsma <josephtibbertsma@gmail.com>
// @match        https://www.theatlantic.com/*
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

    // Clear the articleViews cookie
    function clearArticleViews() {
        const Cookie = window.Cookies; // from js-cookie
        Cookie.remove('articleViews', { domain: '.theatlantic.com' });
    }

    loadJsCookie().then(() => {
        // Check for the paywall twice per second
        const paywallInterval = window.setInterval(() => {
            // The paywall is present if the div with id 'gate' is present
            if (document.getElementById('gate')) {
                window.clearInterval(paywallInterval);
                clearArticleViews();
                // Reload the page
                window.location.href = window.location.href;
            }
        }, 500);
    });
})();
