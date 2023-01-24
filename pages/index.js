import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import styles from '../styles/Home.module.css'
import axios from 'axios';

import Lottie from "lottie-react";
// import shiba1 from "./shiba1.json";

import ShibaAn from '../comps/lottie';


export default function Home() {
  // const App = () => <Lottie animationData={shiba1} loop={true} />;


    const[data, setData]=useState({});
    const[location,setLocation]=useState('');
    const[weather,setWeather]=useState();
    const [erroMessage, setErrorMessage]= useState("");
    const [main, setMain] = useState();
    const [wind, setWind] = useState();

    var apiKey= "c416c519817cef6de85357d8101080bc";
    var lang ="en";
    var units ="metric";
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}&lang=${lang}`;

    const searchLocation =(event)=> {
      if(event.key === "Enter"){
        axios.get(url)
        .then((response)=>{
          console.clear();
          setData(response.data)
          console.log(response.data)
          setWeather(response.data.weather)
          setMain(response.data.main)
          setWind(response.data.wind)
          setErrorMessage("")
        }).catch(err =>{
          console.log(err)
          setErrorMessage("Oops! Please enter a city")
          setData({})
          setWeather()
          setMain()
          setWind()
        })
        setLocation('');
      }
    }
  return (
    <div className={styles.container}>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="weather app by angelyne" />
        <link rel="icon" href="/monkey banana 56.png" />
      </Head>

      <header className={styles.header}>
        <Image src="/monkey banana 56.png" alt="monkey" width={56} height={56}  />
        Weather App
      </header>

      <main className={styles.main}>
        {erroMessage}
        <input className='sInput'
          value={location}
          onChange={event => setLocation(event.target.value)}
          placeholder="enter a city..."
          onKeyDown={searchLocation}
          type="text"
        />
        
        {main && <div className='wCont'>
          <h2>
            {data.name}
          </h2>
          {
            weather && weather.map((w,index)=>{
              return(
                <div key={index}>
                    <div><h3>{w.main}</h3></div>
                    <div><p>{w.description}</p></div>
                    
                </div>
              )
            })
          }
          
          {
            main && <div>
              <h3>temp</h3>
              <div>
                <p> <span className='info'>{main.temp}</span> °C</p>
              </div>
              <h3>feels like</h3>
              <div>
                <p> <span className='info'>{main.feels_like}</span> °C</p>
              </div>
            </div>
          }

          {
            wind && <div>
              <h3>wind speed</h3>
              <div>
                <p><span className='info'>{wind.gust ? wind.gust:wind.speed}</span> m/s</p>
              </div>
            </div>
          }
          
{/* 
          {
            (()=>{
              if(data.weather){
                return <Lottie
                  style={{width:200}}
                />
              }
            })
          } */}

        </div>}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/atran02/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* © */}
          Angelyne Tran {' '}
          <span className={styles.logo}>
            <Image src="/monkey banana 56.png" alt="Angelyne's monkey Logo" width={28} height={28} />
          </span>
        </a>
      </footer>

    </div>
  )
}
