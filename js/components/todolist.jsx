import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import uuid from 'uuid';

export default class ToDoList extends Component {
	constructor(props) {
		super(props)
		this.state = {
            list: []
        }
	}


    handleSubmit = (e) =>{
        e.preventDefault();
        
        this.setState({
           list: [
               ...this.state.list, 
               {
                   id: uuid(),
                   text: this.input.value
                }
           ]
        })
        this.input.value = '';
    } 

    handleClick(elem) {
        this.setState({
            list: this.state.list.filter(e =>  elem.id != e.id)
        })
    }

    render() {
        let list = this.state.list.map((e) => {
            return <li key={e.id}><input type='checkbox' /><label>{e.text}</label><button className='removeToDo' onClick={()=>this.handleClick(e)}>x</button></li>
        })
    	return (
            <section className="todo">
                <div className="list">
                    <ul>{list}</ul>
                </div>


                <form onSubmit={this.handleSubmit}>
                    <p className="formQuestion">What you have to do today?</p>
                    <input type="text" ref={input => this.input = input}/>
                </form>        
            </section>
    	)
   	}
}