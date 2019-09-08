// TODO: Set the below defaults in local storage IFF they are not already set in local storage
var show_me_duolingo = true;
var show_me_news = true;

// Get the blacklist from local storage and convert it to a list of regular expressions
chrome.storage.local.get("blacklist", function(i) {
    if (i.blacklist) {
        blacklist = [];
        i.blacklist.forEach(function(regex_string) {
            blacklist.push(new RegExp(regex_string));
        });
    } else {
        blacklist = [
            /.*Sponsored.*/,
            /.*Suggested for You.*/
        ];
        chrome.storage.local.set({"blacklist": [
            ".*Sponsored.*",
            ".*Suggested for You.*"
        ]});
    }
});

// Check local storage to see if user wants to see news headlines
chrome.storage.local.get("show_me_news", function(i) {
    show_me_news = i.show_me_news;
    if (show_me_news == null) {
        show_me_news = true;
        chrome.storage.local.set({"show_me_news": show_me_news});
    }
});
// Check local storage to see if user wants to see Duolingo quizzes
chrome.storage.local.get("show_me_duolingo", function(i) {
    show_me_duolingo = i.show_me_duolingo;
    if (show_me_duolingo == null) {
        show_me_duolingo = true;
        chrome.storage.local.set({"show_me_duolingo": show_me_duolingo});
    }
});

// Observe entire document for creation of news feed
var page_observer = new MutationObserver(function (mutationList, page_observer) {
    feed = document.getElementsByClassName('fb_content')[0];
    if (feed) {
        // news feed created, so you can stop observing the whole page
        page_observer.disconnect();
        feed.querySelectorAll('div[role="article"]').forEach( (article)=>cleanArticle($(article)) );
        // Start feed observer
        feedObserver = new MutationObserver((mutations) => {
            // stuff to do every time a page (*or subpage*) is loaded/reloaded
            if (!$("#weather-box-extension").length) {
                $("#homepage_panel_pagelet").after(create_weather_widget());
                update_weather_widget();
            }
            mutations.forEach((mutation) => {
                cleanArticle($(mutation.target));
            });
        });
        feedObserver.observe(document.getElementsByClassName('fb_content')[0], {childList: true, subtree: true})
    }
});

page_observer.observe(document, {attributes: true, subtree: true});