const weatherList = document.querySelector("#weather");

let theme = document.documentElement;
let themeChange = theme.className;

if (localStorage.getItem("theme.className")) {
  theme.className = localStorage.getItem("theme.className");
}

function createCard(dt, temp, tempMin, tempMax, icon, description) {
  const date = new Date(dt * 1000);
  const day = new Intl.DateTimeFormat("en", { weekday: "long" }).format(date);
  const time = date.toLocaleTimeString("ua");
  return `<div class="card_day">
    <p class="forecast_day">${day}</p>
    <p class="time_card">${time}</p>
    <img src="https://openweathermap.org/img/wn/${icon}.png" alt="">
    <p class="description_text">${description}</p>
    <div class="degrees_block">
      <p class="font_medium">${temp}°</p>
    </div>
  </div>`;
}

function handleApiRequest(q, units) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?&q=${q}&units=${units}&appid=8abba83ab8f518e7f932c74ac200adb8`
  )
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      // console.log(data);
      console.log(data.list);
      weatherList.innerHTML = "";
      for (const weather of data.list) {
        const cardHTML = createCard(
          weather.dt,
          Math.round(weather.main.temp),
          Math.round(weather.main.temp_min),
          weather.main.temp_max,
          weather.weather[0].icon,
          weather.weather[0].description
        );
        weatherList.innerHTML += cardHTML;
      }
    })
    .catch(function () {});
}

const switchMode = document.querySelector("#themeButton");

if (theme.className === "dark") {
  sunIcon.style.display = "block";
} else {
  moonIcon.style.display = "block";
}

switchMode.onclick = function () {
  if (theme.className === "dark") {
    theme.className = "light";
    moonIcon.style.display = "block";
    sunIcon.style.display = "none";
    localStorage.setItem("theme.className", theme.className);
  } else {
    theme.className = "dark";
    moonIcon.style.display = "none";
    sunIcon.style.display = "block";
    localStorage.setItem("theme.className", theme.className);
  }
};

function handleApiRequestGeo(lat, lon, units) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?&lat=${lat}&lon=${lon}&units=${units}&appid=8abba83ab8f518e7f932c74ac200adb8`
  )
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      // console.log(data);
      console.log(data.list);
      weatherList.innerHTML = "";
      for (const weather of data.list) {
        const cardHTML = createCard(
          weather.dt,
          Math.round(weather.main.temp),
          Math.round(weather.main.temp_min),
          weather.main.temp_max,
          weather.weather[0].icon,
          weather.weather[0].description
        );
        weatherList.innerHTML += cardHTML;
      }
    })
    .catch(function () {});
}

let modal = document.querySelector("#myModal");
let span = document.querySelector(".close");
let modalText = document.querySelector(".modal_text");

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function openModal(message) {
  modal.style.display = "block";
  modalText.textContent = message;
}
