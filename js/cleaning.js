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

function is_friendship_video(article) {
    if (article.text().includes('years of friendship on Facebook!')) {
        return true;
    } else {
        return false
    }
}

function is_shared_article(article) {
    return false;
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
    console.log('ARTICLE', article);

    var supertitle = $(article.find($(".j1vyfwqu"))[0]);
    var supertitle_text = supertitle.text();
    console.log('SUPERTITLE', supertitle_text);

    var title = $(article.find($(".qzhwtbm6.knvmm38d"))[0]);
    aria_label = title.find('div[aria-label]').attr('aria-label');
    if (aria_label) {
        var title_text = aria_label;
    } else {
        var title_text = title.text();
    }
    console.log('TITLE', title_text);
    
    var subtitle = $(article.find($(".b1v8xokw, .j1lvzwm4"))[0]);
    subtitle_text = subtitle.attr('aria-label');
    console.log('SUBTITLE', subtitle_text);

    // If there's no title/subtitle, it's already hidden, so just return false.
    if (!title_text || !subtitle_text) return false;

    // Only proceed if we haven't already seen this article
    // if (!cleaned_articles.includes(article_id)) {
    //     cleaned_articles.unshift(article_id);
    // } else {
    //     return
    // }

    // If it's a visible article and is blocked, then hide it and return false.
    console.log('ASSESSING', title_text)
    if (!( isBlocked(supertitle_text) || isBlocked(title_text) || isBlocked(subtitle_text) || is_friendship_video(article) || is_shared_article(article) )) {
        console.log('SHOWING', title_text)
        article.show();
        if (show_me_news) {
            // add news article
            article.after(get_news_item());
        }
        if (show_me_duolingo) {
            // add duo quiz
            article.after(get_duo_quiz());
        }
        if (show_me_xkcd) {
            // add xkcd comic
            article.after(get_xkcd_comic());
        }
        return true;
    } else {
        console.log('HIDING', title, subtitle);
        return false;
    }

}