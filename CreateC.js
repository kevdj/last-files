import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {Link} from "react-router";
import {browserHistory} from "react-router";
import {Router, Route, IndexRoute, hashHistory} from "react-router";
import {Jumbotron, Grid, Row, Col, Button} from 'react-bootstrap'

 var shops = [];

export class CreateC extends Component {

 
  constructor(props){

    super(props);  
    //var shops;
    this.state = {
      title: 'Add Category',
      shops: [],
      categories: []
      
    }

    
  }
  // used to make AJAX CALLS
  componentDidMount(){  

    console.log('Component has mounted');
    var that = this;
    fetch('http://localhost:3000/api/shop')
      .then (function(response){
        response.json()
          .then(function(data){ 
            that.setState({
              shops: data
            })
            console.log(data); 
          })

        })

  }


  addShop(id){
    var that = id;
    shops.push(that);
    console.log(that);
    
  

  }

  addCategory(event){
      event.preventDefault();
      var that = this;

      let cat_data = {
          category_name: this.refs.categ_name.value,
          shopsid: shops
      };


      var request = new Request('http://localhost:3000/api/category',{
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json'}),
      body: JSON.stringify(cat_data)
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




      console.log(cat_data);

     // browserHistory.push("/Catlist");
  }



    
  
  render() {

    let title = this.state.title;
    let shops = this.state.shops;
  
    return (

      
      <div className="App">

        <h1>{title}</h1>

        
            <div>
            <input type = "text" ref="categ_name" class="form-control" placeholder="Category Name" />
            </div>
            <table>
            <ul>
            {shops.map(shop => <li class="list-group-item active" 
              id={shop.shopid}key={shop.shopid}><tr><td col width="130">{shop.shop_name}</td>
              <td col width="80"><button className="btn btn-primary" 
              onClick={() => this.addShop(shop.shopid)}>ADD</button></td>

            </tr></li>)}
            </ul> 
            </table> 
            <div>
            <button className="btn btn-danger" onClick={this.addCategory.bind(this)}>Submit</button>
            </div>
            
        

        

        
      </div>

   
   
    );
  }
}

