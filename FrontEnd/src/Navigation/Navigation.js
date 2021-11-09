import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav,Button} from 'react-bootstrap';

let url='http://localhost:53535/api/';


export class Navigation extends Component{

    constructor(props) {
        super(props);
      }

    render(){
        return(
            <Navbar bg="dark" expand="lg" variant="dark" sticky="top">
                
            <Navbar.Brand href="/">
                 <img
                 alt=""
                 src="assets/supermarket.jpg"
                width="120"
                height="100"
             />
            </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                <NavLink className="d-inline p-2 bg-dark text-white" to="/">
                    {this.props.Cashier && 
                    <h1>CASHIER INTERFACE</h1>}
                    {!this.props.Cashier && 
                    <h1>CUSTOMER INTERFACE</h1>}
                </NavLink>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}