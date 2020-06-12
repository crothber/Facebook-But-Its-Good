function make_xkcd_snippet(comic) {
    // Each article contains a title and an abstract. Maybe also
    // an author, date, etc., I don't remember.
    return `
        <div style="background:white; text-align:center; padding:10px; margin-bottom:10px; border:1px solid #DDDFE2; border-radius:5px;">
            <h3 style="font-size:18px; font-variant:small-caps; margin-bottom:10px;">` + comic.safe_title + `</h2>
            <img src="` + comic.img + `" style="width:100%;" alt="` + comic.alt + `">
            <p> ` + comic.alt + `</p>
        </div>
    `;
}

xkcd_queue = []
function expand_xkcd_queue() {
    for (i=0; i<10; i++) {
        comic_id = Math.floor(Math.random()*2320);
        var url = "https://xkcd.com/"+comic_id+"/info.0.json";
        $.getJSON(url, function(comic) {
            xkcd_queue.unshift(comic);
        });
    }
}
expand_xkcd_queue();

function get_xkcd_comic() {
    // We don't want to call the API every time we need
    // a new comic, so keep a backup cache of comics in
    // the xkcd_queue
    if (xkcd_queue.length < 5) {
        expand_xkcd_queue();
    }
    return make_xkcd_snippet(xkcd_queue.pop());
}