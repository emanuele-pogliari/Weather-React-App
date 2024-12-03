import { fetchCities } from "../functions";
import { useState } from "react";
import PropTypes from "prop-types";

function Searchbar({ citySelected }) {
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = async (event) => {
    if (event.target.value.length >= 1) {
      setUserInput(
        event.target.value[0].toUpperCase() + event.target.value.slice(1)
      );
    } else {
      setUserInput(event.target.value);
    }
    if (event.target.value.length >= 3) {
      const results = await fetchCities(event.target.value);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (city) => {
    setUserInput("");
    setSuggestions([]);
    citySelected(city);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex mb-1">
        <input
          type="text"
          className="flex-grow p-4 text-xl border-none outline-none rounded-s active:outline-none"
          name="cityInput"
          id="search"
          value={userInput}
          onChange={handleChange}
          placeholder="Digit at least 3 letter to initialize search..."
        />
        <button
          type="submit"
          className="px-8 text-xl text-white bg-green-500 rounded-e"
        >
          Search
        </button>
      </div>
      {userInput.length >= 3 && suggestions.length > 0 && (
        <ul className="z-10 w-full bg-white border rounded">
          {suggestions.map((city, index) => (
            <li
              key={`${city.name}-${index}`}
              onClick={() => handleSelect(city)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {city.name}, {city.admin1}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Searchbar.propTypes = {
  citySelected: PropTypes.func,
};

export default Searchbar;
