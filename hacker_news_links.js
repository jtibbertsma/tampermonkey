// ==UserScript==
// @name         Links Should Open In New Tab
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add target="_blank" to each story link on hacker news
// @author       Joseph Tibbertsma <josephtibbertsma@gmail.com>
// @match        https://news.ycombinator.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const links = document.getElementsByClassName('storylink');
    for (let i = 0; i < links.length; ++i) {
        links[i].setAttribute('target', '_blank');
    }
})();
