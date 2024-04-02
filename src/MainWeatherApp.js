// used axios
//npm install axios --save
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import WeatherToday from "./WeatherToday";
import WeatherHighlights from "./WeatherHighlights";
import DisplayMap from "./DisplayMap";
import { MapDataContext } from "./MapDataContext";

const myApiKey = "d58d6143e69245828cb0d72346d0f430";

function MainWeatherApp() {

  const {weatherData, setWeatherData} = useContext(MapDataContext);


  const [location, setLocation] = useState("");
  // const [weatherData, setWeatherData] = useState(null); // no data inquired for now from api.

  // use useEffect hook to get location data from api on every first render.

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get("https://ipapi.co/json/");
        const data = response.data;
        setLocation(data.city);
      } catch (error) {
        console.error("Error fetching Location", error);
      }
    };
    fetchLocation();
  }, []);

  // call api to  fetch location weather data on button search click.

  async function handleSearch() {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${myApiKey}`
      );
      const data = response.data;
      setWeatherData(data);
    } catch (error) {
      console.error("Error fecthing location data", error);
    }
  }


  // renders current location on first render
  useEffect(() => {
    async function fetchWeatherData() {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${myApiKey}`
        );
        const data = response.data;
        setWeatherData(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching location data", error);
      }
    }


    // if location is available
    if (location) {
      fetchWeatherData();
    }
  }, [location]);


  return (
    <div className="w-screen h-full min-h-screen">
      <h1
        className="text-4xl font-sans text-slate-900 flex justify-center pt-10 font-bold"
        id="header"
      >
        Weather App
      </h1>
      <div className="container mx-auto flex flex-col space-y-12" id="content">
        <div className="flex justify-center mt-10" id="searchbar">
          <input
            className="h-12 w-56 border-blue-500 border-solid border-2 pl-4 rounded-l-lg active:outline-blue-400"
            type="text"
            placeholder="    Enter City name here"
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white w-24 text-2xl rounded-r-md hover:bg-blue-600 active:bg-blue-800"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {weatherData && (
          <div
            className="mx-auto flex flex-col bg-cover md:flex md:flex-row md:space-x-12 gap-8"
            id="weather-info"
          >
            <div className="bg-gray-300 rounded-lg shadow-md p-8">
              <div className="w-full flex md:justify-center">
                <h2 className="text-xl font-semibold mb-4 text-indigo-800">
                  Today's Weather
                </h2>
              </div>

              <WeatherToday weatherData={weatherData} />
            </div>
            <div className="bg-gray-300 rounded-lg shadow-md p-8">
              <div className="w-full flex md:justify-center">
                <h2 className="text-xl font-semibold mb-4 text-indigo-800">
                  Today's Highlights
                </h2>
              </div>
              <WeatherHighlights weatherData={weatherData} />
            </div>
          </div>
        )}
      </div>
      <DisplayMap />
    </div>
  );
}

export default MainWeatherApp;
