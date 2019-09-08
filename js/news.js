const news_api_key = '90fc835b9f2447acaf9c278b476fb73d'
// TODO: Make news API key an environment variable

function make_news_snippet(article) {
    // Each article contains a title and an abstract. Maybe also
    // an author, date, etc., I don't remember.
    return `
        <div style="background:white; text-align:center; padding:10px; margin-bottom:10px; border:1px solid #DDDFE2; border-radius:5px;">
            <h3 style="font-family:nytBold; font-size:16px; margin:5px;">` + article.title + `</h3>
            <p style="font-family:nyt; font-size:14px; margin:5px;"> ` + article.abstract + `</p>
        </div>
    `;
}

news_queue = []
function expand_news_queue() {
    // Call the NYT API to get news headlines. It's more customizable than this,
    // so may be good at some point to restrict the types of news stories it
    // returns (e.g., nobody wants to read a headline like "5 things to put in a pie
    // this fall" if there's no actual article underneath it.)
    var url = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=4tkezKCV6BO5vK7lzRCGMdFAAtD4EL5n";
    $.getJSON(url, function(response) {
        response.results.forEach( (article) => {
            // TODO: Make these sections customizable
            if (['Sports', 'U.S.', 'Technology', 'World'].includes(article.section)) {
                news_queue.unshift(article);
            }
        })
    });
}
expand_news_queue();

function get_news_item() {
    // We don't want to call the API every time we need
    // a new headline, so keep a backup cache of headlines
    // in the news_queue
    if (news_queue.length < 5) {
        expand_news_queue();
    }
    return make_news_snippet(news_queue.pop());
}