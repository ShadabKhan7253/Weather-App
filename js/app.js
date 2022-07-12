(function ($, document, window) {
  $(document).ready(function () {
    // Cloning main navigation for mobile menu
    $('.mobile-navigation').append($('.main-navigation .menu').clone());

    // Mobile menu toggle
    $('.menu-toggle').click(function () {
      $('.mobile-navigation').slideToggle();
    });
  });

  $(window).load(function () {});
})(jQuery, document, window);

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday'];
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

const cityForm = document.querySelector('#cityForm');
const cityInput = document.querySelector('#city');
const dayLabels = document.querySelectorAll('.day');
const todaysDate = document.querySelector('#todaysDate');
const citynameLabel = document.querySelector('.location');
const tempLabels = document.querySelectorAll('.temp');
const weatherIconsImg = document.querySelectorAll('.weather-icon');
const humidityLabel = document.querySelector('#humidity');
const windSpeedLabel = document.querySelector('#wind-speed');
const windDegLabel = document.querySelector('#wind-degree');

console.log(dayLabels);

cityForm.addEventListener('submit', fetchWeatherFromCity);

async function fetchWeatherFromCity(e) {
  e.preventDefault();
  let cityName = cityInput.value;
  if (cityName === '' || cityName === undefined || cityName === null) {
    cityName = 'Mumbai';
  }

  const weatherResponse = await getWeather(cityName);

  if (weatherResponse.state === 'success') {
    render(weatherResponse.weatherInfo);
  } else if (weatherResponse.state === 'error') {
    alert('There is some issue at API consume part!');
  }
}

function filterWeatherDataByHour(weatherDataArray, hour = 0) {
  const filterWeatherData = weatherDataArray.filter(
    (data) => new Date(data.dt_txt).getHours() === hour
  );
  return filterWeatherData;
}

function render(weatherInfo) {
  const weatherDataArray = weatherInfo.list;
  const apiCityName = weatherInfo.city.name;
  citynameLabel.innerHTML = apiCityName;

  const keyTime = new Date(weatherDataArray[0].dt_txt).getHours();
  const filterWeatherData = filterWeatherDataByHour(weatherDataArray, keyTime);

  processFilteredData(filterWeatherData);
}

function processFilteredData(filterWeatherData) {
  filterWeatherData.forEach((data, index) => {
    const currentDate = new Date(data.dt_txt);
    const currentDayIndex = currentDate.getDay();
    dayLabels[index].innerHTML = days[currentDayIndex];

    // show date only for 1st data
    if (index === 0) {
      processFirstDay(data);
    }
    const currentTemp = Math.round(data.main.temp);
    tempLabels[index].innerHTML = `${currentTemp}<sup>o</sup>C`;

    const baseImagePath = 'images/icons/';
    const imagePath = baseImagePath + data.weather[0].icon + '.svg';
    weatherIconsImg[index].setAttribute('src', imagePath);
  });
}

function processFirstDay(data) {
  const currentDate = new Date(data.dt_txt);
  todaysDate.innerHTML = currentDate.getDate() + ' ' + months[currentDate.getMonth()];

  const apiHumidity = data.main.humidity;
  // as the API is giving speed in m/sec, but we want to show km/hr, we need to multiply the value by 3.6
  const apiWindSpeed = Math.round(data.wind.speed * 3.6);
  const apiWindDeg = data.wind.deg;

  humidityLabel.innerHTML = apiHumidity + '%';
  windSpeedLabel.innerHTML = apiWindSpeed + 'km/hr';
  windDegLabel.innerHTML = apiWindDeg + '&deg';
}
