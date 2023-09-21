const inputSection = document.getElementById('input');
const button = document.getElementById('inputButton');
const weatherImage = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temp');
const weatherDescription = document.querySelector('.temp-feels-like');
const humidity = document.querySelector('.humidity-stats .value');
const windSpeed = document.querySelector('.wind-stats .value');

button.addEventListener('click', () => {
    const city = inputSection.value;
    displayWeather(city);
});

// press button on enter
inputSection.addEventListener('keyup', (event) => { 
    if (event.keyCode === 13) {
        event.preventDefault();
        button.click();
    }
});

const weatherTypes = {
    "clear": "public/clear.png",
    "clouds": "public/cloud.png",
    "rain": "public/rain.png",
    "snow": "public/snow.png",
    "mist": "public/mist.png",
    "404": "public/404.png",
    "rainySun": "public/rainySun.png",
}

async function fetchWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1eab6b250fcda965da47219388287f42`);
    const data = await response.json();
    console.log(data);
    return data;
}

function displayWeather(city) {
    const data = fetchWeather(city);
    data.then((data) => {
        if (data.cod === "404" || data.cod === "400") {
            weatherImage.src = weatherTypes["404"];
            temperature.textContent = "404";
            weatherDescription.textContent = "City not found";
            humidity.textContent = "0";
            windSpeed.textContent = "0";
        }
        else {
            weatherImage.src = weatherTypes[data.weather[0].main.toLowerCase()];
            temperature.textContent = (data.main.temp - 273.15).toFixed(1);
            weatherDescription.textContent = data.weather[0].description;
            // first letters of each word to uppercase
            weatherDescription.textContent = weatherDescription.textContent.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
            humidity.textContent = data.main.humidity;
            windSpeed.textContent = data.wind.speed;
        }
    })
}
