import React, { Component } from 'react';
import {Jumbotron, Grid, Row, Col, Button} from 'react-bootstrap'
//import logo from './logo.svg';
import './App.css';
//import BarChart from './BarChart';
//import BarChart2 from './BarChart2';
import {Link} from "react-router";
import {browserHistory} from "react-router";
import {Router, Route, IndexRoute, hashHistory} from "react-router";

export class SetLimits extends Component{

constructor(){
		super(); 


 		}

componentDidMount(){  

    console.log('Component has mounted');
    var that = this;
    var id = this.props.params.id;
    }


addLimit(event){
    event.preventDefault();
    var that = this;
    var id = this.props.params.id;

    let trans_data = {
      amount: this.refs.amount.value,
      duration: this.refs.duration.value,
      alert: this.refs.alert.value,
     
    };

    var request = new Request('http://localhost:3000/api/new-limit/' + id,{
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json'}),
      body: JSON.stringify(trans_data)
    });
    	fetch(request)
      .then(function(response){
        response.json()
          .then(function(cat_data){
            
            console.log(cat_data)
          })
      })
      .catch(function(err){
        console.log(err)
      })


	}

	render(){



			return(

		<div className="App">

        <h1>"Set Limits"</h1>

		<form ref="ourForm">
            <input type = "text" ref="amount" placeholder="Amount" />
            <input type = "text" ref="duration" placeholder="Duration" />
            <input type = "text" ref="alert" placeholder="Alert Amount" />
       
            <button onClick={this.addLimit.bind(this)}>Submit</button>
        </form>
        </div>
				);

	}


}

export default SetLimits;