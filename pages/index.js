import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import styles from '../styles/Home.module.css'
import axios from 'axios';

export default function Home() {

    const[data, setData]=useState({});
    const[location,setLocation]=useState('');
    const[weather,setWeather]=useState();
    const [erroMessage, setErrorMessage]= useState("");

    var apiKey= "c416c519817cef6de85357d8101080bc";
    var lang ="fr";
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
          setErrorMessage("")
        }).catch(err =>{
          console.log(err)
          setErrorMessage("Niceu try fam")
          setData({})
          setWeather()
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

      <main className={styles.main}>
        {erroMessage}
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          placeholder="enter location"
          onKeyDown={searchLocation}
          type="text"
        />
        {data.name}
        {
          weather && weather.map((w,index)=>{
            return(
              <div key={index}>
                  <div>{w.description}</div>
                  <div>{w.main}</div>
              </div>
            )
          })
        }

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
