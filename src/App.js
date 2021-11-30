import './App.css';
import axios from 'axios'
import moment from 'moment';
import React, {useEffect, useState, useRef } from 'react'


const api_key = '502be4a3f757d05481978a1d605f8b51'
const url = 'http://api.openweathermap.org/data/2.5/weather'
const request_url = url+'?q=Toronto&cnt=1&appid='+api_key;


export default function App() {
    const [done, setDone] = useState(false)

    const [model, setModel] = useState({
      location_name : 'Not Found',
      condition : 'N/A',
      description : 'N/A',
      icon : '10d',
      cur_temp : 0,
      feels : 0,
      min : 0,
      max : 0,
      humidity : 0,
      wind_speed : 0,
      sunrise : 0,
      sunset : 0
    })

    useEffect(() => {
      !done &&
        axios.get(request_url)
        .then(res => {
          console.log(res.data)
                setModel({
                  location_name : res.data.name,
                  condition : res.data.weather[0].main,
                  description : res.data.weather[0].description,
                  icon : res.data.weather[0].icon,
                  cur_temp : res.data.main.temp,
                  feels : res.data.main.feels_like,
                  min : res.data.main.temp_min,
                  max : res.data.main.temp_max,
                  humidity : res.data.main.humidity,
                  wind_speed : res.data.wind.speed,
                  clouds : res.data.clouds.all,
                  sunrise : res.data.sys.sunrise,
                  sunset : res.data.sys.sunset
                })
                setDone(true)
        })
        .catch(err => {
                console.log(err)
        })
    })

    return (
        <div style={{background : 'linear-gradient(#eba434, #42adff)', width : '100vw', height : '100vh'}}>
          <img className="icon" src={`https://openweathermap.org/img/wn/${model.icon}@4x.png`}/>
          <div className="title">{model.location_name}</div><br/>
            <div className="infobox">
              <div className="info">Current Temp: {Math.round(model.cur_temp - 273.15)}°C</div><br/>
              <div className="info">Feels Like: {Math.round(model.feels - 273.15)}°C</div><br/>
              <div className="info">Temp min: {Math.round(model.min - 273.15)}°C, Temp max: {Math.round(model.max - 273.15)}°C</div><br/>
              <div className="info">Humidity: {model.humidity}</div><br/>
              <div className="info">Wind: {Math.round(model.wind_speed)}km/h</div><br/>
              <div className="info">Sunrise: {moment(parseInt(model.sunrise)).format("h:mm")}am</div><br/>
              <div className="info">Sunset: {moment(parseInt(model.sunset)).format("h:mm")}pm</div><br/>
            </div>
        </div>
    )
  }