import React, { Component } from 'react';
import {Jumbotron, Grid, Row, Col, Button} from 'react-bootstrap'
//import logo from './logo.svg';
import './App.css';
import BarChart from './BarChart';
import{BarChart3} from './BarChart3';
import {Link} from "react-router";
import {browserHistory} from "react-router";
import {Router, Route, IndexRoute, hashHistory} from "react-router";

export class Category  extends Component{
  constructor(props){

    super();  
    this.state = {
      title: 'Category',
      transactions: [],
      categories: [],
      limits: []
    }
  }
  // used to make AJAX CALLS
  componentDidMount(){  

    console.log('Component has mounted');
    var that = this;
    var id = this.props.params.id;
    fetch('http://localhost:3000/api/transactionsC/' + id)
      .then (function(response){
          response.json()
          .then(function(data){ 
            that.setState({
              transactions: data
            })
            console.log(data); 
          })

        })

      // load categories 
      fetch('http://localhost:3000/api/categoriesC/'+ id)
      .then (function(response){
          response.json()
          .then(function(data){ 
            that.setState({
              categories: data
            })
            console.log(data); 
          })

        })

      //load limits

      fetch('http://localhost:3000/api/limits/'+ id)
      .then (function(response){
          response.json()
          .then(function(data){ 
            that.setState({
              limits: data
            })
            console.log(data); 
          })

        })

  }

  setLimits(id){

    var id = this.props.params.id;

    browserHistory.push("/SetLimits/" + id);
  }

  deleteCat(id){
    var id = this.props.params.id;

    var request = new Request('http://localhost:3000/api/delete/'+ id,{
      method: 'DELETE',
      headers: new Headers({ 'Content-Type': 'application/json'})
    });

    console.log('deletedddd');
    fetch(request)
      .then (function(response){
          response.json()
          .then(function(data){ 
            console.log(data); 
          })

        })

   // browserHistory.push("/");
  }

  render() {

    let title = this.state.title;
    let transactions = this.state.transactions;
    let categories = this.state.categories;
    let limits = this.state.limits;
    return (
      <div >

        <h1>{title}</h1>

        <h1>Limits</h1>

         <table>
        <ul> 
            {limits.map(limits => 
              <li class="list-group-item active" 
              key={limits.limitid}>
              <tr><td col width="130">{limits.limit_days} day(s)</td> <td col width="80">{limits.limit_amt}</td></tr></li>)}
        </ul>  
        </table> 
        <button onClick={this.setLimits.bind(this)} className="btn btn-primary">Set limits</button>
        <button onClick={this.deleteCat.bind(this)} className="btn btn-danger">Delete Category</button>




        <svg width ="100%" height ="100%">
               <circle  cx="50" cy="100" r="35"
      fill="#044B94" fill-opacity="0.4" />
      {categories.map(categories => <BarChart3 key={categories.id} r={categories.amt_spent} id ={categories.categoryid} n={categories.category_name}/>)}  
      
          </svg>

        <table>
        <ul> 
            {transactions.map(transactions => 
              <li class="list-group-item active" 
              key={transactions.id}>
              <tr><td col width="130">{transactions.trans_name}</td> <td col width="80">{transactions.price}</td></tr></li>)}
        </ul>  
        </table> 

        

          

      </div>
       );
  }
}
