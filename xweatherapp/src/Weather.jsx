import axios from 'axios';
import React, { useState } from 'react'

const Weather = () => {
  const [city, setCity] = useState("");
  const [cityWeather, setCityWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleSearch = async(e)=>{
    //console.log("calling handleSearch" + city);
    e.preventDefault();
    if(!city) return;
    setIsLoading(true);
    const url = "https://api.weatherapi.com/v1/current.json"
    try {
        const res = await axios.get(url, {
          params:{
            Key: "47e561fa17bf45dfb2293256251609",
            q: city,
          },
        });
        
        setCityWeather(res.data);     
        
    } catch (error) {  
      setCityWeather(null)    ;
      alert("Failed to fetch weather data");  
          
    }finally{
      setIsLoading(false);
      //console.log("city in finally" + city);      
    }

  }

  
  return (
    <div className='formwrap'>
      <form onSubmit={handleSearch}>
      <input type='text'
      placeholder='Enter city name'
      value={city}
      onChange={(e)=>setCity(e.target.value)}
      />
      <button type='submit'>
        Search
      </button>
      </form>

      <div>
        {isLoading && <p className='loaddata'>Loading data...</p>}
        {!isLoading && cityWeather && (
          <div className='weather-cards'>
            <WeatherCard title="Temperature"
            citydata={`${cityWeather.current.temp_c}°C`} />
             <WeatherCard title="Humidity"
            citydata={`${cityWeather.current.humidity}%`}/>
             <WeatherCard title="Condition"
            citydata={`${cityWeather.current.condition.text}`}/>
             <WeatherCard title="Wind Speed"
            citydata={`${cityWeather.current.wind_kph} kph`}/>
          </div>
        )}
      </div>
    </div>
  )
}

const WeatherCard = ({title, citydata})=>{
  return(
    <div className='weather-card'>
      <h4>{title}</h4>
      <p>{citydata}</p>
    </div>
  )
}


export default Weather