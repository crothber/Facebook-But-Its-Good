function getVisibleText(subtitle_div) {
    /* Facebook sometimes splits subtitle text into multiple spans (e.g.,
    splitting "Sponsored" into 'S' '' '' 'po' '' 'n' 's' o' ''
    'red'). It's obnoxious. This function joins that text into what you actually
    see when you visit the page.*/

    text = ''
    // find the spans in the div where the obfuscated text lives
    splittext = subtitle_div.find($(".l_1csy8yc926"))
    // join the text content from each of those spans
    splittext.each( function() {
        dc = $(this)[0].innerText //the span attribute containing the text
        if (typeof dc !== "undefined") { //if that span actually does contain text
            text += dc
        }
    })
    return text
}

function isBlocked(subtitle) {
    /* if there's some blocked regex that matches the subtitle */
    if (blacklist.some((forbidden) => forbidden.test(subtitle))) {
        return true;
    } else {
        return false;
    }
}

function is_shared_article(article) {
    var titles = article.find($(".fwn.fcg"));
    if (titles[0].innerText.includes('was tagged')) {
        return false;
    }
    if (titles.length > 2) {
        return true;
    }
    if (article.find($('._52c6')).length > 0) {
        return true;
    }
    return false;
}

cleaned_articles = []
function cleanArticle(article) {
    /* Hide blacklisted posts ("articles"), and return whether that post is visible */
    var article_id = article[0].id
    var titles = article.find($(".fwn.fcg"));
    var title = titles[0].innerText
    var subtitles = article.find($(".fsm.fwn.fcg"));
    var subtitle = getVisibleText($(subtitles[0]));

    // If there's no title/subtitle, it's already hidden, so just return false.
    if (!title || !subtitle) return false;

    // Only proceed if we haven't already seen this article
    if (!cleaned_articles.includes(article_id)) {
        cleaned_articles.unshift(article_id);
    } else {
        return
    }

    // If it's a visible article and is blocked, then hide it and return false.
    if (!( isBlocked(title) || isBlocked(subtitle) || is_shared_article(article) )) {
        article.show();
        if (show_me_news) {
            // add news article
            article.after(get_news_item());
        }
        if (show_me_duolingo) {
            // add duo quiz
            article.after(get_duo_quiz());
        }
        if (true) {
            // add xkcd comic
            article.after(get_xkcd_comic());
        }
        return true;
    } else {
        console.log('HIDING', title, subtitle);
        return false;
    }

}