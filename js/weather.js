const weather_api_key = '97491dd17b207f80c40cb4875dd189ea'
// TODO: Make weather API key an environment variable

// TODO: Format the weather widget so it looks nicer and more tabular
function create_weather_widget(){
    var weather_widget = `
    <div id="weather-box-extension" style="background:white; border:1px solid #dddfe2; border-radius:3px; margin-top:12px; text-align:center;">
        <p id="weather-city"></p>
        <p id="weather-temp"></p>
        <p id="weather-text"></p>
        <img id="weather-icon" src="" alt="Weather Icon">
    </div>
    `;
    return weather_widget;
}

// TODO: Customize location, return forecasts (not just current weather)
function update_weather_widget(){
    url = "https://ipapi.co/json"
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
            $("#weather-city").text('Weather in '+city);
            $("#weather-temp").text(temp + ' °F');
            $("#weather-text").text(weather.main+': '+weather.description);
            $("#weather-icon").attr('src', icon_url);
        });
    })
}