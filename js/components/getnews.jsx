import React from 'react';
import ReactDOM from 'react-dom';
import config from '../../config.js';

export default class GetNews extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			news: [],
            country: 'pl',
            showHide: 'hidden'
		}
	}
    componentDidMount() {

        const apiKey = config.NEWS_KEY

    	return fetch('https://newsapi.org/v2/top-headlines?' +
          'country='+this.state.country+'&' +
          'apiKey=' + apiKey
        )
        .then((response) => response.json())
        .then((responseJson) => {
        	this.setState({
        		news: responseJson.articles
        	})    
        })
        .catch((error) => {
          console.error(error);
        });
    }

    handleClick = () => {
        var className = this.state.showHide === 'hidden' ? 'show' : 'hidden';
        this.setState({showHide: className})
    }

    render() {
        if(this.state.news.length > 0) {
            return (
                <div className="news">
                    <button className="showNews" onClick={this.handleClick}>News</button>
                    <div>
                        <ul className={this.state.showHide}>
                            {
                                this.state.news.map((e,i) => {
                                    return <li key={i}>
                                        <a target='_blank' href={e.url}>
                                            <p>{e.title}</p>
                                        </a>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            )            
        } else {
            return <p> Loading... </p>
        }

    }
}
