function updateWeather(response) {
  let temperatureElement = document.querySelector("#city-temperature");
  let cityName = document.querySelector(".city-name");
  let humidity = document.querySelector(".humidity");
  let wind = document.querySelector(".wind");
  let description = document.querySelector(".condition");
  let time = document.querySelector(".date");
  let date = new Date(response.data.time * 1000);

  let temperature = response.data.temperature.current;
  cityName.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  humidity.innerHTML = response.data.temperature.humidity;
  wind.innerHTML = response.data.wind.speed;
  description.innerHTML = response.data.condition.description;
  time.innerHTML = formatDate(date);
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
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}
function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#form-search");
  cityData(cityInput.value);
}
let formSearchElement = document.querySelector("#form-input");
formSearchElement.addEventListener("submit", searchCity);

cityData("Tokyo");
