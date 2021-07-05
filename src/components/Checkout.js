import React, { Component } from "react";
import Form from "./Form";
import PaymentForm from "./PaymentForm";
import "./Checkout.css";

class Checkout extends Component {
   constructor(props) {
      super(props);
      this.state = {
         driver: false,
         duration: 1,
         total: 0
      };
      this.radioHandler = this.radioHandler.bind(this);
      this.inputHandler = this.inputHandler.bind(this);
   }

   inputHandler(name, value) {
      this.setState({
         [name]: value
      });
   }

   radioHandler(event) {
      let value = event.target.value;
      if(value === "true") 
         value = true;
      else 
         value = false;
      this.setState({
         [event.target.name]: value
      });
   }

   render() {
      return (
         <div className="container-fluid">
            <div className="container">
               <h3>Seleziona la durata del noleggio</h3>
               <div>
                  <input type="radio" name="driver" value="false" onChange={this.radioHandler} />
                  <label>Senza autista</label>
               </div>
               <div>
                  <input type="radio" name="driver" value="true" onChange={this.radioHandler} />
                  <label>Con autista</label>
               </div>
               <Form driver={this.state.driver} onChange={this.inputHandler} />
               <h4>Totale: {this.state.total}</h4>
               <h3>Metodo di pagamento</h3>
               <PaymentForm onChange={this.inputHandler} />
            </div>
         </div>
      );
   }
}
 
export default Checkout;