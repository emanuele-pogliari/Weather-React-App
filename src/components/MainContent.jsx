import { useState } from "react";
import axios from "axios";
import "./MainContent.css";

function MainContent() {
  const [userInput, setUserInput] = useState("");
  const [selectedCity, setSelectedCity] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [isResultShown, setIsResultShown] = useState(false);

  const apiURI = "https://geocoding-api.open-meteo.com/v1/search?name=";
  const apiWeatherURI = "https://api.open-meteo.com/v1/forecast?";
  let cities = [];
  let cityObject = {};

  const handleChange = (event) => {
    if (event.target.value.length >= 1) {
      setUserInput(
        event.target.value[0].toUpperCase() + event.target.value.slice(1)
      );
    } else {
      setUserInput(event.target.value);
    }

    if (event.target.value.length >= 3) {
      axios.get(`${apiURI}${event.target.value}`).then((city) => {
        let selection = city.data.results;
        selection.map((singleCity, index) => {
          cities.push(
            <li
              key={singleCity.name + "-" + index + 1}
              onClick={() => retrieveData(singleCity)}
              className="px-2 py-3"
            >
              {singleCity.name}, {singleCity.admin1}, {singleCity.country}
            </li>
          );
        });
        setSelectedCity(cities);
      });
    }
  };

  const retrieveData = (singleCity) => {
    let latitude = singleCity.latitude;
    let longitude = singleCity.longitude;
    axios
      .get(
        `${apiWeatherURI}latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weather_code`
      )
      .then((data) => {
        cityObject = {
          cityName: singleCity.name,
          region: singleCity.admin1,
          country: singleCity.country,
          countryCode: singleCity.country_code,
          latitude: singleCity.latitude,
          longitude: singleCity.longitude,
          elevation: singleCity.elevation,
          temp: data.data,
        };
        console.log(cityObject);
        setWeatherData(cityObject);
        setIsResultShown(true);
      });
    setUserInput("");
  };

  return (
    <div className="container relative flex flex-col justify-center h-screen mx-auto">
      <h1 className="absolute my-8 text-2xl text-center -translate-x-1/2 top-5 left-1/2">
        React Meto App
      </h1>
      <div>
        <div className="relative w-full">
          <form className="flex" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              className="border flex-grow p-2.5 rounded-s"
              name="cityInput"
              id="search"
              value={userInput}
              onChange={handleChange}
              placeholder="Digit at least 3 letter to initialize search..."
            />
            <button
              type="submit"
              className="px-3 text-white bg-green-500 rounded-e"
            >
              Search
            </button>
          </form>
          {userInput.length >= 3 && (
            <div className="absolute w-full text-white slide-bottom">
              <ul>{selectedCity}</ul>
            </div>
          )}
        </div>
      </div>
      {isResultShown === true && (
        <div className="weatherCard">
          <div>{weatherData.cityName}</div>
          <div>{weatherData.region}</div>
          <div>{weatherData.country}</div>
          <div>{weatherData.countryCode}</div>
          <div>{weatherData.longitude}</div>
          <div>{weatherData.latitude} </div>
          <div>{weatherData.elevation} m dal livello del mare</div>
        </div>
      )}
    </div>
  );
}

export default MainContent;
