import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

export default class Clock extends React.Component {
	state = {
		date: moment()
	}


	componentDidMount() {
        setInterval(() => {
            this.setState({
                date: moment()
            })
        }, 1000)
	}
      
    render() {
    	return (
            <section className="time">
              <div>
                    <p className='clock'> {this.state.date.format('H:mm')}</p>
                    <p className='date'>{this.state.date.format('DD-MM-YYYY')}</p>
              </div>
            </section>
    	)
   	}
}