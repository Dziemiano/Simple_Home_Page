import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import ReactWeather from 'react-open-weather';
import 'react-open-weather/lib/css/ReactWeather.css';
import '../css/main.scss';
import GetNews from './components/getnews.jsx';
import ToDoList from './components/todolist.jsx';
import Twitter from './components/twitter.jsx';
import GetCurrentWeather from './components/weather.jsx';
import Clock from './components/clock.jsx';

class App extends React.Component {
    

    render() {
        return (
            <div className="container-fluid">
              <div className="row">
                <div className="col-3">
                    <Twitter />
                </div>
                <div className="col-6">                  
                    <GetCurrentWeather />
                    <div className="main">
                        <Clock />
                        <ToDoList />
                    </div>
                </div>
                <div className="col-3">
                    <GetNews />
                </div>

              </div>
            </div>
        );
    }
}


document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
	   <App />,
       document.querySelector('#app')
    )
})

