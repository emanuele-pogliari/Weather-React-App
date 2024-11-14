import { useEffect, useState } from "react";
import axios from "axios";

function MainContent() {
  const [selectedCity, setSelectedCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const apiURI = "https://geocoding-api.open-meteo.com/v1/search?name=";
  const apiWeatherURI = "https://api.open-meteo.com/v1/forecast?";

  function handleChange(event) {
    setSelectedCity(event.target.value);
  }

  function handleSubmit(event) {
    let latitude;
    let longitude;
    event.preventDefault();
    axios.get(`${apiURI}${selectedCity}`).then((city) => {
      latitude = city.data.results[0].latitude;
      longitude = city.data.results[0].longitude;
      console.log(
        `${apiWeatherURI}latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`
      );
      retrieveData(latitude, longitude);
    });
    setSelectedCity("");
  }

  function retrieveData(latitude, longitude) {
    axios
      .get(
        `${apiWeatherURI}latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`
      )
      .then((data) => {
        setWeatherData(data);
      });
  }

  useEffect(() => {});

  return (
    <div className="container mx-auto">
      <h1 className="my-8 text-2xl text-center">React Meto App</h1>
      <div className="">
        <form className="flex w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            className="border flex-grow p-2.5 rounded-s"
            name="cityInput"
            id="search"
            value={selectedCity}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="px-3 text-white bg-green-500 rounded-e"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default MainContent;
