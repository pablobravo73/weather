import React, { useState } from 'react';
import moment from 'moment';
import './styles/GetWeather.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';



import 'moment/locale/es';

import TodayWeather from './todayDate';



function GetWeather() {
  
  const [keyword, setKeyword] = useState('Mexico');
  const [weatherData, setWeatherData] = useState(null);
  const [today, setToday] = useState(new Date());
  
 



  const handleButtonClick = () => {

    

    const APIkey = '89d3931a50ffc7e00ad128bf67cb3269';
    const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${keyword}&units=metric&lang=sp&appid=${APIkey}`;
    
    fetch(apiURL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setWeatherData(data);
        const dayGroup = {};
        data.list.forEach(item => {
          const unixDate = item.dt;
          const day = moment.unix(unixDate).format('dddd');
          if (!dayGroup[day]) {
            dayGroup[day] = [];
          }
          dayGroup[day].push(item);
        });
        console.log(dayGroup);
        setToday(dayGroup);
      })
      .catch(error => {
        console.error('Error fetching weather data', error);
        alert('Write a correct location!!');
      });
  };

  return (
    <div className="App">
      
      <section className="App-content">
        <h1>Weather App</h1>
        <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} />
        <button onClick={handleButtonClick}>Buscar</button>
        {weatherData && today && (
          <div className="weather-body" key={weatherData.city.id}>
            <h2>{weatherData.city.name}, {weatherData.city.country}</h2>
            <TodayWeather weatherData={weatherData} />
            <Tabs>
              <TabList>
                {Object.entries(today).map(([day]) => (
                  <Tab key={day}>{day}</Tab>
                  
                ))}
              </TabList>
              {Object.entries(today).map(([day, data], index) => (
                
                <TabPanel className='card' key={day}>
                  
                 
                  {data.map((item, index) => {
                    const unixDate = item.dt;
                    const dayTime = moment.unix(unixDate).format('HH:mm');
                    return (
                      
                          <div className='card-body'>
                          <div className="card-row" key={index}>
                            <div className="card-column">
                              <p>{dayTime}</p>
                              <img
                                src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                                alt={item.weather[0].description}
                              />
                              <p>{`${Math.round(item.main.temp)}`}°C</p>
                              <p >{`${Math.round(item.pop * 100)}%`}</p>
                                
                              
                            </div>
                          </div>
                          </div>

                    );
                  })}
                  
                  
                  
                </TabPanel>
              ))}
             
            </Tabs>
          </div>
        )}
      </section>
    </div>
  );
}

export default GetWeather;
