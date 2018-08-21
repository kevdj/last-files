import React, { Component } from 'react'
import './App.css'

var ydim =100;
var xdim =5;
class BarChart2 extends Component {


   constructor(props){

      super(props);
      
       var id = this.props.id;

         if(id%4 === 0){
            ydim += 100;
            xdim=90; 
            console.log(id,ydim)
            }
             else{
            xdim+=90;
            }
      
       var rdataC = this.props.r;
      var radiusC = 20;

      var data = this.props.data;

      console.log('data here'+ data);

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
      
      <text x={xdim } y={ydim} fill="white" width={radiusC*2} 
      scaletofit="true" textAnchor="middle" font-size={radiusC}>
      {this.props.t}
      <tspan x={xdim} y={ydim +12}>{this.props.r}</tspan>
      <tspan x={xdim} y={ydim +2}>_______</tspan>
      </text>
      )
   }

   
}
export default BarChart2