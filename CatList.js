import React, { Component } from 'react';
import {Jumbotron, Grid, Row, Col, Button} from 'react-bootstrap'
//import logo from './logo.svg';
import './App.css';
import BarChart from './BarChart';
import BarChart2 from './BarChart2';
import {Link} from "react-router";
import {browserHistory} from "react-router";
import {Router, Route, IndexRoute, hashHistory} from "react-router";

export class CatList extends Component {
  constructor(){

    super();  
    this.state = {
      title: 'Categories',
      categories: []
    }
  }
  // used to make AJAX CALLS
  componentDidMount(){  
    var that =this;
      // load categories 
      fetch('http://localhost:3000/api/categories')
      .then (function(response){
          response.json()
          .then(function(data){ 
            that.setState({
              categories: data
            })
            console.log(data); 
          })

        })
  }

  
  navtoCreate(){
    browserHistory.push("/CreateC");
  }

  render() {

    let title = this.state.title;
    let categories = this.state.categories;
    let data  = this.data;
    return (

      
      <div className="App" width ="100%" height ="100%">

        <h1>{title}</h1>

        <button onClick={this.navtoCreate} className="btn btn-danger">Create</button>

      

      <div class="ch1">
      <svg class="ch" width ="100%" height ="100%">
      {categories.map(categories => 
        <BarChart key={categories.id} r={categories.amt_spent} 
        id ={categories.categoryid} t={categories.category_name} data={data}/>)}
      {categories.map(categories => 
        <BarChart2 key={categories.id} r={categories.amt_spent} 
        id ={categories.categoryid} t={categories.category_name}/>)}  
      </svg>
      </div>  
      

      </div>

   
   
    );
  }
}