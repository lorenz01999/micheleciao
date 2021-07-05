import React, { Component } from "react";

class PaymentForm extends Component {
   constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
   }

   handleChange(event) {
      this.props.onChange(event.target.name, event.target.value);
   }

   render() { 
      return ( 
         <div className="accordion" id="accordion">
            <div className="accordion-item">
               <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">Aggiungi metodo di pagamento</button>
               </h2>
               <div id="collapseOne" className="accordion-collapse collapse my-3" aria-labelledby="headingOne" data-bs-parent="#accordion">
                  <div className="accordion-body">
                     <div className="mb-3">
                        <label className="form-label">Numero della carta</label>
                        <input type="text" className="form-control" name="cardNumber" placeholder="4242424242424242" maxLength="16" onChange={this.handleChange} />
                     </div>
                     <div className="mb-3">
                        <label className="form-label">Data di scadenza</label>
                        <input type="text" className="form-control" name="expirationDate" placeholder="01/25" maxLength="5" onChange={this.handleChange} />
                     </div>
                     <div className="mb-3">
                        <label className="form-label">CVV</label>
                        <input type="text" className="form-control" name="cvv" placeholder="100" maxLength="3" onChange={this.handleChange} />
                     </div>
                     <button type="button" className="btn btn-warning w-100">Paga</button>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}
 
export default PaymentForm;