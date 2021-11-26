import React, { useEffect } from "react";
import renderIf from './renderIf';
import Expire from './Expire';
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
import { FaCheckSquare } from '@react-icons/all-files/fa/FaCheckSquare';
import LoadingSpin from 'react-loading-spin';
import Numpad from 'react-numberpad';
import {Printer} from './printer';
import TextLoop from "react-text-loop";
let url='http://localhost:53535/api/';

let auth = {
  '1001' : '1234',
  '2002' : '2345'
};

let isCardApproved = false;

let paymentType = '';
// let paymentType = 'cash';
// let paymentType = 'card';
// let paymentType = 'cheque';

let chequeBool = false;

let change = 0;
let sumPaid = 0;
let grandSum = 0;

let paymentSuccess = false;

export class Customer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.data,
      data1:this.data1,
      total : '0',
      value: '0',
      cardValue: '',
      chequeValue: '2342-234-23443',
      pinValue: ''
    };
    this.handleCard = this.handleCard.bind(this);
    this.handlePIN = this.handlePIN.bind(this);
    this.Authenticate = this.Authenticate.bind(this);
    this.resetAll = this.resetAll.bind(this);
    this.SumUp = this.SumUp.bind(this);
  }

  refreshList(){
    Promise.all([
      fetch(url+'cart'),
      fetch(url+'payment')
    ])
    .then(([response1,response2]) => Promise.all([response1.json(),response2.json()]))
    .then(([data1,data2]) =>
        this.setState({
            data:data1,
            data1:data2
          }));
    let {data1} = this.state;
    if(data1 != undefined) 
    {
      if(data1[0]['Total'] == 0) paymentType = ''; 
      if(data1[0]['Total'] == 1) paymentType = 'cash'; 
      if(data1[0]['Total'] == 2) 
      {
        paymentType = 'cheque'; 
      }
      if(data1[0]['Total'] == 3) {
        paymentType = 'card'; 
      }
    }
  }  


componentDidMount() {
  this.refreshList();
  if(paymentType == 'cheque') chequeBool = true;
}

componentDidUpdate(){
  this.refreshList();
  if(paymentType == 'cheque') chequeBool = true;
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
  this.grandSum = Math.round((sum*1.08) * 100) / 100;
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
    isCardApproved = true;
    paymentSuccess = true;
  }
  else
  {
    alert("Rejected");
  }
}

SumUp(event)
{
  alert((event.target.innerText).slice(0,-1));
  if(sumPaid <= this.grandSum){
    sumPaid = sumPaid + parseInt((event.target.innerText).slice(0,-1), 10);
  }
  else {
    alert('Enough amount paid');
    // alert('grandsum');
    // alert(this.grandSum);
    // alert('sumPaid');
    // alert(sumPaid);
    // alert('change');
    // alert(sumPaid-this.grandSum);
    change = sumPaid - this.grandSum;
    paymentSuccess = true;
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

        {renderIf(paymentType == 'cash')(
        <Segment id='cash'>
        <p>Please enter Total Cash Paid</p>
        <Segment id='cashButtons'>
        <ButtonToolbar className="justify-content-between">
        <Button variant="info" onClick={this.SumUp}><b>1$</b></Button>
        <Button variant="info" onClick={this.SumUp}><b>2$</b></Button>
        <Button variant="info" onClick={this.SumUp}><b>5$</b></Button>
        <Button variant="info" onClick={this.SumUp}><b>10$</b></Button>
        <Button variant="info" onClick={this.SumUp}><b>20$</b></Button>
        <Button variant="info" onClick={this.SumUp}><b>50$</b></Button>
        <Button variant="info" onClick={this.SumUp}><b>100$</b></Button>
        </ButtonToolbar>
        </Segment>
        <br></br>
        <p>Amount Paid: <b>${sumPaid}</b></p>
        <p>Amount Returnable: <b>${change}</b></p>
        </Segment>
        )}

        {renderIf(paymentType == 'card')(
        <div>
        <Segment id='card'>
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

        </div>

        )}
        
        {renderIf(paymentType == 'cheque')(
        <Segment id='cheque'>
          <Expire delay={5000}>
          <div className='center-screen'>
          <LoadingSpin/>
          <br></br>
          <h3><b>Scanning the cheque</b></h3>
          </div>
          </Expire>
          <div className='center-screen' id="chequeScan" style={{display : 'none'}}>
            <FaCheckSquare size={56}/>
            <br></br>
            <h3><b>Cheque Payment Successful</b></h3>
          </div>
{paymentType=='cheque' &&

            setTimeout(() => {
            if(document.getElementById("chequeScan") == undefined) return;
            document.getElementById("chequeScan").style.display = "flex";
            paymentSuccess = true;
            }, 5400)
  
  }
        </Segment>
        )}

        {isCardApproved &&
        <Printer
        data={originalData || data}
        total={this.getSum()}
        tax={this.getTax()}
        gSum={this.getGrandSum()}
        cardNo={this.state.cardValue}
        chequeValue={this.state.chequeValue}
        >
        </Printer>
        }
      </div>
    );



  }

}


