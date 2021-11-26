import React from 'react';
import jsPDF from "jspdf";
import "jspdf-autotable";
import {Button,ButtonToolbar,ToggleButton,Alert,Form,Col } from 'react-bootstrap';
let url='http://localhost:53535/api/';


export class Printer extends React.Component {

  constructor(props) {
    super(props);
  }

    exportPDF = () => {
      const unit = "pt";
      const size = "A4"; // Use A1, A2, A3 or A4
      const orientation = "portrait"; // portrait or landscape
  
      const marginLeft = 40;
      const marginRight = 500;
      const doc = new jsPDF(orientation, unit, size);
  
      doc.setFontSize(15);
  
      const title = "Receipt";
      const headers = [["CartID", "ProductName","ProductNumber","ProductPrice","ProductQuantity"]];
  
      if(this.props.data == undefined) {
        console.log(this.props.data);
        return;
      }

      const values = this.props.data.map(elt=> [elt.CartID, elt.ProductName, elt.ProductNumber, elt.ProductPrice, elt.ProductQuantity]);
  
      let content = {
        startY: 120,
        head: headers,
        body: values
      };
      let totalTitle = "Total " + this.props.total; 
      let tax ="Tax "+ this.props.tax;
      let gSum = "Grand Total " + this.props.gSum;
      let cardNo = "Card No : " + this.props.cardNo;
      let chequeValue = "Cheque No  : " + this.props.chequeValue; 

      doc.text(totalTitle, marginLeft, 40);
      doc.text(tax, marginLeft, 60);
      doc.text(gSum, marginLeft, 80);
      if(cardNo != '')
      {
      doc.text(cardNo, marginLeft, 100);
      }
      else if(chequeValue != '')
      {
        doc.text(chequeValue, marginLeft, 100);
      }
      doc.autoTable(content);
      doc.save("report.pdf")
    }

  render() {
    return (
      <div>
        <Button variant="outline-primary" size="lg" onClick={() => this.exportPDF()}>Print Receipt</Button>
      </div> 
    );



  }

}


