function create_poetry_bar(){
    var poetry_bar = `
    <div id="poetry-box" style="background:white; border:1px solid #dddfe2; border-radius:3px; margin-top:12px; text-align:center; display:inline-block; width:100%;">
        <h3 style="font-family:merriweather; font-size:20px; margin:10px;" id="poem-title"></h3>
        <p style="font-size:16px; font-family:Garamond; line-height:22px;" id="poem-text"></p>
    </div>
    `;
    return poetry_bar;
}

// TODO: Return forecasts (not just current weather)
function update_poetry_bar(){
    poems = [
        ['Robert Burns', 'To a Mouse'],
        ['Robert Hayden', 'Those Winter Sundays'],
        ['Samuel Taylor Coleridge', 'Kubla Khan'],
        ['William Wordsworth', 'She Dwelt Among the Untrodden Ways'],
        ['Robert Herrick', 'To Anthea, who may Command him Anything'],
        ['T. S. Eliot', 'The Love Song of J Alfred Prufrock'],
        ['Wendell Berry', 'The Vacation'],
        ['William Carlos Williams', 'This Is Just To Say'],
        ['William Ernest Henley', 'Invictus'],
        ['Leigh Hunt', 'Jenny Kiss\'d me']
    ]
    pair = poems[Math.floor(Math.random()*poems.length)];
    author = pair[0];
    title = pair[1];
    url = "https://raw.githubusercontent.com/jacobbridges/poetry-collection-api/master/collection/"+author+"/"+title+".json"
    // url = "http://poetrydb.org/title/"+title+"/lines.json"
    $.getJSON(url, function(response) {
        var poem_text = response.text.join('\n')
        $("#poem-title").text(title);
        $("#poem-text").text(poem_text);
        var poem_text_html = $("#poem-text").html().replace(/\n/g, '<br>')
        $("#poem-text").html(poem_text_html);
    });
}