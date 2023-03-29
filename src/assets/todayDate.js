import React, { useState, useEffect } from 'react';
import moment from 'moment';


import './styles/todayDate.css';

function TodayWeather({ weatherData }) {
  const [todayWeather, setTodayWeather] = useState(null);
  const { lat, lon } = weatherData?.city?.coord || {};
  const APIkey = '89d3931a50ffc7e00ad128bf67cb3269';

  useEffect(() => {
    if (!lat || !lon) {
      return;
    }
    const todayWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=sp&units=metric&appid=${APIkey}`
  
    fetch(todayWeatherURL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        
        setTodayWeather(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }, [lat, lon, APIkey]);

  return (
    <div>
      
      {todayWeather && (
        <div className='today-card'>
          <div className='today-card-title'>
            <section className='temp-section'>
              <img src={`http://openweathermap.org/img/w/${todayWeather.weather[0].icon}.png`} alt='weather icon' /> 
            
                <p>{`${Math.round(todayWeather.main.temp)}°C`}</p>
            </section>
            <div className='today-card-body'>
              <div className='today-card-row'>

              <section className='section-container'>
              <p>{moment.unix(todayWeather.dt).format('dddd D MMMM')}</p>
              <p>{moment.unix(todayWeather.dt).format('HH:mm')}</p>
              </section>
              <section className='description-section'>
                <p className='section-description'>{todayWeather.weather[0].description}</p>
              
              </section>
              
              
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodayWeather;
