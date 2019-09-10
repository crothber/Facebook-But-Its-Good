function flip(message) {
    alert(message);
}

function make_duo_snippet(sentence) {
    // TODO: Make this cooler. To clarify:
    // - A sentence contains 3 parts:
    //      + An original (foreign) sentence
    //      + Its best (English) translation
    //      + A regex of acceptable (English) translations
    // - Right now, you just get the original in bold, with its translation underneath it
    // - We could make this more interesting by creating HTML quizzes, where you enter text
    //   and it tells you whether you're right, or where you click a button to see the
    //   translation
    // - The Duolingo API is also pretty flexible, so we can mess around with the proxy
    //   server if there's more info we want (e.g., images, audio clips, explanations, etc.)
    snippet = `
        <div class="flip-card">
            <div class="flip-card-inner">
            <div class="flip-card-front">
                <div class="duoquiz" onclick="flip(this.textContent);">
                    <h3 style="font-family:duolingoBold; font-size:18px; margin:5px;">` + sentence.original + `</h3>
                </div>
            </div>
            <div class="flip-card-back">
                <div class="duoquiz" onclick="flip(this.textContent);">
                    <p style="font-family:duolingo; font-size:16px; margin:5px;"> ` + sentence.best_translation + `</p>
                </div>
            </div>
            </div>
        </div>
    `;
    return snippet;
}

duo_queue = [];
function expand_duo_queue() {
    url = "https://duo-proxy-server.herokuapp.com"
    // get username from local storage
    chrome.storage.local.get("duolingo_username", function(i) {
        duolingo_username = i.duolingo_username;
        // then get password from local storage
        chrome.storage.local.get("duolingo_password", function(i) {
            duolingo_password = i.duolingo_password;
            // then call the duolingo proxy server to get a new lesson
            $.getJSON(url, data={"username": duolingo_username, "password": duolingo_password}, success = (lesson) => {
                // each lesson contains multiple sections, each of which contains multiple sentences
                $(lesson).each( function(i, section) {
                    $(section).each( function(i, sentence) {
                        duo_queue.unshift(sentence);
                    });
                });
            });
        });
    });
}
expand_duo_queue();

function get_duo_quiz() {
    // The proxy API takes a few seconds to call, so keep a
    // backup cache of sentences in the duo_queue
    if (duo_queue.length < 5) {
        expand_duo_queue();
    }
    dq = make_duo_snippet(duo_queue.pop());
    return dq;
}