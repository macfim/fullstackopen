import React, {useEffect, useState} from 'react';
import axios from "axios";

const baseurl = 'https://api.openweathermap.org'

const Country = ({country}) => {

  const [weatherData, setWeatherData] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [iconIsLoading, setIconIsLoading] = useState(true);
  const [icon, setIcon] = useState('');

  const api_key = '';
  const path = '/data/2.5/weather';
  const queryParams = `?q=${country.capital[0]}&appid=${api_key}`;
  const toFetch = baseurl + path + queryParams;

  useEffect(() => {
    axios
      .get(toFetch)
      .then(response => {
        setWeatherData(response.data)
        setIsLoading(false)
        return response.data;
      })
      .then(response => {

        const path = '/img/w/';
        const queryParams = `${response.weather[0].icon}.png`;
        const iconUrl = baseurl + path + queryParams;

        setIcon(iconUrl)
        setIconIsLoading(false)
      })
  }, [])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]} </p>
      <p>area {country.region}</p>
      <h3>languages</h3>
      <ul>
        {
          Object.keys(country.languages).map((key, index) => {
            return (
              <li>{country.languages[key]}</li>
            )
          })
        }
      </ul>
      <img width='150px' src={country.flags.svg} alt="flag"/>
      <div>
        {isLoading
          ? 'loading...'
          :
          <>
            <h3>Weather of {country.name.common}</h3>
            <p>temperature {(weatherData.main.temp - 273.15).toFixed(2)} Celcius</p>
            {iconIsLoading
              ? 'loading...'
              : <img src={icon} alt='weather'/>
            }
            <p>wind {weatherData.wind.speed} m/s</p>
          </>
        }
      </div>
    </div>
  )
}

const Countries = ({data}) => {

  const [isShow, setIsShow] = useState(false);
  const [itemToShow, setItemToShow] = useState('');

  const show = item => {
    setIsShow(true)
    setItemToShow(item)
  }

  if (data.length === 1) {
    return <Country country={data[0]}/>
  }

  if (isShow) {
    return <Country country={itemToShow}/>
  }

  if (data.length <= 10) {
    return (
      <div>
        {
          data.map(item => (
            <li>
              {item.name.common}
              <button onClick={() => show(item)}>show</button>
            </li>
          ))
        }
      </div>
    )
  }

  return (
    <div>
      <p>Too many matches, specify another filter</p>
    </div>
  )

};

export default Countries;