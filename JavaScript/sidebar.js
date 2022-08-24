const forecastList = document.querySelector("#forecast");

const errorMessageCode = document.querySelector("#errorCode");

const highlightList = document.querySelector("#highlights");

const degreeChangeC = document.querySelector("#degreeC");
const degreeChangeF = document.querySelector("#degreeF");

let loader = document.querySelector("#loader");
let elHTML = document.querySelector("#forecast");

let q = "Lviv";
let units = "metric";

if (localStorage.getItem("units")) {
  units = localStorage.getItem("units");
}

if (units === "metric") {
  degreeChangeC.checked = true;
} else {
  degreeChangeF.checked = true;
}

function createhighlights(wind, sunrise, sunset, humidity, visibility) {
  const sunriseDate = new Date(sunrise * 1000);
  const sunsetDate = new Date(sunset * 1000);
  const sunriseTime = sunriseDate.toLocaleTimeString("ua");
  const sunsetTime = sunsetDate.toLocaleTimeString("ua");
  return `<div class="highlights_cards" id="todayhighlights">
  <div class="highlights_card">
    <p class="text_gray_400 w-full">Wind Status</p>
    <div class="wind_block">
      <p class="wind_text">${wind}</p>
      <span class="wind_speed">km/h</span>
    </div>
    <svg
      class="wind_icon_svg"
      version="1.1"
      id="Layer_1"
      xmlns="https://www.w3.org/2000/svg"
      xmlns:xlink="https://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 122.88 74.78"
      style="enable-background: new 0 0 122.88 74.78"
      xml:space="preserve"
    >
      <g>
        <path
          class="path_color"
          d="M28.69,53.38c-1.61,0-2.91-1.3-2.91-2.91c0-1.61,1.3-2.91,2.91-2.91h51.37c0.21,0,0.42,0.02,0.62,0.07 c1.84,0.28,3.56,0.8,5.1,1.63c1.7,0.92,3.15,2.19,4.27,3.89c3.85,5.83,3.28,11.24,0.56,15.24c-1.77,2.61-4.47,4.55-7.45,5.57 c-3,1.03-6.32,1.13-9.32,0.03c-4.54-1.66-8.22-5.89-8.76-13.55c-0.11-1.6,1.1-2.98,2.7-3.09c1.6-0.11,2.98,1.1,3.09,2.7 c0.35,4.94,2.41,7.56,4.94,8.48c1.71,0.62,3.67,0.54,5.48-0.08c1.84-0.63,3.48-1.79,4.52-3.32c1.49-2.19,1.71-5.28-0.61-8.79 c-0.57-0.86-1.31-1.51-2.18-1.98c-0.91-0.49-1.97-0.81-3.13-0.99H28.69L28.69,53.38z M15.41,27.21c-1.61,0-2.91-1.3-2.91-2.91 c0-1.61,1.3-2.91,2.91-2.91h51.21c1.17-0.18,2.23-0.5,3.14-0.99c0.87-0.47,1.61-1.12,2.18-1.98c2.32-3.51,2.09-6.6,0.61-8.79 c-1.04-1.53-2.68-2.69-4.52-3.32c-1.81-0.62-3.78-0.7-5.48-0.08c-2.52,0.92-4.59,3.54-4.94,8.48c-0.11,1.6-1.49,2.81-3.09,2.7 c-1.6-0.11-2.81-1.49-2.7-3.09c0.54-7.66,4.22-11.89,8.76-13.55c3-1.09,6.32-0.99,9.32,0.03c2.98,1.02,5.68,2.97,7.45,5.57 c2.72,4,3.29,9.41-0.56,15.24c-1.12,1.7-2.57,2.97-4.27,3.89c-1.54,0.83-3.26,1.35-5.1,1.63c-0.2,0.04-0.41,0.07-0.62,0.07H15.41 L15.41,27.21z M2.91,40.3C1.3,40.3,0,38.99,0,37.39c0-1.61,1.3-2.91,2.91-2.91h107.07c1.17-0.18,2.23-0.5,3.13-0.99 c0.87-0.47,1.61-1.12,2.18-1.98c2.32-3.51,2.09-6.6,0.61-8.79c-1.04-1.53-2.68-2.69-4.52-3.32c-1.81-0.62-3.78-0.7-5.48-0.08 c-2.52,0.92-4.59,3.54-4.94,8.48c-0.11,1.6-1.49,2.81-3.09,2.7c-1.6-0.11-2.81-1.49-2.7-3.09c0.54-7.66,4.22-11.89,8.76-13.55 c3-1.09,6.32-0.99,9.32,0.03c2.98,1.02,5.68,2.97,7.45,5.57c2.72,4,3.29,9.41-0.56,15.24c-1.12,1.7-2.57,2.97-4.27,3.89 c-1.54,0.83-3.26,1.35-5.1,1.63c-0.2,0.04-0.41,0.07-0.62,0.07H2.91L2.91,40.3z"
        />
      </g>
    </svg>
  </div>
  <div class="highlights_card">
    <p class="text_gray_400 w-full">Sunrise & Sunset</p>
    <div class="suny_block">
      <div class="sun_block">
        <img
          src="/images/sunrise.svg"
          alt="sunrise"
          class="sun_img"
        />
        <p class="sun_text">${sunriseTime} AM</p>
      </div>
      <div class="sun_block">
        <img
          src="/images/sunset.svg"
          alt="sunset"
          class="sun_img"
        />
        <p class="sun_text">${sunsetTime} PM</p>
      </div>
    </div>
  </div>
  <div class="highlights_card">
    <p class="text_gray_400 w-full">Humidity</p>
    <div class="humidity_block">
      <p class="wind_text">${humidity}</p>
      <p class="wind_speed">%</p>
    </div>
  </div>
  <div class="highlights_card">
    <p class="text_gray_400 w-full">Visibility</p>
    <div class="humidity_block">
      <p class="wind_text">${visibility}</p>
      <p class="wind_speed">m</p>
    </div>
  </div>
</div>`;
}

function createCurrent(dt, temp, icon, description, city) {
  const arraymonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(dt * 1000);
  const time = date.toLocaleTimeString("ua");
  const day = new Intl.DateTimeFormat("en", { weekday: "long" }).format(date);
  const month = date.getMonth();
  const monthDay = date.getDate();
  const wordArray = description.split("");
  const firstLetter = wordArray[0].toUpperCase();
  const letterRest = [...wordArray];
  letterRest.splice(0, 1);
  const finalDescription = [firstLetter, ...letterRest].join("");

  return `<div class="icon_deg_block">
    <img
      src="https://openweathermap.org/img/wn/${icon}@4x.png"
      alt=""
      class="current_icon"
    />
    <p class="current_degree">${temp}°</p>
  </div>
  <div class="current_city_date">
    <h1 class="city_title">${city}</h1>
    <div class="date_text">
      <h2 class="current_day">${day},</h2>
      <p class="current_month">${arraymonth[month]} ${monthDay}</p>
    </div>
  </div>
  <hr class="line" />
  <div class="current_icon_day">
    <svg 
      xmlns="https://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke-width="2" 
      stroke="currentColor" 
      aria-hidden="true" 
      class="h-6 w-6">
    <path 
      stroke-linecap="round" 
      stroke-linejoin="round" 
      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z">
  </path></svg>
  <h3 class="current_time_text">${finalDescription}</h3>
  </div>
  <div class="current_time">
    <svg
      xmlns="https://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      aria-hidden="true"
      class="h-6 w-6 icon_color"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
    <h3 class="current_time_text">${time}</h3>
  </div>`;
}

function sumbitFunc() {
  q = document.querySelector("#searchCity").value;
  errorCode.style.display = "none";
  helpBlock.style.display = "none";
  requestWeather();
}

const formCitySumbit = document.querySelector("#searchForm");
formCitySumbit.onsubmit = function (e) {
  e.preventDefault();
  sumbitFunc();
  errorCode.style.display = "none";
};

const citySearch = document.querySelector("#buttonSubmit");
citySearch.onclick = myClick;
function myClick() {
  errorCode.style.display = "none";
  q = document.querySelector("#searchCity").value;
  helpBlock.style.display = "none";
  requestWeather();
}

degreeChangeF.oninput = degreeClickF;
degreeChangeC.oninput = degreeClickC;

function degreeClickC() {
  if (degreeChangeC.checked) {
    units = "metric";
    localStorage.setItem("units", units);
    requestWeather();
    GeoFunction();
  }
}

function degreeClickF() {
  if (degreeChangeF.checked) {
    units = "imperial";
    localStorage.setItem("units", units);
    requestWeather();
    GeoFunction();
  }
}

function requestWeather() {
  handleApiRequest(q, units);
  loader.style.display = "block";
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=${units}&appid=8abba83ab8f518e7f932c74ac200adb8`
  )
    .then(function (resp) {
      return resp.json();
    })
    .then(function (dataCurrent) {
      helpBlock.style.display = "none";
      console.log(dataCurrent);
      if (dataCurrent.message) {
        if (dataCurrent.message === "city not found") {
          q = "";
          console.log(dataCurrent.message);
          openModal("City not found");
          return;
        } else if (dataCurrent.message === "Nothing to geocode") {
          q = "";
          console.log(dataCurrent.message);
          openModal("Enter the name of the city");
          return;
        }
      }
      const highlightHTML = createhighlights(
        dataCurrent.wind.speed,
        dataCurrent.sys.sunrise,
        dataCurrent.sys.sunset,
        dataCurrent.main.humidity,
        dataCurrent.visibility
      );
      highlightList.innerHTML = highlightHTML;
      const currentHTML = createCurrent(
        dataCurrent.dt,
        Math.round(dataCurrent.main.temp),
        dataCurrent.weather[0].icon,
        dataCurrent.weather[0].description,
        dataCurrent.name
      );
      forecastList.innerHTML = currentHTML;
    })
    .finally(function () {
      loader.style.display = "none";
    });
}

// requestWeather();

function success(pos) {
  const crd = pos.coords;
  // console.log(crd);
  helpBlock.style.display = "none";
  requestWeatherGeo(crd.latitude, crd.longitude);
}

function errorGeo() {
  helpBlock.style.display = "none";
  errorCode.style = "display: flex";
  return `<svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 2" id="Layer_2" class="alert_img"><path d="M22.7,28H9.3a6.25,6.25,0,0,1-5.47-3.15,6.15,6.15,0,0,1,0-6.22L10.56,7.12a6.3,6.3,0,0,1,10.88,0l6.71,11.51h0a6.15,6.15,0,0,1,0,6.22A6.25,6.25,0,0,1,22.7,28ZM16,6a4.24,4.24,0,0,0-3.71,2.12L5.58,19.64a4.15,4.15,0,0,0,0,4.21A4.23,4.23,0,0,0,9.3,26H22.7a4.23,4.23,0,0,0,3.73-2.15,4.15,4.15,0,0,0,0-4.21L19.71,8.12A4.24,4.24,0,0,0,16,6Z"/><path class="cls-1" d="M16,12a.54.54,0,0,0-.44.22.52.52,0,0,0-.1.48L16,14.88l.54-2.18a.52.52,0,0,0-.1-.48A.54.54,0,0,0,16,12Z"/><path d="M18,11a2.56,2.56,0,0,0-4,0,2.5,2.5,0,0,0-.46,2.19L15,19.24a1,1,0,0,0,1.94,0l1.51-6.06A2.5,2.5,0,0,0,18,11ZM16.54,12.7,16,14.88l-.54-2.18a.52.52,0,0,1,.1-.48.55.55,0,0,1,.88,0A.52.52,0,0,1,16.54,12.7Z"/><circle cx="16" cy="22.5" r="1.5"/></svg>
  <p class="error_text_c" id="errorText">Please write the name of the city or allow geo permission!</p>`;
}

function error() {
  errorMessageCode.innerHTML = errorGeo();
}

const geoClick = document.querySelector("#GeoButton");
geoClick.onclick = GeoFunction;
function GeoFunction() {
  navigator.geolocation.getCurrentPosition(success, error);
}

function requestWeatherGeo(lat, lon) {
  handleApiRequestGeo(lat, lon, units);
  loader.style.display = "block";
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=8abba83ab8f518e7f932c74ac200adb8`
  )
    .then(function (resp) {
      return resp.json();
    })
    .then(function (dataCurrent) {
      console.log(dataCurrent);
      const highlightHTML = createhighlights(
        dataCurrent.wind.speed,
        dataCurrent.sys.sunrise,
        dataCurrent.sys.sunset,
        dataCurrent.main.humidity,
        dataCurrent.visibility
      );
      highlightList.innerHTML = highlightHTML;
      const currentHTML = createCurrent(
        dataCurrent.dt,
        Math.round(dataCurrent.main.temp),
        dataCurrent.weather[0].icon,
        dataCurrent.weather[0].description,
        dataCurrent.name
      );
      forecastList.innerHTML = currentHTML;
    })
    .finally(function () {
      loader.style.display = "none";
    });
}
