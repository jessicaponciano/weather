function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let currentDay = days[dayIndex];

  return `${currentDay} ${hours}:${minutes}`;
}

function weatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "c6f8ef4575250284954db9f4dfa7a996";
  let urlApiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  axios.get(urlApiWeather).then(weatherCondition);
}

function cityInput(e) {
    e.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
}

function currentCity(position) {
  let apiKey = "c6f8ef4575250284954db9f4dfa7a996";
  let urlApiCity = `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  
  axios.get(urlApiCity).then(weatherCondition);
}

function getCurrentPosition(e) {
  e.preventDefault();
  navigator.geolocation.getCurrentPosition(currentCity);
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", cityInput);

let city = document.querySelector("#btn-current-city");
city.addEventListener("click", getCurrentPosition);

searchCity("Porto");




