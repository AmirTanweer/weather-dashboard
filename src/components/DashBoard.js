import React, { useState } from 'react';
import axios from 'axios';
// import './DashBoard.css'
import summerImg from './images/summer.jpg'
import winterImg from './images/winter.jpg'
import rainyImg from './images/rainy.jpg'
import clearImg from './images/clear.jpg'
import mistImg from './images/mist.jpg'
import cloudyImg from './images/cloudy.jpg'
import { useEffect } from 'react';
const DashBoard = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [photo, setPhoto] = useState(summerImg)
  const fetchWeather = async () => {
    

    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/current.json',
      params: {q: `${city}`},
      headers: {
        'X-RapidAPI-Key': '919c8dff28msh9290586769af049p1c1874jsn88f260938240',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };
    
    try {
        const response = await axios.request(options);
        console.log(response.data);
        setWeatherData(response.data)
    } catch (error) {
        console.error(error);
    }
  };

  const initiate=()=>{
      if(weatherData)
      {

          if (weatherData.current.condition.text.includes('Sunny')) {
              setPhoto(summerImg);
  } 
  else if (weatherData.current.condition.text.includes('cloudy')) {
    setPhoto(cloudyImg);
  }
   else if (weatherData.current.condition.text.includes('Mist')) {
       setPhoto(mistImg);
    }
    else if (weatherData.current.condition.text.includes('rain')) {
       setPhoto(rainyImg);
    }
    else if (weatherData.current.condition.text.includes('Clear')) {
       setPhoto(clearImg);
    }
     else {
        setPhoto(summerImg); 
    }
    
}
}
useEffect(() => {
    initiate();
  }, [weatherData]);
  return (
    <div>
      

     
  


      
      <div className="container">

       <label htmlFor="exampleDataList" className="form-label container">Weather station DashBoard</label>
<input style={{display:"inline",width:"90%"}} value={city} onChange={(e) => setCity(e.target.value)} className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..."/>
<button type="button" onClick={fetchWeather} className="btn btn-primary mx-2 my-2">Search</button>
<datalist id="datalistOptions">
  <option value="San Francisco"/>
  <option value="New York"/>
  <option value="Seattle"/>
  <option value="Los Angeles"/>
  <option value="Chicago"/>
</datalist>
        
      </div>
      
      {weatherData && (
          
          <section className="vh-100" style={{backgroundColor: "#f5f6f7"}}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-10 col-lg-8 col-xl-6">
      
              <div className="card bg-dark text-white" style={{borderRadius: "40px"}}>
                <div className="bg-image" style={{borderRadius: "35px"}}>
                    
                       

                                
                                <img style={{height:"420px"}} src={photo}
                                className="card-img" alt="weather" />
                          
                   
                  <div className="mask" style={{backgroundColor: "rgba(190, 216, 232, .5)"}}></div>
                </div>
                <div className="card-img-overlay text-white p-5">
                  <h4 className="mb-0">{weatherData.location.name} , {weatherData.location.country}</h4>
                  <p className="display-2 my-3">{weatherData.current.temp_c}°C</p>
                  <p className="mb-2">Humidity: <strong>{weatherData.current.humidity}</strong></p>
                  <p className="mb-2">wind speed: <strong>{weatherData.current.wind_kph}km/hr</strong></p>
                  <p className="mb-2">Feels Like: <strong>{weatherData.current.feelslike_c}°C</strong></p>
                  <h5>{weatherData.current.condition.text}</h5>
                </div>
              </div>
      
            </div>
          </div>
        </div>
      </section>
      )}
    </div>
  );
};

export default DashBoard;
