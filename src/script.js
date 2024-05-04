function updateWeather(response) {
  let temperatureElement = document.querySelector("#city-temperature");
  let temperature = response.data.temperature.current;
  let cityName = document.querySelector(".city-name");
  cityName.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
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

cityData("Brussels");
