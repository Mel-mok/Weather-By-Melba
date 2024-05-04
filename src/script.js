function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#form-search");
  let cityName = document.querySelector(".city-name");
  cityName.innerHTML = cityInput.value;
}
let formSearchElement = document.querySelector("#form-input");
formSearchElement.addEventListener("submit", searchCity);
