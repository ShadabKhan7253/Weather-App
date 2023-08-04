const API_KEY = 'df8427dd3058e0e398e1b0b0d745308a';
const BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast';

const getWeather = async (city) => {
  const http = new slhttp();
  const url = `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`;

  try {
    const res = await http.get(url);
    // console.log('Hello', res);
    return {
      state: 'success',
      weatherInfo: res,
    };
  } catch (e) {
    return {
      state: 'error',
      weatherInfo: null,
    };
  }
};
// console.log(getWeather('Goa'));

getWeather('Goa')
  .then((data) => console.log('DATA', data))
  .catch((err) => console.log(err));
