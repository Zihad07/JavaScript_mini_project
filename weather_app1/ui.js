

//  <h1 id="w-location">which location</h1>
//  <h3 class="text-dark" id="w-desc"></h3>
//  <h3 id="w-string"></h3>
//  <img src="" id="w-icon">

//  <ul id="w-details" class="list-group mt-3">
//      <li class="list-group-item" id="w-humidity"></li>
//      <li class="list-group-item" id="w-dewpoint"></li>
//      <li class="list-group-item" id="w-feels-like"></li>
//      <li class="list-group-item" id="w-wind"></li>
//  </ul>`

// `
class UI {
    constructor(){
        this.location = document.getElementById('w-loctaion')
        this.desc = document.getElementById('w-desc')
        this.string = document.getElementById('w-string')
        this.details = document.getElementById('w-details')
        this.icon = document.getElementById('w-icon')
        this.humidity = document.getElementById('w-humidity')
        this.feelsLike = document.getElementById('w-feels-like')
        this.dewpont = document.getElementById('w-dewpoint')
        this.wind = document.getElementById('w-wind')
    }

    // paint

    paint(weather){
        this.location.textContent = weather.display_location.full;
        this.desc.textContent = weather.weather;
        this.string.textContent = weather.temperature_string;
        this.icon.setAttribute('src', weather.icon_url);

        this.humidity.textContent = `Relative Humidity: ${weather.relative_humidity}`;
        this.feelsLike.textContent = `Feels Like: ${weather.feelslike_string}`;
        this.dewpont.textContent = `Dewpointy: ${weather.dewpoint_string}`;
        this.wind.textContent = `Wind: ${weather.wind_string}`;
        

    }
}
























