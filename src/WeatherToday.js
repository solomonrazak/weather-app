import React from 'react';

function WeatherToday({weatherData}) { // destructuring
    if (!weatherData || !weatherData.main || !weatherData.weather || weatherData.weather.length === 0) {
        return null; // Render nothing if data is not available yet
      }

  const temperature = Math.round(weatherData.main.temp - 273.15);
  const feelsLike = Math.round(weatherData.main.feels_like - 273.15);
  const description = weatherData.weather[0].description;
  

  const date = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const time = new Date().toLocaleTimeString();
  const location = weatherData.name;
  const country = weatherData.sys.country;

  const iconCode = weatherData.weather[0].icon;

  console.log(iconCode)

  const weatherIcon = iconCode ? (
    <img
        src={require(`../assets/${iconCode}.png`)} // Replace with actual weather icon URL or import from assets folder
        alt="Weather Icon"
        className="w-20 h-20 mr-8"
      />
  ) : null;



  return (
    <div className="bg-white flex items-center rounded-md p-7 shadow-md shadow-slate-400">
        <div>{weatherIcon}</div>
        <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-3">
                <h1 className="text-4xl font-bold mb-2">{temperature}°C</h1>
                <p className="text-lg">Feels Like: {feelsLike}°C</p>
                <p className="text-lg">Description: {description}</p>
            </div>
            <hr />
            <div className="flex flex-col space-y-3">
                <p>Date: {date}</p>
                <p>Time: {time}</p>
                <p>Location : {location}, {country}</p>
            </div>
        </div>

    </div>
  )
}

export default WeatherToday