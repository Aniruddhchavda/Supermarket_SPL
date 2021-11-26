import React from "react";
import { Input, Segment} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import {Button,ButtonToolbar,ToggleButton,Alert,Form,Col } from 'react-bootstrap';
import {AddInvModal} from './AddInvModal';
import { getQueriesForElement } from "@testing-library/dom";
import {Customer} from './Customer';
import {Navigation} from '../Navigation/Navigation';
import {Scanner} from './Scanner';
import {Total} from './Total'


let url='http://localhost:53535/api/';

export class Inventory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.originalData,
      columns: [],
      searchInput: "",
      invs:[], 
      addModalShow:false,
      totalModalShow:false,
      checkboxChecked: false,
      total:0
    };
    this.handleSubmit=this.handleSubmit.bind(this);
    this.deleteAll=this.deleteAll.bind(this);
    this.resetTotal=this.resetTotal.bind(this);
    this.newOrder=this.newOrder.bind(this);
  }


  handleSubmit(){

    fetch(url+'customer',{
        method:'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
          CustomerID : '1',
          Total: this.getSum(),
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


  getPrice(a,b)
  {
    return a*b;
  }



    refreshList(){
        fetch(url+'cart')
        .then(response=>response.json())
        .then(data1=>{
            this.setState({
                originalData:data1});
        });
    }


  componentDidMount() {
    this.refreshList();


    let columns = [
      {
             Header: () => (
              <div
               style={{
               textAlign:"left"
               }}
            >Product</div>),
            accessor: "CartID",
            show: false,
            displayValue: "CartID"
      },
      {
        Header: () => (
          <div
           style={{
           textAlign:"left"
           }}
        >Product ID</div>),
        accessor: "ProductNumber",
        show: true,
        displayValue: "ProductNumber"
      },
      {
        Header: () => (
          <div
           style={{
           textAlign:"left"
           }}
        >Product Name</div>),
        accessor: "ProductName",
        show: true,
        displayValue: "ProductName"
      },
      {
        Header: () => (
          <div
           style={{
           textAlign:"left"
           }}
        >Price</div>),
        accessor: "ProductPrice",
        show: true,
        displayValue: "ProductPrice"
      },
      {
        Header: () => (
          <div
           style={{
           textAlign:"left"
           }}
        >Quantity</div>),
        Footer : () => (
          <div>
          <Alert key="1" variant="success">
                        Grand Total
          </Alert>
        </div>
        ),
        accessor: "ProductQuantity",
        show: true,
        displayValue: "ProductQuantity"
      },
      {
        Header: "Total Price",
        Footer : () => (
          <div>
          <Alert key="1" variant="success">
                        {this.getSum()}
          </Alert>
        </div>
        ),
        id: 'totalprice',
        Cell: ({ row }) => {
          return (
        <div>
          <Alert key="1" variant="success">
                          ${row.ProductQuantity*row.ProductPrice}
          </Alert>
        </div>
          );
        },
      },
      {
        Header: "Actions",
        id: 'actions',
        Cell: ({ row }) => {
          return (
        <div>
        <Button className="mr-2" variant="outline-danger"
    onClick={()=>this.deleteInv(row.CartID)}>
            Delete
        </Button>
        </div>
          );
        },
      }
    ];
    this.setState({ columns });
  }

  componentDidUpdate(){
    this.refreshList();
}


getSum()
{
  let {originalData,total} = this.state;
  if(originalData === undefined) return;
  let sum = 0;
  for(let i=0;i<originalData.length;i++)
  {
    sum += originalData[i]["ProductPrice"] * originalData[i]["ProductQuantity"];
  }
  return sum*1.08;
}

deleteInv(CartID)
{
        fetch(url+'cart/'+CartID,{
            method:'DELETE',
            header:{'Accept':'application/json',
        'Content-Type':'application/json'}
        })
}

  handleChange = event => {
    this.setState({ searchInput: event.target.value }, () => {
      this.globalSearch();
    });
  };

  globalSearch = () => {
    let { searchInput,originalData } = this.state;
    let filteredData = originalData.filter(value => {
      return (
        value.ProductNumber.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
        value.ProductName
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      );
    });
    this.setState({ data: filteredData });
  };


  deleteAll()
{
        fetch(url+'customer/',{
            method:'DELETE',
            header:{'Accept':'application/json',
        'Content-Type':'application/json'}
        })
}

resetTotal(){
  fetch(url+'customer',{
      method:'PUT',
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
      },
      body:JSON.stringify({
        CustomerID : 1,
        Total: 0,
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

newOrder()
{
  this.deleteAll();
  this.resetTotal();
}

  render() {
    let {originalData, data, columns, searchInput}=this.state;
    
    let addModalClose=()=>this.setState({addModalShow:false});
    let totalModalClose=()=>this.setState({totalModalShow:false});

    return (
      <div> 
        <Navigation Cashier={true}/>

         <Segment inverted>
          <div className="d-flex justify-content-between">
              <ButtonToolbar>
                <Button variant='outline-light' size='md'
                 onClick={()=>this.setState({addModalShow:true})}>
                 Add Manually</Button>

                 <AddInvModal show={this.state.addModalShow}
                onHide={addModalClose}/>

            </ButtonToolbar>
      <ButtonToolbar>
        <Button variant='outline-light' size='md' onClick={()=>this.setState({totalModalShow:true})}>Total</Button>
        <Total show={this.state.totalModalShow} onHide={totalModalClose}/>
      </ButtonToolbar>
      
      <Button variant='outline-light' size='md' onClick={this.newOrder}>Order Complete</Button>

            <Input
                inverted placeholder='Search...'
                 name="searchInput"
                 value={searchInput || ""}
                 onChange={this.handleChange}
                 size='small'
             />

          </div>
             </Segment>

        <ReactTable
          data={data || originalData}
          columns={columns}
          defaultPageSize={10}
          style={{
            borderColor: '#a5a4a4',
            borderRadius: '5px',
            borderStyle: 'outset',
          }}
          defaultSorted={[
            {
              id: "ProductNumber",
              desc: false
            }
          ]}
          showPagination={false}
        />

      <Scanner></Scanner>

      </div>

      
    );



  }

}


