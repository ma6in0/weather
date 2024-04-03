// Dom
const input = document.querySelector("input");
const buttonShow = document.querySelector("button");
const cityName = document.querySelector(".w-card h3");
const tempH1 = document.querySelector(".temp h1");
const img = document.querySelector(".temp img");
const p = document.querySelectorAll(".w-card p");
const p1 = p[0];
const p2 = p[1];
const p3 = p[2];

buttonShow.onclick = () => {
  if (input.value.trim()) {
    fetchWeather(input.value);
  }
};

// REST API
const apiKey = "&appid=6511e14723ad8cb6f243ece1366c5deb";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";

function fetchWeather(city_name = "India") {
  fetch(baseURL + city_name + apiKey)
    .then((res) => res.json())
    .then((data) => {
      if (data.cod == "404") {
        alert(data.message);
        return;
      }
      console.log(data, "----data----");
      const { name, sys, main, weather, wind } = data;
      cityName.innerHTML = `${name} <span>${sys.country}</span>`;
      tempH1.innerHTML = `${Math.round(main.temp - 273.15)} <span>°c</span>`;
      p1.innerHTML = translateText(weather[0].main);
      p2.innerHTML = `Ветер: <span> ${wind.speed} км/ч</span> `;
      p3.innerHTML = `Влажность: <span> ${main.humidity}%</span>`;
      img.src = setImg(weather[0].main);
    })
    .catch((error) => {
      console.log("catch");
    });
}
fetchWeather();
function translateText(text) {
  switch (text) {
    case "Clouds":
      return "Облачно";
    case "Rain":
      return "Дождь";
    case "overcast clouds":
      return "пасмурное облака";
    case "Snow":
      return "Снег";
    case "Sun":
      return "солнце";
    case "Fog":
      return "туман";
  }
}
function setImg(text) {
  switch (text) {
    case "Rain":
      return "./images/rain2.png";
    case "Fog":
      return "./images/sun.png";
    case "Snow":
      return "./images/snow.png";
    case "overcast clouds":
      return "./images/mist.png";
    case "Clouds":
      return "./images/rain.png";
    case "Sun":
      return "./images/sunny.png";
  }
}
