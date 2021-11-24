import React from "react";
import { Input, Segment} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import {Button,ButtonToolbar,ToggleButton,Alert,Form,Col } from 'react-bootstrap';
import {AddInvModal} from './AddInvModal';
import { getQueriesForElement } from "@testing-library/dom";
import {Navigation} from '../Navigation/Navigation';
import { render } from 'react-dom';
import Numberpad from 'react-numpad';
import { FaCheck } from '@react-icons/all-files/fa/FaCheck';
import { FaTimes } from '@react-icons/all-files/fa/FaTimes';
import Numpad from 'react-numberpad';
import {Printer} from './printer';
import TextLoop from "react-text-loop";
let url='http://localhost:53535/api/';

let auth = {
  '1001' : '1234',
  '2002' : '2345'
};

let isApproved = false;

export class Customer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.data,
      total : '0',
      value: '0',
      cardValue: '',
      pinValue: ''
    };
    this.handleCard = this.handleCard.bind(this);
    this.handlePIN = this.handlePIN.bind(this);
    this.Authenticate = this.Authenticate.bind(this);
    this.resetAll = this.resetAll.bind(this);
  }

  refreshList(){
    fetch(url+'cart')
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

handleCard(event) {
  console.log(document.activeElement)
  this.setState({cardValue: event});
}

handlePIN(event) {
  console.log(document.activeElement)
  this.setState({pinValue: event});
}



getSum()
{
  let {data} = this.state;
  if(data === undefined) return;
  let sum = 0;
  for(let i=0;i<data.length;i++)
  {
    sum += data[i]["ProductPrice"] * data[i]["ProductQuantity"];
  }
  return sum;
}

getTax()
{
  let {data} = this.state;
  if(data === undefined) return;
  let sum = 0;
  for(let i=0;i<data.length;i++)
  {
    sum += data[i]["ProductPrice"] * data[i]["ProductQuantity"];
  }
  return Math.round((sum*1.08-sum) * 100) / 100;
}

getGrandSum()
{
  let {data} = this.state;
  if(data === undefined) return;
  let sum = 0;
  for(let i=0;i<data.length;i++)
  {
    sum += data[i]["ProductPrice"] * data[i]["ProductQuantity"];
  }
  return Math.round((sum*1.08) * 100) / 100;
}


resetAll()
{
  this.handleCard(0);
  this.handlePIN(0);
}

getName()
{
  let {data} = this.state;
  if(data == undefined) return "Good Morning !";
  let last = data.length - 1;
  if(data[last] === undefined) return "Good Morning !";
  return "Last Scanned Item :" + data[last]["ProductName"];
}

getPrice()
{
  let {data} = this.state;
  if(data == undefined) return "Good Morning !";
  let last = data.length - 1;
  if(data[last] === undefined) return "Good Morning !";
  return "Last Scanned Item Price:" + data[last]["ProductPrice"];
}

Authenticate()
{
  let {pinValue,cardValue} = this.state;
  if(auth[cardValue] && auth[cardValue] == pinValue)
  {
    alert("Approved");
    isApproved = true;
    this.resetAll();
  }
  else
  {
    alert("Rejected");
  }
}

  render() {
    let {originalData , data}=this.state;
        
    return (
      <div> 
        <Navigation Cashier={false}/>   
        <Alert align="center" variant="dark">  

          <h2>
                <TextLoop>
                    <span>{this.getName()}</span>
                    <span>{this.getPrice()}</span>
                </TextLoop>
          </h2>


          </Alert>
        <Segment >
              <div className="d-flex justify-content-between">
              <h2>Total: </h2>
              <h2>${this.getSum()}</h2>
              </div>
        </Segment>

        <Segment >
              <div className="d-flex justify-content-between">
              <h2>Tax : </h2>
              <h2>${this.getTax()}</h2>
              </div>
        </Segment>

        <Segment inverted>
              <div className="d-flex justify-content-between">
              <h2>Grand Total: </h2>
              <h2>${this.getGrandSum()}</h2>
              </div>
        </Segment>

        <Segment>
        <Numberpad.Number
        onChange={this.handleCard}
        label={'Card Number'}
        placeholder={'Enter Card Number'}
        value={this.state.cardValue || ""}
        decimal={2}
        >
        <br></br>
        <input type='text'></input>
        </Numberpad.Number>
        <br></br>
        <br></br>
        <Numberpad.Number
        onChange={this.handlePIN}
        label={'PIN'}
        placeholder={'Enter PIN'}
        value={this.state.pinValue || ""}
        decimal={2}
        >
        <br></br>
        <input type='text'></input>
        </Numberpad.Number>
        </Segment>

        <ButtonToolbar className="justify-content-between">
        <Button variant="success" onClick={this.Authenticate}>Submit <FaCheck/></Button>
        <Button variant="danger" onClick={this.resetAll}>Cancel <FaTimes/></Button>
        </ButtonToolbar>


        {isApproved &&
        <Printer
        data={originalData || data}
        total={this.getSum()}
        >
        </Printer>
        }
      </div>
    );



  }

}


