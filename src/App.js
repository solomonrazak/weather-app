import React, {useState} from "react";
import MainWeatherApp from "./MainWeatherApp";
import { MapDataContext } from "./MapDataContext";

function App() {
  const [weatherData, setWeatherData] = useState(null);

  return (
    <MapDataContext.Provider value={{weatherData, setWeatherData}}>
      <div className="bg-slate-100 p-5 w-screen">
        <MainWeatherApp />
      </div>
    </MapDataContext.Provider>
  );
}

export default App;
