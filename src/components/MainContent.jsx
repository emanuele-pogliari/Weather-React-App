import { useState } from "react";
import "./MainContent.css";
import { fetchWeather } from "../functions";
import SearchBar from "./Searchbar";
import WeatherForecast from "./WeatherForecast";

function MainContent() {
  const [weatherData, setWeatherData] = useState({});
  const [isResultShown, setIsResultShown] = useState(false);

  const weatherConditions = {
    0: {
      description: "Clear sky",
      icon: "clear-day.svg",
    },

    1: {
      description: "Mainly clear",
      icon: "clear-day.svg",
    },
    2: {
      description: "Partly cloudy",
      icon: "cloudy-1-day.svg",
    },
    3: {
      description: "Overcast",
      icon: "cloudy.svg",
    },
    45: {
      description: "Fog",
      icon: "fog.svg",
    },

    48: {
      description: "Depositing rime fog",
      icon: "depositing-rain-fog.svg",
    },
    51: {
      description: "Light Drizzle",
      icon: "rainy-1-day.svg",
    },
    53: {
      description: "Moderate Drizzle",
      icon: "rainy-2-day.svg",
    },
    55: {
      description: "Heavy Drizzle",
      icon: "rainy-3-day.svg",
    },

    56: {
      description: "Freezing Drizzle: Light",
      icon: "rain-and-sleet-mix.svg",
    },

    57: {
      description: "Freezing Drizzle: Dense intensity",
      icon: "rain-and-sleet-mix.svg",
    },

    61: {
      description: "Rain: Slight",
      icon: "rainy-1.svg",
    },

    63: {
      description: "Rain: Moderate",
      icon: "rainy-2.svg",
    },

    65: {
      description: "Rain: Heavy intensity",
      icon: "rainy-3.svg",
    },

    66: {
      description: "Freezing Rain: Light",
      icon: "rain-and-snow-mix.svg",
    },

    67: {
      description: "Freezing Rain: Heavy",
      icon: "rain-and-snow-mix.svg",
    },

    71: {
      description: "Snow fall: Slight",
      icon: "snowy-1.svg",
    },

    73: {
      description: "Snow fall: Moderate",
      icon: "snowy-2.svg",
    },

    75: {
      description: "Snow fall: Heavy",
      icon: "snowy-3.svg",
    },

    77: {
      description: "Snow grains",
      icon: "snowy-3.svg",
    },

    80: {
      description: "Rain showers: Slight",
      icon: "rainy-3.svg",
    },

    81: {
      description: "Rain showers: Moderate",
      icon: "rainy-3.svg",
    },
    82: {
      description: "Rain showers: Violent",
      icon: "rainy-3.svg",
    },

    85: {
      description: "Snow showers: Slight",
      icon: "snowy-1-day.svg",
    },

    86: {
      description: "Snow showers: Heavy",
      icon: "snowy-3.svg",
    },

    95: {
      description: "Thunderstorm: Slight or moderate",
      icon: "thunderstorms.svg",
    },

    96: {
      description: "Thunderstorm with slight hail",
      icon: "thunderstorm.svg",
    },

    99: {
      description: "Thunderstorm with heavy hail",
      icon: "hail.svg",
    },
  };

  const arrayTemps = [];
  const arrayTimes = [];
  const arrayCodes = [];

  const fetchWeatherData = async (singleCity) => {
    const latitude = singleCity.latitude;
    const longitude = singleCity.longitude;

    const data = await fetchWeather(latitude, longitude);

    const newArray = data.hourly.temperature_2m;
    const newArrayTimes = data.hourly.time;
    const newArrayCodes = data.hourly.weather_code;

    for (let i = 0; i < 7; i++) {
      arrayTemps.push(newArray.splice(0, 24));
      arrayTimes.push(newArrayTimes.splice(0, 24));
      arrayCodes.push(newArrayCodes.splice(0, 24));
    }

    console.log(data);

    setWeatherData({
      cityName: singleCity.name,
      region: singleCity.admin1,
      country: singleCity.country,
      countryCode: singleCity.country_code,
      latitude: singleCity.latitude,
      longitude: singleCity.longitude,
      elevation: singleCity.elevation,
      temp: data,
      hours: arrayTimes,
      temps: arrayTemps,
      codes: arrayCodes,
      daily: data.daily,
    });

    setIsResultShown(true);
  };
  return (
    <div className="main">
      <h1 className="text-2xl ">LOGO</h1>

      <div className="flex flex-col items-center w-1/2 h-screen mx-auto">
        {!isResultShown && <SearchBar citySelected={fetchWeatherData} />}

        {isResultShown && (
          <>
            <div className="flex flex-col items-center p-20 text-white dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <div className="text-6xl text-center">{weatherData.cityName}</div>
              <div className="text-center text-8xl myWeather">
                {`${weatherData.temp.current.temperature_2m.toFixed(0)}°`}
              </div>
              <div className="text-2xl">
                {
                  weatherConditions[weatherData.temp.current.weather_code]
                    .description
                }
              </div>
              <div>
                <span>{weatherData.region}, </span>
                <span>{weatherData.country}</span>
              </div>
            </div>
            <div className="w-full">
              <WeatherForecast
                forecastHours={weatherData.hours}
                forecastTemps={weatherData.temps}
                forecastCodes={weatherData.codes}
                forecastDaily={weatherData.daily}
                weatherConditions={weatherConditions}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default MainContent;
