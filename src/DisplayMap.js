import React, { useState, useContext } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { MapDataContext } from "./MapDataContext";

const DisplayMap = () => {
  const { weatherData, setWeatherData } = useContext(MapDataContext);

  const [displayMap, setDisplayMap] = useState(false);

  // const center = [weatherData.coord.lat, weatherData.coord.lon];

   // Check if weatherData is available
   if (!weatherData || !weatherData.coord) {
    return null; // Return null or loading indicator if data is not available yet
  }

  const { lat, lon } = weatherData.coord; // Destructure lat and lon from coord

  const center = [lat, lon]; // Use lat and lon for the map center

  function displayMapNow(){
    setDisplayMap(true)
  }
  return (
    <div className="py-5">
      <div className=" flex justify-center items-center">
        <button className="bg-red-300 text-white" onClick={displayMapNow}>
          Click to display on map
        </button>
      </div>
      { displayMap && 
      <div className="w-[80%] h-[200px] flex justify-center" style={{position: 'relative', top: '20px'}}>
        <MapContainer center={center} zoom={10}>
        <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {/* <Marker position={center}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker> */}
        </MapContainer>
      </div>
}
    </div>
  );
};

export default DisplayMap;
