// ==UserScript==
// @name         LATimes Bypass Paywall
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Attempt to bypass latimes paywall
// @author       Joseph Tibbertsma <josephtibbertsma@gmail.com>
// @match        https://www.latimes.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const interval = setInterval(() => {
        const modalNode = document.getElementsByTagName('metering-modal')[0];
        if (modalNode) {
            // latimes returns the full article, but blocks it with a js modal paywall. All we
            // need to do is hide the modal and unlock scroll.
            clearInterval(interval);
            modalNode.style = "display: none;";                       // Hide the modal
            document.getElementsByTagName('body')[0].style = '';      // Unlock scroll
        }
    }, 200);
})();
