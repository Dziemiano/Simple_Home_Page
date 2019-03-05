import React from 'react';
import ReactDOM from 'react-dom';
import ReactWeather from 'react-open-weather';
import 'react-open-weather/lib/css/ReactWeather.css';
import config from '../../config.js';

export default class GetCurrentWeather extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current: "",
            name:"",
            day: "",
            toggle: "hidden",
            long: "",
            lat:"",
        }
    }

    getWeather = () => {
      const apiLink = 'https://api.openweathermap.org/data/2.5';
      const apiKey = config.WEATHER_KEY;

      const firstPromise = 
            fetch(`${apiLink}/weather?lat=${this.state.lat}&lon=${this.state.long}&APPID=${apiKey}`)
      .then((response) => response.json())

      const secondPromise = 
            fetch(`${apiLink}/forecast?lat=${this.state.lat}&lon=${this.state.long}&APPID=${apiKey}`)
      .then((response) => response.json())


      Promise.all([firstPromise, secondPromise])
        .then(([data1, data2]) => {
            this.setState({
                current: parseInt(data1.main.temp-273.15)+"°C",
                name: data1.name,
            })
        })
        .catch(error => {
        console.error(error);
      })
    }

    componentWillMount() {
      navigator.geolocation.getCurrentPosition((position, $) => { 
        this.setState ({
          long: position.coords.longitude.toFixed(4),
          lat: position.coords.latitude.toFixed(4)
        })
        this.getWeather()
      })
    }

    handleClick = () => {
        var className = this.state.toggle === 'hidden' ? 'show' : 'hidden';
        this.setState({toggle: className})
    }
    
    render() {
        const forecastKey = config.FORECAST_KEY
        console.log(this.state.lat)
        let lat = this.state.lat
        let long = this.state.long
        return (
            <section className="weather">
                    <p onClick={this.handleClick}>{this.state.name} {this.state.current}</p>
                    <div  className={this.state.toggle + ' forecast'}>  
                        <ReactWeather
                        forecast="5days"
                        apikey= {forecastKey}
                        type="auto"/>
                    </div>
            </section>
        )
       }
}