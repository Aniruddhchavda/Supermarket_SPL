import React from "react";
import { Input, Segment} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import {Button,ButtonToolbar,ToggleButton,Alert } from 'react-bootstrap';
import {AddInvModal} from './AddInvModal';
import { getQueriesForElement } from "@testing-library/dom";
import {Navigation} from '../Navigation/Navigation';
let url='http://localhost:53535/api/';


export class Customer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.originalData
    };
  }

  refreshList(){
    fetch(url+'customer')
    .then(response=>response.json())
    .then(data1=>{
        this.setState({
            data:data1});
    });
}

  
  componentDidMount() {
    this.refreshList();
  }

  componentDidUpdate(){
    this.refreshList();
}

getTotal()
{
  let {data} = this.state;
  if(data === undefined) return;
  return data[0]["Total"];
}

  render() {
    let {data}=this.state;
        
    return (
      <div> 
        <Navigation Cashier={false}/>
        <h1>Pay or Die</h1>
        <h1>${this.getTotal()}</h1>
      </div>
    );



  }

}


