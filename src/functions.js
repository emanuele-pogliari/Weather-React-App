import axios from "axios";

const apiURI = "https://geocoding-api.open-meteo.com/v1/search?name=";
const apiWeatherURI = "https://api.open-meteo.com/v1/forecast?";

export const fetchCities = async (cityName) => {
  const response = await axios.get(`${apiURI}${cityName}`);
  return response.data.results || [];
};

export const fetchWeather = async (latitude, longitude) => {
  const response = await axios.get(
    `${apiWeatherURI}latitude=${latitude}&longitude=${longitude}&current=weather_code,is_day,temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code,wind_speed_10m_max`
  );
  return response.data;
};
