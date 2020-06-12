const weather_api_key = '97491dd17b207f80c40cb4875dd189ea'
// TODO: Make weather API key an environment variable

// TODO: Format the weather widget so it looks nicer and more tabular
function create_weather_widget(){
    var weather_widget = `
    <div id="weather-box-extension" style="background:white; border:1px solid #dddfe2; border-radius:3px; margin-top:12px; text-align:center; display:inline-block; width:100%;">
        <span style="display:inline-block; width:30%; font-family:'merriweather'; vertical-align:middle;">
            <p id="weather-temp" style="font-size:32px;"></p>
        </span>
        <span style="display:inline-block; width:20%; vertical-align:middle;">
            <img id="weather-icon" src="" style="vertical-align:middle;">
        </span>
        <span style="display:inline-block; width:45%; vertical-align:middle;>
            <div style="text-align:center;padding:1em 0; vertical-align:middle;">
                <iframe src="https://www.zeitverschiebung.net/clock-widget-iframe-v2?language=en&size=medium&timezone=America%2FNew_York&show=hour_minute" frameborder="0" style="vertical-align:middle; height:125px; width:100%; overflow:visible;" scrolling="no"></iframe>
            </div>
        </span>
    </div>
    `;
    return weather_widget;
}

// TODO: Return forecasts (not just current weather)
function update_weather_widget(){
    url = "https://api.ipdata.co/?api-key=63665c52a8a028147b503f226d44c3ec4e24cc318ff4429301ff49c1"
    $.getJSON(url, function(response) {
        url = "https://api.openweathermap.org/data/2.5/forecast"
        data = {
            "zip": response.postal,
            "units": "imperial",
            "appid": "97491dd17b207f80c40cb4875dd189ea"
        }
        $.getJSON(url, data, function(response) {
            city = response.city.name;
            time = response.list[0].dt_txt;
            temp = response.list[0].main.temp;
            weather = response.list[0].weather[0];
            icon_url = 'https://openweathermap.org/img/wn/'+response.list[0].weather[0].icon+'@2x.png'
            // $("#weather-city").text('Weather in '+city);
            $("#weather-temp").text(temp + ' °F');
            // $("#weather-text").text(weather.main+': '+weather.description);
            $("#weather-icon").attr('src', icon_url);
        });
    })
}