import React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import {Alert} from 'react-bootstrap';
let url='http://localhost:53535/api/';

let itemsName = {
  '001' : "PS5",
  '002' : "XBOX Series X",
  '003' : "RTX 3080",
  '004' : "Mangoes",
  '0009800895250' : "Nutella",
  '0070662404041' : "Noodles"
};

let itemsPrice = {
  '001' : "400",
  '002' : "500",
  '003' : "700",
  '004' : "10",
  '0009800895250' : "5",
  '0070662404041' : "10"
};

let numberShorten = {
  '001' : '001',
  '002' : '002',
  '003' : '003',
  '004' : '004',
  '0009800895250' : '5250',
  '0070662404041' : '4041'
};

export class Scanner extends React.Component {

  constructor(props){
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
}

  handleSubmit(event, Quantity){
    if(itemsName[event] === undefined) 
    {
        alert("Product Number Does not exist"); 
        return;
    }
    fetch(url+'cart',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            ProductName:itemsName[event],
            ProductNumber:numberShorten[event],
            ProductPrice:itemsPrice[event],
            ProductQuantity:Quantity
        })
    })
    .then(res=>res.json())
    .then((result)=>{
        console.log(result);
    },
    (error)=>{
        alert('Failed');
    })
}

render(){
  let data = 0;
  return (

      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result) => {
          if (result) 
          {
            data = result.text;
            this.handleSubmit(data,1);
          }
        }}
        delay={2000}
      />
  );
}
}