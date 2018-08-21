import React, { Component } from 'react'
import './App.css'
//import App from './App';
//import Category from './Category';
import {browserHistory} from "react-router";

var ydim =100;
var xdim =5;
class BarChart extends Component {



   constructor(props){
      super(props);
      var rdataC = this.props.r;
      var radiusC = 20;
      var id = this.props.id;
      console.log('our friennd'+ydim)


var backgroundColor;
this.backgroundColor = "#"+(Math.random()*0xFFFFFF<<0).toString(16);

      if(id%4 === 0){
            ydim += 100;
            xdim=90; 
            console.log(id,ydim)
            }
             else{
            xdim+=90;
            }


      if (rdataC < 5 ){

   this.radiusC = 35;

}
if (rdataC > 5 && rdataC <100 ){

   this.radiusC = 40;

}

if (rdataC > 100 && rdataC <500 ){

   this.radiusC = 60;

}

   }



   whatWeClicked(id){

      id = this.props.id;
      browserHistory.push("/Category/" + id );
   }





   
render() {
         var radiusC = this.radiusC;
         var backgroundColor = this.backgroundColor;
         
      return (
      <circle id={this.props.id} onClick={this.whatWeClicked.bind(this)} cx={xdim } cy={ydim} r={radiusC }
      fill={backgroundColor} fill-opacity="0.8" />


      
      )
   }

   
}
export default BarChart