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

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position, $) => { 
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            this.setState ({
                long: long.toFixed(4),
                lat: lat.toFixed(4)
            })

            console.log(this.state.lat)
            console.log(this.state.long)

            const apiLink = 'https://api.openweathermap.org/data/2.5';
            const apiKey = config.WEATHER_KEY;

            const firstPromise = 
                fetch(`${apiLink}/weather?lat=${lat}&lon=${long}&APPID=${apiKey}`)
                    .then((response) => response.json())

            const secondPromise = 
                fetch(`${apiLink}/forecast?lat=${lat}&lon=${long}&APPID=${apiKey}`)
                    .then((response) => response.json())


            Promise.all([firstPromise, secondPromise])
                .then(([data1, data2]) => {
            
                    const cur = data1.main.temp;
                    const forecast = data2.list[9].main.temp;

                    this.setState({
                        current: cur-273.15,
                        name: data1.name,
                        day: data2.list[9].dt_txt,
                    })
                })
                .catch(error => {
                    console.error(error);
                })



        })
    }

    handleClick = () => {
        var className = this.state.toggle === 'hidden' ? 'show' : 'hidden';
        this.setState({toggle: className})
    }
    
    render() {
        const forecastKey = config.FORECAST_KEY
        return (
            <section className="weather">
                <div>
                    <p onClick={this.handleClick}>{this.state.name} {this.state.current}°C</p>
                    <div  className={this.state.toggle + ' forecast'}>  
                        <ReactWeather
                        forecast="5days"
                        apikey= {forecastKey}
                        type="geo"
                        lat="54.3813"
                        lon="18.5908"/>
                    </div>
                </div>  
            </section>
        )
       }
}