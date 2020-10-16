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

// Check local storage to see if user wants to see poetry
chrome.storage.local.get("show_me_poetry", function(i) {
    show_me_poetry = i.show_me_poetry;
    if (show_me_poetry == null) {
        show_me_poetry = false;
        chrome.storage.local.set({"show_me_poetry": show_me_poetry});
    }
});
// Check local storage to see if user wants to see news headlines
chrome.storage.local.get("show_me_xkcd", function(i) {
    show_me_xkcd = i.show_me_xkcd;
    if (show_me_xkcd == null) {
        show_me_xkcd = false;
        chrome.storage.local.set({"show_me_xkcd": show_me_xkcd});
    }
});
// Check local storage to see if user wants to see news headlines
chrome.storage.local.get("show_me_news", function(i) {
    show_me_news = i.show_me_news;
    if (show_me_news == null) {
        show_me_news = false;
        chrome.storage.local.set({"show_me_news": show_me_news});
    }
});
// Check local storage to see if user wants to see Duolingo quizzes
chrome.storage.local.get("show_me_duolingo", function(i) {
    show_me_duolingo = i.show_me_duolingo;
    chrome.storage.local.get("duolingo_username", function(i) {
        username = i.duolingo_username
        if (show_me_duolingo == null) {
            show_me_duolingo = true;
            chrome.storage.local.set({"show_me_duolingo": show_me_duolingo});
        }
        if (!username) {
            show_me_duolingo = false;
        }
    });
});

const observe_feed = function (mutationList, feedObserver) {
    for (const mutation of mutationList) {
        if (mutation.addedNodes.length) {
            article = mutation.addedNodes[0]
            if (article.matches('div[data-pagelet^="FeedUnit"]')) {
                cleanArticle($(article))
            }
        }
    }
}

const wait_for_newsfeed = function (mutationList, pageObserver) {
    for (const mutation of mutationList) {
        if (mutation.addedNodes.length && $(mutation.addedNodes[0]).attr('role') == 'feed') {
            // stuff to do every time a page (*or subpage*) is loaded/reloaded
            // if (!$("#weather-box-extension").length) {
            //     $("#homepage_panel_pagelet").after(create_poetry_bar());
            //     update_poetry_bar();
            //     $("#homepage_panel_pagelet").after(create_weather_widget());
            //     update_weather_widget();
            // }
            // This is the news feed
            const feed = mutation.addedNodes[0]
            // Clean up all the articles already in the feed
            for (article of feed.querySelectorAll('div[data-pagelet^="FeedUnit"]')) {
                console.log('ARTICLE FOUND!')
                cleanArticle($(article));
            }
            // Start observing the news feed for changes
            const feedObserver = new MutationObserver(observe_feed)
            feedObserver.observe(feed, {attributes: true, childList: true, subtree: true});
            // We've found the news feed, so we don't need to watch the page anymore
            pageObserver.disconnect();
        }
    }
}

// Observe entire document for creation of news feed
const pageObserver = new MutationObserver(wait_for_newsfeed);

pageObserver.observe(document, {attributes: true, childList: true, subtree: true});