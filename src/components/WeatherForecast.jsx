import "./WeatherForecast.css";
import { useState } from "react";
import PropTypes from "prop-types";
function WeatherForecast({
  forecastTemps,
  forecastHours,
  forecastCodes,
  forecastDaily,
  weatherConditions,
}) {
  let weatherPathImg = "src/assets/conditions/";
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const getMyHour = (date) => {
    const newDate = new Date(date);
    let final = newDate.getHours();
    if (final < 10) {
      final = "0" + final;
    }
    return final;
  };

  const getMyDay = (date) => {
    const currentDate = new Date().toISOString();
    const fjf = new Date(currentDate).getDate();
    const fjf2 = new Date(date).getDate();

    if (fjf2 === fjf) {
      return "Today";
    } else {
      const newDate = new Date(date);
      return weekDays[newDate.getDay()];
    }
  };

  const getImgWeather = (weather_code) => {
    console.log(weather_code);
    return weatherPathImg + weatherConditions[weather_code].icon;
  };

  return (
    <div className="p-3 overflow-hidden rounded-1 cardGlass">
      <h3 className="text-center ">7-Day Forecast</h3>
      {forecastHours.map((forecastHour, index) => (
        <div key={index} className="flex flex-col justify-between w-full">
          <div
            className="grid items-center p-3 font-semibold cursor-pointer lg:grid-cols-4"
            onClick={() => {
              handleToggle(index);
            }}
          >
            <div>{getMyDay(forecastHour[index])}</div>
            <div className="text-center">
              <img
                className="h-5"
                src={`${getImgWeather(forecastDaily.weather_code[index])}`}
              />
            </div>
            <div className="text-center">
              {forecastDaily.temperature_2m_min[index].toFixed(0)}°C
              <span className="mx-2">[---------]</span>
              {forecastDaily.temperature_2m_max[index].toFixed(0)}°C
            </div>
            <div className="text-center">3 Km/h</div>
          </div>

          <div className={`content ${activeIndex === index ? "open" : ""} p-3`}>
            <div className="flex justify-between">
              {forecastTemps[index].map((a, ind) => (
                <span className="" key={ind + 1}>
                  {a.toFixed(0)}
                </span>
              ))}
            </div>
            <div className="flex justify-between ">
              {forecastCodes[index].map((c, ind) => (
                <span key={ind + 1} className="text-center">
                  {c}
                </span>
              ))}
            </div>
            <div className="flex justify-between ">
              {forecastHour.map((b, ind) => (
                <span key={ind + 1} className="text-center">
                  {getMyHour(b)}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

WeatherForecast.propTypes = {
  forecastHours: PropTypes.array,
  forecastTemps: PropTypes.array,
  forecastCodes: PropTypes.array,
  forecastDaily: PropTypes.object,
  weatherConditions: PropTypes.object,
};

export default WeatherForecast;
