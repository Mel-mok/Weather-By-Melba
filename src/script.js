function updateWeather(response) {
  let temperatureElement = document.querySelector("#city-temperature");
  let cityName = document.querySelector(".city-name");
  let humidity = document.querySelector(".humidity");
  let wind = document.querySelector(".wind");
  let description = document.querySelector(".condition");
  let time = document.querySelector(".date");
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector(".icon");

  let temperature = response.data.temperature.current;
  cityName.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  humidity.innerHTML = response.data.temperature.humidity;
  wind.innerHTML = response.data.wind.speed;
  description.innerHTML = response.data.condition.description;
  time.innerHTML = formatDate(date);
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="city-emoji">`;

  getForecast(response.data.city);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}
function cityData(city) {
  let apiKey = "03036dt370ce468aff38bf274ca02od3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}units=metric`;
  axios.get(apiUrl).then(updateWeather);
}
function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#form-search");
  cityData(cityInput.value);
}
function getForecast(city) {
  let apiKey = "03036dt370ce468aff38bf274ca02od3";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecast = "";

  days.forEach(function (day) {
    forecast =
      forecast +
      `
        <div class="column">
          <div class="forecast-day">${day}</div>
          <img
            src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png"
            class="emoji-forecast"
          />
          <div class="forecast-temperature">
            <span class="temperature-max">29</span>
            <span class="max-symbol">°</span>
            <span class="temperature-min">11</span>
            <span class="min-symbol">°</span>
          </div>
        </div>
      `;
  });
  let forecastElement = document.querySelector(".row");
  forecastElement.innerHTML = forecast;
}
let formSearchElement = document.querySelector(".form-input");
formSearchElement.addEventListener("submit", searchCity);

cityData("Tokyo");
displayForecast();
