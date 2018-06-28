import React from 'react';
import ReactDOM from 'react-dom';
import TwitterLogin from 'react-twitter-auth'

export default class Twitter extends React.Component {
    render() {
        return (
        	<div>
         		<a target='_blank' className="twitter-share-button"
 					href="https://twitter.com/intent/tweet">
					Tweet
				</a>
			</div>
        )
    }
}