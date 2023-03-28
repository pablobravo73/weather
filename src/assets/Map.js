import React from 'react';

function Map({ weatherData }) {
  if (!weatherData || !weatherData.city || !weatherData.city.coord) {
    return null;
  }
  console.log(weatherData.city.coord);

  const { lat, lon } = weatherData.city.coord;
  const APIkey = '89d3931a50ffc7e00ad128bf67cb3269';
  const zoomLevel = 20;
  //const mapUrl = `https://tile.openweathermap.org/map/temp_new/${zoomLevel}/${Math.round(lat)}/${Math.round(lon)}.png?appid=${APIkey}`;
  const mapUrl = `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`
                                                                
  return (
    <div className="weather-map">
      <h2>Mapa del clima</h2>
      <img src={mapUrl} alt="Mapa del clima" />
    </div>
  );
}

export default Map;
