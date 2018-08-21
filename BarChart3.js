import React, { Component } from 'react'
import './App.css'
export class BarChart3 extends Component {


   constructor(props){
      super(props);
       var rdataC = this.props.r;
      var radiusC = 20;

      if (rdataC < 50 ){

   this.radiusC = 10;

}
if (rdataC > 50 && rdataC <100 ){

   this.radiusC = 15;

}

if (rdataC > 100 && rdataC <500 ){

   this.radiusC = 25;

}
   }

      



   
render() {

   var radiusC = this.radiusC;
      return (
      
      <text x={50} y={100} fill="white" width={10} scaletofit="true" textAnchor="middle" font-size={15}>{this.props.n}<tspan x={50} y={115}>{this.props.r}</tspan>
      <tspan x={50} y={101}>_______</tspan></text>
   
      )
   }

   
}
