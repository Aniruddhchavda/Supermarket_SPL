import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form, Alert} from 'react-bootstrap';
import logo1 from '../img/tillopen.png';
import logo2 from '../img/tillclose.png';
let url='http://localhost:53535/api/';

let image = logo1;

export class Total extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }



    changeImage()
    {
        if(image == logo1) 
        {
            image = logo2;
        }
        else{
            image = logo1;
        }
    }

    handleSubmit(event){
    let pt = 0;
    if(event.target.innerText == 'Close') 
    {
        pt = 0;
        this.plsHelp();
        this.props.onHide();
    }
    if(event.target.innerText == 'Cash') pt = 1;
    if(event.target.innerText == 'Check') pt = 2;
    if(event.target.innerText == 'Credit/Debit') pt = 3;
        event.preventDefault();
        
        fetch(url+'payment',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Total:pt,
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

    plsHelp()
    {
        fetch(url+'success',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
              CustomerID : '3',
              Total: '0',
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
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Payment Type
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>


                        <Button name="Cash" variant="primary" onClick={this.handleSubmit}>
                            Cash
                        </Button>
 
                        <Button name="Check" variant="primary" onClick={this.handleSubmit}>
                            Check
                        </Button>

                        <Button name="Credit" variant="primary" onClick={this.handleSubmit}>
                            Credit/Debit
                        </Button>
            <br/>
            <br/>   
            <button><img src={image} alt="my image" onClick={this.changeImage} /></button>
            {this.props.isSuccesss=='1' && <Alert variant="success">Payment Success</Alert>}
            {!this.props.isSuccesss=='1' && <Alert variant="danger">Payment Pending</Alert>}
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.handleSubmit}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}