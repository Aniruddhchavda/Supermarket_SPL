import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';
let url='http://localhost:53535/api/';

let itemsName = {
    '001' : "PS5",
    '002' : "XBOX Series X",
    '003' : "RTX 3080",
    '004' : "Mangoes"
};

let itemsPrice = {
    '001' : "400",
    '002' : "500",
    '003' : "700",
    '004' : "10"
};

export class AddInvModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    

    handleSubmit(event){
        if(itemsName[event.target.ProductNumber.value] === undefined) 
        {
            alert("Product Number Does not exist"); 
            return;
        }
        event.preventDefault();
        fetch(url+'cart',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ProductName:itemsName[event.target.ProductNumber.value],
                ProductNumber:event.target.ProductNumber.value,
                ProductPrice:itemsPrice[event.target.ProductNumber.value],
                ProductQuantity:event.target.ProductQuantity.value
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
            Add Items Manually
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

                <Form onSubmit={this.handleSubmit}>
                <Form.Row>

                    <Form.Group as={Col} controlId="ProductNumber">
                        <Form.Label>Product Number</Form.Label>
                        <Form.Control type="text" name="ProductNumber" required
                        placeholder="ProductNumber"/>
                    </Form.Group>

                
                    <Form.Group as={Col} controlId="ProductQuantity">
                        <Form.Label>Product Quantity</Form.Label>
                        <Form.Control type="text" name="ProductQuantity" required
                        placeholder="ProductQuantity"/>
                    </Form.Group>
                    </Form.Row>
                <Form.Row>
                    <Form.Group>
                        <Button variant="primary" type="submit" onClick={this.props.onHide}>
                            Add
                        </Button>
                    </Form.Group>
                </Form.Row>
                </Form>
         
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}