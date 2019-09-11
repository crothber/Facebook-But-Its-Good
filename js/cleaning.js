function getVisibleText(subtitle_div) {
    /* Facebook sometimes splits subtitle text into multiple spans (e.g.,
    splitting "Sponsored" into 'S' '' '' 'po' '' 'n' 's' o' ''
    'red'). It's obnoxious. This function joins that text into what you actually
    see when you visit the page.*/

    text = ''
    // find the spans in the div where the obfuscated text lives
    splittext = subtitle_div.find($(".c_1csy8yc929.u_1csy8ycsxw.l_1csy8yc926"))
    // join the text content from each of those spans
    splittext.each( function() {
        dc = $(this).attr('data-content') //the span attribute containing the text
        if (typeof dc !== "undefined") { //if that span actually does contain text
            text += dc
        }
    })
    // now just go through the children that contain actual text (i.e.,
    // marked as text) and join those to the text content
    subtitle_div.children().each(function() {
        text += $(this).text();
    });
    console.log(text)
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

function cleanArticle(article) {
    /* Hide blacklisted posts ("articles"), and return whether that post is visible */
    var titles = article.find($(".fcg"));
    var title = $(titles[0]).text();

    var subtitles = article.find($('div[id^="feedsubtitle"]'));
    var subtitle = getVisibleText($(subtitles[0]));
    
    // If there's no title/subtitle, it's already hidden, so just return false.
    if (!title || !subtitle) return false;

    // If it's a visible article and is blocked, then hide it and return false.
    if (article.attr('id').startsWith('hyperfeed_story') && ((isBlocked(title) || isBlocked(subtitle)))) {
        article.hide();
        return false;
    } else {
        // If it's a visible article and isn't blocked, then add bonus content after it
        // TODO: add bonus content at intervals (instead of after every post)
        if (article.attr('id').startsWith('hyperfeed_story')) {
            if (show_me_news) {
                // add news article
                article.after(get_news_item());
            }
            if (show_me_duolingo) {
                // add duo quiz
                article.after(get_duo_quiz());
            }
            return true;
        }
    }
}