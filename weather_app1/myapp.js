
// Init weather object
const weather = new Weather('Boston', 'MA');

// Init UI
const ui = new UI();
weather.changeLocation('Mimi', 'FL')

// GET weather on DOM load

document.getElementById('DOMContentLoaded', getWeather);

function getWeather() {
    weather.getWeather()
    .then(results => {
        // console.log(results);
        ui.paint(results);
    })
    .catch(err => console.log(err));
}